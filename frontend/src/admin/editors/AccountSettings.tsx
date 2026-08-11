import { useState } from 'react';
import { api } from '../../lib/api';

export default function AccountSettings() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saved, setSaved] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved('');
    setError('');
    if (!currentPassword) {
      setError('Enter your current password');
      return;
    }
    try {
      const res = await api.auth.updateAccount({
        currentPassword,
        newUsername: username || undefined,
        email: email || undefined,
        newPassword: newPassword || undefined,
      });
      setSaved(res.message);
      setCurrentPassword('');
      setNewPassword('');
      setUsername('');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: '8px 12px', borderRadius: '6px', border: '1px solid #d4d4d8',
    background: '#fff', color: '#18181b', fontSize: '14px', width: '100%',
  };
  const lbl: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#3f3f46', marginBottom: 4 };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ color: '#18181b', margin: 0 }}>Account Settings</h3>
      <p style={{ fontSize: 13, color: '#71717a', margin: 0 }}>Update your admin login credentials. Leave a field empty to keep it unchanged.</p>

      {saved && <p style={{ color: '#15803d', margin: 0, fontSize: 13 }}>{saved}</p>}
      {error && <p style={{ color: '#e11d48', margin: 0, fontSize: 13 }}>{error}</p>}

      <div>
        <label style={lbl}>Current Password *</label>
        <input type="password" style={inputStyle} value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)} required />
      </div>

      <div>
        <label style={lbl}>New Username</label>
        <input style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Leave blank to keep" />
      </div>

      <div>
        <label style={lbl}>Email (for password reset)</label>
        <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Leave blank to keep" />
      </div>

      <div>
        <label style={lbl}>New Password</label>
        <input type="password" style={inputStyle} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave blank to keep" />
      </div>

      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
    </form>
  );
}
