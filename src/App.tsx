import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { capabilities, notes } from "./content";
import { Arrow, Hero, SignalMark } from "./Hero";
import { mountMotion } from "./motion";

gsap.registerPlugin(useGSAP);

export function App() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [article, setArticle] = useState(0);
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState("");
  const capability = capabilities[active] ?? capabilities[0];
  const note = notes[article] ?? notes[0];
  useGSAP(
    () => {
      if (root.current) return mountMotion(root.current);
    },
    { scope: root },
  );
  useGSAP(
    () => {
      if (brief) ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [brief] },
  );
  const openNote = (i: number) => {
    setArticle(i);
    dialog.current?.showModal();
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "signal-conversation-plan.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="sg" ref={root}>
      <a className="sg-skip" href="#main">
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <section className="sg-manifesto sg-section" id="group">
          <p className="sg-section-label">
            <span>01 / THE GROUP</span>
            <span>A SHARED DIRECTION.</span>
          </p>
          <div className="sg-manifesto-grid">
            <div>
              <h2>
                <span className="sg-manifesto-line">INFLUENCE IS</span>
                <span className="sg-manifesto-line">A COLLECTIVE</span>
                <span className="sg-manifesto-line sg-outline-dark">FORCE.</span>
              </h2>
              <div className="sg-link-line" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="sg-manifesto-copy" data-reveal>
              <SignalMark />
              <p>
                The right expertise.
                <br />
                The right connections.
                <br />A clearer way forward.
              </p>
              <p>
                Signal brings public affairs, policy, communications, membership and events into one
                connected conversation. We see how the pieces fit together — and where they could
                take you.
              </p>
              <a className="sg-underlined" href="#capabilities">
                FIND YOUR CONNECTION <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section className="sg-capabilities sg-section" id="capabilities">
          <p className="sg-section-label" data-reveal>
            <span>02 / CONNECTED EXPERTISE</span>
            <span>FIVE DISCIPLINES. ONE AMBITION.</span>
          </p>
          <div className="sg-section-heading" data-reveal>
            <h2>
              THE POWER
              <br />
              OF CONNECTION.
            </h2>
            <p>
              Find your starting point.
              <br />
              See what becomes possible.
            </p>
          </div>
          <div className="sg-capability-tabs" aria-label="Choose a capability" role="tablist">
            {capabilities.map((c, i) => (
              <button
                key={c.id}
                id={`tab-${c.id}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="capability-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(event) => {
                  let next = i;
                  if (event.key === "ArrowRight") next = (i + 1) % 5;
                  else if (event.key === "ArrowLeft") next = (i + 4) % 5;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = 4;
                  else return;
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`tab-${capabilities[next]?.id}`)?.focus();
                }}
              >
                <span>0{i + 1}</span>
                {c.name}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div
            className="sg-capability-panel"
            id="capability-panel"
            role="tabpanel"
            aria-labelledby={`tab-${capability.id}`}
            // biome-ignore lint/a11y/noNoninteractiveTabindex: Tab panels must be reachable after their selected tab.
            tabIndex={0}
          >
            <div className="sg-panel-art" aria-hidden="true">
              <span className="sg-panel-index">0{active + 1}</span>
              <svg aria-hidden="true" viewBox="0 0 500 200" fill="none">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                  <path
                    key={i}
                    d={`M0 ${20 + i * 14} C180 ${160 - i * 10} 280 ${-50 + i * 18} 500 ${45 + i * 9}`}
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                ))}
              </svg>
              <span className="sg-panel-verb">{capability.verb}</span>
            </div>
            <div className="sg-panel-content">
              <p className="sg-micro">{capability.name.toUpperCase()} / SIGNAL</p>
              <h3>{capability.headline}</h3>
              <p>{capability.copy}</p>
              <ul>
                {capability.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a className="sg-underlined" href="#connect">
                START SOMETHING <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section className="sg-thinking sg-section" id="thinking">
          <p className="sg-section-label" data-reveal>
            <span>03 / OUR THINKING</span>
            <span>A DIFFERENT POINT OF VIEW.</span>
          </p>
          <div className="sg-section-heading" data-reveal>
            <h2>
              GOOD IDEAS
              <br />
              TRAVEL FURTHER.
            </h2>
            <p>
              Illustrative perspectives.
              <br />A starting point for the next conversation.
            </p>
          </div>
          <div className="sg-notes">
            <article className="sg-feature-note" data-reveal>
              <button type="button" onClick={() => openNote(0)} className="sg-note-button">
                <div className="sg-note-image">
                  <img
                    src="/images/london.webp"
                    width="1100"
                    height="760"
                    loading="lazy"
                    alt="Westminster architecture on the bank of the River Thames"
                  />
                  <span className="sg-photo-tag">PERSPECTIVE / 001</span>
                  <span className="sg-note-arrow">
                    <Arrow />
                  </span>
                </div>
                <p className="sg-micro">{notes[0].category}</p>
                <h3>{notes[0].title}</h3>
                <span className="sg-read">READ THE NOTE ↗</span>
              </button>
            </article>
            <article className="sg-type-note" data-reveal>
              <button type="button" onClick={() => openNote(1)} className="sg-note-button">
                <span className="sg-micro">{notes[1].category} / 002</span>
                <div className="sg-quote-graphic" aria-hidden="true">
                  “<span>”</span>
                </div>
                <h3>{notes[1].title}</h3>
                <p>
                  People make the difference.
                  <br />
                  Make space for them.
                </p>
                <span className="sg-read">READ THE NOTE ↗</span>
              </button>
            </article>
          </div>
        </section>
        <section className="sg-connect sg-section" id="connect">
          <p className="sg-section-label">
            <span>04 / YOUR NEXT MOVE</span>
            <span>LET’S START A CONVERSATION.</span>
          </p>
          <div className="sg-connect-grid">
            <div data-reveal>
              <p className="sg-micro">AN IDEA. AN AMBITION. A CHALLENGE.</p>
              <h2>
                WHAT’S
                <br />
                YOUR
                <br />
                <span>NEXT?</span>
              </h2>
              <p>
                Big thinking starts with a simple question.
                <br />
                What would you like to change?
              </p>
            </div>
            <div className="sg-planner" data-reveal>
              <h3>Find your starting point.</h3>
              <p className="sg-local-note">
                A local conversation planner. Try it, keep your notes, and take the idea further.
                Nothing is submitted.
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const goal = String(data.get("goal")).trim();
                  const field = event.currentTarget.elements.namedItem(
                    "goal",
                  ) as HTMLTextAreaElement;
                  if (goal.length < 12) {
                    field.setCustomValidity("Describe your idea in at least 12 characters.");
                    field.reportValidity();
                    return;
                  }
                  setBrief(
                    `SIGNAL\nIndependent concept: conversation plan\n\nConnection: ${data.get("connection")}\nYour next move: ${goal}\nHorizon: ${data.get("horizon")}\n\nCreated locally. Nothing has been submitted.`,
                  );
                  setStatus("");
                }}
              >
                <label htmlFor="connection">
                  <span>01</span> CHOOSE YOUR CONNECTION
                </label>
                <select id="connection" name="connection">
                  {capabilities.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                  <option>A connected approach</option>
                </select>
                <label htmlFor="goal">
                  <span>02</span> TELL US WHAT’S NEXT
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  rows={3}
                  required
                  minLength={12}
                  maxLength={600}
                  placeholder="What could a stronger voice make possible?"
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                />
                <label htmlFor="horizon">
                  <span>03</span> SET THE HORIZON
                </label>
                <select name="horizon" id="horizon">
                  <option>Exploring the possibility</option>
                  <option>Ready in the next three months</option>
                  <option>Planning further ahead</option>
                </select>
                <button className="sg-plan-button" type="submit">
                  BUILD MY CONVERSATION PLAN <Arrow />
                </button>
              </form>
              {brief && (
                <div className="sg-plan-result">
                  <h4>A starting point, ready to keep.</h4>
                  <pre>{brief}</pre>
                  <div>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(brief);
                          setStatus("Plan copied.");
                        } catch {
                          setStatus("Select the text or download your plan to keep it.");
                        }
                      }}
                    >
                      COPY PLAN
                    </button>
                    <button type="button" onClick={download}>
                      DOWNLOAD .TXT
                    </button>
                  </div>
                  <p role="status">{status || "Your plan is ready. Nothing has been sent."}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="sg-footer">
        <div className="sg-footer-top">
          <a className="sg-brand" href="#top">
            <SignalMark />
            <span>SIGNAL</span>
          </a>
          <p>
            MANY VOICES.
            <br />
            ONE STRONGER SIGNAL.
          </p>
          <a className="sg-underlined" href="#top">
            BACK TO TOP ↑
          </a>
        </div>
        <div className="sg-footer-word" aria-hidden="true">
          LET’S CONNECT.
        </div>
        <div className="sg-footer-bottom">
          <p>
            Independent design concept by William King.
            <br />
            Fictional brand. Independent portfolio work.
          </p>
          <div>
            <a href="/hero.html">STANDALONE HERO ↗</a>
            <a href="https://github.com/WilliamHenryKing/17-signal">SOURCE & INTEGRATION ↗</a>
            <button
              type="button"
              onClick={() => {
                setArticle(-1);
                dialog.current?.showModal();
              }}
            >
              CREDITS & CONCEPT
            </button>
          </div>
          <a href="https://16-common-ground.williamking.workers.dev">VIEW CONCEPT 01 ↗</a>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="sg-dialog"
        aria-label="Signal concept details"
        onClick={(event) => {
          if (event.currentTarget === event.target) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") dialog.current?.close();
        }}
      >
        <div className="sg-dialog-content">
          <form method="dialog">
            <button type="submit" aria-label="Close dialog">
              CLOSE ×
            </button>
          </form>
          {article < 0 ? (
            <>
              <p className="sg-micro">SIGNAL / CONCEPT 02</p>
              <h2>
                THE IDEA
                <br />
                BEHIND THE SIGNAL.
              </h2>
              <p>
                Signal is a fictional corporate brand created to demonstrate an expressive animated
                hero and complete homepage. The identity, artwork and copy are original portfolio
                material, not commissioned client work.
              </p>
              <p>
                Original design and SVG artwork by William King. Manrope and Barlow Condensed are
                licensed under SIL OFL 1.1. London photography by{" "}
                <a href="https://unsplash.com/photos/the-houses-of-parliament-and-big-ben-in-london-v3nbIVKiETU">
                  Maik Winnecke
                </a>
                , conference photography by{" "}
                <a href="https://unsplash.com/photos/speaker-presenting-to-a-large-audience-in-an-auditorium-qzO9a6oQ8AM">
                  Marwen Larafa
                </a>
                , both under the <a href="https://unsplash.com/license">Unsplash License</a>. Images
                do not imply client work or endorsement.
              </p>
              <p>
                No analytics, personal-data collection or form backend. Your conversation plan
                remains local unless you choose to copy or download it.
              </p>
            </>
          ) : (
            <>
              <p className="sg-micro">{note.category} / CONCEPT NOTE</p>
              <h2>{note.title}</h2>
              <p className="sg-note-lead">{note.lead}</p>
              {note.body.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
