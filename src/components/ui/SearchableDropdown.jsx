import { useState, useRef, useEffect, useCallback } from 'react';

export default function SearchableDropdown({ options, value, onChange, placeholder = 'Select...', renderOption, getLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const defaultGetLabel = (opt) => {
    if (typeof opt === 'object' && opt.arabic) {
      return `${opt.arabic} — ${opt.english}`;
    }
    return String(opt);
  };

  const labelFn = getLabel || defaultGetLabel;

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 120);
    return () => clearTimeout(id);
  }, [search]);

  const filtered = options.filter((opt) => {
    if (!debouncedSearch) return true;
    const label = labelFn(opt.topic || opt).toLowerCase();
    return label.includes(debouncedSearch.toLowerCase());
  });

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollToFocused = useCallback((index) => {
    const el = listRef.current?.children[index];
    el?.scrollIntoView({ block: 'nearest' });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const next = Math.min(prev + 1, filtered.length - 1);
        scrollToFocused(next);
        return next;
      });
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const next = Math.max(prev - 1, 0);
        scrollToFocused(next);
        return next;
      });
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filtered[focusedIndex];
      if (selected) {
        const topic = selected.topic || selected;
        onChange(topic);
        setIsOpen(false);
        setSearch('');
      }
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setFocusedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSelect = useCallback((topic) => {
    onChange(topic);
    setIsOpen(false);
    setSearch('');
  }, [onChange]);

  const selectedLabel = value ? labelFn(value) : '';

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center border rounded-lg px-3 py-2.5 cursor-pointer bg-white transition-colors
          ${isOpen ? 'border-primary-500 ring-2 ring-primary-100' : 'border-slate-200 hover:border-slate-300'}`}
        onClick={handleOpen}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setFocusedIndex(0); }}
            placeholder={selectedLabel || placeholder}
            aria-label="Search topics"
            className="flex-1 outline-none text-sm bg-transparent"
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className={`flex-1 text-sm truncate ${value ? 'text-slate-800' : 'text-slate-400'}`}>
            {selectedLabel || placeholder}
          </span>
        )}
        <svg className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto" role="listbox">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-400">No results found</div>
          ) : (
            <div ref={listRef}>
              {filtered.map((opt, i) => {
                const topic = opt.topic || opt;
                const category = opt.category;
                const label = labelFn(topic);
                const isSelected = value && labelFn(value) === label;
                const isFocused = i === focusedIndex;

                const prevCategory = i > 0 ? filtered[i - 1].category : null;
                const showCategoryHeader = category && category !== prevCategory;

                return (
                  <div key={`${category}-${label}-${i}`}>
                    {showCategoryHeader && (
                      <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 bg-slate-50 sticky top-0">
                        {category}
                      </div>
                    )}
                    <div
                      role="option"
                      aria-selected={isSelected}
                      className={`px-3 py-2 text-sm cursor-pointer transition-colors
                        ${isSelected ? 'bg-primary-50 text-primary-700' : isFocused ? 'bg-primary-100 text-primary-800' : 'hover:bg-slate-50 text-slate-700'}`}
                      onClick={() => handleSelect(topic)}
                      onMouseEnter={() => setFocusedIndex(i)}
                    >
                      {renderOption ? renderOption(topic) : (
                        typeof topic === 'object' && topic.arabic ? (
                          <span>
                            <span lang="ar" dir="rtl" className="font-arabic">{topic.arabic}</span>
                            <span className="text-slate-400"> — </span>
                            <span>{topic.english}</span>
                          </span>
                        ) : label
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
