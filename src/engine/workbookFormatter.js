export function formatWorkbook(data) {
  const { meta, sections } = data;

  const css = buildCSS();
  const body = buildBody(meta, sections);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(meta.title)} — ${esc(meta.subtitle)}</title>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Caveat:wght@400;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;
}

function buildCSS() {
  return `:root {
  --color-paper:            #FBF8F3;
  --color-paper-lined:      #F5F0E6;
  --color-chalkboard:       #2A4035;
  --color-chalkboard-deep:  #1F2E26;
  --color-slate-soft:       #3D5A4A;
  --color-white-bone:       #FEFEFD;
  --color-ink:              #1F2937;
  --color-ink-soft:         #4B5563;
  --color-chalk:            #F8FAFC;
  --color-chalk-dust:       #E5E7EB;
  --color-pencil-yellow:    #FCD34D;
  --color-eraser-pink:      #F9A8D4;
  --color-apple-red:        #DC2626;
  --color-chalk-blue:       #93C5FD;
  --color-post-it-yellow:   #FEF3C7;
  --color-post-it-pink:     #FCE7F3;
  --color-stamp-green:      #10B981;
  --color-stamp-violet:     #8B5CF6;
  --color-rule-line:        #C5D6E2;
  --color-margin-line:      #FCA5A5;
  --font-sans:              'Quicksand', sans-serif;
  --font-serif:             'Fraunces', serif;
  --font-hand:              'Caveat', cursive;
  --font-arabic:            'Noto Sans Arabic', 'Traditional Arabic', sans-serif;
  --font-size-xs:    0.75rem;
  --font-size-sm:    0.875rem;
  --font-size-base:  1rem;
  --font-size-lg:    1.125rem;
  --font-size-xl:    1.5rem;
  --font-size-2xl:   2rem;
  --font-size-3xl:   3rem;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink);
  background: var(--color-white-bone);
  line-height: 1.6;
}

.no-print-bar {
  background: var(--color-chalkboard);
  color: var(--color-chalk);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  font-weight: 500;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.no-print-bar button {
  background: var(--color-chalk);
  color: var(--color-chalkboard);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--font-size-sm);
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.no-print-bar button:hover { background: #F1F5F9; }
.no-print-hint {
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  color: var(--color-chalk-dust);
  max-width: 420px;
}

.workbook-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 48px 24px;
  text-align: center;
  background: var(--color-paper);
}
.workbook-cover-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}
.workbook-cover-title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-optical-sizing: auto;
  font-size: var(--font-size-3xl);
  color: var(--color-ink);
  margin-bottom: 8px;
}
.workbook-cover-subtitle {
  font-family: var(--font-sans);
  font-size: var(--font-size-xl);
  color: var(--color-ink-soft);
  margin-bottom: 32px;
}
.workbook-cover-meta {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink-soft);
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.workbook-cover-meta span {
  display: block;
}
.workbook-cover-meta .student-line {
  display: inline-block;
  min-width: 200px;
  border-bottom: 1px solid var(--color-rule-line);
  margin: 0 8px;
}

.workbook-body {
  background: var(--color-paper-lined);
  background-image:
    linear-gradient(transparent 31px, var(--color-rule-line) 31px, var(--color-rule-line) 32px, transparent 32px),
    linear-gradient(90deg, transparent 47px, var(--color-margin-line) 47px, var(--color-margin-line) 48px, transparent 48px);
  background-size: 100% 32px, 100% 100%;
  border-radius: 4px;
  border: 1px solid #E5E0D5;
  box-shadow: 0 4px 12px rgba(31,41,55,0.06);
  padding: 32px 24px 24px 64px;
  margin: 0 0 24px 0;
}
.workbook-body > * {
  line-height: 2rem;
}

.workbook-section-header {
  background: var(--color-chalkboard);
  color: var(--color-chalk);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--font-size-xl);
  padding: 12px 24px;
  margin: 24px 0 16px 0;
  border-radius: 6px;
  border-top: 4px solid var(--color-chalkboard-deep);
  border-bottom: 4px solid var(--color-chalkboard-deep);
  box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
}
.workbook-section-header .section-icon {
  margin-right: 10px;
}

.section-card {
  background: var(--color-paper);
  border: 1px solid #E8E2D6;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.7) inset, 0 2px 6px rgba(31,41,55,0.05);
}
.section-card h3 {
  font-family: var(--font-serif);
  font-weight: 600;
  font-optical-sizing: auto;
  font-size: var(--font-size-lg);
  color: var(--color-ink);
  margin-bottom: 8px;
}
.section-card p,
.section-card li {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink);
  line-height: 2rem;
}
.section-card ul,
.section-card ol {
  padding-left: 24px;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  line-height: 2rem;
}
.checklist-item .checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-chalkboard);
  border-radius: 3px;
  flex-shrink: 0;
  margin-top: 4px;
}

.objectives-list {
  list-style: none;
  padding-left: 0;
}
.objectives-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  line-height: 2rem;
}
.objectives-list .target-icon {
  color: var(--color-apple-red);
  font-size: var(--font-size-base);
  flex-shrink: 0;
}

.content-block-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  line-height: 2rem;
  margin-bottom: 12px;
}
.content-block-checkin {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-style: italic;
  color: var(--color-ink-soft);
  margin: 8px 0 12px 0;
  padding-left: 12px;
  border-left: 3px solid var(--color-pencil-yellow);
  line-height: 2rem;
}
.content-block-visual {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink-soft);
  border: 2px dashed var(--color-rule-line);
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  margin: 16px 0;
  line-height: 1.5;
}
.content-block-visual .visual-placeholder-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.vocab-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-family: var(--font-sans);
}
.vocab-table th {
  background: var(--color-chalkboard);
  color: var(--color-chalk);
  font-weight: 600;
  font-size: var(--font-size-sm);
  padding: 8px 12px;
  text-align: left;
}
.vocab-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-rule-line);
  font-size: var(--font-size-sm);
  vertical-align: top;
  line-height: 1.5;
}
.vocab-table tr:nth-child(even) td {
  background: rgba(245,240,230,0.5);
}
.vocab-table .arabic-term {
  font-family: var(--font-arabic);
  direction: rtl;
  font-size: var(--font-size-base);
}

.did-you-know {
  background: var(--color-post-it-yellow);
  padding: 16px 20px;
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink);
  border-radius: 2px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  margin: 20px 0;
  max-width: 600px;
  position: relative;
}
.did-you-know::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(2deg);
  width: 50px;
  height: 12px;
  background: rgba(252, 211, 77, 0.7);
  border-radius: 1px;
}
.did-you-know-title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--color-ink);
  margin-bottom: 6px;
}

.real-world-box {
  background: #F0F9F4;
  border: 1px solid #A7F3D0;
  border-left: 4px solid var(--color-stamp-green);
  border-radius: 8px;
  padding: 16px 20px;
  margin: 20px 0;
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink);
  line-height: 2rem;
}
.real-world-box-title {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: var(--font-size-lg);
  color: var(--color-ink);
  margin-bottom: 4px;
}

.cross-curricular-card {
  background: var(--color-post-it-pink);
  border: 1px solid #FBCFE8;
  border-left: 4px solid var(--color-eraser-pink);
  border-radius: 8px;
  padding: 14px 18px;
  margin: 12px 0;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  line-height: 2rem;
}

.character-building-card {
  background: #F5F3FF;
  border: 1px solid #DDD6FE;
  border-left: 4px solid var(--color-stamp-violet);
  border-radius: 8px;
  padding: 14px 18px;
  margin: 12px 0;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  line-height: 2rem;
}

.quiz-header {
  text-align: center;
  margin-bottom: 24px;
}
.quiz-header h2 {
  font-family: var(--font-serif);
  font-weight: 700;
  font-optical-sizing: auto;
  font-size: var(--font-size-2xl);
  color: var(--color-ink);
  margin-bottom: 8px;
}
.quiz-header .quiz-meta {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink-soft);
  margin-bottom: 12px;
}

.quiz-question {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #E8E2D6;
  border-radius: 8px;
  background: var(--color-white-bone);
}
.quiz-question-number {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: var(--font-size-base);
  color: var(--color-chalkboard);
  margin-bottom: 6px;
}
.quiz-question-text {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink);
  margin-bottom: 10px;
  line-height: 1.6;
}

.mc-option {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink);
  line-height: 1.6;
}
.mc-bubble {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-chalkboard);
  border-radius: 50%;
  flex-shrink: 0;
}

.fill-blank-wordbank {
  background: var(--color-paper-lined);
  border: 1px solid #E8E2D6;
  border-radius: 6px;
  padding: 10px 16px;
  margin-bottom: 12px;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink);
}
.fill-blank-sentence {
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  color: var(--color-ink);
  line-height: 2;
}
.fill-blank-line {
  display: inline-block;
  min-width: 120px;
  border-bottom: 1px solid var(--color-ink);
  margin: 0 6px;
}

.tf-options {
  display: flex;
  gap: 24px;
  margin-bottom: 8px;
}
.tf-option {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink);
}
.tf-bubble {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-chalkboard);
  border-radius: 50%;
  flex-shrink: 0;
}
.tf-explain {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink-soft);
  margin-top: 4px;
}

.ruled-lines {
  margin-top: 8px;
}
.ruled-line {
  height: 32px;
  border-bottom: 1px solid var(--color-rule-line);
}

.vocab-matching {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}
.vocab-matching-left,
.vocab-matching-right {
  flex: 1;
  min-width: 200px;
}
.vocab-match-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink);
  line-height: 1.6;
}
.vocab-match-blank {
  display: inline-block;
  width: 24px;
  border-bottom: 1px solid var(--color-ink);
  text-align: center;
}

.quiz-scenario-text {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 12px;
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink-soft);
  font-style: italic;
  line-height: 1.6;
}

.answer-key-header {
  background: #FEF2F2;
  border: 2px solid var(--color-apple-red);
  border-radius: 6px;
  padding: 12px 20px;
  margin-bottom: 20px;
  text-align: center;
}
.answer-key-header h2 {
  font-family: var(--font-serif);
  font-weight: 700;
  font-optical-sizing: auto;
  font-size: var(--font-size-xl);
  color: var(--color-apple-red);
  margin: 0;
}
.answer-key-note {
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  color: var(--color-ink-soft);
  margin-top: 4px;
}

.answer-key-item {
  padding: 10px 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--color-rule-line);
  font-family: var(--font-sans);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}
.answer-key-item .ak-number {
  font-weight: 700;
  color: var(--color-chalkboard);
}
.answer-key-item .ak-answer {
  color: var(--color-stamp-green);
  font-weight: 600;
}
.answer-key-item .ak-explanation {
  color: var(--color-ink-soft);
  font-size: var(--font-size-xs);
}

.workbook-footer {
  text-align: center;
  padding: 24px 0 16px 0;
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  color: var(--color-ink-soft);
  border-top: 1px solid var(--color-rule-line);
  margin-top: 40px;
}

.page-break { page-break-before: always; }
.keep-together { page-break-inside: avoid; }

@media print {
  @page {
    margin: 15mm;
    size: A4;
    @bottom-left {
      content: string(footer-left);
      font-family: 'Quicksand', sans-serif;
      font-size: 9pt;
      color: #4B5563;
    }
    @bottom-center {
      content: counter(page);
      font-family: 'Quicksand', sans-serif;
      font-size: 9pt;
      color: #4B5563;
    }
  }
  body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  .no-print { display: none !important; }
  .page-break { page-break-before: always; }
  .keep-together { page-break-inside: avoid; }
  .workbook-section-header {
    background: var(--color-chalkboard) !important;
    color: var(--color-chalk) !important;
    print-color-adjust: exact;
  }
  .workbook-ruled-line { border-bottom: 1px solid var(--color-rule-line) !important; }
  .workbook-cover { min-height: auto; page-break-after: always; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`;
}

