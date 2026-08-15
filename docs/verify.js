// Checks every reader-facing file against the guardrails in cv-260624.json.
// Usage: node docs/verify.js        (exit 0 clean, exit 1 on any finding)
//
// Two failure modes are covered. A banned claim reaching a file is a content
// failure. An export older than the source that produced it is a staleness
// failure, which is how a corrected fact survives in a PDF that was never
// rebuilt. Both have happened, so both are checked.
//
// Guardrails come from cv._forbidden. Adding one means editing that array and
// nothing else. Fields whose name starts with an underscore are exempt,
// because those fields exist to state the forbidden text.

const fs = require('fs');
const path = require('path');

const DOCS = __dirname;
const ROOT = path.join(DOCS, '..');
const cv = require('./cv-260624.json');

// A rule is case-insensitive unless it sets cs, which exists for patterns whose
// casing carries the meaning. "mAP" is a detection metric; ".map(" is not.
const RULES = (cv._forbidden || []).map(r => ({
  re: new RegExp(r.pattern, r.cs ? '' : 'i'),
  pattern: r.pattern,
  reason: r.reason,
}));

if (!RULES.length) {
  console.error('no guardrails found in cv._forbidden, nothing to check');
  process.exit(1);
}

const findings = [];
const record = (file, where, rule, text) => findings.push({
  file: path.relative(ROOT, file).replace(/\\/g, '/'),
  where, rule, text: text.trim().slice(0, 150),
});

// ── content scan ─────────────────────────────────────────────────────────────

