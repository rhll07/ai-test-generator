import { AuthForm } from '../components/auth/AuthForm.jsx';

export function SignupPage() {
  return (
    <main className="px-4 py-16">
      <AuthForm mode="signup" />
    </main>
  );
}
