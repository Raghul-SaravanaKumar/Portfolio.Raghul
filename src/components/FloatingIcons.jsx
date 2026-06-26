import { useEffect, useRef } from 'react';

const ICONS = ['⚡', '🚀', '🤖', '💡', '🔮', '⭐', '🧠', '🌐', '🎯', '💻', '🛠️', '✨'];

const RANDOMIZED_ICONS = ICONS.map((icon) => ({
  icon,
  style: {
    left: `${5 + Math.random() * 88}%`,
    top: `${5 + Math.random() * 88}%`,
    fontSize: `${0.9 + Math.random() * 1.4}rem`,
    opacity: 0.12 + Math.random() * 0.15,
  },
}));

export default function FloatingIcons() {
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.fi-icon');
    if (!els) return;

    els.forEach((el) => {
      const duration = 6 + Math.random() * 8;
      const delay = Math.random() * 5;
      const xRange = 15 + Math.random() * 20;
      const yRange = 15 + Math.random() * 25;
      el.style.setProperty('--dur', `${duration}s`);
      el.style.setProperty('--delay', `${delay}s`);
      el.style.setProperty('--xr', `${xRange}px`);
      el.style.setProperty('--yr', `${yRange}px`);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-icons-container"
      aria-hidden="true"
    >
      {RANDOMIZED_ICONS.map((item, i) => (
        <span
          key={i}
          className="fi-icon"
          style={item.style}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}
