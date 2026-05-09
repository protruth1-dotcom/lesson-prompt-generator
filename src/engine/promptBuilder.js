import { gradeVariables, studentLevelVariables, lessonLengthVariables, engageInstructions } from '../data/promptVariables';
import { getIslamicStudiesBlock, getIslamicVocabularyInstruction } from './islamicStudiesBlock';
import { buildVisualBlock } from './visualBuilder';
import { buildQuizBlock } from './quizBuilder';
import { getTopicName } from '../data/curriculum';
import { deliveryNotes, printDeliveryNotes } from '../data/platformCommands';

function themeToStyle(theme, gradeLevel) {
  const styles = {
    'Rainbow Bright': 'Use a cheerful rainbow-inspired color palette (soft reds, oranges, yellows, greens, blues, purples). Decorate section headers with small rainbow arcs or colorful stars. Include a cute smiling sun character in the header. Use bright, happy, warm tones throughout.',
    'Space Galaxy': 'Use a cosmic color palette (deep navy blues, starry whites, planet purples, and orange/yellow accents). Decorate headers with small stars, planets, or rocket ship icons. Design special boxes with rounded "planet" card styling. Include a friendly astronaut or alien mascot appearing in callout boxes.',
    'Ocean Adventure': 'Use an ocean-inspired color palette (teals, aqua blues, sandy beiges, coral pinks). Decorate headers with small wave, shell, or fish icons. Design special boxes with wave-shaped top borders. Include friendly sea creature mascots (whale, dolphin, turtle) in callout boxes.',
    'Jungle Safari': 'Use a jungle-inspired palette (lush greens, earthy browns, sunny yellows, bright tropical flower accents). Decorate headers with small leaf, vine, or paw print icons. Design special boxes with leafy borders. Include friendly animal mascots (monkey, parrot, elephant) in callout boxes.',
    'Superhero': 'Use a bold comic-book palette (primary reds, blues, yellows with dark outlines). Decorate headers with action star bursts, lightning bolts, or shield icons. Design special boxes as comic-style panels with slightly rounded corners and thick borders. Use bold, energetic styling throughout.',
    'Dinosaur World': 'Use a prehistoric palette (earthy greens, browns, volcanic oranges, amber yellows). Decorate headers with small dinosaur footprint icons or fossil patterns. Design special boxes with rocky/stone card styling. Include friendly cartoon dinosaur mascots appearing in callout boxes.',
    'Sports': 'Use an energetic sports palette (team colors: bold reds, blues, greens, with white space). Decorate headers with small ball, trophy, or star icons. Design special boxes as scoreboard-style cards. Use clean, dynamic layouts with trophy or medal accents for achievements.',
  };
  return '\n' + (styles[theme] || styles['Rainbow Bright']);
}

function buildInteractiveOutputFormat(gradeLevel, isIslamic, islamicArabicHtml) {
  return `## OUTPUT FORMAT

Generate the ENTIRE lesson and quiz as a single, self-contained HTML file with embedded CSS and JavaScript. This file should be a fully interactive web application that a student opens in a browser.

### Design Requirements:
- Student-friendly, colorful, and engaging design appropriate for ${gradeLevel} students
- Large, readable fonts (minimum 16px body text)
- Bright, inviting color scheme with visual hierarchy
- Smooth transitions and subtle animations to keep students engaged
- Clear navigation between lesson sections (Next/Previous buttons or scrollable sections)
- Mobile-responsive so it works on tablets and computers
- Progress indicator showing how far through the lesson the student is
- All lesson sections (Prior Knowledge, Engage, Explore, Explain, Elaborate, Summary) are clearly separated with visual section headers
- Visuals, diagrams, and illustrations are rendered inline within the HTML (SVG, CSS graphics, or embedded images)
- "Did You Know?" boxes and "Real-World Application" boxes are visually distinct (colored cards, icons, or callout styling)
- Key Vocabulary Box is styled as an interactive or visually highlighted component

### Single File Requirement:
The entire application — HTML structure, CSS styling, and JavaScript logic — must be in a SINGLE .html file. No external dependencies except:
- Google Fonts (for typography, loaded via CDN link)${isIslamic ? '\n- A font that supports Arabic script (e.g., "Noto Sans Arabic" or "Amiri")' : ''}

Do NOT use any frameworks (no React, no Vue, no Angular). Use vanilla HTML, CSS, and JavaScript only. The file must work by simply opening it in any modern web browser.${islamicArabicHtml}`;
}

