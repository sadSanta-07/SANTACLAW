
import HeroArtwork from "./hero-artwork";

export default function Hero() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            SANTACLAW · OPEN-SOURCE AI CODING ASSISTANT
          </p>

          <h1 className="hero-heading">
            An AI that
            <br />
            understands <span>your code.</span>
            <br />
            And works <span>with you.</span>
          </h1>

          <p className="hero-description">
            Meet SantaClaw — an AI coding companion that works
            alongside your development workflow. Explore your
            codebase, plan changes, and build with an agent
            that keeps you in control.
          </p>

          <div className="hero-cta">
            <a href="#experience" className="hero-link">
              Explore the workflow <span>↘</span>
              <i />
            </a>

            <a href="#contact" className="hero-link hero-link-muted">
              Get started <span>↗</span>
              <i />
            </a>
          </div>
        </div>

        <HeroArtwork />

        <p className="hero-bottom-caption">
          BUILT FOR DEVELOPERS. DESIGNED FOR CONTROL.
        </p>
      </section>
    </main>
  );
}
