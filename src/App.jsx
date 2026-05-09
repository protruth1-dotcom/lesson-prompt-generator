import { useState, useCallback, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import GeneratorView from './components/generator/GeneratorView';
import PreviewView from './components/preview/PreviewView';
import HistoryView from './components/history/HistoryView';
import SettingsPanel from './components/settings/SettingsPanel';
import Toast from './components/ui/Toast';
import { useFormState } from './hooks/useFormState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useClipboard } from './hooks/useClipboard';
import { useOpenAI } from './hooks/useOpenAI';
import { buildPrompt } from './engine/promptBuilder';
import { buildMetaPrompt } from './engine/metaPromptBuilder';
import { buildLessonPrompt } from './engine/lessonBuilder';

export default function App() {
  const [activeView, setActiveView] = useState('generator');
  const [promptData, setPromptData] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsKey, setSettingsKey] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const rateLimitRef = useRef(0);
  const form = useFormState();
  const storage = useLocalStorage();
  const clipboard = useClipboard();
  const openai = useOpenAI();

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
  }, []);

  const buildPromptData = useCallback(() => ({
    grade: form.grade,
    subject: form.subject,
    topic: form.topic,
    targetAI: form.targetAI,
    lessonLength: form.lessonLength,
    studentLevel: form.studentLevel,
    crossCurricular: form.crossCurricular,
    outputFormat: form.outputFormat,
    theme: form.theme,
    promptMode: form.promptMode,
    quizMode: form.quizMode,
    totalQuestions: form.totalQuestions,
    difficulty: form.difficulty,
  }), [form]);

  const handleGenerate = useCallback(async () => {
    const data = buildPromptData();

    if (form.promptMode === 'AI Generated' || form.promptMode === 'AI Prompt') {
      const metaPrompt = buildMetaPrompt(form);
      const result = await openai.generate(metaPrompt);
      if (result) {
        setPromptData({ ...data, promptText: result });
        setActiveView('preview');
      } else if (openai.error) {
        showToast(openai.error);
      }
    } else if (form.promptMode === 'Direct Lesson') {
      const lessonPrompt = buildLessonPrompt(form);
      const result = await openai.generate(lessonPrompt, { maxTokens: 16000, timeout: 120000 });
      if (result) {
        setPromptData({ ...data, promptText: '', lessonHtml: result });
        setActiveView('preview');
      } else if (openai.error) {
        showToast(openai.error);
      }
    } else {
      const prompt = buildPrompt(form);
      setPromptData({ ...data, promptText: prompt });
      setActiveView('preview');
    }
  }, [form, buildPromptData, openai, showToast]);

  const handleRegenerate = useCallback(async () => {
    if (!promptData) return;

    const now = Date.now();
    if (now - rateLimitRef.current < 3000) {
      showToast('Please wait a moment before regenerating.');
      return;
    }
    rateLimitRef.current = now;

    if (promptData.promptMode === 'AI Generated' || promptData.promptMode === 'AI Prompt') {
      const metaPrompt = buildMetaPrompt(form);
      const result = await openai.generate(metaPrompt);
      if (result) {
        setPromptData((prev) => ({ ...prev, promptText: result }));
      } else if (openai.error) {
        showToast(openai.error);
      }
    } else if (promptData.promptMode === 'Direct Lesson') {
      const lessonPrompt = buildLessonPrompt(form);
      const result = await openai.generate(lessonPrompt, { maxTokens: 16000, timeout: 120000 });
      if (result) {
        setPromptData((prev) => ({ ...prev, lessonHtml: result }));
      } else if (openai.error) {
        showToast(openai.error);
      }
    } else {
      const prompt = buildPrompt(form);
      setPromptData((prev) => ({ ...prev, promptText: prompt }));
    }
  }, [form, promptData, openai, showToast]);

  const handleCopy = useCallback(async (text) => {
    const success = await clipboard.copy(text);
    if (success) showToast('Copied to clipboard!');
  }, [clipboard, showToast]);

  const handleSave = useCallback((data) => {
    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      promptMode: data.promptMode || 'Template',
      grade: data.grade,
      subject: data.subject,
      topic: data.topic,
      targetAI: data.targetAI,
      lessonLength: data.lessonLength,
      studentLevel: data.studentLevel,
      crossCurricular: data.crossCurricular,
      outputFormat: data.outputFormat,
      theme: data.theme,
      quizMode: data.quizMode,
      totalQuestions: data.totalQuestions,
      difficulty: data.difficulty,
      promptText: data.promptText,
      lessonHtml: data.lessonHtml || '',
    };
    try {
      storage.save(entry);
      showToast('Saved to history!');
    } catch (e) {
      showToast(e.message);
    }
  }, [storage, showToast]);

  const handleViewFromHistory = useCallback((entry) => {
    setPromptData(entry);
    setActiveView('preview');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        activeView={activeView}
        onNavigate={setActiveView}
        onOpenSettings={() => { setSettingsOpen(true); setSettingsKey(k => k + 1); }}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {activeView === 'generator' && (
          <GeneratorView
            form={form}
            onGenerate={handleGenerate}
            onCancel={() => { openai.cancel(); openai.clearError(); }}
            onDismissError={openai.clearError}
            loading={openai.loading}
            error={openai.error}
          />
        )}

        {activeView === 'preview' && promptData && (
          <PreviewView
            promptData={promptData}
            onBack={() => setActiveView('generator')}
            onCopy={handleCopy}
            onSave={handleSave}
            onRegenerate={handleRegenerate}
            copied={clipboard.copied}
            loading={openai.loading}
          />
        )}

        {activeView === 'history' && (
          <HistoryView
            items={storage.items}
            onView={handleViewFromHistory}
            onCopy={handleCopy}
            onDelete={storage.remove}
          />
        )}
      </main>

      <SettingsPanel
        key={settingsKey}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ visible: false, message: '' })}
      />
    </div>
  );
}
