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
      ? `<div class="ak-look-for"><strong>Look for:</strong> ${renderText(a.lookFor)}</div>`
      : '';
    const sample = a.sampleResponse
      ? `<div class="ak-look-for"><em>Sample:</em> ${renderText(a.sampleResponse)}</div>`
      : '';

    return `
<div class="answer-key-item">
  <span class="ak-num">${a.number}.</span>
  <span class="ak-answer">${renderText(String(a.correctAnswer))}</span>
  <div style="font-size:0.8rem;color:var(--ink-soft);">${renderText(a.explanation)}</div>
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
  ${block.caption ? `<p class="diagram-caption">${renderText(block.caption)}</p>` : ''}
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
    <p>${renderText(block.placeholderInstruction || 'Diagram space')}</p>
    ${block.caption ? `<p class="diagram-caption">${renderText(block.caption)}</p>` : ''}
  </div>
</div>`;

      case 'table': {
        const headers = (block.tableHeaders || []).map(h => `<th>${esc(h)}</th>`).join('');
        const rows = (block.tableRows || []).map(row =>
          `<tr>${row.map(cell => `<td>${renderText(String(cell))}</td>`).join('')}</tr>`
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
  ${block.englishTranslation ? `<div class="rtl-translation">${renderText(block.englishTranslation)}</div>` : ''}
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
  const hint = item.hint ? `<p class="practice-hint">Hint: ${renderText(item.hint)}</p>` : '';
  const partial = item.partialAnswer ? `<p class="practice-hint">Start: ${renderText(item.partialAnswer)}</p>` : '';
  const diagram = item.diagramType
    ? renderFormatterShape({
      diagramType: item.diagramType,
      diagramData: item.diagramData || {},
      caption: item.diagramCaption,
    }) || ''
    : '';

  let responseArea = '';
  if (item.questionType === 'multipleChoice' && item.options) {
    responseArea = item.options.map(opt =>
      `<div class="mc-option"><div class="mc-bubble"></div> ${renderText(opt)}</div>`
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
  ${diagram}
  <div class="practice-prompt">${renderText(item.prompt)}</div>
  ${responseArea}
</div>`;
}

function renderQuizItem(q) {
  let responseArea = '';
  switch (q.questionType) {
    case 'multipleChoice':
      responseArea = (q.options || []).map(opt =>
        `<div class="mc-option"><div class="mc-bubble"></div> ${renderText(opt)}</div>`
      ).join('');
      break;
    case 'fillBlank':
      responseArea = q.wordBank
        ? `<div class="block-callout" style="margin-bottom:8px;"><strong>Word Bank:</strong> ${q.wordBank.map(w => renderText(w)).join(' &middot; ')}</div>`
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
          ${renderText(opt)}
        </div>`
      ).join('');
      if (q.definitions) {
        responseArea += '<div style="margin-top:8px;"></div>';
        responseArea += q.definitions.map((def, i) =>
          `<div style="font-family:var(--font-body);font-size:10.5pt;color:var(--ink-soft);margin-bottom:3px;">${String.fromCharCode(65 + i)}. ${renderText(def)}</div>`
        ).join('');
      }
      break;
    }
    case 'labeling': {
      responseArea = (q.labels || []).map(l =>
        `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;font-family:var(--font-body);font-size:10.5pt;">
          <span style="display:inline-block;width:22px;border-bottom:1px solid var(--ink);text-align:center;"></span> ${renderText(l)}
        </div>`
      ).join('');
      if (q.diagramType) {
        responseArea = (renderFormatterShape({
          diagramType: q.diagramType,
          diagramData: q.diagramData || { points: [{ position: 0.5, label: [1, 2] }] },
          caption: q.diagramCaption,
        }) || '') + responseArea;
      } else if (q.diagramDescription) {
        responseArea = `
<div class="diagram-placeholder" style="margin-bottom:8px;">
  <div style="font-size:1.2rem;">📐</div>
  <p style="font-size:0.8rem;">${renderText(q.diagramDescription)}</p>
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
    <p>${renderText(ill.caption || ill.safetyNotes || 'Illustration space')}</p>
    ${ill.studentAction ? `<p style="font-size:0.75rem;color:var(--ink-soft);">Student task: ${renderText(ill.studentAction)}</p>` : ''}
  </div>
</div>`;
  }

  if (ill.visualSource === 'teacher-provided') {
    return `
<div class="block-diagram keep-together">
  <div class="diagram-placeholder">
    <div style="font-size:1.5rem;">📎</div>
    <p>Teacher: insert ${esc(ill.type)} here</p>
  ${ill.caption ? `<p class="diagram-caption">${renderText(ill.caption)}</p>` : ''}
</div>`;
  }

  if ((ill.visualSource === 'generated-image' || ill.visualSource === 'verified-image') && ill.imageUrl) {
    return `
<div class="block-diagram keep-together">
  <img src="${esc(ill.imageUrl)}" alt="${esc(ill.caption || 'Illustration')}">
  ${ill.caption ? `<p class="diagram-caption">${renderText(ill.caption)}</p>` : ''}
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
    case 'number-line': return renderNumberLine(block.diagramData || {});
    case 'ramp-energy': return renderRampExperiment(block);
    default: return null;
  }
}

function renderNumberLine(data) {
  const source = data.diagramData || data;
  const points = source.points || [
    { position: 0.5, label: [1, 2] },
  ];
  const w = 440;
  const h = 110;
  const padX = 45;
  const padY = 22;
  const lineY = padY + 36;
  const lineW = w - padX * 2 + 10;

  let ticks = '';
  for (const pt of points) {
    const cx = padX + lineW * pt.position;
    ticks += `<line x1="${cx}" y1="${lineY - 10}" x2="${cx}" y2="${lineY + 10}" stroke="#4B5563" stroke-width="1.5"/>`;
    if (pt.label && pt.label.length === 2) {
      ticks += `
    <text x="${cx}" y="${lineY + 30}" text-anchor="middle" font-size="12" font-weight="600" fill="#4B5563">${pt.label[0]}</text>
    <line x1="${cx - 8}" y1="${lineY + 37}" x2="${cx + 8}" y2="${lineY + 37}" stroke="#4B5563" stroke-width="1.2"/>
    <text x="${cx}" y="${lineY + 48}" text-anchor="middle" font-size="12" font-weight="600" fill="#4B5563">${pt.label[1]}</text>`;
    }
  }

  return `
<div class="block-diagram keep-together" style="background:white;padding:8px 0;">
  <svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;font-family:var(--font-heading);">
    <line x1="${padX}" y1="${lineY}" x2="${padX + lineW}" y2="${lineY}" stroke="#2D8B8B" stroke-width="2"/>
    <line x1="${padX}" y1="${lineY - 6}" x2="${padX}" y2="${lineY + 6}" stroke="#2D8B8B" stroke-width="2"/>
    <text x="${padX}" y="${lineY + 22}" text-anchor="middle" font-size="12" font-weight="600" fill="#1F2937">0</text>
    <line x1="${padX + lineW}" y1="${lineY - 6}" x2="${padX + lineW}" y2="${lineY + 6}" stroke="#2D8B8B" stroke-width="2"/>
    <text x="${padX + lineW}" y="${lineY + 22}" text-anchor="middle" font-size="12" font-weight="600" fill="#1F2937">1</text>
    ${ticks}
  </svg>
</div>`;
}

function renderRampExperiment(block) {
  const w = 640;
  const h = 310;
  const r = 9;
  const floorY = 240;
  const data = block.diagramData || {};
  const trials = data.trials || [];

  function drawSetup(ox, releaseH, rampLength, title, heightLabel, speedLabel, distanceLabel) {
    const rampTopX = ox + 15;
    const rampTopY = floorY - releaseH;
    const rampBotX = rampTopX + rampLength;
    const angle = Math.atan2(floorY - rampTopY, rampBotX - rampTopX);
    const ballX = rampTopX + 10 - r * Math.sin(angle);
    const ballY = rampTopY + r * Math.cos(angle);
    const cupX = rampBotX + 25;
    const cupW = 22;
    const cupH = 18;

    return `
      <text x="${ox + 15 + rampLength / 2}" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#1F2937">${title}</text>
      <line x1="${rampTopX}" y1="${rampTopY}" x2="${rampBotX}" y2="${floorY}" stroke="#4B5563" stroke-width="3" stroke-linecap="round"/>
      <line x1="${ox - 5}" y1="${floorY}" x2="${cupX + cupW + 10}" y2="${floorY}" stroke="#9CA3AF" stroke-width="1.5"/>
      <line x1="${rampTopX - 5}" y1="${rampTopY}" x2="${rampTopX - 5}" y2="${floorY + 14}" stroke="#9CA3AF" stroke-width="0.8" stroke-dasharray="3,3"/>
      <text x="${rampTopX - 8}" y="${rampTopY + (floorY - rampTopY) / 2}" text-anchor="end" font-size="10" fill="#4B5563">${heightLabel}</text>
      <circle cx="${ballX}" cy="${ballY}" r="${r}" fill="#2D8B8B" fill-opacity="0.35" stroke="#2D8B8B" stroke-width="1.5"/>
      <circle cx="${ballX}" cy="${ballY}" r="2" fill="#1A5C5C"/>
      <path d="M${rampBotX + 4},${floorY - 2} L${rampBotX + 8},${floorY - 2} L${rampBotX + 12},${floorY - 2.5} Q${cupX + cupW / 2},${floorY - 12} ${rampBotX + 14},${floorY - 5} L${rampBotX + 40},${floorY - 3}" fill="none" stroke="#2D8B8B" stroke-width="1.5"/>
      <polygon points="${cupX + 38},${floorY - 5} ${cupX + 34},${floorY - 2} ${cupX + 34},${floorY - 8}" fill="#2D8B8B"/>
      <rect x="${cupX}" y="${floorY - cupH}" width="${cupW}" height="${cupH}" rx="2" fill="#F5F0E6" stroke="#4B5563" stroke-width="1.5"/>
      <text x="${cupX + cupW / 2}" y="${floorY - cupH / 2 + 4}" text-anchor="middle" font-size="8" fill="#4B5563">cup</text>
      <text x="${ox + 15 + rampLength / 2}" y="${floorY + 28}" text-anchor="middle" font-size="10" font-weight="600" fill="#4B5563">${speedLabel}</text>
      <text x="${ox + 15 + rampLength / 2}" y="${floorY + 42}" text-anchor="middle" font-size="9" fill="#6B7280">${distanceLabel}</text>
    `;
  }

  const t1 = trials[0] || {};
  const t2 = trials[1] || {};
  const left = drawSetup(20, 90, 160, t1.label || 'Trial: lower', t1.heightLabel || '10 cm', t1.speedLabel || 'slower', t1.distanceLabel || 'cup moves less');
  const right = drawSetup(330, 200, 160, t2.label || 'Trial: higher', t2.heightLabel || '30 cm', t2.speedLabel || 'faster', t2.distanceLabel || 'cup moves more');

  return `
<div class="block-diagram keep-together" style="background:white;padding:8px 0;">
  <svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;font-family:var(--font-heading);">
    <text x="${w / 2}" y="18" text-anchor="middle" font-size="14" font-weight="700" fill="#1F2937">Classroom Ramp Experiment</text>
    ${left}
    ${right}
  </svg>
  ${block.caption ? `<p class="diagram-caption">${renderText(block.caption)}</p>` : ''}
</div>`;
}

function renderFractionBars(block) {
  const source = block.diagramData || {};
  const bars = source.bars || [
    { label: [2, 3], parts: 3, shaded: 2, color: '#2D8B8B', equivalent: [8, 12] },
    { label: [3, 4], parts: 4, shaded: 3, color: '#6C8E3F', equivalent: [9, 12] },
  ];
  const barW = 360;
  const barH = 32;
  const gap = 20;
  const padX = 64;
  const padY = 24;
  const svgW = 500;
  const rowH = barH + gap;
  const svgH = padY * 2 + rowH * bars.length + 18;
  const equivalentX = padX + 20 + barW + 54;
  const rows = bars.map((bar, i) => {
    const y = padY + i * rowH;
    const color = bar.color || (i % 2 === 0 ? '#2D8B8B' : '#6C8E3F');
    const label = Array.isArray(bar.label) ? bar.label : [bar.shaded, bar.parts];
    const equivalent = Array.isArray(bar.equivalent)
      ? stackedFrac(bar.equivalent[0], bar.equivalent[1], equivalentX, y + barH / 2, 12, '#6B7280')
      : '';

    return `
    ${stackedFrac(label[0], label[1], padX - 4, y + barH / 2, 16)}
    ${renderBar(padX + 20, y, barW, barH, bar.parts, bar.shaded, color)}
    ${equivalent ? `<text x="${equivalentX - 22}" y="${y + barH / 2 + 4}" text-anchor="middle" font-size="12" fill="#6B7280">=</text>${equivalent}` : ''}`;
  }).join('\n');

  return `
<div class="block-diagram keep-together" style="background:white;padding:12px 0;">
  <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" style="max-width:${svgW}px;font-family:var(--font-heading);">
    ${rows}
  </svg>
  ${block.caption ? `<p class="diagram-caption">${renderText(block.caption)}</p>` : ''}
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
