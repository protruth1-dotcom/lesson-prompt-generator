# Workbook Formatter — Implementation Plan

## 1. The Structured Shape (Common Interface)

Both paths will produce a single JavaScript object: `WorkbookData`. This is the contract between content generation and presentation. The formatter receives `WorkbookData` and emits a complete, self-contained HTML string (CSS-in-HTML, no external dependencies).

```typescript
interface WorkbookData {
  meta: {
    title: string;           // Topic name
    grade: string;           // "4th Grade" | "5th Grade"
    subject: string;
    theme: string;           // "Rainbow Bright", etc.
    studentLevel: string;
    lessonLength: string;
    crossCurricular: boolean;
    isIslamic: boolean;
  };
  sections: {
    cover: {
      title: string;
      subtitle: string;      // e.g. "4th Grade Science"
      studentLevelLabel: string;
      themeMascot?: string;  // emoji/icon reference for theme
    };
    priorKnowledge: {
      title: string;
      items: string[];       // 2-3 prerequisite concepts
    };
    objectives: {
      title: string;
      items: string[];       // "By the end of this lesson..."
    };
    engage: {
      title: string;
      content: string;       // Hook text / scenario
    };
    explore: {
      title: string;
      content: string;
      activityType: string;  // "thought-experiment" | "observation" | "guided-question"
    };
    explain: {
      title: string;
      contentBlocks: ContentBlock[];  // Scaffolded chunks
      vocabulary: VocabularyItem[];
      didYouKnow: FunFact[];
      realWorldApplication: {
        title: string;
        content: string;
      };
    };
    elaborate: {
      title: string;
      content: string;
      crossCurricular?: { subject: string; connection: string };
      characterBuilding?: string;  // Islamic Studies only
    };
    summary: {
      title: string;
      items: string[];
    };
    quiz: {
      title: string;
      headerInfo: { nameLine: string; dateLine: string };
      questions: QuizQuestion[];
      answerKey: AnswerKeyItem[];
    };
  };
}

interface ContentBlock {
  type: 'text' | 'check-in' | 'visual-placeholder';
  text?: string;
  checkInPrompt?: string;  // "Think about it: ..."
  visualDescription?: string;
}

interface VocabularyItem {
  term: string;
  definition: string;
  example: string;
  isArabic?: boolean;
}

interface FunFact {
  title: string;
  fact: string;
}

interface QuizQuestion {
  number: number;
  type: 'vocabulary' | 'multipleChoice' | 'trueFalse' | 'fillBlank' | 'shortAnswer' | 'diagramVisual' | 'scenarioBased';
  question: string;
  options?: string[];      // For MC: ["A. ...", "B. ..."]
  wordBank?: string[];     // For fill-in-blank
  diagramLabels?: string[];// For diagram questions
  scenario?: string;       // For scenario-based
  answer: string;
  explanation: string;
  ruledLines?: number;     // How many lines to render for written response
}

interface AnswerKeyItem {
  number: number;
  correctAnswer: string;
  explanation: string;
  sampleResponse?: string; // For open-ended questions
}
```

### Why this shape
- **Deterministic rendering**: Every field maps to a specific visual element in the workbook (cover page, card, box, line, etc.)
- **AI-friendly**: We can instruct the LLM to return JSON matching this schema, which is cheaper and more reliable than asking it to write HTML/CSS
- **Zero-token shell generation**: For the Template path, we can build a `WorkbookData` object with empty/minimal content and the formatter still produces a beautiful, usable workbook shell
- **Validation**: Simple runtime checks ensure the formatter never crashes on malformed data

---

## 2. Files to Modify vs. Create

### New Files (all in `src/engine/`)

