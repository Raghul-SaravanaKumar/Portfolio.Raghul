import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import AppleEmoji from './AppleEmoji';
import JailbreakText from './JailbreakText';

const links = [
  { label: 'about.sh', href: '#about' },
  { label: 'skills.cfg', href: '#skills' },
  { label: 'projects.log', href: '#projects' },
  { label: 'contact.bin', href: '#contact' },
];

const handleNav = (e, href) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="footer" style={{ 
      position: 'relative',
      background: '#020204', 
      padding: '4rem 0 2rem 0',
      borderTop: '1px solid rgba(57, 255, 20, 0.15)',
      fontFamily: 'var(--mono)',
      color: 'var(--text-muted)',
      overflow: 'hidden',
    }}>
      {/* Laser Scanning Accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        width: '80%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent-green), transparent)',
        boxShadow: '0 0 10px var(--accent-green)',
      }} />

      <div className="container">
        
        {/* Main Dashboard Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem',
        }}>
          
          {/* Column 1: System Tagline Decrypter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              fontSize: '0.68rem', 
              color: 'rgba(57, 255, 20, 0.5)', 
              fontWeight: 700, 
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              // SYSTEM_DECRYPT_LOG
            </div>
            <div style={{ 
              fontSize: '0.85rem', 
              lineHeight: '1.7', 
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>OS_TYPE:</span>{' '}
                <span style={{ color: 'var(--accent-rose)', textShadow: '0 0 10px rgba(251, 113, 133, 0.2)' }}>[OUTDATED]</span>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>KERNEL:</span>{' '}
                <span style={{ color: 'var(--accent-green)', textShadow: '0 0 10px rgba(57, 255, 20, 0.2)' }}>[JAILBROKEN]</span>
              </div>
              <div style={{ 
                fontSize: '0.78rem', 
                color: 'var(--text-muted)', 
                marginTop: '0.25rem',
                borderLeft: '2px solid var(--accent-green)',
                paddingLeft: '0.75rem',
                lineHeight: '1.6',
              }}>
                <JailbreakText />
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              fontSize: '0.68rem', 
              color: 'rgba(57, 255, 20, 0.5)', 
              fontWeight: 700, 
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              // ROOT_DIRECTORIES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNav(e, l.href)}
                  style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--accent-green)'; e.target.style.transform = 'translateX(6px)'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--text-muted)'; e.target.style.transform = 'translateX(0)'; }}
                >
                  <span style={{ color: 'var(--accent-green)' }}>&gt;</span> {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Social flags */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              fontSize: '0.68rem', 
              color: 'rgba(57, 255, 20, 0.5)', 
              fontWeight: 700, 
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              // EXTERNAL_LINKS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                <a
                  href="https://github.com/Raghul-SaravanaKumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.76rem',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-green)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.2)'; e.currentTarget.style.background = 'rgba(57, 255, 20, 0.03)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
                >
                  <FaGithub /> --github
                </a>
                <a
                  href="https://www.linkedin.com/in/raghul-saravanakumar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.76rem',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-green)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.2)'; e.currentTarget.style.background = 'rgba(57, 255, 20, 0.03)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
                >
                  <FaLinkedin /> --linkedin
                </a>
                <a
                  href="mailto:iamraghul18@gmail.com"
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.76rem',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-green)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.2)'; e.currentTarget.style.background = 'rgba(57, 255, 20, 0.03)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
                >
                  <FaEnvelope /> --email
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Console status footer bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.8rem',
          fontSize: '0.7rem',
          color: 'var(--text-dim)',
        }}>
          <div>
            <span>© {new Date().getFullYear()} RAGHUL_S · </span>
            <span style={{ color: 'var(--accent-green)', textShadow: '0 0 8px rgba(57, 255, 20, 0.2)' }}>[SECURE_ROOT]</span>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>LATENCY: <span style={{ color: '#fff' }}>24ms</span></span>
            <span>MEM: <span style={{ color: '#fff' }}>12.4GB</span></span>
            <span>CPU: <span style={{ color: '#fff' }}>18%</span></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
