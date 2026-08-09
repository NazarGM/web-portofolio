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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: 'var(--space-2xl)', width: 'min(360px, 90vw)', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <h2 style={{ color: '#18181b', textAlign: 'center', margin: 0 }}>Admin Login</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <label style={{ fontSize: 'var(--fs-sm)', color: '#3f3f46' }}>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-soft)', background: '#fff', color: '#18181b', fontSize: '15px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <label style={{ fontSize: 'var(--fs-sm)', color: '#3f3f46' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-soft)', background: '#fff', color: '#18181b', fontSize: '15px' }} />
        </div>

        {error && <p style={{ color: '#e11d48', margin: 0, fontSize: 'var(--fs-sm)' }}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
