const SETTINGS_KEY = 'lpg_settings';

function encode(str) {
  return btoa(str);
}

function decode(str) {
  try {
    return atob(str);
  } catch {
    return '';
  }
}

export function loadSettings() {
  try {
    const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
    return {
      apiKey: raw.apiKey ? decode(raw.apiKey) : (raw.openaiApiKey ? decode(raw.openaiApiKey) : ''),
      model: raw.model || raw.openaiModel || 'gpt-4o',
      baseUrl: raw.baseUrl || 'https://api.openai.com/v1',
    };
  } catch {
    return { apiKey: '', model: 'gpt-4o', baseUrl: 'https://api.openai.com/v1' };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      apiKey: settings.apiKey ? encode(settings.apiKey) : '',
      model: settings.model,
      baseUrl: settings.baseUrl,
    }),
  );
}
