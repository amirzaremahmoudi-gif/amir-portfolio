# Design QA — Homepage Product Thinking Network

## Visual truth

- Source reference: Browser Comment 1 attached to the implementation request, desktop Persian homepage at `http://localhost:3000/fa`.
- Implementation preview: `http://127.0.0.1:4173/fa` in the isolated Edge preview window.
- Scope: background pattern only. The hero copy, typography, navigation, mast layout, and lower hero content remain unchanged.

## Comparison

- Content hierarchy: passed — eyebrow, name, positioning statement, specialties, and hero links retain their existing DOM order and alignment.
- Composition: passed — the central copy has a soft low-density quiet zone; visual density increases asymmetrically toward the outer field and corners.
- Visual language: passed — a low-opacity 160×160 square lattice repeats consistently across the background, with restrained intersection nodes and a sparse 640×640 accent rhythm.
- Brand balance: passed — neutral network geometry dominates; orange is limited to sparse active nodes and one small moving point.
- Layering: passed — the pattern is `position: absolute`, `inset: 0`, `pointer-events: none`, and remains below the unchanged hero content.

## Responsive and theme matrix

- Mobile 320–430px: passed — the same repeat system scales through the responsive viewBox, uses lower opacity, removes the secondary signal and pointer response, and preserves a larger central quiet zone.
- Mobile name seal: passed — the transparent PNG sits on a transparent stage; dark mode therefore matches the hero background exactly, while light mode applies a high-contrast dark treatment to the seal artwork. Two sparse broken arcs and one accent point orbit outside the artwork without obscuring the name.
- Tablet 768–1024px: passed — scalable desktop viewBox crops without distortion and preserves the central copy zone.
- Desktop 1280–2560px: passed — full spatial composition uses `preserveAspectRatio="xMidYMid slice"` and percentage-based masking.
- Light mode: passed — all neutrals derive from `--portfolio-text`, the surface derives from `--portfolio-bg`, and the existing warm light theme remains authoritative.
- Dark mode: passed — the same geometry and component use the existing dark tokens; no duplicated theme illustration or pure-black override was added.
- Persian and English: passed — the background has no readable labels or directional text and is independent of RTL/LTR content.

## Motion, accessibility, and performance

- Ambient motion: passed — the lattice drifts slowly as one coherent system, sparse accent nodes breathe, and four small runners move across three routes with different phases and speeds. Mobile hides the faintest runner while preserving visible activity.
- Pointer response: passed — desktop fine pointers update CSS variables through a single `requestAnimationFrame`, capped below 3px for arcs and below 6px for nodes.
- Reduced motion: passed — CSS animations, path runner, proximity response, transitions, and transforms are disabled by `prefers-reduced-motion: reduce`.
- Seal motion: passed — the orbit uses transform-only CSS rotation at two slow, offset durations; reduced-motion keeps the decoration static.
- Interaction safety: passed — decorative markup is `aria-hidden`, unfocusable, and cannot intercept pointer input.
- Runtime: passed — server returned HTTP 200 with both `hero-product-pattern` and the original `home-hero__mast`; production build completed successfully.
- Static validation: passed — ESLint, Nuxt typecheck, production build, and `git diff --check` completed successfully.

final result: passed
