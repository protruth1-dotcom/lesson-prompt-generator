const tabs = [
  { key: 'generator', label: 'Generator' },
  { key: 'history', label: 'History' },
];

export default function Navbar({ activeView, onNavigate, onOpenSettings }) {
  return (
    <nav className="bg-paper border-b border-[#E8E2D6] sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <button
            type="button"
            onClick={() => onNavigate('generator')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to generator"
          >
            <svg className="w-7 h-7 shrink-0" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="#2A4035"/>
              <path d="M12 14h9v18l-4.5-3-4.5 3V14z" fill="#fff" opacity="0.9"/>
              <path d="M27 14h9v18l-4.5-3-4.5 3V14z" fill="#fff" opacity="0.7"/>
              <path d="M24 8l2 5-2-5zM28 11l-5 2 5-2zM20 11l5 2-5-2zM24 14l-2-5 2 5z" fill="#FCD34D"/>
              <circle cx="24" cy="11" r="1.5" fill="#F59E0B"/>
            </svg>
            <h1 className="text-lg font-bold text-ink tracking-tight">
              Lesson Prompt Generator
            </h1>
          </button>
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                aria-current={activeView === tab.key || (activeView === 'preview' && tab.key === 'generator') ? 'page' : undefined}
                onClick={() => onNavigate(tab.key)}
                className={`tab-nav ${activeView === tab.key || (activeView === 'preview' && tab.key === 'generator') ? 'tab-nav--active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={onOpenSettings}
              className="ml-1 p-2 rounded-lg text-ink-soft hover:text-ink hover:bg-paper-lined transition-colors cursor-pointer"
              aria-label="Settings"
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
