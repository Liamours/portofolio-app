const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, BorderStyle, TabStopType, LevelFormat
} = require('./node_modules/docx');
const fs = require('fs');

// A4 with 0.75" margins
const FONT   = "Calibri";
const BODY   = 20;   // 10pt
const SMALL  = 18;   // 9pt
const SEC    = 22;   // 11pt section headers
const SUBSEC = 20;   // 10pt publication sub-headers
const NAME   = 36;   // 18pt
const CWIDTH = 9746; // content width DXA

const ME = "M. Rifqi Dzaky Azhad";

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

// Bold ME in author list
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

function award(title, event, detail) {
  const children = [
    new TextRun({ text: title + ". ", font: FONT, size: BODY, bold: true }),
    new TextRun({ text: event + (detail ? ". " + detail : "."), font: FONT, size: BODY }),
  ];
  return new Paragraph({ children, spacing: { before: 60, after: 60 } });
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

// ── document ────────────────────────────────────────────────────────────────

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
        children: [new TextRun({ text: ME, font: FONT, size: NAME, bold: true })],
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

      // ── SUMMARY ─────────────────────────────────────────────────────────
      sectionHeader("Summary"),
      para("Medical imaging ML researcher at Telkom University, GPA 4.0/4.0. Built a bone scan diagnostic pipeline achieving patient-level AUC 0.956, above EXINI and BONENAVI (two commercial systems in clinical use). First-authored an IEEE Xplore conference paper on bird species identification. One ML model running in production on commercial mining fleet dashcams."),

      // ── EXPERIENCE ──────────────────────────────────────────────────────
      sectionHeader("Experience"),

      roleLine("Research Assistant, Multi-Task CXR Foundation Model", "2025 – Present"),
      orgLine("Telkom University"),
      bullet("Developing a 20+ disease CXR pathology classifier with hierarchical classification and fallback uncertainty estimation, aligned to Indonesian healthcare organization disease standards."),
      bullet("Deployed pathology classifier and organ segmentation as shared microservices consumed by the team's web and desktop apps through a single API."),

      roleLine("AI Engineer Intern", "March 2025 – Present"),
      orgLine("Bandung Techno Park · Trans Track"),
      bullet("Designed a facial landmark sequence model from scratch on real dashcam footage from active mining fleet drivers at BIB, PAMA MTBU, and SIS. Macro F1 0.78, an 11% gain over the company's production model."),
      bullet("Deployed a 3-service async cloud-review API with night-hour and repeat-event risk escalation rules, verified against the live company MDVR server."),

      roleLine("Research Assistant, Bird Sound Identification", "November 2024 – December 2025"),
      orgLine("Telkom University"),
      bullet("Fine-tuned BirdNET v2.4 on 12,511 recordings across 219 endemic and endangered species in Indonesia, Malaysia, and Borneo. Macro F1 improved 44.1% over baseline on the endemic and endangered subset."),
      bullet("First-authored a conference paper on the research, published at ICITACEE 2025 (IEEE Xplore)."),

      roleLine("Data Scientist Intern", "April 2025 – June 2025"),
      orgLine("HUMIC Engineering"),
      bullet("Screened 212+ papers using Zotero and Parsifal with AI-assisted triage, applying PRISMA-aligned quality assessment and structured data extraction."),
      bullet("Produced a synthesis mapping publication trends by year, covering the full reviewed corpus."),

      roleLine("Research Assistant, Whole-Body Bone Scintigraphy", "August 2024 – February 2025"),
      orgLine("Telkom University"),
      bullet("Annotated 600+ whole-body bone scan images supervised by nuclear medicine physicians at Dr. Hasan Sadikin Hospital, Universitas Padjadjaran."),
      bullet("Built hotspot detection with YOLOv8 (mAP@0.5 = 0.599) and skeletal segmentation with nnU-Net v2 across 12 anatomical regions (IoU 0.879). Patient-level AUC 0.956, surpassing EXINI (0.83–0.88) and BONENAVI (0.84–0.89)."),

      roleLine("Study Group Coordinator", "June 2025 – February 2026"),
      orgLine("AI Lab, Telkom University"),
      bullet("Recruited, taught, and evaluated 29 students across weekly sessions and a final project."),
      bullet("Supervised 15 project groups from proposal to final demonstration, assessing technical execution and research quality at each stage."),

      roleLine("Staff, Research and Development", "January 2025 – January 2026"),
      orgLine("IEEE Student Branch, Telkom University"),
      bullet("Led branch team at YESIST12 Maker Fair. Placed Top 25 at Data Slayer 2.0 Data Science Competition."),
      bullet("Tracked and distributed competition opportunities across IEEE and BELMAWA programs to branch members."),

      roleLine("Study Group Member", "October 2024 – February 2025"),
      orgLine("AI Lab, Telkom University"),
      bullet("Led the plant disease classifier project: data cleaning, computer vision model training, and Streamlit deployment. Delivered in one semester."),
      bullet("Won 3rd place at CCI Summit Kaggle, first time as team lead. Awarded 2nd Best Final Project in the Study Group."),

      roleLine("Assistant Lecturer, Programming and Algorithms II", "February 2025 – June 2025"),
      orgLine("School of Informatics, Telkom University"),
      bullet("Reviewed and corrected 200+ quiz questions with course lecturers before release to students."),
      bullet("Supported 40+ students with real-time debugging during live programming assessments."),

      roleLine("Assistant Lecturer, Calculus I", "September 2024 – January 2025"),
      orgLine("School of Informatics, Telkom University"),
      bullet("Tutored 40+ students across weekly sessions. Graded four major assessments."),

      roleLine("Member, Data Research Division", "August 2023 – May 2024"),
      orgLine("Central Computer Improvement (CCI), Telkom University"),
      bullet("Built a multi-class sentiment detection model achieving 70% accuracy using LSTM, GRU, BERT, LightGBM, XGBoost, and CatBoost."),

      roleLine("Education Volunteer", "September 2024 – November 2024"),
      orgLine("Bebras – Telkom University"),
      bullet("Designed and delivered computational thinking activities for junior high students at SMP Negeri 1 Pacet."),

      roleLine("Registration Committee", "November 2025 – January 2026"),
      orgLine("Bebras – Telkom University Bureau"),
      bullet("Cleaned and prepared registration data for 1,000+ participants nationwide using Python scripts and Google Sheets."),

      roleLine("Paper Reviewer and Room Coordinator", "August 2024 – September 2024"),
      orgLine("ICoICT 2024"),
      bullet("Reviewed 4 conference papers and returned corrections ahead of deadline."),
      bullet("Managed AV setup for 4 sessions, assisted 22 presenters."),

      // ── PUBLICATIONS ────────────────────────────────────────────────────
      sectionHeader("Publications"),

      pubSubHeader("Journal Papers"),
      pubEntry(
        "Journal Paper (Accepted, In Press)", "2nd author",
        "Ema Rachmawati, M. Rifqi Dzaky Azhad et al.",
        "Deep Learning-Based Segmentation of Whole-Body Bone Scan Images Using nnU-Netv2",
        "International Journal of Intelligent Engineering and Systems (IJIES-INASS), 2025",
        null
      ),

      pubSubHeader("Conference Papers"),
      pubEntry(
        "Conference Paper", "1st author",
        "M. Rifqi Dzaky Azhad, Rafiq Labib, Athila Ramdani Saputra, Edward Ferdian et al.",
        "Deep Learning for Bird Identification Using Sound: Enhancing Avian Monitoring and Conservation in Indonesia and Malaysia",
        "ICITACEE 2025, IEEE Xplore",
        "https://ieeexplore.ieee.org/document/11233192"
      ),

      pubSubHeader("Preprints"),
      pubEntry(
        "Preprint (Under Review)", "2nd author",
        "Ema Rachmawati, M. Rifqi Dzaky Azhad, Ida Bagus Indrabudhi Kusuma, Yolanda Rahma Chrysti, Nasywa Kamila",
        "From Segmentation to Biomarker Quantification: A Deep Learning Framework for Metastases Detection in Bone Scans",
        "SSRN, 2025",
        "https://ssrn.com/abstract=5187453"
      ),

      pubSubHeader("Datasets"),
      pubEntry(
        "Dataset", "2nd author",
        "Ema Rachmawati, M. Rifqi Dzaky Azhad",
        "Whole-Body Bone Scintigraphy Segmentation Masks: Ground-Truth Annotations for Bone Area Segmentation",
        "Zenodo, 2025",
        "https://zenodo.org/records/20342310"
      ),

      // ── SELECTED PROJECTS ───────────────────────────────────────────────
      sectionHeader("Selected Projects"),

      ...project(
        "Bone Metastasis Diagnosis Framework",
        "August 2024 – February 2025",
        "Lead Coder · Ministry of Higher Education RI",
        [
          "Hotspot detection with YOLOv8: mAP@0.5 = 0.599. Skeletal segmentation with nnU-Net v2 across 12 anatomical regions: IoU 0.879.",
          "Patient-level AUC 0.956 with XGBoost and LightGBM, surpassing EXINI (0.83–0.88) and BONENAVI (0.84–0.89), both in clinical use at the time.",
        ]
      ),

      ...project(
        "Deep Learning for Bird Sound Identification",
        "November 2024 – August 2025",
        "Research Lead · Telkom University · Universiti Malaysia Sarawak",
        [
          "Fine-tuned BirdNET v2.4 with MixIT source separation on 12,511 recordings across 219 endemic and endangered species in Indonesia, Malaysia, and Borneo.",
          "Macro F1 improved 44.1% over baseline. Field-validated at Bandung Zoo and Malaysia National Zoo under uncontrolled conditions.",
        ]
      ),

      ...project(
        "Driver Fatigue Detection",
        "March 2025 – Present",
        "AI Engineer Intern · Bandung Techno Park × Trans Track",
        [
          "Macro F1 0.78 on real mining fleet dashcam footage, 11% above the company's existing production model.",
          "Deployed a 3-service Docker stack serving a live async cloud-review API with risk escalation for nighttime hours and repeat fatigue events.",
        ]
      ),

      ...project(
        "Multimodal Deepfake Detection",
        "2025 – Present",
        "Research Lead · AI Lab Focused Group",
        [
          "One model detecting both video and audio manipulation without knowing the manipulation type at inference time.",
          "Intra-dataset F1 0.94. Cross-dataset F1 0.60 after domain-adversarial training on 223,445 segments from PolyglotFake, FakeAVCeleb, HiDF, CelebDFv2, and FF++.",
        ]
      ),

      ...project(
        "Telplastina: Multi-Task CXR Analysis Platform",
        "2026 – Present",
        "Classification and Segmentation Module Lead",
        [
          "Led two of five AI modules within a clinical CXR platform: 20+ disease pathology classifier and organ segmentation.",
          "Both modules deployed as microservices for the team's web app and desktop app through shared API endpoints.",
        ]
      ),

      // ── AWARDS ──────────────────────────────────────────────────────────
      sectionHeader("Awards"),
      award("Best Paper Award", "ADIKARA 2025, School of Computing, Telkom University", "Diabetic mellitus detection from retina fundus images. Team lead."),
      award("Best Proposal Honorable Mention", "ADIKARA 2024, School of Computing, Telkom University", "Non-invasive diabetes mellitus detection from tongue images using MobileNet and ViT."),
      award("National Qualifier, D3/D4/S1 Category", "Samsung Solve for Tomorrow 2025, Samsung Indonesia", null),
      award("Top 25", "Data Slayer 2.0 Data Science Competition, Hima Data Science Telkom University Purwokerto, 2025", null),
      award("3rd Place", "CCI Summit Kaggle Data Research Competition, Telkom University, October 2024", null),

      // ── SKILLS ──────────────────────────────────────────────────────────
      sectionHeader("Skills"),
      skillRow("ML Frameworks", "PyTorch, TensorFlow, Transformers, nnU-Net v2, XGBoost, LightGBM, BiomedCLIP, VideoMAE, Whisper"),
      skillRow("Computer Vision and Audio", "OpenCV, MediaPipe, librosa, Scikit-learn"),
      skillRow("MLOps", "Docker, FastAPI, Git, pytest, Conda"),
      skillRow("Languages", "Python, C++, Go"),
      skillRow("Research Tools", "Zotero, Parsifal, LaTeX"),

      // ── EDUCATION ───────────────────────────────────────────────────────
      sectionHeader("Education"),
      roleLine("S1 Informatika (Bachelor of Informatics)", "May 2023 – Expected May 2027"),
      para("Telkom University  ·  GPA 4.0/4.0"),

      // ── LANGUAGES ───────────────────────────────────────────────────────
      sectionHeader("Languages"),
      para("English – Professional working proficiency"),
      new Paragraph({
        children: [new TextRun({ text: "ECCT: 3.75/4.0  ·  Telkom University Language Center, February 2024", font: FONT, size: SMALL })],
        spacing: { before: 0, after: 20 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "EPrT: 577/677  ·  Telkom University Language Center, August 2023", font: FONT, size: SMALL })],
        spacing: { before: 0, after: 60 },
      }),
      para("Indonesian – Native"),

      // ── CERTIFICATIONS ───────────────────────────────────────────────────
      sectionHeader("Certifications"),
      para("Microsoft Azure AI Fundamentals  ·  Microsoft  ·  March 2026"),
      para("Python Lanjutan Gold  ·  Skilvul  ·  July 2024 – July 2026"),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('rifqi-cv-260624.docx', buf);
  console.log('done: docs/rifqi-cv-260624.docx (' + (buf.length / 1024).toFixed(1) + ' KB)');
});
