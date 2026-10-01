# Release record

Published and verified 1 October 2026, about 12:49 SAST.

- Website: https://17-signal.williamking.workers.dev
- Standalone hero: https://17-signal.williamking.workers.dev/hero.html
- Public source: https://github.com/WilliamHenryKing/17-signal
- Deployed application commit: `25f1911a080e3b25faeeba592d2053e34d1dbefd`.
- Cloudflare version: `9ced8745-638b-40b3-b87a-57acfd995410`.

All seventeen public output files were fetched and SHA-256 compared against the local production build. Homepage and standalone hero return 200; an unknown route returns the authored 404. Clean-context desktop and phone browser loads show the correct title, no overflow and no runtime errors. The live captures were also visually inspected. [Full live receipt](live-report.json).

Cold browser resource transfer was about 352 KB excluding the HTML response in the recorded desktop/phone sessions. First contentful paint was 960 ms desktop and 552 ms phone viewport on this machine/network. These are two observed Chrome runs, not mobile hardware benchmarks or a universal speed guarantee.

All 52 local browser checks pass, and axe reports zero WCAG A/AA violations in the three recorded states. [Scope and limitations](VERIFICATION.md).

Later commits that add this receipt and documentation do not change the deployed application revision above. No GitHub Actions workflow is configured; local checks and live verification are the release evidence, not remote CI.
