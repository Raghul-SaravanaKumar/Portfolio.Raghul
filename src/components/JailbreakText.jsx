import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppleEmoji from './AppleEmoji';

export default function JailbreakText() {
  const fullText = 'Toppers are running on outdated OS. We just jailbroke the system and installed our own knowledge base ';
  const [typedText, setTypedText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    let t;
    if (typedText.length < fullText.length) {
      t = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 35); // Clean typewriter speed
    } else {
      // Once fully typed, ignite the fire effect
      t = setTimeout(() => {
        setIsBurning(true);
        setTimeout(() => {
          setShowEmoji(true);
        }, 500);
      }, 300);
    }
    return () => clearTimeout(t);
  }, [typedText]);

  return (
    <div style={{ position: 'relative', display: 'inline' }}>
      {/* Burning Text Span */}
      <span 
        style={{ 
          color: isBurning ? '#ffaa44' : '#fff',
          fontWeight: isBurning ? 600 : 400,
          transition: 'all 0.5s ease-in-out',
          textShadow: isBurning 
            ? '0 0 4px #ff3300, 0 -2px 10px #ff6600, 0 -4px 18px #ffaa00, 0 -6px 25px #ffcc00' 
            : 'none',
          display: 'inline',
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
          style={{ display: 'inline-block', marginLeft: '0.2rem', verticalAlign: '-0.1em' }}
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
