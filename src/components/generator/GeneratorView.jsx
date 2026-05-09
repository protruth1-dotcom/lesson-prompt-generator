import GradeSubjectCard from './GradeSubjectCard';
import TopicCard from './TopicCard';
import LessonSettingsCard from './LessonSettingsCard';
import QuizConfigCard from './QuizConfigCard';
import Card from '../layout/Card';
import ButtonGroup from '../ui/ButtonGroup';
import { loadSettings } from '../../utils/settings';

const promptModes = ['Template', 'AI Generated'];

export default function GeneratorView({ form, onGenerate, loading }) {
  const hasApiKey = !!loadSettings().openaiApiKey;
  const isAIMode = form.promptMode === 'AI Generated';
  const needsKey = isAIMode && !hasApiKey;

  const buttonLabel = loading
    ? 'Generating...'
    : isAIMode
      ? 'Generate with AI'
      : 'Generate Prompt';

  const canGenerate = form.isValid && !loading && !needsKey;

  return (
    <div className="space-y-5">
      <GradeSubjectCard
        grade={form.grade}
        subject={form.subject}
        onGradeChange={form.setGrade}
        onSubjectChange={form.setSubject}
      />

      <TopicCard
        topics={form.topics}
        topic={form.topic}
        onTopicChange={form.setTopic}
        grade={form.grade}
        subject={form.subject}
      />

      <LessonSettingsCard
        targetAI={form.targetAI}
        onTargetAIChange={form.setTargetAI}
        lessonLength={form.lessonLength}
        onLessonLengthChange={form.setLessonLength}
        studentLevel={form.studentLevel}
        onStudentLevelChange={form.setStudentLevel}
        crossCurricular={form.crossCurricular}
        onCrossCurricularChange={form.setCrossCurricular}
        outputFormat={form.outputFormat}
        onOutputFormatChange={form.setOutputFormat}
      />

      <QuizConfigCard
        quizMode={form.quizMode}
        onQuizModeChange={form.setQuizMode}
        totalQuestions={form.totalQuestions}
        onTotalQuestionsChange={form.setTotalQuestions}
        difficulty={form.difficulty}
        onDifficultyChange={form.setDifficulty}
        autoDistribution={form.autoDistribution}
        manualCounts={form.manualCounts}
        onManualCountChange={form.updateManualCount}
        manualSum={form.manualSum}
      />

      {/* Prompt Mode Card */}
      <Card title="Prompt Mode">
        <div className="space-y-3">
          <ButtonGroup
            options={promptModes}
            value={form.promptMode}
            onChange={form.setPromptMode}
          />
          {isAIMode && (
            <p className="text-xs text-slate-500">
              {hasApiKey
                ? 'Uses your ChatGPT API key to craft a custom prompt tailored to your topic.'
                : (
                  <span className="text-amber-600">
                    API key required. Open Settings (gear icon) to add your OpenAI API key.
                  </span>
                )
              }
            </p>
          )}
        </div>
      </Card>

      {/* Generate Button */}
      <button
        type="button"
        disabled={!canGenerate}
        onClick={onGenerate}
        aria-label={needsKey ? 'Add your OpenAI API key in Settings first' : !form.isValid ? 'Please complete all required fields' : 'Generate prompt'}
        className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all cursor-pointer
          ${canGenerate
            ? isAIMode
              ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-md hover:shadow-lg active:scale-[0.99]'
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-[0.99]'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        title={needsKey ? 'Add your OpenAI API key in Settings first' : !form.isValid ? 'Please complete all required fields' : ''}
      >
        {loading && (
          <svg className="inline w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {buttonLabel}
      </button>
    </div>
  );
}
