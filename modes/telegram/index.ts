import { Telegraf } from "telegraf";
import chalk from "chalk";

export async function runTelegramMode() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const ownerId = process.env.TELEGRAM_OWNER_ID;

    const bot = new Telegraf(token!);
    //   registerHandlersbot

    await bot.telegram.sendMessage(ownerId!, WELCOME, { parse_mode: "Markdown" });
    console.log(chalk.green("Sent welcome message to Telegram.\n"));

}