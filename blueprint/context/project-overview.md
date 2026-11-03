# Yaniv Bodaga - Project Overview

<!-- blueprint:source-hash 91a34ad981a0f008b81facbe92e8c46a11d980181f6e85892ce8619100b100bd -->

> A Hebrew-only, RTL personal website that wins Yaniv's trust with visitors and turns them into
> phone, WhatsApp, email or AI-chat leads for AI-built websites, dashboards, agents and automations.

> **Generated from `project-plan.md` + `build-plan.md`. Don't hand-edit; re-run `/overview`.**

## Project-wide rules

These apply to every feature:

1. **Hebrew only, RTL.** Every visible string is Hebrew, including buttons, menus, errors, legal
   pages and AI chat. Only the logo `{ Yaniv Bodaga }` stays in Latin letters.
2. **Israeli law.** No personal data is collected before a notice and an explicit "אני מסכים/ה"
   click. Accessible to IS 5568 / WCAG 2.0 AA. Anti-spam compliant (see Usage model).
3. **Free assets only.** Every font, icon, image and library is free for commercial use and
   listed in `LICENSES.md`.
4. **Brand from `blueprint/BRAND.md`.** Use only its colors, fonts and logo.

## Problem

Small businesses and individuals in Israel want websites, dashboards or AI tools, but agencies
are expensive and slow, and these customers don't know who to trust or what AI can do. Yaniv
builds these projects with AI but has no single place that shows his work and makes him easy to
reach. **Success:** visitors click to call, WhatsApp or email, and the AI chat brings in real
leads every month.

## Users

All anonymous. There are no accounts and no access tiers. They read Hebrew, and most arrive on a
phone from WhatsApp or social media links.

- **Small business owners** (shops, clinics, restaurants, service providers). They need business
  sites, booking, automation, dashboards or chatbots. They are convinced by examples from similar
  businesses, a clear process and a reachable real person.
- **Individuals and creators.** They need a personal site, portfolio or brand page. They are
  convinced by good-looking examples, a friendly tone and fast delivery.

## Usage model

- **Scale:** low traffic, from tens to a few hundred visitors a day. There are no high-scale
  requirements.
- **Reachability:** public internet. Visitors are anonymous, with no accounts.
- **Tenancy:** one site, one owner.
- **Trust boundary:** visitors are untrusted, and `/api/chat` is the only abuse surface (spam,
  prompt injection, API cost). It requires:
  - limits on message length, messages per chat and requests per visitor
  - a Cloudflare rate-limiting rule on `/api/chat`
  - a monthly spending limit on the Anthropic account
  - a system prompt that stays on Yaniv's services and **never promises prices or dates**
- **Privacy (Protection of Privacy Law, incl. Amendment 13):** before collecting anything, show a
  notice covering what is collected, why, that it is voluntary, and the recipients (Yaniv,
  Anthropic, Resend, Cloudflare). Agreement needs an explicit click, with nothing pre-ticked.
  There is a privacy policy page, and data is deleted on request.
- **Accessibility (IS 5568 / WCAG 2.0 AA):** built in, with **no overlay widget**. There is an
  accessibility statement with a contact person.
- **Anti-spam (Communications Law §30A):** leads are used only to reply to that visitor. No
  marketing without separate consent.
- **Cookies:** cookie-free analytics only. Adding any tracking cookie or pixel requires a consent
  banner first.
- **Copyright:** free-license assets only. A client must approve before their project appears in
  the portfolio.
- **Legal note:** this is a practical checklist, not legal advice. Ideally a lawyer reviews it
  before launch.
- **Non-requirements:** user accounts, a database, payments, multiple languages, an admin panel.

## Features

Pre-build setup, which is not a feature: scaffold Next.js + Tailwind on Cloudflare with OpenNext,
set up RTL, add brand tokens, fonts, logo and favicon, and create `LICENSES.md`.

1. **Site layout** - RTL header with logo and menu, mobile menu, and a footer with contact and
   legal links.
2. **Home hero** - headline on what Yaniv builds with AI, with call, WhatsApp and open-chat buttons.
3. **What I build** - cards for personal sites, business sites, dashboards and AI agents, plus the
   work process steps.
4. **Portfolio** - project grid with a category filter, loaded from one MDX file per project.
5. **Case study pages** - one page per project: the problem, what was built, the result,
   screenshots and a live link.
