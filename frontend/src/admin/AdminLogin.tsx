import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate('/admin');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: 'var(--space-2xl)', width: 'min(360px, 90vw)', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <h2 style={{ color: 'var(--accent-pink)', textAlign: 'center', margin: 0 }}>Admin Login</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)}
            style={{ padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-panel)', fontSize: 'var(--fs-base)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <label style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-panel)', fontSize: 'var(--fs-base)' }} />
        </div>

        {error && <p style={{ color: 'var(--accent-pink)', margin: 0, fontSize: 'var(--fs-sm)' }}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
