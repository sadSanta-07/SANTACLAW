import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./action-tracker";
import { ToolExecutor } from "./tool-executor";
import { createAgentTools } from "./agent-tools";
import { stepCountIs, ToolLoopAgent } from "ai";
import { getAgentModel } from "../../ai";
import { renderTerminalMarkdown } from "../../Tui/terminal-md.ts";
import { runApprovalFlow } from "./approval.ts";

const toolMessages = [
  "Summoning",
  "Dispatching",
  "Unwrapping",
  "Negotiating with",
  "Politely asking",
];

const msg =
  toolMessages[Math.floor(Math.random() * toolMessages.length)];

const startupLines = [
  "Checking the naughty list...",
  "Sharpening candy-cane powered tools...",
  "Convincing TypeScript to cooperate...",
  "Reading code written at 3AM...",
  "Making optimistic assumptions...",
];


export async function runAgentMode() {


  console.log(
    chalk.dim(
      startupLines[Math.floor(Math.random() * startupLines.length)]
    )
  );
  console.log(chalk.bold("\nSantaClaw\n"));
  const goal = await text({
    message: "What's the mission?",
    placeholder: "Fix errors or hack NASA ?...",
  });

  if (isCancel(goal) || !goal.trim()) return;

  const config = defaultAgentConfig();
  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);
  const tools = createAgentTools(executor);

  const agent = new ToolLoopAgent({
    model: getAgentModel(),
    stopWhen: stepCountIs(40),

    instructions: [
      `Workspace root: ${config.codebasePath}`,

      "All file modifications must remain staged until explicit user approval.",

      "When inspecting multiple related files, prefer read_multiple_files instead of repeated read_file calls.",

      "Before making changes, understand the relevant project structure and dependencies.",

      "Use analyze_codebase, list_files, and search_files to gather context before editing.",

    ].join("\n"),

    tools,
  });

  const result = await agent.generate({
    prompt: goal.trim(),
    onStepFinish: ({ toolCalls }) => {
      for (const tc of toolCalls) {
        const msg =
          toolMessages[Math.floor(Math.random() * toolMessages.length)];
        const preview = JSON.stringify(tc.input).slice(0, 160);
        console.log(
          chalk.cyan("  ❄"),
          chalk.bold(msg),
          chalk.bold(String(tc.toolName)),
          chalk.dim(preview + (preview.length >= 160 ? "..." : "")),
        );
      }
    },
  });

  if (result.text?.trim()) console.log(renderTerminalMarkdown(result.text));

  console.log(
    chalk.yellow(
      "\nProposed changes are wrapped and waiting for approval.\n"
    )
  );

  const ok = await runApprovalFlow(tracker);
  if (!ok) return executor.clearStaging();

  const { errors } = executor.applyApprovedFromTracker();

  if (errors.length) {
    console.log(chalk.red("\n A few snowballs hit the propeller:\n"));
    for (const e of errors) console.log(chalk.red(`  • ${e}`));
  }
  else {
    console.log(chalk.green('\n Sleigh has landed. Workshop approved.\n'));
  }

  executor.clearStaging()
}