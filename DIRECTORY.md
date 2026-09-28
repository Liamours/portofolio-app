# Directory structure

## app/
Nuxt site source.

| Path | Purpose |
|---|---|
| `app/app.vue` | root component |
| `app/assets/css/` | global styles |
| `app/components/sections/` | one component per homepage section (Hero, About, Skills, Experience, Projects, Publications, Contact) |
| `app/components/ui/` | reusable UI components (ProjectCard) |
| `app/components/NavBar.vue` | site navigation |
| `app/composables/` | data-fetching composables, one per `public/data/*.json` file |
| `app/pages/` | routes (homepage, project detail page) |
| `app/types/` | TypeScript interfaces for the portfolio data shapes |

## public/
Static assets served by the site.

| Path | Purpose |
|---|---|
| `public/data/` | site content as JSON (hero, about, projects, experience, publications, skills, figures) |
| `public/images/` | photos, one folder per project or context |
| `public/images/ui/` | screenshots of the site itself, used in README.md |
| `public/favicon.svg`, `public/robots.txt` | standalone static files |

## docs/
CV build pipeline. Not served by the site, a separate npm project.

| Path | Purpose |
|---|---|
| `docs/data/cv-260624.json` | master CV data, source of truth |
| `docs/data/portfolio-overlay.json` | site-only presentation data layered on top of the CV facts |
| `docs/scripts/sync.js` | generates `public/data/publications.json`, `skills.json`, `experience.json` from the CV and overlay |
| `docs/scripts/build-cv.js`, `docs/scripts/build-cv-variants.js` | build the CV as .docx, hybrid and role-targeted variants |
| `docs/scripts/build-cover.js` | builds the cover letter .docx from the template |
| `docs/scripts/build-pdf.js` | converts the built .docx files to PDF |
| `docs/scripts/verify.js` | checks generated files for banned phrasing and staleness |
| `docs/templates/cover-letter-template.md` | fill-in cover letter template |
| `docs/templates/media-candidates-260624.md` | notes on which photos suit which portfolio section |
| `docs/output/` | generated .docx and PDF files, gitignored |

## Root files

| Path | Purpose |
|---|---|
| `README.md` | profile, live site link, screenshots, contact |
| `DIRECTORY.md` | this file |
| `TODO.md` | pending tasks and milestones |
| `LICENSE` | all rights reserved notice |
| `nuxt.config.ts`, `tsconfig.json` | Nuxt and TypeScript config |
| `package.json`, `package-lock.json` | site dependencies (Nuxt, Vue) |
