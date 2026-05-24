import { useState } from 'react';
import { Github, UploadCloud } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Field, Input } from '../common/Field.jsx';
import { Panel } from '../common/Panel.jsx';
import { useProjectStore } from '../../store/projectStore.js';

export function RepositoryImport({ projectId, onImported }) {
  const { uploadRepository, importGitHub, loading } = useProjectStore();
  const [file, setFile] = useState(null);
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [error, setError] = useState('');

  const submitUpload = async (event) => {
    event.preventDefault();
    if (!file) return;
    setError('');
    try {
      const project = await uploadRepository({ file, projectId });
      onImported?.(project);
    } catch (err) {
      setError(err.message);
    }
  };

  const submitGitHub = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const project = await importGitHub({ repositoryUrl, branch, projectId });
      onImported?.(project);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Panel>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Repository input</h2>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        <form className="space-y-3" onSubmit={submitUpload}>
          <Field label="Upload ZIP">
            <Input type="file" accept=".zip" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </Field>
          <Button type="submit" variant="secondary" disabled={loading || !file}>
            <UploadCloud className="h-4 w-4" />
            Analyze ZIP
          </Button>
        </form>

        <form className="space-y-3" onSubmit={submitGitHub}>
          <Field label="GitHub repository">
            <Input value={repositoryUrl} onChange={(event) => setRepositoryUrl(event.target.value)} placeholder="https://github.com/org/repo" />
          </Field>
          <Field label="Branch">
            <Input value={branch} onChange={(event) => setBranch(event.target.value)} />
          </Field>
          <Button type="submit" variant="secondary" disabled={loading || !repositoryUrl}>
            <Github className="h-4 w-4" />
            Import GitHub
          </Button>
        </form>
      </div>
      {error ? <p className="mt-4 rounded-md bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p> : null}
    </Panel>
  );
}