function buildBody(meta, sections) {
  return `
<div class="no-print no-print-bar">
  <button onclick="window.print()">🖨 Download PDF / Print</button>
  <span class="no-print-hint">Tip: In the print dialog, select &quot;Save as PDF&quot; as the destination and turn off headers &amp; footers for the best result.</span>
</div>

${buildCoverPage(meta, sections)}
${buildSection(sections.priorKnowledge, '📋', renderPriorKnowledge)}
${buildSection(sections.objectives, '🎯', renderObjectives)}
${buildSection(sections.engage, '💡', renderEngage)}
${buildSection(sections.explore, '🔍', renderExplore)}
${buildSection(sections.explain, '📖', renderExplain)}
${buildSection(sections.elaborate, '🧩', renderElaborate)}
${buildSection(sections.summary, '✅', renderSummary)}

<div class="page-break"></div>
${buildSection(sections.quiz, '', renderQuiz)}

<div class="page-break"></div>
${renderAnswerKey(sections.quiz)}

<div class="workbook-footer">
  ${esc(meta.subject)} | ${esc(meta.title)} | ${esc(meta.grade)}
</div>`;
}

function buildCoverPage(meta, sections) {
  const pkItems = sections.priorKnowledge.items
    .map(item => `<li>${esc(item)}</li>`)
    .join('\n');

  return `
<div class="workbook-cover page-break">
  <div class="workbook-cover-icon">${meta.themeIcon}</div>
  <h1 class="workbook-cover-title">${esc(meta.title)}</h1>
  <p class="workbook-cover-subtitle">${esc(meta.subtitle)}</p>
  <div class="section-card" style="text-align:left; max-width:400px;">
    <h3>📋 ${esc(sections.priorKnowledge.title)}</h3>
    <ul style="list-style:none; padding-left:0;">
      ${pkItems}
    </ul>
  </div>
  <div class="workbook-cover-meta">
    <span>${esc(meta.studentLevel)} &middot; ${esc(meta.lessonLength)} Lesson</span>
    <span>Student Name: <span class="student-line"></span></span>
    <span>Date: <span class="student-line"></span></span>
  </div>
</div>`;
}

