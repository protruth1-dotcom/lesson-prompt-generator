import { QUESTION_TYPES, calculateAutoDistribution } from '../data/quizDistributions';

// Build question type instruction blocks for Interactive mode
function getInteractiveInstruction(typeKey, count, subject, gradeLevel) {
  const isIslamic = subject === 'Islamic Studies';

  const instructions = {
    vocabulary: `VOCABULARY QUESTIONS (${count} question${count !== 1 ? 's' : ''}) — AUTO-GRADED:
Render as a matching exercise: two columns where the student drags terms to match definitions, or uses dropdown selectors next to each definition.
- Provide ${count} terms and their definitions (shuffled on the right).
- JavaScript auto-grades by checking correct pairings.${isIslamic ? '\nUse Arabic terms in Arabic script for the term column. Definitions are in English.' : ''}`,

    multipleChoice: `MULTIPLE CHOICE QUESTIONS (${count} question${count !== 1 ? 's' : ''}) — AUTO-GRADED:
Render as styled clickable option cards or radio buttons with A, B, C, D labels. Only one is correct.
- Distribute across different parts of the lesson content (do not cluster questions on one sub-topic).
- Include plausible distractors — wrong answers should be reasonable, not obviously incorrect.
- At least one question should test understanding (not just recall) by rephrasing the concept.
- JavaScript auto-grades by comparing selected option to the correct answer.`,

    trueFalse: `TRUE/FALSE WITH EXPLANATION (${count} question${count !== 1 ? 's' : ''}) — HYBRID GRADING:
Render as two clickable buttons (True / False) plus a text area for the student's explanation.
- Include a mix of true and false statements.
- Statements should test common misconceptions about the topic.
- The True/False selection is auto-graded by JavaScript.
- The written explanation is evaluated by the built-in AI checker.`,

    fillBlank: `FILL IN THE BLANK (${count} question${count !== 1 ? 's' : ''}) — AUTO-GRADED:
Render as sentences with inline text input fields where the key word/phrase was removed. Display a word bank above the questions.
- Provide a word bank with ${count + 2} options (includes 2 distractors).
- Blanks should target key concepts, vocabulary, or important facts.
- JavaScript auto-grades using case-insensitive, whitespace-trimmed exact matching.`,

    shortAnswer: `SHORT ANSWER (${count} question${count !== 1 ? 's' : ''}) — AI-CHECKED:
Render as a text area (min 2 sentences prompt) with a word count indicator.
- Questions should require the student to explain a concept IN THEIR OWN WORDS.
- At least one question should ask "Why?" or "How?" (not just "What?").
- Write questions that cannot be answered with a single word or phrase.
- The built-in AI checker evaluates the student's response for understanding, then provides a rating (Excellent / Good / Needs Improvement) and specific, encouraging feedback.`,

    diagramVisual: `DIAGRAM/VISUAL-BASED QUESTIONS (${count} question${count !== 1 ? 's' : ''}) — AUTO-GRADED:
Render an SVG or HTML/CSS visual with interactive elements. The student should:
- Click hotspots to label parts of the diagram, OR
- Drag-and-drop labels onto the correct positions, OR
- Select from options overlaid on the visual, OR
- Read data from a chart/graph and select the correct conclusion.
- JavaScript auto-grades by checking label placements or selected answers.`,

    scenarioBased: `SCENARIO-BASED / CRITICAL THINKING (${count} question${count !== 1 ? 's' : ''}) — AI-CHECKED:
Render the scenario text (2-4 sentences) followed by a text area for the student's response.
- The question should require reasoning, not recall.
- Use "What would you do if...", "Why do you think...", "What would happen if...", "How would you solve..." formats.
- ${gradeLevel} students should be able to relate to the scenario (school, home, community contexts).
- The built-in AI checker evaluates the student's reasoning, then provides a rating and specific, encouraging, student-friendly feedback.${isIslamic ? '\nScenarios should involve real-life situations a student might face — at school, at home, with friends — where they must apply the Islamic value, ruling, or concept taught in the lesson.' : ''}`,
  };

  return instructions[typeKey] || '';
}

