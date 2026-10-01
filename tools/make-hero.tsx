import { writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { Hero } from "../src/Hero";

writeFileSync(
  "hero.html",
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Signal: standalone Chamber Group animated hero concept."><title>Signal — standalone hero</title><link rel="icon" href="/favicon.svg"><link rel="preload" href="/fonts/barlow-condensed-latin.woff2" as="font" type="font/woff2" crossorigin></head><body style="margin:0"><main class="sg sg-standalone">${renderToStaticMarkup(<Hero standalone />)}</main><script type="module" src="/src/embed.ts"></script></body></html>`,
);
