import { afterEach, describe, expect, test } from "bun:test";
import { getPlanSessionForCallback, planSessions, type PlanSession } from "../modes/telegram/plan-session";

const chatId = 987654321;

afterEach(() => {
  planSessions.delete(chatId);
});

describe("Telegram plan callback binding", () => {
  test("rejects callbacks from an older plan message", () => {
    const current: PlanSession = { plan: { goal: "new", steps: [] }, selected: new Set(), messageId: 200 };
    planSessions.set(chatId, current);
    expect(getPlanSessionForCallback(chatId, 100)).toBeUndefined();
    expect(getPlanSessionForCallback(chatId, 200)).toBe(current);
  });

  test("rejects callbacks without an originating message id", () => {
    planSessions.set(chatId, { plan: { goal: "new", steps: [] }, selected: new Set(), messageId: 200 });
    expect(getPlanSessionForCallback(chatId)).toBeUndefined();
  });
});