// Build question type instruction blocks for Print mode
function getPrintInstruction(typeKey, count, subject, gradeLevel) {
  const isIslamic = subject === 'Islamic Studies';

  const instructions = {
    vocabulary: `VOCABULARY QUESTIONS (${count} question${count !== 1 ? 's' : ''}):
Present a matching exercise: two-column layout with ${count} terms on the left and their definitions (shuffled) on the right. Include letter labels (A, B, C...) next to each definition and a blank line next to each term for the student to write the matching letter.${isIslamic ? '\nUse Arabic terms in Arabic script for the term column. Definitions are in English.' : ''}`,

    multipleChoice: `MULTIPLE CHOICE QUESTIONS (${count} question${count !== 1 ? 's' : ''}):
Each question has 4 answer choices labeled A, B, C, D on separate lines with circle bubbles (○) to fill in.
- Distribute across different parts of the lesson content (do not cluster questions on one sub-topic).
- Include plausible distractors — wrong answers should be reasonable, not obviously incorrect.
- At least one question should test understanding (not just recall) by rephrasing the concept.`,

    trueFalse: `TRUE/FALSE WITH EXPLANATION (${count} question${count !== 1 ? 's' : ''}):
Present a statement. Provide True ○ and False ○ bubbles to fill in, followed by "Explain: " with a ruled line for the student's written explanation.
- Include a mix of true and false statements.
- Statements should test common misconceptions about the topic.
- The "explain why" component is required — this elevates the question above simple recall.`,

    fillBlank: `FILL IN THE BLANK (${count} question${count !== 1 ? 's' : ''}):
Provide sentences with a clear underlined blank space where a key word or phrase was removed. Display a word bank in a bordered box above the questions.
- Provide a word bank with ${count + 2} options (includes 2 distractors) to support below-level students.
- Blanks should target key concepts, vocabulary, or important facts.`,

    shortAnswer: `SHORT ANSWER (${count} question${count !== 1 ? 's' : ''}):
Ask open-ended questions, each followed by 4-5 ruled lines for the student to write their response.
- Questions should require the student to explain a concept IN THEIR OWN WORDS.
- At least one question should ask "Why?" or "How?" (not just "What?").
- Write questions that cannot be answered with a single word or phrase.`,

    diagramVisual: `DIAGRAM/VISUAL-BASED QUESTIONS (${count} question${count !== 1 ? 's' : ''}):
Print an SVG diagram, chart, or illustration inline with numbered blank labels or blank lines pointing to parts the student must identify. The student should:
- Write labels on the blank lines pointing to parts of the diagram, OR
- Answer questions based on information shown in the visual, OR
- Complete a partially filled diagram by writing in missing parts, OR
- Read data from a chart/graph and write a conclusion on the ruled lines provided.`,

    scenarioBased: `SCENARIO-BASED / CRITICAL THINKING (${count} question${count !== 1 ? 's' : ''}):
Present each scenario (2-4 sentences) in a slightly shaded box, followed by the question and 5-6 ruled lines for the student's written response.
- The question should require reasoning, not recall.
- Use "What would you do if...", "Why do you think...", "What would happen if...", "How would you solve..." formats.
- ${gradeLevel} students should be able to relate to the scenario (school, home, community contexts).${isIslamic ? '\nScenarios should involve real-life situations a student might face — at school, at home, with friends — where they must apply the Islamic value, ruling, or concept taught in the lesson.' : ''}`,
  };

  return instructions[typeKey] || '';
}

