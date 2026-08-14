const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, BorderStyle, TabStopType, LevelFormat
} = require('./node_modules/docx');
const fs = require('fs');
const cv = require('./cv-260624.json');

// A4 with 0.75" margins
const FONT   = "Calibri";
const BODY   = 20;   // 10pt
const SMALL  = 18;   // 9pt
const SEC    = 22;   // 11pt section headers
const SUBSEC = 20;   // 10pt publication sub-headers
const NAME   = 36;   // 18pt
const CWIDTH = 9746; // content width DXA

// ── helpers ─────────────────────────────────────────────────────────────────

function sectionHeader(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: SEC, bold: true, allCaps: true })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000", space: 2 } },
    spacing: { before: 200, after: 80 },
  });
}

function pubSubHeader(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: SUBSEC, bold: true, italics: true })],
    spacing: { before: 120, after: 40 },
  });
}

function roleLine(title, period) {
  return new Paragraph({
    children: [
      new TextRun({ text: title, font: FONT, size: BODY, bold: true }),
      new TextRun({ text: "\t" + period, font: FONT, size: BODY }),
    ],
    tabStops: [{ type: TabStopType.RIGHT, position: CWIDTH }],
    spacing: { before: 120, after: 0 },
  });
}

function orgLine(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: BODY, italics: true })],
    spacing: { before: 0, after: 40 },
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: FONT, size: BODY })],
  });
}

function para(text, size = BODY) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size })],
    spacing: { before: 0, after: 60 },
  });
}

function pubEntry(pos, authors, title, venue, link) {
  const idx = authors.indexOf(cv.personal.name);
  const authorRuns = [];
  if (idx === -1) {
    authorRuns.push(new TextRun({ text: authors, font: FONT, size: BODY }));
  } else {
    if (idx > 0) authorRuns.push(new TextRun({ text: authors.slice(0, idx), font: FONT, size: BODY }));
    authorRuns.push(new TextRun({ text: cv.personal.name, font: FONT, size: BODY, bold: true }));
    authorRuns.push(new TextRun({ text: authors.slice(idx + cv.personal.name.length), font: FONT, size: BODY }));
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

function projectBlock(title, period, roleStr, highlights) {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: title, font: FONT, size: BODY, bold: true }),
        new TextRun({ text: "\t" + period, font: FONT, size: BODY }),
      ],
      tabStops: [{ type: TabStopType.RIGHT, position: CWIDTH }],
      spacing: { before: 120, after: 0 },
    }),
    new Paragraph({
      children: [new TextRun({ text: roleStr, font: FONT, size: BODY, italics: true })],
      spacing: { before: 0, after: 40 },
    }),
    ...highlights.map(b => bullet(b)),
  ];
}

function awardLine(title, event, detail) {
  return new Paragraph({
    children: [
      new TextRun({ text: title + ". ", font: FONT, size: BODY, bold: true }),
      new TextRun({ text: event + (detail ? ". " + detail : "."), font: FONT, size: BODY }),
    ],
    spacing: { before: 60, after: 60 },
  });
}

function skillRow(category, items) {
  return new Paragraph({
    children: [
      new TextRun({ text: category + ": ", font: FONT, size: BODY, bold: true }),
      new TextRun({ text: items, font: FONT, size: BODY }),
    ],
    spacing: { before: 0, after: 60 },
  });
}

// ── data helpers ─────────────────────────────────────────────────────────────

const PUB_GROUPS = [
  { prefix: 'Journal Paper',  label: 'Journal Papers' },
  { prefix: 'Conference Paper', label: 'Conference Papers' },
  { prefix: 'Preprint',       label: 'Preprints' },
  { prefix: 'Dataset',        label: 'Datasets' },
  { prefix: 'e-Book',         label: 'e-Books' },
];

const SKILL_LABELS = {
  ml_frameworks:        'ML Frameworks',
  computer_vision_audio:'Computer Vision and Audio',
  mlops_infrastructure: 'MLOps',
  languages:            'Languages',
  research_tools:       'Research Tools',
};

function pubVenue(p) {
  return p.indexed ? `${p.venue}, ${p.indexed}, ${p.year}` : `${p.venue}, ${p.year}`;
}

function projectRole(p) {
  return [p.role, p.funding, p.organization, p.institution].filter(Boolean).join(' · ');
}

// ── document ─────────────────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "•",
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: { indent: { left: 360, hanging: 180 }, spacing: { before: 0, after: 40 } },
          run: { font: FONT, size: BODY },
        },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    children: [

      // ── HEADER ──────────────────────────────────────────────────────────
      new Paragraph({
        children: [new TextRun({ text: cv.personal.name, font: FONT, size: NAME, bold: true })],
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

      // ── SUMMARY ─────────────────────────────────────────────────────────
      sectionHeader("Summary"),
      para(cv.summary),

      // ── EXPERIENCE ──────────────────────────────────────────────────────
      sectionHeader("Experience"),
      ...cv.experience.flatMap(e => [
        roleLine(e.role, e.period),
        orgLine(e.organization),
        ...e.highlights.map(h => bullet(h)),
      ]),

      // ── PUBLICATIONS ────────────────────────────────────────────────────
      sectionHeader("Publications"),
      ...PUB_GROUPS.flatMap(({ prefix, label }) => {
        const group = cv.publications.filter(p => p.type.startsWith(prefix));
        if (!group.length) return [];
        return [
          pubSubHeader(label),
          ...group.map(p => pubEntry(
            p.author_position + ' author', p.authors, p.title, pubVenue(p), p.link || null
          )),
        ];
      }),

      // ── SELECTED PROJECTS ───────────────────────────────────────────────
      sectionHeader("Selected Projects"),
      ...cv.projects.flatMap(p => projectBlock(p.title, p.period, projectRole(p), p.highlights)),

      // ── AWARDS ──────────────────────────────────────────────────────────
      sectionHeader("Awards"),
      ...cv.awards.map(a => awardLine(a.title, a.event, a.note || null)),

      // ── SKILLS ──────────────────────────────────────────────────────────
      sectionHeader("Skills"),
      ...Object.entries(cv.skills).map(([k, items]) =>
        skillRow(SKILL_LABELS[k] || k, items.join(', '))
      ),

      // ── EDUCATION ───────────────────────────────────────────────────────
      sectionHeader("Education"),
      ...cv.education.flatMap(e => [
        roleLine(e.degree, e.period),
        para(`${e.institution}  ·  GPA ${e.gpa}`),
        ...(e.thesis ? [skillRow('Thesis', e.thesis)] : []),
        ...(e.courses || []).map(c => skillRow(c.group, c.items.join(', '))),
      ]),

      // ── LANGUAGES ───────────────────────────────────────────────────────
      sectionHeader("Languages"),
      ...cv.languages.flatMap(l => [
        para(`${l.language} – ${l.proficiency}`),
        ...(l.tests || []).map((t, i) => new Paragraph({
          children: [new TextRun({ text: `${t.name}: ${t.score}  ·  ${t.issuer}, ${t.date}`, font: FONT, size: SMALL })],
          spacing: { before: 0, after: i < (l.tests.length - 1) ? 20 : 60 },
        })),
      ]),

      // ── CERTIFICATIONS ───────────────────────────────────────────────────
      sectionHeader("Certifications"),
      ...cv.certifications.map(c =>
        para(`${c.title}  ·  ${c.issuer}  ·  ${c.issued}${c.expires ? ' – ' + c.expires : ''}`)
      ),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('output/rifqi-cv-260624.docx', buf);
  console.log('done: output/rifqi-cv-260624.docx (' + (buf.length / 1024).toFixed(1) + ' KB)');
});
