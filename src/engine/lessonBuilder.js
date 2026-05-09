import { gradeVariables, studentLevelVariables, lessonLengthVariables, engageInstructions } from '../data/promptVariables';
import { getIslamicStudiesBlock, getIslamicVocabularyInstruction } from './islamicStudiesBlock';
import { buildVisualBlock } from './visualBuilder';
import { buildQuizBlock } from './quizBuilder';
import { getTopicName } from '../data/curriculum';
import { deliveryNotes, printDeliveryNotes } from '../data/platformCommands';

const THEME_STYLES = {
  'Rainbow Bright': 'rainbow-inspired (soft reds, oranges, yellows, greens, blues, purples). Smiling sun mascot. Colorful star decorations. Bright, cheerful, warm tones.',
  'Space Galaxy': 'cosmic (deep navy, starry whites, planet purples, orange/yellow accents). Rocket and planet icons. Friendly astronaut mascot in callout boxes. Rounded planet-style cards.',
  'Ocean Adventure': 'ocean-inspired (teals, aqua blues, sandy beiges, coral pinks). Wave and shell icons. Friendly sea creature mascots (whale, dolphin, turtle). Wave-shaped borders.',
  'Jungle Safari': 'jungle-inspired (lush greens, earthy browns, sunny yellows, tropical flower accents). Leaf and paw print icons. Friendly animal mascots (monkey, parrot, elephant). Leafy borders.',
  'Superhero': 'comic-book bold (primary reds, blues, yellows with dark outlines). Action star bursts and lightning bolts. Comic-style panels with thick borders. Bold, energetic styling.',
  'Dinosaur World': 'prehistoric (earthy greens, browns, volcanic oranges, amber yellows). Dino footprint and fossil icons. Friendly cartoon dinosaur mascots. Rocky stone-style cards.',
  'Sports': 'energetic sports (bold reds, blues, greens, white space). Ball, trophy, and star icons. Scoreboard-style cards. Clean, dynamic layouts with medal accents.',
};

export function buildLessonPrompt(formState) {
  const {
    grade, subject, topic, targetAI, lessonLength,
    studentLevel, crossCurricular, outputFormat = 'Interactive',
    quizMode, totalQuestions, difficulty, manualCounts,
    theme = 'Rainbow Bright',
  } = formState;

  const gv = gradeVariables[grade];
  const sv = studentLevelVariables[studentLevel];
  const lv = lessonLengthVariables[lessonLength];
  const topicName = getTopicName(topic);
  const isIslamic = subject === 'Islamic Studies';
  const isPrint = outputFormat === 'Print';
  const themeStyle = THEME_STYLES[theme] || THEME_STYLES['Rainbow Bright'];

  const islamicBlock = isIslamic ? `\n\n${getIslamicStudiesBlock()}\n` : '';
  const islamicVocabInstruction = isIslamic ? `\n${getIslamicVocabularyInstruction()}` : '';
  const visualBlock = buildVisualBlock(subject, topic, targetAI, gv.gradeLevel, outputFormat);
  const quizBlock = buildQuizBlock({
    quizMode, totalQuestions, difficulty, manualCounts,
    subject, gradeLevel: gv.gradeLevel, outputFormat, topicName,
  });

  const deliveryMap = isPrint ? printDeliveryNotes : deliveryNotes;
  const delivery = deliveryMap[targetAI] || deliveryMap.Other;

  const systemPrompt = `You are an expert ${gv.gradeLevel} teacher and educational designer creating a beautifully designed, fully themed ${outputFormat === 'Print' ? 'printable workbook' : 'interactive lesson'} for ${sv.studentLevelDescription}. 

Your job is to GENERATE THE COMPLETE LESSON directly — not a prompt, but the actual finished product as a single HTML file.

### STUDENT CONTEXT
- Grade: ${gv.grade}
- Subject: ${subject}
- Topic: ${topicName}
- Student Level: ${sv.studentLevel} — ${sv.studentLevelDetail}
- Reading Level: ${gv.gradeLevel}${sv.studentLevelAdjustment}
- Lesson Length: ${lv.lessonLengthDescription}
${crossCurricular ? '- Cross-Curricular Connections: Yes' : ''}
${isIslamic ? islamicBlock : ''}

### DESIGN THEME
Apply the "${theme}" theme throughout the ENTIRE document. This means:
${themeStyle}

Do NOT create a plain or generic design. Every section, every card, every page must feel like part of a professionally published educational workbook. Use themed icons, mascots, and decorative elements throughout. The student should feel excited to receive this document.

### LESSON STRUCTURE — Follow the 5E Instructional Model

**1. PRIOR KNOWLEDGE CHECK — "What You Should Already Know"**
A colorful checklist-style card with 2-3 prerequisite concepts.

**2. LEARNING OBJECTIVES**
A themed card with a target icon. 2-3 measurable objectives starting with "By the end of this lesson, you will be able to..." using Bloom's action verbs.

**3. ENGAGE (Hook)**
${engageInstructions[subject]}
Make this ${lv.lessonLengthEngageDetail}. Spark curiosity BEFORE teaching content.

**4. EXPLORE**
A student-driven discovery activity — thought experiment, observation, or guided question before the explanation. ${lv.lessonLengthExploreDetail}

**5. EXPLAIN (Core Content)**
Scaffolded instruction from simple to complex. Include:
- **Key Vocabulary Box**: themed card with terms (bold), student-friendly definitions, one-sentence examples${islamicVocabInstruction}
- **Scaffolded content** in small chunks with "Think about it:" check-ins
- **Visuals and Illustrations**: ${visualBlock}
- **"Did You Know?" boxes** (${lv.didYouKnowCount}): fun fact callout cards with themed icons
- **"Real-World Application" box**: labeled "Why Does This Matter in Real Life?" — themed card
${lv.lessonLengthExplainDetail}

**6. ELABORATE**
Apply concepts to a new situation. ${lv.lessonLengthElaborateDetail}
${crossCurricular ? '\nInclude a Cross-Curricular Connection linking this topic to another subject area.\n' : ''}${isIslamic ? '\nInclude a Character Building Takeaway: "Something I can practice this week:"\n' : ''}

**7. SUMMARY**
${lv.summaryPointCount} key takeaways in a themed review card.

### QUIZ
${quizBlock}

${delivery}

### GOLDEN RULES FOR THIS OUTPUT
1. Generate the COMPLETE lesson — no placeholders, no "insert here" notes
2. Every section must be a visually distinct themed card or block
3. Use the "${theme}" theme colors, icons, and mascots consistently throughout
4. The document must look like a published workbook, not a webpage
5. Include page numbers, headers, and footers
6. All text must be at a ${gv.gradeLevel} reading level
7. The overall feel should be: "I want to show this to my friends"`;

  return systemPrompt;
}
