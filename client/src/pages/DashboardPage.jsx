import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Gauge, Sparkles } from 'lucide-react';
import { CreateProjectForm } from '../components/dashboard/CreateProjectForm.jsx';
import { ProjectCard } from '../components/dashboard/ProjectCard.jsx';
import { RecentGenerations } from '../components/dashboard/RecentGenerations.jsx';
import { EmptyState } from '../components/common/EmptyState.jsx';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton.jsx';
import { Panel } from '../components/common/Panel.jsx';
import { useProjectStore } from '../store/projectStore.js';
import { useGenerationStore } from '../store/generationStore.js';

export function DashboardPage() {
  const navigate = useNavigate();
  const { projects, loadProjects, loading } = useProjectStore();
  const { recentGenerations, loadRecentGenerations } = useGenerationStore();

  useEffect(() => {
    loadProjects();
    loadRecentGenerations();
  }, [loadProjects, loadRecentGenerations]);

  const totalGenerations = projects.reduce((sum, project) => sum + (project.generationCount || 0), 0);
  const averageQuality = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + (project.averageQuality || 0), 0) / projects.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Manage projects, repository analysis, and generated tests.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Panel>
          <FolderKanban className="h-5 w-5 text-teal-700 dark:text-teal-300" />
          <p className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{projects.length}</p>
          <p className="text-sm text-slate-500">Projects</p>
        </Panel>
        <Panel>
          <Sparkles className="h-5 w-5 text-teal-700 dark:text-teal-300" />
          <p className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{totalGenerations}</p>
          <p className="text-sm text-slate-500">Generations</p>
        </Panel>
        <Panel>
          <Gauge className="h-5 w-5 text-teal-700 dark:text-teal-300" />
          <p className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{averageQuality}</p>
          <p className="text-sm text-slate-500">Average quality</p>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-950 dark:text-white">Projects</h2>
          {loading ? <LoadingSkeleton rows={3} /> : null}
          {!loading && projects.length ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : null}
          {!loading && !projects.length ? (
            <EmptyState title="No projects yet" description="Create a project, then upload a ZIP repository or import from GitHub." />
          ) : null}
        </section>
        <aside className="space-y-6">
          <CreateProjectForm onCreated={(project) => navigate(`/projects/${project._id}`)} />
          <RecentGenerations generations={recentGenerations} />
        </aside>
      </div>
    </div>
  );
}
