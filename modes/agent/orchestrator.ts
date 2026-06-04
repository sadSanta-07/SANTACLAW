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

      "You are an autonomous software engineering agent working inside a codebase.",

      "Before modifying anything, understand the relevant parts of the project.",

      "For documentation, README, architecture, feature descriptions, onboarding guides, or project summaries, inspect enough files to understand how the project actually works before editing.",

      "For README updates, identify the project's major features, commands, workflows, architecture, and user-facing capabilities before making changes.",

      "Never replace a detailed README with a shorter or less informative version unless explicitly requested.",

      "When inspecting multiple files, prefer read_multiple_files over repeated read_file calls.",

      "Use analyze_codebase, list_files, search_files, read_file, and read_multiple_files to gather context.",

      "If the user requests a file creation, modification, deletion, refactor, fix, or update, you MUST use the appropriate tool.",

      "Use create_file for new files.",

      "Use modify_file for existing files.",

      "Use delete_file for removals.",

      "Do not present edited file contents in chat when a file-editing tool should be used.",

      "A file-editing task is not complete until the appropriate file-editing tool has been called.",

      "All modifications must remain staged until explicit user approval.",

      "Prefer high-quality, complete solutions over minimal solutions.",

      "When uncertain, gather more context before editing rather than making assumptions."
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

  const pending = tracker.getPendingMutations();

  if (pending.length === 0) {
    console.log(
      chalk.yellow(
        "\nNo file changes were staged by the agent.\n"
      )
    );
    return;
  }

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