import { useState, useEffect, useRef } from 'react';
import { loadSettings, saveSettings } from '../../utils/settings';

const POPULAR_MODELS = [
  {
    provider: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'o1', 'o3-mini', 'gpt-4.1'],
  },
  {
    provider: 'DeepSeek',
    models: ['deepseek-chat', 'deepseek-reasoner'],
  },
  {
    provider: 'Gemini',
    models: ['gemini-2.5-flash', 'gemini-2.5-pro'],
  },
  {
    provider: 'Claude',
    models: ['claude-sonnet-4-20250514', 'claude-opus-4-20250514', 'claude-haiku-3.5'],
  },
  {
    provider: 'Kimi',
    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
  },
];

function getModelProvider(model) {
  for (const group of POPULAR_MODELS) {
    if (group.models.includes(model)) return group.provider;
  }
  return null;
}

export default function SettingsPanel({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(() => loadSettings().apiKey);
  const [model, setModel] = useState(() => loadSettings().model);
  const [baseUrl, setBaseUrl] = useState(() => loadSettings().baseUrl);
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState(null);
  const [testMessage, setTestMessage] = useState('');
  const [saved, setSaved] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [customModel, setCustomModel] = useState('');
  const panelRef = useRef(null);
  const modelRef = useRef(null);

  const isCustomModel = !getModelProvider(model) && model !== 'gpt-4o';

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setModelDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const handleSave = () => {
    const finalModel = isCustomModel ? customModel || model : model;
    saveSettings({ apiKey, model: finalModel, baseUrl });
    if (isCustomModel && customModel) setModel(customModel);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleModelSelect = (m) => {
    setModel(m);
    setModelDropdownOpen(false);
    saveSettings({ apiKey, model: m, baseUrl });
  };

  const handleCustomToggle = () => {
    setCustomModel(isCustomModel ? '' : model);
    setModelDropdownOpen(false);
  };

  const handleRemoveKey = () => {
    setApiKey('');
    saveSettings({ apiKey: '', model, baseUrl });
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
      const res = await fetch(`${baseUrl}/models`, {
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
      setTestMessage(err.name === 'AbortError' ? 'Connection timed out.' : 'Could not reach the API. Check your base URL and internet connection.');
    }
  };

  const modelProvider = getModelProvider(model);
  const displayModel = isCustomModel && customModel ? customModel : model;

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
          <label className="block text-sm font-medium text-slate-700">API Key</label>
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
          <p className="text-xs text-slate-400">Your key is stored only in your browser and sent directly to the API endpoint you configure below.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Base URL</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            onBlur={() => saveSettings({ apiKey, model: isCustomModel && customModel ? customModel : model, baseUrl })}
            placeholder="https://api.openai.com/v1"
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-colors font-mono"
          />
          <p className="text-xs text-slate-400">Default is OpenAI. Change this to use any OpenAI-compatible provider.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Model</label>

          {isCustomModel ? (
            <div className="space-y-2">
              <input
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                onBlur={() => saveSettings({ apiKey, model: customModel || model, baseUrl })}
                placeholder="Enter model name"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => { setModel('gpt-4o'); setCustomModel(''); }}
                className="text-xs text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                Choose from list instead
              </button>
            </div>
          ) : (
            <div ref={modelRef} className="relative">
              <button
                type="button"
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="w-full flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white hover:border-slate-300 transition-colors cursor-pointer text-left"
              >
                <span>
                  <span className="text-slate-800 font-medium">{displayModel}</span>
                  {modelProvider && (
                    <span className="text-slate-400 ml-1.5">({modelProvider})</span>
                  )}
                </span>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {modelDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
                  {POPULAR_MODELS.map((group) => (
                    <div key={group.provider}>
                      <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 bg-slate-50 sticky top-0">
                        {group.provider}
                      </div>
                      {group.models.map((m) => (
                        <div
                          key={m}
                          className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                            model === m ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                          onClick={() => handleModelSelect(m)}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="border-t border-slate-100">
                    <div
                      className="px-3 py-2 text-sm cursor-pointer text-slate-500 hover:bg-slate-50 transition-colors"
                      onClick={handleCustomToggle}
                    >
                      Custom model...
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
      </div>
    </div>
  );
}
