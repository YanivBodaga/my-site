# Project Plan

Yaniv Bodaga — personal website (Hebrew)

> **Rules for the whole project:**
> 1. **Hebrew only.** Every visible word is in Hebrew, with a right-to-left (RTL) layout. That
>    includes buttons, menus, errors, legal pages and the AI chat. Only the logo stays in Latin letters.
> 2. **Follows Israeli law.** No personal information is collected before the visitor reads a
>    notice and clicks an "אני מסכים/ה" (I agree) button. The site must be accessible (IS 5568) and
>    follow the anti-spam law. See section 9.
> 3. **Free assets only.** Fonts, icons, images and libraries must be free for commercial use,
>    and each one is listed in `LICENSES.md`.
> 4. **Brand from `BRAND.md`.** Use only the colors, fonts and logo in the brand guide.

## 1. Problem - What problem are we solving?

Small businesses and individuals want a website, a dashboard or an AI tool. Agencies are
expensive and slow, and these customers don't know who to trust or what AI can do for them.
Yaniv builds these projects with AI: personal websites, business websites, dashboards,
AI agents and automations. But he has no single place that shows his work, proves he can
deliver, and makes it easy to reach him.

**Main purpose:** a Hebrew website that makes visitors trust Yaniv and contact him by phone,
WhatsApp or email to build their project. The site also proves his skills: it is fast,
well designed and has its own AI assistant.

**Success means:** visitors click to call, WhatsApp or email, and the AI chat collects
real leads every month.

## 2. Users - Who is this for?

- **Small business owners in Israel** (shops, clinics, restaurants, service providers). They
  need a business website, booking, automation, simple dashboards or a chatbot for their
  customers. They are convinced by examples from similar businesses, a clear process and a
  real person who is easy to reach.
- **Individuals and creators.** They need a personal site, a portfolio or a personal brand
  page. They are convinced by good-looking examples, a friendly tone and fast delivery.

All users read Hebrew. Most arrive on a phone, often from a WhatsApp or social media link.

## 3. Features - What does the MVP need?

- Hebrew right-to-left site with a header, footer and mobile menu
- Home page hero: what Yaniv does, and buttons to call, WhatsApp or chat
- "What I build" section: personal sites, business sites, dashboards, AI agents, plus how the work process goes
- Portfolio grid and a case study page for each project
- About me section
- Contact by email, phone and WhatsApp (no contact form), plus a floating contact button on mobile
- Legal pages: privacy policy, accessibility statement, terms of use
- AI chat assistant in Hebrew that opens only after the visitor clicks "I agree"
- Leads from the chat are emailed to Yaniv
- SEO, share previews and cookie-free analytics

**Not in the MVP:** a services and pricing page, a blog, an English version, a booking
calendar, a client login, testimonials.

## 4. Data - What are we storing?

There is no database in the MVP.

- **Portfolio projects:** one MDX file per project in the repo (title, category, images,
  problem, solution, result, live link).
- **Leads from the AI chat:** name, phone or email, project idea, and the time the visitor
  agreed. These are **emailed to Yaniv, not stored on the site**. They are used only to reply
  to that visitor and are deleted when someone asks.
- **Chat messages:** not saved. They are sent to the Claude API only to produce a reply.
- **Consent:** kept in the visitor's browser for the current visit, so the notice isn't
  shown again on every page.
- **Analytics:** Cloudflare Web Analytics, which has no cookies and no personal data.

## 5. Tech - What stack are we using?

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**, using the RTL setup and design tokens from `BRAND.md`
- **Fonts:** Heebo (Hebrew text) and Fira Code (logo and tech labels), from Google Fonts
  under the SIL Open Font License, loaded with `next/font/google`
- **Icons:** Lucide (ISC license)
- **Content:** MDX files for portfolio projects
- **AI chat:** Claude API (Anthropic SDK) with streaming responses, using **Claude Haiku 5.5**
  (`claude-haiku-5-5`) because it is fast and cheap. Switch to Sonnet 5.5 if the Hebrew isn't good enough.
- **Email for leads:** Resend (the free tier allows commercial use)
- **Hosting:** Cloudflare Workers, using the OpenNext adapter (`@opennextjs/cloudflare`)
- **Analytics:** Cloudflare Web Analytics

## 6. Monetize - How will this make money?

The site doesn't sell anything itself. It brings clients to Yaniv, who earns from:

- **Paid projects:** personal websites, business websites, dashboards, AI agents and
  automations, priced per project
- **Ongoing work:** monthly maintenance, hosting help, updates and new features for past clients

