import { tool, ToolLoopAgent, stepCountIs } from "ai";
import { z } from "zod";
import { getAgentModel } from "../../ai/ai.config.ts";
import { ActionTracker } from "../agent/action-tracker.ts";
import { ToolExecutor } from "../agent/tool-executor.ts";
import { createAgentTools } from "../agent/agent-tools.ts";
import { defaultAgentConfig, type AgentConfig } from "../agent/types.ts";
import { createWebTools } from "../plan/web-tools.ts";
import type { Plan, PlanStep } from "../plan/types.ts";
import { replyMd } from "./text.ts";


function readOnlyConfig(): AgentConfig {
    const c = defaultAgentConfig();
    c.tools.allowFileCreation = false;
    c.tools.allowFileModification = false;
    c.tools.allowFolderCreation = false;
    c.tools.allowShellExecution = false;
    return c;
}

function agentOptions(config: AgentConfig, maxSteps: number) {
    return {
        model: getAgentModel(),
        stopWhen: stepCountIs(maxSteps),
        instructions: `Workspace root: ${config.codebasePath}`,
    };
}

function createReadOnlyTools(executor: ToolExecutor) {
    return {
        read_file: tool({
            description: "Read a workspace file (relative path).",
            inputSchema: z.object({ path: z.string() }),
            execute: async ({ path: p }) => executor.readFile(p),
        }),
        list_files: tool({
            description: "List files/dirs at a path.",
            inputSchema: z.object({
                path: z.string(),
                recursive: z.boolean().optional().default(false),
            }),
            execute: async ({ path: p, recursive }) =>
                executor.listFiles(p, recursive),
        }),
        search_files: tool({
            description:
                "Find files matching a glob pattern; optional content filter.",
            inputSchema: z.object({
                root: z.string(),
                pattern: z.string(),
                content_contains: z.string().optional(),
            }),
            execute: async ({ root, pattern, content_contains }) =>
                executor.searchFiles(root, pattern, content_contains),
        }),
        analyze_codebase: tool({
            description: "Summarize the codebase structure.",
            inputSchema: z.object({ path: z.string().default(".") }),
            execute: async ({ path: p }) => executor.analyzeCodebase(p),
        }),
    };
}

function extraWebTools(tracker: ActionTracker) {
    return process.env.FIRECRAWL_API_KEY ? createWebTools(tracker) : {};
}

export async function runAsk(ctx: { reply: (t: string, o?: object) => Promise<unknown> }, question: string) {
    const config = readOnlyConfig();
    const tracker = new ActionTracker();
    const executor = new ToolExecutor(tracker, config);
    const tools = { ...createReadOnlyTools(executor), ...extraWebTools(tracker) };
    const agent = new ToolLoopAgent({
        ...agentOptions(config, 20),
        tools,
    });

    const { text } = await agent.generate({ prompt: question });
    await replyMd(ctx, text || ("no answer"))
}

