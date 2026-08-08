import { useState } from 'react';
import { api, resolveUrl } from '../../lib/api';

interface FileUploadProps {
  value?: string;
  onUpload: (url: string) => void;
  accept?: string;
  label?: string;
  isModel?: boolean;
}

export default function FileUpload({ value, onUpload, accept = 'image/*', label = 'Image', isModel = false }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  void label;

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
      <input type="file" accept={accept} onChange={handleChange} disabled={uploading} />
      {uploading && <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-pink)' }}>Uploading...</p>}
      {error && <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-pink)' }}>{error}</p>}
      {value &&
        (isModel ? (
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent-mint)' }}>✓ Uploaded: {value.split('/').pop()}</div>
        ) : (
          <img
            src={resolveUrl(value)}
            alt="preview"
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
          />
        ))}
    </div>
  );
}