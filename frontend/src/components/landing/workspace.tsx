
import { Terminal } from "@/components/ui/terminal";

const terminalCommands = ["bun run index.ts wakeup"];

const terminalOutputs: Record<number, string[]> = {
  0: [
    "",
    "  ███████╗ █████╗ ███╗   ██╗████████╗ █████╗  ██████╗██╗      █████╗ ██╗    ██╗",
    "  ██╔════╝██╔══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝██║     ██╔══██╗██║    ██║",
    "  ███████╗███████║██╔██╗ ██║   ██║   ███████║██║     ██║     ███████║██║ █╗ ██║",
    "  ╚════██║██╔══██║██║╚██╗██║   ██║   ██╔══██║██║     ██║     ██╔══██║██║███╗██║",
    "  ███████║██║  ██║██║ ╚████║   ██║   ██║  ██║╚██████╗███████╗██║  ██║╚███╔███╔╝",
    "  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝",
    "",
    "  ◇ The workshop is open. What are we building?",
    "",
    "  ❯ Workshop Mode",
    "    Telegram Mode",
    "",
    "  ◇ What are we doing today Boss?",
    "",
    "  ❯ Build",
    "    Plan",
    "    Ask",
    "    Leave",
    "",
    "  ◇ What's the mission?",
    "    Add JWT authentication to my API",
    "",
    "  ❄ Checking the codebase...",
    "  ❄ Reading relevant project files...",
    "  ❄ Preparing implementation...",
    "",
    "  Proposed changes",
    "",
    "  + src/auth/jwt.ts",
    "  + src/middleware/auth.ts",
    "  ~ src/server.ts",
    "",
    "  ◇ Review proposed changes",
    "",
    "  Awaiting your approval...",
    "",
    "  The final decision stays with you.",
  ],
};

export default function Workspace() {
  return (
    <section className="workspace-section" id="workspace">
      <div className="workspace-container">
        <div className="workspace-heading">
          <div className="workspace-title-block">
            <p className="section-eyebrow">02 / THE WORKSPACE</p>

            <h2 className="workspace-title">
              Not just an assistant.
              <br />
              <span>A workshop.</span>
            </h2>
          </div>

          <div className="workspace-intro">
            <p>
              Your codebase is the context. Your goals set the
              direction. SantaClaw works through the task while
              keeping you in control of the changes.
            </p>

            <a href="#capabilities" className="workspace-text-link">
              Explore the workflow <span>↘</span>
              <i />
            </a>
          </div>
        </div>

        <div className="workspace-terminal-shell">
          <div className="workspace-terminal-topbar">
            <div className="workspace-window-controls">
              <span />
              <span />
              <span />
            </div>

            <span className="workspace-terminal-label">
              SANTACLAW / WORKSHOP
            </span>

            <span className="workspace-terminal-status">
              <i />
              SESSION PREVIEW
            </span>
          </div>

          <Terminal
            commands={terminalCommands}
            outputs={terminalOutputs}
            username="sahil"
            typingSpeed={38}
            delayBetweenCommands={800}
            initialDelay={700}
            enableSound={false}
            className="workspace-terminal"
          />
        </div>

        <div className="workspace-terminal-footer">
          <span>01 — UNDERSTAND</span>
          <span>02 — PLAN</span>
          <span>03 — BUILD</span>
          <span>04 — REVIEW</span>
        </div>
      </div>
    </section>
  );
}
