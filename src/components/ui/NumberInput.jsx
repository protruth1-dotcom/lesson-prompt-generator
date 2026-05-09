export default function NumberInput({ value, onChange, min = 0, max = 100, label, compact = false }) {
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
          −
        </button>
        <span className="px-4 py-1.5 text-sm font-semibold text-slate-800 min-w-[2.5rem] text-center bg-white">
          {value}
        </span>
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
