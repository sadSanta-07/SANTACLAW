import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";

const BANNER_FONT = "ANSI Shadow";

const SHADOW = chalk.hex("#5b4d9e");
const FACE = chalk.hex("#e8dcf8").bold;

function printBannerWithShadow(ascii: string) {
    const bannerLines = ascii.replace(/\s+$/, "").split("\n");

    const maxLen = Math.max(
        ...bannerLines.map((line) => line.length),
        0
    );
    const rowWidth = maxLen + 2;

    for (const line of bannerLines) {
        console.log(SHADOW(line.padEnd(rowWidth)));
    }

    process.stdout.write(`\x1b[${bannerLines.length}A`);

    for (const line of bannerLines) {
        console.log(FACE(line.padEnd(rowWidth)));
    }
}

console.log();

export async function runWakeup() {
    let ascii: string;

    try {
        ascii = figlet.textSync("SantaClaw", {
            font: BANNER_FONT,
        });
    } catch (error) {
        ascii = figlet.textSync("SantaClaw", {
            font: "Standard",
        });
    }

    printBannerWithShadow(ascii);

    const mode = await select({
        message: "Ye le mode choose kar bhai...",
        options: [
            { value: "cli", label: "CLI" },
            { value: "telegram", label: "Telegram" },
            { value: "exit", label: "exit" }
        ]
    });
    if (isCancel(mode || mode === "exit")) {
        console.log(chalk.dim('\n muhehehee bye bye'))
    }

    if (mode === "cli") {
        console.log(chalk.dim("cli shuru horha hai..."))
        await runCliMode()
    } else if (mode === "telegram") {
        console.log(chalk.dim("telegram shuru horha hai..."))
    }
}