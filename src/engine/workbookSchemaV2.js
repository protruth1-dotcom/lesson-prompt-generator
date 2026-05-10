export const BLOCK_TYPES = [
  'text',
  'callout',
  'scaffolded-item',
  'practice-item',
  'quiz-item',
  'diagram',
  'table',
  'arabic-rtl',
  'writing-frame',
  'placeholder',
];

export const VISUAL_SOURCES = [
  'formatter-shape',
  'generated-image',
  'verified-image',
  'teacher-provided',
  'placeholder',
];

export const PURPOSE_CATEGORIES = [
  'concept-explanation',
  'reduce-text-load',
  'compare-classify',
  'sequence-process',
  'calculate-model',
  'observe-interpret',
  'practice-support',
  'assessment-support',
];

/**
 * @typedef {'text'|'callout'|'scaffolded-item'|'practice-item'|'quiz-item'|'diagram'|'table'|'arabic-rtl'|'writing-frame'|'placeholder'} BlockType
 */

/**
 * @typedef {Object} ContentBlock
 * @property {BlockType} type
 * @property {string} [text] — plain string, use [[bold]] for emphasis
 * @property {string} [calloutType] — 'think-aloud' | 'tip' | 'remember' | 'vocabulary'
 * @property {string} [calloutLabel] — e.g. "Think Aloud", "Remember"
 * @property {string} [hint]
 * @property {string} [partialAnswer]
 * @property {string} [question]
 * @property {string} [answer]
 * @property {string} [questionType] — 'multipleChoice' | 'shortAnswer' | 'fillBlank' | 'trueFalse' | 'labeling' | 'writtenResponse'
 * @property {string[]} [options] — for MC questions
 * @property {string[]} [wordBank] — for fillBlank
 * @property {number} [ruledLines]
 * @property {boolean} [scaffolded] — true if item has hints or partial support
 * @property {string} [diagramType] — 'number-line' | 'fraction-bar' | 'grid' | 'table-diagram' | 'timeline' | 'graphic-organizer' | 'image' | 'arabic-text'
 * @property {string} [imageUrl] — for generated-image or verified-image sources
 * @property {string} [caption]
 * @property {string[]} [labels]
 * @property {string[]} [tableHeaders]
 * @property {string[][]} [tableRows]
 * @property {string} [arabicText] — vowelled Arabic text
 * @property {string} [englishTranslation]
 * @property {string} [writingFrameType] — 'venn' | 't-chart' | 'comparison' | 'claim-evidence-reasoning' | 'sequence' | 'cause-effect' | 'blank'
 * @property {string[]} [frameHeaders]
 * @property {string} [placeholderInstruction]
 * @property {string} [level] — 'below' | 'on' | 'above' (future differentiation)
 */

/**
 * @typedef {Object} Illustration
 * @property {boolean} required
 * @property {string} type — diagram, chart, map, timeline, visual-model, generated-image, verified-image, teacher-image, placeholder, arabic-text-block, graphic-organizer, data-table
 * @property {string} visualSource — formatter-shape | generated-image | verified-image | teacher-provided | placeholder
 * @property {string} purposeCategory
 * @property {string} placementSection — connect | learnModel | practiceTogether | onYourOwn | wrapUp | quiz
 * @property {string} studentAction — label | interpret | complete | observe
 * @property {boolean} labelsNeeded
 * @property {string} printMode — grayscale-safe | colour-optional | colour-required
 * @property {boolean} aiImageAllowed
 * @property {string} [safetyNotes]
 * @property {string} [imageUrl]
 * @property {string} [caption]
 * @property {string[]} [labels]
 */

/**
 * @typedef {Object} PracticeItem
 * @property {number} number
 * @property {string} prompt
 * @property {string} [hint]
 * @property {string} [partialAnswer]
 * @property {string} answer
 * @property {string} [explanation]
 * @property {number} [ruledLines]
 * @property {string} [questionType]
 * @property {string[]} [options]
 */

/**
 * @typedef {Object} QuizItem
 * @property {number} number
 * @property {'multipleChoice'|'shortAnswer'|'fillBlank'|'trueFalse'|'labeling'|'writtenResponse'|'matchTerms'} questionType
 * @property {string} question
 * @property {string[]} [options]
 * @property {string[]} [wordBank]
 * @property {string} answer
 * @property {string} explanation
 * @property {number} [ruledLines]
 * @property {string[]} [labels]
 * @property {string} [scenario]
 * @property {string[]} [definitions]
 * @property {string} [diagramDescription]
 */

/**
 * @typedef {Object} AnswerKeyEntry
 * @property {number} number
 * @property {string} correctAnswer
 * @property {string} explanation
 * @property {string} [lookFor] — "look-for" bullets for constructed responses
 * @property {string} [sampleResponse]
 */

/**
 * @typedef {Object} WorkbookV2Meta
 * @property {string} id
 * @property {number} grade — 4 | 5
 * @property {string} subject
 * @property {string} standardCode
 * @property {string} title — student-facing
 * @property {string} learningGoal — "I can..." statement
 * @property {number} estimatedTime — in minutes
 * @property {boolean} differentiationReady
 * @property {string} themeIcon — emoji for cover
 * @property {string} studentLevel
 * @property {string} lessonLength
 */

/**
 * @typedef {Object} WorkbookV2Sections
 * @property {{ title: string, blocks: ContentBlock[] }} connect
 * @property {{ title: string, blocks: ContentBlock[] }} learnModel
 * @property {{ items: PracticeItem[] }} practiceTogether
 * @property {{ items: PracticeItem[] }} onYourOwn
 * @property {{ title: string, blocks: ContentBlock[] }} wrapUp
 * @property {{ questions: QuizItem[], answerKey: AnswerKeyEntry[], title: string, headerInfo: string }} quiz
 */

/**
 * @typedef {Object} WorkbookV2Data
 * @property {WorkbookV2Meta} meta
 * @property {WorkbookV2Sections} sections
 * @property {Illustration[]} illustrations
 * @property {Object} [vocabulary] — array of {term, studentFriendlyDefinition}
 */

const THEME_ICONS = {
  'Rainbow Bright': '🌈',
  'Space Galaxy': '🚀',
  'Ocean Adventure': '🐋',
  'Jungle Safari': '🦁',
  'Superhero': '⚡',
  'Dinosaur World': '🦕',
  'Sports': '⚽',
};

export function getThemeIcon(theme) {
  return THEME_ICONS[theme] || THEME_ICONS['Rainbow Bright'];
}

export function getTopicV2Content() {
  return null;
}
