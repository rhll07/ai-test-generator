import { Link } from 'react-router-dom';
import { BarChart3, Database, FileCode2, Route } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Panel } from '../common/Panel.jsx';

const TechnologyList = ({ label, values }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {values?.length ? (
        values.map((value) => (
          <span key={value} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {value}
          </span>
        ))
      ) : (
        <span className="text-sm text-slate-500">None detected</span>
      )}
    </div>
  </div>
);

export function RepositoryOverview({ project }) {
  if (!project) return null;

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Repository overview</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {project.architectureSummary || project.repositorySummary || 'Upload or import a repository to generate a structural summary.'}
          </p>
        </div>
        <Button as={Link} to={`/projects/${project._id}/analysis`} variant="secondary">
          <BarChart3 className="h-4 w-4" />
          Analysis
        </Button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-950">
          <FileCode2 className="h-4 w-4 text-teal-700" />
          <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{project.stats?.filesScanned || 0}</p>
          <p className="text-sm text-slate-500">Files scanned</p>
        </div>
        <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-950">
          <Route className="h-4 w-4 text-teal-700" />
          <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{project.stats?.routesDetected || 0}</p>
          <p className="text-sm text-slate-500">Routes</p>
        </div>
        <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-950">
          <Database className="h-4 w-4 text-teal-700" />
          <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{project.stats?.modelsDetected || 0}</p>
          <p className="text-sm text-slate-500">Models</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <TechnologyList label="Frontend" values={project.detectedTechnologies?.frontend} />
        <TechnologyList label="Backend" values={project.detectedTechnologies?.backend} />
        <TechnologyList label="Database" values={project.detectedTechnologies?.database} />
        <TechnologyList label="Languages" values={project.detectedTechnologies?.languages} />
        <TechnologyList label="Tooling" values={project.detectedTechnologies?.tooling} />
      </div>
    </Panel>
  );
}
