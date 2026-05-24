import { AuthForm } from '../components/auth/AuthForm.jsx';

export function LoginPage() {
  return (
    <main className="px-4 py-16">
      <AuthForm mode="login" />
    </main>
  );
}
