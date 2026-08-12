import { FaGithub, FaLinkedin } from 'react-icons/fa';
import AppleEmoji from './AppleEmoji';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const handleNav = (e, href) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.1rem' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark))',
                display: 'grid', placeItems: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 800,
              }}>RS</div>
              Raghul S
            </div>
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.8rem',
              lineHeight: '1.65',
              color: 'var(--accent-green)',
              background: 'rgba(57, 255, 20, 0.02)',
              border: '1px solid rgba(57, 255, 20, 0.12)',
              borderRadius: '10px',
              padding: '0.8rem 1.1rem',
              marginTop: '1.1rem',
              textAlign: 'left',
              maxWidth: '480px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(57, 255, 20, 0.03)',
              borderLeft: '3px solid var(--accent-green)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem', fontSize: '0.68rem', color: 'rgba(57, 255, 20, 0.6)', fontWeight: 700, letterSpacing: '0.08em' }}>
                <span>[KERNEL_STATUS]: CRACKED</span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)' }} />
              </div>
              <span style={{ color: '#fff' }}>Toppers are running on outdated OS.</span> We just jailbroke the system and installed our own knowledge base <AppleEmoji emoji="⚡" />
            </div>
          </div>

          <div className="footer-links">
            {footerLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={(e) => handleNav(e, l.href)}>
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/Raghul-SaravanaKumar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/raghul-saravanakumar/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Raghul S · Built with <span className="footer-heart">♥</span> using Vite + React</span>
          <span style={{ color: 'var(--text-dim)' }}>Designed &amp; developed by Raghul S</span>
        </div>
      </div>
    </footer>
  );
}
