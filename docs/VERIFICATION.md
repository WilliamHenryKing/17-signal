# Verification — Signal

Naming refinement, 1 October 2026: Signal now owns the wordmarks, metadata, accessible names, brief exports and concept copy. All 52 browser checks passed again, with no runtime errors or axe violations in the three recorded states. README screenshots and the social preview were regenerated and visually inspected; the live receipt identifies the resulting release.

1 October 2026. Solo implementation and self-review. [Automated browser receipt](browser-report.json). Chrome 154.0.8037.58, Playwright 1.63.0, axe-core 4.13.0. Every named check in the receipt passes, with no runtime errors and no detected WCAG A/AA violations in the recorded full-page, phone and dialog states.

Strict TypeScript, Biome and the production build pass. Browser checks cover 1920×1080, 1440×900, 768×1024, 390×844, 320×740 and 844×390; every viewport remains free of horizontal document overflow. All five capabilities, ArrowLeft/ArrowRight wrapping, Home/End, panel focus, both editorial dialogs, Escape/focus restoration, empty/whitespace validation, selected form values, clipboard, text download, mobile menu, live reduced-motion changes, standalone hero and no-JavaScript content were exercised.

## Visual review and revisions

Inspected the desktop and phone poster composition, narrow-phone layout, arrival samples, bright manifesto, capability panel, editorial spread, planner and mobile capability state. The first desktop heading wrapped MAKE YOUR across two lines; a deliberate smaller first line restored the intended three-line rhythm. The signal graphic was constrained to its scene so it no longer crossed the navigation. The photograph's outer edge was moved inward to preserve its full frame.

The first mobile capability treatment hid labels behind numbers. It now uses labelled, horizontally scrollable tabs. An early SVG path-length normalisation made the line reveal appear late; measured per-path stroke lengths now produce a continuous visible draw, inspected again in the 1.15-second capture. The opening resolves in approximately three seconds, with optional replay. Dynamic planner content refreshes scroll geometry.

Implementer self-scores (1–5): identity 4; typography/hierarchy 4; colour 4; graphic/photographic composition 4; motion purpose 4; mobile 4; interaction clarity 4. These are subjective self-assessments, not client approval or independent review.

## Loading and limits

Emitted JavaScript is approximately 120.8 KB gzip for the homepage and 45.8 KB gzip for the standalone hero. Hero CSS is approximately 2.4 KB gzip. Manrope is 24,836 bytes; Barlow Condensed 22,444 bytes; the hero photograph is 171,888 bytes. The secondary 160,680-byte photograph loads lazily. No WebGL, video, analytics, backend or external runtime font/image requests.

Physical phones, Safari, Firefox and screen-reader sessions were not tested. Viewport emulation establishes layout and browser behavior on this host. Motion frames are sampled states, not uninterrupted viewing. Official brand adaptation and client-platform integration require actual supplied assets and a known target platform; neither is claimed for this independent demo. Exact live files, deployment identity and live browser readings are in RELEASE.md.
