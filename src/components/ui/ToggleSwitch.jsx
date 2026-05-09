export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer
          ${checked ? 'bg-primary-600' : 'bg-slate-300'}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </label>
  );
}
