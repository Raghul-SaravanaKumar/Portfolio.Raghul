import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { FiAward, FiExternalLink, FiCpu } from 'react-icons/fi';
import AppleEmoji from './AppleEmoji';

const CERTIFICATIONS = [
  {
    title: 'Java Programming & Data Structures',
    issuer: 'GUVI / NPTEL',
    date: '2024',
    hash: 'JVM-9471-B83A',
    link: '#',
    tags: ['Java', 'OOPs', 'Data Structures'],
    accentColor: '#4ade80',
  },
  {
    title: 'Python Web Development & Flask',
    issuer: 'Cognizant / CADIBAL Internal Training',
    date: '2024',
    hash: 'PYF-4819-A92B',
    link: '#',
    tags: ['Python', 'Flask', 'Backend Systems'],
    accentColor: '#22d3ee',
  },
  {
    title: 'Relational Databases & SQL',
    issuer: 'Oracle Academy / GUVI',
    date: '2023',
    hash: 'SQL-8371-D20F',
    link: '#',
    tags: ['MySQL', 'PostgreSQL', 'Database Tuning'],
    accentColor: '#a78bfa',
  },
];

export default function Certifications() {
  const [ref, inView] = useInView();

  return (
    <section id="certifications" ref={ref} style={{ padding: '5rem 0', background: 'rgba(2, 2, 4, 0.4)' }}>
      <div className="container">
        <div className="section-divider" />
        
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Verified <span className="gradient-text">Credentials</span>
        </motion.h2>
        
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Cryptographically signed technical achievements
        </motion.p>

        {/* Credentials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '3rem',
        }}>
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(5, 5, 10, 0.8)',
                border: `1px solid rgba(255, 255, 255, 0.05)`,
                borderTop: `2px solid ${cert.accentColor}`,
                borderRadius: '12px',
                padding: '1.5rem',
                fontFamily: 'var(--mono)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                position: 'relative',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '240px',
              }}
            >
              {/* Decorative Scan Lines inside Card */}
              <div style={{
                position: 'absolute',
                top: 8,
                right: 12,
                fontSize: '0.62rem',
                color: 'rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}>
                <FiCpu style={{ color: cert.accentColor }} />
                <span>SEC_VER_0x{cert.date}</span>
              </div>

              {/* Verified Header Indicator */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: cert.accentColor,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: '1rem',
                }}>
                  <span style={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    background: cert.accentColor, 
                    boxShadow: `0 0 6px ${cert.accentColor}` 
                  }} />
                  [SIGNATURE_VALID]
                </div>

                {/* Certificate Title */}
                <h3 style={{
                  color: '#fff',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  lineHeight: '1.4',
                  margin: '0 0 0.6rem 0',
                  fontFamily: 'var(--sans)',
                }}>
                  {cert.title}
                </h3>

                {/* Issuer details */}
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.74rem', marginBottom: '1.25rem' }}>
                  ISSUER: <span style={{ color: '#fff' }}>{cert.issuer}</span>
                </div>
              </div>

              {/* Card Footer detail row */}
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.25)', marginBottom: '0.15rem' }}>KEY_HASH</div>
                  <div style={{ fontSize: '0.72rem', color: cert.accentColor, letterSpacing: '0.04em' }}>{cert.hash}</div>
                </div>

                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.4rem 0.65rem',
                    borderRadius: '6px',
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    background: 'rgba(255,255,255,0.02)',
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.7rem',
                    transition: 'all 0.22s ease',
                  }}
                  whileHover={{ borderColor: cert.accentColor, background: `${cert.accentColor}11` }}
                >
                  <FiExternalLink /> --verify
                </motion.a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
