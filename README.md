# Product Designer Portfolio

A production-ready foundation for a premium, editorial Product Designer portfolio. Personal profile, experience, metrics and professional links are sourced from Amir Zare's 2026 CV. Case-study details and imagery remain explicitly marked as placeholders where project source material has not yet been supplied.

## Technology stack

- Nuxt 4, Vue 3 and TypeScript
- Nuxt UI v4 as the primary component and token system
- Tailwind CSS v4
- Nuxt Content v3 with a typed `work` collection
- Nuxt Image
- Nuxt Sitemap and Robots
- Manrope Variable and Newsreader Variable, self-hosted through Fontsource
- SSR architecture compatible with Vercel

## Project structure

```text
app/
  assets/css/main.css       # Portfolio tokens, typography and global behavior
  components/               # Shared site and case-study components
  pages/                    # Home, work, case study and about routes
  types/project.ts          # Shared project shape
content/
  work/                     # One Markdown file per case study
content.config.ts           # Typed Nuxt Content collection schema
nuxt.config.ts              # Modules, SEO, image and runtime configuration
```

## Installation

Requirements: Node.js 22 or newer and pnpm.

```bash
pnpm install
```

## Local development

```bash
pnpm dev
```

Open `http://localhost:3000`. On Windows, `http://127.0.0.1:3000` can resolve faster.

## Checks and production build

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

## Changing the portfolio theme

The theme layer is centralized in `app/assets/css/main.css`:

- `@theme static` defines fonts and the ochre accent scale used by Nuxt UI and Tailwind.
- `:root` defines light-mode portfolio tokens.
- `.dark` defines the dark-first palette.
- Container width, page gutter, section spacing and corner treatment are custom properties.

Nuxt UI semantic colors are mapped in `app/app.config.ts`. Change those mappings instead of restyling components individually.

## Adding a project

1. Duplicate a file in `content/work/`.
2. Give the file a unique URL-friendly filename, for example `new-product.md`.
3. Complete every frontmatter field defined in `content.config.ts`.
4. Set `order` to control list position.
5. Optionally add `cover` and `coverAlt`. Without a cover, the UI renders a clearly labeled placeholder.
6. Write the case study below the frontmatter using the existing heading structure.

The new project automatically appears at `/work` and is available at `/work/new-product`.

## Case-study content

Nuxt Content validates frontmatter and exposes each Markdown file as a typed page record. The dynamic route at `app/pages/work/[slug].vue` provides the project hero, metadata, readable content area and previous/next navigation. Markdown owns the narrative; Vue components own the composition.

Reusable media components (`ImageBlock`, `ImageGrid`, `MetricBlock` and `QuoteBlock`) are ready for richer verified content in the next phase.

## SEO configuration

Set the production origin in Vercel:

```text
NUXT_PUBLIC_SITE_URL=https://your-domain.com
```

This value powers canonical URLs, sitemap generation and site metadata. Replace the favicon and add a verified Open Graph image before launch.

## Deploying to Vercel

1. Import this repository in Vercel.
2. Keep framework detection set to Nuxt.
3. Set `NUXT_PUBLIC_SITE_URL` to the production domain.
4. Deploy. Nuxt/Nitro will select the Vercel preset automatically.

No Git remote, commits or deployment are created by this project setup.
