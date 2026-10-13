# AGENTS.md — SANTACLAW

## Mission

SANTACLAW is an AI coding assistant with CLI and Telegram workflows, workspace file tools, staged mutations, user approval, planning, and optional web tools. When working in this repository, prioritize correctness, safety boundaries, approval integrity, reliability, and measured performance.

This file is the repository-level guidance for coding agents and autonomous auditors. Read it fully before making changes or opening issues.

## Repository rules

- Treat the current default branch and current source as authoritative. Inspect the latest commit and relevant recent changes before an audit.
- Understand intended behavior from the README, package scripts, configuration, and call sites before labeling behavior a defect.
- Do not confuse planned improvements or subjective preferences with bugs.
- Do not claim tests, benchmarks, or runtime reproduction were performed unless they actually were.
- Never expose, copy into reports, or request secrets. Do not read or disclose .env* files, tokens, API keys, credentials, private keys, or other secret values.
- Do not run destructive commands, commands that mutate user data, public services, or commands whose effects have not been understood.
- Do not install dependencies or change machine/repository configuration without explicit authorization.
- Do not change files, commit, push, create branches, or open pull requests during an issue-only audit.
- When code changes are explicitly requested, keep the patch focused and preserve existing behavior unless the task calls for changing it.

## Architecture and high-priority areas

Use the repository tree and imports to discover the current layout; do not assume paths remain unchanged. Pay particular attention to:

- modes/agent/: tool definitions, staged file/folder mutations, shell execution, action tracking, approval flows, diff generation, workspace access and exclusion policy.
- modes/ask/: read-only codebase question answering and separation from mutation-capable tools.
- modes/plan/: plan generation, selected-step execution, optional web research tools, HTTP timeout/retry/body handling.
- modes/telegram/: owner authorization, command and callback handlers, plan/approval session lifecycle, concurrent runs, stale buttons, error handling and Telegram message limits.
- Tui/: terminal rendering, prompts, output formatting and interactive usability.
- ai/: model/provider configuration, request failures, retries, limits and secret handling.
- Root configuration and packaging: package.json, bun.lock, tsconfig.json, Dockerfile, .dockerignore, .gitignore, and any CI workflows.

### Security and correctness review checklist

Inspect these behaviors in context; report only confirmed, actionable findings:

1. Workspace containment: lexical path traversal checks, symlink handling, reads/writes/deletes, parent directory creation, and revalidation at apply time.
2. Exclusions: whether .env*, dependency/build directories, logs and configured excluded paths are consistently excluded across every file-access method and recursive traversal.
3. Approval integrity: pending versus approved/rejected action states, whether diffs match the actual actions applied, stale or overlapping sessions, callback-to-session association, and authorization on every privileged callback.
4. Mutation application: ordering of repeated changes to one path, create/modify/delete combinations, partial failures, cleanup, and truthful reporting when some actions fail.
5. Shell execution: explicit approval, shell injection context, synchronous blocking, timeout/cancellation, output limits, exit codes, signals and child-process cleanup.
6. Concurrency and lifecycle: overlapping agent/plan runs, mutable shared session maps, cleanup on completion/error, duplicate callbacks and memory/resource leaks.
7. Network/web tools: request and body timeouts, response-size limits, retry policy, status-code handling, redirect behavior, URL validation/SSRF exposure, memory use and secret leakage.
8. Reliability: malformed model output, provider/API errors, rate limits, Telegram formatting/length constraints, cancellation, unhandled rejections and graceful shutdown.
9. Performance: measure before claiming improvements. Look for repeated filesystem traversal or reads, excessive model/tool calls, unbounded buffers, blocking work, duplicate processing and avoidable allocations. Include a reproducible benchmark method when possible.
10. Build and distribution: Bun/runtime compatibility, Docker context and image behavior, dependency/lockfile consistency, configuration defaults and CI coverage.

## Safe verification

- First inspect package.json and CI workflows to identify the actual scripts and runtime.
- Prefer targeted, read-only inspection before broad commands.
- Run existing tests, type checks, lint checks or builds only when their commands are known and the environment/dependencies are already available.
- Do not run a script just because its name sounds safe; inspect it first if its effects are unclear.
- Do not use production credentials, real Telegram bots, paid APIs, or external services for tests unless explicitly authorized.
- For performance claims, use repeatable measurements with baseline and changed behavior. Never invent numbers or industry comparisons.
- Report each check as passed, failed, not run, or blocked, and include relevant output or a concise explanation.

## Autonomous GitHub issue audit procedure

When asked to audit this repository and raise issues:

1. Read this file and the README, inspect the default branch, recent commits, package scripts, CI, and relevant source paths.
2. Build an understanding of actual feature behavior and its call paths before deciding whether something is a bug.
3. Search open and closed issues, plus relevant pull requests, for semantic duplicates. Inspect possible duplicates and any fixes before filing. Recheck immediately before issue creation.
4. Prefer high-impact correctness, security, data-integrity, reliability, and demonstrable performance issues over style-only suggestions.
5. File only findings with concrete evidence in current code and a plausible user/developer impact. Do not report speculative issues, intended tradeoffs, roadmap features, or duplicate findings.
6. Create no more than 6 issues per audit run unless the user explicitly asks for a larger batch. Fewer issues—or zero issues—is preferable to weak reports.
7. Do not create a test issue to check permissions. If issue creation is unavailable, stop and report the exact limitation instead of attempting workarounds.

### Required issue quality

Every issue should be contributor-ready and include, where applicable:

- A concise, specific title.
- A short summary of the problem and its impact.
- Exact file paths and relevant functions or control flow.
- Reproduction steps grounded in real behavior. Do not fabricate a runtime reproduction; label static-analysis findings honestly.
- Expected versus actual behavior.
- Concrete acceptance criteria and a regression test proposal.
- For performance issues, a reproducible benchmark plan and no unsupported quantitative claims.

Avoid generic filler headings that add no information. Do not add labels, assignees or milestones unless repository conventions or the user explicitly request them. Never include secrets, tokens, or private user data in an issue.

## Scope and final report

- Audit implemented behavior; do not treat roadmap aspirations as current defects without evidence that existing behavior is broken.
- Do not make code changes, commits, branches, pull requests, or edits to existing issues during an issue-only audit.
- In the final report, state the scope reviewed, checks actually run and their outcomes, issues created with direct links, duplicate findings skipped, and uncertain items that need human verification.
- Distinguish static analysis from runtime-reproduced defects and measured performance results.
- State explicitly when tests or benchmarks were not run.