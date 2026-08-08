import { useTranslation } from 'react-i18next';

interface FormFieldProps {
  label: string;
  name?: string;
  type?: string;
  value?: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  fullWidth?: boolean;
}

export default function FormField({ label, name, type = 'text', value, onChange, required, fullWidth }: FormFieldProps) {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)', minWidth: fullWidth ? '100%' : '140px' }}>
      <label style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 500 }} htmlFor={name}>
        {label}{required && ' *'}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          rows={3}
          style={{
            padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)',
            background: 'var(--bg-panel)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-sm)', width: '100%',
          }}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          style={{
            padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)',
            background: 'var(--bg-panel)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-sm)', width: '100%', cursor: 'pointer',
          }}
        >
          {onChange ? null : null}
          {t('')}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          style={{
            padding: 'var(--space-sm)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)',
            background: 'var(--bg-panel)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-sm)', width: '100%',
          }}
        />
      )}
    </div>
  );
}
