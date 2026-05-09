import Card from '../layout/Card';
import TabToggle from '../ui/TabToggle';
import ButtonGroup from '../ui/ButtonGroup';
import NumberInput from '../ui/NumberInput';
import DistributionBar from '../ui/DistributionBar';
import { QUESTION_TYPES } from '../../data/quizDistributions';

const difficulties = ['Mostly Recall', 'Balanced', 'Mostly Critical Thinking'];

export default function QuizConfigCard({
  quizMode, onQuizModeChange,
  totalQuestions, onTotalQuestionsChange,
  difficulty, onDifficultyChange,
  autoDistribution,
  manualCounts, onManualCountChange,
  manualSum,
}) {
  return (
    <Card title="Quiz Configuration">
      <div className="space-y-5">
        <TabToggle
          tabs={['Auto', 'Manual']}
          activeTab={quizMode}
          onChange={onQuizModeChange}
        />

        <NumberInput
          label="Total Questions"
          value={totalQuestions}
          onChange={onTotalQuestionsChange}
          min={5}
          max={30}
        />

        {quizMode === 'Auto' ? (
          <div>
            <ButtonGroup
              label="Difficulty"
              options={difficulties}
              value={difficulty}
              onChange={onDifficultyChange}
            />
            <DistributionBar
              distribution={autoDistribution}
              total={totalQuestions}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {QUESTION_TYPES.map((type) => (
              <NumberInput
                key={type.key}
                label={type.label}
                value={manualCounts[type.key]}
                onChange={(val) => onManualCountChange(type.key, val)}
                min={0}
                max={totalQuestions}
                compact
              />
            ))}
            <div className={`text-sm font-medium mt-2 ${manualSum === totalQuestions ? 'text-emerald-600' : 'text-rose-500'}`}>
              Total: {manualSum} / {totalQuestions}
              {manualSum !== totalQuestions && (
                <span className="block text-xs font-normal mt-1">
                  Your question counts add up to {manualSum}. Please adjust to match your total of {totalQuestions}.
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
