const tabs = [
  { key: 'generator', label: 'Generator' },
  { key: 'history', label: 'History' },
];

export default function Navbar({ activeView, onNavigate, onOpenSettings }) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <button
            type="button"
            onClick={() => onNavigate('generator')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to generator"
          >
            <svg className="w-7 h-7 shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="#0d9488"/>
              <path d="M14 12h8v20l-4-3-4 3V12z" fill="#fff" opacity="0.9"/>
              <path d="M26 12h8v20l-4-3-4 3V12z" fill="#fff" opacity="0.7"/>
              <path d="M22 6l1.5 4-1.5-4zM25 8l-4 1.5 4-1.5zM19 8l4 1.5-4-1.5zM22 10l-1.5-4 1.5 4z" fill="#fbbf24"/>
              <circle cx="22" cy="8" r="1" fill="#f59e0b"/>
            </svg>
            <h1 className="text-lg font-bold text-primary-700 tracking-tight">
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${activeView === tab.key || (activeView === 'preview' && tab.key === 'generator')
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={onOpenSettings}
              className="ml-1 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
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
