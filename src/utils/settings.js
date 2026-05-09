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
      openaiApiKey: raw.openaiApiKey ? decode(raw.openaiApiKey) : '',
      openaiModel: raw.openaiModel || 'gpt-4o',
    };
  } catch {
    return { openaiApiKey: '', openaiModel: 'gpt-4o' };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      openaiApiKey: settings.openaiApiKey ? encode(settings.openaiApiKey) : '',
      openaiModel: settings.openaiModel,
    }),
  );
}
