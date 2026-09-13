# Design QA — Homepage Product Thinking Network

## Visual truth

- Source reference: Browser Comment 1 attached to the implementation request, desktop Persian homepage at `http://localhost:3000/fa`.
- Implementation preview: `http://127.0.0.1:4173/fa` in the isolated Edge preview window.
- Scope: background pattern only. The hero copy, typography, navigation, mast layout, and lower hero content remain unchanged.

## Comparison

- Content hierarchy: passed — eyebrow, name, positioning statement, specialties, and hero links retain their existing DOM order and alignment.
- Composition: passed — the central copy has a soft low-density quiet zone; visual density increases asymmetrically toward the outer field and corners.
- Visual language: passed — a low-opacity 160×160 square lattice repeats consistently across the background, with restrained intersection nodes and a sparse 640×640 accent rhythm.
- Brand balance: passed — neutral network geometry dominates; orange remains limited to sparse active nodes and a restrained set of moving signal points.
- Layering: passed — the pattern is `position: absolute`, `inset: 0`, `pointer-events: none`, and remains below the unchanged hero content.

## Responsive and theme matrix

- Mobile 320–430px: passed — the same repeat system scales through the responsive viewBox, uses lower opacity, reduces the runner set from eleven to nine, keeps four edge-route signals reliably visible, removes pointer response, and preserves a larger central quiet zone.
- Mobile name seal: passed — the transparent PNG sits on a transparent stage; dark mode therefore matches the hero background exactly, while light mode applies a high-contrast dark treatment to the seal artwork. Two sparse broken arcs and one accent point orbit outside the artwork without obscuring the name.
- Tablet 768–1024px: passed — scalable desktop viewBox crops without distortion and preserves the central copy zone.
- Desktop 1280–2560px: passed — full spatial composition uses `preserveAspectRatio="xMidYMid slice"` and percentage-based masking.
- Light mode: passed — all neutrals derive from `--portfolio-text`, the surface derives from `--portfolio-bg`, and the existing warm light theme remains authoritative.
- Dark mode: passed — the same geometry and component use the existing dark tokens; no duplicated theme illustration or pure-black override was added.
- Persian and English: passed — the background has no readable labels or directional text and is independent of RTL/LTR content.

## Motion, accessibility, and performance

- Ambient motion: passed — a shared 13-second Product Decision Loop carries eleven staggered signals on desktop and nine on mobile through orthogonal routes, activates twelve slightly larger decision nodes, keeps four runners on viewport-safe edge routes, converges toward the central quiet zone, and triggers the mobile seal response in the same cycle.
- Motion logic: passed — routes follow the square lattice instead of arbitrary curves; activation order communicates signal → connection → selected route → focus without adding labels or competing with the hero copy.
- Pointer response: passed — desktop fine pointers reveal only a compact local area of the existing lattice through a radial proximity mask; the whole background no longer shifts.
- Reduced motion: passed — CSS animations, path runner, proximity response, transitions, and transforms are disabled by `prefers-reduced-motion: reduce`.
- Seal motion: passed — the structural orbit uses transform-only 13-second rotation and the accent point responds once near the convergence phase; reduced-motion keeps the decoration static.
- Interaction safety: passed — decorative markup is `aria-hidden`, unfocusable, and cannot intercept pointer input.
- Runtime: passed — Persian and English routes both returned HTTP 200 with the original hero content and the enhanced `hero-product-pattern`; dark and light desktop frames were inspected in the in-app browser.
- Static validation: passed — ESLint, Nuxt typecheck, client/server production compilation, prerendering, and `git diff --check` completed successfully. Final Nitro packaging remained idle after compilation and was stopped; no compile error was reported.

final result: passed