6. **About me** - photo, personal story, why work with Yaniv, and the tools he uses.
7. **Contact** - email, phone and WhatsApp links with a pre-filled Hebrew message, plus a floating
   contact button on mobile. There is no contact form.
8. **Legal pages** - privacy policy, accessibility statement and terms of use.
9. **AI chat widget with consent** ⭐ - RTL chat bubble. The notice and the "אני מסכים/ה" click
   come before the text box unlocks.
10. **AI chat backend** ⭐ - `/api/chat` streams Hebrew answers from Claude, with a safe system
    prompt, limits and rate limiting.
11. **Lead capture** ⭐ - the chat collects name, contact and project idea, and emails them to Yaniv
    with the consent time.
12. **SEO and sharing** - Hebrew titles and descriptions, Open Graph images, sitemap and robots.txt.
13. **Analytics** - Cloudflare Web Analytics, with events for contact clicks, chat opens and leads.
14. **Accessibility and license audit** - full IS 5568 / WCAG AA pass on every page, and every
    asset listed in `LICENSES.md`.
15. **Launch** - domain in Cloudflare, real-phone testing, Hebrew proofreading, final legal check.

Not in the MVP: services and pricing page, blog, English version, booking calendar, client login,
testimonials.

## Data model

**No database and no server-side persistence.** Every shape below is either a repo file, a
transient request, or browser-only state.

### PortfolioProject (MDX file in the repo, one per project)

Frontmatter fields:

- `slug` (string, from the filename) - case-study URL segment
- `title` (string, Hebrew)
- `category` (string) - drives the Feature 4 filter. Values are a TODO (see Open questions).
- `images` (array of `{ src: string; alt: string }`) - files in the repo, **Hebrew alt text
  required**
- `liveUrl` (string URL, optional) - the live link
- Body sections: **problem**, **solution** (what was built), **result**

> Locked by Feature 4; Features 5 and 12 depend on it.

### ChatMessage (transient, never stored)

- `role` (`"user" | "assistant"`)
- `content` (string, length-limited)

Sent to the Claude API only to produce a reply. Not logged or saved.

### Lead (transient, emailed via Resend, never stored on the site)

- `name` (string)
- `contact` (string) - phone or email
- `projectIdea` (string)
- `consentAt` (ISO-8601 timestamp) - when the visitor clicked "אני מסכים/ה"

Used only to reply to that visitor and deleted on request.

> Locked by Feature 11; it depends on `consentAt` from Feature 9.

### Consent (browser-only, current visit)

- `consentedAt` (ISO-8601 timestamp)

Kept for the current visit only, so the notice isn't shown again on every page. This implies
`sessionStorage`. Nothing is set before the click.

## Tech stack

- **Next.js 16 App Router + TypeScript + React 19** - the site, with mostly static pages and one
  server route
- **Tailwind CSS v4** - RTL layout and the `BRAND.md` tokens
- **Heebo** (Hebrew text) and **Fira Code** (logo and tech labels) - Google Fonts, SIL OFL 1.1,
  loaded with `next/font/google`
- **Lucide** (ISC) - icons
- **MDX** - portfolio project content
- **Anthropic SDK + Claude API** - streaming chat on `claude-haiku-5-5`. Switch to Sonnet 5.5
  (`claude-sonnet-5-5`) if the Hebrew quality isn't good enough.
- **Resend** (free tier) - lead emails
- **Cloudflare Workers + `@opennextjs/cloudflare`** - hosting
- **Cloudflare Web Analytics** - cookie-free analytics

## Monetization

The site sells nothing directly. It brings in clients for paid projects (personal and business
sites, dashboards, AI agents, automations) and ongoing work (maintenance, hosting help, updates).
**No prices on the site.** The AI chat never promises a price or a date. Running costs are only
the Claude API, capped by a monthly spending limit.

## UI/UX

- **Feeling:** warm, personal and professional with a touch of tech. A trusted real person, not a
  cold agency.
- **Brand tokens** (from `BRAND.md`): `navy #060B30` for text and dark sections, `primary #0F766E`
  for buttons and links, `primary-dark #115E59` for hover, `accent #2DD4BF` (**only on navy**),
  `bg #F5F7FC`, `surface #FFFFFF` for cards and the chat window, `primary-soft #E6F4F1`,
  `muted #4A5270`, `border #DDE2EE`. Never put teal `#0F766E` on navy; use `accent` or white.
