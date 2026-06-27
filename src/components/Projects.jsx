import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useInView } from '../hooks/useInView';
import { useCallback, useRef } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

const PROJECTS = [
  {
    name: 'Weather Broadcasting',
    emoji: '🌤️',
    description:
      'A web application that displays real-time weather updates using external APIs and location detection.',
    lang: 'Python / Flask',
    langColor: '#3b84c4',
    github: 'https://github.com/Raghul1815/Weather-Broadcasting',
    live: 'https://github.com/Raghul1815/Weather-Broadcasting#readme',
    tags: ['Python', 'Flask', 'API Integration', 'Responsive Design'],
    featured: true,
    accentColor: '#22d3ee',
  },
  {
    name: 'Self Learning Portal',
    emoji: '🎓',
    description:
      'An educational web portal designed to help students transform their careers by learning top in-demand skills and accessing structured learning resources.',
    lang: 'HTML / CSS / JS',
    langColor: '#f7df1e',
    github: 'https://github.com/Raghul1815',
    live: 'https://www.cadibal.org/',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Self-Learning', 'EdTech'],
    featured: true,
    accentColor: '#0ef5e9',
  },
  {
    name: 'First Aid Assistance',
    emoji: '🚑',
    description:
      'An emergency healthcare platform that provides users with quick and direct access to vital first aid information during critical situations.',
    lang: 'Python / Flask',
    langColor: '#3b84c4',
    github: 'https://github.com/Raghul1815/Medicalbot/tree/main/interactions%5B1%5D/interactions',
    live: '',
    tags: ['Python', 'Flask', 'NLP Chatbot', 'First Aid', 'Emergency Help'],
    featured: true,
    accentColor: '#fb7185',
  },
  {
    name: 'First Aid Assistance (Web mode)',
    emoji: '🩺',
    description:
      'A web-based first aid resource helper system designed to deliver quick assistance instructions and guide users through medical emergencies.',
    lang: 'HTML / CSS / JS',
    langColor: '#e44d26',
    github: 'https://github.com/Raghul1815/Medical-Website',
    live: 'https://raghul1815.github.io/Medical-Website/',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Emergency Assistant', 'Responsive UI'],
    featured: false,
    accentColor: '#4ade80',
  },
  {
    name: 'Nesamani – The Contractor',
    emoji: '🏗️',
    description:
      'A contractor-service management platform enabling job posting and service requests.',
    lang: 'Java / Spring Boot / HTML / CSS / JS',
    langColor: '#e44d26',
    github: 'https://github.com/Raghul1815/Nesamani',
    live: 'https://nesamani.example.com/',
    tags: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript'],
    featured: false,
    accentColor: '#f97316',
  },
  {
    name: 'SubZy',
    emoji: '🛠️',
    description:
      'A utility platform for ... (placeholder description).',
    lang: 'Node.js / Express',
    langColor: '#68d391',
    github: 'https://github.com/Raghul1815/SubZy',
    live: '',
    tags: ['Node.js', 'Express'],
    featured: false,
    accentColor: '#34d399',
  },
  {
    name: 'CyberShield AI',
    emoji: '🛡️',
    description:
      'AI-powered cybersecurity analysis platform.',
    lang: 'Python / FastAPI',
    langColor: '#3b84c4',
    github: 'https://github.com/Raghul1815/CyberShield',
    live: '',
    tags: ['Python', 'FastAPI', 'AI', 'Security'],
    featured: false,
    accentColor: '#ec4899',
  },
];

function ProjectCard({ proj, index }) {
  const ref = useRef(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-y * 10);
    rotY.set(x * 10);
  }, [rotX, rotY]);

  const handleLeave = useCallback(() => {
    rotX.set(0); rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.div
      ref={ref}
      className={`project-card project-card-v2${proj.featured ? ' featured' : ''}`}
      style={{
        '--accent': proj.accentColor,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, type: 'spring', stiffness: 120 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ z: 30 }}
    >
      {/* Shimmer sweep on hover */}
      <div className="card-shimmer" />

      {/* Colored top stripe */}
      <div className="project-stripe" style={{ background: proj.accentColor }} />

      {proj.hackathonWinner && (
        <motion.span
          className="project-badge hackathon"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🏆 Hackathon Winner
        </motion.span>
      )}
      {proj.featured && !proj.hackathonWinner && (
        <span className="project-badge">Featured</span>
      )}

      <div className="project-header">
        <motion.div
          className="project-icon project-icon-v2"
          style={{ background: `${proj.accentColor}22`, borderColor: `${proj.accentColor}44` }}
          whileHover={{ scale: 1.2, rotate: -8 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {proj.emoji}
        </motion.div>
        <div className="project-links">
          <motion.a
            className="project-link-btn"
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${proj.name} on GitHub`}
            id={`github-${proj.name.toLowerCase().replace(/\s/g, '-')}`}
            whileHover={{ scale: 1.15, rotate: 5, borderColor: proj.accentColor }}
            whileTap={{ scale: 0.9 }}
          >
            <FiGithub />
          </motion.a>
          {proj.live && (
            <motion.a
              className="project-link-btn"
              href={proj.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${proj.name}`}
              id={`open-${proj.name.toLowerCase().replace(/\s/g, '-')}`}
              whileHover={{ scale: 1.15, rotate: -5, borderColor: proj.accentColor }}
              whileTap={{ scale: 0.9 }}
            >
              <FiExternalLink />
            </motion.a>
          )}
        </div>
      </div>

      <div className="project-name">{proj.name}</div>
      <div className="project-desc">{proj.description}</div>

      <div className="project-tags">
        {proj.tags.map((tag, i) => (
          <motion.span
            key={tag}
            className="project-tag project-tag-v2"
            style={{ '--tag-color': proj.accentColor }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + i * 0.04 }}
            whileHover={{ scale: 1.1 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="project-footer">
        <motion.div
          className="lang-dot"
          style={{ background: proj.langColor }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
        />
        <span className="lang-label">{proj.lang}</span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <div className="section-divider" />
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Things I've built and shipped
        </motion.p>

        <div className="projects-grid">
          {PROJECTS.map((proj, i) => (
            <ProjectCard key={proj.name} proj={proj} index={i} />
          ))}
        </div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="https://github.com/Raghul1815"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="view-all-github"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiGithub /> View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