| File | Purpose |
|------|---------|
| `src/engine/workbookSchema.js` | Schema definition, validation helpers, and default/empty WorkbookData generators |
| `src/engine/contentBuilder.js` | **Deterministic content generator**. Builds a `WorkbookData` object from form state WITHOUT calling any LLM. Populates section headers, vocabulary placeholders, activity box structures, quiz question shells (empty content with correct types/counts), etc. This is what the Template path uses to produce a zero-token workbook shell. |
| `src/engine/workbookFormatter.js` | **The formatter**. Pure function: `(WorkbookData, theme) => HTML string`. Contains all layout logic, CSS-in-HTML generation, theme color maps, page-break rules, print media queries, page numbers, footers. Never calls an LLM. |
| `src/engine/themeStyles.js` | Extracted from existing `lessonBuilder.js`. Maps theme names to color palettes, mascot references, border styles, and decorative CSS snippets. Shared by the formatter and the AI prompt builders. |
| `src/engine/aiContentParser.js` | Parser that takes raw AI text output (from AI Prompt or Direct Lesson modes) and normalizes it into `WorkbookData`. Handles both JSON responses and free-text responses. Includes fallback heuristics. |
| `src/engine/aiPromptBuilderV2.js` | New prompt builder for AI paths that instructs the model to return `WorkbookData`-shaped JSON instead of raw HTML. Much shorter than current `lessonBuilder.js` because formatting instructions are removed. |

### Modified Files

| File | Changes |
|------|---------|
| `src/App.jsx` | - Update `handleGenerate` to branch on new logic: Template → `contentBuilder` → `workbookFormatter`; AI Prompt / Direct Lesson → `aiPromptBuilderV2` → AI → `aiContentParser` → `workbookFormatter`. <br>- Add state field for structured data (`workbookData`) alongside existing `lessonHtml`. <br>- Update `handleSave` to store `workbookData`. <br>- Keep old Direct Lesson path as fallback behind a feature flag or mode variant. |
| `src/components/preview/PreviewView.jsx` | - Accept `workbookData` prop. <br>- If `workbookData` exists: pass through `workbookFormatter` to generate HTML for iframe. <br>- If only `lessonHtml` exists (legacy): render in iframe as before. <br>- Update download logic to use formatter-generated HTML. <br>- Update copy logic to offer both HTML and JSON (structured data). |
| `src/components/generator/GeneratorView.jsx` | - Update mode descriptions to reflect new behavior. <br>- Template mode becomes "Workbook Template" (zero-token, deterministic shell). <br>- Direct Lesson gets a toggle or sub-mode: "Rich Workbook (fast)" vs "Legacy Full AI (slow)". |
| `src/engine/lessonBuilder.js` | - Keep as fallback for legacy Direct Lesson mode. <br>- Mark as deprecated in comments. |
| `src/engine/promptBuilder.js` | - No structural changes needed for Template mode since it still produces text prompts for external use. <br>- Optionally add a new export `buildTemplateWorkbook` that calls `contentBuilder` + `workbookFormatter`. |
| `src/hooks/useLocalStorage.js` | - Update stored entry shape to include `workbookData` field. |
| `src/components/history/HistoryView.jsx` & `HistoryCard.jsx` | - Update to handle entries that have `workbookData` vs legacy `lessonHtml`. <br>- Add badge/icon to distinguish formatter-generated vs legacy AI-generated workbooks. |

### Deleted/Deprecated
- Nothing deleted immediately. `lessonBuilder.js` stays as fallback.

---

## 3. Wiring the Formatter into Both Paths

### Path A: Template Mode (Zero-Token Workbook Shell)

```
Teacher fills form
  → buildTemplateWorkbook(formState)
    → contentBuilder.js: deterministically assembles WorkbookData
      → vocabulary: placeholder terms based on topic keywords from curriculum.js
      → quiz: empty question shells with correct types/counts from quizDistributions.js
      → all sections: headers, boxes, lined spaces present; content is minimal/placeholder
    → workbookFormatter.js: WorkbookData → rich HTML
      → cover page, section cards, activity boxes, page numbers, footer
  → PreviewView: iframe with formatter HTML
  → Download: window.print() on formatter HTML (same mechanism, better output)
```

**Key insight**: The Template path doesn't need an LLM. Teachers get a professionally formatted workbook *template* with the correct structure, section headers, activity boxes, and lined spaces — ready for them to fill in by hand or paste their own content. This is genuinely useful for teachers who prefer to write their own lessons but want the formatting done for them.

### Path B: AI Prompt / Direct Lesson Mode (AI Content + Deterministic Formatting)

