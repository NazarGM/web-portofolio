import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'role', label: 'Role', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'type', label: 'Type', options: ['Full-time', 'Freelance', 'Internship', 'Part-time', 'Contract'] },
  { name: 'startDate', label: 'Start Date' },
  { name: 'endDate', label: 'End Date (blank = present)' },
  { name: 'sortOrder', label: 'Sort', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const },
];

export default function ExperienceEditor() {
  return (
    <CrudManager
      title="Experience"
      fields={fields}
      emptyRow={{ role: '', company: '', type: 'Full-time', startDate: '', endDate: '', sortOrder: 0, description: '' }}
      api={api.experiences}
    />
  );
}
