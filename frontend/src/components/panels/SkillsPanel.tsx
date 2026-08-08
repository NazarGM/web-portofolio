import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSkills } from '../../hooks/useResource';
import { resolveUrl } from '../../lib/api';
import { Hexagon } from 'lucide-react';

export default function SkillsPanel() {
  const { t } = useTranslation();
  const { data: skills, loading } = useSkills();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <>
      {loading && <p className="text-muted" style={{ padding: '22px' }}>{t('common.loading')}</p>}
      {!loading && (!skills || skills.length === 0) && (
        <div className="empty-state"><div className="box placeholder-box"></div><span>{t('common.noData')}</span></div>
      )}

      {skills?.map((s, idx) => {
        const isExpanded = expandedIdx === idx;
        const levelText = s.level >= 80 ? 'Advanced' : s.level >= 50 ? 'Intermediate' : 'Beginner';
        return (
          <div key={s.id}>
            <div
              className={`skill-row ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpandedIdx(isExpanded ? null : idx)}
            >
              <div className="skill-left">
                <div className="skill-icon">
                  {s.iconName ? <img src={resolveUrl(s.iconName)} alt={s.name} style={{ width: '100%', height: '100%', borderRadius: 6 }} /> : <Hexagon size={14} />}
                </div>
                <span>{s.name}</span>
              </div>
              <span className="skill-level">{levelText}</span>
            </div>
            {isExpanded && s.description && (
              <div className="skill-desc">{s.description}</div>
            )}
          </div>
        );
      })}
    </>
  );
}
