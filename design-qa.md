# Design QA — Toranj Insurance Product Overview

- Source visual truth: `C:\Users\a.zare\AppData\Local\Temp\amir-portfolio-design-qa\overview-before.png`
- Implementation screenshot: `C:\Users\a.zare\AppData\Local\Temp\amir-portfolio-design-qa\overview-after.png`
- Challenge/role implementation screenshot: `C:\Users\a.zare\AppData\Local\Temp\amir-portfolio-design-qa\challenge-role-after.png`
- Responsibility alignment screenshot: `C:\Users\a.zare\AppData\Local\Temp\amir-portfolio-design-qa\role-alignment-after.png`
- Architecture implementation screenshot: `C:\Users\A1C0B~1.ZAR\AppData\Local\Temp\amir-portfolio-design-qa\architecture-lifecycle-rows-final.png`
- Primary-journey source: latest Browser annotation capture for `section#section-5` at 1961 × 1150 CSS px.
- Primary-journey implementation screenshot: `C:\Users\A1C0B~1.ZAR\AppData\Local\Temp\amir-portfolio-design-qa\primary-journey-editorial-final.png`
- Interface-system source: latest Browser annotation capture for `section#section-10` at 1617 × 1150 CSS px.
- Interface-system implementation screenshot: `C:\Users\a.zare\AppData\Local\Temp\amir-portfolio-design-qa\interface-system-compact-final.png`
- Final-UI source assets: `D:\Projects\portfolio-handoff\toranj-insurance\purchase\otp-original-hq.png`, `onboarding-01-original-hq.png`, `onboarding-02-original-hq.png`, `onboarding-03-original-hq.png`, `purchase-02-investment-amount-original-hq.png`, and `purchase-04-success-original-hq.png`.
- Final-UI gallery implementation screenshot: `D:\Projects\amir-portfolio\design-qa-assets\final-ui-gallery.png`
- Edge-state source assets: seven one-to-one captures from `D:\Projects\portfolio-handoff\toranj-insurance\states` — loading, empty, validation, warning, network, pending, and success.
- Edge-state gallery implementation screenshot: `D:\Projects\amir-portfolio\design-qa-assets\state-ui-gallery.png`
- Hero identity source assets: `D:\Projects\portfolio-handoff\toranj-insurance\hero\hero-rose.png` and `hero-afran.png`.
- Hero identity implementation screenshot: `D:\Projects\amir-portfolio\design-qa-assets\hero-duo.png`
- Selected cinematic poster target: `C:\Users\a.zare\.codex\generated_images\01a05709-aec6-78d3-97a0-6db9cc69c080\exec-2c7148f1-8f25-42fa-a53b-974543e80d56.png`.
- Selected cinematic poster implementation screenshot: `D:\Projects\amir-portfolio\design-qa-assets\hero-poster-option-2.png`
- Combined comparison: `C:\Users\a.zare\AppData\Local\Temp\amir-portfolio-design-qa\overview-comparison.png`
- Route: `http://localhost:3000/fa/work/toranj-insurance`
- Viewport: 1961 × 1150 CSS px
- Source pixels: 2428 × 1438
- Implementation pixels: 2428 × 1438
- Browser-reported device pixel ratio: 0.8
- Density normalization: none; both captures use the same browser, viewport, dimensions, route, theme, and scroll position.
- State: Persian, RTL, dark theme, product overview section in view.

## Full-view comparison evidence

The original section used one centered text column, which flattened the hierarchy and left the long product description visually undifferentiated. The revised section keeps the approved content but introduces an editorial split: a single-line title, a prominent product-definition lead, a separated supporting description, and a compact mobile-first note. The section remains borderless; only internal dividers are used.

## Focused region comparison evidence

The heading and overview copy were legible at full-view capture size, so a separate crop was not required. Browser measurement confirmed the title uses `white-space: nowrap`, renders at 54.4px with a single 64.18px line box, and the page has no horizontal overflow.

## Findings

- No P0, P1, or P2 issues remain for the requested desktop state.
- Typography: approved font and weight are preserved; title hierarchy is stronger and the Persian title remains on one line.
- Spacing/layout: the asymmetric two-column structure has a clear reading order and balanced whitespace.
- Colors/tokens: existing text, muted, accent, surface, and divider tokens are reused.
- Image quality/assets: this text-only section contains no image asset to reproduce.
- Copy/content: all approved text is unchanged.
- Console: no new runtime errors from the interface-system changes. Existing non-blocking icon warnings remain, along with the pre-existing language-switcher hash hydration mismatch when loading the page directly at `#section-10`.

