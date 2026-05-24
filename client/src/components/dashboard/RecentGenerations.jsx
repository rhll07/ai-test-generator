import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters.js';
import { EmptyState } from '../common/EmptyState.jsx';
import { Panel } from '../common/Panel.jsx';

export function RecentGenerations({ generations }) {
  return (
    <Panel>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Recent generations</h2>
      <div className="mt-4 space-y-3">
        {generations.length ? (
          generations.map((generation) => (
            <Link
              key={generation._id}
              to={`/projects/${generation.projectId?._id || generation.projectId}`}
              className="block rounded-md border border-slate-200 p-3 transition hover:border-teal-300 dark:border-slate-800 dark:hover:border-teal-800"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{generation.testingGoal}</p>
                <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {generation.qualityScore}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {generation.projectId?.projectName || 'Project'} • {formatDate(generation.createdAt)}
              </p>
            </Link>
          ))
        ) : (
          <EmptyState title="No generated tests yet" description="Create a project workspace and submit a testing goal." />
        )}
      </div>
    </Panel>
  );
}
