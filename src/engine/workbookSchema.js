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
          base.question = `Match each word about ${topicName} with its meaning.`;
          base.options = ['Term A', 'Term B', 'Term C', 'Term D'];
          base.answer = 'See Answer Key';
          base.explanation = `Understanding key words helps you remember what you learned about ${topicName}.`;
          break;

        case 'multipleChoice':
          base.question = `[A question about ${topicName} with four answer choices.]`;
          base.options = ['A. [Correct answer]', 'B. [Another possible answer]', 'C. [Another possible answer]', 'D. [Another possible answer]'];
          base.answer = 'A';
          base.explanation = `A is correct because [reason].`;
          break;

        case 'trueFalse':
          base.question = `True or False: [A statement about ${topicName}].`;
          base.answer = 'True';
          base.explanation = `This is true because [reason].`;
          break;

        case 'fillBlank':
          base.question = `Complete the sentence: "____________ is an important part of understanding ${topicName}."`;
          base.wordBank = ['[Term 1]', '[Term 2]', '[Term 3]', '[Term 4]'];
          base.answer = '[Term 1]';
          base.explanation = `"[Term 1]" is the correct answer because [reason].`;
          break;

        case 'shortAnswer':
          base.question = `In your own words: How does ${topicName} connect to your everyday life?`;
          base.ruledLines = 5;
          base.answer = 'See sample response in Answer Key';
          base.explanation = `A strong answer connects ${topicName} to a real example from your life and uses lesson vocabulary.`;
          break;

        case 'diagramVisual':
          base.question = `Look at the diagram of ${topicName}. Label each part on the lines below.`;
          base.diagramLabels = ['[Part A]', '[Part B]', '[Part C]'];
          base.answer = 'See Answer Key';
          base.explanation = `Each label names an important part of ${topicName}.`;
          break;

        case 'scenarioBased':
          base.scenario = `[A short story about a student your age facing a situation related to ${topicName}.]`;
          base.question = `What would you do in this situation? Explain your thinking.`;
          base.ruledLines = 6;
          base.answer = 'See sample response in Answer Key';
          base.explanation = `A strong response uses what you learned about ${topicName} and explains your reasoning.`;
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
    explanation: q.explanation || 'Check the lesson content for the answer.',
    sampleResponse:
      (q.type === 'shortAnswer' || q.type === 'scenarioBased')
        ? 'A good answer uses vocabulary from the lesson and explains your thinking clearly.'
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
        `I know some things about the topic of ${topicName}. Here is what I remember:`,
        `Words or skills I learned before that connect to ${topicName}:`,
        `A real-world example I have seen or experienced that relates to ${topicName}:`,
      ],
    },

    objectives: {
      title: 'Learning Objectives',
      items: [
        `By the end of this lesson, you will be able to identify and describe key ideas about ${topicName}.`,
        `By the end of this lesson, you will be able to explain why ${topicName} matters in real life.`,
        `By the end of this lesson, you will be able to use what you learned about ${topicName} to answer questions and solve problems.`,
      ],
    },

    engage: {
      title: 'Engage — Spark Your Curiosity',
      content: `[A real-world question, surprising fact, or short story about ${topicName} that makes you curious and excited to learn more.]`,
    },

    explore: {
      title: 'Explore — Discover for Yourself',
      activityType: 'guided-question',
      content: `Try this before you read the explanation: [A question to think about, a quick activity to try, or something to observe that lets you explore ${topicName} on your own before the lesson explains it.]`,
    },

    explain: {
      title: 'Explain — What You Need to Know',
      contentBlocks: [
        { type: 'text', text: `[The first key idea about ${topicName}, explained in short, clear sentences with examples.]` },
        { type: 'check-in', checkInPrompt: 'Think about it: Can you think of your own example?' },
        { type: 'text', text: `[The next idea about ${topicName} that builds on what you just learned, step by step.]` },
        { type: 'check-in', checkInPrompt: 'Think about it: How does this connect to the first idea?' },
        { type: 'visual-placeholder', visualDescription: `[A diagram or picture that shows the main idea of ${topicName}. It has labeled parts to help you understand.]` },
        { type: 'text', text: `[A deeper look at ${topicName} — an interesting connection, a helpful comparison, or a challenge question.]` },
      ],
      vocabulary: [
        { term: `[Term 1]`, definition: '[What this word means, in everyday language.]', example: '[For example: ...]' },
        { term: `[Term 2]`, definition: '[What this word means, in everyday language.]', example: '[For example: ...]' },
        { term: `[Term 3]`, definition: '[What this word means, in everyday language.]', example: '[For example: ...]' },
        { term: `[Term 4]`, definition: '[What this word means, in everyday language.]', example: '[For example: ...]' },
        ...(isIslamic ? [{ term: '[Arabic Term]', definition: '[Meaning in English]', example: '[For example: ...]', isArabic: true }] : []),
      ],
      didYouKnow: Array.from({ length: didYouKnowCount }, (_, i) => ({
        title: `Did You Know? #${i + 1}`,
        fact: `[A surprising or fun fact about ${topicName} that will make you say "wow!"]`,
      })),
      realWorldApplication: {
        title: 'Why Does This Matter in Real Life?',
        content: `[A specific, real example of how ${topicName} shows up in your everyday life — at home, at school, in nature, or in your community.]`,
      },
    },

    elaborate: {
      title: 'Elaborate — Try It Yourself',
      content: `Now use what you learned about ${topicName} in a whole new way: [A different situation or challenge that asks you to apply what you learned about ${topicName} to something new.]`,
      crossCurricular: crossCurricular ? {
        subject: '[Another subject area]',
        connection: `[How ${topicName} connects to what you learn in another subject, like Math, ELA, Science, or Social Studies.]`,
      } : null,
      characterBuilding: isIslamic
        ? `Something I can practice this week: [One specific thing you can do this week that puts this lesson into practice in your daily life.]`
        : null,
    },

    summary: {
      title: 'Summary — Key Takeaways',
      items: Array.from({ length: summaryCount }, (_, i) =>
        `Takeaway ${i + 1}: [The most important thing to remember about ${topicName}.]`
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
