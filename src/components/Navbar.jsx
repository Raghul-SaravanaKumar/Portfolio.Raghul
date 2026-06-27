import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setScrolled(scrollTop > 40);

      // Active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-inner">
          <div
            className="navbar-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="logo-badge">RS</div>
            <span>Raghul S</span>
          </div>

          <ul className="navbar-links center-links">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={active === l.href ? 'active' : ''}
                  onClick={(e) => handleNav(e, l.href)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="navbar-cta"
                onClick={(e) => handleNav(e, '#contact')}
                id="navbar-hire-btn"
              >
                Hire Me ✨
              </a>
            </li>
            <li>
            {/* Theme toggle button removed */}
            </li>
          </ul>

          <div
            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={active === l.href ? 'active' : ''}
              onClick={(e) => handleNav(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <div className="mobile-menu-divider" />
          <a
            href="#contact"
            className="navbar-cta"
            onClick={(e) => handleNav(e, '#contact')}
          >
            Hire Me ✨
          </a>
        </div>
      )}
    </>
  );
}
