import { Link } from 'react-router';

const sections = [
  { to: '/admin/profile', title: 'Profile', desc: 'Name, bio, contact info & avatar' },
  { to: '/admin/socials', title: 'Social Links', desc: 'Add/remove social media links' },
  { to: '/admin/experiences', title: 'Experience', desc: 'Work timeline entries' },
  { to: '/admin/projects', title: 'Projects', desc: 'Project cards with tags & links' },
  { to: '/admin/skills', title: 'Skills', desc: 'Skill bars with levels' },
  { to: '/admin/achievements', title: 'Achievements', desc: 'Awards & certifications' },
  { to: '/admin/scene', title: 'Scene Settings', desc: '3D scene colors & character model' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 style={{ color: 'var(--accent-pink)', marginBottom: 'var(--space-xl)' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-lg)' }}>
        {sections.map((s) => (
          <Link key={s.to} to={s.to} className="glass-panel" style={{
            padding: 'var(--space-lg)', display: 'block', color: 'var(--text-primary)',
          }}>
            <h3 style={{ margin: '0 0 var(--space-xs)', fontSize: 'var(--fs-md)', color: 'var(--accent-pink)' }}>{s.title}</h3>
            <p style={{ fontSize: 'var(--fs-xs)', margin: 0 }}>{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
