# Additional Specification — Print Format Output Mode & Download

## Overview

This document adds a **second output mode** to the prompt generator. The app now has an **Output Format** toggle with two options:

- **Interactive** — (existing, from 07_INTERACTIVE_HTML_SPEC.md) generates a prompt instructing the AI to produce an interactive HTML/CSS/JS lesson and quiz
- **Print** — generates a prompt instructing the AI to produce a beautifully designed, print-ready HTML page with rich layout, modern design, student-friendly visuals, and a download-as-PDF button

Both modes generate a text prompt. The receiving AI (Claude, ChatGPT, Gemini, etc.) reads the prompt and produces the output.

---

## UI Change

Add to **Card 3: Lesson Settings** in `06_UI_SPEC.md`:

- **Output Format** — Button group: `Interactive` | `Print`
- Default: `Interactive`
- Placed alongside the existing selectors (Target AI, Lesson Length, Student Level)

---

## Print Mode — What Changes

### Answer Key — INCLUDED

Unlike Interactive mode (which removed the answer key), Print mode **includes the full answer key** at the end of the document. The answer key is on a separate page with clear separation so the teacher can remove it before distributing to students.

### Quiz — Static, Not Interactive

All quiz questions are presented as traditional print-format questions: numbered, with blank lines for written responses, bubble-style answer choices for multiple choice, and blank label spaces for diagram questions. No JavaScript, no AI checker, no auto-grading.

### Download Button — Required

The generated HTML must include a **"Download as PDF"** button fixed at the top of the page. This button triggers the browser's print dialog (window.print()) which allows saving as PDF. The button itself is hidden when printing (via @media print CSS).

Additionally, the prompt should instruct the AI to include a **"Print"** button next to the download button for direct printing.

---

## Print Format Prompt Block

When **Print** is selected as the output format, replace the Interactive output format block (from 07_INTERACTIVE_HTML_SPEC.md) with the following:

