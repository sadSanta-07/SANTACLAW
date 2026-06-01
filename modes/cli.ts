import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";
import { runAgentMode } from "./agent/orchestrator";
import { runAskMode } from "./ask/orchestrator";

export async function runCliMode() {
    while (true) {
        const mode = await select({
            message: "Kya Kaam Karna Hai",
            options: [
                { value: "agent", label: "Agent Chahiye" },
                { value: "plan", label: "Planning karni hai" },
                { value: "ask", label: "Kuch Puchna Hai" },
                { value: "back", label: "+ Back to main menu" },
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

        if (mode !== 'agent' && mode !== 'plan' && mode !== 'ask') {
            console.log(chalk.yellow('\nThat mode is not implemented yet.\n'));

        }
    }
}