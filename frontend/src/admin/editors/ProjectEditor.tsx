import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'tags', label: 'Tags (JSON e.g. ["Unity","C#"])' },
  { name: 'thumbnailUrl', label: 'Thumbnail', type: 'file' as const },
  { name: 'demoUrl', label: 'Link URL (https://...)', type: 'url' as const },
  { name: 'githubUrl', label: 'Button Label (e.g. Itch.io, GitHub, Play Store)', required: true },
  { name: 'sortOrder', label: 'Sort', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const },
];

export default function ProjectEditor() {
  return (
    <CrudManager
      title="Projects"
      fields={fields}
      emptyRow={{ title: '', tags: '[]', thumbnailUrl: '', demoUrl: '', githubUrl: 'View', sortOrder: 0, description: '' }}
      api={api.projects}
    />
  );
}
