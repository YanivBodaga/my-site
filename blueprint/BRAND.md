# Brand Guide — Yaniv Bodaga

Approved by Yaniv on 2026-11-03.

## 1. Logo
- **File:** `brand/logo.png` (2000×2000 PNG, light background)
- **Design:** `{ Yaniv Bodaga }` with curly braces, name in Fira Code Bold, "Software Engineer" under it in Fira Code Light, all in navy `#060B30` on `#F5F7FC`.
- **Made by:** Yaniv, with the Fira Code font.

**To do before launch**
- Export the logo as **SVG**, or rebuild it as one, so it stays sharp at every size.
- Make a **white version** for dark backgrounds.
- Make a **favicon** (`{YB}` or `{ }` in navy, at 512 / 192 / 32 / 16 px).

**Usage rules**
- Leave clear space around the logo at least the height of the "Y".
- Use navy on light backgrounds and white on navy. Don't use other colors, gradients or shadows.
- Don't stretch it, rotate it or change the font.
- The logo stays in English (Latin letters). Next to it, the site shows the Hebrew name **יניב בודאגה** in Heebo.
- Smallest size: 120 px wide for the full logo. Below that, use the favicon.

## 2. Colors
Every pair of text and background below was checked against WCAG 2.0 AA, which Israeli accessibility law (IS 5568) requires: at least 4.5:1 for normal text and 3:1 for large text.

| Role | Tailwind token | Hex | Use | Contrast |
|---|---|---|---|---|
| Navy (brand) | `navy` | `#060B30` | Logo, headings, body text, dark sections | 17.8 on `bg` ✅ |
| Primary (teal) | `primary` | `#0F766E` | Buttons, links, highlights | 5.1 on `bg`, white text on it 5.5 ✅ |
| Primary hover | `primary-dark` | `#115E59` | Button and link hover | white on it ~7.6 ✅ |
| Teal on dark | `accent` | `#2DD4BF` | Links and highlights **on navy only** | 10.3 on navy ✅ · 1.7 on light ❌ never on light |
| Background | `bg` | `#F5F7FC` | Page background (from the logo) | — |
| Surface | `surface` | `#FFFFFF` | Cards, chat window | — |
| Teal tint | `primary-soft` | `#E6F4F1` | Soft section backgrounds, tags | navy text on it ✅ |
| Muted text | `muted` | `#4A5270` | Secondary text, captions | 7.2 on `bg` ✅ |
| Border | `border` | `#DDE2EE` | Lines, card borders (decorative only) | — |

**Rules**
- Teal `#0F766E` on navy fails (3.5). On navy, use `accent` `#2DD4BF` or white.
- Don't use color as the only signal. Links also get an underline or an icon.

## 3. Fonts
All fonts are free for commercial use under the **SIL Open Font License 1.1 (OFL)**, from Google Fonts. Load them with `next/font/google`.

| Font | Tailwind token | Weights | Use | Hebrew? | License |
|---|---|---|---|---|---|
| **Heebo** | `font-sans` (default) | 400, 500, 700, 800 | All Hebrew text: headings, body, buttons | ✅ | SIL OFL 1.1 |
| **Fira Code** | `font-mono` | 300, 700 | Logo, English and code accents, small "tech" labels like `{ }` and numbers | ❌ Latin only | SIL OFL 1.1 |

**Type scale (desktop / mobile)**
- H1: 56 / 36 px, Heebo 800
- H2: 40 / 28 px, Heebo 700
- H3: 24 / 20 px, Heebo 700
- Body: 18 / 16 px, Heebo 400, line-height 1.7
- Small: 14 px, Heebo 400–500
- Tech label: 14–16 px, Fira Code 300

**Style idea:** Use curly braces `{ }` from the logo as a design element, for example around section titles or the AI chat button. This ties the site to the logo.

## 4. Icons and images (free only)
- **Icons:** Lucide (ISC license, free for commercial use).
- **Photos:** your own photos, or Unsplash / Pexels under their free licenses.
- **No** Canva Pro elements and no paid stock, unless a license has been bought.

## 5. Tailwind config
```js
// tailwind.config.js → theme.extend
colors: {
  navy: '#060B30',
  primary: { DEFAULT: '#0F766E', dark: '#115E59', soft: '#E6F4F1' },
  accent: '#2DD4BF',
  bg: '#F5F7FC',
  surface: '#FFFFFF',
  muted: '#4A5270',
  border: '#DDE2EE',
},
fontFamily: {
  sans: ['var(--font-heebo)', 'sans-serif'],
  mono: ['var(--font-fira-code)', 'monospace'],
},
```
