# Build Plan

Features for Yaniv's Hebrew website, high level and in rough build order. Every feature
must be in Hebrew (RTL), follow Israeli law, use only free assets, and use the brand in
`BRAND.md` (see `project-plan.md`).

Pre-build steps, which are not features: scaffold Next.js + Tailwind on Cloudflare with
OpenNext, set up RTL, add the brand tokens, fonts, logo and favicon, and create `LICENSES.md`.

## Your features

- [ ] 1. **Site layout** - Hebrew RTL header with logo and menu, mobile menu, and a footer with contact and legal links
- [ ] 2. **Home hero** - headline on what Yaniv builds with AI, with buttons to call, WhatsApp or open the chat
- [ ] 3. **What I build** - cards for personal sites, business sites, dashboards and AI agents, plus the work process steps
- [ ] 4. **Portfolio** - project grid with category filter, loaded from one MDX file per project
- [ ] 5. **Case study pages** - a page per project: the problem, what was built, the result, screenshots and a live link
- [ ] 6. **About me** - photo, personal story, why work with Yaniv, and the tools he uses
- [ ] 7. **Contact** - email, phone and WhatsApp links with a pre-filled Hebrew message, plus a floating contact button on mobile
- [ ] 8. **Legal pages** - privacy policy, accessibility statement and terms of use, in Hebrew
- [ ] 9. **AI chat widget with consent** - RTL chat bubble that shows a privacy notice and needs an "אני מסכים/ה" click before typing
- [ ] 10. **AI chat backend** - `/api/chat` streams Hebrew answers from Claude, with a safe system prompt, limits and rate limiting
- [ ] 11. **Lead capture** - the chat collects name, contact and project idea, and emails it to Yaniv with the consent time
- [ ] 12. **SEO and sharing** - Hebrew titles and descriptions, Open Graph images, sitemap and robots.txt
- [ ] 13. **Analytics** - Cloudflare Web Analytics with events for contact clicks, chat opens and leads
- [ ] 14. **Accessibility and license audit** - full IS 5568 / WCAG AA check on every page, and every asset listed in `LICENSES.md`
- [ ] 15. **Launch** - connect the domain in Cloudflare, test on real phones, proofread the Hebrew, and do the final legal check
