import { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { useAuthStore } from './store/authStore.js';

export default function App() {
  const hydrateUser = useAuthStore((state) => state.hydrateUser);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return <AppRoutes />;
}