Every page leads the visitor to call, WhatsApp, email or chat. Prices aren't shown in the
MVP, and the AI chat never promises a price or a date. Yaniv gives prices after a conversation.

**Running costs:** Cloudflare, Resend and the fonts are free. The only cost is the Claude API
for the chat, which is small. We set a monthly spending limit on the Anthropic account.

## 7. UI/UX - How should this look and feel?

Follow `BRAND.md` exactly.

- **Feeling:** warm, personal and professional, with a touch of tech. It should feel like a
  real person you can trust, not a cold agency.
- **Colors:** navy `#060B30` for text and dark sections, and teal `#0F766E` for buttons and
  links, on a light `#F5F7FC` background with white cards. On navy, use `#2DD4BF` or white.
- **Fonts:** Heebo for all Hebrew text and Fira Code for the logo and small tech labels.
- **Logo:** `{ Yaniv Bodaga }` in Fira Code, with the Hebrew name **יניב בודאגה** next to it.
- **Design element:** curly braces `{ }` from the logo, for example around section titles and on the AI chat button.
- **Mobile first:** most visitors use phones. Contact buttons are big and always easy to reach.
- **Accessible:** text contrast is checked (WCAG AA), the whole site works with the keyboard,
  links don't rely on color alone, and every image has Hebrew alt text.
- **AI chat:** a chat bubble in the corner. When it opens, it first shows a short Hebrew
  notice and the "אני מסכים/ה" button. The text box unlocks only after the click.

## 8. Deployment - Where and how will this ship?

- **Host:** Cloudflare Workers, free plan (commercial use allowed), with the OpenNext
  adapter `@opennextjs/cloudflare`
- **App type:** Next.js app with server routes (the `/api/chat` route streams from Claude).
  Most pages are static.
- **Build command:** `npx opennextjs-cloudflare build`
- **Deploy command:** `npx opennextjs-cloudflare deploy`. Cloudflare also builds and deploys
  automatically on every push to the GitHub `main` branch.
- **Local preview:** `npx opennextjs-cloudflare preview`
- **Env vars and secrets (stored as Cloudflare secrets, never in the code):**
  - `ANTHROPIC_API_KEY`: the Claude API key
  - `RESEND_API_KEY`: the email sending key
  - `LEAD_EMAIL_TO`: the address that receives leads
  - `CONTACT_EMAIL`, `CONTACT_PHONE`, `WHATSAPP_NUMBER`: the contact details shown on the site
- **Database or storage:** none. Portfolio images are in the repo.
- **Workers or cron jobs:** none
- **Rate limiting:** a Cloudflare rate-limiting rule on `/api/chat`
- **Health check:** none needed. The home page `/` is enough.
- **Domain:** not chosen yet (for example `yanivbodaga.co.il` or `.com`). Buy it in Cloudflare
  or point its DNS there.

## 9. Usage model and constraints (optional)

- **Scale:** a personal business site with low traffic, probably tens to a few hundred
  visitors a day. No high-scale requirements.
- **Operation:** on the public internet. Visitors are anonymous and there are no accounts.
- **Trust:** visitors are untrusted. The AI chat is the only part open to abuse (spam,
  prompt injection, running up API costs). It needs:
  - limits on message length, messages per chat and requests per visitor
  - a monthly spending limit on the API
  - a system prompt that stays on Yaniv's services and never promises prices or dates
- **Tenancy:** a single site for a single owner.
- **Legal (Israel). This is a practical checklist, not legal advice; ideally a lawyer reviews it before launch:**
  - **Protection of Privacy Law (incl. Amendment 13):** before collecting anything, show a
    notice that says what is collected, why, that giving it is voluntary, and who receives it
    (Yaniv, Anthropic, Resend, Cloudflare). The visitor must click to agree, with nothing
    ticked in advance. Add a privacy policy page and delete data when someone asks.
  - **Accessibility (Equal Rights for Persons with Disabilities Law, IS 5568 / WCAG 2.0 AA):**
    the site is built to be accessible, with no accessibility overlay widget, and has an
    accessibility statement with a contact person.
  - **Anti-spam (Communications Law, section 30A):** leads are used only to reply to that
    visitor. No marketing messages without separate consent.
  - **Cookies:** use cookie-free analytics only. A consent banner is needed before adding any
    tracking cookies or pixels.
  - **Copyright:** use only free-license assets (listed in `LICENSES.md`), and get a client's
    approval before showing their project in the portfolio.
- **Non-requirements:** user accounts, a database, payments, multiple languages, an admin panel.
