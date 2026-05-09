import GradeSubjectCard from './GradeSubjectCard';
import TopicCard from './TopicCard';
import LessonSettingsCard from './LessonSettingsCard';
import QuizConfigCard from './QuizConfigCard';
import Card from '../layout/Card';
import ButtonGroup from '../ui/ButtonGroup';
import { loadSettings } from '../../utils/settings';

const promptModes = ['Template', 'AI Generated'];

export default function GeneratorView({ form, onGenerate, onCancel, onDismissError, loading, error }) {
  const settings = loadSettings();
  const hasApiKey = !!settings.apiKey;
  const isAIMode = form.promptMode === 'AI Generated';
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
            <p className="text-xs text-slate-500">
              {hasApiKey
                ? 'Uses your API key to craft a custom prompt tailored to your topic.'
                : (
                  <span className="text-amber-600">
                    API key required. Open Settings (gear icon) to add your API key.
                  </span>
                )
              }
            </p>
          )}
        </div>
      </Card>

      {loading && isAIMode ? (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 bg-violet-500 rounded-full animate-dot-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-violet-700">
              AI is crafting your prompt using {settings.model || 'gpt-4o'}
            </span>
          </div>
          <p className="text-xs text-violet-500 mb-4">
            The AI is building a detailed, topic-specific prompt based on your settings. This may take up to a minute.
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1.5 text-xs font-medium text-violet-600 bg-white border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-700">Generation failed</p>
              <p className="text-xs text-red-500 mt-1">{error}</p>
            </div>
            <button
              type="button"
              onClick={onDismissError}
              className="text-red-400 hover:text-red-600 cursor-pointer shrink-0"
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
              ? isAIMode
                ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-md hover:shadow-lg active:scale-[0.99]'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          title={needsKey ? 'Add your API key in Settings first' : !form.isValid ? 'Please complete all required fields' : ''}
        >
          {isAIMode ? 'Generate with AI' : 'Generate Prompt'}
        </button>
      )}
    </div>
  );
}