```
Teacher fills form
  → aiPromptBuilderV2.js: builds a concise prompt asking for JSON WorkbookData
    - System prompt: "You are an expert teacher. Return ONLY valid JSON matching this schema..."
    - User prompt: grade, subject, topic, student level, lesson length, theme, quiz distribution
    - The prompt explicitly asks for content ONLY — no HTML, no CSS, no design decisions
  → useOpenAI.generate(prompt, { maxTokens: 8000, timeout: 60000 })
    → AI returns JSON string (or text we parse)
  → aiContentParser.js: normalizes AI output into validated WorkbookData
    - Attempts JSON.parse first
    - Falls back to regex/section extraction if AI returns markdown or free text
    - Validates required fields; fills missing sections with placeholders
  → workbookFormatter.js: WorkbookData → rich HTML
  → PreviewView: iframe with formatter HTML
```

**Token cost comparison**:
- **Old Direct Lesson**: ~4,000 token prompt + ~8,000-12,000 token response (HTML + CSS + content all generated by AI)
- **New AI path**: ~1,500 token prompt + ~3,000-5,000 token response (JSON content only) = **~60% token reduction**
- **Template path**: 0 tokens

### UI Flow Changes

In `GeneratorView`, the mode selector becomes:

| Mode | Behavior |
|------|----------|
| **Template** | Generates a workbook shell (zero tokens). Also still copies the text prompt to clipboard for external AI use. |
| **AI Prompt** | Sends meta-prompt to AI → returns improved prompt text (for external use). ALSO offers "Generate Workbook" button that uses the AI to fill content into the formatter. |
| **Direct Lesson (Rich)** | **Default.** AI generates JSON content → formatter renders. Fast, cheap, consistent design. |
| **Direct Lesson (Legacy)** | **Fallback.** AI generates full HTML as before. Available via dropdown or advanced toggle. |

### Wiring in App.jsx

```javascript
// Pseudocode for handleGenerate
const handleGenerate = useCallback(async () => {
  const data = buildPromptData();

  if (form.promptMode === 'Template') {
    // NEW: Generate workbook shell deterministically
    const workbookData = buildTemplateWorkbook(form);
    const html = formatWorkbook(workbookData);
    setPromptData({ ...data, promptText: buildPrompt(form), workbookData, lessonHtml: html });
    setActiveView('preview');

  } else if (form.promptMode === 'AI Prompt') {
    // AI Prompt still produces a text prompt for external use
    const metaPrompt = buildMetaPrompt(form);
    const result = await openai.generate(metaPrompt);
    if (result) {
      setPromptData({ ...data, promptText: result });
      setActiveView('preview');
    }

  } else if (form.promptMode === 'Direct Lesson') {
    if (form.useLegacyDirectLesson) {
      // FALLBACK: old behavior
      const lessonPrompt = buildLessonPrompt(form);
      const result = await openai.generate(lessonPrompt, { maxTokens: 16000, timeout: 120000 });
      if (result) {
        setPromptData({ ...data, promptText: '', lessonHtml: result });
        setActiveView('preview');
      }
    } else {
      // NEW DEFAULT: AI content + deterministic formatter
      const aiPrompt = buildAIPromptV2(form); // asks for JSON
      const result = await openai.generate(aiPrompt, { maxTokens: 8000, timeout: 90000 });
      if (result) {
        const workbookData = parseAIResponse(result);
        const html = formatWorkbook(workbookData);
        setPromptData({ ...data, promptText: '', workbookData, lessonHtml: html });
        setActiveView('preview');
      }
    }
  }
}, [form, buildPromptData, openai, showToast]);
```

---

## 4. Handling Existing AI-Generated Content

### Detection Strategy

Legacy entries in history/localStorage have this shape:
```javascript
{ lessonHtml: "<html>...</html>", promptText: "...", /* no workbookData */ }
```

New entries will have:
```javascript
{ workbookData: { /* structured data */ }, lessonHtml: "<html>...</html>", promptText: "" }
```

In `PreviewView`, we branch simply:

```javascript
// Priority: new formatter data > legacy HTML > nothing
const displayHtml = workbookData 
  ? formatWorkbook(workbookData)  // deterministic, always fresh
  : lessonHtml;                   // legacy AI-generated HTML
```

### Migration / Backward Compatibility

- **No migration needed**: Old entries continue to work exactly as before. `PreviewView` renders `lessonHtml` in an iframe when no `workbookData` is present.
- **Visual distinction**: History cards show a badge:
  - "Rich Workbook" (green) for entries with `workbookData`
  - "Legacy HTML" (gray) for entries with only `lessonHtml`
