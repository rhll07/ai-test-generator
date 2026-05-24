import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Mail, User } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { Field, Input } from '../common/Field.jsx';
import { Panel } from '../common/Panel.jsx';
import { useAuthStore } from '../../store/authStore.js';

export function AuthForm({ mode }) {
  const navigate = useNavigate();
  const { login, signup, loading, error } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const isSignup = mode === 'signup';

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (isSignup) {
      await signup(form);
    } else {
      await login({ email: form.email, password: form.password });
    }
    navigate('/dashboard');
  };

  return (
    <Panel className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-slate-950 dark:text-white">{isSignup ? 'Create account' : 'Login'}</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {isSignup ? 'Start generating repository-aware tests.' : 'Continue your AI-assisted QA workflow.'}
      </p>

      <form className="mt-6 space-y-4" onSubmit={submit}>
        {isSignup ? (
          <Field label="Name">
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input className="pl-9" value={form.name} onChange={update('name')} required minLength={2} />
            </div>
          </Field>
        ) : null}

        <Field label="Email">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input className="pl-9" type="email" value={form.email} onChange={update('email')} required />
          </div>
        </Field>

        <Field label="Password">
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input className="pl-9" type="password" value={form.password} onChange={update('password')} required minLength={8} />
          </div>
        </Field>

        {error ? <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Working...' : isSignup ? 'Create account' : 'Login'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
        {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
        <Link className="font-semibold text-teal-700 dark:text-teal-300" to={isSignup ? '/login' : '/signup'}>
          {isSignup ? 'Login' : 'Sign up'}
        </Link>
      </p>
    </Panel>
  );
}
