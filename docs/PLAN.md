# Reelificio.com — Implementation Plan & Status

> **Last updated:** 2026-05-26
> **Repo:** [github.com/thesweetlifesociety-cmd/reelificio_web](https://github.com/thesweetlifesociety-cmd/reelificio_web)
> **Production URL (target):** https://www.reelificio.com

This document is the single source of truth for picking up development of the
**reelificio.com marketing site**. Anyone (human or agent) cloning this repo
should be able to read this file and the [CLAUDE.md](../CLAUDE.md) and know
exactly:

1. What this site is and what it isn't.
2. What's been built.
3. What's outstanding before launch.
4. How to ship a change locally and how to deploy it.

If you are an AI agent, also read [CLAUDE.md](../CLAUDE.md) and
[AGENTS.md](../AGENTS.md) — they encode framework gotchas (Next.js 16 is not
the Next.js in your training data).

---

## 1. Context

### What this is

A **public-facing marketing site** for `reelificio.com`. Its only conversion
goal is: *visitor → discovery call booked via Cal.com*. Secondary goal:
*visitor → brief submitted via `/contatti`*.

### What this is NOT

- Not the internal production-management webapp (that lives in a separate repo
  `Reelificio_PM` and is private).
- Not a CMS-driven site. Copy edits go through `src/messages/{it,en}.json` and
  through code (legal pages are handwritten in their `page.tsx`).
- Not an e-commerce or auth-gated site. There is no login, no Supabase, no
  database. The only server-side surface is `POST /api/brief`.

### Brand spelling — important

- Public brand: **Reelificio** (single L).
- Internal ops product / legal naming on some early docs: *Reellificio* (double
  L). Inside this repo always use **single L**. The PM repo uses the double-L
  internally.

### Legal entity behind the brand

Sweet Life Faktory · Corso Dante Alighieri 118, 10126 Torino · P.IVA/CF
`11515270012` · SDI `W7YVJK9` · Inbox `hello@reelificio.com` (Microsoft 365)
· Domain registered at GoDaddy.

---

## 2. Locked-in decisions (do not re-litigate without explicit user approval)

These were settled in the May 2026 grilling session and the initial scaffold.
They are not "current preferences"; they are commitments. If something here
truly needs to change, surface the trade-off and ask first.

### Stack

| Concern        | Choice                                                          |
| -------------- | --------------------------------------------------------------- |
| Framework      | Next.js **16** (App Router) — see [AGENTS.md](../AGENTS.md)     |
| Language       | TypeScript (strict)                                             |
| Styling        | Tailwind **v4** + a small set of CSS variables in `globals.css` |
| i18n           | `next-intl`, path-prefixed `/it` (default) and `/en`            |
| Forms/email    | `/api/brief` → Resend → `hello@reelificio.com`                  |
| Booking        | Cal.com hosted (embed on `/contatti`)                           |
| Analytics      | Vercel Analytics + Speed Insights + Plausible — all cookieless  |
| Hosting        | Vercel, region `fra1` (Frankfurt, EU)                           |
| Package mgr    | pnpm (10.x via corepack), Node 20                               |

### Design / brand

- **Soft-brutalist** visual language: chunky type, hard-shadow boxes, custom
  **blue → magenta → coral** gradient. NOT raw typeui.sh brutalism. NOT a
  namstudio.com clone.
- **Voice**: confident, craft-led. No money-back guarantee. Positioning =
  "AI for trend-spotting + humans for craft".
- **Featured case studies**: `@fluffy.revolution`, `@hackerpassivoaggressivo`,
  `@cipidilloo`.

### Media

- Self-hosted MP4/WebM for all video. **No Instagram embeds, no YouTube
  embeds.** Embedded players harm LCP/CLS and would require third-party
  cookies → would force a consent banner.
- Until real reel files arrive, sections render gradient placeholders. See
  `PhoneFrame` (`src/components/phone-frame.tsx`) and the case-study cards.

### Privacy / consent

The site is **cookieless by design** (Vercel + Plausible + first-party `/api/brief`).
Because of that, **no consent banner is needed** under GDPR/ePrivacy. If
anyone proposes adding Meta Pixel / GA4 / Hotjar / YouTube embeds, that
calculus inverts and a CMP would have to be added first.

The `/api/brief` form has a honeypot field named `website`.

---

## 3. What's already built

The scaffold is functionally complete for an MVP launch *modulo* the
outstanding inputs in §4. Concretely:

### Routes (all under `[locale]`, with `/it` default and `/en` mirror)

| Route               | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| `/`                 | Redirects to `/it`                                       |
| `/[locale]`         | Home — hero, pillars, how we work, two paths, social proof, case studies, FAQ, CTA |
| `/[locale]/produzione`  | Service detail page: production model                 |
| `/[locale]/partnership` | Service detail page: partnership/retainer model       |
| `/[locale]/contatti`    | Cal.com embed + brief form (`<BriefForm />`)          |
| `/[locale]/privacy`     | GDPR privacy policy (handwritten IT/EN)               |
| `/[locale]/cookie-policy` | Cookie policy (cookieless disclosure)               |
| `/[locale]/note-legali`   | Italian "note legali" / impressum                   |

### API

- `POST /api/brief` — accepts JSON brief, honeypot-protects against bots,
  forwards via Resend. Returns `200` on success, `400`/`429`/`500` otherwise.

### SEO / discoverability

- `app/[locale]/opengraph-image.tsx` — generates OG image at request time.
- `app/sitemap.ts` and `app/robots.ts` — sitemap covers both locales.
- `components/json-ld.tsx` — Organization + WebSite structured data.

### Components

- Section components in `src/components/sections/*`.
- Building blocks: `phone-frame.tsx`, `wordmark.tsx`, `reveal.tsx` (scroll
  reveal via native CSS transitions, **not** `motion/react` — that was
  replaced in commit `671f212`), `cal-embed.tsx`, `brief-form.tsx`,
  `locale-switcher.tsx`, `site-header.tsx`, `site-footer.tsx`, `legal-shell.tsx`.

### Copy

- `src/messages/it.json` — Italian copy (primary, draft pending final review).
- `src/messages/en.json` — English mirror.
- Legal pages embed their prose directly in their `page.tsx` (IT/EN branches
  inside the same file).

---

## 4. Outstanding before launch

These are **inputs from the user**, not engineering work. Engineering can
proceed in parallel on minor polish, but the site cannot be shipped to
`www.reelificio.com` without these.

| # | Item                                                  | Owner | Status   |
| - | ----------------------------------------------------- | ----- | -------- |
| 1 | **PEC address** to insert into `/note-legali`         | User  | Pending  |
| 2 | **Hero reel MP4** + **3 case-study reel MP4s**        | User  | Pending  |
| 3 | Final approval of IT copy in `src/messages/it.json` + final keyword list | User | Pending |
| 4 | Final brand color palette (currently: blue→magenta→coral default) | User | Pending |
| 5 | **Cal.com handle** once the account is created → set `NEXT_PUBLIC_CAL_LINK` | User | Pending |
| 6 | Resend account + DNS records on GoDaddy (SPF/DKIM/DMARC for `noreply@reelificio.com`) | User | Pending |

When the videos arrive (#2), drop them in `public/reels/` and pass the path
as the `videoSrc` prop in `src/components/sections/hero.tsx` and
`src/components/sections/case-studies.tsx`.

---

## 5. Local development

### First-time setup

```bash
cd reelificio_web
pnpm install
cp .env.example .env.local   # fill in keys when you have them (see §6)
pnpm dev                     # http://localhost:3000  →  redirects to /it
```

### Day-to-day commands

```bash
pnpm dev        # dev server (http://localhost:3000)
pnpm build      # production build (run before pushing if touching shared code)
pnpm start      # serve the production build
pnpm typecheck  # tsc --noEmit  →  must be clean before merging
```

### Editing copy

Most copy lives in `src/messages/{it,en}.json`. Edit those files, refresh the
browser. Legal pages (privacy, cookie-policy, note-legali) have handwritten
prose directly in their `page.tsx` because they branch on locale internally.

### Adding a section

1. Add the component under `src/components/sections/<name>.tsx`.
2. Add its strings under a new key in `src/messages/it.json` and `en.json`.
3. Import it in `src/app/[locale]/page.tsx` in the order you want it to appear.

### Adding a page

1. Create `src/app/[locale]/<slug>/page.tsx`.
2. Update `src/app/sitemap.ts` to include the new route for both locales.
3. Update navigation (`src/components/site-header.tsx`, `site-footer.tsx`) if
   the page should be linked.

---

## 6. Environment variables

| Var                              | Where        | Required? | Purpose                                             |
| -------------------------------- | ------------ | --------- | --------------------------------------------------- |
| `NEXT_PUBLIC_CAL_LINK`           | client/build | Yes (prod) | Cal.com handle, e.g. `reelificio/discovery`         |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`   | client/build | Optional   | Set to enable Plausible. Leave empty to disable.    |
| `NEXT_PUBLIC_PLAUSIBLE_SRC`      | client/build | Optional   | Override Plausible script URL (for self-host)       |
| `RESEND_API_KEY`                 | server only  | Yes (prod) | Required for the brief form to actually send mail   |
| `RESEND_FROM`                    | server only  | Yes (prod) | Verified sender, e.g. `Reelificio <noreply@reelificio.com>` |
| `RESEND_TO`                      | server only  | Yes (prod) | Inbox receiving briefs (default `hello@reelificio.com`) |

The brief form will silently no-op (still return 200) when `RESEND_API_KEY`
is unset, so dev works without it.

---

## 7. Deploy (Vercel)

1. Create a new Vercel project from this repo (thesweetlifesociety-cmd/reelificio_web).
2. **Set production region to `fra1`** (Frankfurt) for EU latency / GDPR posture.
3. Add the env vars from §6.
4. Connect domain `www.reelificio.com` (and apex `reelificio.com` → 308 redirect to www).

### DNS records to add on GoDaddy

Once the Vercel domain is wired, you will need:

- **Vercel**: `A` and/or `CNAME` records that Vercel surfaces in the Domains tab.
- **Resend**: SPF, DKIM, DMARC records (Resend prints them when you verify
  the domain). Without these the brief-form mail goes to spam.
- **Microsoft 365**: already configured (`hello@reelificio.com` is live) —
  don't overwrite the existing MX records.

### Smoke test after deploy

- Visit `https://www.reelificio.com` → should land on `/it`.
- Toggle to `/en` from the locale switcher → all sections rendered.
- Submit a brief on `/it/contatti` → check `hello@reelificio.com` arrives.
- Open `/it/contatti` → Cal.com embed loads, "Prenota" works.
- Run Lighthouse → LCP under 2.5s, no consent-banner-blocking script.

---

## 8. Roadmap (post-launch)

Not committed. Listed here so they're not forgotten:

- **Blog / insights**: Markdown-driven `/[locale]/insights/[slug]`. Decided
  against in v1 because it adds CMS surface area without proving conversion lift.
- **Case-study pages**: One detail page per featured account
  (`/[locale]/lavori/<handle>`). v1 has the three cards on the home page only.
- **A/B test on hero CTA copy**: only after we have ≥4 weeks of Plausible
  baseline.
- **Schema.org Service / Product markup** on `produzione` and `partnership`
  pages once pricing is public.

---

## 9. Picking up cold (TL;DR for a new dev / agent)

```bash
# 1. Clone
git clone git@github.com:thesweetlifesociety-cmd/reelificio_web.git
cd reelificio_web

# 2. Read these three files, in this order
cat docs/PLAN.md       # what we're building and why
cat CLAUDE.md          # decisions + conventions for AI agents
cat AGENTS.md          # framework gotcha (Next 16 ≠ training data)

# 3. Boot it
pnpm install
pnpm dev               # localhost:3000 → /it

# 4. Pick a task from §4 (outstanding inputs) or §8 (roadmap)
```

If something in this doc looks stale or contradicts the code, **the code wins
and this doc is wrong**. Open a PR that updates this doc in the same commit
that fixes the discrepancy.
