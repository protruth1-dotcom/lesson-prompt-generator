export function formatWorkbookV2(data, options = {}) {
  const { meta, sections, illustrations, vocabulary } = data;
  const { teacherMode = false } = options;

  const css = buildCSSV2();
  const body = buildBodyV2(meta, sections, illustrations, vocabulary, teacherMode);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(meta.title)} — ${esc(meta.subject)} Grade ${meta.grade}</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;1,400&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;
}

function buildCSSV2() {
  return `:root {
  --accent: #2D8B8B;
  --accent-dark: #1A5C5C;
  --ink: #1F2937;
  --ink-soft: #4B5563;
  --paper: #FCFCFA;
  --rule: #D1D5DB;
  --rule-light: #E5E7EB;
  --callout-bg: #F0F7F7;
  --callout-border: #B8D8D8;
  --scaffold-bg: #FAFAF8;
  --scaffold-border: #E5E0D5;
  --answer-key-bg: #FEF2F2;
  --answer-key-border: #FECACA;
  --font-heading: 'Nunito', sans-serif;
  --font-body: 'Source Serif 4', serif;
  --font-arabic: 'Amiri', serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  font-size: 11.5pt;
  color: var(--ink);
  background: white;
  line-height: 1.55;
}

/* PRINT BAR */
.no-print-bar {
  background: var(--accent-dark);
  color: white;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.no-print-bar button {
  background: white;
  color: var(--accent-dark);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.8rem;
  padding: 6px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.no-print-bar button:hover { background: #F1F5F9; }
.no-print-hint {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  opacity: 0.8;
  max-width: 420px;
}

/* COVER PAGE */
.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 48px 36px;
  text-align: center;
}
.cover-icon { font-size: 2.5rem; margin-bottom: 12px; }
.cover-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--ink);
  margin-bottom: 6px;
  line-height: 1.2;
}
.cover-subtitle {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 8px;
}
.cover-goal {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--ink-soft);
  font-style: italic;
  margin-bottom: 32px;
  max-width: 420px;
}
.cover-meta {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--ink-soft);
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cover-meta .line {
  display: inline-block;
  min-width: 180px;
  border-bottom: 1px solid var(--rule);
  margin: 0 8px;
}
.cover-standard {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  color: var(--ink-soft);
  margin-top: 16px;
}

/* SECTION HEADERS */
.section-header {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--ink);
  padding: 10px 0 6px 0;
  margin: 28px 0 12px 0;
  border-bottom: 2px solid var(--accent);
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-header .section-icon {
  font-size: 1.2rem;
}
.section-header .section-label {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.7rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* SECTION BODY */
.section-body {
  padding: 0 4px;
}

/* CONTENT BLOCKS */
.block-text {
  font-family: var(--font-body);
  font-size: 11.5pt;
  color: var(--ink);
  line-height: 1.55;
  margin-bottom: 10px;
}
.block-text strong { font-weight: 600; }

.block-callout {
  background: var(--callout-bg);
  border-left: 3px solid var(--callout-border);
  border-radius: 0 6px 6px 0;
  padding: 12px 16px;
  margin: 14px 0;
  font-family: var(--font-body);
  font-size: 11pt;
  color: var(--ink);
  line-height: 1.5;
}
.block-callout-label {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}

/* PRACTICE ITEMS */
.practice-item {
  margin-bottom: 14px;
  padding: 10px 12px;
  border: 1px solid var(--rule-light);
  border-radius: 6px;
  background: white;
}
.practice-item.scaffolded {
  background: var(--scaffold-bg);
  border-color: var(--scaffold-border);
}
.practice-number {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--accent-dark);
  margin-bottom: 4px;
}
.practice-prompt {
  font-family: var(--font-body);
  font-size: 11pt;
  color: var(--ink);
  line-height: 1.5;
  margin-bottom: 6px;
}
.practice-hint {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--ink-soft);
  font-style: italic;
  margin-bottom: 4px;
  padding-left: 8px;
  border-left: 2px solid var(--accent);
}

/* RULED LINES */
.ruled-lines { margin-top: 6px; }
.ruled-line {
  height: 28px;
  border-bottom: 1px dashed var(--rule-light);
}

/* MC OPTIONS */
.mc-option {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 3px;
  font-family: var(--font-body);
  font-size: 11pt;
  color: var(--ink);
}
.mc-bubble {
  width: 15px;
  height: 15px;
  border: 1.5px solid var(--accent-dark);
  border-radius: 50%;
  flex-shrink: 0;
}

/* TABLE */
.wb-table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-family: var(--font-body);
  font-size: 10.5pt;
}
.wb-table th {
  background: var(--accent-dark);
  color: white;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.75rem;
  padding: 6px 10px;
  text-align: left;
}
.wb-table td {
  padding: 6px 10px;
  border-bottom: 1px solid var(--rule);
}
.wb-table tr:nth-child(even) td { background: #FAFAFA; }

/* DIAGRAM */
.block-diagram {
  margin: 14px 0;
  text-align: center;
}
.block-diagram img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  border: 1px solid var(--rule-light);
}
.block-diagram .diagram-caption {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--ink-soft);
  margin-top: 6px;
  font-style: italic;
}
.block-diagram .diagram-placeholder {
  border: 2px dashed var(--rule);
  border-radius: 8px;
  padding: 40px 20px;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--ink-soft);
  text-align: center;
}

/* WRITING FRAME */
.writing-frame {
  border: 1px solid var(--rule);
  border-radius: 6px;
  margin: 12px 0;
  overflow: hidden;
}
.writing-frame-header {
  display: flex;
}
.writing-frame-header span {
  flex: 1;
  padding: 8px 12px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.75rem;
  color: white;
  background: var(--accent-dark);
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.2);
}
.writing-frame-header span:last-child { border-right: none; }
.writing-frame-body {
  display: flex;
  min-height: 100px;
}
.writing-frame-body .frame-cell {
  flex: 1;
  padding: 10px 12px;
  border-right: 1px solid var(--rule-light);
  font-family: var(--font-body);
  font-size: 10.5pt;
  color: var(--ink-soft);
  line-height: 1.8;
}
.writing-frame-body .frame-cell:last-child { border-right: none; }

/* ARABIC / RTL */
.rtl-block {
  direction: rtl;
  text-align: right;
  font-family: var(--font-arabic);
  font-size: 1.1rem;
  line-height: 2;
  color: var(--ink);
  margin: 14px 0;
  padding: 12px 16px;
  background: #FCFCFA;
  border-right: 3px solid var(--accent);
  border-radius: 0 6px 6px 0;
}
.rtl-translation {
  direction: ltr;
  text-align: left;
  font-family: var(--font-body);
  font-size: 11pt;
  color: var(--ink-soft);
  font-style: italic;
  margin-top: 8px;
}

/* QUIZ */
.quiz-header {
  text-align: center;
  margin-bottom: 20px;
}
.quiz-header h2 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--ink);
  margin-bottom: 4px;
}
.quiz-meta {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--ink-soft);
}

/* ANSWER KEY */
.answer-key-header {
  background: var(--answer-key-bg);
  border: 2px solid var(--answer-key-border);
  border-left: 6px solid #DC2626;
  border-radius: 0 6px 6px 0;
  padding: 12px 20px;
  margin-bottom: 20px;
  text-align: center;
}
.answer-key-header h2 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  color: #DC2626;
  margin: 0;
}
.answer-key-note {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  color: var(--ink-soft);
  margin-top: 4px;
}

.answer-key-item {
  padding: 10px 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--rule-light);
  font-family: var(--font-body);
  font-size: 10.5pt;
  line-height: 1.5;
}
.answer-key-item .ak-num {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--accent-dark);
}
.answer-key-item .ak-answer {
  color: #059669;
  font-family: var(--font-heading);
  font-weight: 600;
}
.answer-key-item .ak-look-for {
  color: var(--ink-soft);
  font-size: 0.75rem;
  margin-top: 3px;
  padding-left: 12px;
  border-left: 2px solid var(--rule);
}

/* FOOTER */
.wb-footer {
  text-align: center;
  padding: 24px 0 12px 0;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  color: var(--ink-soft);
  border-top: 1px solid var(--rule-light);
  margin-top: 36px;
}
.wb-footer .standard-code {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--accent);
}

/* UTILITY */
.page-break { page-break-before: always; }
.keep-together { page-break-inside: avoid; }

@media print {
  @page {
    margin: 0.85in 0.75in;
    size: letter;
    @bottom-center {
      content: counter(page);
      font-family: 'Nunito', sans-serif;
      font-size: 8pt;
      color: #9CA3AF;
    }
  }
  body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  .no-print { display: none !important; }
  .page-break { page-break-before: always; }
  .keep-together { page-break-inside: avoid; }
  .cover { min-height: auto; page-break-after: always; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

.frac {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  font-size: 0.85em;
  line-height: 1;
  margin: 0 1px;
}
.frac-num {
  padding: 0 3px;
  display: block;
  border-bottom: 1px solid currentColor;
}
.frac-den {
  padding: 0 3px;
  display: block;
}
.frac-whole {
  font-size: 1.05em;
  padding-right: 1px;
}`;
}

