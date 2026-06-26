import { useRef, useState } from 'react';

/**
 * Wraps any element with a magnetic hover pull effect.
 * strength: 0.3 = gentle pull, 1 = strong pull
 */
export default function MagneticButton({ children, strength = 0.35, className = '', style = {}, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPos({ x: dx * strength, y: dy * strength });
  };

  const handleLeave = () => {
    setPos({ x: 0, y: 0 });
    setActive(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: active ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'inline-block',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
