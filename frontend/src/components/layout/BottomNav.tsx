import { useTranslation } from 'react-i18next';
import { useUIStore } from '../../store/uiStore';
import type { ActivePanel } from '../../types';
import { FolderKanban, Gem, Trophy } from 'lucide-react';

export default function BottomNav() {
  const { t } = useTranslation();
  const { activePanel, togglePanel } = useUIStore();

  const tabs: { id: ActivePanel; icon: React.ReactNode; title: string; desc: string }[] = [
    { id: 'projects', icon: <FolderKanban size={16} />, title: t('nav.projects'), desc: t('nav.projectsDesc') },
    { id: 'skills', icon: <Gem size={16} />, title: t('nav.skills'), desc: t('nav.skillsDesc') },
    { id: 'achievements', icon: <Trophy size={16} />, title: t('nav.achievements'), desc: t('nav.achievementsDesc') },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = activePanel === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => togglePanel(tab.id)}
            className={`nav-btn ${isActive ? 'active' : ''}`}
          >
            <span className="glyph">{tab.icon}</span>
            <span>
              <strong>{tab.title.toUpperCase()}</strong>
              <small>{tab.desc}</small>
            </span>
          </button>
        );
      })}
    </nav>
  );
}