function buildBodyV2(meta, sections, illustrations, vocabulary, teacherMode) {
  const stdInfo = teacherMode
    ? `<span class="standard-code">${esc(meta.standardCode)}</span>`
    : '';

  return `
<div class="no-print no-print-bar">
  <button onclick="window.print()">Print / Download PDF</button>
  <span class="no-print-hint">Tip: Select &quot;Save as PDF&quot; as the destination and turn off headers &amp; footers.</span>
</div>

${buildCoverV2(meta)}

${renderConnect(sections.connect)}
${renderLearnModel(sections.learnModel, illustrations)}
${renderPracticeTogether(sections.practiceTogether)}
${renderOnYourOwn(sections.onYourOwn)}
${renderWrapUp(sections.wrapUp)}

${!teacherMode ? `
<div class="page-break"></div>
${renderQuiz(sections.quiz)}
` : ''}

${teacherMode ? `
<div class="page-break"></div>
${renderAnswerKey(sections.quiz, meta)}
<div class="wb-footer">
  ${stdInfo}
  ${esc(meta.subject)} &middot; Grade ${meta.grade} &middot; Teacher Answer Key
</div>
` : `
<div class="wb-footer">
  ${esc(meta.subject)} &middot; Grade ${meta.grade}
</div>
`}`;
}

