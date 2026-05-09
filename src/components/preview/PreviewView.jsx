import { useState } from 'react';
import { getTopicName } from '../../data/curriculum';

export default function PreviewView({ promptData, onBack, onCopy, onSave, onRegenerate, copied, loading }) {
  const [editedText, setEditedText] = useState(promptData.promptText);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave({ ...promptData, promptText: editedText });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const isAI = promptData.promptMode === 'AI Generated';

  const chips = [
    promptData.grade,
    promptData.subject,
    getTopicName(promptData.topic),
    promptData.targetAI,
    promptData.lessonLength,
    promptData.studentLevel,
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Generator
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-800">Prompt Preview</h2>
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
            isAI ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-500'
          }`}>
            {isAI ? 'AI Generated' : 'Template'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onCopy(editedText)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${copied
                ? 'bg-emerald-500 text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer
              ${saved
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            {saved ? 'Saved!' : 'Save to History'}
          </button>
        </div>
      </div>

      {/* Metadata chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => (
          <span key={i} className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-medium">
            {typeof chip === 'object' && chip.arabic ? `${chip.arabic} — ${chip.english}` : chip}
          </span>
        ))}
      </div>

      {/* Editable prompt text */}
      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        className="w-full min-h-[500px] p-4 border border-slate-200 rounded-xl bg-white text-sm leading-relaxed text-slate-800 font-mono resize-y outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        spellCheck={false}
      />

      {/* Bottom actions */}
      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          Back to Generator
        </button>
        <div className="flex gap-2">
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={loading}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                isAI
                  ? 'border-violet-200 text-violet-600 hover:bg-violet-50 disabled:opacity-50'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Regenerating...
                </span>
              ) : isAI ? 'Regenerate with AI' : 'Regenerate'}
            </button>
          )}
          <button
            type="button"
            onClick={() => onCopy(editedText)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
              ${copied
                ? 'bg-emerald-500 text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
              }`}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
