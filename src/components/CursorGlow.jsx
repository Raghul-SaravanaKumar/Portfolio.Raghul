import { useEffect, useRef } from 'react';

const COLORS = ['#0ef5e9', '#6bfbf2', '#f5c518', '#00b5aa', '#4ade80', '#fb7185'];

export default function CursorGlow() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const particlesRef = useRef([]);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      spawnParticle(e.clientX, e.clientY);
    };

    const animate = () => {
      // Smooth ring follow
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top = `${ring.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const spawnParticle = (x, y) => {
      const el = document.createElement('div');
      el.className = 'cursor-particle';
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = Math.random() * 7 + 3;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 40 + 10;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      el.style.cssText = `
        left:${x}px; top:${y}px;
        width:${size}px; height:${size}px;
        background:${color};
        box-shadow:0 0 ${size * 2}px ${color};
      `;
      document.body.appendChild(el);
      particlesRef.current.push(el);

      // Animate outward then fade
      requestAnimationFrame(() => {
        el.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        el.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        el.style.opacity = '0';
      });

      setTimeout(() => {
        el.remove();
        particlesRef.current = particlesRef.current.filter(p => p !== el);
      }, 650);
    };

    const onEnterLink = () => cursor.classList.add('cursor-hover');
    const onLeaveLink = () => cursor.classList.remove('cursor-hover');

    const attachToLinks = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);
    attachToLinks();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