function buildCoverV2(meta) {
  return `
<div class="cover page-break">
  <div class="cover-icon">${meta.themeIcon}</div>
  <h1 class="cover-title">${esc(meta.title)}</h1>
  <p class="cover-subtitle">${esc(meta.subject)} &middot; Grade ${meta.grade}</p>
  <p class="cover-goal">${esc(meta.learningGoal)}</p>
  <div class="cover-meta">
    <span>About ${meta.estimatedTime} minutes</span>
    <span>Student Name: <span class="line"></span></span>
    <span>Date: <span class="line"></span></span>
  </div>
  <div class="cover-standard">${esc(meta.standardCode)}</div>
</div>`;
}

function renderConnect(section) {
  if (!section) return '';
  return `
<div class="section-header"><span class="section-icon">🔗</span> Connect</div>
<div class="section-body">
${renderBlocks(section.blocks)}
</div>`;
}

function renderLearnModel(section, illustrations) {
  if (!section) return '';
  const sectionIlls = (illustrations || []).filter(i => i.placementSection === 'learnModel');
  const illBlocks = sectionIlls.map(renderIllustration).join('\n');

  return `
<div class="section-header"><span class="section-icon">📖</span> Learn <span class="section-label">I Do</span></div>
<div class="section-body">
${renderBlocks(section.blocks)}
${illBlocks}
</div>`;
}

function renderPracticeTogether(section) {
  if (!section) return '';
  const items = (section.items || []).map(item => renderPracticeItem(item, true)).join('\n');
  return `
<div class="section-header"><span class="section-icon">🤝</span> Practice Together <span class="section-label">We Do</span></div>
<div class="section-body">
${items}
</div>`;
}

