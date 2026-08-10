import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import ImageUpload from '../components/ImageUpload';

export default function ProfileEditor() {
  const [form, setForm] = useState({
    name: '', title: '', titleEn: '', bio: '', bioEn: '', age: '', location: '', email: '', website: '', avatarUrl: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.profile.get().then((p) => {
      setForm({
        name: p.name ?? '', title: p.title ?? '', titleEn: p.titleEn ?? '', bio: p.bio ?? '', bioEn: p.bioEn ?? '',
        age: p.age != null ? String(p.age) : '',
        location: p.location ?? '', email: p.email ?? '', website: p.website ?? '', avatarUrl: p.avatarUrl ?? '',
      });
    }).catch(() => {});
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    await api.profile.update({
      ...form,
      age: form.age ? Number(form.age) : undefined,
      avatarUrl: form.avatarUrl || undefined,
    });
    setSaved(true);
  };

  const inputStyle = {
    padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)',
    background: 'var(--bg-panel)', color: 'var(--text-primary)', fontSize: 'var(--fs-sm)', width: '100%',
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
      <h3 style={{ color: 'var(--accent-pink)', marginBottom: 'var(--space-lg)' }}>Profile</h3>
      {saved && <p style={{ color: 'var(--accent-mint)', marginBottom: 'var(--space-md)' }}>Saved ✓</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        <div><label className="fl">Name</label><input style={inputStyle} value={form.name} onChange={set('name')} /></div>
        <div><label className="fl">Title (ID)</label><input style={inputStyle} value={form.title} onChange={set('title')} /></div>
        <div><label className="fl">Title (EN)</label><input style={inputStyle} value={form.titleEn} onChange={set('titleEn')} /></div>
      </div>
      <div style={{ margin: 'var(--space-md) 0' }}>
        <label className="fl">Bio (ID)</label>
        <textarea style={inputStyle} rows={3} value={form.bio} onChange={set('bio')} />
      </div>
      <div style={{ margin: 'var(--space-md) 0' }}>
        <label className="fl">Bio (EN)</label>
        <textarea style={inputStyle} rows={3} value={form.bioEn} onChange={set('bioEn')} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        <div><label className="fl">Age</label><input style={inputStyle} type="number" value={form.age} onChange={set('age')} /></div>
        <div><label className="fl">Location</label><input style={inputStyle} value={form.location} onChange={set('location')} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', margin: 'var(--space-md) 0' }}>
        <div><label className="fl">Email</label><input style={inputStyle} value={form.email} onChange={set('email')} /></div>
        <div><label className="fl">Website</label><input style={inputStyle} value={form.website} onChange={set('website')} /></div>
      </div>

      <ImageUpload value={form.avatarUrl} onUpload={(url) => setForm((prev) => ({ ...prev, avatarUrl: url }))} />

      <button type="submit" className="btn btn-primary">Save</button>
      <style>{`.fl { display:block; font-size: var(--fs-xs); color: var(--text-secondary); margin-bottom: var(--space-xs); }`}</style>
    </form>
  );
}