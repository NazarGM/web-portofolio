import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'role', label: 'Role (ID)', required: true },
  { name: 'roleEn', label: 'Role (EN)' },
  { name: 'company', label: 'Company', required: true },
  { name: 'type', label: 'Type', options: ['Full-time', 'Freelance', 'Internship', 'Part-time', 'Contract'] },
  { name: 'startDate', label: 'Start Date' },
  { name: 'endDate', label: 'End Date (blank = present)' },
  { name: 'description', label: 'Description (ID)', type: 'textarea' as const },
  { name: 'descriptionEn', label: 'Description (EN)', type: 'textarea' as const },
];

export default function ExperienceEditor() {
  return (
    <CrudManager
      title="Experience"
      fields={fields}
      emptyRow={{ role: '', roleEn: '', company: '', type: 'Full-time', startDate: '', endDate: '', description: '', descriptionEn: '' }}
      api={api.experiences}
    />
  );
}
