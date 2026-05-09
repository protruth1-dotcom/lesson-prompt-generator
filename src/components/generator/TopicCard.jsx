import Card from '../layout/Card';
import SearchableDropdown from '../ui/SearchableDropdown';

export default function TopicCard({ topics, topic, onTopicChange, grade, subject }) {
  if (!grade || !subject) {
    return (
      <Card title="Topic">
        <p className="text-sm text-slate-400">Select a grade and subject first</p>
      </Card>
    );
  }

  return (
    <Card title="Topic">
      <SearchableDropdown
        options={topics}
        value={topic}
        onChange={onTopicChange}
        placeholder="Search for a topic..."
      />
    </Card>
  );
}
