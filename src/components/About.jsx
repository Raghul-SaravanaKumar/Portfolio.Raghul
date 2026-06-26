import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SiPython, SiJavascript, SiHtml5, SiCss, SiFlask, SiGit, SiBootstrap, SiGithub, SiSqlite, SiC, SiReact, SiDocker } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';
import { useCallback, useRef } from 'react';

const goals = [
  'Web Development & Design',
  'Java & OOP Programming',
  'Database Management',
  'Open Source Contribution',
];

const achievements = [
  { name: 'First Aid Assistance (Web mode)', emoji: '🩺', text: 'Intern @ CADIBAL' },
  { icon: '💻', text: '4+ GitHub Projects' },
  { icon: '🚀', text: 'Passionate Developer' },
];

const infoItems = [
  { label: 'Location', value: 'Erode, Tamilnadu, India 🇮🇳' },
  { label: 'Degree', value: 'B.E CSE (2023–2027)' },
  { label: 'College', value: 'Shree Venkateshwara Hi-Tech' },
  { label: 'Email', value: 'raghullingesh58@gmail.com' },
  { label: 'GitHub', value: '@Raghul1815' },
  { label: 'Languages', value: 'Tamil, English' },
  { label: 'Resume', value: <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>View Resume (PDF)</a> },
];

function TiltAvatar({ children }) {
  const ref = useRef(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-y * 18);
    rotY.set(x * 18);
  }, [rotX, rotY]);

  const handleLeave = useCallback(() => {
    rotX.set(0); rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', transformPerspective: 700 }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: 'spring', stiffness: 200 } },
  };

  const chipVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: 'spring' } },
  };

  return (
    <section id="about" ref={ref} className="about-section">
      <div className="container">
        <div className="section-divider" />
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Who I am and what drives me
        </motion.p>

        <div className="about-grid">
          {/* Left — avatar + achievements */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <TiltAvatar>
              <motion.div
                className="about-avatar-wrap"
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 180 }}
              >
                <img src="/raghul.jpg" alt="Raghul portrait" className="about-avatar about-avatar-pulse"/>

                {/* Orbiting dots */}
                <div className="orbit-ring">
                  {['⚡', '🚀', '🤖', '💡'].map((ic, i) => (
                    <span key={i} className="orbit-dot" style={{ '--i': i }}>
                      {ic}
                    </span>
                  ))}
                </div>
              </motion.div>
            </TiltAvatar>

            <motion.div
              className="about-achievements"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {achievements.map((a) => (
                <motion.div
                  key={a.text}
                  className="achievement-item achievement-shine"
                  variants={itemVariants}
                  whileHover={{ x: 6, scale: 1.02, transition: { duration: 0.15 } }}
                >
                  <span className="achievement-icon">{a.icon || a.emoji}</span>
                  <span>{a.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2>
              Raghul S — <span className="gradient-text">CSE Student&nbsp;&amp;&nbsp;Web Developer</span>
            </h2>
            <p>
              Hello! I'm Raghul S, a passionate Computer Science and Engineering student at Shree Venkateshwara
              Hi-Tech Engineering College. I specialize in web technologies and possess strong Java programming
              skills, including a solid understanding of OOP concepts.
            </p>
            <p>
              I love creating efficient, user-friendly applications like my 🌤️ Weather Broadcasting project or the 🎓 Self Learning Portal that solve real-world problems.
            </p>
            <p>
              Currently, I am working as an intern at CADIBAL, focusing on their 🚑 First Aid Assistance project and Self Learning Portal to help transform careers through technology.
            </p>

            <motion.div
              className="about-highlights"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {goals.map((g) => (
                <motion.span
                  className="highlight-chip highlight-chip-animated"
                  key={g}
                  variants={chipVariants}
                  whileHover={{ scale: 1.06, y: -3 }}
                >
                  🎯 {g}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="about-info-row"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {infoItems.map((item, i) => (
                <motion.div
                  className="info-item"
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
