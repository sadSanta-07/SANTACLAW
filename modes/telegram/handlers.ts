import type { Telegraf } from "telegraf";
import { WELCOME } from "./constants";
import { isOwner } from "./auth";
import { commandArg } from "./text";


export function registerHandlers(bot: Telegraf) {
    bot.command("start", async (ctx) => {
        if (!isOwner(ctx.chat.id)) return;
        await ctx.reply(WELCOME, { parse_mode: "Markdown" });
    });

    bot.command("ask", async (ctx) => {
        if (!isOwner(ctx.chat.id)) return;
        const q = commandArg(ctx.message.text, "ask");
        if (!q)
            return ctx.reply("Usage: `/ask <your question>`", {
                parse_mode: "Markdown",
            });
        await ctx.reply("Researching your question…");
        
    });
}