// Builds three role-targeted CV variants from the same content.
// Usage: node build-cv-variants.js
// Output: rifqi-cv-industry.docx | rifqi-cv-research.docx | rifqi-cv-ds.docx

const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, BorderStyle, TabStopType, LevelFormat
} = require('./node_modules/docx');
const fs = require('fs');

const FONT   = "Calibri";
const BODY   = 20;
const SMALL  = 18;
const SEC    = 22;
const SUBSEC = 20;
const NAME   = 36;
const CWIDTH = 9746;
const ME = "M. Rifqi Dzaky Azhad";

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

function pubEntry(type, pos, authors, title, venue, link) {
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

function project(title, period, role, bullets) {
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
      children: [new TextRun({ text: role, font: FONT, size: BODY, italics: true })],
      spacing: { before: 0, after: 40 },
    }),
    ...bullets.map(b => bullet(b)),
  ];
}

// ── shared content blocks ────────────────────────────────────────────────────

const HEADER = (subtitle) => [
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
      text: "rifqiazhad21@gmail.com  ·  github.com/Liamours  ·  linkedin.com/in/rifqiazhad0210  ·  Bandung, Indonesia",
      font: FONT, size: BODY,
    })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 160 },
  }),
];

const EDUCATION = [
  sectionHeader("Education"),
  roleLine("S1 Informatika (Bachelor of Informatics)", "May 2023 – Expected May 2027"),
  para("Telkom University  ·  GPA 4.0/4.0"),
];

const SKILLS = [
  sectionHeader("Skills"),
  skillRow("ML Frameworks", "PyTorch, TensorFlow, Transformers, nnU-Net v2, XGBoost, LightGBM, BiomedCLIP, VideoMAE, Whisper"),
  skillRow("Computer Vision and Audio", "OpenCV, MediaPipe, librosa, Scikit-learn"),
  skillRow("MLOps", "Docker, FastAPI, Git, pytest, Conda"),
  skillRow("Languages", "Python, C++, Go"),
  skillRow("Research Tools", "Zotero, Parsifal, LaTeX"),
];

const PUBLICATIONS = [
  sectionHeader("Publications"),
  pubSubHeader("Journal Papers"),
  pubEntry("Journal Paper (Accepted, In Press)", "2nd author",
    "Ema Rachmawati, M. Rifqi Dzaky Azhad et al.",
    "Deep Learning-Based Segmentation of Whole-Body Bone Scan Images Using nnU-Netv2",
    "IJIES-INASS, 2025", null),
  pubSubHeader("Conference Papers"),
  pubEntry("Conference Paper", "1st author",
    "M. Rifqi Dzaky Azhad, Rafiq Labib, Athila Ramdani Saputra, Edward Ferdian et al.",
    "Deep Learning for Bird Identification Using Sound: Enhancing Avian Monitoring and Conservation in Indonesia and Malaysia",
    "ICITACEE 2025, IEEE Xplore", "https://ieeexplore.ieee.org/document/11233192"),
  pubSubHeader("Preprints"),
  pubEntry("Preprint (Under Review)", "2nd author",
    "Ema Rachmawati, M. Rifqi Dzaky Azhad, Ida Bagus Indrabudhi Kusuma, Yolanda Rahma Chrysti, Nasywa Kamila",
    "From Segmentation to Biomarker Quantification: A Deep Learning Framework for Metastases Detection in Bone Scans",
    "SSRN, 2025", "https://ssrn.com/abstract=5187453"),
  pubSubHeader("Datasets"),
  pubEntry("Dataset", "2nd author", "Ema Rachmawati, M. Rifqi Dzaky Azhad",
    "Whole-Body Bone Scintigraphy Segmentation Masks",
    "Zenodo, 2025", "https://zenodo.org/records/20342310"),
];

const AWARDS = [
  sectionHeader("Awards"),
  award("Best Paper Award", "ADIKARA 2025, School of Computing, Telkom University", "Diabetic mellitus detection from retina fundus images."),
  award("Best Proposal Honorable Mention", "ADIKARA 2024, School of Computing, Telkom University", "Diabetes mellitus detection from tongue images using MobileNet and ViT."),
  award("National Qualifier, D3/D4/S1 Category", "Samsung Solve for Tomorrow 2025", null),
  award("Top 25", "Data Slayer 2.0 Data Science Competition, 2025", null),
  award("3rd Place", "CCI Summit Kaggle Data Research Competition, October 2024", null),
];

