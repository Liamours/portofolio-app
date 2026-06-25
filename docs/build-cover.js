// Cover letter base template — fills [PLACEHOLDERS] before sending
// Usage: node build-cover.js
// Then open rifqi-cover-letter.docx and replace all [BRACKETS]

const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('./node_modules/docx');
const fs = require('fs');

const FONT = "Calibri";
const BODY = 20;  // 10pt
const NAME = 28;  // 14pt

function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: BODY, ...opts })],
    spacing: { before: 0, after: 200 },
  });
}

function blank() {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: 0, after: 0 } });
}

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 inch
      },
    },
    children: [

      // Header
      new Paragraph({
        children: [new TextRun({ text: "M. RIFQI DZAKY AZHAD", font: FONT, size: NAME, bold: true })],
        spacing: { before: 0, after: 80 },
      }),
      new Paragraph({
        children: [new TextRun({
          text: "rifqiazhad21@gmail.com  ·  github.com/Liamours  ·  linkedin.com/in/rifqiazhad0210  ·  Bandung, Indonesia",
          font: FONT, size: BODY,
        })],
        spacing: { before: 0, after: 400 },
      }),

      // Date and recipient
      p("[DATE]"),
      blank(),
      p("[HIRING MANAGER NAME]"),
      p("[TITLE]"),
      p("[COMPANY NAME]"),
      p("[ADDRESS]"),
      blank(),

      // Salutation
      p("Dear [Mr./Ms. LAST NAME],"),
      blank(),

      // Opening
      p("[OPENING — one sentence on the position, one sentence on why this company specifically.]"),
      blank(),

      // Body 1 — swap per role (see cover-letter-template.md)
      p("As the lead coder on a Ministry of Higher Education-funded bone scan analysis project, I built a pipeline achieving patient-level AUC 0.956, above EXINI and BONENAVI, two commercial systems in clinical use at the time. That result came from annotating 600+ scans under supervision of nuclear medicine physicians at Dr. Hasan Sadikin Hospital, training nnU-Net v2 across 12 skeletal regions, and integrating the pipeline into Telplastina, a clinical web application. I am currently also developing a 20+ disease CXR pathology classifier with hierarchical classification and uncertainty estimation as part of a five-module clinical platform at Telkom University."),
      blank(),

      // Body 2 — swap per role
      p("As AI Engineer Intern at Bandung Techno Park and Trans Track, I designed a fatigue detection model trained on real mining fleet dashcam footage from three active companies. The system achieved Macro F1 0.78, an 11% gain over the model already running in production, and is deployed on live infrastructure via a 3-service async API. Building against the company's real production server from day one gave me direct experience with the difference between research code and deployed systems."),
      blank(),

      // Closing
      p("I am a third-year S1 Informatika student at Telkom University, GPA 4.0/4.0, graduating May 2027. I am available for [INTERNSHIP / PART-TIME / FULL-TIME] starting [DATE]. My portfolio is at portofolio-app-puce.vercel.app and my CV is attached."),
      blank(),

      // Sign-off
      p("Sincerely,"),
      blank(),
      blank(),
      new Paragraph({
        children: [new TextRun({ text: "M. Rifqi Dzaky Azhad", font: FONT, size: BODY, bold: true })],
        spacing: { before: 0, after: 60 },
      }),
      p("rifqiazhad21@gmail.com"),
      p("github.com/Liamours"),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('rifqi-cover-letter.docx', buf);
  console.log('done: docs/rifqi-cover-letter.docx (' + (buf.length / 1024).toFixed(1) + ' KB)');
});
