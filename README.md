# AMIS Web — Proof of Concept Dashboard

Adaptive Maintenance Intelligence System (AMIS) interactive dashboard proof-of-concept. Built with React, Vite, Tailwind CSS, and Lucide React icons.

This is a **non-functional mock UI** — all data is static and mirrors the `Amis_public.dbml` schema. Tabs 1–5 are fully populated; Tabs 6–18 are navigable placeholders pending Phase 4 feedback.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [Git](https://git-scm.com/)
- A [GitHub](https://github.com/) account (for deployment)

## Local Development

```bash
cd amis-web
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

> **Note:** Local dev uses `base: '/amis-web/'` in `vite.config.js`. If assets fail to load locally, run `npm run preview` after building instead.

## Build for Production

```bash
npm run build
npm run preview
```

The built site is output to the `dist/` folder.

## Deploy to GitHub Pages (First Time)

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository `amis-web` (or any name you prefer)
3. Leave it **empty** — do not add a README, `.gitignore`, or license
4. Click **Create repository**

### Step 2 — Push your code

```bash
cd amis-web
git init
git add .
git commit -m "Initial AMIS PoC dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/amis-web.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3 — Match the Vite base path to your repo name

Open `vite.config.js` and set `base` to match your repository name:

```js
export default defineConfig({
  base: '/amis-web/',   // must be '/YOUR-REPO-NAME/'
  // ...
})
```

If your repo is named `my-thesis-amis`, use `base: '/my-thesis-amis/'`.

### Step 4 — Deploy

```bash
npm run deploy
```

This builds the app and pushes the `dist/` folder to a `gh-pages` branch on GitHub.

### Step 5 — Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Set **Branch** to `gh-pages` and folder to `/ (root)`
4. Click **Save**

After 1–2 minutes, your site will be live at:

```
https://YOUR_USERNAME.github.io/amis-web/
```

### Step 6 — Update after changes

Whenever you make changes:

```bash
git add .
git commit -m "Describe your change"
git push
npm run deploy
```

## Project Structure

```
amis-web/
├── src/
│   ├── components/layout/   Sidebar, Header, AriaDrawer
│   ├── components/ui/       Gauges, tables, charts, trees
│   ├── context/             Global state (tab, tail, ARIA)
│   ├── data/                mockData.js, schemaCatalog.js, Amis_public.dbml
│   └── tabs/                Tab 1–5 dashboards + placeholder
├── AboutAmis.md             System architecture overview
└── vite.config.js           GitHub Pages base path
```

## Tech Stack

| Tool | Role |
|------|------|
| React 19 + Vite 8 | UI framework and build tool |
| Tailwind CSS v4 | Styling |
| Lucide React | Icons |
| Recharts | Mock charts (RUL, Weibull, sensors) |
| gh-pages | GitHub Pages deployment |

## Related

- Schema source: `../Amis_public.dbml`
- Ontology source: `../Amis_public.owl`
- Production backend: `../ClaudeCode/amis-main/` (Streamlit + Python)

See [AboutAmis.md](./AboutAmis.md) for the cybernetic architecture and enterprise vision.
