import CrudManager from '../components/CrudManager';
import { api } from '../../lib/api';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'tags', label: 'Tags (JSON e.g. ["Unity","C#"])' },
  { name: 'demoUrl', label: 'Demo URL', type: 'url' as const },
  { name: 'githubUrl', label: 'GitHub URL', type: 'url' as const },
  { name: 'sortOrder', label: 'Sort', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const },
];

export default function ProjectEditor() {
  return (
    <CrudManager
      title="Projects"
      fields={fields}
      emptyRow={{ title: '', tags: '[]', demoUrl: '', githubUrl: '', sortOrder: 0, description: '' }}
      api={api.projects}
    />
  );
}
