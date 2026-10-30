
export default function HeroArtwork() {
  return (
    <div className="hero-artwork" aria-hidden="true">
      <svg
        className="hero-illustration"
        viewBox="0 0 640 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sun-gradient" x1="180" y1="120" x2="440" y2="390">
            <stop offset="0%" stopColor="var(--gradient-sun-start)" />
            <stop offset="100%" stopColor="var(--gradient-sun-end)" />
          </linearGradient>
        </defs>

        {/* Sun */}
        <circle
          cx="352"
          cy="235"
          r="137"
          fill="url(#sun-gradient)"
          className="hero-sun"
        />

        {/* Orbital circles */}
        <circle
          cx="352"
          cy="235"
          r="174"
          className="artwork-line"
        />

        <circle
          cx="352"
          cy="235"
          r="174"
          className="artwork-line artwork-orbit"
          transform="rotate(-32 352 235)"
        />

        {/* Orbit paths */}
        <path
          d="M65 485C167 365 230 321 352 235C431 178 473 131 550 100"
          className="artwork-line"
        />

        <path
          d="M95 510C209 392 272 396 372 397C465 398 486 384 550 350"
          className="artwork-line artwork-muted"
        />

        <path
          d="M352 235C318 315 337 412 453 510"
          className="artwork-line artwork-muted"
        />

        {/* Branch stem */}
        <path
          d="M78 548C123 480 165 422 177 342C187 270 167 223 185 180"
          className="artwork-branch"
        />

        {/* Leaves */}
        <path
          d="M174 342C128 331 101 308 91 270C131 265 164 287 174 342Z"
          className="artwork-branch"
        />

        <path
          d="M177 301C214 280 238 249 243 213C208 217 181 246 177 301Z"
          className="artwork-branch"
        />

        <path
          d="M159 407C115 394 91 371 79 339C117 334 149 359 159 407Z"
          className="artwork-branch"
        />

        <path
          d="M143 452C177 435 207 438 231 459C198 478 167 476 143 452Z"
          className="artwork-branch"
        />

        <path
          d="M105 494C76 477 54 478 35 494C57 516 82 517 105 494Z"
          className="artwork-branch"
        />

        {/* Orbit nodes */}
        <circle cx="550" cy="100" r="7" className="artwork-node" />
        <circle cx="550" cy="350" r="7" className="artwork-node" />
        <circle cx="453" cy="510" r="7" className="artwork-node" />
        <circle cx="265" cy="397" r="7" className="artwork-node" />
        <circle cx="125" cy="449" r="7" className="artwork-node" />

        {/* Technical marker */}
        <circle cx="352" cy="235" r="3" className="artwork-dot" />
      </svg>

      <span className="artwork-label artwork-label-top">
        SYSTEM / GARDEN
      </span>

      <span className="artwork-coordinates">
        20.2961° N
        <br />
        85.8245° E
      </span>
    </div>
  );
}
