import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
            <p className="footer-tagline">
              Fuelled by curiosity, driven by code ✨
            </p>
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
          <span>© 2025 Raghul S · Built with <span className="footer-heart">♥</span> using Vite + React</span>
          <span style={{ color: 'var(--text-dim)' }}>Designed &amp; developed by Raghul S</span>
        </div>
      </div>
    </footer>
  );
}
