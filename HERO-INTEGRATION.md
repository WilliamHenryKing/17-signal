# Integrating the Signal hero

Signal is an independent corporate website concept using a fictional brand. Replace branding, copy and imagery with approved assets before using it on a real organisation's website.

## Plain HTML / CMS

Build with `bun install --frozen-lockfile` and `bun run build`. The output `dist/hero.html` contains the complete static hero markup and references to its CSS and module entry. React is not loaded by this entry.

Copy the `.sg-hero` section into your template inside a wrapper with `class="sg"`. Copy the linked files and imports from `dist/assets/`, the local fonts and their OFL notices from `public/fonts/`, and `public/images/forum.webp`. Include the generated stylesheet and module-script references from the built HTML. Adjust asset URLs if the CMS serves assets beneath a subdirectory.

The module calls `mountMotion(root, false)` from `src/motion.ts`. It scopes its work to the `.sg` wrapper and returns a cleanup function. Call cleanup when a router removes the hero. Styling is scoped to `.sg` with uniquely named font families. One instance per page is the supported integration. Native scrolling remains owned by the host page.

The standalone preview is served at `/hero.html` (Cloudflare may canonicalise this to `/hero`). It points its links at the full demo's `/#group`, `/#capabilities`, `/#thinking` and `/#connect`; replace them with the destination website's real routes. Do not leave demonstration links in a production client integration.

## React

Import `Hero` from `src/Hero.tsx`, `src/hero.css` and `mountMotion`. Initialise motion in a scoped `useGSAP` hook and return cleanup; see `src/App.tsx`. The homepage's capability panels, notes and local planner are separate from the hero entry and are optional.

## Adapt the visual system

Palette variables live at the top of `src/hero.css`. The provisional logo is `SignalMark`; the original woven line graphic is `Ribbon`. Text and navigation stay real HTML. Replace the photograph by editing the image path, dimensions and crop. The hero uses two self-hosted OFL fonts: Barlow Condensed 700 and Manrope. Retain their licence notices if retaining the fonts.

Desktop uses the oversized three-line heading with a separate signal/image composition. Phones use a vertical poster layout with a smaller landscape signal field. The opening completes in about three seconds, then holds. Replay and motion-off controls are included, with live system reduced-motion handling and static defaults. There is no video, WebGL, animation gate, external runtime asset request or perpetual loop.

The full demo's conversation planner sends nothing; integrating it into a real site requires a separately chosen contact workflow. Do not describe its local preview as a submitted enquiry.
