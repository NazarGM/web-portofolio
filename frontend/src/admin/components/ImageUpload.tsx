import { useState } from 'react';
import { api, resolveUrl } from '../../lib/api';

interface ImageUploadProps {
  value?: string;
  onUpload: (url: string) => void;
}

export default function ImageUpload({ value, onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const res = await api.upload.file(file);
      onUpload(res.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
      <label style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 500 }}>Image</label>
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading && <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-pink)' }}>Uploading...</p>}
      {error && <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-pink)' }}>{error}</p>}
      {value && (
        <img
          src={resolveUrl(value)}
          alt="preview"
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
        />
      )}
    </div>
  );
}
