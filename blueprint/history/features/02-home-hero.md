# Feature: Home hero

**From build-plan:** feature 2
**Build attempt:** 1
**Branch:** feature/home-hero
**Status:** verified

## Goal

Replace the placeholder home page with a Hebrew hero. It says what Yaniv builds with AI and gives
two large, easy-to-reach buttons to call or WhatsApp him, so visitors who arrive on a phone can
make contact straight away.

## In scope

- **Hero section** at the top of `/`. It replaces the "האתר בבנייה" placeholder.
- **Greeting label** above the headline: `שלום, אני יניב` in Heebo, teal. There are no braces
  (Yaniv's call during review).
- **H1 headline** (Heebo 800, 36 px mobile / 56 px desktop):
  `אני בונה אתרים, דשבורדים וסוכני AI לעסקים קטנים ולאנשים פרטיים`
- **Subtitle** (body size, `muted`):
  `פרויקטים מקצועיים, מהר ובלי הסרבול של סוכנות. מדברים ישירות איתי, מהרעיון ועד שהאתר באוויר.`
- **Copy rule (Yaniv, during review):** the site says *what* Yaniv builds, never that he uses AI to
  build it. "סוכני AI" stays, because it is a product he sells. The same rule also corrected the
  home-page meta description in `app/layout.tsx`.
- **Two contact buttons**, built from `lib/site.ts`:
  - `התקשרו עכשיו` → `tel:+972506400751`: a filled `primary` button with the Lucide `Phone`
    icon.
  - `שלחו הודעה בוואטסאפ` → `https://wa.me/972506400751`: an outlined `primary` button with
    the Lucide `MessageCircle` icon. It opens in a new tab, with a visually hidden Hebrew hint
    `(נפתח בחלון חדש)`.
  - Each button is at least 48 px tall. On mobile they stack full width; from `sm` up they sit
    side by side.
- **Shared WhatsApp URL.** Add `WHATSAPP_URL` to `lib/site.ts`, and use it in both the hero and
  the footer, so Feature 7 can add the pre-filled message in one place.
- **Page metadata** is unchanged; Feature 12 owns SEO.

## Out of scope

- **"Open the chat" button.** Decided during spec review: the hero ships without it, and
  Feature 9 adds the `{ }` chat button to the hero when the chat works.
- Pre-filled WhatsApp message and floating mobile contact button (Feature 7)
- Photo or illustration (none planned for the hero; the photo belongs to About, Feature 6)
- What I build, portfolio, about and contact sections (Features 3, 4, 6, 7)
- Analytics events on the buttons (Feature 13)

## Build loop

`workflow.stepReview` is `feature` and `checkpointCommits` is `disabled`.

1. Build both steps on `feature/home-hero`.
2. Run `npm run verify` once at the end.
3. Present one review packet. `/complete` makes the commit.

## Build steps

- [x] **1. Shared WhatsApp URL.** Export `WHATSAPP_URL` (`https://wa.me/${SITE.contact.whatsapp}`)
  from `lib/site.ts` and switch `components/layout/Footer.tsx` to use it.

  **Done when:** typecheck passes and the footer WhatsApp href is unchanged in the built HTML.
- [x] **2. Hero.** Add `components/home/Hero.tsx` (server component) with the label, H1, subtitle
  and the two buttons. Render it from `app/page.tsx` in place of the placeholder.

  **Done when:** Verify passes, and `/` shows:
  - the Hebrew hero with exactly one `<h1>`
  - both buttons with the correct `tel:` and `wa.me` hrefs and visible focus rings
  - the buttons stacked at about 375 px and side by side at desktop width
  - no English text except "AI" in the copy

## Files / areas

- `components/home/Hero.tsx` (new)
- `app/page.tsx`
- `lib/site.ts`
- `components/layout/Footer.tsx` (WhatsApp href only)

## Data / contracts

- No new data.
- `WHATSAPP_URL: string` is exported from `lib/site.ts`. Feature 7 will extend it with the
  pre-filled `?text=` message.

## Testing

- No test runner is configured, so the gate is `npm run verify`.
- Check the prerendered `/` HTML for the hrefs and the single `<h1>`.
- Manual check at phone and desktop widths: buttons, focus and RTL order.
- Don't claim visual or real-device results unless they were actually run.

## Notes for the AI

- Every visible string is Hebrew. "AI" is the only Latin word, as used across the plans. Braces
  use `font-mono`.
- Color pairs:
  - filled button: white on `primary`, hover `primary-dark`
  - outlined button: `primary` text and border on `bg`, hover `primary-soft`
- Buttons carry an icon and a text label, so they don't rely on color alone.
- Use logical spacing (`ms-`/`me-`/`ps-`/`pe-`) for RTL.
- The copy must not promise a price or a delivery date.
- Keep the hero a static server component; it needs no client JS.


<!-- blueprint:completion {"schemaVersion":2,"specBytes":4589,"specSha256":"33258b740ea5c3ddd0252bf15afe1d3465bf60be6977490a9a069c2c9d2b4167","branch":"refs/heads/feature/home-hero","head":"4a3fede91243403c028ffa890e5609178a666876","baseRef":"refs/heads/main","baseCommit":"4a3fede91243403c028ffa890e5609178a666876","sourceTree":"87eec7811e6be80b5b8a550d2017e2397d790773","landing":"local-merge","absentOptional":[]} -->

## Try it now

1. Run `npm run dev` and open http://localhost:3000.
2. The hero shows "שלום, אני יניב", the large Hebrew headline, the subtitle and two buttons, all
   aligned right.
3. Press Tab past the header links: each button shows a teal focus ring.
4. Click "שלחו הודעה בוואטסאפ": WhatsApp opens in a new tab for 050-640-0751.
5. Phone width (about 375 px): the buttons stack full width. On desktop they sit side by side.