- **Type:** H1 56/36, H2 40/28, H3 24/20 (desktop/mobile), body 18/16 at line-height 1.7, all in
  Heebo. Tech labels use Fira Code 300 at 14 to 16 px.
- **Logo:** `{ Yaniv Bodaga }` in Fira Code with **יניב בודאגה** in Heebo beside it. Minimum width
  120 px; below that, use the favicon. Navy on light, white on navy.
- **Motif:** curly braces `{ }` around section titles and on the AI chat button.
- **Mobile first:** big contact buttons that are always reachable.
- **Accessibility:** WCAG AA contrast, full keyboard support, links not signaled by color alone
  (underline or icon), Hebrew alt text on every image.
- **Chat:** a corner bubble. It opens to the notice and the "אני מסכים/ה" button, and the input
  unlocks only after the click.

Routes are derived from the features; the plans name only `/api/chat`, so the paths are not final:

- `/` - home: hero, What I build, portfolio preview, about, contact
- portfolio grid and `/<portfolio>/[slug]` case studies
- privacy policy, accessibility statement, terms of use pages
- `/api/chat` - streaming chat route (POST)
- `/sitemap.xml`, `/robots.txt`

## Deployment

- **Host:** Cloudflare Workers, free plan (commercial use allowed), via `@opennextjs/cloudflare`
- **App type:** Next.js with one server route (`/api/chat`). Most pages are static.
- **Build:** `npx opennextjs-cloudflare build`
- **Deploy:** `npx opennextjs-cloudflare deploy`. Cloudflare also auto-deploys on every push to
  GitHub `main`.
- **Local preview:** `npx opennextjs-cloudflare preview`
- **Secrets** (Cloudflare secrets, never in code): `ANTHROPIC_API_KEY`, `RESEND_API_KEY`,
  `LEAD_EMAIL_TO`
- **Contact details** (public, not secrets): phone, WhatsApp number and email live in the
  committed `lib/site.ts`, because static pages can't read runtime secrets at build time.
- **Storage, database, cron:** none. Portfolio images live in the repo.
- **Rate limiting:** a Cloudflare rule on `/api/chat`
- **Health check:** none. `/` is enough.
- **Domain:** > TODO. Not chosen yet (for example `yanivbodaga.co.il` or `.com`). Buy it in
  Cloudflare or point its DNS there.

## Open questions

> Resolve these in the plans, then re-run `/overview`.

- **Analytics events vs Cloudflare Web Analytics.** Feature 13 wants events for contact clicks,
  chat opens and leads. Check whether Cloudflare Web Analytics supports custom events (it has
  historically focused on page views and performance). If it doesn't, decide whether to drop the
  events, track them some other cookie-free way, or change the tool.
- **Forward dependencies in build order.** Feature 1's footer links to legal pages (Feature 8)
  and contact (Feature 7), and Feature 2's hero has an "open the chat" button, but the chat widget
  is Feature 9. Decide between placeholder links or buttons and reordering.
- **Portfolio categories.** The category filter values aren't defined. They could be the four
  "What I build" types (personal sites, business sites, dashboards, AI agents), but the plans
  don't say so.
- **Page structure.** The plans never say whether About, What I build and Contact are sections of
  `/` or separate pages, or what the portfolio and legal URLs are.
- **Lead collection mechanism.** The plans don't specify how the chat turns a conversation into a
  lead (for example a Claude tool call or a structured form step inside the chat), or what the
  visitor sees when the email is sent.
- **Client approval.** The plan requires a client's approval before showing their project. Decide
  whether to record it, for example as a frontmatter flag, or handle it outside the repo.
- **Tailwind config format.** `BRAND.md` §5 shows a `tailwind.config.js`, but the project uses
  Tailwind v4, where tokens go in CSS `@theme`. The token values carry over unchanged.
- **Brand assets still to make.** SVG logo, white logo variant and favicon set (`BRAND.md` "To do
  before launch"). These are part of the pre-build setup.
- **Pre-build setup is unowned.** The OpenNext scaffold, RTL, tokens, fonts, logo, favicon and
  `LICENSES.md` are listed as not-features, so no feature spec covers them. Either do them before
  Feature 1 or fold them into Feature 1 (Site layout).
