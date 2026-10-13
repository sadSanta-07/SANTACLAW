import { afterEach, describe, expect, test } from "bun:test";
import { ActionTracker } from "../modes/agent/action-tracker";
import { ToolExecutor } from "../modes/agent/tool-executor";
import { defaultAgentConfig } from "../modes/agent/types";
import { approvalSessions, getApprovalSessionForCallback, type ApprovalSession } from "../modes/telegram/approval-session";

const chatId = 987654321;

function session(id: string, messageId = 123): ApprovalSession {
  return {
    id,
    tracker: new ActionTracker(),
    executor: new ToolExecutor(new ActionTracker(), defaultAgentConfig()),
    pending: [],
    messageId,
  };
}

afterEach(() => {
  approvalSessions.delete(chatId);
});

describe("Telegram approval callback binding", () => {
  test("rejects a callback for a superseded session", () => {
    approvalSessions.set(chatId, session("new-session"));
    expect(getApprovalSessionForCallback(chatId, "old-session", 123)).toBeUndefined();
  });

  test("resolves only the active session id", () => {
    const current = session("current-session");
    approvalSessions.set(chatId, current);
    expect(getApprovalSessionForCallback(chatId, "current-session", 123)).toBe(current);
  });

  test("rejects a callback from a different approval message", () => {
    approvalSessions.set(chatId, session("current-session", 123));
    expect(getApprovalSessionForCallback(chatId, "current-session", 456)).toBeUndefined();
  });

  test("rejects callbacks after the session has been consumed", () => {
    approvalSessions.set(chatId, session("consumed-session"));
    approvalSessions.delete(chatId);
    expect(getApprovalSessionForCallback(chatId, "consumed-session", 123)).toBeUndefined();
  });
});