function buildSection(section, icon, renderFn) {
  const header = section.title
    ? `<div class="workbook-section-header"><span class="section-icon">${icon}</span>${esc(section.title)}</div>`
    : '';

  return `
${header}
<div class="workbook-body">
${renderFn(section)}
</div>`;
}

function renderPriorKnowledge(section) {
  return `
<div class="section-card keep-together">
  <div>${section.items.map(item => `
    <div class="checklist-item">
      <div class="checkbox"></div>
      <span>${esc(item)}</span>
    </div>`).join('')}</div>
</div>`;
}

function renderObjectives(section) {
  return `
<div class="section-card keep-together">
  <ol class="objectives-list">
    ${section.items.map(item => `
    <li><span class="target-icon">🎯</span> ${esc(item)}</li>`).join('')}
  </ol>
</div>`;
}

function renderEngage(section) {
  return `
<div class="section-card">
  <p>${esc(section.content)}</p>
</div>`;
}

function renderExplore(section) {
  return `
<div class="section-card">
  <p>${esc(section.content)}</p>
</div>`;
}

function renderExplain(section) {
  const blocks = section.contentBlocks.map(block => {
    switch (block.type) {
      case 'text':
        return `<p class="content-block-text">${esc(block.text)}</p>`;
      case 'check-in':
        return `<p class="content-block-checkin">${esc(block.checkInPrompt)}</p>`;
      case 'visual-placeholder':
        return `<div class="content-block-visual keep-together">
          <div class="visual-placeholder-icon">🖼</div>
          <p>${esc(block.visualDescription)}</p>
        </div>`;
      default:
        return '';
    }
  }).join('\n');

  const vocabRows = section.vocabulary.map(v => {
    const termCell = v.isArabic
      ? `<span class="arabic-term">${esc(v.term)}</span>`
      : esc(v.term);
    return `<tr>
      <td><strong>${termCell}</strong></td>
      <td>${esc(v.definition)}</td>
      <td>${esc(v.example)}</td>
    </tr>`;
  }).join('\n');

  const vocabTable = `
<div class="keep-together" style="margin: 20px 0;">
  <h3 style="font-family:var(--font-serif);font-weight:600;font-size:var(--font-size-lg);margin-bottom:8px;">📝 Key Vocabulary</h3>
  <table class="vocab-table">
    <thead><tr><th>Term</th><th>Definition</th><th>Example</th></tr></thead>
    <tbody>${vocabRows}</tbody>
  </table>
</div>`;

  const dykBlocks = section.didYouKnow.map(f => `
<div class="did-you-know keep-together">
  <div class="did-you-know-title">💡 ${esc(f.title)}</div>
  <p>${esc(f.fact)}</p>
</div>`).join('\n');

  const rwa = `
<div class="real-world-box keep-together">
  <div class="real-world-box-title">🌍 ${esc(section.realWorldApplication.title)}</div>
  <p>${esc(section.realWorldApplication.content)}</p>
</div>`;

  return `
${blocks}
${vocabTable}
${dykBlocks}
${rwa}`;
}

