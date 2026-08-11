import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { api } from '../lib/api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await api.auth.resetPassword(token, newPassword);
      setMessage(res.message);
      setTimeout(() => navigate('/admin/login'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: 'var(--space-2xl)', width: 'min(360px, 90vw)', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <h2 style={{ color: '#18181b', textAlign: 'center', margin: 0 }}>Reset Password</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <label style={{ fontSize: 'var(--fs-sm)', color: '#3f3f46' }}>New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
            style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line-soft)', background: '#fff', color: '#18181b', fontSize: '15px' }} />
        </div>

        {message && <p style={{ color: '#15803d', margin: 0, fontSize: 'var(--fs-sm)' }}>{message}</p>}
        {error && <p style={{ color: '#e11d48', margin: 0, fontSize: 'var(--fs-sm)' }}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={loading || !token}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <div style={{ textAlign: 'center' }}>
          <Link to="/admin/login" style={{ fontSize: 'var(--fs-sm)', color: '#2563eb', textDecoration: 'none' }}>Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
