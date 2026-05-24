import { Link } from 'react-router-dom';
import { ArrowRight, FileCode2, Route } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { formatDate, pluralize } from '../../utils/formatters.js';

export function ProjectCard({ project }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{project.projectName}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Updated {formatDate(project.updatedAt)}</p>
        </div>
        <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-200">
          {project.sourceType}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {project.architectureSummary || project.repositorySummary || 'No repository analysis has been added yet.'}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
          <FileCode2 className="mb-1 h-4 w-4 text-slate-500" />
          <strong className="block text-slate-950 dark:text-white">{project.stats?.filesScanned || 0}</strong>
          <span className="text-slate-500">files</span>
        </div>
        <div className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
          <Route className="mb-1 h-4 w-4 text-slate-500" />
          <strong className="block text-slate-950 dark:text-white">{project.stats?.routesDetected || 0}</strong>
          <span className="text-slate-500">routes</span>
        </div>
        <div className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
          <strong className="block text-slate-950 dark:text-white">{project.generationCount || 0}</strong>
          <span className="text-slate-500">{pluralize(project.generationCount || 0, 'gen')}</span>
        </div>
      </div>

      <div className="mt-5">
        <Button as={Link} to={`/projects/${project._id}`} variant="secondary" className="w-full">
          Open workspace
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
