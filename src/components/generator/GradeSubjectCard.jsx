import Card from '../layout/Card';
import ButtonGroup from '../ui/ButtonGroup';

const grades = ['4th Grade', '5th Grade'];
const subjects = ['Math', 'ELA', 'Science', 'Social Studies', 'Islamic Studies'];

export default function GradeSubjectCard({ grade, subject, onGradeChange, onSubjectChange }) {
  return (
    <Card title="Grade & Subject">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ButtonGroup
          label="Grade"
          options={grades}
          value={grade}
          onChange={onGradeChange}
        />
        <ButtonGroup
          label="Subject"
          options={subjects}
          value={subject}
          onChange={onSubjectChange}
          disabled={!grade}
        />
      </div>
    </Card>
  );
}
