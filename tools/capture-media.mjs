import { copyFile, mkdir } from "node:fs/promises";
import { chromium } from "playwright";

await mkdir("docs/media", { recursive: true });
for (const [from, to] of [
  ["hero-1440x900", "desktop"],
  ["hero-390x844", "phone"],
  ["manifesto", "manifesto"],
  ["thinking", "thinking"],
])
  await copyFile(`output/playwright/${from}.png`, `docs/media/${to}.png`);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
await page.goto(process.argv[2] || "http://127.0.0.1:4627", { waitUntil: "networkidle" });
await page.screenshot({ path: "public/social.jpg", type: "jpeg", quality: 85 });
await browser.close();
console.log("Saved rendered README media and social preview.");
