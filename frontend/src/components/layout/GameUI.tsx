import { useEffect } from 'react';
import Scene from '../three/Scene';
import AboutPanel from '../panels/AboutPanel';
import ExperiencePanel from '../panels/ExperiencePanel';
import PanelOverlay from './PanelOverlay';
import BottomNav from './BottomNav';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '../../store/uiStore';

export default function GameUI() {
  const { t, i18n } = useTranslation();
  const { mobilePanel, setMobilePanel, activePanel } = useUIStore();

  useEffect(() => {
    const stage = document.getElementById('characterStage');
    if (!stage) return;
    stage.classList.add('reacting');
    const timer = setTimeout(() => stage.classList.remove('reacting'), 400);
    return () => clearTimeout(timer);
  }, [activePanel]);

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle('theme-dark');
    const btnSpan = document.getElementById('themeSpan');
    const btnIcon = document.getElementById('themeIcon');
    if (btnSpan) btnSpan.textContent = isDark ? 'DARK' : 'LIGHT';
    if (btnIcon) btnIcon.textContent = isDark ? '🌙' : '☀';
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en');
  };

  const openMobilePanel = (panel: 'about' | 'experience') => {
    setMobilePanel(panel);
  };

  const closeMobilePanel = () => {
    setMobilePanel('none');
  };

  const currentLang = i18n.language === 'en' ? 'EN' : 'ID';

  return (
    <div className={`app${mobilePanel !== 'none' ? ' drawer-open' : ''}`} id="app">
      {/* About Panel (Left) */}
      <aside className={`about-panel ${mobilePanel === 'about' ? 'open' : ''}`}>
        <button className="back-btn" onClick={closeMobilePanel}>← Back</button>
        <AboutPanel />
      </aside>

      {/* Main Panel (Center) */}
      <main className="main-panel">
        <div className="character-stage" id="characterStage">
          <Scene />
        </div>

        <div className="main-ui-layer">
        <div className="mobile-top-nav">
          <button onClick={() => openMobilePanel('about')}>{t('nav.about')}</button>
          <button onClick={() => openMobilePanel('experience')}>{t('nav.experience')}</button>
        </div>

          <div className="main-header">
            <button className="chip-btn" id="themeToggleBtn" onClick={toggleTheme}>
              <span id="themeIcon">☀</span>
              <span id="themeSpan">LIGHT</span>
            </button>
            <button className="chip-btn" onClick={toggleLang}>
              🌐 <span>{currentLang}</span>
            </button>
          </div>

          <PanelOverlay />
          <BottomNav />
        </div>
      </main>

      {/* Experience Panel (Right) */}
      <aside className={`experience-panel ${mobilePanel === 'experience' ? 'open' : ''}`}>
        <button className="back-btn" onClick={closeMobilePanel}>← Back</button>
        <ExperiencePanel />
      </aside>
    </div>
  );
}
