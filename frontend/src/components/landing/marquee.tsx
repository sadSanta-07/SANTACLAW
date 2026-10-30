
const capabilities = [
  "PLAN MODE",
  "AGENT MODE",
  "ASK MODE",
  "CODEBASE AWARENESS",
  "STAGED MUTATIONS",
  "HUMAN APPROVAL",
  "OPEN SOURCE",
];

export default function Marquee() {
  return (
    <section
      className="capability-marquee"
      aria-label="SantaClaw capabilities"
    >
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div
            className="marquee-group"
            key={group}
            aria-hidden={group === 1 ? "true" : undefined}
          >
            {capabilities.map((item) => (
              <span className="marquee-item" key={item}>
                {item}
                <span className="marquee-separator">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
