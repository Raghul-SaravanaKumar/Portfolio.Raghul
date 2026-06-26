import { useEffect, useState, useRef } from 'react';

export default function RunningBoy() {
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const speedTimeoutRef = useRef(null);

  useEffect(() => {
    lastScrollTime.current = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const timeDiff = now - lastScrollTime.current;
      const distDiff = Math.abs(currentScrollY - lastScrollY.current);

      if (timeDiff > 0 && distDiff > 0) {
        // Calculate scroll velocity (pixels per millisecond)
        const velocity = distDiff / timeDiff;
        // Map to speed multiplier (1x to 4x)
        const newSpeed = Math.min(4, Math.max(1, 1 + velocity * 2.5));
        setScrollSpeed(newSpeed);

        // Reset scroll speed back to 1 (normal run) after scrolling stops
        if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
        speedTimeoutRef.current = setTimeout(() => {
          setScrollSpeed(1);
        }, 150);
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
    };
  }, []);

  return (
    <div className="running-boy-track">
      <div
        className="running-boy-container"
        style={{
          '--scroll-speed': scrollSpeed,
          '--animation-duration': `${0.85 / scrollSpeed}s`,
          '--track-duration': `${15 / scrollSpeed}s`,
        }}
      >
        <div className="running-boy">
          <div className="boy-head" />
          <div className="boy-torso" />
          <div className="boy-arm-back" />  
          <div className="boy-arm-front" />
          <div className="boy-leg-back" />
          <div className="boy-leg-front" />
        </div>
      </div>
    </div>
  );
}
