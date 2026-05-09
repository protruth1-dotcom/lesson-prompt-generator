import { QUESTION_TYPES } from '../../data/quizDistributions';

const COLORS = [
  'bg-primary-500', 'bg-accent-500', 'bg-blue-500', 'bg-rose-500',
  'bg-violet-500', 'bg-emerald-500', 'bg-orange-500',
];

export default function DistributionBar({ distribution, total }) {
  if (!distribution) return null;

  return (
    <div className="mt-3">
      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
        {QUESTION_TYPES.map((type, i) => {
          const count = distribution[type.key] || 0;
          if (count === 0) return null;
          const pct = (count / total) * 100;
          return (
            <div
              key={type.key}
              className={`${COLORS[i]} transition-all`}
              style={{ width: `${pct}%` }}
              title={`${type.label}: ${count}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {QUESTION_TYPES.map((type, i) => {
          const count = distribution[type.key] || 0;
          if (count === 0) return null;
          return (
            <div key={type.key} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className={`w-2.5 h-2.5 rounded-sm ${COLORS[i]}`} />
              <span>{type.label.split(' (')[0]}: {count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
