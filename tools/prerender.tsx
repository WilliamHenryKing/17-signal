import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { App } from "../src/App";

const file = "dist/index.html";
writeFileSync(
  "dist/release.json",
  JSON.stringify(
    {
      sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      builtAt: new Date().toISOString(),
    },
    null,
    2,
  ),
);
const html = readFileSync(file, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("Missing prerender insertion point");
writeFileSync(file, html.replace(marker, `<div id="root">${renderToString(<App />)}</div>`));
console.log(
  "Prerendered complete homepage; standalone hero is static HTML with progressive motion.",
);
