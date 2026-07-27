# Third Room

Astro static site for Saturday philosophy events, discussion summaries, podcasts, and articles.

**Vision & priorities:** see [VISION.md](VISION.md).

## Setup

```bash
npm install
npm run dev      # local preview
npm run build    # output → dist/
npm run preview  # preview the build
```

## Nav

Home · Events · Podcasts · Discussions · Articles · Topics · About

## How content is organized

- **Events** — live calls (Saturdays, 12:00 noon IST). About four per month.
- **Topics** — group related podcasts + discussion summaries (Vegan Philosophy, Atheism & Philosophy of Religion, Continental Philosophy, Indian Philosophy).
- **Discussions** — written summaries after an event.
- **Podcasts** — audio episodes after an event.
- **Articles** — standalone essays (add one by one).

Shared chrome lives in `src/layouts/` and `src/components/`. Content pages are under `src/pages/`.

### Monthly pattern

1. Add an entry in `src/data/events.ts` (and optionally a suggested question in `src/data/series.ts`).
2. Add `src/pages/events/YYYY-MM-DD-slug.astro` wrapping `<EventPage … />`.
3. After the call: add pages under `src/pages/discussions/` and `src/pages/podcast/`.
4. Link those from the topic hub (via data later) and the Discussions / Podcasts indexes.

## Next events (Aug 2026)

| Date | Series | Question |
|------|--------|----------|
| 1 Aug | Vegan Philosophy | Can speciesism be justified? |
| 8 Aug | Atheism & Philosophy of Religion | Does the problem of evil make theism unreasonable? |
| 15 Aug | Continental Philosophy | What is phenomenology asking us to do? |
| 22 Aug | Indian Philosophy | Is the self real? Ātman, anātman, and what hangs on it |

Edit schedule and copy in `src/data/events.ts` and `src/data/series.ts`. Each event page is a thin wrapper under `src/pages/events/`.

### Wire up Register (Google Form)

1. Create a form at [forms.google.com](https://forms.google.com).
2. Suggested fields:
   - **Name** (required, short answer)
   - **Email** (required, short answer — set response validation to Email)
   - **Optional:** How did you hear about Third Room? / Questions for the session (paragraph)
3. Settings → collect email addresses if you want Google’s built-in email field instead of a custom one (either works).
4. Send → copy link.
5. On the event page, set the Register button `href` to that URL (replace `#register`).

Responses land in Google Sheets automatically.

### Wire up Zoom

On the same event page, find the Zoom button (`#zoom-link`):

- Set `href` to your Zoom URL
- Remove classes `is-disabled` and attribute `aria-disabled="true"`

## Google Calendar

“Add to Google Calendar” is already on the home and event pages (one-off for 1 Aug 2026, Asia/Kolkata). Create a new calendar link when you add each Saturday event.

## Deploy

Pushes to `main` build with Astro and publish `dist/` to GitHub Pages via GitHub Actions.

https://gauravbora2008.github.io/thirdroomcollective/

Locally: `npm run build` then `npm run preview`.
