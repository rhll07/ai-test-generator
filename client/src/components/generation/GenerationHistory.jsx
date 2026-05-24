import { EmptyState } from '../common/EmptyState.jsx';
import { LoadingSkeleton } from '../common/LoadingSkeleton.jsx';
import { GenerationCard } from './GenerationCard.jsx';

export function GenerationHistory({ generations, loading }) {
  if (loading) return <LoadingSkeleton rows={3} />;

  if (!generations.length) {
    return <EmptyState title="No generations in this project" description="Submit a testing goal to create the first generated test suite." />;
  }

  return (
    <div className="space-y-4">
      {generations.map((generation) => (
        <GenerationCard key={generation._id} generation={generation} />
      ))}
    </div>
  );
}
