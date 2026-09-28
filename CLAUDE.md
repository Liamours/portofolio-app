# Agent guidance for this repo

Read `DIRECTORY.md` first for what each folder holds. Check `TODO.md` for anything already queued before starting new work.

Source of truth: `cv/data/cv-260624.json` holds every fact (experience, projects, publications, awards, skills, education, certifications). `public/data/*.json` is what the live site reads. `sync.js` derives `publications.json`, `skills.json`, `experience.json` from the CV; `projects.json` is hand-maintained and cross-checked, not generated.

## Protocol: CV updated

1. Read the new CV file.
2. Compare it against `cv/data/cv-260624.json` section by section.
3. Update `cv-260624.json` with new or changed facts. Never hand-edit a `public/data/*.json` file that `sync.js` generates.
4. If experience entries changed, update `cv/data/portfolio-overlay.json` (`experience_order`, `experience_meta`, `competitions`) to match. `sync.js` errors on a mismatch.
5. If projects changed, update `public/data/projects.json` by hand, keeping `period` and the project key in sync with `cv.projects`.
6. `cd cv && npm install` (first time only), then `npm run sync`.
7. `npm run build:cv`, `build:variants`, `build:cover` if a fresh docx is needed. Skip `build:pdf` outside Windows with Word.
8. `npm run verify`. Fix every finding: banned claim, schema, drift, staleness.
9. Commit.

## Protocol: website up to date

1. Check `TODO.md` for queued content.
2. Run the CV protocol above if the site hasn't been synced against the latest CV facts yet.
3. For content that only lives on the site (new project photos, narrative, stats): add images to `public/images/<project>/`, update `public/data/projects.json` by hand.
4. Note new photos in `cv/templates/figures.json` and `media-candidates-260624.md` so future picks have context.
5. Start the dev server and check the page in a browser before calling it done.
6. Commit.

## Protocol: housekeeping

Run this as a loop until one full pass makes zero changes.

1. Pick the next folder not yet reviewed this pass.
2. List its contents, update its section in `DIRECTORY.md`.
3. Check `DIRECTORY.md` for folder-purpose overlap. Flag it, don't merge automatically, that's a judgment call for the user.
4. Check the folder for misplaced files: content that doesn't match the folder's purpose, or an unusual mix of kinds. If the right home is obvious and matches an existing convention in this repo, move it and fix every reference, then verify nothing broke. If it's ambiguous, ask.
5. Repeat from step 1.

## Protocol: cross-source consistency

**CV vs. website**: automated. `cd cv && npm run verify` checks banned phrasing, schema validity, CV/site project drift, and stale exports.

**CV/website vs. LinkedIn**: no automation, agent check only. When asked, read `cv/data/cv-260624.json` (or the live site) and compare it against whatever the user provides from LinkedIn (pasted text, export file, or screenshot). Report differences plainly. Don't scrape LinkedIn, don't store credentials, don't build a pipeline for this unless asked.
