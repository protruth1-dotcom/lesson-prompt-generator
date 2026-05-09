import { useState } from 'react';
import HistoryCard from './HistoryCard';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function HistoryView({ items, onView, onCopy, onDelete }) {
  const [deleteId, setDeleteId] = useState(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lesson-prompts-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-semibold text-ink">Saved Prompts</h2>
        <button
          type="button"
          onClick={handleExport}
          disabled={items.length === 0}
          className="btn-secondary text-xs disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Export All
        </button>
      </div>

      <p className="text-xs text-ink-soft mb-4">
        Prompts are saved to this browser only. Export to keep a backup.
      </p>

      {items.length === 0 ? (
        <div className="state-empty">
          <h3 className="state-empty-title">No saved prompts yet</h3>
          <p className="state-empty-message">Generate your first prompt to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((entry) => (
            <HistoryCard
              key={entry.id}
              entry={entry}
              onView={onView}
              onCopy={onCopy}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Prompt"
        message="Are you sure you want to delete this prompt? This action cannot be undone."
        onConfirm={() => {
          onDelete(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
