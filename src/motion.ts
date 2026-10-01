import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export function mountMotion(root: HTMLElement, fullPage = true) {
  let off = false;
  let media = gsap.matchMedia();
  let intro: gsap.core.Timeline | undefined;
  const system = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motion = root.querySelector<HTMLButtonElement>("[data-motion]");
  const replay = root.querySelector<HTMLButtonElement>("[data-replay]");
  const render = () => {
    media.revert();
    media = gsap.matchMedia();
    const disabled = off || system.matches;
    root.dataset.motion = disabled ? "off" : "on";
    if (motion) {
      motion.textContent = disabled ? "MOTION OFF ▷" : "MOTION ON Ⅱ";
      motion.setAttribute("aria-pressed", String(disabled));
      motion.setAttribute(
        "aria-label",
        system.matches
          ? "Motion off: system reduced motion preference"
          : disabled
            ? "Enable animation"
            : "Disable animation",
      );
      motion.disabled = system.matches;
    }
    if (replay) replay.disabled = disabled;
    if (disabled) return;
    media.add(
      { desktop: "(min-width: 901px)", phone: "(max-width: 900px)" },
      (context) => {
        const paths = Array.from(root.querySelectorAll<SVGPathElement>(".sg-signal-path"));
        const lengths = paths.map((path) => path.getTotalLength());
        gsap.set(paths, { strokeDasharray: (i: number) => lengths[i] ?? 0 });
        intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".sg-title-line", { yPercent: 115, duration: 1.15, stagger: 0.16 }, 0.1)
          .fromTo(
            ".sg-type-echo",
            { x: 80, y: -15, opacity: 0 },
            { x: 0, y: 0, opacity: 0.45, duration: 1.7 },
            0.25,
          )
          .to(".sg-type-echo", { opacity: 0, duration: 0.6 }, 1.9)
          .fromTo(
            paths,
            { strokeDashoffset: (i: number) => lengths[i] ?? 0 },
            {
              strokeDashoffset: 0,
              duration: 2.25,
              stagger: 0.016,
              ease: "power2.inOut",
            },
            0.15,
          )
          .from(".sg-image-window", { clipPath: "inset(100% 0% 0% 0%)", y: 40, duration: 1.4 }, 0.9)
          .from(
            ".sg-arrival, .sg-signal-caption, .sg-art-coordinate",
            { y: 15, opacity: 0, duration: 0.85, stagger: 0.12 },
            1.25,
          )
          .from(".sg-sector-line a", { opacity: 0, y: 12, duration: 0.65, stagger: 0.08 }, 1.7);
        if (fullPage) {
          if (context.conditions?.desktop)
            gsap.to(".sg-ribbon", {
              y: 110,
              rotation: 9,
              ease: "none",
              scrollTrigger: {
                trigger: ".sg-hero-stage",
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          gsap.from(".sg-manifesto-line", {
            xPercent: -12,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            scrollTrigger: { trigger: ".sg-manifesto", start: "top 78%", once: true },
          });
          gsap.from(".sg-link-line", {
            scaleX: 0,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: ".sg-manifesto",
              start: "top 85%",
              end: "bottom 50%",
              scrub: 0.6,
            },
          });
          for (const item of root.querySelectorAll("[data-reveal]"))
            gsap.from(item, {
              y: 35,
              opacity: 0,
              duration: 0.85,
              scrollTrigger: { trigger: item, start: "top 91%", once: true },
            });
          gsap.from(".sg-footer-word", {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: ".sg-footer",
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          });
        }
      },
      root,
    );
  };
  const toggle = () => {
    off = !off;
    render();
  };
  const restart = () => intro?.restart();
  const visibility = () => {
    if (intro && intro.progress() < 1) intro.paused(document.hidden);
  };
  const closeMenu = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest(".sg-mobile-nav a"))
      root.querySelector(".sg-mobile-nav")?.removeAttribute("open");
  };
  root.addEventListener("click", closeMenu);
  motion?.addEventListener("click", toggle);
  replay?.addEventListener("click", restart);
  system.addEventListener("change", render);
  document.addEventListener("visibilitychange", visibility);
  render();
  return () => {
    media.revert();
    root.removeEventListener("click", closeMenu);
    motion?.removeEventListener("click", toggle);
    replay?.removeEventListener("click", restart);
    system.removeEventListener("change", render);
    document.removeEventListener("visibilitychange", visibility);
  };
}
