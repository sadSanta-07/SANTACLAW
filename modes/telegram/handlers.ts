import type { Telegraf } from "telegraf";
import { WELCOME } from "./constants";
import { isOwner } from "./auth";
import { commandArg } from "./text";
import { runAgent, runAsk } from "./agent-run";
import { generatePlan } from "../plan/planner";
import { planKeyboard, planMessage, planSessions, type PlanSession } from "./plan-session";


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
        void runAsk(ctx, q).catch(console.error);
    });

    bot.command("agent", async (ctx) => {
        if (!isOwner(ctx.chat.id)) return;
        const goal = commandArg(ctx.message.text, "agent");
        if (!goal)
            return ctx.reply("Usage: `/agent <task description>`", {
                parse_mode: "Markdown",
            });
        await ctx.reply("Agent is working on your task…");
        void runAgent(ctx, ctx.chat.id, goal).catch(console.error);
    });

      bot.command("plan", async (ctx) => {
    if (!isOwner(ctx.chat.id)) return;
    const goal = commandArg(ctx.message.text, "plan");

    if (!goal)
      return ctx.reply("Usage: `/plan <your goal>`", {
        parse_mode: "Markdown",
      });

    await ctx.reply("Generating a plan…");

    void (async ()=>{
        const plan = await generatePlan(goal)
        const session:PlanSession = {plan , selected:new Set(plan.steps.map((s)=>s.id))}
        await ctx.reply(planMessage(session) , {parse_mode:"Markdown", ...planKeyboard(session)});
         planSessions.set(ctx.chat.id, session);
    })().catch(console.error)
  });
}