// Converts every DOCX in output/ to PDF through Word.
// Usage: node build-pdf.js
//
// Word is driven over COM from PowerShell, so this needs Windows with Word
// installed. Run it after the DOCX builders; verify.js treats a PDF older than
// its DOCX as a failure.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

if (process.platform !== 'win32') {
  console.error('build-pdf needs Windows with Word installed');
  process.exit(1);
}

const OUT = path.join(__dirname, 'output');
const cv = require('./cv-260624.json');

// Only what this pipeline builds. output/ also holds archived CV-Base-* files
// kept as a record, and regenerating those would churn frozen history.
const docs = [
  ...cv.variants.map(v => v.file),
  'rifqi-cv-260624.docx',
  'rifqi-cover-letter.docx',
].filter(f => fs.existsSync(path.join(OUT, f)));

if (!docs.length) {
  console.error('nothing to convert, run the builders first');
  process.exit(1);
}

// wdFormatPDF is 17. Documents open read-only so a file left open in Word does
// not block the run.
const script = `
$ErrorActionPreference = 'Stop'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  ${docs.map(f => {
    const inPath = path.join(OUT, f).replace(/'/g, "''");
    const outPath = path.join(OUT, f.replace(/\.docx$/, '.pdf')).replace(/'/g, "''");
    return `
  [string]$in = '${inPath}'
  [string]$out = '${outPath}'
  $doc = $word.Documents.Open($in, $false, $true)
  $doc.SaveAs([ref]$out, [ref]17)
  $doc.Close([ref]0)
  Write-Output '${f.replace(/\.docx$/, '.pdf')}'`;
  }).join('\n')}
} finally {
  $word.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
`;

const res = spawnSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', script], {
  encoding: 'utf8',
});

if (res.status !== 0) {
  console.error(res.stderr || res.stdout || 'Word conversion failed');
  process.exit(1);
}

res.stdout.trim().split(/\r?\n/).filter(Boolean).forEach(l => console.log(`${l.trim()} written`));
