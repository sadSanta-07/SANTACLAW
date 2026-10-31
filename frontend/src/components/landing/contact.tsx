
const footerLinks = [
  {
    label: "Workspace",
    href: "#workspace",
  },
  {
    label: "Architecture",
    href: "#architecture",
  },
  {
    label: "GitHub",
    href: "https://github.com/sadSanta-07/SANTACLAW",
    external: true,
  },
];

export default function Contact() {
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-container">
        {/* Main closing statement */}
        <div className="contact-main">
          <p className="section-eyebrow contact-eyebrow">
            05 / THE NEXT STEP
          </p>

          <h2 className="contact-title">
            Build something
            <br />
            <span>worth shipping.</span>
          </h2>

          <p className="contact-description">
            Your ideas deserve more than a prompt box.
            Bring your codebase, define the direction,
            and keep every decision yours.
          </p>

          <a
            className="contact-cta"
            href="https://github.com/sadSanta-07/SANTACLAW"
            target="_blank"
            rel="noreferrer"
          >
            Explore SantaClaw on GitHub
            <span>↗</span>
            <i />
          </a>
        </div>

        {/* Footer navigation */}
        <div className="contact-footer">
          <div className="contact-copyright">
            <span className="contact-brand-mark">S.</span>
            <span>© 2026 SantaClaw</span>
          </div>

          <nav
            className="contact-links"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
                {link.external && <span> ↗</span>}
              </a>
            ))}
          </nav>

          <a className="contact-back-top" href="#top">
            BACK TO TOP ↑
          </a>
        </div>

        {/* Bottom signature */}
        <div className="contact-signature">
          <span>BUILT WITH INTENTION.</span>
          <span>OPEN SOURCE / HUMAN CONTROL</span>
          <span>MADE FOR BUILDERS.</span>
        </div>
      </div>
    </footer>
  );
}