function renderOnYourOwn(section) {
  if (!section) return '';
  const items = (section.items || []).map(item => renderPracticeItem(item, false)).join('\n');
  return `
<div class="section-header"><span class="section-icon">✏️</span> On Your Own <span class="section-label">You Do</span></div>
<div class="section-body">
${items}
</div>`;
}

function renderWrapUp(section) {
  if (!section) return '';
  return `
<div class="section-header"><span class="section-icon">💭</span> Wrap Up</div>
<div class="section-body">
${renderBlocks(section.blocks)}
</div>`;
}

function renderQuiz(section) {
  if (!section) return '';
  const questions = (section.questions || []).map(q => renderQuizItem(q)).join('\n');

  return `
<div class="quiz-header">
  <h2>${esc(section.title || 'Check Your Understanding')}</h2>
  <p class="quiz-meta">${esc(section.headerInfo || 'Name: ___________________  Date: _______________')}</p>
</div>
<div class="section-body">
${questions}
</div>`;
}

function renderAnswerKey(section, meta) {
  if (!section) return '';
  const items = (section.answerKey || []).map(a => {
    const lookFor = a.lookFor
      ? `<div class="ak-look-for"><strong>Look for:</strong> ${esc(a.lookFor)}</div>`
      : '';
    const sample = a.sampleResponse
      ? `<div class="ak-look-for"><em>Sample:</em> ${esc(a.sampleResponse)}</div>`
      : '';

    return `
<div class="answer-key-item">
  <span class="ak-num">${a.number}.</span>
  <span class="ak-answer">${esc(String(a.correctAnswer))}</span>
  <div style="font-size:0.8rem;color:var(--ink-soft);">${esc(a.explanation)}</div>
  ${lookFor}
  ${sample}
</div>`;
  }).join('\n');

  return `
<div class="answer-key-header">
  <h2>ANSWER KEY — Teacher Use Only</h2>
  <p class="answer-key-note">${esc(meta.standardCode)} &middot; Do not distribute to students.</p>
</div>
<div class="section-body">
${items}
</div>`;
}

function renderBlocks(blocks) {
  if (!blocks) return '';
  return blocks.map(block => {
    switch (block.type) {
      case 'text':
        return `<p class="block-text">${renderText(block.text || '')}</p>`;

      case 'callout':
        return `
<div class="block-callout keep-together">
  <div class="block-callout-label">${esc(block.calloutLabel || 'Note')}</div>
  ${renderText(block.text || '')}
</div>`;

      case 'diagram':
        if (block.imageUrl) {
          return `
<div class="block-diagram keep-together">
  <img src="${esc(block.imageUrl)}" alt="${esc(block.caption || 'Diagram')}">
  ${block.caption ? `<p class="diagram-caption">${esc(block.caption)}</p>` : ''}
</div>`;
        }
        if (block.diagramType) {
          const shapeSvg = renderFormatterShape(block);
          if (shapeSvg) return shapeSvg;
        }
        return `
<div class="block-diagram keep-together">
  <div class="diagram-placeholder">
    <div style="font-size:1.5rem;margin-bottom:6px;">${getDiagramIcon(block.diagramType)}</div>
    <p>${esc(block.placeholderInstruction || 'Diagram space')}</p>
    ${block.caption ? `<p class="diagram-caption">${esc(block.caption)}</p>` : ''}
  </div>
</div>`;

      case 'table': {
        const headers = (block.tableHeaders || []).map(h => `<th>${esc(h)}</th>`).join('');
        const rows = (block.tableRows || []).map(row =>
          `<tr>${row.map(cell => `<td>${esc(String(cell))}</td>`).join('')}</tr>`
        ).join('');
        return `
<div class="keep-together" style="margin:12px 0;">
  <table class="wb-table">
    ${headers ? `<thead><tr>${headers}</tr></thead>` : ''}
    <tbody>${rows}</tbody>
  </table>
</div>`;
      }

      case 'arabic-rtl':
        return `
<div class="rtl-block keep-together">
  <div style="font-family:var(--font-arabic);font-size:1.2rem;line-height:2.2;">${esc(block.arabicText || '')}</div>
  ${block.englishTranslation ? `<div class="rtl-translation">${esc(block.englishTranslation)}</div>` : ''}
</div>`;

      case 'writing-frame': {
        const frameHeaders = (block.frameHeaders || []).map(h => `<span>${esc(h)}</span>`).join('');
        const cellCount = (block.frameHeaders || []).length || 2;
        const cells = Array.from({ length: cellCount }, () => '<div class="frame-cell"></div>').join('');
        return `
<div class="writing-frame keep-together">
  ${frameHeaders ? `<div class="writing-frame-header">${frameHeaders}</div>` : ''}
  <div class="writing-frame-body">${cells}</div>
</div>`;
      }

      case 'placeholder':
        return `
<div class="block-diagram keep-together">
  <div class="diagram-placeholder">
    <div style="font-size:1.5rem;margin-bottom:6px;">📋</div>
    <p>${esc(block.placeholderInstruction || '')}</p>
  </div>
</div>`;

      default:
        return '';
    }
  }).join('\n');
}

