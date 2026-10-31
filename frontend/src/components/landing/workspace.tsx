
import { Terminal } from "@/components/ui/terminal";

const terminalCommands = ["bun run index.ts wakeup"];

const terminalOutputs: Record<number, string[]> = {
  0: [
    "",
    "  ███████╗ █████╗ ███╗   ██╗████████╗ █████╗  ██████╗██╗      █████╗ ██╗    ██╗",
    "  ██╔════╝██╔══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝██║     ██╔══██╗██║    ██║",
    "  ███████╗███████║██╔██╗ ██║   ██║   ███████║██║     ██║     ███████║██║ █╗ ██║",
    "  ╚════██║██╔══██╗██║╚██╗██║   ██║   ██╔══██║██║     ██║     ██╔══██║██║███╗██║",
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

const methods = [
  {
    number: "01",
    name: "Build",
    description:
      "Turn an idea into implementation. SantaClaw works through your coding task with your project as context.",
    tag: "MAKE IT REAL",
  },
  {
    number: "02",
    name: "Plan",
    description:
      "Think before changing. Explore the codebase, break down the task and prepare an implementation plan.",
    tag: "THINK FIRST",
  },
  {
    number: "03",
    name: "Ask",
    description:
      "Understand what is already there. Ask questions about your codebase and get context-aware answers.",
    tag: "STAY CURIOUS",
  },
];

export default function Workspace() {
  return (
    <section className="workspace-section" id="workspace">
      <div className="workspace-container">
        <div className="workspace-layout">
          <div className="workspace-copy">
            <p className="section-eyebrow">02 / THE WORKSPACE</p>

            <h2 className="workspace-title">
              Not just an assistant.
              <br />
              <span>A workshop.</span>
            </h2>

            <p className="workspace-description">
              Your codebase is the context. Your goals set the
              direction. SantaClaw works through the task while
              keeping you in control of the changes.
            </p>

            <div className="method-block" id="capabilities">
              <div className="method-heading">
                <span className="section-eyebrow">03 / THE METHOD</span>
                <span className="method-heading-note">
                  THREE WAYS TO WORK
                </span>
              </div>

              <div className="method-list">
                {methods.map((method) => (
                  <article className="method-item" key={method.number}>
                    <span className="method-number">{method.number}</span>

                    <div className="method-content">
                      <div className="method-title-row">
                        <h3>{method.name}</h3>
                        <span className="method-tag">{method.tag}</span>
                      </div>

                      <p>{method.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="workspace-principle">
              <span className="principle-mark">✳</span>
              <p>
                Your code. Your decisions.
                <span> Nothing changes without your say.</span>
              </p>
            </div>
          </div>

          <div className="workspace-demo">
            <div className="workspace-demo-heading">
              <span>LIVE WORKFLOW / 001</span>
              <span className="workspace-demo-indicator">
                <i />
                SESSION PREVIEW
              </span>
            </div>

            <div className="workspace-terminal-shell">
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
        </div>

        <div className="workspace-bottom-note">
          <span>BUILT AROUND YOUR WORKFLOW</span>
          <span>HUMAN APPROVAL / ALWAYS</span>
        </div>
      </div>
    </section>
  );
}
