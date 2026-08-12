import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  'HELLO',
  'வணக்கம்', // Tamil: Vanakkam
  'DESIGN',
  'DEVELOP',
  'DEBUG',
  'DEPLOY',
  'INNOVATE',
];

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Slowed numerical counter
    let start = 0;
    const duration = 3800; // 3.8 seconds total loader duration
    const intervalTime = 15;
    const stepCount = duration / intervalTime;
    
    const timer = setInterval(() => {
      start += 1;
      const progress = Math.min(Math.floor((start / stepCount) * 100), 100);
      setCount(progress);

      // Cycle words based on progress
      const wordStep = Math.floor(100 / WORDS.length);
      const nextWordIdx = Math.min(Math.floor(progress / wordStep), WORDS.length - 1);
      setWordIdx(nextWordIdx);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 600); // Wait for fade-out animation
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100vh',
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#040408',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '3rem 2rem',
            fontFamily: "'Outfit', sans-serif",
            overflow: 'hidden',
          }}
        >
          {/* Top: Logo Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#fff',
            }}
          >
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-purple-dark))',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
            }}>
              RS
            </div>
            <span>Raghul S</span>
          </motion.div>

          {/* Middle: Word Switcher */}
          <div style={{ position: 'relative', height: '120px', display: 'grid', placeItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={WORDS[wordIdx]}
                initial={{ opacity: 0, y: 30, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: 45 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  margin: 0,
                  transformPerspective: 600,
                  background: 'linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.4))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {WORDS[wordIdx]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Bottom: Progress counter and progress bar */}
          <div style={{ width: 'min(100%, 360px)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              <span>LOADING SYSTEMS</span>
              <motion.span 
                style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-purple-light)' }}
              >
                {count}%
              </motion.span>
            </div>
            
            {/* Progress bar container */}
            <div style={{
              width: '100%',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-purple-light))',
                  width: `${count}%`,
                  boxShadow: '0 0 10px var(--accent-purple)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
