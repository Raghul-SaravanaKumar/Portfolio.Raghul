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
  const [consoleLine, setConsoleLine] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isShearing, setIsShearing] = useState(false);

  // Diagnostics handler
  useEffect(() => {
    if (count < 25) {
      setConsoleLine('[PORT_TUNNEL]: INITIALIZING SECURE PORTS...');
    } else if (count < 50) {
      setConsoleLine('[SYS_LOAD]: MOUNTING LOCAL MODULES...');
    } else if (count < 75) {
      setConsoleLine('[OS_BYPASS]: DECOUPLING CORE KERNEL STACK...');
    } else if (count < 95) {
      setConsoleLine('[DATA_INJECT]: SYNCHRONIZING CACHE SPEC...');
    } else {
      setConsoleLine('[SUCCESS]: ACCESS GRANTED. UNLOCKING VAULT...');
    }
  }, [count]);

  // Calculate target word index from count progress
  const wordStep = Math.floor(100 / WORDS.length);
  const targetWordIdx = Math.min(Math.floor(count / wordStep), WORDS.length - 1);

  // Manage shearing transition when active index moves
  useEffect(() => {
    if (targetWordIdx !== wordIdx) {
      setIsShearing(true);
      const t = setTimeout(() => {
        setWordIdx(targetWordIdx);
        setIsShearing(false);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [targetWordIdx, wordIdx]);

  // Loading timeline (runs once on mount)
  useEffect(() => {
    let start = 0;
    const duration = 2800; // 2.8 seconds total loader duration
    const intervalTime = 15;
    const stepCount = duration / intervalTime;
    
    const timer = setInterval(() => {
      start += 1;
      const progress = Math.min(Math.floor((start / stepCount) * 100), 100);
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 750); // Allow split curtain exit animation
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden' }}>
          
          {/* Top Vault Gate Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ 
              y: '-50vh',
              transition: { duration: 0.75, ease: [0.85, 0, 0.15, 1] }
            }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '50vh',
              background: '#020204',
              borderBottom: '1px solid rgba(57, 255, 20, 0.12)',
              zIndex: 100,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {/* Background Grid top segment */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.015) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.7,
            }} />

            {/* Split typography text: TOP HALF */}
            <div style={{
              height: '90px',
              overflow: 'hidden',
              transform: isShearing ? 'translateX(-12px)' : 'translateX(0)',
              transition: 'transform 0.12s ease-out',
              display: 'flex',
              alignItems: 'flex-end',
              marginBottom: '-2px', // align perfect split
              position: 'relative',
              zIndex: 10,
            }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 10vw, 6.5rem)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: '0.9',
                margin: 0,
                textTransform: 'uppercase',
                background: 'linear-gradient(180deg, #fff 40%, rgba(255,255,255,0.3))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {WORDS[wordIdx]}
              </h1>
            </div>
          </motion.div>

          {/* Bottom Vault Gate Curtain */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ 
              y: '50vh',
              transition: { duration: 0.75, ease: [0.85, 0, 0.15, 1] }
            }}
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: '50vh',
              background: '#020204',
              borderTop: '1px solid rgba(57, 255, 20, 0.12)',
              zIndex: 100,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {/* Background Grid bottom segment */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.015) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.7,
            }} />

            {/* Split typography text: BOTTOM HALF */}
            <div style={{
              height: '90px',
              overflow: 'hidden',
              transform: isShearing ? 'translateX(12px)' : 'translateX(0)',
              transition: 'transform 0.12s ease-out',
              display: 'flex',
              alignItems: 'flex-start',
              marginTop: '-2px', // align perfect split
              position: 'relative',
              zIndex: 10,
            }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 10vw, 6.5rem)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: '0.9',
                margin: '-90px 0 0 0', // offsets to show bottom half
                textTransform: 'uppercase',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 30%, transparent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {WORDS[wordIdx]}
              </h1>
            </div>

            {/* Diagnostics HUD Panel & Counter */}
            <div style={{ 
              width: '90%', 
              maxWidth: '540px', 
              marginTop: '4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              zIndex: 20
            }}>
              
              {/* Progress and status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.72rem', color: 'rgba(57, 255, 20, 0.65)', fontWeight: 700 }}>
                <span>{consoleLine}</span>
                <span style={{ fontSize: '1rem', color: '#fff', fontWeight: 800 }}>{count}%</span>
              </div>

              {/* Progress bar line */}
              <div style={{
                width: '100%',
                height: '2px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--accent-green), var(--accent-cyan))',
                    width: `${count}%`,
                    boxShadow: '0 0 8px var(--accent-green)',
                  }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
