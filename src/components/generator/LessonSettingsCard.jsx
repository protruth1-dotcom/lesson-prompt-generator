import Card from '../layout/Card';
import ButtonGroup from '../ui/ButtonGroup';
import ToggleSwitch from '../ui/ToggleSwitch';

const aiTargets = ['Claude', 'ChatGPT', 'Gemini', 'Other'];
const lessonLengths = [
  { value: 'Short', label: 'Short (15 min)' },
  { value: 'Medium', label: 'Medium (30 min)' },
  { value: 'Long', label: 'Long (45 min)' },
];
const studentLevels = ['Below Level', 'On Level', 'Above Level'];
const outputFormats = ['Interactive', 'Print'];
const themes = ['Rainbow Bright', 'Space Galaxy', 'Ocean Adventure', 'Jungle Safari', 'Superhero', 'Dinosaur World', 'Sports'];

export default function LessonSettingsCard({
  targetAI, onTargetAIChange,
  lessonLength, onLessonLengthChange,
  studentLevel, onStudentLevelChange,
  crossCurricular, onCrossCurricularChange,
  outputFormat, onOutputFormatChange,
  theme, onThemeChange,
}) {
  return (
    <Card title="Lesson Settings">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Target AI</label>
            <select
              value={targetAI}
              onChange={(e) => onTargetAIChange(e.target.value)}
              className="input w-full"
            >
              {aiTargets.map((ai) => (
                <option key={ai} value={ai}>{ai}</option>
              ))}
            </select>
          </div>
          <ButtonGroup
            label="Output Format"
            options={outputFormats}
            value={outputFormat}
            onChange={onOutputFormatChange}
          />
          <ButtonGroup
            label="Lesson Length"
            options={lessonLengths}
            value={lessonLength}
            onChange={onLessonLengthChange}
          />
          <ButtonGroup
            label="Student Level"
            options={studentLevels}
            value={studentLevel}
            onChange={onStudentLevelChange}
          />
        </div>
        {outputFormat === 'Print' && (
          <ButtonGroup
            label="Theme"
            options={themes}
            value={theme}
            onChange={onThemeChange}
          />
        )}
        <ToggleSwitch
          label="Include cross-curricular connections"
          checked={crossCurricular}
          onChange={onCrossCurricularChange}
        />
      </div>
    </Card>
  );
}
