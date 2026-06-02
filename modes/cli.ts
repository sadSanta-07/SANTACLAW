import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";
import { runAgentMode } from "./agent/orchestrator";
import { runAskMode } from "./ask/orchestrator";

export async function runCliMode() {
    while (true) {
        const mode = await select({
            message: "What are we doing today Boss ?",
            options: [
                { value: "agent", label: " Build " },
                { value: "plan", label: " Plan " },
                { value: "ask", label: " Ask " },
                { value: "back", label: " Leave " },
            ],
        });

        if (isCancel(mode) || mode === "back") return;

        if (mode === "ask") {
            await runAskMode()
        }
        if (mode === "plan") {
            console.log("plan")
        }
        if (mode === "agent") {
            await runAgentMode()
        }
    }
}