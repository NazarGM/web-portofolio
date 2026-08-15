import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'title', label: 'Title (ID)', required: true },
  { name: 'titleEn', label: 'Title (EN)' },
  { name: 'issuer', label: 'Issuer' },
  { name: 'date', label: 'Date' },
  { name: 'thumbnailUrl', label: 'Image', type: 'file' as const },
  { name: 'description', label: 'Description (ID)', type: 'textarea' as const },
  { name: 'descriptionEn', label: 'Description (EN)', type: 'textarea' as const },
  { name: 'sortOrder', label: 'Sort Order', type: 'number' as const },
];

export default function AchievementEditor() {
  return (
    <CrudManager
      title="Achievements"
      fields={fields}
      emptyRow={{ title: '', titleEn: '', issuer: '', date: '', thumbnailUrl: '', description: '', descriptionEn: '', sortOrder: 0 }}
      api={api.achievements}
    />
  );
}
