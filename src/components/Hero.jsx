import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import FloatingIcons from './FloatingIcons';
import MagneticButton from './MagneticButton';

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Raghul S — Web Developer', cls: 'term-green' },
  { type: 'cmd', text: 'cat skills.txt' },
  { type: 'out', text: 'Java · Python · Flask · Web Development · Git', cls: 'term-yellow' },
  { type: 'cmd', text: 'echo $STATUS' },
  { type: 'out', text: '💼 Currently Interning at CADIBAL', cls: '' },
  { type: 'cmd', text: 'echo $FOCUS' },
  { type: 'out', text: 'Building efficient & user-friendly web solutions 🚀', cls: '' },
];

const ROLES = ['Web Developer', 'Java Developer', 'Flask Developer', 'Problem Solver'];

function useTypewriter(lines) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  const done = currentLine >= lines.length;

  useEffect(() => {
    if (done) return;

    const line = lines[currentLine];
    const charDelay = line.type === 'cmd' ? 48 : 18;

    if (currentChar < line.text.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), charDelay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line }]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 380);
      return () => clearTimeout(t);
    }
  }, [currentChar, currentLine, lines, done]);

  const typing = currentLine < lines.length
    ? { ...lines[currentLine], text: lines[currentLine].text.slice(0, currentChar) }
    : null;

  return { visibleLines, typing, done };
}

function useRoleSwitcher(roles, interval = 2800) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % roles.length);
        setFade(true);
      }, 350);
    }, interval);
    return () => clearInterval(timer);
  }, [roles.length, interval]);

  return { role: roles[index], fade };
}

/** 3D Tilt card */
function TiltCard({ children, className = '', intensity = 12 }) {
  const ref = useRef(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-y * intensity);
    rotY.set(x * intensity);
  }, [rotX, rotY, intensity]);

  const handleLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        transformPerspective: 900,
      }}
    >
      {children}
    </motion.div>
  );
}


export default function Hero() {
  const { visibleLines, typing, done } = useTypewriter(TERMINAL_LINES);
  const { role, fade } = useRoleSwitcher(ROLES);

  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>
      <FloatingIcons />

      <div className="container">
        <div className="hero-layout">

          {/* ── LEFT: Name · Role · Bio · Buttons · Stats ── */}
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Available for opportunities
              </div>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text hero-name-glow">
                Raghul&nbsp;S
              </span>
            </motion.h1>

            <motion.div
              className="hero-role-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>I'm a</span>
              <span
                className="role-text"
                style={{
                  opacity: fade ? 1 : 0,
                  transform: fade ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                  display: 'inline-block',
                }}
              >
                {role}
              </span>
            </motion.div>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Passionate Web Developer and Computer Science and Engineering student.
              I love creating efficient, user-friendly applications that solve real-world problems.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <MagneticButton strength={0.4}>
                <button className="btn-primary btn-ripple" onClick={() => handleScroll('#projects')}>
                  🚀 View Projects
                </button>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <button className="btn-outline btn-ripple" onClick={() => handleScroll('#contact')}>
                  💬 Get in Touch
                </button>
              </MagneticButton>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              {[
                { num: '5+', label: 'GitHub Repos' },
                { num: '6', label: 'Languages' },
                { num: '4+', label: 'Frameworks & Tools' },
                { num: '💼', label: 'CADIBAL Intern' },
              ].map((s, i) => (
                <motion.div
                  className="stat-item stat-item-animated"
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.1, type: 'spring', stiffness: 300 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                >
                  <span className="stat-num">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Dog mascot + Terminal prompt ── */}
          <div className="hero-visual">
            {/* Animated dog mascot */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 120 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}
            >

            </motion.div>

            {/* Terminal below dog — 3D tilt */}
            <TiltCard className="glass-card hero-terminal tilt-card" intensity={8}>
              <div className="terminal-header">
                <span className="term-dot term-dot-r" />
                <span className="term-dot term-dot-y" />
                <span className="term-dot term-dot-g" />
                <span className="terminal-title">raghul@portfolio ~ bash</span>
              </div>
              <div className="terminal-body">
                {visibleLines.map((line, i) => (
                  <div key={i} className="term-line" style={{ marginBottom: '0.15rem' }}>
                    {line.type === 'cmd' ? (
                      <>
                        <span className="term-prompt">❯</span>
                        <span className="term-cmd">{line.text}</span>
                      </>
                    ) : (
                      <span className={`term-output ${line.cls || ''}`}>{line.text}</span>
                    )}
                  </div>
                ))}
                {typing && (
                  <div className="term-line">
                    {typing.type === 'cmd' ? (
                      <>
                        <span className="term-prompt">❯</span>
                        <span className="term-cmd">{typing.text}</span>
                        <span className="term-cursor" />
                      </>
                    ) : (
                      <span className={`term-output ${typing.cls || ''}`}>
                        {typing.text}<span className="term-cursor" />
                      </span>
                    )}
                  </div>
                )}
                {done && (
                  <div className="term-line" style={{ marginTop: '0.15rem' }}>
                    <span className="term-prompt">❯</span>
                    <span className="term-cursor" />
                  </div>
                )}
              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
