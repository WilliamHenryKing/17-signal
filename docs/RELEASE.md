# Release record

Naming refinement published and verified 1 October 2026, about 14:02 SAST. The current release uses the fictional Signal identity throughout the website, metadata, exports and rendered media.

- Website: https://17-signal.williamking.workers.dev
- Standalone hero: https://17-signal.williamking.workers.dev/hero.html
- Public source: https://github.com/WilliamHenryKing/17-signal
- Deployed application commit: `9bf0f7e675bbbe297cd48a001f9ef60b8c3bdb24`.
- Cloudflare version: `a5eefdc9-e3db-4454-b1cc-353c48bbd91a`.

All seventeen public output files were fetched and SHA-256 compared against the local production build. Homepage and standalone hero return 200; an unknown route returns the authored 404. Clean-context desktop and phone browser loads show the correct title, no overflow and no runtime errors. The live captures were also visually inspected. [Full live receipt](live-report.json).

Cold browser resource transfer was about 352 KB excluding the HTML response in the recorded desktop/phone sessions. First contentful paint was 652 ms desktop and 332 ms phone viewport on this machine/network. These are two observed Chrome runs, not mobile hardware benchmarks or a universal speed guarantee.

All 52 local browser checks pass, and axe reports zero WCAG A/AA violations in the three recorded states. [Scope and limitations](VERIFICATION.md).

Later commits that add this receipt and documentation do not change the deployed application revision above. No GitHub Actions workflow is configured; local checks and live verification are the release evidence, not remote CI.
