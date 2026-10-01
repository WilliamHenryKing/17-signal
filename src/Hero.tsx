import { capabilities } from "./content";
export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function SignalMark() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M5 31V13m8 24V7m8 33V4m8 33V7m8 24V13" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}
export function Ribbon() {
  return (
    <svg className="sg-ribbon" viewBox="0 0 700 820" fill="none" aria-hidden="true">
      {Array.from({ length: 36 }, (_, i) => i).map((i) => (
        <path
          className="sg-signal-path"
          key={i}
          d={`M ${498 + i * 4} -50 C ${480 + i * 3} 90 ${5 + i * 5} 105 ${155 + i * 4.5} 285 S ${830 - i * 4} 470 ${375 + i * 5} 635 L ${60 + i * 5.5} 850`}
          stroke={i % 7 === 0 ? "#d8f36a" : "#9db479"}
          strokeOpacity={i % 7 === 0 ? 1 : 0.45}
          strokeWidth={i % 7 === 0 ? 1.6 : 1}
        />
      ))}
    </svg>
  );
}
export function Hero({ standalone = false }: { standalone?: boolean }) {
  const link = (id: string) => `${standalone ? "/" : ""}#${id}`;
  return (
    <section className="sg-hero" id="top" aria-label="Introducing Chamber Group">
      <header className="sg-header">
        <a className="sg-brand" href={link("top")} aria-label="Chamber Group home">
          <SignalMark />
          <span>
            CHAMBER
            <br />
            GROUP
          </span>
        </a>
        <nav className="sg-navigation" aria-label="Main navigation">
          <a href={link("group")}>The group</a>
          <a href={link("capabilities")}>Our capabilities</a>
          <a href={link("thinking")}>Our thinking</a>
        </nav>
        <a className="sg-header-contact" href={link("connect")}>
          LET’S CONNECT <Arrow />
        </a>
        <details className="sg-mobile-nav">
          <summary>
            MENU <span aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Mobile navigation">
            <a href={link("group")}>The group</a>
            <a href={link("capabilities")}>Our capabilities</a>
            <a href={link("thinking")}>Our thinking</a>
            <a href={link("connect")}>Let’s connect</a>
          </nav>
        </details>
      </header>
      <div className="sg-hero-stage">
        <div className="sg-hero-title">
          <p className="sg-micro sg-arrival">
            <span className="sg-dot" /> DIFFERENT EXPERTISE. SHARED AMBITION.
          </p>
          <h1>
            <span className="sg-type-mask">
              <span className="sg-title-line">MAKE YOUR</span>
            </span>
            <span className="sg-type-mask sg-voice">
              <span className="sg-title-line">VOICE</span>
              <span className="sg-type-echo" aria-hidden="true">
                VOICE
              </span>
            </span>
            <span className="sg-type-mask">
              <span className="sg-title-line">MATTER.</span>
            </span>
          </h1>
          <div className="sg-hero-intro sg-arrival">
            <p>
              Connecting influence, ideas and people.
              <br />
              Moving the conversation forward.
            </p>
            <a className="sg-lime-button" href={link("capabilities")}>
              EXPLORE THE GROUP <Arrow />
            </a>
          </div>
        </div>
        <div className="sg-hero-art" aria-hidden="true">
          <Ribbon />
          <span className="sg-art-coordinate">CG / 05 → 01</span>
          <span className="sg-art-cross">+</span>
          <div className="sg-image-window">
            <img src="/images/forum.webp" width="1000" height="667" alt="" fetchPriority="high" />
            <span>PEOPLE. IDEAS. POSSIBILITY.</span>
          </div>
          <div className="sg-signal-caption">
            <span className="sg-dot" /> MANY VOICES.
            <br />
            <span className="sg-caption-indent">ONE STRONGER SIGNAL.</span>
          </div>
        </div>
      </div>
      <div className="sg-hero-meta">
        <a href={link("group")}>
          SCROLL TO CONNECT <span aria-hidden="true">↓</span>
        </a>
        <span>SIGNAL / AN INDEPENDENT CONCEPT</span>
        <div className="sg-motion-controls">
          <button type="button" data-replay>
            REPLAY ↻
          </button>
          <button type="button" data-motion aria-pressed="false">
            MOTION ON Ⅱ
          </button>
        </div>
      </div>
      <nav className="sg-sector-line" aria-label="Connected disciplines">
        {capabilities.map((c, i) => (
          <a key={c.id} href={link("capabilities")}>
            <span>0{i + 1}</span>
            {c.name}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
