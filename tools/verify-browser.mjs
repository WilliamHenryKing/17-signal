import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.argv[2] || "http://127.0.0.1:4627";
const out = "output/playwright";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { base, browser: browser.version(), checks: [], errors: [] };
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
page.on("pageerror", (e) => report.errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") report.errors.push(m.text());
});
const check = (name, passed) => {
  report.checks.push({ name, passed: !!passed });
  if (!passed) throw new Error(name);
};
const shot = (name) => page.screenshot({ path: `${out}/${name}.png` });
const axe = async (name) => {
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const violations = await page.evaluate(async () =>
    (
      await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      })
    ).violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target) })),
  );
  report[name] = violations;
  check(`${name}: no detected WCAG A/AA violations`, violations.length === 0);
};
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  check(
    "title and single headline",
    (await page.title()).includes("Signal") && (await page.locator("h1").count()) === 1,
  );
  await shot("hero-desktop");
  await page.locator("[data-replay]").click();
  await page.waitForTimeout(350);
  await shot("intro-0350ms");
  await page.waitForTimeout(800);
  await shot("intro-1150ms");
  await page.waitForTimeout(2400);
  await shot("intro-settled");
  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [768, 1024],
    [390, 844],
    [320, 740],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(3400);
    check(
      `no overflow ${width}x${height}`,
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    );
    check(`headline visible ${width}x${height}`, await page.locator("h1").isVisible());
    await shot(`hero-${width}x${height}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(3400);
  await page.getByRole("button", { name: "Disable animation" }).click();
  check(
    "motion can be disabled",
    (await page.locator(".sg").getAttribute("data-motion")) === "off",
  );
  check("replay disabled while motion off", await page.locator("[data-replay]").isDisabled());
  for (const [i, name] of [
    "Public affairs",
    "Policy",
    "Communications",
    "Membership",
    "Events",
  ].entries()) {
    const tab = page.getByRole("tab", { name: new RegExp(name) });
    await tab.click();
    check(`select ${name}`, (await tab.getAttribute("aria-selected")) === "true");
    check(`content ${name}`, (await page.locator(".sg-panel-index").textContent()) === `0${i + 1}`);
  }
  await page.waitForTimeout(250);
  await shot("capabilities-events");
  await page.getByRole("tab", { name: /Public affairs/ }).focus();
  await page.keyboard.press("ArrowRight");
  check(
    "ArrowRight changes and focuses tab",
    await page
      .getByRole("tab", { name: /Policy/ })
      .evaluate(
        (el) => el === document.activeElement && el.getAttribute("aria-selected") === "true",
      ),
  );
  await page.keyboard.press("End");
  check(
    "End selects last tab",
    (await page.getByRole("tab", { name: /Events/ }).getAttribute("aria-selected")) === "true",
  );
  await page.keyboard.press("Home");
  check(
    "Home selects first tab",
    (await page.getByRole("tab", { name: /Public affairs/ }).getAttribute("aria-selected")) ===
      "true",
  );
  await page.keyboard.press("ArrowLeft");
  check(
    "ArrowLeft wraps",
    (await page.getByRole("tab", { name: /Events/ }).getAttribute("aria-selected")) === "true",
  );
  await page.keyboard.press("Tab");
  check(
    "tab panel is keyboard reachable",
    await page.locator("#capability-panel").evaluate((el) => el === document.activeElement),
  );
  await page.locator("#group").scrollIntoViewIfNeeded();
  await shot("manifesto");
  await page.locator("#thinking").scrollIntoViewIfNeeded();
  await shot("thinking");
  await page.locator(".sg-note-button").first().click();
  check("first editorial note opens", await page.locator("dialog").isVisible());
  await shot("editorial-note");
  await axe("dialogAccessibility");
  await page.keyboard.press("Escape");
  check(
    "Escape restores trigger focus",
    !(await page.locator("dialog").isVisible()) &&
      (await page
        .locator(".sg-note-button")
        .first()
        .evaluate((el) => el === document.activeElement)),
  );
  await page.locator(".sg-note-button").nth(1).click();
  check("second note distinct", (await page.locator("dialog h2").textContent()).includes("A room"));
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page.locator("#connect").scrollIntoViewIfNeeded();
  await shot("planner");
  await page.getByRole("button", { name: "BUILD MY CONVERSATION PLAN" }).click();
  check("empty plan blocked", await page.locator("#goal").evaluate((el) => !el.validity.valid));
  await page.locator("#goal").fill("                ");
  await page.getByRole("button", { name: "BUILD MY CONVERSATION PLAN" }).click();
  check(
    "whitespace plan blocked",
    await page.locator("#goal").evaluate((el) => !el.validity.valid),
  );
  await page.locator("#connection").selectOption({ label: "Communications" });
  await page.locator("#goal").fill("Create a clear shared narrative for our sector.");
  await page.locator("#horizon").selectOption({ label: "Ready in the next three months" });
  await page.getByRole("button", { name: "BUILD MY CONVERSATION PLAN" }).click();
  check(
    "plan reflects selections",
    (await page.locator(".sg-plan-result pre").textContent()).includes(
      "Connection: Communications",
    ),
  );
  await page.getByRole("button", { name: "COPY PLAN" }).click();
  await page.waitForFunction(
    () => document.querySelector('[role="status"]')?.textContent === "Plan copied.",
  );
  check(
    "clipboard has plan",
    (await page.evaluate(() => navigator.clipboard.readText())).includes(
      "Create a clear shared narrative",
    ),
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "DOWNLOAD .TXT" }).click();
  check(
    "download works",
    (await downloadPromise).suggestedFilename() === "signal-conversation-plan.txt",
  );
  await shot("planner-result");
  await axe("pageAccessibility");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator(".sg-mobile-nav summary").click();
  check("phone menu opens", (await page.locator(".sg-mobile-nav").getAttribute("open")) !== null);
  await shot("phone-menu");
  await page.locator(".sg-mobile-nav nav").getByRole("link", { name: "Our capabilities" }).click();
  check("phone navigation works", page.url().endsWith("#capabilities"));
  check("phone menu closes", (await page.locator(".sg-mobile-nav").getAttribute("open")) === null);
  await page.getByRole("tab", { name: /Events/ }).click();
  check(
    "phone capability selection",
    (await page.getByRole("tab", { name: /Events/ }).getAttribute("aria-selected")) === "true",
  );
  await shot("phone-capabilities");
  await axe("phoneAccessibility");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  check(
    "system reduced motion respected",
    (await page.locator(".sg").getAttribute("data-motion")) === "off",
  );
  check("system reduced motion disables replay", await page.locator("[data-replay]").isDisabled());
  await shot("reduced-motion-phone");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(
    () => document.querySelector(".sg")?.getAttribute("data-motion") === "on",
  );
  check(
    "live media preference change",
    (await page.locator(".sg").getAttribute("data-motion")) === "on",
  );
  await page.goto(`${base}/hero.html`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  check("standalone hero loads", await page.locator("h1").isVisible());
  check("standalone excludes homepage", (await page.locator("#capabilities").count()) === 0);
  await shot("standalone-phone");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(3500);
  await shot("standalone-desktop");
  const staticContext = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(base);
  check(
    "no-JavaScript page readable",
    (await staticPage.locator("h1").isVisible()) &&
      (await staticPage.locator("#group h2").isVisible()),
  );
  await staticContext.close();
  check("no runtime errors", report.errors.length === 0);
} catch (error) {
  report.failure = error.message;
  await shot("failure");
  process.exitCode = 1;
} finally {
  await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}
