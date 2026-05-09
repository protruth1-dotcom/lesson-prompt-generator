import { useState, useRef, useEffect } from 'react';

export default function SearchableDropdown({ options, value, onChange, placeholder = 'Select...', renderOption, getLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const defaultGetLabel = (opt) => {
    if (typeof opt === 'object' && opt.arabic) {
      return `${opt.arabic} — ${opt.english}`;
    }
    return String(opt);
  };

  const labelFn = getLabel || defaultGetLabel;

  const filtered = options.filter((opt) => {
    if (!search) return true;
    const label = labelFn(opt.topic || opt).toLowerCase();
    return label.includes(search.toLowerCase());
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

  const selectedLabel = value ? labelFn(value) : '';

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center border rounded-lg px-3 py-2.5 cursor-pointer bg-white transition-colors
          ${isOpen ? 'border-primary-500 ring-2 ring-primary-100' : 'border-slate-200 hover:border-slate-300'}`}
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 0); }}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={selectedLabel || placeholder}
            className="flex-1 outline-none text-sm bg-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
          />
        ) : (
          <span className={`flex-1 text-sm ${value ? 'text-slate-800' : 'text-slate-400'}`}>
            {selectedLabel || placeholder}
          </span>
        )}
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto" role="listbox">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-400">No results found</div>
          ) : (
            filtered.map((opt, i) => {
              const topic = opt.topic || opt;
              const category = opt.category;
              const label = labelFn(topic);
              const isSelected = value && labelFn(value) === label;

              // Show category header
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
                      ${isSelected ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50 text-slate-700'}`}
                    onClick={() => {
                      onChange(topic);
                      setIsOpen(false);
                      setSearch('');
                    }}
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
            })
          )}
        </div>
      )}
    </div>
  );
}