function buildPrintOutputFormat(gradeLevel, topicName, subject, grade, isIslamic, theme) {
  return `## OUTPUT FORMAT

Generate the ENTIRE lesson and quiz as a single, self-contained HTML file with embedded CSS designed specifically for PRINTING. This file should open in a browser and look like a beautifully designed, professional educational handout that can be printed or saved as PDF.

### Theme:
Apply the "${theme}" theme throughout the entire document — not just a few accent colors, but a fully themed design a ${gradeLevel} student would be excited to receive.${themeToStyle(theme, gradeLevel)}

### Download and Print Buttons:
- Include a fixed top bar with two buttons: "Download as PDF" and "Print"
- "Download as PDF" triggers window.print() which allows the user to select "Save as PDF" as the destination
- "Print" also triggers window.print() for direct printing
- Both buttons must be hidden when printing using @media print { .no-print { display: none; } }
- The top bar should be clean and minimal — do not let it interfere with the document design

### Page Layout and Design Requirements:
- Design this as if it were a professionally published educational worksheet or student workbook page
- Use a modern, colorful, student-friendly design that a ${gradeLevel} student would find appealing and want to engage with
- The layout should feel like a high-quality textbook page — not a plain document

**Typography:**
- Use Google Fonts that are clean, modern, and highly readable (e.g., Poppins, Nunito, Quicksand, or similar)
- Headings: bold, colorful, large (20-28px), with decorative elements (underlines, icons, colored backgrounds)
- Body text: minimum 14px, comfortable line height (1.6), dark gray on white for readability
- Key vocabulary terms: bold with a subtle highlight color behind them${isIslamic ? '\n- For Arabic text: use a proper Arabic font (Noto Sans Arabic or Amiri), minimum 18px, with dir="rtl" and lang="ar" attributes' : ''}

**Color Scheme:**
- Use a vibrant but harmonious color palette appropriate for ${gradeLevel} students
- Each section of the lesson should have a subtle color-coded left border or background tint to visually separate it
- Use accent colors for callout boxes, vocabulary boxes, and section headers
- Ensure sufficient contrast for readability when printed in both color and black-and-white

**Section Design:**
- Each lesson section (Prior Knowledge, Learning Objectives, Engage, Explore, Explain, Elaborate, Summary) gets its own visually distinct block with:
  - A colored section header with an icon or emoji
  - A subtle background color or left border stripe
  - Clear visual separation between sections (spacing, dividers, or background contrast)

**Special Boxes — Design as Cards:**
- **Key Vocabulary Box**: styled as a rounded card with a colored header bar, terms in a clean two-column or list layout, definitions clearly paired with terms
- **"Did You Know?" Box**: styled as a fun callout card with a distinctive icon, colored background, slightly different font or style to stand out
- **"Real-World Application" Box**: styled as a card with a warm background color, clearly labeled
- **"What You Should Already Know" Box**: styled as a checklist card at the very top of the lesson
- **Learning Objectives Box**: styled with a target icon, clean numbered list

**Visuals and Diagrams:**
- All Tier 1 visuals (charts, diagrams, flowcharts, timelines, shapes) should be generated as clean SVG graphics inline in the HTML
- All visuals must be designed to print clearly in both color and grayscale
- Use clean lines, clear labels with readable font sizes, and high contrast
- For Tier 2 visuals: include a placeholder box with the description of what image the teacher should insert, plus search queries
- Diagrams for quiz questions should be print-ready with blank label lines where students write their answers

**Print-Specific CSS:**
- Use @media print to hide the download/print buttons
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
- A clear header: "Quiz: ${topicName}" with the student's name line: "Name: ___________________  Date: _______________"
- Questions are numbered sequentially
- **Question type formatting:**
  - **Vocabulary (Matching):** Two-column layout — terms on left, definitions on right (shuffled), with lines or letter blanks for matching
  - **Multiple Choice:** Options labeled A, B, C, D on separate lines with circle bubbles to fill in
  - **True/False with Explain:** True / False followed by "Explain: _______________________________________________"
  - **Fill in the Blank:** Sentence with a clear underlined blank space, word bank in a bordered box above the questions
  - **Short Answer:** Question followed by 4-5 ruled lines for writing
  - **Diagram/Visual-Based:** SVG diagram printed inline with numbered blank labels or blank lines pointing to parts
  - **Scenario-Based:** Scenario text in a slightly shaded box, followed by the question and 5-6 ruled lines for writing
- Adequate spacing between questions — students need room to write
- Each question type section has a subtle header label

### Answer Key (Print Format):
- Starts on a **new page** (page break before answer key)
- Header: "ANSWER KEY — Teacher Use Only"
- A light watermark-style text or background indicator marking it as the teacher copy
- For every question:
  - Question number and correct answer
  - Brief explanation of WHY it is correct (1-2 sentences)
  - For open-ended questions: a sample strong response with notes on what makes it strong
- Answer key uses a compact, clean layout (two columns if space allows) to minimize pages

### Page Numbers and Footer:
- Include page numbers at the bottom center of every printed page
- Include a small footer with: "${subject} | ${topicName} | ${grade}" on the left and page number on the right
- Footer is styled small and subtle (8-9pt, light gray)

### Single File Requirement:
The entire document — HTML structure, CSS styling, print styles, and download/print buttons — must be in a SINGLE .html file. No external dependencies except Google Fonts loaded via CDN.${isIslamic ? ' Include a font that supports Arabic script (e.g., "Noto Sans Arabic" or "Amiri").' : ''} The file must work by simply opening it in any modern web browser and clicking Download or Print.

Do NOT use any JavaScript frameworks. Use vanilla HTML, CSS, and minimal JavaScript (only for the download/print buttons).`;
}

