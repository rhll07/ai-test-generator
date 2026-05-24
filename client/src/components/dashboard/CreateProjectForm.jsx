import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Field, Input } from '../common/Field.jsx';
import { Panel } from '../common/Panel.jsx';
import { useProjectStore } from '../../store/projectStore.js';

export function CreateProjectForm({ onCreated }) {
  const { createProject, loading } = useProjectStore();
  const [form, setForm] = useState({ projectName: '', repositoryUrl: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const project = await createProject(form);
      setForm({ projectName: '', repositoryUrl: '' });
      onCreated?.(project);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Panel>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Create project</h2>
      <form className="mt-4 space-y-4" onSubmit={submit}>
        <Field label="Project name">
          <Input value={form.projectName} onChange={(event) => setForm({ ...form, projectName: event.target.value })} required minLength={2} />
        </Field>
        <Field label="Repository URL">
          <Input
            value={form.repositoryUrl}
            onChange={(event) => setForm({ ...form, repositoryUrl: event.target.value })}
            placeholder="https://github.com/org/repo"
          />
        </Field>
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button type="submit" disabled={loading}>
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </form>
    </Panel>
  );
}
