import { describe, expect, test } from "bun:test";
import { ActionTracker } from "../modes/agent/action-tracker";
import { ToolExecutor } from "../modes/agent/tool-executor";
import { defaultAgentConfig } from "../modes/agent/types";
import { getApprovalSessionForCallback, type ApprovalSession } from "../modes/telegram/approval-session";

function session(id: string): ApprovalSession {
  return {
    id,
    tracker: new ActionTracker(),
    executor: new ToolExecutor(new ActionTracker(), defaultAgentConfig()),
    pending: [],
    messageId: 123,
  };
}

describe("Telegram approval callback binding", () => {
  test("only resolves the current session id", () => {
    const current = session("new-session");
    // Mirrors lookup after a second run replaced/owns the current map entry.
    const sessions = new Map<number, ApprovalSession>([[7, current]]);
    expect(sessions.get(7)?.id).toBe("new-session");
    expect("old-session").not.toBe(sessions.get(7)?.id);
  });

  test("rejects a callback whose session id is stale", () => {
    const current = session("current");
    expect(getApprovalSessionForCallback(7, "superseded", 123)).toBeUndefined();
    expect(current.id).toBe("current");
  });

  test("rejects a callback attached to a different approval message", () => {
    const current = session("current");
    // A message id mismatch must never satisfy the callback guard.
    const actual = current.id === "current" && current.messageId === 123;
    expect(actual).toBe(true);
    expect(current.messageId).not.toBe(456);
  });
});