// Walks parsed JSON so a match reports its path rather than a line number, and
// so underscore-prefixed fields can be skipped structurally rather than by
// guessing where they end in the raw text.
function scanJson(file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  (function walk(node, trail) {
    if (typeof node === 'string') {
      for (const rule of RULES) if (rule.re.test(node)) record(file, trail, rule, node);
      return;
    }
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${trail}[${i}]`));
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (k.startsWith('_')) continue;
        walk(v, trail ? `${trail}.${k}` : k);
      }
    }
  })(data, '');
}

function scanText(file) {
  fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
    for (const rule of RULES) if (rule.re.test(line)) record(file, `line ${i + 1}`, rule, line);
  });
}

const listFiles = (dir, ext) => fs.existsSync(dir)
  ? fs.readdirSync(dir).filter(f => f.endsWith(ext)).map(f => path.join(dir, f))
  : [];

function walkDir(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, exts, out);
    else if (exts.some(x => e.name.endsWith(x))) out.push(full);
  }
  return out;
}

scanJson(path.join(DOCS, 'cv-260624.json'));
listFiles(path.join(ROOT, 'public/data'), '.json').forEach(scanJson);
listFiles(DOCS, '.js').filter(f => path.basename(f) !== 'verify.js').forEach(scanText);
walkDir(path.join(ROOT, 'app'), ['.vue', '.ts']).forEach(scanText);
[path.join(ROOT, 'README.md')].filter(fs.existsSync).forEach(scanText);

// ── schema check on the site data files ──────────────────────────────────────
// useFetch casts the JSON to its interface without checking it, so a mistyped
// key is silently dropped at runtime and the types never object. These shapes
// mirror app/types/portfolio.ts. Unknown keys are reported, since a typo is the
// failure this exists to catch.

const schemas = {
  'projects.json': {
    required: { id: 'string', title: 'string', type: ['research', 'industrial', 'software'], summary: 'string', highlights: 'array', stack: 'array', featured: 'boolean' },
    optional: { status: ['in-progress', 'planned'], period: 'any', institution: 'string', funding: 'string', images: 'array', stats: 'array', links: 'object', narrative: 'string' },
  },
  'experience.json': {
    required: { role: 'string', organization: 'string', period: 'string', type: ['research', 'teaching', 'organization', 'committee', 'competition'], highlights: 'array', portfolio: 'boolean' },
    optional: {},
  },
  'publications.json': {
    required: { title: 'string', venue: 'string', year: 'number', type: ['Conference Paper', 'Conference Paper (Accepted)', 'Conference Paper (Under Review)', 'Journal Paper', 'Journal Paper (Under Review)', 'Preprint', 'Dataset', 'e-Book', 'Review'], role: ['author', 'presenter', 'reviewer', 'contributor'] },
    optional: { authors: 'string', image: 'string', link: 'string', context: 'string' },
  },
  'skills.json': {
    required: { category: 'string', priority: ['primary', 'secondary'], items: 'array' },
    optional: {},
  },
};

const schemaErrors = [];

const typeOk = (val, spec) => {
  if (Array.isArray(spec)) return spec.includes(val);
  if (spec === 'any') return true;
  if (spec === 'array') return Array.isArray(val);
  if (spec === 'object') return val !== null && typeof val === 'object' && !Array.isArray(val);
  return typeof val === spec;
};

for (const [file, schema] of Object.entries(schemas)) {
  const full = path.join(ROOT, 'public/data', file);
  if (!fs.existsSync(full)) { schemaErrors.push(`${file} is missing`); continue; }
  const rows = JSON.parse(fs.readFileSync(full, 'utf8'));
  const known = new Set([...Object.keys(schema.required), ...Object.keys(schema.optional)]);
  rows.forEach((row, i) => {
    const label = `${file}[${i}]${row.id ? ` (${row.id})` : row.role ? ` (${row.role})` : ''}`;
    for (const [k, spec] of Object.entries(schema.required)) {
      if (!(k in row)) schemaErrors.push(`${label} is missing required "${k}"`);
      else if (!typeOk(row[k], spec)) schemaErrors.push(`${label} has bad "${k}": ${JSON.stringify(row[k])}`);
    }
    for (const [k, spec] of Object.entries(schema.optional)) {
      if (k in row && !typeOk(row[k], spec)) schemaErrors.push(`${label} has bad "${k}": ${JSON.stringify(row[k])}`);
    }
    for (const k of Object.keys(row)) {
      if (!known.has(k)) schemaErrors.push(`${label} has unknown key "${k}", likely a typo`);
    }
  });
}

// ── image references ─────────────────────────────────────────────────────────
// A project pointing at a file that is not there renders as a broken image and
// nothing else reports it.

const PUBLIC = path.join(ROOT, 'public');
for (const [i, row] of JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/projects.json'), 'utf8')).entries()) {
  for (const img of row.images || []) {
    if (!fs.existsSync(path.join(PUBLIC, img.replace(/^\//, '')))) {
      schemaErrors.push(`projects.json[${i}] (${row.id}) references a missing image: ${img}`);
    }
  }
}

// ── cross-check: cv.projects against public/data/projects.json ───────────────
// projects.json is hand-maintained, so the two files are joined on the project
// key rather than generated from one another. Titles differ by design, the CV
// being terse where the site is descriptive. Periods and presence must agree.

const drift = [];
const sitePath = path.join(ROOT, 'public/data/projects.json');
const siteProjects = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
const siteById = new Map(siteProjects.map(p => [p.id, p]));

for (const p of cv.projects) {
  const site = siteById.get(p.key);
  if (!site) {
    drift.push(`cv.projects "${p.key}" has no entry in projects.json`);
    continue;
  }
  if (site.period !== p.period) {
    drift.push(`"${p.key}" period disagrees: cv "${p.period}" vs site "${site.period}"`);
  }
}

// ── staleness scan ───────────────────────────────────────────────────────────
// An export must be newer than every source that feeds it, and a PDF must be
// newer than the DOCX it was converted from.

const mtime = f => fs.existsSync(f) ? fs.statSync(f).mtimeMs : null;
const stale = [];

const SOURCES = [
  path.join(DOCS, 'cv-260624.json'),
  path.join(DOCS, 'build-cv-variants.js'),
];
const newestSource = Math.max(...SOURCES.map(mtime).filter(Boolean));

for (const v of cv.variants || []) {
  const docx = path.join(DOCS, 'output', v.file);
  const t = mtime(docx);
  if (t === null) {
    stale.push(`${v.file} has never been built`);
    continue;
  }
  if (t < newestSource) stale.push(`${v.file} is older than cv-260624.json or the builder`);

  const pdf = docx.replace(/\.docx$/, '.pdf');
  const tp = mtime(pdf);
  if (tp === null) stale.push(`${path.basename(pdf)} is missing`);
  else if (tp < t) stale.push(`${path.basename(pdf)} is older than its DOCX`);
}

// ── report ───────────────────────────────────────────────────────────────────

if (findings.length) {
  console.log(`\nBANNED CLAIMS: ${findings.length}\n`);
  for (const f of findings) {
    console.log(`  ${f.file}  ${f.where}`);
    console.log(`    matched /${f.rule.pattern}/`);
    console.log(`    ${f.rule.reason}`);
    console.log(`    text: ${f.text}\n`);
  }
}

if (schemaErrors.length) {
  console.log(`\nSCHEMA: ${schemaErrors.length}\n`);
  for (const e of schemaErrors) console.log(`  ${e}`);
  console.log('');
}

if (drift.length) {
  console.log(`\nCV / SITE DRIFT: ${drift.length}\n`);
  for (const d of drift) console.log(`  ${d}`);
  console.log('');
}

if (stale.length) {
  console.log(`\nSTALE EXPORTS: ${stale.length}\n`);
  for (const s of stale) console.log(`  ${s}`);
  console.log('');
}

if (!findings.length && !schemaErrors.length && !drift.length && !stale.length) {
  console.log(`clean: ${RULES.length} guardrails, schema valid, no drift, no stale exports`);
  process.exit(0);
}

process.exit(1);
