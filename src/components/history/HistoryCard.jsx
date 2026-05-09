import { getTopicName } from '../../data/curriculum';

export default function HistoryCard({ entry, onView, onCopy, onDelete }) {
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });

  const topicLabel = getTopicName(entry.topic);

  return (
    <div className="card p-4 sm:p-5 relative">
      <svg className="absolute top-3 right-3 w-4 h-4 text-ink-soft opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-ink-soft mb-1">{date}</p>
          <h3 className="text-sm font-semibold text-ink truncate">
            {entry.grade} &middot; {entry.subject}
          </h3>
          <p className="text-sm text-ink-soft mt-0.5 truncate">
            {typeof topicLabel === 'string' && topicLabel.length > 60
              ? topicLabel.slice(0, 60) + '...'
              : topicLabel}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="badge">{entry.targetAI}</span>
            <span className="badge">{entry.lessonLength}</span>
            <span className="badge">{entry.studentLevel}</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onView(entry)}
            className="px-3 py-1.5 text-xs font-medium text-chalkboard bg-paper-lined rounded-lg hover:bg-pencil-yellow transition-colors cursor-pointer"
          >
            View
          </button>
          <button
            type="button"
            onClick={() => onCopy(entry.promptText)}
            className="px-3 py-1.5 text-xs font-medium text-ink bg-paper-lined rounded-lg hover:bg-paper transition-colors cursor-pointer"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={() => onDelete(entry.id)}
            className="px-3 py-1.5 text-xs font-medium text-apple-red bg-[#FEF2F2] rounded-lg hover:bg-[#FECACA] transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