function renderElaborate(section) {
  let extra = '';

  if (section.crossCurricular) {
    extra += `
<div class="cross-curricular-card keep-together">
  <strong>🔗 Cross-Curricular Connection — ${esc(section.crossCurricular.subject)}</strong>
  <p>${esc(section.crossCurricular.connection)}</p>
</div>`;
  }

  if (section.characterBuilding) {
    extra += `
<div class="character-building-card keep-together">
  <strong>🤲 Character Building Takeaway</strong>
  <p>${esc(section.characterBuilding)}</p>
</div>`;
  }

  return `
<div class="section-card">
  <p>${esc(section.content)}</p>
</div>
${extra}`;
}

function renderSummary(section) {
  return `
<div class="section-card keep-together">
  <ol>
    ${section.items.map(item => `<li>${esc(item)}</li>`).join('')}
  </ol>
</div>`;
}

function renderQuiz(section) {
  const questions = (section.questions || []).map(q => {
    switch (q.type) {
      case 'vocabulary':       return renderVocabQuestion(q);
      case 'multipleChoice':   return renderMCQuestion(q);
      case 'trueFalse':        return renderTFQuestion(q);
      case 'fillBlank':        return renderFillBlankQuestion(q);
      case 'shortAnswer':      return renderShortAnswerQuestion(q);
      case 'diagramVisual':    return renderDiagramQuestion(q);
      case 'scenarioBased':    return renderScenarioQuestion(q);
      default:                 return '';
    }
  }).join('\n');

  return `
<div class="quiz-header">
  <h2>${esc(section.title)}</h2>
  <p class="quiz-meta">${esc(section.headerInfo)}</p>
</div>
${questions}`;
}

