import { useState } from 'react';
import HistoryCard from './HistoryCard';
import ConfirmDialog from '../ui/ConfirmDialog';

export default function HistoryView({ items, onView, onCopy, onDelete }) {
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Saved Prompts</h2>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-slate-500 text-sm">No saved prompts yet.</p>
          <p className="text-slate-400 text-sm mt-1">Generate your first prompt to get started.</p>
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
