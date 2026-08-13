import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [consoleLine, setConsoleLine] = useState('');
  const [isDone, setIsDone] = useState(false);

  // Setup diagnostic stream based on percentage count
  useEffect(() => {
    if (count < 25) {
      setConsoleLine('[SYS_INIT]: ESTABLISHING TUNNEL PORT 0x7F...');
    } else if (count < 50) {
      setConsoleLine('[SYS_DECRYPT]: LOADING CORE SYSTEM ASSETS...');
    } else if (count < 75) {
      setConsoleLine('[KERNEL_PATCH]: BYPASSING DEFAULT OUTDATED OS...');
    } else if (count < 95) {
      setConsoleLine('[SYS_JAILBREAK]: INJECTING PORTFOLIO DATA MODULE...');
    } else {
      setConsoleLine('[SUCCESS]: ACCESS_GRANTED. REDIRECTING...');
    }
  }, [count]);

  useEffect(() => {
    let start = 0;
    const duration = 2800; // Fast-paced 2.8 seconds loader
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
          setTimeout(onComplete, 600); // Fadeout
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Radius logic for circular HUD progress ring
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: 'easeInOut' }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#020204',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4rem 2rem',
            fontFamily: 'var(--mono), monospace',
            color: 'var(--text-muted)',
            overflow: 'hidden',
          }}
        >
          {/* Futuristic Grid Line Decorator */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.02) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            pointerEvents: 'none',
            zIndex: 1,
          }} />

          {/* Holographic scanning line */}
          <motion.div
            animate={{ y: ['0vh', '100vh'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--accent-green), transparent)',
              boxShadow: '0 0 15px var(--accent-green), 0 0 25px var(--accent-green)',
              opacity: 0.4,
              zIndex: 2,
            }}
          />

          {/* Top Row: System Identity */}
          <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', color: 'rgba(57,255,20,0.6)', fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)' }} />
              PORT_INITIALIZE: ACTIVE
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)' }}>
              SYS_REV_0x1C
            </div>
          </div>

          {/* Middle Row: Holographic HUD circle and percentage */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', zIndex: 10 }}>
            <div style={{ position: 'relative', width: 140, height: 140, display: 'grid', placeItems: 'center' }}>
              
              {/* Outer Decorative Circle */}
              <div style={{
                position: 'absolute',
                inset: -10,
                borderRadius: '50%',
                border: '1px dashed rgba(57, 255, 20, 0.15)',
                animation: 'spin 15s linear infinite',
              }} />

              {/* Progress Ring */}
              <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="rgba(57, 255, 20, 0.05)"
                  strokeWidth="3"
                  fill="transparent"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="var(--accent-green)"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ ease: 'easeOut' }}
                  style={{
                    filter: 'drop-shadow(0 0 6px var(--accent-green))',
                  }}
                />
              </svg>

              {/* Center Counter */}
              <div style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
                  {count}%
                </span>
                <span style={{ fontSize: '0.52rem', color: 'rgba(57, 255, 20, 0.65)', fontWeight: 700, letterSpacing: '0.08em', marginTop: 2 }}>
                  STATUS
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Console output line diagnostics */}
          <div style={{ 
            width: '100%', 
            maxWidth: '600px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.85rem', 
            zIndex: 10,
            background: 'rgba(5,5,10,0.5)',
            border: '1px solid rgba(57,255,20,0.1)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.2rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', marginLeft: '0.35rem' }}>console.sh</span>
            </div>
            <div style={{ 
              fontSize: '0.74rem', 
              color: 'var(--accent-green)', 
              minHeight: '1.5em', 
              lineHeight: '1.5',
              textShadow: '0 0 8px rgba(57,255,20,0.2)',
            }}>
              {consoleLine}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