const LANGUAGES_CERTS = [
  sectionHeader("Languages"),
  para("English – Professional working proficiency"),
  new Paragraph({
    children: [new TextRun({ text: "ECCT: 3.75/4.0  ·  EPrT: 577/677  ·  Telkom University Language Center", font: FONT, size: SMALL })],
    spacing: { before: 0, after: 60 },
  }),
  para("Indonesian – Native"),
  sectionHeader("Certifications"),
  para("Microsoft Azure AI Fundamentals  ·  Microsoft  ·  March 2026"),
  para("Python Lanjutan Gold  ·  Skilvul  ·  July 2024 – July 2026"),
];

// ── numbering config ─────────────────────────────────────────────────────────

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

// ── VARIANT 1: INDUSTRY AI ENGINEER ─────────────────────────────────────────
// Order: Skills → Experience (TransTrack first) → Publications (condensed) → Projects → Awards → Education

function buildIndustry() {
  return new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: PAGE },
      children: [
        ...HEADER("AI Engineer / ML Engineer"),
        para("Medical imaging ML researcher at Telkom University, GPA 4.0/4.0. Production ML system deployed on commercial mining fleet dashcams: Macro F1 0.78, 11% above the existing model. Bone scan pipeline AUC 0.956, above two commercial clinical systems. First-authored IEEE Xplore paper."),

        // Skills early
        ...SKILLS,

        // Experience — TransTrack first
        sectionHeader("Experience"),
        roleLine("AI Engineer Intern", "March 2025 – Present"),
        orgLine("Bandung Techno Park · Trans Track"),
        bullet("Designed a facial landmark sequence model from scratch on real dashcam footage from active mining fleet drivers at BIB, PAMA MTBU, and SIS. Macro F1 0.78, an 11% gain over the company's production model."),
        bullet("Deployed a 3-service async cloud-review API with risk escalation rules, verified against the live company MDVR server."),

        roleLine("Research Assistant, Multi-Task CXR Foundation Model", "2025 – Present"),
        orgLine("Telkom University"),
        bullet("Developing a 20+ disease CXR pathology classifier with hierarchical classification and fallback uncertainty estimation."),
        bullet("Deployed pathology classifier and organ segmentation as shared microservices for the team's web and desktop apps."),

        roleLine("Research Assistant, Whole-Body Bone Scintigraphy", "August 2024 – February 2025"),
        orgLine("Telkom University"),
        bullet("Built hotspot detection with YOLOv8 (mAP@0.5 = 0.599) and skeletal segmentation with nnU-Net v2 across 12 regions (IoU 0.879). Patient-level AUC 0.956, surpassing EXINI and BONENAVI."),

        roleLine("Research Assistant, Bird Sound Identification", "November 2024 – December 2025"),
        orgLine("Telkom University"),
        bullet("Fine-tuned BirdNET v2.4 on 12,511 recordings across 219 species. Macro F1 improved 44.1%. Published at ICITACEE 2025 (IEEE Xplore) as first author."),

        roleLine("Data Scientist Intern", "April 2025 – June 2025"),
        orgLine("HUMIC Engineering"),
        bullet("Screened 212+ papers with AI-assisted triage, applying PRISMA quality assessment to produce a structured synthesis."),

        roleLine("Study Group Coordinator", "June 2025 – February 2026"),
        orgLine("AI Lab, Telkom University"),
        bullet("Recruited, taught, and evaluated 29 students. Supervised 15 project groups from proposal to final demonstration."),

        // Projects
        sectionHeader("Selected Projects"),
        ...project("Bone Metastasis Diagnosis Framework", "August 2024 – February 2025",
          "Lead Coder · Ministry of Higher Education RI", [
            "Hotspot detection YOLOv8 mAP@0.5 = 0.599. Segmentation nnU-Net v2 IoU 0.879. Patient AUC 0.956, above EXINI and BONENAVI.",
          ]),
        ...project("Multimodal Deepfake Detection", "2025 – Present", "Research Lead · AI Lab", [
          "Intra-dataset F1 0.94. Cross-dataset F1 0.60 after domain-adversarial training on 223,445 segments.",
        ]),

        // Publications condensed
        sectionHeader("Publications"),
        pubEntry("Journal Paper (Accepted, In Press)", "2nd", "Ema Rachmawati, M. Rifqi Dzaky Azhad et al.",
          "Deep Learning-Based Segmentation of Whole-Body Bone Scan Images Using nnU-Netv2", "IJIES-INASS, 2025", null),
        pubEntry("Conference Paper", "1st", "M. Rifqi Dzaky Azhad et al.",
          "Deep Learning for Bird Identification Using Sound", "ICITACEE 2025, IEEE Xplore",
          "https://ieeexplore.ieee.org/document/11233192"),

        ...AWARDS,
        ...EDUCATION,
        ...LANGUAGES_CERTS,
      ],
    }],
  });
}

