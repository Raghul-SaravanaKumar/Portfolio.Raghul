import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* Animated SVG dog character — inspired by GGSriram's GitHub dog profile pic.
   Pure SVG + CSS animations. No image file needed. */
export default function AnimatedDog({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  const [wink, setWink] = useState(false);

  // Random blink / wink cycle
  useEffect(() => {
    let timeout;
    const scheduleBlink = () => {
      const delay = Math.random() * 3000 + 1500;
      timeout = setTimeout(() => {
        const doWink = Math.random() < 0.2;
        if (doWink) {
          setWink(true);
          setTimeout(() => setWink(false), 200);
        } else {
          setBlink(true);
          setTimeout(() => setBlink(false), 130);
        }
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className={`animated-dog-wrap ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {/* Glow ring behind dog */}
      <div className="dog-glow-ring" />

      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className="dog-svg"
        aria-label="Animated dog character"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#8b5e3c" />
          </radialGradient>
          <radialGradient id="faceGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#d4aa7d" />
            <stop offset="100%" stopColor="#a0693a" />
          </radialGradient>
          <radialGradient id="bellyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0d5a8" />
            <stop offset="100%" stopColor="#d4aa7d" />
          </radialGradient>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
          </filter>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <clipPath id="eyeClip">
            <ellipse cx="75" cy="95" rx="9" ry="9" />
          </clipPath>
          <clipPath id="eyeClip2">
            <ellipse cx="125" cy="95" rx="9" ry="9" />
          </clipPath>
        </defs>

        {/* ── Shadow on ground ── */}
        <ellipse cx="100" cy="218" rx="52" ry="7" fill="rgba(0,0,0,0.18)" />

        {/* ── Body ── */}
        <g className="dog-body-group">
          {/* Torso */}
          <ellipse cx="100" cy="165" rx="48" ry="40" fill="url(#bodyGrad)" filter="url(#softShadow)" />
          {/* Belly patch */}
          <ellipse cx="100" cy="172" rx="28" ry="24" fill="url(#bellyGrad)" />

          {/* Front legs */}
          <g className="dog-legs">
            <rect x="65" y="190" width="16" height="28" rx="8" fill="#8b5e3c" />
            <rect x="119" y="190" width="16" height="28" rx="8" fill="#8b5e3c" />
            {/* Paws */}
            <ellipse cx="73" cy="218" rx="10" ry="6" fill="#7a4f2c" />
            <ellipse cx="127" cy="218" rx="10" ry="6" fill="#7a4f2c" />
          </g>
        </g>

        {/* ── Tail (wags!) ── */}
        <g className="dog-tail">
          <path
            d="M148 155 Q175 130 165 105 Q158 88 170 78"
            stroke="#8b5e3c" strokeWidth="12" strokeLinecap="round" fill="none"
          />
          <path
            d="M148 155 Q175 130 165 105 Q158 88 170 78"
            stroke="#c9a96e" strokeWidth="7" strokeLinecap="round" fill="none"
          />
          {/* Tail tip */}
          <circle cx="170" cy="77" r="8" fill="#f0d5a8" />
        </g>

        {/* ── Head ── */}
        <g className="dog-head-group">
          {/* Neck */}
          <ellipse cx="100" cy="132" rx="26" ry="18" fill="url(#bodyGrad)" />
          {/* Head */}
          <circle cx="100" cy="98" r="42" fill="url(#faceGrad)" filter="url(#softShadow)" />
          {/* Forehead lighter patch */}
          <ellipse cx="100" cy="82" rx="22" ry="18" fill="#d4aa7d" opacity="0.5" />

          {/* ── Ears (floppy, animated) ── */}
          {/* Left ear */}
          <g className="dog-ear-left" style={{ transformOrigin: '65px 72px' }}>
            <ellipse cx="62" cy="82" rx="18" ry="28" fill="#7a4f2c" transform="rotate(-15 62 72)" />
            <ellipse cx="62" cy="82" rx="11" ry="20" fill="#a0693a" transform="rotate(-15 62 72)" />
          </g>
          {/* Right ear */}
          <g className="dog-ear-right" style={{ transformOrigin: '135px 72px' }}>
            <ellipse cx="138" cy="82" rx="18" ry="28" fill="#7a4f2c" transform="rotate(15 138 72)" />
            <ellipse cx="138" cy="82" rx="11" ry="20" fill="#a0693a" transform="rotate(15 138 72)" />
          </g>

          {/* ── Eyes ── */}
          {/* Left eye */}
          <g>
            <circle cx="75" cy="95" r="9" fill="#2d1a0e" />
            <circle cx="75" cy="95" r="6.5" fill="#3d2410" />
            {/* Iris shine */}
            <circle cx="78" cy="92" r="2.5" fill="white" opacity="0.9" />
            <circle cx="76" cy="96" r="1" fill="white" opacity="0.5" />
            {/* Blink / wink overlays */}
            {blink && <ellipse cx="75" cy="95" rx="9.5" ry="4" fill="#c9a96e" />}
            {/* Eyebrow left */}
            <path d="M67 85 Q75 82 83 85" stroke="#5c3a1c" strokeWidth="2.5" fill="none" strokeLinecap="round"
              className={isHovered ? 'eyebrow-happy' : ''} />
          </g>
          {/* Right eye */}
          <g>
            <circle cx="125" cy="95" r="9" fill="#2d1a0e" />
            <circle cx="125" cy="95" r="6.5" fill="#3d2410" />
            <circle cx="128" cy="92" r="2.5" fill="white" opacity="0.9" />
            <circle cx="126" cy="96" r="1" fill="white" opacity="0.5" />
            {(blink || wink) && <ellipse cx="125" cy="95" rx="9.5" ry="4" fill="#c9a96e" />}
            {/* Eyebrow right */}
            <path d="M117 85 Q125 82 133 85" stroke="#5c3a1c" strokeWidth="2.5" fill="none" strokeLinecap="round"
              className={isHovered ? 'eyebrow-happy' : ''} />
          </g>

          {/* ── Nose ── */}
          <ellipse cx="100" cy="108" rx="10" ry="7" fill="#2d1a0e" />
          <ellipse cx="97" cy="106" rx="3.5" ry="2" fill="white" opacity="0.35" />
          {/* Nose ridge */}
          <line x1="100" y1="115" x2="100" y2="120" stroke="#2d1a0e" strokeWidth="2" strokeLinecap="round" />

          {/* ── Mouth ── */}
          {isHovered ? (
            /* Happy open mouth when hovered */
            <g>
              <path d="M88 120 Q100 132 112 120" stroke="#2d1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="100" cy="125" rx="10" ry="6" fill="#e05c7a" />
              {/* Tongue */}
              <ellipse cx="100" cy="130" rx="7" ry="5" fill="#e05c7a" />
              <line x1="100" y1="125" x2="100" y2="135" stroke="#c0335a" strokeWidth="1.5" />
            </g>
          ) : (
            <path d="M90 120 Q100 128 110 120" stroke="#2d1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* ── Cheek blush ── */}
          <ellipse cx="66" cy="108" rx="9" ry="6" fill="#e07a7a" opacity="0.3" />
          <ellipse cx="134" cy="108" rx="9" ry="6" fill="#e07a7a" opacity="0.3" />

          {/* ── Spots on forehead ── */}
          <circle cx="90" cy="72" r="4" fill="#7a4f2c" opacity="0.5" />
          <circle cx="110" cy="68" r="3" fill="#7a4f2c" opacity="0.4" />
        </g>

        {/* ── Collar ── */}
        <rect x="76" y="128" width="48" height="10" rx="5" fill="#0ef5e9" />
        <circle cx="100" cy="133" r="4" fill="#f5c518" />
        <ellipse cx="97" cy="131" rx="1.5" ry="1" fill="white" opacity="0.5" />
      </svg>

      {/* Floating sparkles around dog on hover */}
      {isHovered && (
        <div className="dog-sparkles">
          {['✨','🩵','⭐','🐾'].map((s, i) => (
            <span key={i} className={`dog-sparkle dog-sparkle-${i + 1}`}>{s}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
