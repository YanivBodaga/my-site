# Feature: Site layout

**From build-plan:** feature 1
**Build attempt:** 1
**Branch:** feature/site-layout
**Status:** verified

## Goal

Give every page a Hebrew, right-to-left (RTL) frame in the brand: a header with the logo and menu,
a mobile menu, and a footer with contact and legal links. This feature also folds in the brand
setup the layout depends on: the RTL root, the `BRAND.md` tokens, the fonts, a text logo and
`LICENSES.md`.

## In scope

- **RTL Hebrew root.** `<html lang="he" dir="rtl">`, the brand background, navy text, and Heebo
  as the default font.
- **Brand tokens.** Every `BRAND.md` §2 color and both font families go in `@theme` in
  `app/globals.css` (Tailwind v4, so there is no `tailwind.config`). Remove the starter
  light/dark variables and the `prefers-color-scheme` dark theme, because the brand is light only.
- **Fonts.** Load with `next/font/google`:
  - Heebo: subsets `hebrew` and `latin`, weights 400, 500, 700, 800
  - Fira Code: subset `latin`, weights 300, 700
  - Both are exposed as `--font-heebo` and `--font-fira-code`.
- **Text logo.** `{ Yaniv Bodaga }` in Fira Code 700, isolated as LTR (`dir="ltr"`), shown
  alone (Yaniv's call during review: no visible Hebrew name next to it). It links to `/` with
  the Hebrew accessible name `יניב בודאגה - דף הבית`.
- **Header** (sticky at the top):
  - logo
  - desktop menu linking to home-page anchors: `מה אני בונה` → `/#services`, `עבודות` →
    `/#portfolio`, `עליי` → `/#about`, `צור קשר` → `/#contact`
  - a skip link, `דלג לתוכן הראשי`, that targets `<main id="main">`
- **Mobile menu.** Below the `md` breakpoint, a menu button opens a panel with the same links.
- **Footer:**
  - contact links: `tel:`, `https://wa.me/<number>`, `mailto:`, each with a Lucide icon and a
    visible Hebrew label
  - legal links: `מדיניות פרטיות` → `/privacy`, `הצהרת נגישות` → `/accessibility`, `תנאי שימוש` →
    `/terms`
  - the logo or name, and a copyright line with the current year
- **Site config.** `lib/site.ts` holds the contact details, menu items and legal links. It is
  committed, because these values are public on the site anyway.
- **Hebrew 404.** `app/not-found.tsx`, because the legal links point to routes that won't exist
  until Feature 8.
- **Starter page.** Replace `app/page.tsx` with a minimal Hebrew placeholder inside the layout, and
  delete the unused starter SVGs from `public/`.
- **Starter metadata.** Replace it with a Hebrew title (`יניב בודאגה`) and a one-line Hebrew
  description. Full SEO is Feature 12.
- **Dependency.** Install `lucide-react`.
- **`LICENSES.md`** at the project root. It lists Heebo and Fira Code (SIL OFL 1.1), Lucide
  (ISC), Next.js, React and React DOM (MIT), and the logo (Yaniv's own work).

## Out of scope

- Hero, What I build, portfolio, about and contact sections. The anchors won't land anywhere
  until Features 2, 3, 4, 6 and 7.
- Pre-filled WhatsApp message and floating mobile contact button (Feature 7)
- Legal page content (Feature 8)
- Chat bubble (Feature 9)
- SEO, Open Graph, sitemap (Feature 12)
- Analytics (Feature 13)
- Cloudflare/OpenNext adapter and deployment. This is a separate setup step, as decided during
  spec review.
- SVG logo export, white logo variant and favicon set (`BRAND.md` launch to-dos). Keep the
  starter `app/favicon.ico` for now.

## Build loop

`workflow.stepReview` is `feature` and `checkpointCommits` is `disabled`.

1. Build all steps in order on `feature/site-layout`, running `npm run verify` after each step.
2. Present one review packet at the end.
3. Make no checkpoint commits. `/complete` creates the feature commit.

## Build steps

- [x] **1. Brand foundation.**
  - Read the fonts and metadata guides in `node_modules/next/dist/docs/` first.
  - `app/layout.tsx`: set `lang="he" dir="rtl"`, swap Geist for Heebo and Fira Code, and set the
    Hebrew metadata.
  - `app/globals.css`: add the brand `@theme` tokens, remove the dark scheme, and use the token
    background and text on `body` instead of the Arial fallback.
  - Replace `app/page.tsx` with a Hebrew placeholder and delete the starter SVGs.

  **Done when:** `npm run verify` passes, and `/` renders right-to-left Hebrew text in Heebo on
  `#F5F7FC` with no English starter content.
- [x] **2. Site config, logo and header.**
  - `lucide-react` is already installed (done during spec review).
  - Add `lib/site.ts` (typed contact details, `NAV_ITEMS`, `LEGAL_LINKS`).
  - Add `components/layout/Logo.tsx` and `components/layout/Header.tsx` (server component, with
    the skip link and desktop menu).
  - Wrap `children` in `<main id="main">` in the root layout.

  **Done when:** Verify passes. On desktop width, the header shows the logo (Latin text reads left
  to right) and the four Hebrew links in order from the right. Tab focuses the skip link first, and
  activating it moves focus to `main`.
- [x] **3. Mobile menu.**
  - Add `components/layout/MobileMenu.tsx` (`'use client'`). It is a button with a Hebrew
    `aria-label` (`פתיחת תפריט` or `סגירת תפריט`), `aria-expanded` and `aria-controls`, and
    Lucide `Menu` and `X` icons.
  - The panel lists the menu items.
  - Escape and choosing a link close the panel. Escape returns focus to the button.
  - The desktop menu is hidden below `md`, and the mobile button is hidden at `md` and above.

  **Done when:** Verify passes. At phone width, the button opens and closes the panel, and keyboard
  use (Enter, Tab, Escape) works with visible focus rings.
- [x] **4. Footer, 404 and licenses.**
  - Add `components/layout/Footer.tsx`, built from `lib/site.ts`.
  - Add the Hebrew `app/not-found.tsx` with a link home.
  - Add `LICENSES.md`.

  **Done when:** Verify passes. The footer shows the contact links (correct `tel:`, `wa.me` and
  `mailto:` hrefs) and the three legal links, all underlined or with icons. `/privacy` shows the
  Hebrew 404 inside the layout.

## Files / areas

- `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- `app/not-found.tsx` (new)
- `components/layout/Logo.tsx`, `Header.tsx`, `MobileMenu.tsx`, `Footer.tsx` (new)
- `lib/site.ts` (new)
- `LICENSES.md` (new)
- `public/*.svg` (deleted)
- `package.json` and `package-lock.json` (`lucide-react`)

## Data / contracts

`lib/site.ts` is a typed constant. There is no persistence and no env vars.

```ts
export const SITE = {
  nameHe: "יניב בודאגה",
  logoText: "{ Yaniv Bodaga }",
  contact: {
    phone: string,      // display + tel: href, international format
    whatsapp: string,   // digits only, country code, no "+" (wa.me format)
    email: string,
  },
};
export const NAV_ITEMS: { label: string; href: `/#${string}` }[];
export const LEGAL_LINKS: { label: string; href: "/privacy" | "/accessibility" | "/terms" }[];
```

Contact values, provided by Yaniv:

| Field | Value | Href |
|---|---|---|
| Phone (display) | `050-640-0751` | `tel:+972506400751` |
| WhatsApp | `972506400751` (same number) | `https://wa.me/972506400751` |
| Email | `yaniv.bodaga99@gmail.com` | `mailto:yaniv.bodaga99@gmail.com` |

- These anchor IDs are locked for later features: `services` (Feature 3), `portfolio`
  (Feature 4), `about` (Feature 6), `contact` (Feature 7).
- These routes are locked for Feature 8: `/privacy`, `/accessibility`, `/terms`.
- The contact values in `lib/site.ts` replace the planned `CONTACT_EMAIL`, `CONTACT_PHONE` and
  `WHATSAPP_NUMBER` Cloudflare secrets. `project-plan.md` §8 was updated to match.

## Testing

- No test runner is configured, so the gate is `npm run verify` (typecheck and build).
- Manual checks at about 375 px and at desktop width:
  - RTL order
  - mobile menu with the keyboard
  - skip link
  - footer hrefs
  - Hebrew 404
  - visible focus
  - contrast uses only the `BRAND.md` pairs
- Don't claim screen-reader or real-device results unless they were actually run.

## Notes for the AI

- Every visible string is Hebrew. Latin text appears only in the logo, which is wrapped in an LTR
  element so the braces don't flip.
- Use only `BRAND.md` color pairs:
  - teal `primary` on light backgrounds
  - `accent` or white on navy, never `primary` on navy
  - links get an underline or an icon, not just color
- Use logical spacing utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) instead of
  `left`/`right` so RTL stays correct.
- Under `cacheComponents`, keep the layout static. For the copyright year, check the Next.js docs
  on current-time access in prerendered components before using `new Date()`. Fall back to a
  build-time constant if needed.
- Keep the header and footer as server components. Only `MobileMenu` is a client component.
- External links (`wa.me`) use `target="_blank"` with `rel="noopener noreferrer"` and a Hebrew
  hint that the link opens in a new tab.
- Don't add an accessibility overlay widget.


<!-- blueprint:completion {"schemaVersion":2,"specBytes":8940,"specSha256":"683e60a2a455194c2768cc29f1a405d16e3d1ab767d783b35e1c7260dd77766b","branch":"refs/heads/feature/site-layout","head":"7765628585a17c92aaca02e169c7b45a156657cf","baseRef":"refs/heads/main","baseCommit":"7765628585a17c92aaca02e169c7b45a156657cf","sourceTree":"5729596789e3d293fcf2f65afc9289973b9c448c","landing":"local-merge","absentOptional":[]} -->

## Try it now

1. Run `npm run dev` and open http://localhost:3000.
2. Desktop: the logo `{ Yaniv Bodaga }` sits on the right, the menu reads right to left, and the
   footer shows the phone, WhatsApp and email links.
3. Keyboard: reload and press Tab. "דלג לתוכן הראשי" appears first, and Enter jumps to the content.
4. Phone width (DevTools, about 375 px): the menu becomes a button. Open it, press Escape, and focus
   returns to the button.
5. Click "מדיניות פרטיות" in the footer: the Hebrew 404 page appears inside the site layout.
