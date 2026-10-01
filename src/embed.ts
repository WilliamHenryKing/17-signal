import { mountMotion } from "./motion";
import "./hero.css";

const root = document.querySelector<HTMLElement>(".sg");
if (root) {
  const cleanup = mountMotion(root, false);
  window.addEventListener("pagehide", cleanup, { once: true });
}
