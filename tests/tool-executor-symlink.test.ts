import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ActionTracker } from "../modes/agent/action-tracker";
import { ToolExecutor } from "../modes/agent/tool-executor";
import { defaultAgentConfig } from "../modes/agent/types";

describe("ToolExecutor workspace symlink containment", () => {
  let parent: string;
  let workspace: string;
  let outside: string;
  let tracker: ActionTracker;
  let executor: ToolExecutor;

  beforeEach(() => {
    parent = fs.mkdtempSync(path.join(os.tmpdir(), "santaclaw-symlink-test-"));
    workspace = path.join(parent, "workspace");
    outside = path.join(parent, "outside");
    fs.mkdirSync(workspace);
    fs.mkdirSync(outside);
    fs.writeFileSync(path.join(outside, "secret.txt"), "outside-secret");
    tracker = new ActionTracker();
    const config = defaultAgentConfig();
    config.codebasePath = workspace;
    executor = new ToolExecutor(tracker, config);
    fs.symlinkSync(outside, path.join(workspace, "escape"), "dir");
  });

  afterEach(() => {
    fs.rmSync(parent, { recursive: true, force: true });
  });

  test("rejects reads through an outside-pointing symlink", () => {
    expect(() => executor.readFile("escape/secret.txt")).toThrow(/outside workspace/);
  });

  test("rejects modifications through an outside-pointing symlink", () => {
    expect(() => executor.modifyFile("escape/secret.txt", "overwritten")).toThrow(/outside workspace/);
  });

  test("rejects deletes through an outside-pointing symlink", () => {
    expect(() => executor.deleteFile("escape/secret.txt")).toThrow(/outside workspace/);
    expect(fs.readFileSync(path.join(outside, "secret.txt"), "utf8")).toBe("outside-secret");
  });

  test("rejects creation below a symlink to an outside directory", () => {
    expect(() => executor.createFile("escape/new.txt", "outside")).toThrow(/outside workspace/);
  });

  test("revalidates approved create operations if a parent is redirected after staging", () => {
    executor.createFile("newdir/new.txt", "must-stay-outside");
    const action = tracker.getActions().at(-1)!;
    tracker.updateStatus(action.id, "approved", true);
    fs.symlinkSync(outside, path.join(workspace, "newdir"), "dir");

    const result = executor.applyApprovedFromTracker();
    expect(result.errors.some((error) => /outside workspace/.test(error))).toBe(true);
    expect(fs.existsSync(path.join(outside, "new.txt"))).toBe(false);
  });

  test("revalidates approved modifications if a parent is redirected after staging", () => {
    fs.mkdirSync(path.join(workspace, "safe"));
    fs.writeFileSync(path.join(workspace, "safe", "file.txt"), "original");
    executor.modifyFile("safe/file.txt", "overwritten");
    const action = tracker.getActions().at(-1)!;
    tracker.updateStatus(action.id, "approved", true);
    fs.renameSync(path.join(workspace, "safe"), path.join(workspace, "safe-old"));
    fs.writeFileSync(path.join(outside, "file.txt"), "outside-secret");
    fs.symlinkSync(outside, path.join(workspace, "safe"), "dir");

    const result = executor.applyApprovedFromTracker();
    expect(result.errors.some((error) => /outside workspace/.test(error))).toBe(true);
    expect(fs.readFileSync(path.join(outside, "file.txt"), "utf8")).toBe("outside-secret");
    expect(fs.readFileSync(path.join(workspace, "safe-old", "file.txt"), "utf8")).toBe("original");
  });

  test("revalidates approved deletions if a parent is redirected after staging", () => {
    fs.mkdirSync(path.join(workspace, "safe"));
    fs.writeFileSync(path.join(workspace, "safe", "file.txt"), "original");
    executor.deleteFile("safe/file.txt");
    const action = tracker.getActions().at(-1)!;
    tracker.updateStatus(action.id, "approved", true);
    fs.renameSync(path.join(workspace, "safe"), path.join(workspace, "safe-old"));
    fs.symlinkSync(outside, path.join(workspace, "safe"), "dir");
    fs.writeFileSync(path.join(outside, "file.txt"), "outside-secret");

    const result = executor.applyApprovedFromTracker();
    expect(result.errors.some((error) => /outside workspace/.test(error))).toBe(true);
    expect(fs.readFileSync(path.join(outside, "file.txt"), "utf8")).toBe("outside-secret");
  });

  test("keeps ordinary workspace paths available", () => {
    fs.writeFileSync(path.join(workspace, "inside.txt"), "inside");
    expect(executor.readFile("inside.txt")).toBe("inside");
  });
});

describe("ToolExecutor approved shell execution", () => {
  const oldTimeout = process.env.SANTACLAW_SHELL_TIMEOUT_MS;
  let parent: string;
  let workspace: string;
  let tracker: ActionTracker;
  let executor: ToolExecutor;

  beforeEach(() => {
    parent = fs.mkdtempSync(path.join(os.tmpdir(), "santaclaw-shell-test-"));
    workspace = parent;
    tracker = new ActionTracker();
    const config = defaultAgentConfig();
    config.codebasePath = workspace;
    executor = new ToolExecutor(tracker, config);
  });

  afterEach(() => {
    fs.rmSync(parent, { recursive: true, force: true });
    if (oldTimeout === undefined) delete process.env.SANTACLAW_SHELL_TIMEOUT_MS;
    else process.env.SANTACLAW_SHELL_TIMEOUT_MS = oldTimeout;
  });

  function approve(command: string) {
    executor.queueShell(command);
    const action = tracker.getActions().at(-1)!;
    tracker.updateStatus(action.id, "approved", true);
  }

  test("runs a successful command", () => {
    approve("printf ok");
    expect(executor.applyApprovedFromTracker().errors).toEqual([]);
  });

  test("reports a nonzero exit distinctly", () => {
    approve("exit 7");
    expect(executor.applyApprovedFromTracker().errors.some((error) => /shell exit 7/.test(error))).toBe(true);
  });

  test("returns a timeout error for a command that exceeds the configured limit", () => {
    process.env.SANTACLAW_SHELL_TIMEOUT_MS = "100";
    approve("sleep 2");
    expect(executor.applyApprovedFromTracker().errors.some((error) => /shell timeout after 100ms/.test(error))).toBe(true);
  });
});
