# Third Room

A static archive of serious public philosophy — discussions, essays, reading lists, and resources built for clarity, rigor, and permanence.

## Quick Start

Open `index.html` in any modern browser. No build step, no dependencies, no server required.

For local development with search (which loads `assets/data/content-index.json`), use any static file server:

```bash
# From the project root — pick one:
python3 -m http.server 8000
npx serve .
```

Then visit `http://localhost:8000`.

## Structure

```
/
├── index.html              # Home page
├── about/                  # About the project
├── articles/               # Long-form essays (one HTML file per article)
├── discussions/            # Discussion archives (one HTML file per discussion)
├── reading/                # Curated reading lists
├── topics/                 # Topic hub pages (10 topics + topics/index.html)
├── books/                  # Book notes and guides
├── podcast/                # Podcast episodes
├── guest-essays/           # Guest contributions
├── resources/              # External links and reference materials
├── participate/            # How to join and contribute
├── archive/                # Chronological archive
├── templates/              # Copy-paste templates for new content
│   ├── article-template.html
│   ├── discussion-template.html
│   └── reading-list-template.html
├── assets/
│   ├── css/main.css        # All styles
│   ├── js/main.js          # Theme toggle, navigation, search
│   ├── data/content-index.json  # Search index — edit when adding pages
│   └── images/
├── feed.xml                # RSS feed
├── sitemap.xml             # Sitemap
└── robots.txt
```

## Adding Content

All content is plain HTML. Edit files directly — no generators or build tools.

1. **New article** — Copy `templates/article-template.html` to `articles/your-slug.html`. Fill in content. Add a list entry on `articles/index.html`. Add an entry to `assets/data/content-index.json`.
2. **New discussion** — Copy `templates/discussion-template.html` to `discussions/your-slug.html`. Update `discussions/index.html` and `content-index.json`.
3. **New reading list** — Copy `templates/reading-list-template.html` to `reading/your-slug.html`. Update `reading/index.html` and `content-index.json`.
4. **New topic** — Create `topics/your-topic/index.html` using an existing topic as reference. Add to `topics/index.html` and `content-index.json`.

Each page includes its own header and footer (duplicated for portability). Copy from any existing page at the same directory depth and adjust paths.

## Path conventions

| Page location | CSS/JS path | Example link to home |
|---------------|-------------|----------------------|
| Root (`index.html`) | `assets/css/main.css` | `index.html` |
| One level (`about/`) | `../assets/css/main.css` | `../index.html` |
| Two levels (`topics/epistemology/`) | `../../assets/css/main.css` | `../../index.html` |

## JavaScript

`assets/js/main.js` handles only:

- Dark/light theme toggle (saved in `localStorage`)
- Mobile navigation
- Site search (reads `assets/data/content-index.json`)
- Newsletter form placeholder

## Design

- Dark mode first (toggle in header)
- Typography optimized for long-form reading
- Semantic HTML, keyboard navigation, skip link
- No frameworks — portable indefinitely

## Deployment

Deploy the entire directory to **GitHub Pages** or **Cloudflare Pages**.

Live site: [gauravbora2008.github.io/thirdroomcollective](https://gauravbora2008.github.io/thirdroomcollective/)

Update URLs in `sitemap.xml`, `feed.xml`, and `robots.txt` if you move to a custom domain.

## License

Content © 2026 Third Room. Licensed for educational use unless otherwise noted.