- **No data loss**: The `lessonHtml` field is preserved in all entries. For new formatter-generated workbooks, we also store the generated HTML (so even if the formatter code changes later, the visual output is captured).
- **Future-proofing**: If we later improve the formatter, users can "Re-render" old `workbookData` entries to get updated styling without re-calling the AI.

### Fallback for AI Parse Failures

If the AI returns malformed JSON or the parser fails:

1. `aiContentParser.js` returns a `WorkbookData` object with all required sections populated with placeholders
2. A toast warning appears: "AI content partially parsed. Some sections may need manual editing."
3. The user sees the workbook shell with whatever content was successfully extracted
4. Optional: offer a one-click "Try Legacy Mode" button that re-runs the old full-HTML generation

---

## 5. What the Formatter Actually Produces (Visual Specification)

Since we're not adding a PDF library, the formatter generates a single self-contained HTML file with embedded CSS, optimized for `window.print()` → "Save as PDF".

### Cover Page
- Full-page themed background color (theme-dependent)
- Large title (topic name)
- Subtitle: "Grade X Subject — Student Workbook"
- Theme mascot/emoji decoration
- Student name line and date line
- "Prior Knowledge" checklist card (2-3 items with checkboxes)

### Section Pages (one or more per section)
- **Section header**: colored left border stripe, icon, title
- **Objectives card**: target icon, numbered list
- **Engage/Explore/Explain/Elaborate/Summary**: themed cards with:
  - Subtle background tint
  - "Did You Know?" callout boxes (colored left border, light background)
  - "Real-World Application" box (warm accent color)
  - Vocabulary table/card: term | definition | example
  - Activity boxes: bordered area with response space (ruled lines for print, text area for interactive)
  - "Think about it" check-ins: inline italic prompt

### Quiz Pages
- New page break before quiz
- Header: "Quiz: Topic Name" + name/date lines
- Questions grouped by type with subtle section headers
- Question-specific formatting:
  - MC: circle bubbles (○) with A/B/C/D on separate lines
  - Matching: two-column with letter blanks
  - Fill-in-blank: underlined blank space + word bank box
  - Short answer / scenario: ruled lines (4-6 lines)
  - True/False: ○ True ○ False + "Explain:" + ruled line
- Page-break-inside: avoid on each question

### Answer Key
- New page break
- "ANSWER KEY — Teacher Use Only" header
- Light watermark or background tint
- Two-column compact layout
- Each item: number, correct answer, brief explanation

### Print CSS
- `@media print` hides any UI chrome
- `page-break-before: always` between major sections
- `page-break-inside: avoid` on cards and question blocks
- `print-color-adjust: exact` for backgrounds
- Footer on every page: "Subject | Topic | Grade" left, page number center/right
- Page numbers via CSS counters

---

## 6. Implementation Order (if approved)

1. **Schema + Theme extraction**: Create `workbookSchema.js` and `themeStyles.js`
2. **Formatter core**: Build `workbookFormatter.js` with one theme first (Rainbow Bright), test with hardcoded mock data
3. **Template path**: Build `contentBuilder.js`, wire into App.jsx for Template mode
4. **AI path**: Build `aiPromptBuilderV2.js` and `aiContentParser.js`, wire into Direct Lesson mode as default
5. **Preview + History updates**: Update PreviewView and History components to handle both old and new data
6. **Theme expansion**: Add remaining 6 themes to formatter
7. **Polish**: page numbers, footers, print optimization, edge cases
8. **Remove legacy fallback**: Once confident, remove the old Direct Lesson HTML-generation path

---

## Open Questions for You

1. **Template path scope**: Should Template mode still produce the text prompt for external copying (dual output: prompt + workbook shell), or should it become workbook-shell-only?
2. **AI Prompt mode**: Currently it returns a prompt for external use. Should it also gain a "Generate Workbook" button that feeds the meta-prompt through the AI and into the formatter?
3. **Content for Template shells**: For the zero-token workbook, should vocabulary placeholders be generic ("Term 1", "Term 2") or topic-derived guesses from `curriculum.js` topic names?
4. **Parser strictness**: How hard should `aiContentParser.js` try to parse free-text AI responses vs. requiring strict JSON? Strict JSON is more reliable but some models (older GPT-3.5, local models) struggle with schema adherence.
