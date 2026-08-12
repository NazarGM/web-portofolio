import { useTranslation } from 'react-i18next';
import { useSkills } from '../../hooks/useResource';
import { resolveUrl, localize } from '../../lib/api';
import { Hexagon } from 'lucide-react';

export default function SkillsPanel() {
  const { t } = useTranslation();
  const { data: skills, loading } = useSkills();

  return (
    <>
      {loading && <p className="text-muted" style={{ padding: '22px' }}>{t('common.loading')}</p>}
      {!loading && (!skills || skills.length === 0) && (
        <div className="empty-state"><div className="box placeholder-box"></div><span>{t('common.noData')}</span></div>
      )}

      <div className="skills-bars">
        {skills?.map((s) => (
          <div key={s.id} className="skill-bar-row">
            <div className="skill-bar-line">
              <div className="skill-left">
                <div className="skill-icon">
                  {s.iconName ? <img src={resolveUrl(s.iconName)} alt={s.name} style={{ width: '100%', height: '100%', borderRadius: 6 }} /> : <Hexagon size={14} />}
                </div>
                <span>{localize(s, 'name')}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: `${Math.min(100, Math.max(0, s.level))}%` }} />
              </div>
              <span className="skill-level">{s.level}%</span>
            </div>
            {s.description && <div className="skill-desc">{localize(s, 'description')}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
