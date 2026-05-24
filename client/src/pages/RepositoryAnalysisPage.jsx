import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { Panel } from '../components/common/Panel.jsx';
import { useProjectStore } from '../store/projectStore.js';

export function RepositoryAnalysisPage() {
  const { projectId } = useParams();
  const { currentProject, loadProject, loading } = useProjectStore();

  useEffect(() => {
    loadProject(projectId);
  }, [projectId, loadProject]);

  if (!currentProject && loading) {
    return <p className="text-slate-500">Loading repository analysis...</p>;
  }

  if (!currentProject) {
    return <EmptyState title="Project not found" description="Return to the dashboard and choose a valid project." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to={`/projects/${projectId}`} className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-700">
            <ArrowLeft className="h-4 w-4" />
            Workspace
          </Link>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Repository analysis</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{currentProject.projectName}</p>
        </div>
        <Button as={Link} to={`/projects/${projectId}`} variant="secondary">
          Generate tests
        </Button>
      </div>

      <Panel>
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Architecture summary</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          {currentProject.architectureSummary || 'No analysis summary is available yet.'}
        </p>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Detected routes</h2>
          <div className="mt-4 space-y-2">
            {currentProject.detectedRoutes?.length ? (
              currentProject.detectedRoutes.map((route, index) => (
                <div key={`${route.method}-${route.path}-${index}`} className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
                  <p className="font-mono text-sm font-semibold text-slate-950 dark:text-white">
                    {route.method} {route.path}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{route.file}</p>
                </div>
              ))
            ) : (
              <EmptyState title="No routes detected" />
            )}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Detected models</h2>
          <div className="mt-4 space-y-2">
            {currentProject.detectedModels?.length ? (
              currentProject.detectedModels.map((model, index) => (
                <div key={`${model.name}-${index}`} className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
                  <p className="font-semibold text-slate-950 dark:text-white">{model.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{model.file}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {model.fields?.length ? model.fields.join(', ') : 'No fields detected'}
                  </p>
                </div>
              ))
            ) : (
              <EmptyState title="No models detected" />
            )}
          </div>
        </Panel>
      </div>

      <Panel>
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Folder structure</h2>
        <pre className="mt-4 overflow-auto rounded-md bg-slate-950 p-4 text-sm leading-6 text-slate-100">
          {currentProject.folderStructure || 'No folder structure available.'}
        </pre>
      </Panel>
    </div>
  );
}
