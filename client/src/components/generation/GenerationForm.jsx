import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { GENERATION_TYPES } from '../../utils/constants.js';
import { Button } from '../common/Button.jsx';
import { Field, Select, Textarea } from '../common/Field.jsx';
import { Panel } from '../common/Panel.jsx';
import { useGenerationStore } from '../../store/generationStore.js';

export function GenerationForm({ projectId }) {
  const { generate, loading, error } = useGenerationStore();
  const [form, setForm] = useState({
    generationType: 'mixed',
    testingGoal: '',
    codeSnippet: '',
    instructions: ''
  });

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await generate({ ...form, projectId });
    setForm((current) => ({ ...current, testingGoal: '', codeSnippet: '', instructions: '' }));
  };

  return (
    <Panel>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Generate tests</h2>
      <form className="mt-4 space-y-4" onSubmit={submit}>
        <Field label="Generation type">
          <Select value={form.generationType} onChange={update('generationType')}>
            {GENERATION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Testing goal">
          <Textarea
            value={form.testingGoal}
            onChange={update('testingGoal')}
            required
            placeholder="Generate API tests for signup/login, including invalid payloads and unauthorized access."
          />
        </Field>

        <Field label="Code snippet">
          <Textarea value={form.codeSnippet} onChange={update('codeSnippet')} placeholder="Optional focused code snippet" />
        </Field>

        <Field label="Instructions">
          <Textarea value={form.instructions} onChange={update('instructions')} placeholder="Preferred test framework, mocking strategy, assertion style..." />
        </Field>

        {error ? <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p> : null}

        <Button type="submit" disabled={loading || !form.testingGoal}>
          <Sparkles className="h-4 w-4" />
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </form>
    </Panel>
  );
}
