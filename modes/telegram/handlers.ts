import type { Telegraf } from "telegraf";
import { WELCOME } from "./constants";
import { isOwner } from "./auth";


export function registerHandlers(bot: Telegraf) {
  bot.command("start", async (ctx) => {
    if (!isOwner(ctx.chat.id)) return;
    await ctx.reply(WELCOME, { parse_mode: "Markdown" });
  });

}