function renderVocabQuestion(q) {
  const left = (q.options || []).map(opt =>
    `<div class="vocab-match-row"><span class="vocab-match-blank"></span> ${esc(opt)}</div>`
  ).join('');

  const rightDefs = (q.options || []).map((_, i) =>
    `<div class="vocab-match-row">${String.fromCharCode(65 + i)}. [Definition for option ${String.fromCharCode(65 + i)}]</div>`
  ).join('');

  return `
<div class="quiz-question keep-together">
  <div class="quiz-question-number">Question ${q.number}</div>
  <p class="quiz-question-text">${esc(q.question)}</p>
  <div class="vocab-matching">
    <div class="vocab-matching-left">
      <strong>Terms</strong>
      ${left}
    </div>
    <div class="vocab-matching-right">
      <strong>Definitions</strong>
      ${rightDefs}
    </div>
  </div>
</div>`;
}

function renderMCQuestion(q) {
  const options = (q.options || []).map(opt =>
    `<div class="mc-option"><div class="mc-bubble"></div> ${esc(opt)}</div>`
  ).join('');

  return `
<div class="quiz-question keep-together">
  <div class="quiz-question-number">Question ${q.number}</div>
  <p class="quiz-question-text">${esc(q.question)}</p>
  ${options}
</div>`;
}