export function buildQuizBlock(formState) {
  const {
    quizMode, totalQuestions, difficulty, manualCounts,
    subject, gradeLevel, outputFormat = 'Interactive', topicName = '',
  } = formState;

  // Get distribution
  let distribution;
  if (quizMode === 'Auto') {
    distribution = calculateAutoDistribution(subject, difficulty, totalQuestions);
  } else {
    distribution = manualCounts;
  }

  if (!distribution) return '';

  // Build distribution list
  const distributionLines = QUESTION_TYPES
    .filter(t => (distribution[t.key] || 0) > 0)
    .map(t => `- ${t.label}: ${distribution[t.key]}`)
    .join('\n');

  const modeDescription = quizMode === 'Auto'
    ? `This quiz uses a ${difficulty} distribution across question types.`
    : 'This quiz uses a custom distribution of question types selected by the teacher.';

  const getInstruction = outputFormat === 'Print' ? getPrintInstruction : getInteractiveInstruction;

  // Build question type instructions (in Bloom's order)
  const typeInstructions = QUESTION_TYPES
    .filter(t => (distribution[t.key] || 0) > 0)
    .map(t => getInstruction(t.key, distribution[t.key], subject, gradeLevel))
    .join('\n\n');

  const questionOrder = `### Question Order:
Arrange the quiz questions in this exact order, progressing from recall to critical thinking:
1. Vocabulary questions first
2. Fill in the Blank
3. Multiple Choice
4. True/False with Explanation
5. Diagram/Visual-Based
6. Short Answer
7. Scenario-Based (Critical Thinking) last

This progression builds student confidence with easier questions first and challenges them with deeper thinking at the end.`;

  if (outputFormat === 'Print') {
    return `## QUIZ — ${totalQuestions} Questions

${modeDescription}

### Question Distribution:
${distributionLines}

### Question Specifications:
${typeInstructions}

${questionOrder}

### Quiz Formatting (Print):
- The quiz starts on a **new page** (use page-break-before: always)
- Include a clear header: "Quiz: ${topicName}" with a student name line: "Name: ___________________  Date: _______________"
- Number all questions sequentially (1, 2, 3...)
- Clearly label each section by question type with a subtle header
- For multiple choice, use circle bubbles (○) with A, B, C, D labels on separate lines
- For matching, use a two-column layout with letter blanks
- For diagram questions, print the SVG visual inline with blank label lines
- For written response questions (short answer, scenario, True/False explain), provide adequate ruled lines for writing
- Ensure adequate spacing between questions — students need room to write
- Use page-break-inside: avoid on each question block to prevent splitting across pages`;
  }

  // Interactive mode
  return `## QUIZ — ${totalQuestions} Questions (Interactive)

${modeDescription}

### Question Distribution:
${distributionLines}

### Question Specifications:
${typeInstructions}

${questionOrder}

### AI Checker Implementation:
For questions that require written input (short answer, scenario-based, and the explanation portion of True/False), build an AI checker directly into the application. The AI checker should:
- Accept the student's written response
- Evaluate whether the response demonstrates understanding of the concept
- Provide a score or rating (e.g., Excellent / Good / Needs Improvement)
- Give specific, encouraging, student-friendly feedback explaining what was strong and what could be improved
- If the response is incorrect or incomplete, guide the student toward the correct answer without simply giving it away
- Use language appropriate for ${gradeLevel} students

### Grading & Scoring:
After the student completes all questions and submits, display a results screen showing:

1. SCORE HEADER:
   - Large, centered score: "{correct}/{total} — {percentage}%"
   - Visual score indicator (progress ring, bar, or star rating)
   - Encouraging message based on score tier

2. QUESTION-BY-QUESTION BREAKDOWN:
   - Scrollable list of all questions
   - Each shows: question number, question text (abbreviated), student's answer, correct/incorrect icon
   - Incorrect auto-graded questions: show the correct answer and a brief explanation of why it is correct
   - AI-checked questions: show the AI feedback and rating

3. ACTION BUTTONS:
   - "Review Mistakes" — scrolls to or filters only incorrect questions with explanations visible
   - "Retake Quiz" — resets all answers and returns to the first question
   - "Back to Lesson" — returns to the lesson content for review

4. SCORE TIER MESSAGES:
   - 90-100%: "Amazing work! You really mastered this topic!" (with celebration animation — confetti, stars, etc.)
   - 70-89%: "Great job! You're almost there. Review the ones you missed and you'll nail it!"
   - 50-69%: "Good effort! Go back through the lesson and try again — you're learning!"
   - Below 50%: "No worries — every expert was once a beginner! Review the lesson and give it another try. You've got this!"

### Quiz Rendering:
- Display each question one at a time OR as a scrollable form — choose whichever provides a better student experience
- Number all questions sequentially (1, 2, 3...)
- Clearly label each section by question type
- For multiple choice, use styled clickable cards with A, B, C, D labels
- For matching, use drag-and-drop or dropdown two-column format
- For diagram questions, render the visual directly before the question
- For written response questions, show a text area with word count indicator`;
}
