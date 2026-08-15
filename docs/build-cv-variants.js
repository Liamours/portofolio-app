// Builds every role-targeted CV variant declared in cv-260624.json.
// Usage: node build-cv-variants.js
//
// This file holds layout only. Every reader-facing string lives in
// cv-260624.json, so a corrected fact reaches all variants at once. Adding a
// variant means adding an entry to cv.variants, not editing this file.

const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, BorderStyle, TabStopType, LevelFormat
} = require('./node_modules/docx');
const fs = require('fs');
const path = require('path');
const cv = require('./cv-260624.json');

const FONT   = "Garamond";
const BODY   = 20;
const SMALL  = 18;
const SEC    = 22;
const SUBSEC = 20;
const NAME   = 36;
const CWIDTH = 9746;
const ME = cv.personal.name;

// ── shared helpers ───────────────────────────────────────────────────────────

const sectionHeader = t => new Paragraph({
  children: [new TextRun({ text: t, font: FONT, size: SEC, bold: true, allCaps: true })],
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000", space: 2 } },
  spacing: { before: 200, after: 80 },
});

const pubSubHeader = t => new Paragraph({
  children: [new TextRun({ text: t, font: FONT, size: SUBSEC, bold: true, italics: true })],
  spacing: { before: 120, after: 40 },
});

const roleLine = (title, period) => new Paragraph({
  children: [
    new TextRun({ text: title, font: FONT, size: BODY, bold: true }),
    new TextRun({ text: "\t" + period, font: FONT, size: BODY }),
  ],
  tabStops: [{ type: TabStopType.RIGHT, position: CWIDTH }],
  spacing: { before: 120, after: 0 },
});

const orgLine = t => new Paragraph({
  children: [new TextRun({ text: t, font: FONT, size: BODY, italics: true })],
  spacing: { before: 0, after: 40 },
});

const bullet = t => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  children: [new TextRun({ text: t, font: FONT, size: BODY })],
});

const para = (t, size = BODY) => new Paragraph({
  children: [new TextRun({ text: t, font: FONT, size })],
  spacing: { before: 0, after: 60 },
});

const award = (title, event, detail) => new Paragraph({
  children: [
    new TextRun({ text: title + ". ", font: FONT, size: BODY, bold: true }),
    new TextRun({ text: event + (detail ? ". " + detail : "."), font: FONT, size: BODY }),
  ],
  spacing: { before: 60, after: 60 },
});

const skillRow = (cat, items) => new Paragraph({
  children: [
    new TextRun({ text: cat + ": ", font: FONT, size: BODY, bold: true }),
    new TextRun({ text: items, font: FONT, size: BODY }),
  ],
  spacing: { before: 0, after: 60 },
});

function pubEntry(pos, authors, title, venue, link) {
  const idx = authors.indexOf(ME);
  const authorRuns = [];
  if (idx === -1) {
    authorRuns.push(new TextRun({ text: authors, font: FONT, size: BODY }));
  } else {
    if (idx > 0) authorRuns.push(new TextRun({ text: authors.slice(0, idx), font: FONT, size: BODY }));
    authorRuns.push(new TextRun({ text: ME, font: FONT, size: BODY, bold: true }));
    authorRuns.push(new TextRun({ text: authors.slice(idx + ME.length), font: FONT, size: BODY }));
  }
  const children = [
    ...authorRuns,
    new TextRun({ text: " (" + pos + "). ", font: FONT, size: BODY }),
    new TextRun({ text: title, font: FONT, size: BODY, italics: true }),
    new TextRun({ text: ". " + venue + ".", font: FONT, size: BODY }),
  ];
  if (link) children.push(new TextRun({ text: " " + link, font: FONT, size: BODY }));
  return new Paragraph({ children, spacing: { before: 60, after: 60 } });
}

function projectBlock(title, period, meta, bullets) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: title, font: FONT, size: BODY, bold: true }),
        new TextRun({ text: "\t" + period, font: FONT, size: BODY }),
      ],
      tabStops: [{ type: TabStopType.RIGHT, position: CWIDTH }],
      spacing: { before: 120, after: 0 },
    }),
    ...(meta ? [new Paragraph({
      children: [new TextRun({ text: meta, font: FONT, size: BODY, italics: true })],
      spacing: { before: 0, after: 40 },
    })] : []),
    ...bullets.map(bullet),
  ];
}

// ── entry lookup ─────────────────────────────────────────────────────────────
// Variants reference entries by key. An unknown key fails the build rather than
// silently dropping a section.

const byKey = (list, what) => {
  const map = new Map(list.map(e => [e.key, e]));
  return key => {
    const hit = map.get(key);
    if (!hit) throw new Error(`unknown ${what} key: "${key}"`);
    return hit;
  };
};

const experienceByKey  = byKey(cv.experience, 'experience');
const projectByKey     = byKey(cv.projects, 'project');
const publicationByKey = byKey(cv.publications, 'publication');

// ── shared content blocks ────────────────────────────────────────────────────

const PUB_GROUPS = [
  { types: ['Journal Paper'],                 label: 'Journal Papers' },
  { types: ['Journal Paper (Under Review)'], label: 'Journal Papers (Under Review)' },
  { types: ['Conference Paper', 'Conference Paper (Accepted)'], label: 'Conference Papers' },
  { types: ['Preprint'], label: 'Preprints' },
  { types: ['Dataset'], label: 'Datasets' },
];

const SKILL_LABELS = {
  ml_frameworks:         'ML Frameworks',
  computer_vision_audio: 'Computer Vision and Audio',
  mlops_infrastructure:  'MLOps',
  languages:             'Languages',
  research_tools:        'Research Tools',
};