## Comparison history

1. P2 — The overview was a centered text block without enough hierarchy. Fixed with a borderless editorial split, lead treatment, internal divider, and separated supporting note.
2. P2 — The revised heading wrapped across two lines at the desktop review width. Fixed by scaling the desktop heading and keeping it on one line; mobile retains safe wrapping.
3. Post-fix evidence — Same-route browser capture confirms the final structure, one-line heading, correct RTL direction, and no page-level horizontal overflow.
4. P2 — The challenge heading and role summary wrapped at the reviewed desktop width, and responsibility labels were not centered within their grid cells. Fixed with desktop-only single-line rules and equal-height flex centering for every responsibility item.
5. Post-fix evidence — Browser measurements confirm the challenge title and role summary each occupy one line. All nine responsibility items are 71.99px high with `align-items: center`, `justify-content: center`, and centered text. The page remains free of horizontal overflow.
6. P2 — The architecture section used a dense timeline plus individually framed content cards, which reduced scanability and conflicted with the borderless surface rule. Rebuilt it as an open five-column lifecycle matrix with an editorial two-column introduction, transparent group surfaces, internal dividers, and individually scannable information rows.
7. Post-fix evidence — The Persian desktop render shows five lifecycle groups, transparent surfaces, consistent internal dividers, a single-line architecture title, correct RTL flow, and no page-level horizontal overflow. Below 768px the matrix becomes a readable vertical sequence.
8. P2 — The five-column matrix still read too much like a table and the numeric labels added unnecessary noise. Replaced it with five open lifecycle rows: a numberless visual anchor and title establish each stage, while the related destinations are grouped as soft, borderless labels with natural RTL wrapping.
9. Post-fix evidence — Browser measurements confirm five groups, five visible 18 × 18px library-icon anchors, zero numeric headers, 60 preserved destination labels, and no section-level horizontal overflow. Each row stacks cleanly below 768px.
10. P2 — The primary journey used an imbalanced 4 + 4 + 1 matrix, causing the final state to sit alone and making the section read like a dense table. Rebuilt the flow as a balanced 3 × 3 editorial journey index with open surfaces, large low-contrast step numbers, consistent title/detail alignment, and a restrained accent surface for the active-policy outcome.
11. P2 — The technical FACT/RECONSTRUCTED caption competed with the journey title and was explicitly marked for removal. Removed it from the visible interface while retaining the approved wording as the journey's accessible label.
12. Post-fix evidence — Same-route browser measurements confirm nine equal-height 172px journey entries across three equal desktop columns, two equal-width supporting paragraphs, correct RTL direction, no visible technical caption, and no section-level horizontal overflow. Tablet collapses to two columns with the outcome spanning the row; mobile becomes a single-column sequence.
13. P2 — The wireframe reconstruction caption duplicated metadata already communicated by the section and was explicitly marked for removal. Removed it from the visible hierarchy and retained the wording only as the wireframe grid's accessible label.
14. P2 — The wireframe introduction wrapped across two desktop lines. Tuned the desktop type size and available width so the approved Persian sentence stays on one line at the reviewed viewport, while tablet and mobile retain safe wrapping.
15. Post-fix evidence — Browser measurement confirms one 32px text line at 16px type, zero visible section captions, all seven wireframes preserved, and no section-level horizontal overflow.
16. P2 — The reconstructed-rationale caption in the UX-decisions section was explicitly marked for removal. Removed it from the visible hierarchy and retained it only as the decision list's accessible label.
17. P2 — The final-interface introduction wrapped and its nine sequence items aligned from the start of each cell. The desktop introduction now uses one 16px line, while every sequence cell uses equal 72px height with centered cross-axis, main-axis, and text alignment; tablet and mobile keep safe wrapping.
18. Copy correction — Renamed the eighth primary-flow step from «پرداخت بیرونی» to «درگاه پرداخت» and replaced its description with «اتصال به درگاه پرداخت.» as requested.
19. Post-fix evidence — Browser measurement confirms no visible section-7 caption, a one-line section-8 introduction, nine identically centered sequence items, correct payment-gateway wording, and no overflow in sections 7 or 8.
20. Content structure — Removed the former Improvements and Outcomes sections from the rendered case study and both language outlines. Learnings now closes the case study as section 13, keeping section IDs and all 13 navigation links continuous and valid.
21. P2 — The interaction section mixed an explanatory paragraph, an uneven open index, and two unpublished motion placeholders. Removed the paragraph and both media slots, then rebuilt the 12 interactions as a balanced 3 × 4 catalogue of borderless surface modules with consistent number and label hierarchy.
22. Post-fix evidence — Browser measurement confirms 12 equal-height 116px modules across three equal desktop columns, zero perimeter borders, no motion placeholders, no introductory paragraph, correct RTL direction, and no section-level horizontal overflow. The catalogue collapses to two columns on tablet and one on mobile.
23. P2 — The interaction catalogue used periodic accent-tinted modules, making item 09 appear selected. Removed the alternating tint so all 12 interactions now share the same surface treatment.
24. P2 — The interface-system section described typography and product colours but visualized them as a generic 10-item grid. Removed that grid and replaced it with two borderless specimens: a Peyda type board showing display, heading, and interface scales, and a palette board showing Toranj green, Rose burgundy, Afran blue, and the neutral system surface.
25. Post-fix evidence — Browser measurement confirms identical interaction-module backgrounds, zero legacy system-grid nodes, two borderless showcase boards, four distinct colour swatches, the Peyda specimen, correct RTL direction, and no section-level horizontal overflow.
26. P2 — The typography board was an abstract CSS specimen rather than the supplied Peyda weight reference. Replaced it with a real raster asset derived from the approved image, placed in a borderless editorial figure with localized alt text and a concise bilingual caption.
27. P2 — The palette named the product colours without exposing their usable values. Updated all four swatches to explicit product-system colours and added visible hexadecimal codes for Toranj green, Rose burgundy, Afran blue, and the neutral interface surface.
28. P2 — The typography reference and caption were constrained to half of the system showcase. Expanded the specimen and its caption to fill the full content container; the palette now follows as a responsive four-column strip.
29. P3 — Hex values were too small to scan alongside the swatches. Increased the code size and weight while preserving their LTR formatting.
30. P2 — The colour palette still read as four compact utility rows. Rebuilt it as a visual colour atlas with large uninterrupted fields, high-contrast HEX capsules, clear usage labels, and a responsive mosaic layout. All surfaces remain borderless.
31. P2 — The typography reference and colour atlas were stacked into two tall full-width boards, making the interface-system section unnecessarily long. Reflowed them into a balanced desktop split, tightened the introduction and internal spacing, and reduced the swatch height while preserving every colour, code, label, caption, and a readable single-column mobile layout.
32. Post-fix evidence — At the annotated 1617 × 1150 viewport, the two specimens form a 672px/368px split with matching 511px heights; the complete section is 767px tall, all four swatches remain 100px high, the supplied typography image is loaded without cropping, both boards have zero perimeter borders, and section 10 has no horizontal overflow.
33. P2 — The final-interface section still relied on unpublished media placeholders and did not expose the supplied production UI references. Replaced the placeholders with six reviewed source images under one neutral «برخی صفحات UI» label; the duplicated investment-amount path is included only once.
34. P2 — Static image tiles did not let visitors inspect the detailed UI. Rebuilt the section as a responsive 3 × 2 gallery with uncropped thumbnails and a full-viewport lightbox. Each tile is keyboard-accessible; the overlay supports previous/next controls, arrow keys, Escape, backdrop dismissal, a visible position counter, and scroll locking.
35. Post-fix evidence — Browser QA confirms six gallery buttons, full-resolution source rendering without cropping, a working 1/6 to 2/6 transition, successful Escape dismissal, localized accessible labels, and a borderless presentation consistent with the saved surface preference.
36. Content cleanup — Removed the final-interface introductory sentence at the user's annotated target and its now-unused responsive styling. The sequence grid now follows the section heading directly without leaving an orphaned text gap.
37. P2 — The edge-state section still used an unpublished compact media placeholder. Replaced it with seven real product captures selected from the supplied `states` directory and matched one-to-one with the existing loading, empty, validation, warning, network, pending, and success state cards.
38. Asset curation — Omitted the duplicate alternate loading, success, and generic connection-error exports so the gallery remains concise and each visible tile maps to exactly one named state.
39. Post-fix evidence — Browser QA confirms seven state-gallery buttons, zero remaining media placeholders in section 11, a working fullscreen 1/7 to 2/7 transition, successful close action, localized labels, and responsive borderless presentation.
40. P2 — The case-study hero still opened with a large unpublished media placeholder. Replaced it with the two supplied Rose and Afran identity renders in a single cinematic 1.72:1 split frame, preserving each portrait composition without distortion.
41. Visual hierarchy — Added a compact centered bridge caption, restrained product labels, hover/focus feedback, and a borderless shadow-led surface. The pair stacks into two full-width portrait panels on mobile.
42. Post-fix evidence — In-app Browser QA confirms two real image panels, zero remaining top-level media placeholders, a working fullscreen 1/2 to 2/2 gallery transition, successful close action, and correctly centered RTL overlay copy.
43. Selected direction — Replaced the interim split composition with the user's selected second ideation result, retaining the exact cinematic montage, film-title typography, crimson/blue atmosphere, and editorial index details as a single high-fidelity poster asset.
44. Responsive implementation — The selected 1637 × 960 artwork fills the case-study container at its native ratio without distortion, uses a borderless shadow-led presentation, and keeps the discreet fullscreen affordance and hover/focus feedback.
45. Post-fix evidence — Same-browser comparison confirms the selected poster is reproduced without recropping or text reconstruction. Fullscreen opens as 1/1 and closes successfully; ESLint, Nuxt typecheck, and diff validation pass.
46. Selected direction — Implemented the approved refined mobile homepage hero from `C:\Users\a.zare\.codex\generated_images\01a05709-aec6-78d3-97a0-6db9cc69c080\exec-38ab09ca-df16-43ea-9676-c633baba019b.png`. The implementation is intentionally scoped to widths below 768px; the desktop hero remains unchanged.
47. P2 — The first implementation approximated the circular name seal with an oversized library icon and inherited positional selectors that hid the role label. Replaced the approximation with a cropped, transparency-processed raster asset from the exact selected visual and introduced explicit semantic classes for role, separator, and location.
48. P2 — The animated expertise label could appear blurred during the screenshot state and the introduction was visually heavier than the source. Mobile now uses a stable first expertise label, softer positioning copy, and a compact centered hierarchy while desktop retains the animated treatment.
49. Post-fix evidence — Compared `design-qa-assets/home-mobile-hero-option-2-source-normalized.png` and `design-qa-assets/home-mobile-hero-option-2-refined.png` together. At the 398 × 1150 CSS viewport, the implementation preserves the source's centered role/location, exact circular identity artwork, narrow specialist statement, expertise tier, paired CTAs, and transition into selected work. The mobile hero is 987px tall, the next section starts at 999px, and there is no horizontal content overflow.
50. Required fidelity surfaces — Typography uses the existing Persian product font and matches the selected hierarchy; spacing follows the source's centered vertical rhythm; existing dark and orange tokens are preserved; the identity artwork uses the exact selected raster crop without distortion; all production copy and live links remain accessible in the DOM.
51. Interaction and runtime — A fresh in-app Browser tab at 398 × 1150 reports no console errors. «پروژه‌های منتخب» scrolls to `#selected-work`, «درباره من» resolves to `/fa/about`, and the mobile menu remains available. Nuxt typecheck and diff validation pass.
52. Mobile annotation refinement — Removed the top location and decorative sparkle below 768px, leaving one concise job-title eyebrow. Restyled the title with a stronger optical weight, warm-white foreground, and a restrained orange divider.
53. Image fidelity — Edited the approved identity-seal asset itself so «امیر زارع» uses a visibly heavier ExtraBold/Black treatment while preserving the Persian spelling, circular ornament, embedded location, palette, and transparent placement. The project now consumes `public/images/home/amir-zare-mobile-seal-bold.png`.
54. Responsive copy — Expanded the specialist statement from a narrow character measure to a balanced full-width measure. Browser measurement at 351 × 920 confirms a 52.06px block on a 26.05px line-height: exactly two rendered lines.
55. Expertise composition — Rebuilt the expertise heading as a centered RTL row with the existing box icon on the right. The icon uses an accent-tinted borderless surface and soft shadow; the expertise value remains on its own centered line.
56. Post-fix evidence — `design-qa-assets/home-mobile-hero-annotations-refined.png` confirms the annotated 351 × 920 state: top location hidden, ornament hidden, bold identity name, two-line positioning copy, and the expertise icon aligned right. The document has no horizontal overflow, both hero CTAs still work, a fresh tab reports no console errors, and Nuxt typecheck plus diff validation pass.
57. Localization correction — Added a dedicated English identity-seal asset with the exact text `AMIR ZARE` and `TEHRAN, IRAN`. The homepage now resolves the seal from the active locale, while the accessible live heading continues to use `profile.name` in both languages.
58. Light-mode contrast — The localized transparent seal now sits on a deep-ink circular surface with a soft shadow in light mode, keeping the cream name and gold ornament legible without adding a perimeter border. Dark mode retains a subtler surface treatment.
59. Post-fix evidence — `design-qa-assets/home-mobile-en-light.png` and `design-qa-assets/home-mobile-fa-light.png` confirm correct locale-specific assets at 351 × 920. English contains no Persian text, Persian retains its approved lettering, the seal background computes to `rgb(16, 20, 28)` in light mode, no horizontal overflow is present, a fresh tab reports no console errors, and Nuxt typecheck plus diff validation pass.
60. Mobile motion parity — Removed the mobile-only static expertise fallback and restored the existing `MorphText` rotation below 768px. At 344 × 920 the visible value advances from «طراحی سرتاسری محصول» to «طراحی تعامل» on the existing interval, while reduced-motion behavior remains unchanged.
61. Compact expertise treatment — Reduced the expertise icon to 23.19px, added `lucide:box` to the local client bundle, and removed two unused hidden orbit icons. The final fresh-tab render reports no runtime errors or box-icon loading warnings.
62. Minimal selected-work rail — Replaced the single-column mobile project stack below 480px with a compact horizontal snap gallery. `design-qa-assets/home-mobile-selected-work-minimal.png` confirms the section is 424.23px tall at 344 × 920, preserves all four project links in a 1122px scrollable rail, uses compact circular reveal affordances, and introduces no document-level horizontal overflow. `design-qa-assets/home-mobile-expertise-motion.png` confirms the refined hero-to-work transition.
63. Mobile about redesign — Replaced the tall portrait-and-copy stack with a borderless poster composition: full-width portrait, floating section label, compact editorial title, two-line summary, and centered continuation link. Desktop styling and the complete source content remain unchanged.
64. Annotation refinement — `design-qa-assets/home-mobile-about-poster.png` confirms the 592 × 592 source portrait is displayed uncropped at its natural square ratio with `object-fit: contain`. The complete Persian title remains visible across two lines at 344 × 920, the summary is constrained to 41.34px, the section is 478.88px tall, and the page has no horizontal overflow or fresh-tab runtime errors.
65. Selected-work alignment — Centered the complete mobile heading group below 480px. `design-qa-assets/home-mobile-selected-work-centered.png` confirms the title, two-line description, and continuation link all share the exact 164.5px horizontal center at 344 × 920, with no page overflow or fresh-tab runtime errors.

