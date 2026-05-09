import { gradeVariables, lessonLengthVariables } from '../data/promptVariables';
import { getTopicName } from '../data/curriculum';
import { calculateAutoDistribution, QUESTION_TYPES } from '../data/quizDistributions';

const THEME_ICONS = {
  'Rainbow Bright': '🌈',
  'Space Galaxy': '🚀',
  'Ocean Adventure': '🐋',
  'Jungle Safari': '🦁',
  'Superhero': '⚡',
  'Dinosaur World': '🦕',
  'Sports': '⚽',
};

/**
 * @typedef {Object} WorkbookMeta
 * @property {string} title
 * @property {string} subtitle
 * @property {string} grade
 * @property {string} subject
 * @property {string} theme
 * @property {string} themeIcon
 * @property {string} studentLevel
 * @property {string} lessonLength
 * @property {string} gradeLevel
 * @property {boolean} crossCurricular
 * @property {boolean} isIslamic
 */

/**
 * @typedef {Object} ContentBlock
 * @property {'text'|'check-in'|'visual-placeholder'} type
 * @property {string} [text]
 * @property {string} [checkInPrompt]
 * @property {string} [visualDescription]
 */

/**
 * @typedef {Object} VocabularyItem
 * @property {string} term
 * @property {string} definition
 * @property {string} example
 * @property {boolean} [isArabic]
 */

/**
 * @typedef {Object} DidYouKnowItem
 * @property {string} title
 * @property {string} fact
 */

/**
 * @typedef {Object} RealWorldApplication
 * @property {string} title
 * @property {string} content
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {number} number
 * @property {'vocabulary'|'multipleChoice'|'trueFalse'|'fillBlank'|'shortAnswer'|'diagramVisual'|'scenarioBased'} type
 * @property {string} question
 * @property {string[]} [options]
 * @property {string[]} [wordBank]
 * @property {string[]} [diagramLabels]
 * @property {string} [scenario]
 * @property {string} answer
 * @property {string} explanation
 * @property {number} [ruledLines]
 */

/**
 * @typedef {Object} AnswerKeyItem
 * @property {number} number
 * @property {string} correctAnswer
 * @property {string} explanation
 * @property {string} [sampleResponse]
 */

/**
 * @typedef {Object} WorkbookData
 * @property {WorkbookMeta} meta
 * @property {Object} sections
 */

function buildPlaceholderQuestions(topicName, gradeLevel, subject, distribution) {
  const questions = [];
  let qNum = 0;

  const types = QUESTION_TYPES.filter(t => (distribution[t.key] || 0) > 0);
  const bloomOrdered = [...types].sort((a, b) => a.bloomOrder - b.bloomOrder);

  for (const type of bloomOrdered) {
    const count = distribution[type.key] || 0;
    for (let i = 0; i < count; i++) {
      qNum++;
      const base = { number: qNum, type: type.key };

      switch (type.key) {
        case 'vocabulary':
          base.question = `Match each vocabulary term about ${topicName} with its correct definition.`;
          base.options = ['Term A', 'Term B', 'Term C', 'Term D'];
          base.answer = 'See Answer Key';
          base.explanation = `Vocabulary terms introduce key concepts about ${topicName}. Matching them correctly shows understanding of the lesson content.`;
          break;

        case 'multipleChoice':
          base.question = `Question ${qNum} about ${topicName}: [Core concept multiple choice question]`;
          base.options = ['A. [Correct answer]', 'B. [Plausible distractor]', 'C. [Plausible distractor]', 'D. [Plausible distractor]'];
          base.answer = 'A';
          base.explanation = `The correct answer is A because [brief reason based on ${topicName} content].`;
          break;

        case 'trueFalse':
          base.question = `True or False: [Statement about ${topicName} that tests a common misconception].`;
          base.answer = 'True';
          base.explanation = `This statement is true because [brief explanation related to ${topicName}].`;
          break;

        case 'fillBlank':
          base.question = `Complete the sentence about ${topicName}: "____________ is an important concept because it helps us understand ${topicName}."`;
          base.wordBank = ['[Term 1]', '[Term 2]', '[Term 3]', '[Term 4]'];
          base.answer = '[Term 1]';
          base.explanation = `The correct term is "[Term 1]" because [reason related to ${topicName}].`;
          break;

        case 'shortAnswer':
          base.question = `Explain in your own words: How does ${topicName} connect to something you see or do in everyday life?`;
          base.ruledLines = 5;
          base.answer = 'See sample response in Answer Key';
          base.explanation = `A strong answer connects ${topicName} to a real-world example and uses lesson vocabulary correctly.`;
          break;

        case 'diagramVisual':
          base.question = `Look at the diagram of ${topicName} below. Label the missing parts.`;
          base.diagramLabels = ['[Part A]', '[Part B]', '[Part C]'];
          base.answer = 'See Answer Key';
          base.explanation = `Correctly labeling the diagram shows understanding of the structure of ${topicName}.`;
          break;

        case 'scenarioBased':
          base.scenario = `Imagine this situation related to ${topicName}: [Short scenario with 2-3 sentences that a ${gradeLevel} student can relate to].`;
          base.question = `Based on what you learned about ${topicName}, what would you do in this situation? Explain your reasoning.`;
          base.ruledLines = 6;
          base.answer = 'See sample response in Answer Key';
          base.explanation = `A strong response applies concepts from the lesson about ${topicName} to the scenario and explains the reasoning clearly.`;
          break;

        default:
          break;
      }

      questions.push(base);
    }
  }

  return questions;
}

