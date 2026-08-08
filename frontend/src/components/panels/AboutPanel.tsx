import { useTranslation } from 'react-i18next';
import { useProfile, useSocials } from '../../hooks/useResource';
import { resolveUrl } from '../../lib/api';
import { MapPin, Mail, Globe, CalendarDays } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa6';

function renderSocialIcon(name?: string) {
  const lower = (name || '').toLowerCase();
  switch (lower) {
    case 'github': return <FaGithub size={16} />;
    case 'linkedin': return <FaLinkedin size={16} />;
    case 'x':
    case 'xtwitter': return <FaXTwitter size={16} />;
    case 'twitter': return <FaTwitter size={16} />;
    case 'instagram': return <FaInstagram size={16} />;
    default: return <FaGlobe size={16} />;
  }
}

export default function AboutPanel() {
  const { t } = useTranslation();
  const { data: profile, loading } = useProfile();
  const { data: socials } = useSocials();

  return (
    <>
      <div className="panel-header"><span className="deco">◇——</span><h2>{t('about.title')}</h2><span className="deco">——◇</span></div>

      <div className="avatar">
        {profile?.avatarUrl ? (
          <img src={resolveUrl(profile.avatarUrl)} alt={profile.name} />
        ) : (
          <div className="placeholder-box" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        )}
      </div>

      <h3 className="name">{loading ? t('common.loading') : profile?.name}</h3>
      <p className="role">{profile?.title}</p>
      <p className="bio">{profile?.bio}</p>

      <div className="section-label">{t('about.info')}</div>
      <div className="info-list">
        {profile?.age != null && (
          <div className="info-row"><span className="ico"><CalendarDays size={13} /></span><span>{profile.age} {t('about.yearsOld')}</span></div>
        )}
        {profile?.location && (
          <div className="info-row"><span className="ico"><MapPin size={13} /></span><span>{profile.location}</span></div>
        )}
        {profile?.email && (
          <div className="info-row"><span className="ico"><Mail size={13} /></span><span>{profile.email}</span></div>
        )}
        {profile?.website && (
          <div className="info-row"><span className="ico"><Globe size={13} /></span><span>{profile.website}</span></div>
        )}
      </div>

      <div className="section-label">{t('about.socials')}</div>
      <div className="socials-grid">
        {socials?.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="social-item">
            <div className="social-icon">{renderSocialIcon(s.iconName || s.platform)}</div>
            <span>{s.platform}</span>
          </a>
        ))}
      </div>
    </>
  );
}