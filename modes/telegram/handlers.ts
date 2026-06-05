import type { Telegraf } from "telegraf";
import { WELCOME } from "./constants";
import { isOwner } from "./auth";
import { commandArg } from "./text";
import { runAgent, runAsk, runPlanSteps } from "./agent-run";
import { generatePlan } from "../plan/planner";
import { planKeyboard, planMessage, planSessions, refreshPlanUi, type PlanSession } from "./plan-session";


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

        void (async () => {
            const plan = await generatePlan(goal)
            const session: PlanSession = { plan, selected: new Set(plan.steps.map((s) => s.id)) }
            await ctx.reply(planMessage(session), { parse_mode: "Markdown", ...planKeyboard(session) });
            planSessions.set(ctx.chat.id, session);
        })().catch(console.error)
    });

    bot.action(/^plan_toggle:(.+)$/, async (ctx) => {
        if (!isOwner(ctx.chat!.id)) return ctx.answerCbQuery();
        const s = planSessions.get(ctx.chat!.id);
        if (!s) return ctx.answerCbQuery();

        const id = ctx.match[1]!;
        if (s.selected.has(id)) s.selected.delete(id);
        else s.selected.add(id);

        await refreshPlanUi(ctx, s);
        await ctx.answerCbQuery();
    });

  bot.action('plan_all', async (ctx) => {
    if (!isOwner(ctx.chat!.id)) return ctx.answerCbQuery();
    const s = planSessions.get(ctx.chat!.id);
    if (!s) return ctx.answerCbQuery();
    for (const step of s.plan.steps) s.selected.add(step.id);
    await refreshPlanUi(ctx, s);
    await ctx.answerCbQuery();
  });

    bot.action('plan_none', async (ctx) => {
    if (!isOwner(ctx.chat!.id)) return ctx.answerCbQuery();
    const s = planSessions.get(ctx.chat!.id);
    if (!s) return ctx.answerCbQuery();
    s.selected.clear();
    await refreshPlanUi(ctx, s);
    await ctx.answerCbQuery();
  });

   bot.action('plan_proceed', async (ctx) => {
    if (!isOwner(ctx.chat!.id)) return ctx.answerCbQuery();
    const s = planSessions.get(ctx.chat!.id);
    if (!s) return ctx.answerCbQuery();

    const steps = s.plan.steps.filter((step) => s.selected.has(step.id));
    if (steps.length === 0) return ctx.answerCbQuery();

    const { plan } = s;
    planSessions.delete(ctx.chat!.id);
    const list = steps.map((step, i) => `${i + 1}. ${step.title}`).join('\n');
    await ctx.editMessageText(`Executing ${steps.length} step(s)…\n\n${list}`);
    await ctx.answerCbQuery();

    void runPlanSteps(ctx, ctx.chat!.id, plan, steps).catch(console.error);
  });

}