import { useState } from 'react';
import { Check, Copy, RefreshCw, Star, X } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { CodeBlock } from '../common/CodeBlock.jsx';
import { formatDate } from '../../utils/formatters.js';
import { useGenerationStore } from '../../store/generationStore.js';

export function GenerationCard({ generation }) {
  const { feedback, regenerate, loading } = useGenerationStore();
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(generation.generatedContent);
  const [rating, setRating] = useState(generation.feedback?.rating || 5);

  const copy = async () => {
    await navigator.clipboard.writeText(content);
  };

  const saveFeedback = (status) => {
    feedback(generation._id, { status, rating: Number(rating), comment: '' });
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-200">
              {generation.generationType}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              quality {generation.qualityScore}
            </span>
            {generation.metadata?.fallback ? (
              <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">fallback</span>
            ) : null}
          </div>
          <h3 className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{generation.testingGoal}</h3>
          <p className="mt-1 text-xs text-slate-500">{formatDate(generation.createdAt)}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="px-3" onClick={() => setEditable((value) => !value)}>
            {editable ? 'Preview' : 'Edit'}
          </Button>
          <Button variant="secondary" className="px-3" onClick={copy} title="Copy generated content">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="secondary" className="px-3" onClick={() => regenerate(generation._id)} disabled={loading} title="Regenerate">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <CodeBlock content={content} editable={editable} onChange={setContent} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
        <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Star className="h-4 w-4 text-amber-500" />
          <select
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-950"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <Button variant="secondary" className="px-3" onClick={() => saveFeedback('approved')}>
          <Check className="h-4 w-4" />
          Approve
        </Button>
        <Button variant="secondary" className="px-3" onClick={() => saveFeedback('rejected')}>
          <X className="h-4 w-4" />
          Reject
        </Button>
        <span className="text-sm text-slate-500">Current feedback: {generation.feedback?.status || 'pending'}</span>
      </div>
    </article>
  );
}
