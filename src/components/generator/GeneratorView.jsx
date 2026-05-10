import { useState } from 'react';
import GradeSubjectCard from './GradeSubjectCard';
import TopicCard from './TopicCard';
import LessonSettingsCard from './LessonSettingsCard';
import QuizConfigCard from './QuizConfigCard';
import Card from '../layout/Card';
import ButtonGroup from '../ui/ButtonGroup';
import { loadSettings, saveSettings } from '../../utils/settings';

const promptModes = [
  { value: 'Ready-made Workbook', label: 'Ready-made Workbook' },
  { value: 'Template Prompt', label: 'Template Prompt' },
  { value: 'AI Prompt', label: 'AI Prompt' },
  { value: 'Direct Lesson', label: 'Direct Lesson' },
];

const CUSTOM_MODEL_VALUE = '__custom_model__';
const modelGroups = [
  {
    provider: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-5.5', 'gpt-4o', 'gpt-4o-mini', 'o1', 'o3-mini', 'gpt-4.1'],
  },
  {
    provider: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    models: ['deepseek-v4-pro', 'deepseek-chat', 'deepseek-reasoner'],
  },
  {
    provider: 'Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    models: ['gemini-3.1-pro', 'gemini-2.5-flash', 'gemini-2.5-pro'],
  },
  {
    provider: 'Claude',
    baseUrl: 'https://api.anthropic.com/v1',
    models: ['claude-opus-4.7', 'claude-sonnet-4-20250514', 'claude-opus-4-20250514', 'claude-haiku-3.5'],
  },
  {
    provider: 'Kimi',
    baseUrl: 'https://api.moonshot.cn/v1',
    models: ['kimi-2.6', 'moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
  },
];

function findModel(model) {
  for (const group of modelGroups) {
    if (group.models.includes(model)) return group;
  }
  return null;
}

export default function GeneratorView({ form, onGenerate, onCancel, onDismissError, loading, error, workbookOutput, onWorkbookOutputChange, showAdvanced, onToggleAdvanced }) {
  const [aiSettings, setAiSettings] = useState(() => loadSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);
  const hasApiKey = !!aiSettings.apiKey.trim();
  const isAI = form.promptMode === 'AI Generated' || form.promptMode === 'AI Prompt';
  const isAIMode = isAI || form.promptMode === 'Direct Lesson';
  const isDirectLesson = form.promptMode === 'Direct Lesson';
  const isReadyMade = form.promptMode === 'Ready-made Workbook';
  const needsKey = isAIMode && !hasApiKey;
  const missingRequired = !form.grade || !form.subject || !form.topic;

  const canGenerate = !missingRequired && !loading && !needsKey &&
    (isReadyMade || form.isValid);
  const selectedModelValue = findModel(aiSettings.model) ? aiSettings.model : CUSTOM_MODEL_VALUE;

  const updateAiSetting = (key, value) => {
    setAiSettings((prev) => ({ ...prev, [key]: value }));
    setSettingsSaved(false);
  };

  const handleModelSelect = (value) => {
    if (value === CUSTOM_MODEL_VALUE) {
      if (selectedModelValue !== CUSTOM_MODEL_VALUE) {
        updateAiSetting('model', '');
      }
      return;
    }

    const group = findModel(value);
    setAiSettings((prev) => ({
      ...prev,
      model: value,
      baseUrl: group?.baseUrl || prev.baseUrl,
    }));
    setSettingsSaved(false);
  };

  const handleSaveAiSettings = () => {
    saveSettings({
      apiKey: aiSettings.apiKey.trim(),
      baseUrl: aiSettings.baseUrl.trim() || 'https://api.openai.com/v1',
      model: aiSettings.model.trim() || 'gpt-4o',
    });
    setAiSettings(loadSettings());
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

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

      <Card title="Workbook Source">
        <div className="space-y-3">
          <ButtonGroup
            options={showAdvanced ? promptModes : promptModes.filter(m => m.value === 'Ready-made Workbook')}
            value={form.promptMode}
            onChange={form.setPromptMode}
          />
          {isReadyMade && (
            <p className="text-xs text-ink-soft">
              Main mode. Uses the ready-made content library for the selected standard/topic and formats it as a printable workbook.
            </p>
          )}
          {form.promptMode === 'Template Prompt' && (
            <p className="text-xs text-ink-soft">
              Secondary mode. No API key needed. This creates a detailed prompt you can copy into ChatGPT, Claude, Gemini, or another AI yourself.
            </p>
          )}
          {isAIMode && (
            <div className="text-xs text-ink-soft space-y-1.5">
              {hasApiKey
                ? isDirectLesson
                  ? 'This mode uses your saved API key to ask the AI to generate a complete custom workbook for this standard/topic.'
                  : 'This mode uses your saved API key to ask the AI to write a stronger custom prompt for this standard/topic.'
                : (
                  <>
                    <p className="font-semibold text-apple-red">
                      This option needs an API key before it can run.
                    </p>
                    <p>
                      Paste your AI connection details below, save them, then click this button again. If you do not have an API key, use Ready-made Workbook or Template Prompt instead.
                    </p>
                  </>
                )
              }
            </div>
          )}
          <button type="button" onClick={onToggleAdvanced} className="text-xs text-ink-soft hover:text-ink transition-colors cursor-pointer bg-transparent border-none p-0 underline-offset-2 underline decoration-dotted">
            {showAdvanced ? 'Hide advanced modes' : 'Show advanced modes'}
          </button>
        </div>
      </Card>

      {isReadyMade && (
        <Card title="Output">
          <div className="space-y-2">
            <div className="btn-group">
              <button
                type="button"
                className={`btn-group-item ${workbookOutput === 'student' ? 'btn-group-item--active' : ''}`}
                onClick={() => onWorkbookOutputChange('student')}
              >
                Student Workbook
              </button>
              <button
                type="button"
                className={`btn-group-item ${workbookOutput === 'teacher' ? 'btn-group-item--active' : ''}`}
                onClick={() => onWorkbookOutputChange('teacher')}
              >
                Teacher Answer Key
              </button>
            </div>
          </div>
        </Card>
      )}

      {isAIMode && !hasApiKey && (
        <Card title="AI Setup">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Model</label>
              <select
                value={selectedModelValue}
                onChange={(e) => handleModelSelect(e.target.value)}
                className="input w-full font-mono"
              >
                {modelGroups.map((group) => (
                  <optgroup key={group.provider} label={group.provider}>
                    {group.models.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </optgroup>
                ))}
                <option value={CUSTOM_MODEL_VALUE}>Other / custom model</option>
              </select>
            </div>

            {selectedModelValue === CUSTOM_MODEL_VALUE && (
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Other Model Name</label>
                <input
                  type="text"
                  value={aiSettings.model}
                  onChange={(e) => updateAiSetting('model', e.target.value)}
                  placeholder="Enter model name"
                  className="input w-full font-mono"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Base URL</label>
              <input
                type="text"
                value={aiSettings.baseUrl}
                onChange={(e) => updateAiSetting('baseUrl', e.target.value)}
                placeholder="https://api.openai.com/v1"
                className="input w-full font-mono"
              />
              <p className="settings-hint mt-1">
                This fills automatically for listed models. Change it only if your provider gives you a different endpoint.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">API Key</label>
              <input
                type="password"
                value={aiSettings.apiKey}
                onChange={(e) => updateAiSetting('apiKey', e.target.value)}
                placeholder="sk-..."
                className="input w-full font-mono"
              />
              <div className="state-warning mt-3 text-xs leading-relaxed">
                <p className="font-semibold text-ink mb-1">Important: this uses your own AI account.</p>
                <p>
                  Your API key is saved only in this browser on this device. It is not uploaded to this app, not saved on a server, and not shared with us. When you generate with AI, your browser sends the request directly to the Base URL you enter above.
                </p>
                <p className="mt-1">
                  Any AI usage or charges belong to the account connected to that API key. If you are not sure what an API key is, use Ready-made Workbook or Template Prompt instead.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveAiSettings}
              disabled={!aiSettings.apiKey.trim()}
              className={`btn-primary ${settingsSaved ? 'bg-stamp-green' : ''} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {settingsSaved ? 'Saved!' : 'Save AI Settings'}
            </button>
          </div>
        </Card>
      )}

      {!isReadyMade && (
        <>
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
        </>
      )}

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
                ? `AI is creating your workbook using ${aiSettings.model || 'gpt-4o'}`
                : `AI is crafting your prompt using ${aiSettings.model || 'gpt-4o'}`}
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
          aria-label={needsKey ? 'Add your API key in Settings first' : missingRequired ? 'Please choose a grade, subject, and topic' : !canGenerate ? 'Please complete the required settings' : 'Generate'}
          className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all cursor-pointer
            ${canGenerate
              ? 'btn-primary'
              : 'bg-paper-lined text-ink-soft cursor-not-allowed border border-rule-line'
            }`}
          title={needsKey ? 'Add your API key in Settings first' : missingRequired ? 'Please choose a grade, subject, and topic' : !canGenerate ? 'Please complete the required settings' : ''}
        >
          {isReadyMade ? 'Create Ready-made Workbook' : isDirectLesson ? 'Generate Workbook' : isAIMode ? 'Generate with AI' : 'Generate Template Prompt'}
        </button>
      )}
    </div>
  );
}
