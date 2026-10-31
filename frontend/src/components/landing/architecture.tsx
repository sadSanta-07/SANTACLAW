
const architectureStages = [
  {
    number: "01",
    title: "Context before action",
    description:
      "SantaClaw works with your project as context, rather than treating every task as an isolated prompt.",
  },
  {
    number: "02",
    title: "Choose how to work",
    description:
      "Build, Plan and Ask give you different ways to approach the same codebase.",
  },
  {
    number: "03",
    title: "Keep control",
    description:
      "Review proposed changes before deciding what should be applied.",
  },
];

export default function Architecture() {
  return (
    <section
      className="architecture-section"
      id="architecture"
      aria-labelledby="architecture-title"
    >
      <div className="architecture-container">
        <header className="architecture-heading">
          <div>
            <p className="section-eyebrow">03 / ENGINEERING</p>

            <h2 className="architecture-title" id="architecture-title">
              Under the hood.
              <br />
              <span>Clarity by design.</span>
            </h2>
          </div>

          <p className="architecture-intro">
            A focused workflow built around your codebase.
            Start from the interface that suits you, choose
            how to work, and stay in control of every change.
          </p>
        </header>

        <div className="architecture-grid">
          <article className="architecture-diagram">
            <div className="architecture-panel-heading">
              <span>01 — SYSTEM MAP</span>
              <span>CONCEPTUAL OVERVIEW</span>
            </div>

            <div className="architecture-flow">
              <div className="architecture-flow-label">
                <span>ENTRY POINTS</span>
                <span>01</span>
              </div>

              <div className="architecture-node-pair">
                <div className="architecture-node">
                  <span className="architecture-node-symbol">⌘</span>
                  <div>
                    <strong>Workshop</strong>
                    <small>Interactive CLI</small>
                  </div>
                </div>

                <div className="architecture-node">
                  <span className="architecture-node-symbol">↗</span>
                  <div>
                    <strong>Telegram</strong>
                    <small>Messaging interface</small>
                  </div>
                </div>
              </div>

              <div className="architecture-connector">
                <span />
              </div>

              <div className="architecture-flow-label">
                <span>WAYS OF WORKING</span>
                <span>02</span>
              </div>

              <div className="architecture-modes">
                <div className="architecture-mode architecture-mode-build">
                  <span>01</span>
                  <strong>Build</strong>
                </div>
                <div className="architecture-mode">
                  <span>02</span>
                  <strong>Plan</strong>
                </div>
                <div className="architecture-mode">
                  <span>03</span>
                  <strong>Ask</strong>
                </div>
              </div>

              <div className="architecture-connector">
                <span />
              </div>

              <div className="architecture-flow-label">
                <span>PROJECT CONTEXT</span>
                <span>03</span>
              </div>

              <div className="architecture-context-node">
                <div className="architecture-context-icon">
                  {"{ }"}
                </div>
                <div>
                  <strong>Your codebase</strong>
                  <small>
                    The project files provide the context for the task.
                  </small>
                </div>
              </div>

              <div className="architecture-connector">
                <span />
              </div>

              <div className="architecture-flow-label">
                <span>DEVELOPER CONTROL</span>
                <span>04</span>
              </div>

              <div className="architecture-approval-node">
                <div className="architecture-approval-mark">✓</div>
                <div>
                  <strong>Review proposed changes</strong>
                  <small>
                    You decide what moves forward.
                  </small>
                </div>
                <span className="architecture-approval-status">
                  HUMAN APPROVAL
                </span>
              </div>
            </div>

            <div className="architecture-panel-footer">
              <span>INPUT → CONTEXT → ACTION → REVIEW</span>
              <span>SANTACLAW / 001</span>
            </div>
          </article>

          <aside className="architecture-notes">
            <div className="architecture-notes-top">
              <p className="section-eyebrow">THE THINKING</p>
              <span className="architecture-notes-symbol">✳</span>
            </div>

            <h3>
              Not another black box.
              <br />
              <em>A tool you can reason with.</em>
            </h3>

            <p className="architecture-notes-description">
              The point isn&apos;t to hide the process behind an
              impressive interface. It&apos;s to make the process
              understandable, reviewable and yours.
            </p>

            <div className="architecture-principles">
              {architectureStages.map((stage) => (
                <div
                  className="architecture-principle"
                  key={stage.number}
                >
                  <span>{stage.number}</span>
                  <div>
                    <h4>{stage.title}</h4>
                    <p>{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a className="architecture-link" href="#workspace">
              Back to the workspace
              <span>↗</span>
              <i />
            </a>
          </aside>
        </div>

        <footer className="architecture-footer">
          <span>DESIGNED FOR DEVELOPERS</span>
          <span>OPEN SOURCE / HUMAN CONTROL</span>
        </footer>
      </div>
    </section>
  );
}