const pubVenue = p => p.indexed ? `${p.venue}, ${p.indexed}, ${p.year}` : `${p.venue}, ${p.year}`;
const pubPos   = p => `${p.author_position} author`;

// A project's meta line reads role, then whoever funded or hosted it.
// organization is skipped where role already names the same body.
const projectMeta = p => [p.role, p.funding, p.institution].filter(Boolean).join(' · ');

const header = subtitle => [
  new Paragraph({
    children: [new TextRun({ text: ME, font: FONT, size: NAME, bold: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 60 },
  }),
  new Paragraph({
    children: [new TextRun({ text: subtitle, font: FONT, size: BODY, italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({
      text: `${cv.personal.email}  ·  github.com/Liamours  ·  linkedin.com/in/rifqiazhad0210  ·  ${cv.personal.location}`,
      font: FONT, size: BODY,
    })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 160 },
  }),
];

const labelled = (label, text) => new Paragraph({
  children: [
    new TextRun({ text: label + ': ', font: FONT, size: BODY, bold: true }),
    new TextRun({ text, font: FONT, size: BODY }),
  ],
  spacing: { before: 0, after: 60 },
});

const EDUCATION = [
  sectionHeader("Education"),
  ...cv.education.flatMap(e => [
    roleLine(e.degree, e.period),
    para(`${e.institution}  ·  GPA ${e.gpa}`),
    ...(e.thesis ? [labelled('Thesis', e.thesis)] : []),
    ...(e.courses || []).map(c => labelled(c.group, c.items.join(', '))),
  ]),
];

const SKILLS = [
  sectionHeader("Skills"),
  ...Object.entries(cv.skills).map(([k, items]) =>
    skillRow(SKILL_LABELS[k] || k, items.join(', '))
  ),
];

const AWARDS = [
  sectionHeader("Awards"),
  ...cv.awards.map(a => award(a.title, a.event, a.note || null)),
];

const LANGUAGES_CERTS = [
  sectionHeader("Languages"),
  ...cv.languages.flatMap(l => [
    para(`${l.language} – ${l.proficiency}`),
    ...(l.tests || []).length ? [new Paragraph({
      children: [new TextRun({
        text: (l.tests || []).map(t => `${t.name.replace(/.*\((.+)\)/, '$1')}: ${t.score}`).join('  ·  ')
          + '  ·  Telkom University Language Center',
        font: FONT, size: SMALL,
      })],
      spacing: { before: 0, after: 60 },
    })] : [],
  ]),
  sectionHeader("Certifications"),
  ...cv.certifications.map(c =>
    para(`${c.title}  ·  ${c.issuer}  ·  ${c.issued}${c.expires ? ' – ' + c.expires : ''}`)
  ),
];

// ── per-variant sections ─────────────────────────────────────────────────────

const SECTIONS = {
  summary: v => [para(v.summary)],

  skills: () => SKILLS,

  education: () => EDUCATION,

  awards: () => AWARDS,

  languages_certs: () => LANGUAGES_CERTS,

  experience: v => [
    sectionHeader(v.experience_heading || 'Experience'),
    ...v.experience.map(experienceByKey).flatMap(e => [
      roleLine(e.role, e.period),
      orgLine(e.organization),
      ...e.highlights.map(bullet),
    ]),
  ],

  projects: v => [
    sectionHeader(v.projects_heading || 'Projects'),
    ...v.projects.map(projectByKey).flatMap(p =>
      projectBlock(p.title, p.period, projectMeta(p), p.highlights)
    ),
  ],

  // 'all' renders the full list grouped by type. An array of keys renders a
  // condensed flat list in the order given.
  publications: v => {
    if (v.publications === 'all') {
      return [
        sectionHeader('Publications'),
        ...PUB_GROUPS.flatMap(({ types, label }) => {
          const group = cv.publications.filter(p => types.includes(p.type));
          if (!group.length) return [];
          return [
            pubSubHeader(label),
            ...group.map(p => pubEntry(pubPos(p), p.authors, p.title, pubVenue(p), p.link || null)),
          ];
        }),
      ];
    }
    return [
      sectionHeader('Publications'),
      ...v.publications.map(publicationByKey).map(p =>
        pubEntry(pubPos(p), p.authors, p.title, pubVenue(p), p.link || null)
      ),
    ];
  },
};

function buildVariant(v) {
  const children = [...header(v.subtitle)];
  for (const name of v.order) {
    const section = SECTIONS[name];
    if (!section) throw new Error(`unknown section "${name}" in variant "${v.key}"`);
    children.push(...section(v));
  }
  return new Document({
    numbering: NUMBERING,
    sections: [{ properties: { page: PAGE }, children }],
  });
}

// ── numbering and page ───────────────────────────────────────────────────────

const NUMBERING = {
  config: [{
    reference: "bullets",
    levels: [{
      level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: {
        paragraph: { indent: { left: 360, hanging: 180 }, spacing: { before: 0, after: 40 } },
        run: { font: FONT, size: BODY },
      },
    }],
  }],
};

const PAGE = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
};

// ── build all ────────────────────────────────────────────────────────────────

async function buildAll() {
  const outDir = path.join(__dirname, 'output');
  for (const v of cv.variants) {
    const buf = await Packer.toBuffer(buildVariant(v));
    const out = path.join(outDir, v.file);
    fs.writeFileSync(out, buf);
    console.log(`${v.label} -> output/${v.file} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
}

buildAll().catch(err => {
  console.error(err.message);
  process.exit(1);
});