function buildPlaceholderAnswerKey(questions) {
  return questions.map(q => ({
    number: q.number,
    correctAnswer: q.answer || 'See explanation',
    explanation: q.explanation || 'Refer to the lesson content for the correct answer.',
    sampleResponse:
      (q.type === 'shortAnswer' || q.type === 'scenarioBased')
        ? 'A strong sample response would use lesson vocabulary, connect to the real world, and explain reasoning clearly.'
        : undefined,
  }));
}

export function createMockWorkbookData(formState) {
  const {
    grade, subject, topic, lessonLength, studentLevel,
    crossCurricular, theme = 'Rainbow Bright',
    quizMode, totalQuestions, difficulty, manualCounts,
  } = formState;

  const gv = gradeVariables[grade];
  const lv = lessonLengthVariables[lessonLength];
  const topicName = getTopicName(topic);
  const isIslamic = subject === 'Islamic Studies';
  const gradeLevelText = gv?.gradeLevel || 'fourth-grade';

  const themeIcon = THEME_ICONS[theme] || THEME_ICONS['Rainbow Bright'];

  const didYouKnowCount = lv?.didYouKnowCount
    ? (typeof lv.didYouKnowCount === 'string'
      ? parseInt(lv.didYouKnowCount, 10) || 2
      : lv.didYouKnowCount)
    : 2;

  const summaryCount = lv?.summaryPointCount
    ? (typeof lv.summaryPointCount === 'string'
      ? (lv.summaryPointCount.includes('-')
        ? parseInt(lv.summaryPointCount.split('-')[1], 10) || 5
        : parseInt(lv.summaryPointCount, 10) || 5)
      : lv.summaryPointCount)
    : 5;

  let distribution;
  if (quizMode === 'Auto') {
    distribution = calculateAutoDistribution(subject, difficulty, totalQuestions);
  } else {
    distribution = manualCounts;
  }

  const meta = {
    title: topicName,
    subtitle: `${grade} ${subject}`,
    grade: grade || '',
    subject: subject || '',
    theme,
    themeIcon,
    studentLevel: studentLevel || 'On Level',
    lessonLength: lessonLength || 'Medium',
    gradeLevel: gradeLevelText,
    crossCurricular: !!crossCurricular,
    isIslamic,
  };

  const sections = {
    priorKnowledge: {
      title: 'What You Should Already Know',
      items: [
        `Recall what you know about the basics of ${topicName}.`,
        `Think about vocabulary or skills from earlier lessons that connect to learning about ${topicName}.`,
        `Consider a real-world example related to ${topicName} that you have seen or experienced.`,
      ],
    },

    objectives: {
      title: 'Learning Objectives',
      items: [
        `By the end of this lesson, you will be able to identify and describe key concepts about ${topicName}.`,
        `By the end of this lesson, you will be able to explain why ${topicName} matters in real life.`,
        `By the end of this lesson, you will be able to apply your understanding of ${topicName} to answer questions and solve problems.`,
      ],
    },

    engage: {
      title: 'Engage — Spark Your Curiosity',
      content: `Spark curiosity about ${topicName}: [A real-world question, surprising fact, or short scenario that grabs attention and makes a ${gradeLevelText} student excited to learn more about ${topicName}.]`,
    },

    explore: {
      title: 'Explore — Discover for Yourself',
      activityType: 'guided-question',
      content: `Try this before reading the explanation: [A guided question, thought experiment, or observation task that lets the student interact with the concept of ${topicName} on their own. Think: predict, observe, wonder.]`,
    },

    explain: {
      title: 'Explain — Core Content',
      contentBlocks: [
        { type: 'text', text: `Core Concept 1: [Scaffolded explanation of the first key idea about ${topicName}, written at a ${gradeLevelText} reading level with short, clear sentences.]` },
        { type: 'check-in', checkInPrompt: 'Think about it: Can you think of your own example?' },
        { type: 'text', text: `Core Concept 2: [Build on the first concept — introduce the next idea about ${topicName} step by step, connecting it back to what was just explained.]` },
        { type: 'check-in', checkInPrompt: 'Think about it: How does this connect to Core Concept 1?' },
        { type: 'visual-placeholder', visualDescription: `[Image: A simple diagram or illustration showing the main idea of ${topicName} — labeled with key parts the student needs to know.]` },
        { type: 'text', text: `Core Concept 3: [Extend understanding of ${topicName} further — add nuance, an analogy, or a deeper explanation that stretches thinking without overwhelming a ${gradeLevelText} student.]` },
      ],
      vocabulary: [
        { term: `[Key Term 1 about ${topicName}]`, definition: '[Student-friendly definition with short, clear language.]', example: '[One sentence using the term naturally.]' },
        { term: `[Key Term 2 about ${topicName}]`, definition: '[Student-friendly definition with short, clear language.]', example: '[One sentence using the term naturally.]' },
        { term: `[Key Term 3 about ${topicName}]`, definition: '[Student-friendly definition with short, clear language.]', example: '[One sentence using the term naturally.]' },
        { term: `[Key Term 4 about ${topicName}]`, definition: '[Student-friendly definition with short, clear language.]', example: '[One sentence using the term naturally.]' },
        ...(isIslamic ? [{ term: '[Arabic Term]', definition: '[Definition in English]', example: '[Usage example]', isArabic: true }] : []),
      ],
      didYouKnow: Array.from({ length: didYouKnowCount }, (_, i) => ({
        title: `Did You Know? #${i + 1}`,
        fact: `[A surprising, memorable, or fun fact about ${topicName} that a ${gradeLevelText} student would find interesting. Make it genuinely surprising!]`,
      })),
      realWorldApplication: {
        title: 'Why Does This Matter in Real Life?',
        content: `[Connect ${topicName} to something concrete in a ${gradeLevelText} student's daily life. Answer: "Why do I need to learn this?" with a specific, relatable example — at home, at school, in the community, in nature, etc.]`,
      },
    },

    elaborate: {
      title: 'Elaborate — Apply What You Learned',
      content: `Now apply your understanding of ${topicName} to a NEW situation you haven't seen before: [A different context, a new scenario, or a follow-up challenge that requires the student to transfer what they learned about ${topicName} to think about something related but different.]`,
      crossCurricular: crossCurricular ? {
        subject: '[Another subject area]',
        connection: `[2-3 sentences explaining how ${topicName} connects to another subject like Math, ELA, Science, or Social Studies.]`,
      } : null,
      characterBuilding: isIslamic
        ? `Something I can practice this week: [A specific, actionable behavior the student can apply from the lesson about ${topicName} in their daily life, rooted in Islamic values.]`
        : null,
    },

    summary: {
      title: 'Summary — Key Takeaways',
      items: Array.from({ length: summaryCount }, (_, i) =>
        `Takeaway ${i + 1}: [One concise, student-friendly statement capturing an important idea about ${topicName}.]`
      ),
    },

    quiz: {
      title: `Quiz: ${topicName}`,
      headerInfo: 'Name: ___________________  Date: _______________',
      questions: distribution
        ? buildPlaceholderQuestions(topicName, gradeLevelText, subject, distribution)
        : [],
      answerKey: [],
    },
  };

  sections.quiz.answerKey = buildPlaceholderAnswerKey(sections.quiz.questions);

  return { meta, sections };
}

export function getThemeIcon(theme) {
  return THEME_ICONS[theme] || THEME_ICONS['Rainbow Bright'];
}
