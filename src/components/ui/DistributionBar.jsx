import { QUESTION_TYPES } from '../../data/quizDistributions';

const SEGMENT_CLASSES = [
  'dist-bar-segment-1', 'dist-bar-segment-2', 'dist-bar-segment-3', 'dist-bar-segment-4',
  'dist-bar-segment-5', 'dist-bar-segment-6', 'dist-bar-segment-7',
];

export default function DistributionBar({ distribution, total }) {
  if (!distribution) return null;

  return (
    <div className="mt-3">
      {/* Stacked bar */}
      <div className="dist-bar">
        {QUESTION_TYPES.map((type, i) => {
          const count = distribution[type.key] || 0;
          if (count === 0) return null;
          const pct = (count / total) * 100;
          return (
            <div
              key={type.key}
              className={`${SEGMENT_CLASSES[i]} transition-all`}
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
            <div key={type.key} className="flex items-center gap-1.5 text-xs text-ink-soft">
              <span className={`w-2.5 h-2.5 rounded-sm ${SEGMENT_CLASSES[i]}`} />
              <span>{type.label.split(' (')[0]}: {count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
