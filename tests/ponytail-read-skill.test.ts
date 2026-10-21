import { afterEach, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ActionTracker } from "../modes/agent/action-tracker";
import { ToolExecutor } from "../modes/agent/tool-executor";
import { defaultAgentConfig } from "../modes/agent/types";

const tempDirs: string[] = [];
const originalSkillsDirs = process.env.SKILLS_DIRS;

function tempDir() {
  const dir = mkdtempSync(path.join(tmpdir(), "santaclaw-ponytail-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) rmSync(dir, { recursive: true, force: true });
  if (originalSkillsDirs === undefined) delete process.env.SKILLS_DIRS;
  else process.env.SKILLS_DIRS = originalSkillsDirs;
});

describe("read_skill root containment", () => {
  test("rejects a symlink from an allowed skill root to an outside file", () => {
    const root = tempDir();
    const outside = tempDir();
    const secretPath = path.join(outside, "outside.md");
    writeFileSync(secretPath, "outside");
    symlinkSync(secretPath, path.join(root, "SKILL.md"));
    process.env.SKILLS_DIRS = root;

    const executor = new ToolExecutor(new ActionTracker(), defaultAgentConfig());
    expect(() => executor.readSkill(path.join(root, "SKILL.md"))).toThrow("outside skill roots");
  });

  test("reads a file inside an allowed skill root", () => {
    const root = tempDir();
    const skillPath = path.join(root, "SKILL.md");
    writeFileSync(skillPath, "allowed");
    process.env.SKILLS_DIRS = root;

    const executor = new ToolExecutor(new ActionTracker(), defaultAgentConfig());
    expect(executor.readSkill(skillPath)).toBe("allowed");
  });
});
