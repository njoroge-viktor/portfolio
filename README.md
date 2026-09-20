# Victor Njoroge — Portfolio

A modern, 3D-styled personal portfolio for **Victor Njoroge**, PhD Software Engineer and AI
Evaluation Specialist. Content is driven entirely by `db.json`, served through `json-server`.

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 18 (JSX) + Vite |
| Layout | Bootstrap 5 (grid, reboot, utilities) |
| Detail styling | Tailwind CSS 3 (utilities only — preflight disabled) |
| Design system | Hand-written CSS custom properties + CSS 3D (`src/styles/theme.css`) |
| Icons | Font Awesome 6 Free |
| Data | `db.json` via json-server |

Bootstrap and Tailwind coexist deliberately: Bootstrap owns the responsive grid and form/reboot
behaviour, Tailwind supplies spacing and typography utilities, and `theme.css` owns the visual
identity. Tailwind's preflight is switched off in `tailwind.config.js` so it never fights
Bootstrap's reboot for base element styles.

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` runs both processes together:

- **API** — json-server on <http://localhost:4000>
- **Web** — Vite on <http://localhost:5173> (it picks the next free port if 5173 is taken)

Other scripts:

```bash
npm run api      # json-server only
npm run web      # Vite only
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## The database

`db.json` is the single source of truth. Every top-level key becomes a json-server endpoint:

| Endpoint | Contents |
| --- | --- |
| `/profile` | Name, title, contact details, summary |
| `/stats` | Headline figures in the hero |
| `/spheres` | The three capability spheres and their skills |
| `/toolCategories` | Platforms, models, languages and infrastructure |
| `/experience` | Roles, with per-role highlights and stack |
| `/projects` | Selected LLM and annotation engagements |
| `/education` | Degrees |
| `/certifications` | Certifications (rendered as flip cards) |
| `/languages` | English and Swahili proficiency |
| `/navigation` | Nav items |
| `/messages` | Contact-form submissions, written back by json-server |

**Editing content means editing `db.json` — no component changes required.** json-server watches
the file, so saving it refreshes the API immediately.

### Where the data comes from

`usePortfolio` decides at build time:

- **Development** — fetches from json-server on `localhost:4000`, falling back to the bundled
  `db.json` if it is not running.
- **Production** — reads the bundled `db.json` directly and makes no network request at all.
  A static host has no json-server behind it, and calling `localhost` from an HTTPS page is
  blocked as mixed content regardless.
- **Either** — set `VITE_API_URL` (see `.env.example`) to point at a real API and that wins.

The footer shows which source is live.

### Contact form

- **Development** — POSTs to `/messages`; json-server appends the submission to `db.json`.
- **Production** — submits to [Netlify Forms](https://docs.netlify.com/forms/setup/). Netlify
  detects forms by scanning deployed HTML at build time, and never sees a React-rendered form, so
  `index.html` carries a hidden copy that registers the form and its fields. Submissions appear
  under **Forms** in the Netlify dashboard. A honeypot field filters bots.

Either way, a failure leaves the visitor a `mailto:` link.

## Deploying to Netlify

`netlify.toml` holds the whole configuration, so nothing needs to be typed into the Netlify UI:
build command `npm run build`, publish directory `dist`, Node 20, an SPA catch-all redirect, cache
headers for fingerprinted assets, and a few security headers.

1. In Netlify, **Add new site → Import an existing project → GitHub**.
2. Pick this repository. The settings are read from `netlify.toml` — leave them as shown.
3. **Deploy**. Every push to `main` redeploys; pull requests get preview deploys.

To enable contact-form notifications, open **Site configuration → Forms → Form notifications**
after the first deploy and add an email notification for the `contact` form.

No environment variables are required. Set `VITE_API_URL` in Netlify only if you later host the
API somewhere real.

## Subliminal colour coding

Colour is doing persuasive work here, not decoration. Five hues are assigned fixed meanings and
used consistently, so the impression accumulates without ever being stated:

| Token | Hue | Suggests | Where it leads |
| --- | --- | --- | --- |
| `--royal` | Violet `#7c3aed` | Royalty, authority, rarefied expertise | Hero, AI/RLHF sphere, contact |
| `--divine` | Gold `#e8b923` | Divinity, prestige, the "gold standard" | The name, primary CTAs, credentials |
| `--credible` | Deep blue `#2563eb` | Credibility, trust, institutional weight | About, backend sphere, experience |
| `--purpose` | Emerald `#10b981` | Purpose, growth, forward motion | Availability signals, annotation work |
| `--exuberance` | Rose `#ff6b9d` | Exuberance, energy, human warmth | Projects, highlights |

Each `<section>` carries a `data-accent` attribute that rebinds `--accent`, `--accent-light` and
`--accent-rgb` locally. Every component reads those variables, so a single set of components takes
on the mood of whichever section holds it — one attribute reskins a whole section.

Gold is deliberately scarce. It is reserved for the name, primary CTAs and credentials, because
scarcity is what makes it read as *divine* rather than merely decorative.

## The 3D system

3D is CSS-driven — no WebGL dependency, so it degrades gracefully and stays light.

- **Tilt cards** (`useTilt` + `.tilt-card`) — the hook writes `--rx`, `--ry`, `--mx`, `--my`; CSS
  does the transform, keeping the animation on the compositor. A specular highlight tracks the
  pointer, which is what sells a flat panel as a lit physical surface.
- **Depth layers** — `.layer-1/2/3` translate children along Z inside `preserve-3d` parents, so
  content genuinely floats above the card surface.
- **Hero orb** — layered `rotateX`/`rotateZ` rings around a radial-gradient core, with credential
  chips in real orbit. The outward glow lives on a separate `.orb-halo` element because a
  composited `preserve-3d` layer clips box-shadow spill to its own bounds.
- **Flip cards** — certifications rotate on `rotateY(180deg)` on hover or keyboard focus.
- **Scroll reveals** — `useReveal` adds `.is-visible`, animating elements in with a slight
  `rotateX` so they settle into the page rather than sliding across it.
- **Starfield** — depth-sorted canvas particles; parallax and size both fall out of a real `z`
  value rather than being faked per layer.

Everything collapses under `prefers-reduced-motion: reduce`, and tilt is disabled on touch
devices.

## Project structure

```
db.json                   # the database — edit this to change content
index.html
netlify.toml              # build command, publish dir, redirects, headers
tailwind.config.js        # preflight disabled; palette + fonts
src/
  main.jsx                # Bootstrap → Tailwind → theme.css, in that order
  App.jsx
  index.css               # Tailwind layers + shared component classes
  styles/theme.css        # design tokens, colour coding, 3D system
  hooks/
    usePortfolio.js       # API fetch with db.json fallback
    useTilt.js            # pointer-driven 3D tilt
    useReveal.js          # scroll reveal
    useCountUp.js         # animated stat counters
    useActiveSection.js   # nav highlighting
  components/
    Navbar · Hero · About · Expertise · Experience
    Projects · Credentials · Contact · Footer
    TiltCard · Reveal · SectionHeading · Starfield · CursorGlow · Preloader
```

## Accessibility

- Semantic landmarks, labelled form fields, `aria-expanded` / `aria-pressed` on interactive
  controls, and a gold `:focus-visible` ring throughout.
- The project modal traps Escape, locks background scroll, and is portalled to `<body>` — section
  `perspective` would otherwise capture `position: fixed` and anchor it to the section.
- Certification flip cards respond to keyboard focus as well as hover.
- Full `prefers-reduced-motion` support.
