import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import GameUI from './components/layout/GameUI';
import { useAuth } from './hooks/useAuth';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import ForgotPassword from './admin/ForgotPassword';
import ResetPassword from './admin/ResetPassword';
import AdminDashboard from './admin/AdminDashboard';
import ProfileEditor from './admin/editors/ProfileEditor';
import SocialEditor from './admin/editors/SocialEditor';
import ExperienceEditor from './admin/editors/ExperienceEditor';
import ProjectEditor from './admin/editors/ProjectEditor';
import SkillEditor from './admin/editors/SkillEditor';
import AchievementEditor from './admin/editors/AchievementEditor';
import AccountSettings from './admin/editors/AccountSettings';

function RequireAuth() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p>Checking auth...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameUI />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="socials" element={<SocialEditor />} />
            <Route path="experiences" element={<ExperienceEditor />} />
            <Route path="projects" element={<ProjectEditor />} />
            <Route path="skills" element={<SkillEditor />} />
            <Route path="achievements" element={<AchievementEditor />} />
            <Route path="account" element={<AccountSettings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
