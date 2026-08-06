// sync.js — reads cv-260624.json and writes public/data/publications.json and skills.json
// Run: node docs/sync.js
// ponytail: experience.json is out of scope — it has portfolio-only metadata (type, portfolio, competition entries)

const cv = require('./cv-260624.json')
const fs = require('fs')
const path = require('path')
const OUT = path.join(__dirname, '../public/data')

// ── publications.json ────────────────────────────────────────────────────────

const publications = cv.publications.map(p => ({
  title: p.title,
  venue: p.indexed ? `${p.venue}, ${p.indexed}` : p.venue,
  year: p.year,
  type: p.type,
  role: 'author',
  authors: p.authors,
  context: p.context,
  ...(p.link && { link: p.link }),
}))

fs.writeFileSync(path.join(OUT, 'publications.json'), JSON.stringify(publications, null, 2))
console.log(`publications.json — ${publications.length} entries`)

// ── skills.json ──────────────────────────────────────────────────────────────

const SKILL_MAP = [
  { key: 'ml_frameworks',        category: 'AI Engineering',             priority: 'primary' },
  { key: 'computer_vision_audio', category: 'Computer Vision and Audio', priority: 'primary' },
  { key: 'mlops_infrastructure', category: 'MLOps and Infrastructure',   priority: 'primary' },
  { key: 'languages',            category: 'Languages',                  priority: 'secondary' },
  { key: 'research_tools',       category: 'Research Tools',             priority: 'secondary' },
]

const skills = [
  ...SKILL_MAP.map(({ key, category, priority }) => ({
    category,
    priority,
    items: cv.skills[key],
  })),
  {
    category: 'Spoken Languages',
    priority: 'secondary',
    items: cv.languages.map(l => `${l.language} (${l.proficiency})`),
  },
  {
    category: 'Certifications',
    priority: 'secondary',
    items: cv.certifications.map(c =>
      `${c.title} – ${c.issuer} (${c.issued})`
    ),
  },
]

fs.writeFileSync(path.join(OUT, 'skills.json'), JSON.stringify(skills, null, 2))
console.log(`skills.json — ${skills.length} categories`)
