import { Telegraf } from "telegraf";
import chalk from "chalk";
import { WELCOME } from "./constants";
import { registerHandlers } from "./handlers";

export async function runTelegramMode() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const ownerId = process.env.TELEGRAM_OWNER_ID;

    const bot = new Telegraf(token!);
    registerHandlers(bot);

    await bot.telegram.sendMessage(ownerId!, WELCOME, { parse_mode: "Markdown" });
    console.log(chalk.green("Sent welcome message to Telegram.\n"));

    let stopping: Promise<void> | undefined;
    const stop = (signal: NodeJS.Signals) => {
        if (!stopping) stopping = Promise.resolve().then(() => bot.stop(signal));
        return stopping;
    };
    const waitForStop = new Promise<void>((resolve) => {
        process.once("SIGINT", () => { void stop("SIGINT").finally(resolve); });
        process.once("SIGTERM", () => { void stop("SIGTERM").finally(resolve); });
    });

    try {
        const launch = bot.launch();
        console.log(chalk.green("Telegram bot is running. Press Ctrl+C to stop.\n"));
        await Promise.race([launch, waitForStop]);
        if (stopping) await stopping;
        else await launch;
    } catch (error) {
        await stop("SIGTERM");
        throw error;
    }
}
