import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   Premium Neon Cosmic Snake
   Uses Verlet chain integration for ultra-smooth physical joint physics,
   motion-speed-sensitive slithering, interactive mouse gravity, and
   active neon sparkle particle shedding.
───────────────────────────────────────────────────────────────────────────── */

const SNAKE_LENGTH = 55;      // number of segments
const SEGMENT_GAP = 5;        // spacing constraint between segments
const BASE_WAVE_AMP = 14;     // baseline slither width
const GLOW_SIZE = 16;         // neon glow size

export default function NeonSnake() {
  const canvasRef = useRef(null);
  
  // Physics / Motion state tracking
  const stateRef = useRef({
    segments: [],             // array of {x, y, ox, oy} representing joints
    particles: [],            // array of {x, y, vx, vy, size, color, alpha, life}
    targetHead: { x: 0, y: 0 },
    currentHead: { x: 0, y: 0 },
    scrollPos: 0,
    time: 0,
    mouse: { x: -1, y: -1 },
    lastScrollY: 0,
    scrollVelocity: 0,
    headVelocity: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize segments if empty
      if (state.segments.length === 0) {
        const startX = canvas.width / 2;
        const startY = canvas.height / 2;
        state.currentHead = { x: startX, y: startY };
        state.targetHead = { x: startX, y: startY };
        
        for (let i = 0; i < SNAKE_LENGTH; i++) {
          state.segments.push({
            x: startX + i * SEGMENT_GAP,
            y: startY,
            ox: startX + i * SEGMENT_GAP,
            oy: startY
          });
        }
      }
    };
    
    resize();
    window.addEventListener('resize', resize);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      state.scrollPos = docHeight > 0 ? currentScroll / docHeight : 0;
      
      // Calculate scroll speed for dynamic slither reaction
      state.scrollVelocity = Math.abs(currentScroll - state.lastScrollY) * 0.15;
      state.lastScrollY = currentScroll;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleMouse = (e) => {
      state.mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // Path calculator: maps scroll phase to screen coordinate loops
    function getPathPoint(t, w, h) {
      // Loop over 3 segments as we scroll 0 to 1
      const phase = t * Math.PI * 5;
      const px = w * 0.5 + Math.sin(phase) * w * 0.38;
      const py = h * 0.5 + Math.cos(phase * 0.6) * h * 0.36;
      return { x: px, y: py };
    }

    function draw() {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      state.time += 0.016;
      const time = state.time;

      // Decay velocities slowly
      state.scrollVelocity *= 0.95;

      // 1. Calculate path target
      const pathTarget = getPathPoint(state.scrollPos + time * 0.015, w, h);

      // 2. Gravitational pull toward mouse
      let targetX = pathTarget.x;
      let targetY = pathTarget.y;

      if (state.mouse.x > 0 && state.mouse.y > 0) {
        const dx = state.mouse.x - state.currentHead.x;
        const dy = state.mouse.y - state.currentHead.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 320) {
          const force = (1 - dist / 320) * 0.42; // stronger pull when close
          targetX += dx * force;
          targetY += dy * force;
        }
      }

      // 3. Smooth spring-inertia interpolation for the head
      const hdx = targetX - state.currentHead.x;
      const hdy = targetY - state.currentHead.y;
      state.currentHead.x += hdx * 0.09;
      state.currentHead.y += hdy * 0.09;

      // Measure motion speed to dynamically drive wave properties
      state.headVelocity = Math.sqrt(hdx * hdx + hdy * hdy);
      const totalActivity = Math.min(15, state.headVelocity * 0.2 + state.scrollVelocity);
      
      // Slither wave scales up when moving, calms to a breathing state when idle
      const waveFreq = 3.0 + totalActivity * 0.4;
      const waveAmp = BASE_WAVE_AMP + totalActivity * 0.8;

      // 4. Update Verlet Chain segments
      if (state.segments.length > 0) {
        // Head updates
        state.segments[0].x = state.currentHead.x;
        state.segments[0].y = state.currentHead.y;

        // Propagate segments down the chain using distance constraint relaxation
        for (let i = 1; i < SNAKE_LENGTH; i++) {
          const current = state.segments[i];
          const prev = state.segments[i - 1];

          // Direction vector from current to previous segment
          const dx = prev.x - current.x;
          const dy = prev.y - current.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Constraints: force segments to stay exactly SEGMENT_GAP apart
          const diff = dist - SEGMENT_GAP;
          const pullX = (dx / dist) * diff * 0.75;
          const pullY = (dy / dist) * diff * 0.75;

          current.x += pullX;
          current.y += pullY;

          // Apply slither wiggle perpendicular to segment direction
          if (i > 1) {
            const angle = Math.atan2(dy, dx);
            const perpAngle = angle + Math.PI / 2;
            const wiggle = Math.sin(i * 0.3 - time * waveFreq) * waveAmp * (1 - i / SNAKE_LENGTH) * 0.08;
            current.x += Math.cos(perpAngle) * wiggle;
            current.y += Math.sin(perpAngle) * wiggle;
          }
        }
      }

      // 5. Spawn glow particles when moving
      if (totalActivity > 1.5 && Math.random() < 0.35) {
        // Spawn particle near the tail/body midpoint
        const randomJointIndex = Math.floor(SNAKE_LENGTH * 0.2 + Math.random() * SNAKE_LENGTH * 0.6);
        const spawnJoint = state.segments[randomJointIndex];
        
        if (spawnJoint) {
          const t = randomJointIndex / SNAKE_LENGTH;
          state.particles.push({
            x: spawnJoint.x + (Math.random() - 0.5) * 8,
            y: spawnJoint.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            size: Math.random() * 3 + 1,
            color: t < 0.4 ? '157, 116, 255' : t < 0.8 ? '34, 211, 238' : '245, 197, 24', // Match snake gradient colors
            alpha: 0.8,
            life: 1.0,
            decay: 0.015 + Math.random() * 0.02,
          });
        }
      }

      // Update and draw background particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.life -= p.decay;

        if (p.alpha <= 0) {
          state.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgb(${p.color})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw Glow Layer (Underlay)
      ctx.save();
      ctx.shadowBlur = GLOW_SIZE;
      ctx.globalAlpha = 0.55;

      for (let i = 0; i < state.segments.length; i++) {
        const t = i / state.segments.length;
        const s = state.segments[i];
        const radius = 6 * (1 - t * 0.65);

        // Smooth dynamic purple → cyan → yellow gradient color
        const r = Math.round(157 + (34 - 157) * t * 0.75 + (245 - 34) * Math.max(0, t - 0.7) / 0.3);
        const g = Math.round(116 + (211 - 116) * t * 0.75 + (197 - 211) * Math.max(0, t - 0.7) / 0.3);
        const b = Math.round(255 + (238 - 255) * t * 0.75 + (24 - 238) * Math.max(0, t - 0.7) / 0.3);
        const color = `rgb(${r},${g},${b})`;

        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius + 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 7. Draw Core Solid Body
      for (let i = 0; i < state.segments.length; i++) {
        const t = i / state.segments.length;
        const s = state.segments[i];
        const radius = 5 * (1 - t * 0.6);

        const r = Math.round(157 + (34 - 157) * t * 0.75 + (245 - 34) * Math.max(0, t - 0.7) / 0.3);
        const g = Math.round(116 + (211 - 116) * t * 0.75 + (197 - 211) * Math.max(0, t - 0.7) / 0.3);
        const b = Math.round(255 + (238 - 255) * t * 0.75 + (24 - 238) * Math.max(0, t - 0.7) / 0.3);

        ctx.fillStyle = `rgba(${r},${g},${b}, ${0.9 - t * 0.45})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Overlay scales & ribs details for premium tech look
        if (i % 3 === 0 && radius > 2.0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 - t * 0.2})`;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(s.x, s.y, radius + 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 8. Head details (Eyes + tongue)
      if (state.segments.length > 2) {
        const head = state.segments[0];
        const neck = state.segments[2];
        const headAngle = Math.atan2(head.y - neck.y, head.x - neck.x);
        
        // Eyes placement logic
        for (const side of [-1, 1]) {
          const ex = head.x + Math.cos(headAngle) * 3.5 + Math.cos(headAngle + Math.PI / 2) * 3.2 * side;
          const ey = head.y + Math.sin(headAngle) * 3.5 + Math.sin(headAngle + Math.PI / 2) * 3.2 * side;

          // Outer glowing eye
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(ex, ey, 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Dark pupil
          ctx.fillStyle = '#0f0a1c';
          ctx.beginPath();
          ctx.arc(ex + Math.cos(headAngle) * 0.5, ey + Math.sin(headAngle) * 0.5, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }

        // Forked tongue flick physics (frequency depends on overall speed)
        const tongueFreq = 3.0 + totalActivity * 0.6;
        const tonguePhase = Math.sin(time * tongueFreq);
        if (tonguePhase > 0.65) {
          const tongueLen = 8 * (tonguePhase - 0.65) / 0.35;
          const tx = head.x + Math.cos(headAngle) * (6 + tongueLen);
          const ty = head.y + Math.sin(headAngle) * (6 + tongueLen);
          
          ctx.strokeStyle = '#fb7185';
          ctx.lineWidth = 1.3;
          ctx.lineCap = 'round';

          for (const fork of [-0.25, 0.25]) {
            ctx.beginPath();
            ctx.moveTo(head.x + Math.cos(headAngle) * 5, head.y + Math.sin(headAngle) * 5);
            ctx.lineTo(tx, ty);
            ctx.lineTo(
              tx + Math.cos(headAngle + fork) * 3.5,
              ty + Math.sin(headAngle + fork) * 3.5
            );
            ctx.stroke();
          }
        }
      }

      state.animId = requestAnimationFrame(draw);
    }

    state.animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neon-snake-canvas"
      aria-hidden="true"
    />
  );
}
