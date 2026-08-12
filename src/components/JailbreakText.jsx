import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppleEmoji from './AppleEmoji';

export default function JailbreakText() {
  const fullText = 'Toppers are running on outdated OS. We just jailbroke the system and installed our own knowledge base ';
  const [typedText, setTypedText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [sparks, setSparks] = useState([]);

  // Slower typing speed (110ms per character) for a relaxed premium terminal build-up
  useEffect(() => {
    let t;
    if (typedText.length < fullText.length) {
      t = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 110);
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

  // Spark emitter loop
  useEffect(() => {
    if (!isBurning) return;

    const interval = setInterval(() => {
      const id = Math.random();
      const left = Math.floor(Math.random() * 90) + 5;
      const size = Math.random() * 3 + 2;
      const duration = Math.random() * 1.0 + 0.7;
      
      setSparks((prev) => [...prev.slice(-20), { id, left, size, duration }]);
    }, 150);

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
                y: -35 - Math.random() * 25,
                x: (Math.random() - 0.5) * 15,
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

      {/* Reworked styling: Apple iOS Developer Monospace font stack */}
      <span 
        className={isBurning ? 'fire-flicker' : ''}
        style={{ 
          color: isBurning ? '#fff' : 'var(--text-muted)',
          fontFamily: '"SF Mono", SFMono-Regular, ui-monospace, Menlo, Consolas, monospace',
          fontWeight: isBurning ? 700 : 500,
          letterSpacing: isBurning ? '0.01em' : '0',
          transition: 'font-weight 0.4s ease, letter-spacing 0.4s ease, color 0.4s ease',
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