```
## OUTPUT FORMAT

Generate the ENTIRE lesson and quiz as a single, self-contained HTML file with embedded CSS designed specifically for PRINTING. This file should open in a browser and look like a beautifully designed, professional educational handout that can be printed or saved as PDF.

### Download and Print Buttons:
- Include a fixed top bar with two buttons: "Download as PDF" and "Print"
- "Download as PDF" triggers window.print() which allows the user to select "Save as PDF" as the destination
- "Print" also triggers window.print() for direct printing
- Both buttons must be hidden when printing using @media print { .no-print { display: none; } }
- The top bar should be clean and minimal — do not let it interfere with the document design

### Page Layout and Design Requirements:
- Design this as if it were a professionally published educational worksheet or student workbook page
- Use a modern, colorful, student-friendly design that a {grade_level} student would find appealing and want to engage with
- The layout should feel like a high-quality textbook page — not a plain document

**Typography:**
- Use Google Fonts that are clean, modern, and highly readable (e.g., Poppins, Nunito, Quicksand, or similar)
- Headings: bold, colorful, large (20-28px), with decorative elements (underlines, icons, colored backgrounds)
- Body text: minimum 14px, comfortable line height (1.6), dark gray on white for readability
- Key vocabulary terms: bold with a subtle highlight color behind them
- For Arabic text (Islamic Studies): use a proper Arabic font (Noto Sans Arabic or Amiri), minimum 18px, with dir="rtl" and lang="ar" attributes

**Color Scheme:**
- Use a vibrant but harmonious color palette appropriate for {grade_level} students
- Each section of the lesson should have a subtle color-coded left border or background tint to visually separate it
- Use accent colors for callout boxes, vocabulary boxes, and section headers
- Ensure sufficient contrast for readability when printed in both color and black-and-white

**Section Design:**
- Each lesson section (Prior Knowledge, Learning Objectives, Engage, Explore, Explain, Elaborate, Summary) gets its own visually distinct block with:
  - A colored section header with an icon or emoji (e.g., 🎯 for Learning Objectives, 💡 for Engage, 📖 for Explain)
  - A subtle background color or left border stripe
  - Clear visual separation between sections (spacing, dividers, or background contrast)

**Special Boxes — Design as Cards:**
- **Key Vocabulary Box**: styled as a rounded card with a colored header bar, terms in a clean two-column or list layout, definitions clearly paired with terms
- **"Did You Know?" Box**: styled as a fun callout card with a distinctive icon (💡 or 🤔), colored background, slightly different font or style to stand out
- **"Real-World Application" Box**: styled as a card with a 🌍 icon, warm background color, clearly labeled
- **"What You Should Already Know" Box**: styled as a checklist card at the very top of the lesson
- **Learning Objectives Box**: styled with a target icon, clean numbered list

**Visuals and Diagrams:**
- All Tier 1 visuals (charts, diagrams, flowcharts, timelines, shapes) should be generated as clean SVG graphics inline in the HTML
- All visuals must be designed to print clearly in both color and grayscale
- Use clean lines, clear labels with readable font sizes, and high contrast
- For Tier 2 visuals: include a placeholder box with the description of what image the teacher should insert, plus search queries
- Diagrams for quiz questions should be print-ready with blank label lines where students write their answers

**Print-Specific CSS:**
```css
@media print {
  .no-print { display: none !important; }
  body { font-size: 12pt; line-height: 1.5; }
  .page-break { page-break-before: always; }
  .section { page-break-inside: avoid; }
  .quiz-question { page-break-inside: avoid; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
```
- Use page-break-before: always to put the Quiz on a new page
- Use page-break-before: always to put the Answer Key on a new page
- Avoid breaking a question across two pages (page-break-inside: avoid on each question block)
- Force color printing with print-color-adjust: exact so backgrounds and borders print in color

### Lesson Content Layout:
- The lesson flows top to bottom as a single continuous document (no tabs, no navigation buttons, no scrollable sections)
- Each section follows the next with clear visual hierarchy
- The document should feel like flipping through pages of a beautifully designed workbook

### Quiz Layout (Print Format):
- The quiz starts on a **new page** (page break before quiz section)
- A clear header: "Quiz: {topic_name}" with the student's name line: "Name: ___________________  Date: _______________"
- Questions are numbered sequentially
- **Question type formatting:**
  - **Vocabulary (Matching):** Two-column layout — terms on left, definitions on right (shuffled), with lines or letter blanks for matching
  - **Multiple Choice:** Options labeled A, B, C, D on separate lines with circle bubbles (○) to fill in
  - **True/False with Explain:** True ○  False ○  followed by "Explain: _______________________________________________"
  - **Fill in the Blank:** Sentence with a clear underlined blank space, word bank in a bordered box above the questions
  - **Short Answer:** Question followed by 4-5 ruled lines for writing
  - **Diagram/Visual-Based:** SVG diagram printed inline with numbered blank labels or blank lines pointing to parts
  - **Scenario-Based:** Scenario text in a slightly shaded box, followed by the question and 5-6 ruled lines for writing
- Adequate spacing between questions — students need room to write
- Each question type section has a subtle header label (e.g., "Multiple Choice", "Short Answer")

### Answer Key (Print Format):
- Starts on a **new page** (page break before answer key)
- Header: "ANSWER KEY — Teacher Use Only"
- A light watermark-style text or background indicator marking it as the teacher copy
- For every question:
  - Question number and correct answer
  - Brief explanation of WHY it is correct (1-2 sentences)
  - For open-ended questions (short answer, scenario-based): a sample strong response with notes on what makes it strong
- Answer key uses a compact, clean layout (two columns if space allows) to minimize pages

### Page Numbers and Footer:
- Include page numbers at the bottom center of every printed page
- Include a small footer with: "{Subject} | {Topic} | Grade {grade}" on the left and page number on the right
- Footer is styled small and subtle (8-9pt, light gray)

### Single File Requirement:
The entire document — HTML structure, CSS styling, print styles, and download/print buttons — must be in a SINGLE .html file. No external dependencies except Google Fonts loaded via CDN. The file must work by simply opening it in any modern web browser and clicking Download or Print.

Do NOT use any JavaScript frameworks. Use vanilla HTML, CSS, and minimal JavaScript (only for the download/print buttons).
```

---

## AI Target — Print Mode Delivery Notes

**Claude:**
```
DELIVERY: Generate this as a single HTML artifact optimized for printing. The teacher will use the download button to save it as PDF or print it directly.
```

**ChatGPT:**
```
DELIVERY: Generate this as a single, complete HTML file optimized for printing. Output the full code so it can be saved as a .html file, opened in a browser, and printed or saved as PDF using the built-in buttons.
```

**Gemini:**
```
DELIVERY: Generate this as a single, complete HTML file within the canvas, optimized for printing. The teacher will use the built-in download/print buttons to save as PDF or print directly.
```

**Other:**
```
DELIVERY: Generate this as a single, complete HTML file optimized for printing. Output the full HTML/CSS code so it can be saved as a .html file, opened in any modern web browser, and printed or downloaded as PDF using the built-in buttons.
```

---

## Interaction Between Output Modes

| Feature | Interactive Mode | Print Mode |
|---------|-----------------|------------|
| Output format | HTML/CSS/JS interactive app | HTML/CSS print-ready document |
| Quiz interaction | Clickable, auto-graded, AI-checked | Static, write-on-paper |
| Answer key | Not included (app handles grading) | Included on separate page |
| Scoring/feedback | Built into the app | Teacher grades manually |
| AI checker for written answers | Yes (built into app) | No (teacher evaluates) |
| Download button | Not needed (runs in browser) | Yes — "Download as PDF" and "Print" buttons |
| Design goal | Interactive, animated, engaging on screen | Beautiful on paper, rich layout, printable |
| Navigation | Sections with Next/Previous or scroll | Single continuous flow, page breaks |
| Visuals | SVG/CSS with hover/click interactivity | Static SVG/CSS, print-optimized, grayscale-safe |
| Arabic text (Islamic Studies) | RTL rendering, styled prominently | RTL rendering, large font, print-safe |

---

## Prompt Assembly Logic

The prompt engine checks the Output Format toggle:

- If **Interactive** → include the output format block from `07_INTERACTIVE_HTML_SPEC.md`
- If **Print** → include the output format block from this file (`09_PRINT_FORMAT_SPEC.md`)

All other prompt sections (5E lesson structure, quiz configuration, visual instructions, Islamic Studies block, curriculum alignment) remain the same regardless of output format. Only the output format instructions and quiz rendering change.
