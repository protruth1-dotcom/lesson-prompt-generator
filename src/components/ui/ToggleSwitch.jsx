export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`toggle-switch ${checked ? 'toggle-switch--on' : ''}`}
      >
        <span className="sr-only">Toggle {label}</span>
      </button>
    </div>
  );
}
