import GradeSubjectCard from './GradeSubjectCard';
import TopicCard from './TopicCard';
import LessonSettingsCard from './LessonSettingsCard';
import QuizConfigCard from './QuizConfigCard';
import Card from '../layout/Card';
import ButtonGroup from '../ui/ButtonGroup';
import { loadSettings } from '../../utils/settings';

const promptModes = ['Template', 'AI Generated'];

export default function GeneratorView({ form, onGenerate, onCancel, loading }) {
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
