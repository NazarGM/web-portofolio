import { useState } from 'react';
import { Link } from 'react-router';
import { api } from '../lib/api';

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await api.auth.forgotPassword();
      setMessage(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="glass-panel" style={{ padding: 'var(--space-2xl)', width: 'min(360px, 90vw)', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', textAlign: 'center' }}>
        <h2 style={{ color: '#18181b', margin: 0 }}>Forgot Password</h2>
        <p style={{ fontSize: 'var(--fs-sm)', color: '#71717a', margin: 0 }}>A password reset link will be sent to your registered email address.</p>

        {message && <p style={{ color: '#15803d', margin: 0, fontSize: 'var(--fs-sm)' }}>{message}</p>}
        {error && <p style={{ color: '#e11d48', margin: 0, fontSize: 'var(--fs-sm)' }}>{error}</p>}

        <button onClick={handleReset} className="btn btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <Link to="/admin/login" style={{ fontSize: 'var(--fs-sm)', color: '#2563eb', textDecoration: 'none' }}>Back to Login</Link>
      </div>
    </div>
  );
}
