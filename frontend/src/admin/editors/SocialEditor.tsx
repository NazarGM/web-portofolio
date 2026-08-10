import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import type { SocialLink } from '../../types';
import { FaGithub, FaLinkedin, FaTwitter, FaXTwitter, FaInstagram, FaYoutube, FaDiscord, FaTiktok, FaFacebook, FaGlobe } from 'react-icons/fa6';

function renderSocialIcon(name?: string) {
  const lower = (name || '').toLowerCase();
  switch (lower) {
    case 'github': return <FaGithub size={16} />;
    case 'linkedin': return <FaLinkedin size={16} />;
    case 'x':
    case 'xtwitter': return <FaXTwitter size={16} />;
    case 'twitter': return <FaTwitter size={16} />;
    case 'instagram': return <FaInstagram size={16} />;
    case 'youtube': return <FaYoutube size={16} />;
    case 'discord': return <FaDiscord size={16} />;
    case 'tiktok': return <FaTiktok size={16} />;
    case 'facebook': return <FaFacebook size={16} />;
    default: return <FaGlobe size={16} />;
  }
}

const ICONS: { name: string; emoji: string; label: string }[] = [
  { name: 'github', emoji: 'GH', label: 'GitHub' },
  { name: 'linkedin', emoji: 'LI', label: 'LinkedIn' },
  { name: 'x', emoji: 'X', label: 'X / Twitter' },
  { name: 'instagram', emoji: 'IG', label: 'Instagram' },
  { name: 'youtube', emoji: 'YT', label: 'YouTube' },
  { name: 'discord', emoji: 'DS', label: 'Discord' },
  { name: 'tiktok', emoji: 'TT', label: 'TikTok' },
  { name: 'twitter', emoji: 'TW', label: 'Twitter' },
  { name: 'facebook', emoji: 'FB', label: 'Facebook' },
];

export default function SocialEditor() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ platform: '', url: '', iconName: 'github' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await api.socials.list()); } catch { }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) await api.socials.update(editingId, form);
      else await api.socials.create(form);
      setEditingId(null);
      setForm({ platform: '', url: '', iconName: 'github' });
      await load();
    } catch { }
    setSaving(false);
  };

  const startEdit = (item: SocialLink) => {
    setEditingId(item.id);
    setForm({
      platform: item.platform,
      url: item.url,
      iconName: item.iconName ?? 'github',
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this link?')) return;
    await api.socials.remove(id);
    await load();
  };

  const inputStyle: React.CSSProperties = {
    padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)',
    background: 'var(--bg-panel)', color: 'var(--text-primary)', fontSize: 'var(--fs-sm)', width: '100%',
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h3 style={{ color: 'var(--accent-pink)', margin: '0 0 var(--space-xl)' }}>Social Links</h3>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          <div>
            <label style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Platform</label>
            <input style={inputStyle} value={form.platform} onChange={(e) => setForm((p) => ({ ...p, platform: e.target.value }))} required />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>URL</label>
            <input type="url" style={inputStyle} value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} required />
          </div>
          <div>
            <label style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Icon</label>
            <select style={inputStyle} value={form.iconName} onChange={(e) => setForm((p) => ({ ...p, iconName: e.target.value }))}>
              {ICONS.map((ic) => (
                <option key={ic.name} value={ic.name}>{ic.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-end' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ flex: 1 }}>{editingId ? 'Update' : 'Add'}</button>
            {editingId && <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setEditingId(null); setForm({ platform: '', url: '', iconName: 'github' }); }}>Cancel</button>}
          </div>
        </div>
      </form>

      {/* List */}
      {loading && <p className="muted">Loading...</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 'var(--space-sm)', borderBottom: '1px solid var(--border-medium)' }}>Icon</th>
            <th style={{ textAlign: 'left', padding: 'var(--space-sm)', borderBottom: '1px solid var(--border-medium)' }}>Platform</th>
            <th style={{ textAlign: 'left', padding: 'var(--space-sm)', borderBottom: '1px solid var(--border-medium)' }}>URL</th>
            <th style={{ textAlign: 'right', padding: 'var(--space-sm)', borderBottom: '1px solid var(--border-medium)' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: 'var(--space-sm)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                  {renderSocialIcon(s.iconName || s.platform)}
                </div>
              </td>
              <td style={{ padding: 'var(--space-sm)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.platform}</td>
              <td style={{ padding: 'var(--space-sm)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.url}</td>
              <td style={{ padding: 'var(--space-sm)', textAlign: 'right' }}>
                <button className="btn btn-ghost" style={{ fontSize: 'var(--fs-xs)', padding: '4px 10px', marginRight: 4 }} onClick={() => startEdit(s)}>Edit</button>
                <button className="btn btn-ghost" style={{ fontSize: 'var(--fs-xs)', padding: '4px 10px', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)' }} onClick={() => remove(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={4} style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>No social links yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