## Follow-up polish

- Mobile wrapping is intentionally retained below 768px to prevent clipping.

final result: passed

---

# Home page design QA

final result: passed

## Visual source of truth

- Selected concept: `C:\Users\a.zare\.codex\generated_images\01a05709-aec6-78d3-97a0-6db9cc69c080\exec-8a9b1669-e337-4d4c-844a-47753d16c669.png`
- Source size: 807 × 1949 px
- Implemented matched-width capture: `D:\Projects\amir-portfolio\design-qa-assets\home-expanded-fa-807.png`
- Full desktop implementation capture: `D:\Projects\amir-portfolio\design-qa-assets\home-expanded-fa-desktop.jpg`
- Focused featured-work capture: `D:\Projects\amir-portfolio\design-qa-assets\home-expanded-fa-featured.jpg`
- Side-by-side review artifact: `D:\Projects\amir-portfolio\design-qa-assets\home-expanded-comparison.jpg`
- Compact decisions refinement: `D:\Projects\amir-portfolio\design-qa-assets\home-expanded-decisions-compact.png`
- Working method and evidence refinement: `D:\Projects\amir-portfolio\design-qa-assets\home-working-evidence-final.png`
- Centered decisions, dark theme: `D:\Projects\amir-portfolio\design-qa-assets\home-decisions-centered-pattern-dark.png`
- Centered decisions, light theme: `D:\Projects\amir-portfolio\design-qa-assets\home-decisions-centered-pattern-light.png`
- Professional evidence surface, dark theme: `D:\Projects\amir-portfolio\design-qa-assets\home-evidence-pattern-dark.png`
- Professional evidence surface, light theme: `D:\Projects\amir-portfolio\design-qa-assets\home-evidence-pattern-light.png`
- Final homepage after professional-evidence removal: `D:\Projects\amir-portfolio\design-qa-assets\home-without-professional-evidence.png`
- Compared state: Persian, RTL, dark theme, home page.

