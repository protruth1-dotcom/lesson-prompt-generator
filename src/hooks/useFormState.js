import { useState, useMemo, useEffect } from 'react';
import { getTopics } from '../data/curriculum';
import { calculateAutoDistribution } from '../data/quizDistributions';

export function useFormState() {
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);
  const [targetAI, setTargetAI] = useState('Claude');
  const [lessonLength, setLessonLength] = useState('Medium');
  const [studentLevel, setStudentLevel] = useState('On Level');
  const [crossCurricular, setCrossCurricular] = useState(false);
  const [outputFormat, setOutputFormat] = useState('Interactive');
  const [promptMode, setPromptMode] = useState('Template');
  const [quizMode, setQuizMode] = useState('Auto');
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('Balanced');
  const [manualCounts, setManualCounts] = useState({
    vocabulary: 0,
    multipleChoice: 0,
    trueFalse: 0,
    fillBlank: 0,
    shortAnswer: 0,
    diagramVisual: 0,
    scenarioBased: 0,
  });

  // Derived: topics list for current grade + subject
  const topics = useMemo(() => getTopics(grade, subject), [grade, subject]);

  // Derived: auto distribution
  const autoDistribution = useMemo(() => {
    if (quizMode !== 'Auto' || !subject) return null;
    return calculateAutoDistribution(subject, difficulty, totalQuestions);
  }, [subject, difficulty, totalQuestions, quizMode]);

  // Derived: manual sum
  const manualSum = useMemo(
    () => Object.values(manualCounts).reduce((a, b) => a + b, 0),
    [manualCounts]
  );

  // Derived: form validity
  const isValid = grade && subject && topic &&
    (quizMode === 'Auto' || manualSum === totalQuestions);

  // Reset topic when grade or subject changes
  useEffect(() => { setTopic(null); }, [grade, subject]);

  const updateManualCount = (key, value) => {
    setManualCounts((prev) => ({ ...prev, [key]: Math.max(0, value) }));
  };

  return {
    grade, setGrade,
    subject, setSubject,
    topic, setTopic,
    targetAI, setTargetAI,
    lessonLength, setLessonLength,
    studentLevel, setStudentLevel,
    crossCurricular, setCrossCurricular,
    outputFormat, setOutputFormat,
    promptMode, setPromptMode,
    quizMode, setQuizMode,
    totalQuestions, setTotalQuestions,
    difficulty, setDifficulty,
    manualCounts, updateManualCount,
    topics, autoDistribution, manualSum, isValid,
  };
}
