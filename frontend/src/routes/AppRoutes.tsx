import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AppShell } from '../components/layout/AppShell';

import { Login } from '../pages/auth/Login';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { Projects } from '../pages/projects/Projects';
import { ProjectDetails } from '../pages/projects/ProjectDetails';
import { Tasks } from '../pages/tasks/Tasks';
import { Metrics } from '../pages/metrics/Metrics';
import { Insights } from '../pages/insights/Insights';
import { Categories } from '../pages/categories/Categories';
import { Favorites } from '../pages/favorites/Favorites';
import { Activities } from '../pages/activities/Activities';
import { NotFound } from '../pages/NotFound';

import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={
              <AppShell>
                <Dashboard />
              </AppShell>
            }
          />

          <Route
            path="/projects"
            element={
              <AppShell>
                <Projects />
              </AppShell>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <AppShell>
                <ProjectDetails />
              </AppShell>
            }
          />

          <Route
            path="/tasks"
            element={
              <AppShell>
                <Tasks />
              </AppShell>
            }
          />

          <Route
            path="/metrics"
            element={
              <AppShell>
                <Metrics />
              </AppShell>
            }
          />

          <Route
            path="/insights"
            element={
              <AppShell>
                <Insights />
              </AppShell>
            }
          />

          <Route
            path="/categories"
            element={
              <AppShell>
                <Categories />
              </AppShell>
            }
          />

          <Route
            path="/favorites"
            element={
              <AppShell>
                <Favorites />
              </AppShell>
            }
          />

          <Route
            path="/activities"
            element={
              <AppShell>
                <Activities />
              </AppShell>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}