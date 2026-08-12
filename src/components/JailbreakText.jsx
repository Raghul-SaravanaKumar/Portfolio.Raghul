import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppleEmoji from './AppleEmoji';

export default function JailbreakText() {
  const fullText = 'Toppers are running on outdated OS. We just jailbroke the system and installed our own knowledge base ';
  const [typedText, setTypedText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [sparks, setSparks] = useState([]);

  // Typewriter effect
  useEffect(() => {
    let t;
    if (typedText.length < fullText.length) {
      t = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 35);
    } else {
      t = setTimeout(() => {
        setIsBurning(true);
        setTimeout(() => {
          setShowEmoji(true);
        }, 500);
      }, 300);
    }
    return () => clearTimeout(t);
  }, [typedText]);

  // Spark emitter loop when burning is active
  useEffect(() => {
    if (!isBurning) return;

    const interval = setInterval(() => {
      // Create a new spark particle with random horizontal offset, size, and duration
      const id = Math.random();
      const left = Math.floor(Math.random() * 90) + 5; // 5% to 95% width
      const size = Math.random() * 4 + 2; // 2px to 6px size
      const duration = Math.random() * 1.2 + 0.8; // 0.8s to 2s drift duration
      
      setSparks((prev) => [...prev.slice(-20), { id, left, size, duration }]);
    }, 150); // Emit a spark every 150ms

    return () => clearInterval(interval);
  }, [isBurning]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      {/* Dynamic Spark Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.span
              key={spark.id}
              initial={{ y: 5, x: 0, opacity: 0.8, scale: 1 }}
              animate={{ 
                y: -40 - Math.random() * 30, // Drift up
                x: (Math.random() - 0.5) * 20, // Sway left/right
                opacity: 0,
                scale: 0.4
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: spark.duration, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: `${spark.left}%`,
                bottom: '10%',
                width: spark.size,
                height: spark.size,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffa600, #ff3300)',
                boxShadow: '0 0 8px #ffa600, 0 0 14px #ff3300',
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main Tagline text with high visibility and flickering fire glow */}
      <span 
        className={isBurning ? 'fire-flicker' : ''}
        style={{ 
          color: isBurning ? '#fff' : '#c9d1d9',
          fontWeight: isBurning ? 600 : 400,
          transition: 'all 0.5s ease-in-out',
          display: 'inline',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {typedText}
      </span>

      {/* Pop-up Lightning emoji */}
      {showEmoji && (
        <motion.span
          initial={{ scale: 0, rotate: -20, y: 5 }}
          animate={{ scale: 1, rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          style={{ display: 'inline-block', marginLeft: '0.2rem', verticalAlign: '-0.1em', position: 'relative', zIndex: 3 }}
        >
          <AppleEmoji emoji="⚡" />
        </motion.span>
      )}

      {/* Terminal Cursor */}
      {typedText.length < fullText.length && (
        <span className="typing-cursor" style={{ 
          background: 'var(--accent-green)', 
          width: 2, 
          height: '1.2em', 
          marginLeft: 2, 
          display: 'inline-block',
          verticalAlign: '-0.25em' 
        }} />
      )}
    </div>
  );
}
