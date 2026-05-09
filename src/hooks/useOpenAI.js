import { useState, useCallback, useRef } from 'react';
import { loadSettings } from '../utils/settings';

const ERROR_MESSAGES = {
  no_key: 'Please add your API key in Settings to use AI-generated prompts.',
  401: 'Invalid API key. Please check your key in Settings.',
  429: 'Too many requests. Please wait a moment and try again.',
  network: 'Could not connect to the API. Check your base URL and internet connection.',
  timeout: 'Request timed out. The AI may be busy — please try again.',
  empty_response: 'The AI returned an empty response. Check your model name and base URL.',
  insufficient_quota: 'Your account has insufficient credits. Please check your billing.',
  unknown: 'Something went wrong. Please try again or switch to Template mode.',
};

function extractContent(data) {
  const content = data?.choices?.[0]?.message?.content
    || data?.choices?.[0]?.text
    || data?.content
    || data?.response;
  if (content) return content;
  return null;
}

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const generate = useCallback(async (metaPrompt) => {
    const settings = loadSettings();
    if (!settings.apiKey) {
      setError(ERROR_MESSAGES.no_key);
      return null;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const baseUrl = settings.baseUrl.replace(/\/+$/, '');

    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey}`,
        },
        body: JSON.stringify({
          model: settings.model || 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are an expert educational prompt engineer specializing in creating detailed, comprehensive prompts for AI-generated lessons and quizzes aligned with educational standards. CRITICAL: Every prompt you write MUST include explicit, detailed instructions for showing correct answers and explanations when a student gets a question wrong. For interactive formats, this means auto-grading with feedback. For print formats, this means a complete answer key with explanations. Never omit grading and feedback instructions.',
            },
            {
              role: 'user',
              content: metaPrompt,
            },
          ],
          max_tokens: 8000,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let detail = '';
        try {
          const errData = await res.json();
          detail = errData?.error?.message || errData?.message || '';
        } catch { /* ignore parse errors */ }
        const msg = detail ? `API error: ${detail}` : ERROR_MESSAGES[res.status] || ERROR_MESSAGES.unknown;
        setError(msg);
        setLoading(false);
        return null;
      }

      const data = await res.json();

      if (data?.error) {
        setError(data.error.message || 'API returned an error. Check your model name and base URL.');
        setLoading(false);
        return null;
      }

      const content = extractContent(data);

      if (!content) {
        setError(ERROR_MESSAGES.empty_response);
        setLoading(false);
        return null;
      }

      setLoading(false);
      return content;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setError(ERROR_MESSAGES.timeout);
      } else {
        setError(ERROR_MESSAGES.network);
      }
      setLoading(false);
      return null;
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, generate, cancel, clearError };
}
