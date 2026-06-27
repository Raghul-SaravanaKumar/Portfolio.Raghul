import { motion } from 'framer-motion';
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiSpringboot,
  SiFastapi,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiDocker,
  SiVisualstudiocode,
  SiIntellijidea,
  SiEclipse,
  SiRender,
  SiRailway,
  SiVercel,
  SiNetlify,
  SiBootstrap,
  SiSqlite,
  SiC,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';

const CATEGORIES = [
  {
    icon: '🧠',
    title: 'Languages',
    color: '#0ef5e9',
    items: [
      { name: 'C', icon: <SiC />, color: '#a8b9cc' },
      { name: 'Java', icon: <FaJava />, color: '#e76f00' },
      { name: 'Python', icon: <SiPython />, color: '#3b84c4' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#e44d26' },
      { name: 'CSS3', icon: <SiCss />, color: '#264de4' },
    ],
  },
  {
    icon: '⚡',
    title: 'Frameworks & Libraries',
    color: '#22d3ee',
    items: [
      { name: 'Bootstrap', icon: <SiBootstrap />, color: '#7952b3' },
      { name: 'Flask', icon: <SiFlask />, color: '#aaaaaa' },
    ],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    color: '#4ade80',
    items: [
      { name: 'SQL', icon: <SiSqlite />, color: '#003b57' },
    ],
  },
  {
    icon: '🛠️',
    title: 'Tools & Version Control',
    color: '#fb7185',
    items: [
      { name: 'Git', icon: <SiGit />, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#e0e0e0' },
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: -15 },
    visible: {
      opacity: 1, y: 0, scale: 1, rotateX: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300 } },
  };

  return (
    <section id="skills" ref={ref} style={{ background: 'rgba(13,13,28,0.4)' }}>
      <div className="container">
        <div className="section-divider" />
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          My <span className="gradient-text">Skills</span>
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Technologies I work with every day
        </motion.p>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.title}
              className="skill-category skill-category-glow"
              style={{ '--cat-color': cat.color }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2, type: 'spring', stiffness: 300 },
              }}
            >
              {/* Top accent bar */}
              <div className="skill-cat-bar" style={{ background: cat.color }} />

              <motion.div
                className="skill-category-icon"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                {cat.icon}
              </motion.div>
              <div className="skill-category-title">{cat.title}</div>

              <motion.div
                className="skill-badges"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              >
                {cat.items.map((item) => (
                  <motion.span
                    key={item.name}
                    className="skill-badge skill-badge-hover"
                    style={{ '--badge-color': item.color }}
                    variants={badgeVariants}
                    whileHover={{
                      y: -4,
                      scale: 1.1,
                      boxShadow: `0 6px 20px ${item.color}40`,
                      transition: { duration: 0.15 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      style={{ color: item.color }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: Math.random() * 3 }}
                    >
                      {item.icon}
                    </motion.span>
                    {item.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
