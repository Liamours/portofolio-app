# portofolio-app

Portfolio website for M. Rifqi Dzaky Azhad — medical imaging ML researcher at Telkom University.

Live: https://portofolio-app-puce.vercel.app

## Stack

Nuxt 4, Vue 3, TypeScript, deployed on Vercel (CSR/SPA).

## Structure

```
app/
  components/sections/   # HeroSection, AboutSection, ProjectsSection, etc.
  components/ui/         # ProjectCard
  pages/
    index.vue            # Main portfolio page
    projects/[id].vue    # Project detail pages
  assets/css/main.css    # Global styles
  composables/           # usePortfolio.ts — data fetching

public/
  data/                  # Portfolio JSON data files
    about.json           # Bio, institution, graduation
    experience.json      # All experience entries (portfolio: true filters display)
    hero.json            # Name, title, tagline, links
    projects.json        # All projects (featured: true filters display)
    publications.json    # Publications list
    skills.json          # Skills by category
    figures.json         # Image asset descriptions
  images/                # Photos and figures
  favicon.svg
  rifqi-cv-260624.docx
  rifqi-cv-industry.docx
  rifqi-cv-research.docx
  rifqi-cv-ds.docx
  rifqi-cover-letter.docx
```

## Data conventions

- `experience.json`: set `"portfolio": true` on entries to show on the portfolio page. All entries are included in the CV.
- `projects.json`: set `"featured": true` on entries to show on the portfolio page.
- Full month names everywhere. No abbreviated months (Jan, Feb, etc.).
- No em dashes. No AI buzzwords (robust, seamless, leverage, curated, etc.).

## Data

`public/data/*.json` is generated from `information/` by `repo/document_builder` (`npm run build`); edit the sources there, not here. The files stay in this repo because Vercel builds from git.

## Dev

```bash
npm install
npm run dev        # http://localhost:3000
```

## CV rebuild

CV, resume and cover letter builds live in `../document_builder`; this repo only serves the site.

## Deploy

Pushed to GitHub master triggers manual deploy via Vercel CLI:

```bash
npx vercel --prod
```
