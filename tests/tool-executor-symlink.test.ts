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
  let executor: ToolExecutor;

  beforeEach(() => {
    parent = fs.mkdtempSync(path.join(os.tmpdir(), "santaclaw-symlink-test-"));
    workspace = path.join(parent, "workspace");
    outside = path.join(parent, "outside");
    fs.mkdirSync(workspace);
    fs.mkdirSync(outside);
    fs.writeFileSync(path.join(outside, "secret.txt"), "outside-secret");
    const config = defaultAgentConfig();
    config.codebasePath = workspace;
    executor = new ToolExecutor(new ActionTracker(), config);
    try {
      fs.symlinkSync(outside, path.join(workspace, "escape"), "dir");
    } catch (error) {
      // Symlink creation may be restricted on some Windows runners.
      throw new Error(`Could not create symlink test fixture: ${String(error)}`);
    }
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

  test("keeps ordinary workspace paths available", () => {
    fs.writeFileSync(path.join(workspace, "inside.txt"), "inside");
    expect(executor.readFile("inside.txt")).toBe("inside");
  });
});