export function buildPrompt(formState) {
  try {
    const {
      grade, subject, topic, targetAI, lessonLength,
      studentLevel, crossCurricular, outputFormat = 'Interactive',
      quizMode, totalQuestions, difficulty, manualCounts,
      theme = 'Rainbow Bright',
    } = formState;

    if (!grade || !subject || !topic) {
      throw new Error('Missing required fields: grade, subject, and topic are required to build a prompt.');
    }

    // Resolve variables
    const gv = gradeVariables[grade];
    const sv = studentLevelVariables[studentLevel];
    const lv = lessonLengthVariables[lessonLength];
    const topicName = getTopicName(topic);
    const isIslamic = subject === 'Islamic Studies';
    const isPrint = outputFormat === 'Print';

    if (!gv || !sv || !lv) {
      throw new Error('Could not resolve lesson configuration. Please check your selections.');
    }

    // 1. Opening role instruction
  const opening = `You are an expert ${gv.gradeLevel} teacher creating a lesson for ${sv.studentLevelDescription}. The lesson is on the subject of ${subject}: ${topicName}.`;

  // 2. Islamic Studies block (conditional)
  const islamicBlock = isIslamic ? `\n\n${getIslamicStudiesBlock()}` : '';

  // 3. Lesson requirements
  const requirements = `## LESSON REQUIREMENTS

**Grade Level:** ${gv.grade} (${sv.studentLevel}: ${sv.studentLevelDetail})
**Subject:** ${subject}
**Topic:** ${topicName}
**Lesson Duration:** ${lv.lessonLengthDescription}
**Language Level:** Write all content at a ${gv.gradeLevel} reading level${sv.studentLevelAdjustment} Use short, clear sentences. Define every academic or domain-specific vocabulary word when first introduced.`;

  // 4. Visual instructions
  const visualBlock = buildVisualBlock(subject, topic, targetAI, gv.gradeLevel, outputFormat);

  // 5. Islamic vocabulary instruction
  const islamicVocabInstruction = isIslamic ? `\n${getIslamicVocabularyInstruction()}` : '';

  // 6. Islamic Arabic HTML rendering instructions (conditional)
  const islamicArabicHtml = isIslamic ? `

For Arabic text rendering in the HTML${isPrint ? ' document' : ' application'}:
- Use a Google Font that supports Arabic script (e.g., "Noto Sans Arabic" or "Amiri")
- Apply dir="rtl" and lang="ar" attributes to all Arabic text elements
- Arabic text should be displayed larger than surrounding English text for readability (at least 20px)
- Quran ayat should be visually distinguished — centered, larger font, decorative border or background, with translation directly below
- Duas should be styled similarly to ayat — prominent Arabic text with English translation below and source citation in smaller text` : '';

  // 7. 5E Lesson structure — framing differs by output mode
  const htmlFraming = isPrint
    ? `Each section of the 5E lesson should be a distinct, visually separated block in the HTML document with:
- Section headers with icons or decorative elements and color-coded borders
- Clear visual separation between sections (spacing, dividers, or background contrast)
- The document flows as a single continuous printable page`
    : `Each section of the 5E lesson (Prior Knowledge, Learning Objectives, Engage, Explore, Explain, Elaborate, Summary) should be a distinct, visually separated section in the HTML application. Use:
- Section headers with icons or decorative elements
- Smooth scroll or "Next Section" / "Previous Section" navigation
- A progress bar or step indicator at the top showing where the student is in the lesson
- Transition animations between sections to keep the student engaged
- A final "Start Quiz" button that transitions from the lesson to the quiz`;

  const lessonStructure = `## LESSON STRUCTURE

${htmlFraming}

Follow the 5E Instructional Model exactly in this order:

### 1. PRIOR KNOWLEDGE CHECK — "What You Should Already Know"
List 2-3 prerequisite concepts the student should already understand before this lesson. Write them as brief, student-friendly statements. These should activate prior learning.

### 2. LEARNING OBJECTIVES
Write 2-3 measurable learning objectives starting with "By the end of this lesson, you will be able to..."
Use action verbs from Bloom's Taxonomy (identify, explain, compare, apply, analyze, create).

### 3. ENGAGE (Hook)
${engageInstructions[subject]}
This should be ${lv.lessonLengthEngageDetail}. The goal is to spark curiosity BEFORE teaching content.

### 4. EXPLORE
Present a student-driven discovery activity: a thought experiment, observation task, or guided question that lets the student interact with the concept BEFORE being given the explanation. ${lv.lessonLengthExploreDetail}

### 5. EXPLAIN (Core Content)
Deliver the core lesson content using scaffolded instruction — start with the simplest concept and build to more complex ideas step by step.

**Required elements within Explain:**

a) **Key Vocabulary Box** — At the start of this section, present a clearly formatted box listing every key term for this topic. Each term must include:
   - The term (bolded)
   - A student-friendly definition
   - A one-sentence example using the term${islamicVocabInstruction}

b) **Scaffolded Content** — Teach the material in small, sequential chunks. After each chunk, include a brief check: "Think about it:" or "Can you think of an example?" Use analogies a ${gv.gradeLevel} student would understand.

c) **Visuals and Illustrations**
${visualBlock}

d) **"Did You Know?" Callout Boxes** — Include ${lv.didYouKnowCount} interesting fact boxes placed naturally within the lesson. These should be surprising, memorable facts related to the topic that aid retention.

e) **Real-World Application Box** — Include a clearly labeled section: "Why Does This Matter in Real Life?" Connect the lesson topic to something concrete in the student's daily life or the real world. This answers the question "Why do I need to learn this?"

${lv.lessonLengthExplainDetail}

### 6. ELABORATE
Extend the concept to a new situation the student hasn't seen. Ask the student to apply what they learned in a different context. ${lv.lessonLengthElaborateDetail}
${crossCurricular ? '\n**Cross-Curricular Connection:** Connect this topic to another subject area. For example, link a science concept to math, or a social studies topic to ELA. Explain the connection in 2-3 sentences.' : ''}${isIslamic ? '\n**Character Building Takeaway:** End this section with: "Something I can practice this week:" — a specific, actionable behavior the student can apply from this lesson in their daily life.' : ''}

### 7. SUMMARY / REVIEW
Before the quiz, provide a clear review section with ${lv.summaryPointCount} key takeaways from the lesson. Write them as concise, student-friendly statements that capture the most important ideas.`;

  // 8. Quiz block
  const quizBlock = buildQuizBlock({
    quizMode,
    totalQuestions,
    difficulty,
    manualCounts,
    subject,
    gradeLevel: gv.gradeLevel,
    outputFormat,
    topicName,
  });

  // 9. Output format block
    const outputFormatBlock = isPrint
      ? buildPrintOutputFormat(gv.gradeLevel, topicName, subject, gv.grade, isIslamic, theme)
      : buildInteractiveOutputFormat(gv.gradeLevel, isIslamic, islamicArabicHtml);

  // 10. Delivery note (platform-specific)
  const deliveryMap = isPrint ? printDeliveryNotes : deliveryNotes;
  const delivery = deliveryMap[targetAI] || deliveryMap.Other;

  // Assemble
    return [
      opening,
      islamicBlock,
      '\n\n---\n\n',
      requirements,
      '\n\n---\n\n',
      lessonStructure,
      '\n\n### 8. QUIZ\n',
      quizBlock,
      '\n\n---\n\n',
      outputFormatBlock,
      '\n\n---\n\n',
      delivery,
    ].join('');
  } catch (err) {
    console.error('Failed to build prompt:', err);
    return `Error building prompt: ${err.message}\n\nPlease check your lesson settings and try again. If the problem persists, refresh the page.`;
  }
}
