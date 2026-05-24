import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bot, LayoutDashboard, LogOut, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../components/common/Button.jsx';
import { useAuthStore } from '../store/authStore.js';

const navClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
    isActive
      ? 'bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-200'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;

export function AppLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-bold">
            <Bot className="h-5 w-5 text-teal-700" />
            AI Test Generator
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/dashboard" className={navClass}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden max-w-40 truncate text-sm text-slate-500 sm:block">{user?.email}</span>
            <Button variant="secondary" className="w-10 px-0" onClick={() => setDark((value) => !value)} title="Toggle theme">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