function renderPracticeItem(item, isScaffolded) {
  const scaffoldClass = isScaffolded && (item.hint || item.partialAnswer) ? ' scaffolded' : '';
  const hint = item.hint ? `<p class="practice-hint">💡 Hint: ${esc(item.hint)}</p>` : '';
  const partial = item.partialAnswer ? `<p class="practice-hint">📝 Start: ${esc(item.partialAnswer)}</p>` : '';

  let responseArea = '';
  if (item.questionType === 'multipleChoice' && item.options) {
    responseArea = item.options.map(opt =>
      `<div class="mc-option"><div class="mc-bubble"></div> ${esc(opt)}</div>`
    ).join('');
  } else {
    const lines = item.ruledLines || 3;
    responseArea = `<div class="ruled-lines">${Array.from({ length: lines }, () => '<div class="ruled-line"></div>').join('')}</div>`;
  }

  return `
<div class="practice-item keep-together${scaffoldClass}">
  <div class="practice-number">${item.number}.</div>
  ${hint}
  ${partial}
  <div class="practice-prompt">${renderText(item.prompt)}</div>
  ${responseArea}
</div>`;
}

function renderQuizItem(q) {
  let responseArea = '';
  switch (q.questionType) {
    case 'multipleChoice':
      responseArea = (q.options || []).map(opt =>
        `<div class="mc-option"><div class="mc-bubble"></div> ${esc(opt)}</div>`
      ).join('');
      break;
    case 'fillBlank':
      responseArea = q.wordBank
        ? `<div class="block-callout" style="margin-bottom:8px;"><strong>Word Bank:</strong> ${q.wordBank.map(w => esc(w)).join(' &middot; ')}</div>`
        : '';
      responseArea += '<div class="ruled-lines"><div class="ruled-line"></div></div>';
      break;
    case 'trueFalse':
      responseArea = `
<div style="display:flex;gap:24px;margin-bottom:4px;">
  <div class="mc-option"><div class="mc-bubble"></div> True</div>
  <div class="mc-option"><div class="mc-bubble"></div> False</div>
</div>`;
      break;
    case 'matchTerms': {
      responseArea = (q.options || []).map(opt =>
        `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;font-family:var(--font-body);font-size:10.5pt;">
          <span style="display:inline-block;width:22px;border-bottom:1px solid var(--ink);text-align:center;"></span>
          ${esc(opt)}
        </div>`
      ).join('');
      if (q.definitions) {
        responseArea += '<div style="margin-top:8px;"></div>';
        responseArea += q.definitions.map((def, i) =>
          `<div style="font-family:var(--font-body);font-size:10.5pt;color:var(--ink-soft);margin-bottom:3px;">${String.fromCharCode(65 + i)}. ${esc(def)}</div>`
        ).join('');
      }
      break;
    }
    case 'labeling': {
      responseArea = (q.labels || []).map(l =>
        `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;font-family:var(--font-body);font-size:10.5pt;">
          <span style="display:inline-block;width:22px;border-bottom:1px solid var(--ink);text-align:center;"></span> ${esc(l)}
        </div>`
      ).join('');
      if (q.diagramType === 'number-line') {
        responseArea = renderNumberLine() + responseArea;
      } else if (q.diagramDescription) {
        responseArea = `
<div class="diagram-placeholder" style="margin-bottom:8px;">
  <div style="font-size:1.2rem;">📐</div>
  <p style="font-size:0.8rem;">${esc(q.diagramDescription)}</p>
</div>` + responseArea;
      }
      break;
    }
    default: {
      const lines = q.ruledLines || 4;
      responseArea = `<div class="ruled-lines">${Array.from({ length: lines }, () => '<div class="ruled-line"></div>').join('')}</div>`;
    }
  }

  return `
<div class="practice-item keep-together">
  <div class="practice-number">${q.number}.</div>
  <div class="practice-prompt">${renderText(q.question)}</div>
  ${responseArea}
</div>`;
}

