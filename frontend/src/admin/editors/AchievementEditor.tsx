import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'issuer', label: 'Issuer' },
  { name: 'date', label: 'Date' },
  { name: 'thumbnailUrl', label: 'Image', type: 'file' as const },
  { name: 'sortOrder', label: 'Sort', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const },
];

export default function AchievementEditor() {
  return (
    <CrudManager
      title="Achievements"
      fields={fields}
      emptyRow={{ title: '', issuer: '', date: '', thumbnailUrl: '', sortOrder: 0, description: '' }}
      api={api.achievements}
    />
  );
}
