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
        className={`dropdown-trigger ${isOpen ? 'dropdown-trigger--open' : ''}`}
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
          <span className={`flex-1 text-sm truncate ${value ? 'text-ink' : 'text-ink-soft'}`}>
            {selectedLabel || placeholder}
          </span>
        )}
        <svg className={`w-4 h-4 text-ink-soft transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          {filtered.length === 0 ? (
            <div className="dropdown-empty">No results found</div>
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
                      <div className="dropdown-category-header">
                        {category}
                      </div>
                    )}
                    <div
                      role="option"
                      aria-selected={isSelected}
                      className={`dropdown-item ${isSelected ? 'dropdown-item--selected' : isFocused ? 'dropdown-item--highlighted' : ''}`}
                      onClick={() => handleSelect(topic)}
                      onMouseEnter={() => setFocusedIndex(i)}
                    >
                      {renderOption ? renderOption(topic) : (
                        typeof topic === 'object' && topic.arabic ? (
                          <span>
                            <span lang="ar" dir="rtl" className="arabic-term">{topic.arabic}</span>
                            <span className="text-ink-soft"> — </span>
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
