export default function ButtonGroup({ options, value, onChange, disabled = false, label }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
      <div className="flex flex-wrap gap-1">
        {options.map((option) => {
          const optValue = typeof option === 'string' ? option : option.value;
          const optLabel = typeof option === 'string' ? option : option.label;
          const isActive = value === optValue;
          return (
            <button
              key={optValue}
              type="button"
              disabled={disabled}
              aria-pressed={isActive}
              onClick={() => onChange(optValue)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border cursor-pointer
                ${isActive
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-white text-primary-700 border-slate-200 hover:bg-primary-50 hover:border-primary-300'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
