import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'name', label: 'Name (ID)', required: true },
  { name: 'nameEn', label: 'Name (EN)' },
  { name: 'category', label: 'Category' },
  { name: 'level', label: 'Level (0-100)', type: 'number' as const },
  { name: 'iconName', label: 'Icon (emoji)' },
  { name: 'description', label: 'Description (ID)', type: 'textarea' as const },
  { name: 'descriptionEn', label: 'Description (EN)', type: 'textarea' as const },
  { name: 'sortOrder', label: 'Sort Order', type: 'number' as const },
];

export default function SkillEditor() {
  return (
    <CrudManager
      title="Skills"
      fields={fields}
      emptyRow={{ name: '', nameEn: '', category: '', level: 50, iconName: '⭐', description: '', descriptionEn: '', sortOrder: 0 }}
      api={api.skills}
    />
  );
}
