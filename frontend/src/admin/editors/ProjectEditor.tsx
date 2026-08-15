import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'title', label: 'Title (ID)', required: true },
  { name: 'titleEn', label: 'Title (EN)' },
  { name: 'tags', label: 'Tags (JSON e.g. ["Unity","C#"])' },
  { name: 'thumbnailUrl', label: 'Thumbnail', type: 'file' as const },
  { name: 'demoUrl', label: 'Link URL (https://...)', type: 'url' as const },
  { name: 'githubUrl', label: 'Button Label (e.g. Itch.io, GitHub, Play Store)', required: true },
  { name: 'description', label: 'Description (ID)', type: 'textarea' as const },
  { name: 'descriptionEn', label: 'Description (EN)', type: 'textarea' as const },
  { name: 'sortOrder', label: 'Sort Order', type: 'number' as const },
];

export default function ProjectEditor() {
  return (
    <CrudManager
      title="Projects"
      fields={fields}
      emptyRow={{ title: '', titleEn: '', tags: '[]', thumbnailUrl: '', demoUrl: '', githubUrl: 'View', description: '', descriptionEn: '', sortOrder: 0 }}
      api={api.projects}
    />
  );
}