## Comparison summary

- Final editorial sequence: featured case snapshot, a compact three-decision editorial strip, three-step working method, then the existing about preview.
- Matched the concept's restrained orange accents, asymmetric desktop composition, internal dividers, and borderless surfaces while reducing the decision section's vertical footprint.
- Used approved Toranj case-study assets and the existing approved portrait instead of reproducing fictional imagery from the generated concept.
- Preserved all pre-existing navigation, hero, footer, locale, and theme behavior.
- Deliberately omitted the proposed final CTA section, per the user's selection.

## Responsive verification

- Desktop: 1280 × 920 and 1294 × 920; no horizontal overflow.
- Tablet: 768 × 1024 and matched-width 807 × 1000; no element exceeds the viewport bounds.
- Mobile: 390 × 844; compact single-column composition, no horizontal overflow in RTL or LTR.
- Persian: `lang=fa`, `dir=rtl`, dark and light themes verified.
- English: `lang=en`, `dir=ltr`, dark and light themes verified.

## Interaction and browser verification

- Featured Toranj project link opens the English and Persian case-study route.
- The decision strip is intentionally informational: it contains no repeated imagery or per-item calls to action.
- Language switcher verified in both directions.
- Theme switcher verified in both directions and restored to Persian dark for handoff.
- Production preview console: no warnings or errors from the home page.
- The removed professional-evidence section leaves no DOM node, translation entry, dedicated icon registration, responsive style, or layout gap.

