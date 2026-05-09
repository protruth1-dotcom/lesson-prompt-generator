import { useState, useEffect, useRef } from 'react';
import { loadSettings, saveSettings } from '../../utils/settings';

export default function SettingsPanel({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(() => loadSettings().openaiApiKey);
  const [model, setModel] = useState(() => loadSettings().openaiModel);
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState(null);
  const [testMessage, setTestMessage] = useState('');
  const [saved, setSaved] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSave = () => {
    saveSettings({ openaiApiKey: apiKey, openaiModel: model });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRemoveKey = () => {
    setApiKey('');
    saveSettings({ openaiApiKey: '', openaiModel: model });
    setTestStatus(null);
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestStatus('error');
      setTestMessage('Please enter an API key first.');
      return;
    }
    setTestStatus('testing');
    setTestMessage('');
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${apiKey.trim()}` },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) {
        setTestStatus('success');
        setTestMessage('Connected successfully!');
      } else if (res.status === 401) {
        setTestStatus('error');
        setTestMessage('Invalid API key. Please check and try again.');
      } else {
        setTestStatus('error');
        setTestMessage(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      setTestStatus('error');
      setTestMessage(err.name === 'AbortError' ? 'Connection timed out.' : 'Could not connect to OpenAI. Check your internet connection.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" role="dialog" aria-modal="true" aria-labelledby="settings-dialog-title">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div ref={panelRef} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5 animate-slide-up">
        <div className="flex items-center justify-between">
          <h2 id="settings-dialog-title" className="text-lg font-bold text-slate-800">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">OpenAI API Key</label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => { setApiKey(e.target.value); setTestStatus(null); }}
              placeholder="sk-..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 pr-10 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-colors font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label={showKey ? 'Hide key' : 'Show key'}
            >
              {showKey ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400">Your API key stays in your browser and is sent only to OpenAI's servers. We do not store, transmit, or have access to your key.</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {saved ? 'Saved!' : 'Save Key'}
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={testStatus === 'testing'}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
          >
            {testStatus === 'testing' ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Testing...
              </span>
            ) : 'Test Connection'}
          </button>
          {apiKey && (
            <button
              type="button"
              onClick={handleRemoveKey}
              className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-all cursor-pointer"
            >
              Remove Key
            </button>
          )}
        </div>

        {testStatus && testStatus !== 'testing' && (
          <div role="status" className={`text-sm rounded-lg px-3 py-2 ${
            testStatus === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}>
            {testMessage}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Model</label>
          <div className="flex gap-2">
            {[
              { value: 'gpt-4o', label: 'GPT-4o (Recommended)' },
              { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Faster)' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setModel(opt.value);
                  saveSettings({ openaiApiKey: apiKey, openaiModel: opt.value });
                }}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                  model === opt.value
                    ? 'bg-primary-50 border-primary-300 text-primary-700'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
                aria-pressed={model === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
