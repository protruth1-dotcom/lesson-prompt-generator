import { getTopicName } from '../data/curriculum';
import { getTopicContent } from '../data/workbookContent';

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

export function buildWorkbookData(formState) {
  const {
    grade, subject, topic, studentLevel = 'On Level',
    lessonLength = 'Medium', theme = 'Rainbow Bright',
    crossCurricular,
  } = formState;

  const topicContent = getTopicContent(subject, grade, topic);
  if (!topicContent) return null;

  const topicName = getTopicName(topic);
  const isIslamic = subject === 'Islamic Studies';
  const themeIcon = THEME_ICONS[theme] || THEME_ICONS['Rainbow Bright'];

  const meta = {
    title: topicName,
    subtitle: `${grade} ${subject}`,
    grade: grade || '',
    subject: subject || '',
    theme,
    themeIcon,
    studentLevel,
    lessonLength,
    gradeLevel: grade === '5th Grade' ? 'fifth-grade' : 'fourth-grade',
    crossCurricular: !!crossCurricular,
    isIslamic,
  };

  return {
    meta,
    sections: {
      priorKnowledge: topicContent.priorKnowledge,
      objectives: topicContent.objectives,
      engage: topicContent.engage,
      explore: topicContent.explore,
      explain: topicContent.explain,
      elaborate: topicContent.elaborate,
      summary: topicContent.summary,
      quiz: topicContent.quiz,
    },
  };
}
