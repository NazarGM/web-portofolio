import { NavLink, Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true, icon: '📊' },
  { to: '/admin/profile', label: 'Profile', icon: '👤' },
  { to: '/admin/socials', label: 'Socials', icon: '🔗' },
  { to: '/admin/experiences', label: 'Experience', icon: '💼' },
  { to: '/admin/projects', label: 'Projects', icon: '📁' },
  { to: '/admin/skills', label: 'Skills', icon: '💎' },
  { to: '/admin/achievements', label: 'Achievements', icon: '🏆' },
  { to: '/admin/account', label: 'Account', icon: '🔑' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Mobile hamburger */}
      <button
        className="admin-hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={closeSidebar} />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar-open' : ''}`}>
        <h3 style={{ color: '#18181b', margin: '0 0 var(--space-lg)', fontSize: '18px' }}>Portfolio Admin</h3>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}
            onClick={closeSidebar}
            className={({ isActive }) => `admin-nav-link ${isActive ? 'admin-nav-active' : ''}`}>
            <span className="admin-nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <button className="admin-nav-link" style={{ marginTop: 'auto', color: '#e11d48', cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left' }} onClick={handleLogout}>🚪 Logout</button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
