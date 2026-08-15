import { useEffect, useState, useCallback } from 'react';
import { api, resolveUrl } from '../../lib/api';
import { GripVertical } from 'lucide-react';

export interface FieldConfig {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'url' | 'select' | 'file';
  required?: boolean;
  options?: string[];
}

interface CrudManagerProps {
  title: string;
  fields: FieldConfig[];
  emptyRow: Record<string, unknown>;
  api: {
    list: () => Promise<any[]>;
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    remove: (id: string) => Promise<any>;
  };
}

function buildFormState(fields: FieldConfig[], initial?: Record<string, unknown>) {
  const state: Record<string, string> = {};
  for (const f of fields) {
    const val = initial?.[f.name];
    state[f.name] = val != null ? String(val) : '';
  }
  return state;
}

function normalizeOrder(items: any[]) {
  return items.map((item, index) => ({ ...item, sortOrder: index + 1 }));
}

export default function CrudManager({ title, fields, emptyRow, api: apiActions }: CrudManagerProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(() => buildFormState(fields, emptyRow));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiActions.list();
      const sorted = [...data].sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
      setItems(normalizeOrder(sorted));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [apiActions]);

  useEffect(() => { load(); }, [load]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === 'number') payload[f.name] = Number(form[f.name]) || 0;
      else payload[f.name] = form[f.name] || null;
    }
    try {
      if (editingId) {
        await apiActions.update(editingId, payload);
      } else {
        const newItem = await apiActions.create(payload);
        const newSortOrder = items.length + 1;
        await apiActions.update(newItem.id, { sortOrder: newSortOrder });
      }
      setShowForm(false);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm(buildFormState(fields, item));
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await apiActions.remove(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const handleNew = () => {
    setEditingId(null);
    setForm(buildFormState(fields, emptyRow));
    setShowForm(true);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== draggedId) setDragOverId(id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const draggedIndex = items.findIndex((i) => i.id === draggedId);
    const targetIndex = items.findIndex((i) => i.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;

    const oldItems = [...items];
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    const updatedItems = normalizeOrder(newItems);
    setItems(updatedItems);
    setDraggedId(null);
    setDragOverId(null);

    try {
      const updates = updatedItems.filter((item) => {
        const old = oldItems.find(oi => oi.id === item.id);
        return old?.sortOrder !== item.sortOrder;
      });

      if (updates.length > 0) {
        await Promise.all(updates.map(item => 
          apiActions.update(item.id, { sortOrder: item.sortOrder })
        ));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder');
      await load();
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  if (loading) return <p>Loading {title}...</p>;

  const displayFields = fields.filter(f => f.name !== 'description');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ margin: 0, color: 'var(--accent-pink)' }}>{title}</h3>
        <button className="btn btn-primary" onClick={handleNew}>+ Add</button>
      </div>

      {error && <p style={{ color: 'var(--accent-pink)', marginBottom: 'var(--space-md)' }}>{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'flex-end' }}>
            {fields.map((f) => (
              <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', minWidth: '130px', flex: f.type === 'textarea' || f.name === 'description' ? 1 : undefined }}>
                <label style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
                  {f.label}{f.required && ' *'}
                </label>
                {f.type === 'select' ? (
                  <select name={f.name} value={form[f.name] ?? ''} onChange={handleChange}
                    style={{ padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-panel)', fontSize: 'var(--fs-sm)' }}>
                    <option value="">—</option>
                    {f.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : f.type === 'file' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <input type="file" accept="image/*" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const res = await api.upload.file(file);
                        setForm((prev) => ({ ...prev, [f.name]: res.url }));
                      } catch { alert('Upload failed'); }
                    }} />
                    {form[f.name] && (
                      <img src={resolveUrl(form[f.name])} alt="preview" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4, marginTop: 4 }} />
                    )}
                  </div>
                ) : f.type === 'textarea' ? (
                  <textarea name={f.name} value={form[f.name] ?? ''} onChange={handleChange} rows={3}
                    style={{ padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-panel)', fontSize: 'var(--fs-sm)', resize: 'vertical' }} />
                ) : (
                  <input name={f.name} type={f.type === 'number' ? 'number' : f.type === 'url' ? 'url' : 'text'}
                    value={form[f.name] ?? ''} onChange={handleChange} required={f.required}
                    style={{ padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)', background: 'var(--bg-panel)', fontSize: 'var(--fs-sm)' }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
            <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
            <button type="button" className="btn btn-ghost" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center', padding: 'var(--space-sm)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-medium)' }}>
                <GripVertical size={16} style={{ opacity: 0.4, cursor: 'grab' }} />
              </th>
              {displayFields.map(f => (
                <th key={f.name} style={{ textAlign: 'left', padding: 'var(--space-sm)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-medium)' }}>{f.label}</th>
              ))}
              <th style={{ textAlign: 'right', padding: 'var(--space-sm)', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-medium)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item.id)}
                onDragEnd={handleDragEnd}
                style={{
                  borderBottom: '1px solid var(--border-light)',
                  background: draggedId === item.id ? 'var(--bg-hover)' : dragOverId === item.id ? 'var(--accent-bg)' : 'transparent',
                  cursor: 'grab',
                  transition: 'background 0.15s',
                }}
              >
                <td style={{ padding: 'var(--space-sm)', textAlign: 'center', width: '40px' }}>
                  <GripVertical size={16} style={{ opacity: 0.5, cursor: 'grab', color: 'var(--text-muted)' }} />
                </td>
                {displayFields.map(f => (
                  <td key={f.name} style={{ padding: 'var(--space-sm)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.type === 'file' && item[f.name] ? (
                      <img src={resolveUrl(item[f.name])} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                    ) : (item[f.name] ?? '—')}
                  </td>
                ))}
                <td style={{ padding: 'var(--space-sm)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button className="btn btn-ghost" style={{ fontSize: 'var(--fs-xs)', padding: '4px 10px', marginRight: '4px' }} onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-ghost" style={{ fontSize: 'var(--fs-xs)', padding: '4px 10px', color: 'var(--accent-pink)', border: '1px solid var(--accent-pink)' }} onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={displayFields.length + 2} style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>No items yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}