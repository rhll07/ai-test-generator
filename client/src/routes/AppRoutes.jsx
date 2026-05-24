import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { PublicLayout } from '../layouts/PublicLayout.jsx';
import { AppLayout } from '../layouts/AppLayout.jsx';
import { LandingPage } from '../pages/LandingPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { ProjectWorkspacePage } from '../pages/ProjectWorkspacePage.jsx';
import { RepositoryAnalysisPage } from '../pages/RepositoryAnalysisPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects/:projectId" element={<ProjectWorkspacePage />} />
          <Route path="/projects/:projectId/analysis" element={<RepositoryAnalysisPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
