# Syed Abdullah Shamsi — Portfolio Website

A modern, glassmorphism-styled ("iPhone glass") personal portfolio built with **Bootstrap 5**,
**Ion Icons**, and plain, well-commented HTML/CSS/JS — no build step, no framework required.

## 1. What's inside

```
portfolio/
├── index.html          Home page: hero, about, skills, experience/education, featured
│                        projects, certifications, contact form
├── portfolio.html       Portfolio single page: all projects with category filtering
├── blog.html             Blog page: sample posts with expandable full content
├── assets/
│   ├── css/style.css     Design system + all component/section styles (heavily commented)
│   ├── js/script.js      Nav behavior, form validation, project filtering (commented)
│   └── Syed_Abdullah_Shamsi_CV.pdf   Your CV, linked from the "Download CV" button
└── README.md            This file
```

All three pages share the same navbar, footer and stylesheet, so edits to `style.css` or
`script.js` apply everywhere automatically.

## 2. Run it locally

No build tools needed — just open `index.html` in a browser, or serve the folder so relative
links behave exactly like they will once hosted:

```bash
cd portfolio
python3 -m http.server 8080
# then visit http://localhost:8080
```

## 3. Customize the content

- **Your name / title / bio**: edit the hero and about sections in `index.html`.
- **Skills**: edit the `.skill-tags` lists inside the "Skills" section of `index.html`.
- **Experience & education**: edit the two `.timeline` blocks in `index.html`.
- **Projects**: the home page shows 3 *featured* projects; the full list lives in
  `portfolio.html`. To add a project, duplicate a `.col-filter-item` block in `portfolio.html`
  and set `data-category` to `ai-ml`, `data`, `mobile`, or `web` so the filter buttons pick it up.
- **Blog posts**: `blog.html` posts are placeholders — duplicate a `.blog-card` block (and its
  matching `.collapse` block) to add a real post; keep the `data-bs-target` / `id` pair matching
  so the "Read more" toggle keeps working.
- **Photo**: the hero currently uses an abstract glass "identity panel" with your initials
  instead of a photo (no photo was provided). To use a real photo, replace the `.id-panel` block
  in `index.html`'s hero with an `<img>` tag pointing at a photo you add under `assets/img/`.
- **Colors**: every color is a CSS variable at the top of `assets/css/style.css` under
  `:root { ... }` — change `--accent-1` / `--accent-2` to re-theme the whole site in one place.

## 4. Make the contact form actually send email

The form is wired for [Formspree](https://formspree.io), a free service that emails you form
submissions without needing your own backend — this is what makes it "work" on a static host:

1. Create a free account at formspree.io and make a new form.
2. Copy the form's endpoint URL (looks like `https://formspree.io/f/abcdwxyz`).
3. In `index.html`, find the `<form id="contactForm" ... action="https://formspree.io/f/YOUR_FORM_ID">`
   line and replace `YOUR_FORM_ID` with your real ID.

Until you do this, the form still validates input and shows a friendly status message, it just
won't deliver anywhere yet.

## 5. Host it

Any static host works since there's no server-side code:

- **GitHub Pages**: push this folder to a repo, then enable Pages in the repo's Settings →
  Pages, pointing at the `main` branch root.
- **Netlify / Vercel**: drag-and-drop the `portfolio` folder onto their dashboard, or connect
  your GitHub repo for automatic deploys.

## 6. Notes on the code

- Built on **Bootstrap 5.3** (via CDN) for the grid and mobile nav collapse; all visual styling
  beyond Bootstrap's base comes from `style.css`.
- Icons are **Ion Icons 7** (via CDN) — swap any icon by changing its `name="..."` attribute (see
  [ionic.io/ionicons](https://ionic.io/ionicons) for the full set).
- Fonts are **Space Grotesk** (headings) and **Inter** (body text) from Google Fonts.
- The glass effect uses `backdrop-filter: blur(...)`, supported in all current major browsers.
- The site respects `prefers-reduced-motion` and has visible keyboard focus states.
