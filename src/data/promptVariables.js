// All variable lookup tables from 03_PROMPT_ENGINE.md

export const gradeVariables = {
  '4th Grade': { grade: '4th Grade', gradeLevel: 'fourth-grade' },
  '5th Grade': { grade: '5th Grade', gradeLevel: 'fifth-grade' },
};

export const studentLevelVariables = {
  'Below Level': {
    studentLevel: 'Below Level',
    studentLevelDescription: 'students performing below grade level',
    studentLevelAdjustment: '. Simplify vocabulary further, use shorter sentences, and provide more concrete examples.',
    studentLevelDetail: 'Use 1-2 grade levels below reading complexity. More repetition and concrete examples.',
  },
  'On Level': {
    studentLevel: 'On Level',
    studentLevelDescription: 'students performing at grade level',
    studentLevelAdjustment: '.',
    studentLevelDetail: 'Standard grade-level complexity.',
  },
  'Above Level': {
    studentLevel: 'Above Level',
    studentLevelDescription: 'advanced students performing above grade level',
    studentLevelAdjustment: '. Use richer vocabulary, include more nuance, and challenge with abstract connections.',
    studentLevelDetail: 'Use enriched vocabulary and extended depth. Include bonus challenge connections.',
  },
};

export const lessonLengthVariables = {
  Short: {
    lessonLengthDescription: 'a focused 15-minute mini-lesson',
    lessonLengthEngageDetail: '1-2 sentences — a quick hook question or surprising fact',
    lessonLengthExploreDetail: 'One quick guided question for the student to consider.',
    lessonLengthExplainDetail: 'Keep the Explain section to the essential core concept only. 2-3 short paragraphs maximum.',
    lessonLengthElaborateDetail: 'One sentence applying the concept to a new situation.',
    didYouKnowCount: '1',
    summaryPointCount: '3',
  },
  Medium: {
    lessonLengthDescription: 'a standard 30-minute lesson',
    lessonLengthEngageDetail: 'a short paragraph — a scenario, story opening, or thought-provoking question',
    lessonLengthExploreDetail: 'A brief activity or thought experiment (2-3 sentences of setup).',
    lessonLengthExplainDetail: 'Cover the full topic with moderate depth. Include all required elements.',
    lessonLengthElaborateDetail: 'A short paragraph with a new application scenario.',
    didYouKnowCount: '2',
    summaryPointCount: '3-5',
  },
  Long: {
    lessonLengthDescription: 'a comprehensive 45-minute deep-dive lesson',
    lessonLengthEngageDetail: 'a full engaging opening — a story, scenario, demonstration description, or multi-part question',
    lessonLengthExploreDetail: 'A more involved exploration: a guided observation, a mini-activity, or a series of discovery questions.',
    lessonLengthExplainDetail: 'Expand the Explain section with additional examples, deeper explanations, multiple visuals, and extended vocabulary work.',
    lessonLengthElaborateDetail: 'A full elaboration with discussion questions, a new scenario, and student reflection prompts.',
    didYouKnowCount: '2-3',
    summaryPointCount: '5',
  },
};

export const engageInstructions = {
  Math: 'Start with a real-world math puzzle, a surprising number fact, or a \'Would you rather\' math scenario that connects to the topic.',
  ELA: 'Start with an intriguing quote, a short mystery, a compelling story opening, or a question about language the student encounters daily.',
  Science: 'Start with a \'What would happen if...\' question, a surprising science fact, or a real-world phenomenon the student can observe.',
  'Social Studies': 'Start with a \'What would you do if you lived in...\' scenario, a surprising historical fact, or a connection between a past event and something the student sees today.',
  'Islamic Studies': 'Start with a relevant ayah or hadith that introduces the topic\'s core message, a real-life scenario a student might face, or a question about how this topic applies to their daily life.',
};
