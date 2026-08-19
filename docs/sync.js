// Generates the site data files that duplicate cv-260624.json.
// Usage: node docs/sync.js
//
// publications.json, skills.json and experience.json are derived, because their
// content is the same facts the CV states. projects.json is NOT generated: its
// summaries, narratives, stats and images are written for the site and have no
// CV equivalent, so it stays hand-maintained and verify.js cross-checks the
// fields both files do share.
//
// Presentation that belongs to the site alone lives in portfolio-overlay.json.

const fs = require('fs')
const path = require('path')

const cv = require('./cv-260624.json')
const overlay = require('./portfolio-overlay.json')
const OUT = path.join(__dirname, '../public/data')

const write = (name, data, unit) => {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(data, null, 2) + '\n')
  console.log(`${name} — ${data.length} ${unit}`)
}

// ── publications.json ────────────────────────────────────────────────────────

write('publications.json', cv.publications.map(p => ({
  title: p.title,
  venue: p.indexed ? `${p.venue}, ${p.indexed}` : p.venue,
  year: p.year,
  type: p.type,
  role: p.type === 'Copyright' ? 'contributor' : 'author',
  authors: p.authors,
  context: p.context,
  ...(p.link && { link: p.link }),
})), 'entries')

// ── skills.json ──────────────────────────────────────────────────────────────

const SKILL_MAP = [
  { key: 'ml_frameworks',         category: 'AI Engineering',            priority: 'primary' },
  { key: 'computer_vision_audio', category: 'Computer Vision and Audio', priority: 'primary' },
  { key: 'mlops_infrastructure',  category: 'MLOps and Infrastructure',  priority: 'primary' },
  { key: 'languages',             category: 'Languages',                 priority: 'secondary' },
  { key: 'research_tools',        category: 'Research Tools',            priority: 'secondary' },
]

write('skills.json', [
  ...SKILL_MAP.map(({ key, category, priority }) => ({ category, priority, items: cv.skills[key] })),
  {
    category: 'Spoken Languages',
    priority: 'secondary',
    items: cv.languages.map(l => `${l.language} (${l.proficiency})`),
  },
  {
    category: 'Certifications',
    priority: 'secondary',
    items: cv.certifications.map(c => `${c.title} – ${c.issuer} (${c.issued})`),
  },
], 'categories')

// ── experience.json ──────────────────────────────────────────────────────────
// Roles come from cv.experience in the order the overlay gives. Competition
// entries have no cv.experience equivalent and are carried from the overlay.

const cvByKey = new Map(cv.experience.map(e => [e.key, e]))

const roles = overlay.experience_order.map(key => {
  const e = cvByKey.get(key)
  if (!e) throw new Error(`experience_order names unknown key "${key}"`)
  const meta = overlay.experience_meta[key]
  if (!meta) throw new Error(`no experience_meta for key "${key}"`)
  return {
    role: e.role,
    organization: e.organization,
    period: e.period,
    type: meta.type,
    highlights: e.highlights,
    portfolio: meta.portfolio,
  }
})

const unordered = cv.experience.filter(e => !overlay.experience_order.includes(e.key))
if (unordered.length) {
  throw new Error(`cv.experience entries missing from experience_order: ${unordered.map(e => e.key).join(', ')}`)
}

write('experience.json', [...roles, ...overlay.competitions], 'entries')
