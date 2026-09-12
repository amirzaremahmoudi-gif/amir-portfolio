# About Hero Design QA

## Evidence

- Source visual truth: `C:\Users\a.zare\.codex\generated_images\01a084bb-001e-7fc2-8e6e-8421dbc7c089\exec-a13489c2-df36-4c95-8183-4a7d56fdafb6.png`
- Combined comparison: `D:\Projects\amir-portfolio\design-qa-about-comparison.png`
- Desktop dark implementation: `D:\Projects\amir-portfolio\design-qa-about-dark.png`
- Mobile Persian dark implementation: `D:\Projects\amir-portfolio\design-qa-about-mobile-fa-dark.png`
- Mobile Persian light implementation: `D:\Projects\amir-portfolio\design-qa-about-mobile-fa-light.png`
- Mobile English light implementation: `D:\Projects\amir-portfolio\design-qa-about-mobile-en-light-final.png`
- Route: `http://localhost:3000/{fa|en}/about`
- Desktop CSS viewport: 1961 × 1150 at browser density 1.25; screenshot pixels: 2428 × 1438.
- Mobile CSS viewport: 398 × 1150 at browser density 1.25; screenshot pixels: 475 × 1438.
- Source sheet pixels: 1536 × 1024. The generated source is a multi-state presentation sheet, so comparisons use its individual hero compositions as visual truth rather than treating the sheet canvas as a pixel-identical viewport.

## Full-view comparison

The implementation preserves the selected Topographic Finance direction: centered editorial hierarchy, orange contour/data-node artwork, warm light theme, graphite dark theme, and a quiet central readability zone. User-directed deviations from the source are intentional: the hero is edge-to-edge, has no radius, fills the first viewport, places the fixed header over the artwork, and moves the copy higher into the quiet area.

## Focused region comparison

The hero copy region was checked directly because typography, centered alignment, wrapping, and pattern contrast are the fidelity-critical details. Desktop Persian renders in two lines. Mobile Persian and English render in three lines. Label, identity, headline, and accent line share the same horizontal center. The background swaps to a separately generated light or dark asset rather than using a color inversion.

## Required fidelity surfaces

- Fonts and typography: existing portfolio display/interface fonts are preserved. Weight, line height, and optical size match the selected direction. Desktop Persian is two lines; both mobile locales are three lines without truncation.
- Spacing and layout rhythm: hero measures exactly 100svh, spans the full content width, begins at y=0, and keeps the fixed header over the hero. Copy is raised into the low-detail zone and remains centered.
- Colors and visual tokens: light uses the existing deep-ink text on warm ivory artwork; dark uses warm white text on graphite artwork. Accent continues to use the portfolio orange token.
- Image quality and asset fidelity: dedicated 1536 × 768 generated raster assets are used for light and dark themes. They preserve contour lines, nodes, glow, and central negative space without CSS-drawn substitutes.
- Copy and content: existing localized label, profile name/location, and headline remain unchanged in Persian and English. RTL/LTR direction remains native to each locale while text alignment is centered.

## Comparison history

1. P1 — Dark theme initially rendered the light artwork because the scoped global selector compiled too broadly. Fixed by scoping the full `.dark .about-hero__surface` selector; post-fix evidence uses `about-topographic-dark.png` and warm-white text.
2. P2 — Desktop Persian initially wrapped into excessive lines. Increased the readable text width and tuned display size; post-fix evidence shows exactly two centered lines.
3. P2 — Copy initially sat too low over the active contour area. Increased logical bottom padding to move the complete text group into the calm upper-middle zone.
4. P2 — Mobile Persian and English initially exceeded the requested height. Rebalanced locale-specific widths and sizes; post-fix browser measurement reports three lines in each locale.

## Findings

- No actionable P0, P1, or P2 differences remain.
- P3: the source board includes tiny decorative numeric labels that were intentionally omitted from the production artwork to avoid non-semantic noise and preserve bilingual clarity.
- Existing below-the-fold icon-loader warnings remain for profile-fact icons; they predate and are outside this hero redesign. No browser runtime errors were observed.

## Implementation checklist

- [x] Edge-to-edge, radius-free hero.
- [x] First viewport height with header overlay.
- [x] Centered copy group placed in the quiet pattern zone.
- [x] Independent light and dark artwork.
- [x] Persian and English responsive wrapping.
- [x] No horizontal overflow at tested desktop or mobile widths.
- [x] ESLint, Nuxt typecheck, and diff whitespace checks pass.

final result: passed
