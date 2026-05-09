export default function ButtonGroup({ options, value, onChange, disabled = false, label }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-ink mb-2">{label}</label>}
      <div className="btn-group">
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
              className={`btn-group-item ${isActive ? 'btn-group-item--active' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
