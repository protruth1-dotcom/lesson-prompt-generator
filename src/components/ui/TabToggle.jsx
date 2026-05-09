export default function TabToggle({ tabs, activeTab, onChange }) {
  return (
    <div className="tab-toggle">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          aria-pressed={activeTab === tab}
          onClick={() => onChange(tab)}
          className={`tab-toggle-item ${activeTab === tab ? 'tab-toggle-item--active' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