// ── VARIANT 2: RESEARCH / ACADEMIC ──────────────────────────────────────────
// Order: Education → Research Experience → Publications (full) → Projects → Awards → Skills

function buildResearch() {
  return new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: PAGE },
      children: [
        ...HEADER("Deep Learning Researcher · Medical Imaging"),
        para("Medical imaging ML researcher at Telkom University, GPA 4.0/4.0. Research focus: automated diagnosis from bone scintigraphy and chest X-ray. First-authored IEEE Xplore paper. Bone scan pipeline AUC 0.956, above two commercial clinical systems. Preprint under journal review."),

        // Education second
        ...EDUCATION,

        sectionHeader("Research Experience"),
        roleLine("Research Assistant, Multi-Task CXR Foundation Model", "2025 – Present"),
        orgLine("Telkom University"),
        bullet("Developing a 20+ disease CXR pathology classifier with hierarchical classification and fallback uncertainty estimation, aligned to Indonesian healthcare organization disease standards."),
        bullet("Deployed pathology classifier and organ segmentation as shared microservices for the team's web and desktop apps."),

        roleLine("Research Assistant, Whole-Body Bone Scintigraphy", "August 2024 – February 2025"),
        orgLine("Telkom University"),
        bullet("Annotated 600+ bone scan images supervised by nuclear medicine physicians at Dr. Hasan Sadikin Hospital, Universitas Padjadjaran."),
        bullet("Built hotspot detection with YOLOv8 (mAP@0.5 = 0.599) and skeletal segmentation with nnU-Net v2 across 12 regions (IoU 0.879). Patient-level AUC 0.956, surpassing EXINI and BONENAVI."),

        roleLine("Research Assistant, Bird Sound Identification", "November 2024 – December 2025"),
        orgLine("Telkom University · Universiti Malaysia Sarawak"),
        bullet("Fine-tuned BirdNET v2.4 on 12,511 recordings across 219 endemic and endangered species. Macro F1 improved 44.1% over baseline."),
        bullet("First-authored a conference paper, published at ICITACEE 2025 (IEEE Xplore). Field-validated at Bandung Zoo and Malaysia National Zoo."),

        roleLine("Data Scientist Intern", "April 2025 – June 2025"),
        orgLine("HUMIC Engineering"),
        bullet("Screened 212+ papers using Zotero and Parsifal, applying PRISMA quality assessment to produce a structured synthesis mapping publication trends by year."),

        roleLine("Study Group Coordinator", "June 2025 – February 2026"),
        orgLine("AI Lab, Telkom University"),
        bullet("Recruited, taught, and evaluated 29 students. Supervised 15 project groups from proposal to final demonstration."),

        roleLine("AI Engineer Intern", "March 2025 – Present"),
        orgLine("Bandung Techno Park · Trans Track"),
        bullet("Deployed fatigue detection model on real mining fleet dashcams. Macro F1 0.78, 11% gain over production model."),

        // Full publications
        ...PUBLICATIONS,

        sectionHeader("Selected Projects"),
        ...project("Bone Metastasis Diagnosis Framework", "August 2024 – February 2025",
          "Lead Coder · Ministry of Higher Education RI", [
            "Hotspot detection with YOLOv8: mAP@0.5 = 0.599. Skeletal segmentation with nnU-Net v2 across 12 anatomical regions: IoU 0.879.",
            "Patient-level AUC 0.956 with XGBoost and LightGBM, surpassing EXINI (0.83–0.88) and BONENAVI (0.84–0.89).",
          ]),
        ...project("Multimodal Deepfake Detection", "2025 – Present", "Research Lead · AI Lab", [
          "Intra-dataset F1 0.94. Cross-dataset F1 0.60 after domain-adversarial training on 223,445 segments.",
        ]),

        ...AWARDS,
        ...SKILLS,
        ...LANGUAGES_CERTS,
      ],
    }],
  });
}

// ── VARIANT 3: DATA SCIENTIST ────────────────────────────────────────────────
// Order: Summary → Skills → Experience (HUMIC + CCI Kaggle prominent) → Publications → Projects → Awards → Education

