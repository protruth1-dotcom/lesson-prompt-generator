import { getTopicName } from '../../data/curriculum';

export default function HistoryCard({ entry, onView, onCopy, onDelete }) {
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });

  const topicLabel = getTopicName(entry.topic);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 mb-1">{date}</p>
          <h3 className="text-sm font-semibold text-slate-800 truncate">
            {entry.grade} &middot; {entry.subject}
          </h3>
          <p className="text-sm text-slate-600 mt-0.5 truncate">
            {typeof topicLabel === 'string' && topicLabel.length > 60
              ? topicLabel.slice(0, 60) + '...'
              : topicLabel}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-500">{entry.targetAI}</span>
            <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-500">{entry.lessonLength}</span>
            <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-500">{entry.studentLevel}</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onView(entry)}
            className="px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors cursor-pointer"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => onCopy(entry.promptText)}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={() => onDelete(entry.id)}
            className="px-3 py-1.5 text-xs font-medium text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