function renderIllustration(ill) {
  if (ill.visualSource === 'placeholder') {
    return `
<div class="block-diagram keep-together">
  <div class="diagram-placeholder">
    <div style="font-size:1.5rem;">🖼</div>
    <p>${esc(ill.caption || ill.safetyNotes || 'Illustration space')}</p>
    ${ill.studentAction ? `<p style="font-size:0.75rem;color:var(--ink-soft);">Student task: ${esc(ill.studentAction)}</p>` : ''}
  </div>
</div>`;
  }

  if (ill.visualSource === 'teacher-provided') {
    return `
<div class="block-diagram keep-together">
  <div class="diagram-placeholder">
    <div style="font-size:1.5rem;">📎</div>
    <p>Teacher: insert ${esc(ill.type)} here</p>
    ${ill.caption ? `<p class="diagram-caption">${esc(ill.caption)}</p>` : ''}
    ${ill.labelsNeeded && ill.labels ? ill.labels.map(l => `<div style="font-family:var(--font-body);font-size:10pt;">___ ${esc(l)}</div>`).join('') : ''}
  </div>
</div>`;
  }

  if ((ill.visualSource === 'generated-image' || ill.visualSource === 'verified-image') && ill.imageUrl) {
    return `
<div class="block-diagram keep-together">
  <img src="${esc(ill.imageUrl)}" alt="${esc(ill.caption || 'Illustration')}">
  ${ill.caption ? `<p class="diagram-caption">${esc(ill.caption)}</p>` : ''}
</div>`;
  }

  return '';
}

function renderBold(text) {
  if (!text) return '';
  return text.replace(/\[\[(.+?)\]\]/g, '<strong>$1</strong>');
}

function renderFractions(text) {
  if (!text) return '';
  return text.replace(/\b(\d+)\/(\d+)\b/g, '<span class="frac"><span class="frac-num">$1</span><span class="frac-den">$2</span></span>');
}

function renderText(text) {
  return renderFractions(renderBold(esc(text)));
}

function getDiagramIcon(type) {
  const icons = {
    'number-line': '📏',
    'fraction-bar': '📊',
    'grid': '🔲',
    'table-diagram': '📋',
    'timeline': '📅',
    'graphic-organizer': '🗂',
    'image': '🖼',
    'arabic-text': '📜',
  };
  return icons[type] || '📐';
}

function renderFormatterShape(block) {
  switch (block.diagramType) {
    case 'fraction-bar': return renderFractionBars(block);
    case 'number-line': return renderNumberLine(block);
    default: return null;
  }
}

