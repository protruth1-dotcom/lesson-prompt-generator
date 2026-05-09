import { useState, useCallback } from 'react';

const STORAGE_KEY = 'lessonPrompts';

export function useLocalStorage() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const save = useCallback((entry) => {
    setItems((prev) => {
      const updated = [entry, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        throw new Error('Storage is full. Please delete some saved prompts.');
      }
      return updated;
    });
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const importAll = useCallback((incoming) => {
    setItems((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const newItems = incoming.filter((i) => i.id && !existingIds.has(i.id));
      const updated = [...newItems, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        throw new Error('Storage is full. Please delete some saved prompts.');
      }
      return updated;
    });
  }, []);

  return { items, save, remove, importAll };
}
