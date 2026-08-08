import { useTranslation } from 'react-i18next';
import { resolveUrl } from '../../lib/api';
import { useProjects } from '../../hooks/useResource';

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map(String) : [raw];
    } catch { return [raw]; }
  }
  return [];
}

export default function ProjectsPanel() {
  const { t } = useTranslation();
  const { data: projects, loading } = useProjects();

  return (
    <div className="h-scroll">
      {loading && <p className="text-muted" style={{ padding: '22px' }}>{t('common.loading')}</p>}
      {!loading && (!projects || projects.length === 0) && (
        <div className="empty-state"><div className="box placeholder-box"></div><span>{t('common.noData')}</span></div>
      )}

      {projects?.map((p) => (
        <div className="p-card" key={p.id}>
          <div className="p-thumb">
            {p.thumbnailUrl ? <img src={resolveUrl(p.thumbnailUrl)} alt={p.title} /> : '✕'}
          </div>
          <div className="p-body">
            <p className="p-title">{p.title}</p>
            <p className="p-desc">{p.description}</p>
            <div className="p-tags">
              {parseTags(p.tags).map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
            </div>
            <div className="p-actions">
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer">{t('projects.github')}</a>
              )}
              {p.demoUrl && (
                <a href={p.demoUrl} target="_blank" rel="noreferrer">{t('projects.demo')}</a>
              )}
              {!p.githubUrl && !p.demoUrl && (
                <a href="#">{t('projects.demo')}</a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
