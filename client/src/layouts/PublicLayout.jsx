import { Link, Outlet } from 'react-router-dom';
import { Bot, LogIn } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-bold">
            <Bot className="h-5 w-5 text-teal-700" />
            AI Test Generator
          </Link>
          <div className="flex items-center gap-2">
            <Button as={Link} to="/login" variant="ghost" className="hidden sm:inline-flex">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
            <Button as={Link} to="/signup">
              Sign up
            </Button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