function buildDS() {
  return new Document({
    numbering: NUMBERING,
    sections: [{
      properties: { page: PAGE },
      children: [
        ...HEADER("Data Scientist / ML Engineer"),
        para("ML engineer with research and internship experience in data analysis, model training, and production deployment. Systematic literature review of 212+ papers at HUMIC Engineering. Bone scan pipeline AUC 0.956, above two commercial clinical systems. GPA 4.0/4.0, Telkom University."),

        ...SKILLS,

        sectionHeader("Experience"),
        roleLine("Data Scientist Intern", "April 2025 – June 2025"),
        orgLine("HUMIC Engineering"),
        bullet("Screened 212+ papers using Zotero and Parsifal with AI-assisted triage, applying PRISMA-aligned quality assessment and structured data extraction."),
        bullet("Produced a synthesis mapping publication trends by year across the full reviewed corpus."),

        roleLine("AI Engineer Intern", "March 2025 – Present"),
        orgLine("Bandung Techno Park · Trans Track"),
        bullet("Designed a fatigue detection model on real mining fleet dashcam footage. Macro F1 0.78, 11% above the production model."),
        bullet("Deployed a 3-service async cloud-review API with risk escalation rules, verified against the live company MDVR server."),

        roleLine("Research Assistant, Whole-Body Bone Scintigraphy", "August 2024 – February 2025"),
        orgLine("Telkom University"),
        bullet("Built hotspot detection (YOLOv8, mAP@0.5 = 0.599) and skeletal segmentation (nnU-Net v2, IoU 0.879) pipeline. Patient-level AUC 0.956, above EXINI and BONENAVI."),

        roleLine("Research Assistant, Bird Sound Identification", "November 2024 – December 2025"),
        orgLine("Telkom University"),
        bullet("Fine-tuned BirdNET v2.4 on 12,511 recordings. Macro F1 improved 44.1%. Published at ICITACEE 2025 (IEEE Xplore) as first author."),

        roleLine("Research Assistant, Multi-Task CXR Foundation Model", "2025 – Present"),
        orgLine("Telkom University"),
        bullet("Developing a 20+ disease CXR pathology classifier with hierarchical classification aligned to Indonesian healthcare standards."),

        roleLine("Study Group Coordinator", "June 2025 – February 2026"),
        orgLine("AI Lab, Telkom University"),
        bullet("Recruited, taught, and evaluated 29 students. Supervised 15 project groups from proposal to demonstration."),

        roleLine("Member, Data Research Division", "August 2023 – May 2024"),
        orgLine("Central Computer Improvement (CCI), Telkom University"),
        bullet("Built a multi-class sentiment detection model achieving 70% accuracy comparing LSTM, GRU, BERT, LightGBM, XGBoost, and CatBoost on the same dataset."),

        sectionHeader("Selected Projects"),
        ...project("Bone Metastasis Diagnosis Framework", "August 2024 – February 2025",
          "Lead Coder · Ministry of Higher Education RI", [
            "Hotspot detection YOLOv8 mAP@0.5 = 0.599. Segmentation IoU 0.879. Patient AUC 0.956, above EXINI and BONENAVI.",
            "XGBoost and LightGBM patient-level classifiers. BSI correlated with clinical burden at r = 0.82.",
          ]),
        ...project("Sentiment Analysis: Multi-Class Text", "May 2024 – August 2024",
          "CCI Data Research Division", [
            "Compared LSTM, GRU, BERT, LightGBM, XGBoost, and CatBoost on the same dataset. 70% accuracy baseline.",
          ]),

        // Publications condensed
        sectionHeader("Publications"),
        pubEntry("Journal Paper (Accepted, In Press)", "2nd", "Ema Rachmawati, M. Rifqi Dzaky Azhad et al.",
          "Deep Learning-Based Segmentation of Whole-Body Bone Scan Images Using nnU-Netv2", "IJIES-INASS, 2025", null),
        pubEntry("Conference Paper", "1st", "M. Rifqi Dzaky Azhad et al.",
          "Deep Learning for Bird Identification Using Sound", "ICITACEE 2025, IEEE Xplore",
          "https://ieeexplore.ieee.org/document/11233192"),

        ...AWARDS,
        ...EDUCATION,
        ...LANGUAGES_CERTS,
      ],
    }],
  });
}

// ── build all three ──────────────────────────────────────────────────────────

async function buildAll() {
  const variants = [
    { name: 'rifqi-cv-industry.docx',  doc: buildIndustry(),  label: 'Industry AI Engineer' },
    { name: 'rifqi-cv-research.docx',  doc: buildResearch(),  label: 'Research / Academic' },
    { name: 'rifqi-cv-ds.docx',        doc: buildDS(),        label: 'Data Scientist' },
  ];

  for (const { name, doc, label } of variants) {
    const buf = await Packer.toBuffer(doc);
    fs.writeFileSync(name, buf);
    console.log(label + ' -> ' + name + ' (' + (buf.length / 1024).toFixed(1) + ' KB)');
  }
}

buildAll();
