import { useState, useCallback, useRef } from 'react';
import { loadSettings } from '../utils/settings';

const ERROR_MESSAGES = {
  no_key: 'Please add your API key in Settings to use AI-generated prompts.',
  401: 'Invalid API key. Please check your key in Settings.',
  429: 'Too many requests. Please wait a moment and try again.',
  network: 'Could not connect to the API. Please check your internet connection and base URL.',
  timeout: 'Request timed out. The AI may be busy — please try again.',
  content_filter: 'The AI could not generate this prompt. Please try again or use Template mode.',
  insufficient_quota: 'Your account has insufficient credits. Please check your billing.',
  unknown: 'Something went wrong. Please try again or switch to Template mode.',
};

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

    try {
      const res = await fetch(`${settings.baseUrl}/chat/completions`, {
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
        if (res.status === 401) {
          setError(ERROR_MESSAGES[401]);
        } else if (res.status === 429) {
          setError(ERROR_MESSAGES[429]);
        } else if (res.status === 402) {
          setError(ERROR_MESSAGES.insufficient_quota);
        } else {
          setError(ERROR_MESSAGES.unknown);
        }
        setLoading(false);
        return null;
      }

      const data = await res.json();

      if (!data.choices?.[0]?.message?.content) {
        setError(ERROR_MESSAGES.content_filter);
        setLoading(false);
        return null;
      }

      setLoading(false);
      return data.choices[0].message.content;
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
