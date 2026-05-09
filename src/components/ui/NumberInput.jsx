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
        <label className={`text-sm font-medium text-ink ${compact ? 'flex-1' : 'block mb-2'}`}>
          {label}
        </label>
      )}
      <div className="number-input-group">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="number-input-btn"
          aria-label="Decrease"
        >
          -
        </button>
        {isEditing ? (
          <div className="number-input-value">
            <input
              ref={inputRef}
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              min={min}
              max={max}
              aria-label={label || 'Number input'}
            />
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={handleFocus}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFocus(); }}
            className="number-input-value"
            aria-label={`${value}. Click to edit.`}
          >
            {value}
          </div>
        )}
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="number-input-btn"
          aria-label="Increase"
        >
          +
        </button>
      </div>
    </div>
  );
}
