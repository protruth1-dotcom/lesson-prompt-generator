import { useState, useEffect, useRef } from 'react';
import { loadSettings, saveSettings } from '../../utils/settings';

const POPULAR_MODELS = [
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

function getModelInfo(model) {
  for (const group of POPULAR_MODELS) {
    if (group.models.includes(model)) return group;
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

  const isCustomModel = !getModelInfo(model) && model !== 'gpt-4o';

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
    const info = getModelInfo(m);
    const newBaseUrl = info?.baseUrl || baseUrl;
    if (info?.baseUrl) setBaseUrl(newBaseUrl);
    saveSettings({ apiKey, model: m, baseUrl: newBaseUrl });
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

  const modelInfo = getModelInfo(model);
  const displayModel = isCustomModel && customModel ? customModel : model;

  if (!isOpen) return null;

  return (
    <div className="settings-backdrop" role="dialog" aria-modal="true" aria-labelledby="settings-dialog-title" onClick={onClose}>
      <div ref={panelRef} className="settings-panel settings-panel--enter" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 id="settings-dialog-title" className="text-lg font-bold text-ink">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-soft hover:text-ink hover:bg-paper-lined transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="settings-section">
          <label className="settings-label">API Key</label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => { setApiKey(e.target.value); setTestStatus(null); }}
              placeholder="sk-..."
              className="input w-full pr-10 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink-soft hover:text-ink cursor-pointer"
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
          <p className="settings-hint">Your key is stored only in your browser and sent directly to the API endpoint you configure below.</p>
        </div>

        <div className="settings-section">
          <label className="settings-label">Base URL</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            onBlur={() => saveSettings({ apiKey, model: isCustomModel && customModel ? customModel : model, baseUrl })}
            placeholder="https://api.openai.com/v1"
            className="input w-full font-mono"
          />
          <p className="settings-hint">Default is OpenAI. Change this to use any OpenAI-compatible provider.</p>
        </div>

        <div className="settings-section">
          <label className="settings-label">Model</label>

          {isCustomModel ? (
            <div className="space-y-2">
              <input
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                onBlur={() => saveSettings({ apiKey, model: customModel || model, baseUrl })}
                placeholder="Enter model name"
                className="input w-full font-mono"
              />
              <button
                type="button"
                onClick={() => { setModel('gpt-4o'); setCustomModel(''); }}
                className="text-xs text-chalk-blue hover:underline cursor-pointer"
              >
                Choose from list instead
              </button>
            </div>
          ) : (
            <div ref={modelRef} className="relative">
              <button
                type="button"
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="dropdown-trigger text-left"
              >
                <span>
                  <span className="text-ink font-medium">{displayModel}</span>
                  {modelInfo && (
                    <span className="text-ink-soft ml-1.5">({modelInfo.provider})</span>
                  )}
                </span>
                <svg className={`w-4 h-4 text-ink-soft transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {modelDropdownOpen && (
                <div className="dropdown-menu">
                  {POPULAR_MODELS.map((group) => (
                    <div key={group.provider}>
                      <div className="dropdown-category-header">
                        {group.provider}
                      </div>
                      {group.models.map((m) => (
                        <div
                          key={m}
                          className={`dropdown-item ${model === m ? 'dropdown-item--selected' : ''}`}
                          onClick={() => handleModelSelect(m)}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="border-t border-[#E8E2D6]">
                    <div
                      className="dropdown-item text-ink-soft"
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
            className={`btn-primary ${saved ? 'bg-stamp-green' : ''}`}
          >
            {saved ? 'Saved!' : 'Save Key'}
          </button>
          <button
            type="button"
            onClick={handleTest}
            disabled={testStatus === 'testing'}
            className="btn-secondary"
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
              className="btn-destructive"
            >
              Remove Key
            </button>
          )}
        </div>

        {testStatus && testStatus !== 'testing' && (
          <div role="status" className={`text-sm rounded-lg px-3 py-2 ${
            testStatus === 'success' ? 'state-success' : 'state-error'
          }`}>
            {testMessage}
          </div>
        )}
      </div>
    </div>
  );
}
