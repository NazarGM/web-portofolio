import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import FileUpload from '../components/FileUpload';

export default function SceneEditor() {
  const [form, setForm] = useState({
    characterModelUrl: '',
    platformModelUrl: '',
    platformColor: '#FFE4EC',
    ambientColor: '#FFF0F3',
    particleColor: '#FFB3C6',
    cameraPosition: '[0, 1.5, 5.5]',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.scene.get().then((s) => {
      setForm({
        characterModelUrl: s.characterModelUrl ?? '',
        platformModelUrl: s.platformModelUrl ?? '',
        platformColor: s.platformColor,
        ambientColor: s.ambientColor,
        particleColor: s.particleColor,
        cameraPosition: s.cameraPosition,
      });
    }).catch(() => {});
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    await api.scene.update({
      characterModelUrl: form.characterModelUrl || undefined,
      platformModelUrl: form.platformModelUrl || undefined,
      platformColor: form.platformColor,
      ambientColor: form.ambientColor,
      particleColor: form.particleColor,
      cameraPosition: form.cameraPosition,
    });
    setSaved(true);
  };

  const inputStyle: React.CSSProperties = {
    padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)',
    background: 'var(--bg-panel)', color: 'var(--text-primary)', fontSize: 'var(--fs-sm)', width: '100%',
  };

  const lbl: React.CSSProperties = { display: 'block', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: 4 };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', maxWidth: '480px' }}>
      <h3 style={{ color: 'var(--accent-pink)', margin: 0, fontSize: 'var(--fs-lg)' }}>Scene Settings</h3>
      {saved && <p style={{ color: 'var(--accent-mint)', margin: 0, fontSize: 'var(--fs-sm)' }}>Saved ✓</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <h4 style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>3D Models</h4>

        <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-sm)' }}>
          <label style={lbl}>Character Model (.glb)</label>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-sm)' }}>Upload your character 3D model</p>
          <FileUpload value={form.characterModelUrl} onUpload={(url) => setForm((p) => ({ ...p, characterModelUrl: url }))} accept=".glb,.gltf" label="Character" isModel />
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-sm)' }}>
          <label style={lbl}>Platform / Base Model (.glb)</label>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-sm)' }}>Upload the platform the character stands on</p>
          <FileUpload value={form.platformModelUrl} onUpload={(url) => setForm((p) => ({ ...p, platformModelUrl: url }))} accept=".glb, .gltf" label="Platform" isModel />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <h4 style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Colors</h4>
        {([
          ['Platform Color', 'platformColor'],
          ['Ambient Color', 'ambientColor'],
          ['Particle Color', 'particleColor'],
        ] as const).map(([label, key]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <label style={{ ...lbl, margin: 0, minWidth: 100 }}>{label}</label>
            <input type="color" style={{ width: 40, height: 32, cursor: 'pointer', border: 'none' }} value={form[key]} onChange={set(key)} />
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{form[key]}</span>
          </div>
        ))}
      </div>

      <div>
        <label style={lbl}>Camera Position (JSON array)</label>
        <input style={inputStyle} value={form.cameraPosition} onChange={set('cameraPosition')} placeholder='[0, 1.5, 5.5]' />
      </div>

      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Scene</button>
    </form>
  );
}