import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppleEmoji from './AppleEmoji';

export default function JailbreakText() {
  const fullText = 'Toppers are running on outdated OS. We just jailbroke the system and installed our own knowledge base ';
  const [typedText, setTypedText] = useState('');
  const [isStriking, setIsStriking] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    let t;
    if (typedText.length < fullText.length) {
      t = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 35); // Fast typing speed
    } else {
      // Finished typing, trigger the strike-through burn animation
      t = setTimeout(() => {
        setIsStriking(true);
        setTimeout(() => {
          setShowEmoji(true);
        }, 600);
      }, 500);
    }
    return () => clearTimeout(t);
  }, [typedText]);

  // Divide the text into two segments for the strike-through
  // Part 1: 'Toppers are running on outdated OS.'
  // Part 2: ' We just jailbroke the system and installed our own knowledge base '
  const part1Target = 'Toppers are running on outdated OS.';
  
  let part1 = '';
  let part2 = '';

  if (typedText.length <= part1Target.length) {
    part1 = typedText;
  } else {
    part1 = part1Target;
    part2 = typedText.slice(part1Target.length);
  }

  return (
    <div style={{ position: 'relative', lineHeight: '1.65' }}>
      
      {/* Part 1: Outdated OS text with burning strike-through line */}
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ 
          color: isStriking ? '#ff5f56' : '#fff', 
          transition: 'color 0.4s ease',
          textShadow: isStriking ? '0 0 10px rgba(255, 95, 86, 0.6)' : 'none',
          textDecoration: 'none'
        }}>
          {part1}
        </span>
        
        {/* Hacking/Burning Strike-through line */}
        {isStriking && (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: 0,
              top: '52%',
              height: '2px',
              background: 'linear-gradient(90deg, #ff5f56, #febc2e, #ff5f56)',
              boxShadow: '0 0 8px #ff5f56, 0 0 15px #febc2e',
            }}
          />
        )}
      </span>

      {/* Part 2: Jailbreak System text */}
      <span style={{ 
        color: isStriking ? 'var(--accent-green)' : 'var(--text-muted)',
        transition: 'color 0.4s ease',
        textShadow: isStriking ? '0 0 8px rgba(57, 255, 20, 0.15)' : 'none',
      }}>
        {part2}
      </span>

      {/* Jailbreak Lightning Bolt Emoji */}
      {showEmoji && (
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          style={{ display: 'inline-block', marginLeft: '0.2rem' }}
        >
          <AppleEmoji emoji="⚡" />
        </motion.span>
      )}

      {/* Typing Cursor */}
      {typedText.length < fullText.length && (
        <span className="typing-cursor" style={{ 
          background: 'var(--accent-green)', 
          width: 2, 
          height: '1.2em', 
          marginLeft: 2, 
          display: 'inline-block',
          verticalAlign: '-0.2em' 
        }} />
      )}
    </div>
  );
}
