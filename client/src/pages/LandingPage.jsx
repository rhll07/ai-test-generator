import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, FileCode2, GitBranch, MessageSquareText, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';

const features = [
  { icon: FileCode2, title: 'Repository analysis', copy: 'Scans code, frameworks, routes, models, and folder structure.' },
  { icon: BrainCircuit, title: 'Memory retrieval', copy: 'Uses previous generations and feedback to improve future prompts.' },
  { icon: MessageSquareText, title: 'AI QA assistant', copy: 'Explains tests, improves assertions, and finds coverage gaps.' },
  { icon: GitBranch, title: 'GitHub and ZIP input', copy: 'Import repositories through upload or GitHub URL.' },
  { icon: ShieldCheck, title: 'Security controls', copy: 'JWT auth, sanitized uploads, validated payloads, and env-based secrets.' }
];

export function LandingPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">AI developer tooling</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
              AI Test Generator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Generate unit, integration, API, validation, edge-case, and negative tests from repository context, prompts, prior feedback, and AI memory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/signup">
                Start building
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as={Link} to="/login" variant="secondary">
                Login
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-slate-100 shadow-soft dark:border-slate-800">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-2">generated-tests.md</span>
            </div>
            <pre className="text-sm leading-6">
{`describe('POST /api/auth/login', () => {
  it('returns a JWT for valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(validCredentials);

    expect(response.status).toBe(200);
    expect(response.body.data.token).toEqual(expect.any(String));
  });

  it('rejects invalid passwords without leaking details', async () => {
    const response = await request(app).post('/api/auth/login').send(invalidCredentials);
    expect(response.status).toBe(401);
  });
});`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <Icon className="h-5 w-5 text-teal-700 dark:text-teal-300" />
                <h2 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.copy}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
