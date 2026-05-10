import { useState, useCallback, useRef } from 'react';
import { getTopicName } from '../../data/curriculum';

function downloadPDF(html) {
  const w = window.open('', '_blank');
  w.document.write(html);
  w.document.close();
  setTimeout(() => w.print(), 800);
}

export default function PreviewView({ promptData, onBack, onCopy, onSave, onRegenerate, copied, loading }) {
  const [editedText, setEditedText] = useState(promptData.promptText);
  const [saved, setSaved] = useState(false);
  const iframeRef = useRef(null);

  const isAI = promptData.promptMode === 'AI Generated' || promptData.promptMode === 'AI Prompt';
  const isDirectLesson = promptData.promptMode === 'Direct Lesson';
  const isReadyMade = promptData.promptMode === 'Ready-made Workbook';
  const lessonHtml = promptData.lessonHtml || '';

  const handleSave = () => {
    onSave({ ...promptData, promptText: editedText, lessonHtml });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownloadPDF = useCallback(() => {
    if (lessonHtml) {
      downloadPDF(lessonHtml);
    }
  }, [lessonHtml]);

  const handleCopyHTML = useCallback(() => {
    if (lessonHtml) {
      navigator.clipboard.writeText(lessonHtml);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [lessonHtml]);

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
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Generator
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ink">
            {isReadyMade ? 'Workbook Preview' : isDirectLesson ? 'Lesson Preview' : 'Prompt Preview'}
          </h2>
          <span className={`badge ${
            isReadyMade ? 'state-ai-indicator--direct-lesson' : isDirectLesson ? 'state-ai-indicator--direct-lesson' : isAI ? 'state-ai-indicator' : ''
          }`}>
            {isReadyMade ? 'Ready-Made' : isDirectLesson ? 'Direct Lesson' : isAI ? 'AI Prompt' : 'Template'}
          </span>
        </div>
        <div className="flex gap-2">
          {lessonHtml && (
            <>
              <button
                type="button"
                onClick={handleCopyHTML}
                className={`btn-secondary ${saved ? 'bg-stamp-green text-white border-stamp-green' : ''}`}
              >
                {saved ? 'Copied HTML!' : 'Copy HTML'}
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="btn-primary"
              >
                Download PDF
              </button>
            </>
          )}
          {!lessonHtml && (
            <>
              <button
                type="button"
                onClick={() => onCopy(editedText)}
                className={`btn-primary ${copied ? 'bg-stamp-green' : ''}`}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className={`btn-secondary ${saved ? 'bg-stamp-green text-white border-stamp-green' : ''}`}
              >
                {saved ? 'Saved!' : 'Save to History'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => (
          <span key={i} className="badge badge--selected">
            {typeof chip === 'object' && chip.arabic ? `${chip.arabic} — ${chip.english}` : chip}
          </span>
        ))}
      </div>

      {lessonHtml ? (
        <div className="paper-surface" style={{ minHeight: '70vh' }}>
          <iframe
            ref={iframeRef}
            srcDoc={lessonHtml}
            title="Lesson Preview"
            className="w-full"
            style={{ height: 'calc(100vh - 280px)', minHeight: '600px', border: 'none' }}
            sandbox="allow-scripts"
          />
        </div>
      ) : (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          aria-label="Editable prompt text"
          className="w-full min-h-[500px] p-4 border border-[#D6D0C2] rounded-xl bg-white-bone text-sm leading-relaxed text-ink font-mono resize-y outline-none focus:border-pencil-yellow focus:ring-2 focus:ring-post-it-yellow"
          spellCheck={false}
        />
      )}

      {!isDirectLesson && !isReadyMade && lessonHtml && editedText && (
        <details className="mt-4">
          <summary className="text-sm font-semibold text-ink-soft cursor-pointer hover:text-ink">
            View Generated Prompt (for external AI use)
          </summary>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            aria-label="Editable prompt text"
            className="w-full min-h-[300px] mt-2 p-4 border border-[#D6D0C2] rounded-xl bg-white-bone text-sm leading-relaxed text-ink font-mono resize-y outline-none focus:border-pencil-yellow focus:ring-2 focus:ring-post-it-yellow"
            spellCheck={false}
          />
        </details>
      )}

      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink-soft hover:text-ink cursor-pointer"
        >
          Back to Generator
        </button>
        <div className="flex gap-2">
          {onRegenerate && (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={loading}
              className="btn-secondary"
            >
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Regenerating...
                </span>
              ) : isDirectLesson ? 'Regenerate Lesson' : isAI ? 'Regenerate with AI' : 'Regenerate'}
            </button>
          )}
          {lessonHtml && (
            <>
              <button
                type="button"
                onClick={handleCopyHTML}
                className="btn-secondary"
              >
                Copy HTML
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="btn-primary"
              >
                Download PDF
              </button>
            </>
          )}
          {!lessonHtml && (
            <button
              type="button"
              onClick={() => onCopy(editedText)}
              className={`btn-primary ${copied ? 'bg-stamp-green' : ''}`}
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
