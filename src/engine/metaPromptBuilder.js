import { gradeVariables, studentLevelVariables, lessonLengthVariables, engageInstructions } from '../data/promptVariables';
import { getIslamicStudiesBlock, getIslamicVocabularyInstruction } from './islamicStudiesBlock';
import { buildVisualBlock } from './visualBuilder';
import { buildQuizBlock } from './quizBuilder';
import { getTopicName } from '../data/curriculum';
import { deliveryNotes, printDeliveryNotes } from '../data/platformCommands';

/**
 * Builds the meta-prompt that gets sent to ChatGPT's API.
 * ChatGPT reads this and writes a custom, topic-specific prompt
 * that the user then pastes into any AI to generate a lesson.
 */
export function buildMetaPrompt(formState) {
  const {
    grade, subject, topic, targetAI, lessonLength,
    studentLevel, crossCurricular, outputFormat = 'Interactive',
    quizMode, totalQuestions, difficulty, manualCounts,
  } = formState;

  const gv = gradeVariables[grade];
  const sv = studentLevelVariables[studentLevel];
  const lv = lessonLengthVariables[lessonLength];
  const topicName = getTopicName(topic);
  const isIslamic = subject === 'Islamic Studies';
  const isPrint = outputFormat === 'Print';

  // Build the quiz block (reuse existing logic)
  const quizBlock = buildQuizBlock({
    quizMode, totalQuestions, difficulty, manualCounts,
    subject, gradeLevel: gv.gradeLevel, outputFormat, topicName,
  });

  // Build the visual block (reuse existing logic)
  const visualBlock = buildVisualBlock(subject, topic, targetAI, gv.gradeLevel, outputFormat);

  // Islamic Studies block
  const islamicBlock = isIslamic ? getIslamicStudiesBlock() : '';
  const islamicVocabInstruction = isIslamic ? getIslamicVocabularyInstruction() : '';

  // Delivery note
  const deliveryMap = isPrint ? printDeliveryNotes : deliveryNotes;
  const delivery = deliveryMap[targetAI] || deliveryMap.Other;

  // Output format summary
  const outputFormatSummary = isPrint
    ? `Print-ready HTML — a beautifully designed, professional educational handout with embedded CSS optimized for printing/PDF. Includes: download/print buttons (hidden when printing), page breaks between lesson/quiz/answer key, print-optimized colors, page numbers, footer with subject/topic/grade. The quiz is static (write-on-paper format with bubble circles, ruled lines, blank labels). The answer key is included on a separate page at the end.`
    : `Interactive HTML/CSS/JS — a single-file web application the student opens in a browser. Includes: colorful student-friendly design, section navigation with progress indicator, interactive quiz with auto-grading (drag-and-drop matching, clickable MC, inline text inputs) and built-in AI checker for written responses, scoring screen with tier messages and review. No answer key — the app handles grading.`;

  return `You are an expert educational prompt engineer. Your job is to write a highly detailed, comprehensive prompt that will be pasted into another AI (such as Claude, Gemini, or ChatGPT) to generate a complete ${gv.gradeLevel} lesson and quiz.

PARAMETERS:
- Grade: ${gv.grade}
- Subject: ${subject}
- Topic: ${topicName}
- Student Level: ${sv.studentLevel} — ${sv.studentLevelDetail}
- Lesson Length: ${lv.lessonLengthDescription}
- Output Format: ${outputFormat} (${outputFormatSummary})
- Target AI: ${targetAI}
- Cross-Curricular Connections: ${crossCurricular ? 'Yes' : 'No'}
- Quiz Mode: ${quizMode}
- Total Quiz Questions: ${totalQuestions}${quizMode === 'Auto' ? `\n- Difficulty: ${difficulty}` : ''}

PEDAGOGICAL FRAMEWORK:
The prompt you write must instruct the AI to follow the 5E Instructional Model in this exact order:
1. Prior Knowledge Check ("What You Should Already Know") — 2-3 prerequisite concepts
2. Learning Objectives — 2-3 measurable objectives using Bloom's Taxonomy action verbs
3. Engage — ${engageInstructions[subject]}
   This should be ${lv.lessonLengthEngageDetail}. The goal is to spark curiosity BEFORE teaching content.
4. Explore — Student-driven discovery before explanation. ${lv.lessonLengthExploreDetail}
5. Explain — Scaffolded core content with:
   - Key Vocabulary Box (term + student-friendly definition + one-sentence example)${islamicVocabInstruction ? '\n   ' + islamicVocabInstruction : ''}
   - "Did You Know?" callout boxes (${lv.didYouKnowCount})
   - Real-World Application box ("Why Does This Matter in Real Life?")
   - Visuals and illustrations
   ${lv.lessonLengthExplainDetail}
6. Elaborate — Apply concept to new situations. ${lv.lessonLengthElaborateDetail}${crossCurricular ? '\n   Include a Cross-Curricular Connection linking this topic to another subject area.' : ''}${isIslamic ? '\n   Include a Character Building Takeaway: "Something I can practice this week:"' : ''}
7. Summary — ${lv.summaryPointCount} key takeaways before quiz

STUDENT LEVEL ADJUSTMENTS:
Language level: Write all content at a ${gv.gradeLevel} reading level${sv.studentLevelAdjustment}

QUIZ FRAMEWORK:
${quizBlock}

VISUAL REQUIREMENTS:
${visualBlock}

When writing the prompt, use the appropriate visual instruction based on the tier:
- Tier 1 (SVG/code): Instruct the AI to generate clean SVG or HTML/CSS diagrams. This is the right tool for simple structured visuals.
- Tier 2 (image preferred, SVG acceptable): Instruct the AI to prefer real images for better engagement, but accept SVG if it represents the concept clearly and accurately.
- Tier 3 (image required — complex illustrations): For Gemini and ChatGPT, explicitly instruct the AI to generate a REAL IMAGE using its image generation model. Be very forceful with Gemini: say "DO NOT use SVG for this visual — generate an actual image." For Claude and Other, instruct SVG as best effort plus search queries and description as fallback.

IMPORTANT: Not every visual needs to be an image. Simple diagrams, charts, flowcharts, and graphs should remain as SVG — they look better and render more reliably as code. Only force image generation when the visual involves complex, organic, or realistic elements that SVG cannot accurately represent.
${islamicBlock ? `\nISLAMIC STUDIES REQUIREMENTS:\n${islamicBlock}` : ''}

GRADING, FEEDBACK, AND CORRECT ANSWERS — CRITICAL REQUIREMENTS:
The prompt you write MUST include ALL of the following instructions for the receiving AI. These are non-negotiable. Do NOT omit any of them.

${isPrint ? `PRINT ANSWER KEY:
- Include a complete Answer Key on a separate page at the end of the document (after a page break).
- Header: "ANSWER KEY — Teacher Use Only"
- For EVERY question, provide:
  - The question number and correct answer
  - A brief explanation of WHY it is correct (1-2 sentences)
  - For open-ended questions (Short Answer, Scenario-Based): a sample strong response and notes on what makes it strong
- The Answer Key must cover ALL questions — do not skip any.` : `INTERACTIVE QUIZ GRADING:
- Auto-graded questions (Vocabulary, Multiple Choice, True/False, Fill in the Blank, Diagram/Visual-Based): JavaScript must check the student's answer immediately or on submission.
- For EVERY incorrect answer on auto-graded questions: the app MUST display the correct answer AND a brief explanation of WHY it is correct. Do not just say "Wrong" — show what the right answer is and explain it.
- For EVERY correct answer: show a brief positive confirmation (e.g., "Correct! Well done.")
- AI-checked questions (Short Answer, Scenario-Based, True/False explanation): the built-in AI checker MUST evaluate the student's written response, provide a rating (Excellent / Good / Needs Improvement), give specific encouraging feedback explaining what was strong and what could be improved, and guide the student toward the correct answer if their response is incomplete or incorrect.
- After all questions are submitted, display a results screen showing:
  - Total score with percentage
  - Per-question breakdown with correct/incorrect indicators
  - For each incorrect auto-graded question: the correct answer and explanation
  - For each AI-checked question: the AI feedback and rating
  - "Review Mistakes" button to revisit only incorrect questions
  - "Retake Quiz" button to reset and try again
  - Encouraging score-tier message (90-100%: celebration, 70-89%: encouragement, below 70%: supportive)
- The student must ALWAYS be shown the correct answer and an explanation when they get a question wrong. This is mandatory.`}

OUTPUT FORMAT REQUIREMENTS:
The prompt you write must instruct the receiving AI to generate the output as: ${outputFormatSummary}

${delivery}

---

NOW WRITE THE PROMPT:
Write a complete, ready-to-paste prompt that covers all of the above. The prompt should:
- Be specific to the topic "${topicName}" — include topic-specific examples, analogies, vocabulary terms, visual descriptions, and hook ideas that are unique to this exact topic
- Be written as direct instructions to the AI that will receive it (start with "You are an expert ${gv.gradeLevel} teacher...")
- Include every section and requirement listed above — especially the grading, feedback, and correct answer requirements which are critical and must not be omitted
- Be detailed enough that the receiving AI produces a complete, high-quality lesson without needing any clarification
- Explicitly instruct the receiving AI to show the correct answer and explain why it is correct whenever a student gets a question wrong
- Use clear, organized formatting with section headers
- Include topic-specific "Did You Know?" facts, real-world applications, and scenario ideas
- Suggest specific vocabulary terms relevant to this exact topic
- Describe topic-specific visuals in detail

Do NOT generate the lesson itself. Generate only the PROMPT that will instruct another AI to generate the lesson.`;
}
