# Agent guidance for this repo

Read `DIRECTORY.md` first for what each folder holds. Check `TODO.md` for anything already queued before starting new work.

Source of truth: `cv/data/cv-260624.json` holds every fact (experience, projects, publications, awards, skills, education, certifications). `public/data/*.json` is what the live site reads. `sync.js` derives `publications.json`, `skills.json`, `experience.json` from the CV; `projects.json` is hand-maintained and cross-checked, not generated.

Below are named protocols for recurring work. Refer to a protocol by name when asking for it or reporting on it, for example "ran CV-SYNC" or "this is a TIDY-PASS task."

Every `cd cv && ...` command below runs from the repo root. `cv/` is its own npm project: if `cv/node_modules` doesn't exist yet, run `npm install` inside `cv/` first, regardless of which protocol step you're on.

---

## CV-SYNC

**Trigger**: the user provides an updated CV, or asks to get the CV or site facts current.

**Purpose**: bring a new or changed fact from the CV into `cv-260624.json` first, then propagate it outward, so the CV stays the single source of truth and nothing gets hand-edited in a file that's supposed to be generated.

**Steps**:
1. Read the new CV file.
2. Compare it against `cv/data/cv-260624.json` section by section: experience, projects, publications, awards, skills, education, certifications.
3. Update `cv-260624.json` with new or changed facts. Never hand-edit a `public/data/*.json` file that `sync.js` generates.
4. If experience entries changed, update `cv/data/portfolio-overlay.json` (`experience_order`, `experience_meta`, `competitions`) to match. `sync.js` errors on a mismatch.
5. If projects changed, update `public/data/projects.json` by hand, keeping `period` and the project key in sync with `cv.projects`.
6. `cd cv && npm run sync`.
7. `npm run build:cv`, `build:variants`, `build:cover` if a fresh docx is needed. Skip `build:pdf` outside Windows with Word.
8. `npm run verify`. Fix every finding: banned claim, schema, drift, staleness.
9. Commit.

**Done when**: `npm run verify` passes clean and, if docx files were rebuilt, they reflect the new content.

---

## SITE-REFRESH

**Trigger**: the user asks to bring the live site up to date, add new content to the portfolio, or add new project photos.

**Purpose**: cover the part of "up to date" that CV-SYNC doesn't reach, content that exists on the site alone and has no CV equivalent (project narrative, stats, photos).

**Steps**:
1. Check `TODO.md` for queued content.
2. Run CV-SYNC first if the site hasn't been synced against the latest CV facts yet.
3. For content that only lives on the site (new project photos, narrative, stats): add images to `public/images/<project>/`, update `public/data/projects.json` by hand.
4. Note new photos in `cv/templates/figures.json` and `media-candidates-260624.md` so future picks have context.
5. Start the dev server and check the page in a browser before calling it done.
6. Commit.

**Done when**: the change is visible in a real browser check, not just a file diff.

---

## TIDY-PASS

**Trigger**: the user asks for housekeeping, or a repo change (new folder, moved files) leaves the structure worth re-checking.

**Purpose**: keep the folder structure conventional, keep `DIRECTORY.md` accurate, and catch content that has drifted into the wrong place.

**Steps**:
1. Pick the next top-level folder not yet reviewed this pass (`app/`, `public/`, `cv/`, and so on, one level deep, matching `DIRECTORY.md`'s existing granularity, not every nested subfolder).
2. List its contents, update its section in `DIRECTORY.md`.
3. Check `DIRECTORY.md` for folder-purpose overlap: two folders whose one-line purposes could be swapped without changing anything true. Flag it in your report, don't merge automatically, that's a judgment call for the user.
4. Check the folder for misplaced files: a file whose kind (code, data, prose, generated output) doesn't match what the folder otherwise holds, or that nothing in the app/scripts actually reads (check with a repo-wide grep for its filename before deciding). If the right home is a folder that already exists in this repo for that kind of content, move it and fix every reference, then verify nothing broke. If no existing folder fits, or it's genuinely unclear, flag it and ask rather than inventing a new folder.
5. Repeat from step 1.

**Done when**: one full pass over every top-level folder produces zero flags and zero moves. A pass that only flags something (without moving it) has not met done-when, run another pass after the flag is resolved.

---

## CROSS-CHECK

**Trigger**: the user asks whether the CV, the website, or an external profile agree with each other.

**Purpose**: catch drift between the surfaces that describe the same facts.

**CV vs. website** (automated): `cd cv && npm run verify` checks banned phrasing, schema validity, CV/site project drift, and stale exports.

**CV/website vs. LinkedIn** (manual, agent check only, no built pipeline): when asked, read `cv/data/cv-260624.json` (or the live site) and compare it against whatever the user provides from LinkedIn (pasted text, export file, or screenshot). Report differences plainly. Don't scrape LinkedIn, don't store credentials, don't build automation for this unless asked.

**Done when**: every difference found is reported, whether or not it gets fixed.
