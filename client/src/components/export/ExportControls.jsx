import { Download } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Panel } from '../common/Panel.jsx';
import { downloadExport } from '../../api/exportApi.js';

export function ExportControls({ project }) {
  if (!project) return null;

  const baseName = project.projectName.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();

  return (
    <Panel>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Export</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {['markdown', 'pdf', 'json'].map((format) => (
          <Button
            key={format}
            variant="secondary"
            onClick={() => downloadExport({ projectId: project._id, format, filename: `${baseName}.${format === 'markdown' ? 'md' : format}` })}
          >
            <Download className="h-4 w-4" />
            {format.toUpperCase()}
          </Button>
        ))}
      </div>
    </Panel>
  );
}