function renderNumberLine() {
  const w = 440;
  const h = 100;
  const padX = 50;
  const padY = 20;
  const lineY = padY + 32;
  const lineW = w - padX * 2 + 10;

  return `
<div class="block-diagram keep-together" style="background:white;padding:8px 0;">
  <svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;font-family:var(--font-heading);">
    <line x1="${padX}" y1="${lineY}" x2="${padX + lineW}" y2="${lineY}" stroke="#2D8B8B" stroke-width="2"/>
    <line x1="${padX}" y1="${lineY - 6}" x2="${padX}" y2="${lineY + 6}" stroke="#2D8B8B" stroke-width="2"/>
    <text x="${padX}" y="${lineY + 22}" text-anchor="middle" font-size="12" font-weight="600" fill="#1F2937">0</text>
    <line x1="${padX + lineW}" y1="${lineY - 6}" x2="${padX + lineW}" y2="${lineY + 6}" stroke="#2D8B8B" stroke-width="2"/>
    <text x="${padX + lineW}" y="${lineY + 22}" text-anchor="middle" font-size="12" font-weight="600" fill="#1F2937">1</text>
    <line x1="${padX + lineW * 0.5}" y1="${lineY - 8}" x2="${padX + lineW * 0.5}" y2="${lineY + 8}" stroke="#4B5563" stroke-width="1.5"/>
    <line x1="${padX + lineW * 0.667}" y1="${lineY - 8}" x2="${padX + lineW * 0.667}" y2="${lineY + 8}" stroke="#4B5563" stroke-width="1.5"/>
    <line x1="${padX + lineW * 0.75}" y1="${lineY - 8}" x2="${padX + lineW * 0.75}" y2="${lineY + 8}" stroke="#4B5563" stroke-width="1.5"/>
  </svg>
</div>`;
}

function renderFractionBars(block) {
  const barW = 360;
  const barH = 32;
  const gap = 20;
  const labelH = 22;
  const padX = 64;
  const padY = 24;
  const svgW = 500;
  const svgH = padY * 2 + barH * 2 + gap + labelH * 2 + 24;

  return `
<div class="block-diagram keep-together" style="background:white;padding:12px 0;">
  <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" style="max-width:${svgW}px;font-family:var(--font-heading);">
    ${stackedFrac(2, 3, padX - 4, padY + barH / 2, 16)}
    ${renderBar(padX + 20, padY, barW, barH, 3, 2, '#2D8B8B')}

    ${stackedFrac(3, 4, padX - 4, padY + barH + gap + labelH + barH / 2, 16)}
    ${renderBar(padX + 20, padY + barH + gap + labelH, barW, barH, 4, 3, '#2D8B8B')}

    <text x="${padX + 20 + barW / 2}" y="${padY + barH + gap + 10}" text-anchor="middle" font-size="12" fill="#6B7280">=</text>
    ${stackedFrac(8, 12, padX + 20, padY + barH + gap - 2, 11, '#6B7280')}
    ${stackedFrac(9, 12, padX + 20, padY + barH * 2 + gap + labelH - 2, 11, '#6B7280')}
  </svg>
  ${block.caption ? `<p class="diagram-caption">${esc(block.caption)}</p>` : ''}
</div>`;
}

function stackedFrac(n, d, x, y, size, color) {
  color = color || '#1F2937';
  const dy = size * 0.6;
  return `
<text x="${x}" y="${y - 2}" text-anchor="end" font-size="${size}" font-weight="600" fill="${color}">${n}</text>
<line x1="${x - size * 0.65}" y1="${y + dy * 0.15}" x2="${x + 2}" y2="${y + dy * 0.15}" stroke="${color}" stroke-width="1.2"/>
<text x="${x}" y="${y + dy + 2}" text-anchor="end" font-size="${size}" font-weight="600" fill="${color}">${d}</text>`;
}

function renderBar(x, y, w, h, parts, shaded, color) {
  const pw = w / parts;
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="#D1D5DB" stroke-width="1.5"/>`;

  for (let i = 0; i < parts; i++) {
    if (i > 0) {
      svg += `<line x1="${x + i * pw}" y1="${y}" x2="${x + i * pw}" y2="${y + h}" stroke="#D1D5DB" stroke-width="0.8" stroke-dasharray="3,3"/>`;
    }
    if (i < shaded) {
      svg += `<rect x="${x + i * pw}" y="${y}" width="${pw}" height="${h}" fill="${color}" fill-opacity="0.35"/>`;
      svg += `<rect x="${x + i * pw}" y="${y}" width="${pw}" height="${h}" fill="none" stroke="${color}" stroke-width="1.5"/>`;
    }
  }

  return svg;
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
