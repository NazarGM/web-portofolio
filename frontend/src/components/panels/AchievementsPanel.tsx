import { useTranslation } from 'react-i18next';
import { resolveUrl, localize } from '../../lib/api';
import { useAchievements } from '../../hooks/useResource';

export default function AchievementsPanel() {
  const { t } = useTranslation();
  const { data: achievements, loading } = useAchievements();

  return (
    <div className="h-scroll">
      {loading && <p className="text-muted" style={{ padding: '22px' }}>{t('common.loading')}</p>}
      {!loading && (!achievements || achievements.length === 0) && (
        <div className="empty-state"><div className="box placeholder-box"></div><span>{t('common.noData')}</span></div>
      )}

      {achievements?.map((a) => (
        <div className="p-card" key={a.id}>
          <div className="p-thumb">
            {a.thumbnailUrl ? <img src={resolveUrl(a.thumbnailUrl)} alt={a.title} /> : '🏆'}
          </div>
          <div className="p-body">
            <p className="p-title">{localize(a, 'title')}</p>
            {a.issuer && <p className="p-desc issuer">{a.issuer}{a.date ? ` · ${new Date(a.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}` : ''}</p>}
            {a.description && <p className="p-desc">{localize(a, 'description')}</p>}
            <div className="p-actions">
              <button>{t('achievements.viewCredential')}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}