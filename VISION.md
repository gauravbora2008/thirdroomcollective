# Third Room — Vision

Reference document for direction and priorities.  
Practical how-to lives in [README.md](README.md).

---

## What this is

Third Room is a long-term archive of **serious public philosophy**.

It is not a social product. The goal is not engagement, virality, or growth hacking.

The goal is a permanent, well-organized collection of:

- live discussions (events)
- written discussion summaries
- podcast episodes
- essays

…that accumulate over years and remain useful when someone discovers them later.

Think: library or journal energy (Stanford Encyclopedia, Aeon, old university department sites)—with a clean, modern, reading-first aesthetic.

---

## Core principles

1. **Permanence over virality**  
   Every discussion should leave an artifact: summary, podcast, or both.

2. **Clarity over cleverness**  
   Writing should be accessible without sacrificing rigor.

3. **Ideas over personalities**  
   Institutional tone. Avoid influencer branding. Archive of ideas, not of egos.

4. **Start simple; add complexity later**  
   Ship a lean site. Add feeds, search, reading lists, etc. only when needed.

5. **Portable by design**  
   Astro static site. Shared layout, plain content pages, minimal client JS.  
   Editable by humans and AI agents. Builds to static files for GitHub Pages.

---

## What we publish (current scope)

| Section | Role |
|--------|------|
| **Events** | Live calls. Entry point for participation. |
| **Discussions** | Written summaries after events. |
| **Podcasts** | Audio episodes after events. |
| **Articles** | Standalone essays (added one by one). |
| **Topics** | Grouping layer for podcasts + discussions (and related events). |
| **About** | What Third Room is, cadence, and how to participate. |

Reading lists, resources, newsletter, Discord, full-text search — later, when useful.

---

## Cadence

- **Schedule:** Saturdays, **12:00 noon IST** (online).
- **Volume:** about **four events per month** (one most Saturdays).
- **Series:** recurring Saturday series, each session with a subtitle or question under discussion:
  - **Vegan Philosophy**
  - **Atheism & Philosophy of Religion**
  - **Continental Philosophy**
  - **Indian Philosophy**
- Other Saturdays can be other topics, using the same pattern.

### Lifecycle of one event

```
Announce event page
  → Register (Google Form) + Calendar + Zoom (when ready)
  → Live discussion
  → Discussion summary page
  → Podcast episode page
  → Both linked from the topic hub
```

Nothing important should exist only in a Zoom recording or a chat thread.

---

## Information architecture

```
src/pages/events/          upcoming + past live sessions
src/pages/discussions/     written summaries
src/pages/podcast/         episode pages
src/pages/articles/        essays
src/pages/topics/          hubs (e.g. vegan-philosophy/) that list related content
src/pages/about/           what this is and how to join
```

**Navigation:** Home · Events · Podcasts · Discussions · Articles · Topics · About  

Topics are how people browse the archive by subject.  
Events are how people join the next conversation.

### Naming conventions (keep consistent)

- Events: `src/pages/events/YYYY-MM-DD-slug.astro` + entry in `src/data/events.ts`  
  Example: `2026-08-01-vegan-philosophy.astro` → `/events/2026-08-01-vegan-philosophy/`
- Series copy and suggested questions: `src/data/series.ts`
- Discussions / podcasts: date or series + slug; always link back to the event and topic.

---

## Participation

- Registration: **Google Form** (name + email → Sheets). Same form can serve many events.
- Zoom link on the event page when available.
- “Add to Google Calendar” on each event (one-off per date for now).

Keep the barrier low. Do not build a custom auth or CRM until the archive and cadence are solid.

---

## Design intent

- Dark mode first (night-library ink + brass); light mode is cool parchment with moss accent.
- Academic but slightly mysterious: Garamond display, quiet grain, soft vignette—not flashy.
- Lots of whitespace; reading over chrome. Subtle hover only.
- Semantic HTML; keyboard-friendly; clear hierarchy.

Reference feel: old seminar room after hours / SEP seriousness / Obsidian depth — filtered through “library, not feed.”

---

## Technical constraints (non-negotiable for now)

- **Astro** (static output). Chosen for shared layouts and less duplication while staying efficient—no client framework runtime by default.
- Content pages are mostly HTML in `.astro` files; shared chrome lives in layouts/components.
- Minimal vanilla JS only when necessary (theme toggle, mobile nav).
- No React, Vue, CMS, or app-style interactivity until the archive needs it.
- `npm run build` → static `dist/` for GitHub Pages (`base`: `/thirdroomcollective`).
- Future AI assistants should be able to edit pages by reading this vision + the README.

---

## What “done” looks like in a year

Not follower counts. Instead:

- A predictable Saturday rhythm people can trust  
- Dozens of discussion summaries and podcast episodes, findable by topic  
- At least one mature series hub (Vegan Philosophy) with a clear history  
- New topics added the same simple way  
- The site still understandable as a small Astro project with clear page files

---

## Explicit non-goals (for now)

- Virality, SEO growth hacks, or engagement metrics as the north star  
- Personal branding as the product  
- Complex apps (accounts, comments, feeds) before the archive habit exists  
- Premature features: mega-nav, search, newsletter, Discord — add when the content needs them

---

## Decision rule

When choosing between two options, prefer the one that:

1. Leaves a clearer artifact for a future reader, and  
2. Keeps the site smaller and easier to edit.

If it does not help the archive or the Saturday cadence, defer it.
