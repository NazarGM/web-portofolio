import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'category', label: 'Category' },
  { name: 'level', label: 'Level (0-100)', type: 'number' as const },
  { name: 'iconName', label: 'Icon (emoji)' },
  { name: 'sortOrder', label: 'Sort', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const },
];

export default function SkillEditor() {
  return (
    <CrudManager
      title="Skills"
      fields={fields}
      emptyRow={{ name: '', category: '', level: 50, iconName: '⭐', sortOrder: 0, description: '' }}
      api={api.skills}
    />
  );
}
