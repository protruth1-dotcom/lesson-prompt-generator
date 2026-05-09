import { useRef, useState, useCallback } from 'react';

export default function NumberInput({ value, onChange, min = 0, max = 100, label, compact = false }) {
  const inputRef = useRef(null);
  const [editValue, setEditValue] = useState(String(value));
  const [isEditing, setIsEditing] = useState(false);

  const commit = useCallback((raw) => {
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) {
      setEditValue(String(value));
      return;
    }
    const clamped = Math.max(min, Math.min(max, parsed));
    onChange(clamped);
    setEditValue(String(clamped));
  }, [value, onChange, min, max]);

  const handleBlur = () => {
    setIsEditing(false);
    commit(editValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      commit(editValue);
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setEditValue(String(value));
      setIsEditing(false);
    }
  };

  const handleFocus = () => {
    setEditValue(String(value));
    setIsEditing(true);
  };

  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className={compact ? 'flex items-center gap-2' : ''}>
      {label && (
        <label className={`text-sm font-medium text-slate-700 ${compact ? 'flex-1' : 'block mb-2'}`}>
          {label}
        </label>
      )}
      <div className="flex items-center gap-0 border border-slate-200 rounded-lg overflow-hidden w-fit">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease"
        >
          -
        </button>
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            className="w-16 px-2 py-1.5 text-sm font-semibold text-slate-800 text-center bg-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={min}
            max={max}
            aria-label={label || 'Number input'}
          />
        ) : (
          <button
            type="button"
            onClick={handleFocus}
            className="px-4 py-1.5 text-sm font-semibold text-slate-800 min-w-[2.5rem] text-center bg-white hover:bg-primary-50 cursor-pointer transition-colors"
            aria-label={`${value}. Click to edit.`}
          >
            {value}
          </button>
        )}
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
          aria-label="Increase"
        >
          +
        </button>
      </div>
    </div>
  );
}
