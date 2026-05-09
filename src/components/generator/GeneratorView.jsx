import GradeSubjectCard from './GradeSubjectCard';
import TopicCard from './TopicCard';
import LessonSettingsCard from './LessonSettingsCard';
import QuizConfigCard from './QuizConfigCard';
import Card from '../layout/Card';
import ButtonGroup from '../ui/ButtonGroup';
import { loadSettings } from '../../utils/settings';

const promptModes = ['Template', 'AI Prompt', 'Direct Lesson'];

export default function GeneratorView({ form, onGenerate, onCancel, onDismissError, loading, error }) {
  const settings = loadSettings();
  const hasApiKey = !!settings.apiKey;
  const isAI = form.promptMode === 'AI Generated' || form.promptMode === 'AI Prompt';
  const isAIMode = isAI || form.promptMode === 'Direct Lesson';
  const isDirectLesson = form.promptMode === 'Direct Lesson';
  const needsKey = isAIMode && !hasApiKey;

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
        theme={form.theme}
        onThemeChange={form.setTheme}
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

      <Card title="Prompt Mode">
        <div className="space-y-3">
          <ButtonGroup
            options={promptModes}
            value={form.promptMode}
            onChange={form.setPromptMode}
          />
          {isAIMode && (
            <p className="text-xs text-ink-soft">
              {hasApiKey
                ? isDirectLesson
                  ? 'Generates the complete lesson workbook directly using your API key.'
                  : 'Uses your API key to craft a custom prompt tailored to your topic.'
                : (
                  <span className="text-apple-red">
                    API key required. Open Settings (gear icon) to add your API key.
                  </span>
                )
              }
            </p>
          )}
        </div>
      </Card>

      {loading && isAIMode ? (
        <div className="state-loading">
          <div className="flex items-center gap-3 mb-3">
            <div className="loading-chalk-dust">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="loading-chalk-dust-particle"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-ink">
              {isDirectLesson
                ? `AI is creating your workbook using ${settings.model || 'gpt-4o'}`
                : `AI is crafting your prompt using ${settings.model || 'gpt-4o'}`}
            </span>
          </div>
          <p className="text-xs text-ink-soft mb-4">
            {isDirectLesson
              ? 'Generating a complete, themed lesson workbook with all content, quiz, and answer key. This may take up to 2 minutes.'
              : 'The AI is building a detailed, topic-specific prompt based on your settings. This may take up to a minute.'}
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      ) : error ? (
        <div className="state-error">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-apple-red mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">Generation failed</p>
              <p className="text-xs text-ink-soft mt-1">{error}</p>
            </div>
            <button
              type="button"
              onClick={onDismissError}
              className="text-ink-soft hover:text-ink cursor-pointer shrink-0"
              aria-label="Dismiss error"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={!canGenerate}
          onClick={onGenerate}
          aria-label={needsKey ? 'Add your API key in Settings first' : !form.isValid ? 'Please complete all required fields' : 'Generate prompt'}
          className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all cursor-pointer
            ${canGenerate
              ? 'btn-primary'
              : 'bg-paper-lined text-ink-soft cursor-not-allowed border border-rule-line'
            }`}
          title={needsKey ? 'Add your API key in Settings first' : !form.isValid ? 'Please complete all required fields' : ''}
        >
          {isDirectLesson ? 'Generate Workbook' : isAIMode ? 'Generate with AI' : 'Generate Prompt'}
        </button>
      )}
    </div>
  );
}
