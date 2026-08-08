import { useTranslation } from 'react-i18next';
import { useExperiences } from '../../hooks/useResource';

function fmt(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export default function ExperiencePanel() {
  const { t } = useTranslation();
  const { data: experiences, loading } = useExperiences();

  return (
    <>
      <div className="panel-header"><span className="deco">◇——</span><h2>{t('experience.title')}</h2><span className="deco">——◇</span></div>

      <div className="timeline">
        {loading && <p className="bio">{t('common.loading')}</p>}

        {experiences?.map((exp) => {
          const cur = !exp.endDate;
          const range = cur
            ? `${fmt(exp.startDate)} - ${t('experience.present')}`
            : `${fmt(exp.startDate)} - ${fmt(exp.endDate!)}`;

          return (
            <div className="timeline-item" key={exp.id}>
              <div className="timeline-dot" />
              <div className="timeline-date">{range}</div>
              <div className="timeline-card">
                <div>
                  <p className="timeline-role">{exp.role}</p>
                  <p className="timeline-org">{exp.company}</p>
                  {exp.description && <p className="timeline-desc">{exp.description}</p>}
                </div>
              </div>
            </div>
          );
        })}
        {experiences?.length === 0 && <p className="text-muted">{t('common.noData')}</p>}
      </div>
    </>
  );
}