## Issue history

- P2 — The four evidence icons were absent in the first development-server review because their dynamic names were not present in the explicit Nuxt Icon client bundle. Fixed by registering all four icons and rendering statically discoverable icon names. Rechecked in the production preview: all four masks resolve and the console is clean.
- P2 — The initial decisions implementation was too tall and repeated every item with a large image and call to action. Rebuilt it as a text-only three-column editorial strip; mobile uses three concise stacked rows. Production measurements are 513.81px on desktop and 724.86px on mobile, with zero images, zero links, and no horizontal overflow.
- P2 — The working-method heading and steps were visually offset and the desktop title wrapped unnecessarily. Centered the complete section, kept the desktop title on one line, equalized all three step panels, and replaced plain numbers with restrained circular index markers. Production measurement confirms a 56.56px single title line and three equal 209.09px centered steps at 1280px.
- P2 — Professional evidence used an asymmetric heading/table split and undersized utility cells. Moved the centered heading above four independent editorial cards, added consistent icon surfaces and subtle accent rules, and aligned all copy from the center. The desktop cards are four equal 192px panels; mobile uses a compact 2 × 2 grid, reducing the section from 926.66px to 589.05px without horizontal overflow.
- P2 — The decisions header and card copy were split across opposing alignments, while the section did not separate clearly from adjacent content. Centered the full header and all three decisions, kept the Persian desktop title to one measured 52.41px line, and introduced a token-driven tonal surface with a masked dot field and restrained accent glow. Production browser QA confirms distinct adaptive light/dark backgrounds, centered geometry, mobile wrapping without overflow, and a clean console in both themes.
- P2 — The professional-evidence section ended without a clear boundary and shared too much of the surrounding page surface. Added a full-width adaptive tonal background, a distinct masked diagonal pattern with a restrained bottom accent glow, and an explicit token-driven bottom divider before the about preview. Production QA confirms the divider in both themes, a clean console, and the existing 2 × 2 mobile card grid at 590.05px with no overflow.
- Scope removal — Removed the complete professional-evidence section at the user's annotated request. Its data mapping, bilingual locale copy, four dedicated icon bundle entries, template markup, and desktop/mobile styles were removed with it. The working-method section now transitions directly into the about preview without a hidden node or blank spacer.
- Content reduction — Removed the working-method introduction and all three step descriptions at the user's annotated targets. The public section now retains only its label, primary heading, numbered visual markers, and three concise step titles; the unused bilingual copy and paragraph styles were removed as well.
- UX writing — Replaced the three homepage decision descriptions with concise, general, outcome-led copy in Persian and English. The homepage now speaks to progressive disclosure, consistent interaction patterns, and information prioritisation without changing the approved detailed case-study narrative.
- UX writing — Replaced the homepage about-preview summary with concise, human, outcome-led copy focused on helping users understand, decide, and move forward. The longer profile summary remains unchanged on the dedicated About page.
- No remaining P0, P1, or P2 issues.

