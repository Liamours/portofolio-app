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
    journeys/            # Archived journey data (not displayed)
  images/                # Photos and figures
  favicon.svg

docs/                    # CV and cover letter documents (not served)
  cv-260624.json         # Master CV data
  cv-draft-260624.md     # CV draft (plain text)
  cv-formula-260624.md   # CV show/not-show formula reference
  cv-template-260624.md  # CV format research notes
  cv-260624.md           # CV research notes
  portfolio-draft-260624.md
  media-candidates-260624.md
  build-cv.js            # Builds rifqi-cv-260624.docx (hybrid)
  build-cv-variants.js   # Builds industry, research, DS variants
  build-cover.js         # Builds rifqi-cover-letter.docx
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

## Dev

```bash
npm install
npm run dev        # http://localhost:3000
```

## CV rebuild

```bash
cd docs
npm install        # first time only
node build-cv.js                  # hybrid CV
node build-cv-variants.js         # industry + research + DS variants
node build-cover.js               # cover letter
```

## Deploy

Pushed to GitHub master triggers manual deploy via Vercel CLI:

```bash
npx vercel --prod
```
