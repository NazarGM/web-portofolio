import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '../../store/uiStore';
import ProjectsPanel from '../panels/ProjectsPanel';
import SkillsPanel from '../panels/SkillsPanel';
import AchievementsPanel from '../panels/AchievementsPanel';

export default function PanelOverlay() {
  const { t } = useTranslation();
  const { activePanel } = useUIStore();
  const open = activePanel !== 'none';
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY || e.deltaX;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open, activePanel]);

  const titles: Record<string, string> = {
    projects: t('nav.projects').toUpperCase(),
    skills: t('nav.skills').toUpperCase(),
    achievements: t('nav.achievements').toUpperCase(),
  };

  return (
    <div className={`popup-overlay ${open ? 'open' : ''}`}>
      <div className="popup-header">
        <h3>{activePanel !== 'none' ? titles[activePanel] : ''}</h3>
      </div>
      <div className="popup-body" ref={bodyRef}>
        {activePanel === 'projects' && <ProjectsPanel />}
        {activePanel === 'skills' && <SkillsPanel />}
        {activePanel === 'achievements' && <AchievementsPanel />}
      </div>
    </div>
  );
}