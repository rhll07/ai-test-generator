import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ChatPanel } from '../components/chat/ChatPanel.jsx';
import { ExportControls } from '../components/export/ExportControls.jsx';
import { GenerationForm } from '../components/generation/GenerationForm.jsx';
import { GenerationHistory } from '../components/generation/GenerationHistory.jsx';
import { RepositoryImport } from '../components/repository/RepositoryImport.jsx';
import { RepositoryOverview } from '../components/repository/RepositoryOverview.jsx';
import { Button } from '../components/common/Button.jsx';
import { useProjectStore } from '../store/projectStore.js';
import { useGenerationStore } from '../store/generationStore.js';
import { useChatStore } from '../store/chatStore.js';

export function ProjectWorkspacePage() {
  const { projectId } = useParams();
  const { currentProject, loadProject } = useProjectStore();
  const { generations, loadProjectGenerations, loading: generationLoading } = useGenerationStore();
  const { loadChats } = useChatStore();

  useEffect(() => {
    loadProject(projectId);
    loadProjectGenerations(projectId);
    loadChats(projectId);
  }, [projectId, loadProject, loadProjectGenerations, loadChats]);

  const refreshProject = () => {
    loadProject(projectId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/dashboard" className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-700">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">{currentProject?.projectName || 'Project workspace'}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Analyze repository context, generate tests, collect feedback, and export results.</p>
        </div>
        {currentProject ? (
          <Button as={Link} to={`/projects/${currentProject._id}/analysis`} variant="secondary">
            Repository analysis
          </Button>
        ) : null}
      </div>

      <RepositoryOverview project={currentProject} />
      <RepositoryImport projectId={projectId} onImported={refreshProject} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="space-y-6">
          <GenerationForm projectId={projectId} />
          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-white">Generated tests</h2>
            <GenerationHistory generations={generations} loading={generationLoading} />
          </div>
        </section>

        <aside className="space-y-6">
          <ExportControls project={currentProject} />
          <ChatPanel projectId={projectId} />
        </aside>
      </div>
    </div>
  );
}