## Validation

- Typecheck: passed.
- ESLint: passed.
- Production build with `NUXT_PUBLIC_SITE_URL=https://azuiux.com`: passed.
- `git diff --check`: passed (line-ending notices only).

---

# Working method — typographic rhythm QA

## Evidence

- Source visual truth: `C:\Users\a.zare\.codex\generated_images\01a05709-aec6-78d3-97a0-6db9cc69c080\exec-dd967268-f553-4bde-94e3-d696b13d3ccd.png`
- Source pixels: 1536 × 1024.
- Final desktop implementation: `D:\Projects\amir-portfolio\design-qa-assets\home-working-method-typographic-final-fa-dark.png`
- Final mobile dark implementation: `D:\Projects\amir-portfolio\design-qa-assets\home-working-method-typographic-mobile-fa-dark.png`
- Final mobile light implementation: `D:\Projects\amir-portfolio\design-qa-assets\home-working-method-typographic-mobile-fa-light.png`
- English tablet implementation: `D:\Projects\amir-portfolio\design-qa-assets\home-working-method-typographic-tablet-en-light.png`
- Combined comparison input: `D:\Projects\amir-portfolio\design-qa-assets\home-working-method-typographic-comparison.png`
- Desktop CSS viewport: 1294 × 920 at device density 1; source and implementation were normalized into the same 1440 × 900 comparison canvas.
- Compared state: Persian, RTL, dark theme, working-method section in the homepage context.

