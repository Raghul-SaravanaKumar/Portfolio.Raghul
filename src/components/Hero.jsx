import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import FloatingIcons from './FloatingIcons';
import MagneticButton from './MagneticButton';
import AppleEmoji from './AppleEmoji';

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Raghul S — Web Developer', cls: 'term-green' },
  { type: 'cmd', text: 'butterfly skills.txt' },
  { type: 'out', text: 'Java · Python · Flask · Web Development · Git', cls: 'term-yellow' },
  { type: 'cmd', text: 'echo $STATUS' },
  { type: 'out', text: '💼 Worked as Web Developer Intern @ CADIBAL', cls: '' },
  { type: 'cmd', text: 'Inspirational_Quote Dragon_Fire.java' },
  { type: 'out', text: 'for (Learn; Code; Innovate++) {', cls: 'term-cyan' },
  { type: 'out', text: '  System.out.println("Evolution 📈");', cls: 'term-yellow' },
  { type: 'out', text: '}', cls: 'term-cyan' },
];

const parseTerminalLine = (text) => {
  if (typeof text !== 'string') return text;

  // Check if it is the Java System.out.println loop line
  if (text.includes('System.out.println')) {
    return (
      <>
        <span style={{ whiteSpace: 'pre' }}>  </span>
        <span style={{ color: '#7dd3fc', fontWeight: 600 }}>System</span>
        <span style={{ color: '#c9d1d9' }}>.</span>
        <span style={{ color: '#ff7b72' }}>out</span>
        <span style={{ color: '#c9d1d9' }}>.</span>
        <span style={{ color: '#d2a8ff' }}>println</span>
        <span style={{ color: '#c9d1d9' }}>(</span>
        <span style={{ color: '#ffa657' }}>"Evolution </span>
        <AppleEmoji emoji="📈" style={{ width: '1.05em', height: '1.05em', verticalAlign: '-0.15em' }} />
        <span style={{ color: '#ffa657' }}>"</span>
        <span style={{ color: '#c9d1d9' }}>);</span>
      </>
    );
  }

  const emojis = ['💼', '📈'];
  let parts = [text];
  
  emojis.forEach((emoji) => {
    let nextParts = [];
    parts.forEach((part) => {
      if (typeof part === 'string' && part.includes(emoji)) {
        const splitParts = part.split(emoji);
        splitParts.forEach((sp, idx) => {
          nextParts.push(sp);
          if (idx < splitParts.length - 1) {
            nextParts.push(
              <AppleEmoji 
                emoji={emoji} 
                key={`${emoji}-${idx}`} 
                style={{ width: '1.1em', height: '1.1em', verticalAlign: '-0.2em' }} 
              />
            );
          }
        });
      } else {
        nextParts.push(part);
      }
    });
    parts = nextParts;
  });
  
  return parts;
};

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
    // Track inner timeout so it can be cancelled on unmount
    let innerT;
    const timer = setInterval(() => {
      setFade(false);
      innerT = setTimeout(() => {
        setIndex(i => (i + 1) % roles.length);
        setFade(true);
      }, 350);
    }, interval);
    return () => {
      clearInterval(timer);
      clearTimeout(innerT);
    };
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
    <section className="hero" id="home" style={{ background: 'rgba(13,13,28,0.4)' }}>
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
                  <AppleEmoji emoji="🚀" /> View Projects
                </button>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <button className="btn-outline btn-ripple" onClick={() => handleScroll('#contact')}>
                  <AppleEmoji emoji="💬" /> Get in Touch
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
                { num: <AppleEmoji emoji="💼" />, label: 'CADIBAL Intern' },
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

          {/* ── RIGHT: Terminal prompt ── */}
          <div className="hero-visual">
            {/* Terminal — 3D tilt */}
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
                      <span className={`term-output ${line.cls || ''}`}>{parseTerminalLine(line.text)}</span>
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
                        {parseTerminalLine(typing.text)}<span className="term-cursor" />
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