function renderTFQuestion(q) {
  return `
<div class="quiz-question keep-together">
  <div class="quiz-question-number">Question ${q.number}</div>
  <p class="quiz-question-text">${esc(q.question)}</p>
  <div class="tf-options">
    <div class="tf-option"><div class="tf-bubble"></div> True</div>
    <div class="tf-option"><div class="tf-bubble"></div> False</div>
  </div>
  <p class="tf-explain">Explain your answer:</p>
  <div class="ruled-lines"><div class="ruled-line"></div><div class="ruled-line"></div></div>
</div>`;
}

function renderFillBlankQuestion(q) {
  const wordbank = (q.wordBank || []).map(w => esc(w)).join(' &middot; ');

  return `
<div class="quiz-question keep-together">
  <div class="quiz-question-number">Question ${q.number}</div>
  <div class="fill-blank-wordbank"><strong>Word Bank:</strong> ${wordbank}</div>
  <p class="fill-blank-sentence">${esc(q.question)}</p>
</div>`;
}

function renderShortAnswerQuestion(q) {
  const lines = q.ruledLines || 5;
  const ruledHtml = Array.from({ length: lines }, () => '<div class="ruled-line"></div>').join('');

  return `
<div class="quiz-question keep-together">
  <div class="quiz-question-number">Question ${q.number}</div>
  <p class="quiz-question-text">${esc(q.question)}</p>
  <div class="ruled-lines">${ruledHtml}</div>
</div>`;
}

function renderDiagramQuestion(q) {
  const labels = (q.diagramLabels || []).map(l =>
    `<div class="vocab-match-row"><span class="vocab-match-blank"></span> ${esc(l)}</div>`
  ).join('');

  return `
<div class="quiz-question keep-together">
  <div class="quiz-question-number">Question ${q.number}</div>
  <p class="quiz-question-text">${esc(q.question)}</p>
  <div class="content-block-visual">
    <div class="visual-placeholder-icon">📐</div>
    <p>[Diagram: Refer to lesson visual for ${esc(q.question)}]</p>
  </div>
  <div class="vocab-matching-left">
    ${labels}
  </div>
</div>`;
}

function renderScenarioQuestion(q) {
  const lines = q.ruledLines || 6;
  const ruledHtml = Array.from({ length: lines }, () => '<div class="ruled-line"></div>').join('');

  return `
<div class="quiz-question keep-together">
  <div class="quiz-question-number">Question ${q.number}</div>
  <div class="quiz-scenario-text">${esc(q.scenario)}</div>
  <p class="quiz-question-text">${esc(q.question)}</p>
  <div class="ruled-lines">${ruledHtml}</div>
</div>`;
}

function renderAnswerKey(section) {
  const items = (section.answerKey || []).map(a => {
    const sample = a.sampleResponse
      ? `<div style="margin-top:4px;"><em>Sample strong response:</em> ${esc(a.sampleResponse)}</div>`
      : '';

    return `
<div class="answer-key-item">
  <span class="ak-number">Question ${a.number}:</span>
  <span class="ak-answer">${esc(String(a.correctAnswer))}</span>
  <div class="ak-explanation">${esc(a.explanation)}</div>
  ${sample}
</div>`;
  }).join('\n');

  return `
<div class="answer-key-header">
  <h2>ANSWER KEY — Teacher Use Only</h2>
  <p class="answer-key-note">Do not distribute this page to students.</p>
</div>
<div class="workbook-body">
${items}
</div>`;
}

function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