## Findings and comparison history

- Initial P2 — The first coded pass preserved the selected three-column composition but the editable outline numerals and icon surfaces were too small and faint compared with the selected visual. Increased numeral scale and stroke contrast, enlarged the library-icon surfaces, and retained the intentionally shorter section height requested in the earlier homepage refinement.
- Post-fix evidence — The final desktop capture has three equal columns, large locale-aware outline numerals, centered orange icon surfaces, centered titles, internal dividers, and the selected subtle vertical rhythm. No outer card borders or raster section artwork were introduced.
- Typography — Existing portfolio display fonts, weight hierarchy, and centered single-line desktop headline match the selected direction; Persian uses ۰۱/۰۲/۰۳ and English uses 01/02/03.
- Spacing and layout — Desktop and tablet keep three equal tracks; mobile changes to three compact 140px rows. At 390px there is zero document-level horizontal overflow.
- Colors and tokens — All foregrounds, surfaces, lines, accent tints, and pattern contrast derive from the portfolio theme tokens and adapt independently in dark and light modes.
- Image quality and assets — The section contains no raster images. The visual system is live text, CSS layout, and three icons from the project's existing Lucide library; no custom SVG or placeholder art is used.
- Copy and content — Existing approved bilingual headings and stage titles are unchanged.
- Focused comparison — The working-method section itself is the focused region, so no additional crop was required beyond the section/viewport captures listed above.
- Browser verification — Persian RTL dark/light, English LTR dark/light, desktop 1294 × 920, tablet 768 × 1024, and mobile 390 × 844 were checked. Theme and language switching work, icon masks render, and the production-preview console contains no errors for port 3002.

## Validation

- Typecheck: passed.
- ESLint: passed.
- Production build with `NUXT_PUBLIC_SITE_URL=https://azuiux.com`: passed.
- `git diff --check`: passed (line-ending notices only).

final result: passed
