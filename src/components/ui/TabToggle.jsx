export default function TabToggle({ tabs, activeTab, onChange }) {
  return (
    <div className="flex bg-slate-100 rounded-lg p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={activeTab === tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer
            ${activeTab === tab
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
