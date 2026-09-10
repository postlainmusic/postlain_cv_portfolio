import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';

interface FireProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  project: {
    name: string;
    url: string;
    status: string;
    description: string;
    action: string;
  };
}

export const Fire: React.FC<FireProps> = ({ copy, locale, project }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const [resonance, setResonance] = useState<number>(0.2);
  const [isHoveringCore, setIsHoveringCore] = useState<boolean>(false);
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const energyRef = useRef<number>(0.2);
  const pointerRef = useRef<{ x: number; y: number; vx: number; vy: number; prevX: number; prevY: number }>({
    x: 0.5,
    y: 0.5,
    vx: 0,
    vy: 0,
    prevX: 0.5,
    prevY: 0.5,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const numWaves = 14;
    const wavePoints = 80;

    const render = (time: number) => {
      const t = time * 0.001;
      const ptr = pointerRef.current;

      // Smooth energy decay
      energyRef.current = Math.max(0.2, energyRef.current * 0.97 + (ptr.vx + ptr.vy) * 0.03);

      // Dark thermal energy backdrop
      ctx.fillStyle = 'rgba(18, 10, 8, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const energy = energyRef.current;

      // Draw thermal harmonic waveforms radiating from center
      for (let w = 0; w < numWaves; w++) {
        const waveRadius = 40 + w * 24 + energy * 30;
        const waveFreq = 2 + w * 0.5;
        const waveSpeed = t * (1.2 + w * 0.2) + energy * 2;
        const alpha = Math.max(0.08, (1 - w / numWaves) * (0.3 + energy * 0.6));

        ctx.beginPath();
        for (let p = 0; p <= wavePoints; p++) {
          const theta = (p / wavePoints) * Math.PI * 2;
          const noiseOffset =
            Math.sin(theta * waveFreq + waveSpeed) * (8 + energy * 25) +
            Math.cos(theta * 3 - waveSpeed * 1.5) * (4 + energy * 12);

          // Pointer magnetic displacement
          const px = centerX + Math.cos(theta) * (waveRadius + noiseOffset);
          const py = centerY + Math.sin(theta) * (waveRadius + noiseOffset);

          const distToPtr = Math.hypot(px - ptr.x * width, py - ptr.y * height);
          const attract = Math.max(0, 1 - distToPtr / 280) * (30 + energy * 50);

          const finalX = px + (ptr.x * width - px) * (attract / 280);
          const finalY = py + (ptr.y * height - py) * (attract / 280);

          if (p === 0) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }
        ctx.closePath();

        // Thermal amber & crimson palette
        const r = Math.floor(220 + energy * 35);
        const g = Math.floor(65 + w * 8 + energy * 50);
        const b = Math.floor(30 + w * 4);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1 + (w === 0 ? 2 : 0) + energy * 1.5;
        ctx.stroke();
      }

      // Central Harmonic Pulse
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35 + Math.sin(t * 4) * 6 + energy * 20, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235, 75, 40, ${0.15 + energy * 0.25})`;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isReducedMotion) return;
    const ptr = pointerRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    const dx = Math.abs(nx - ptr.prevX);
    const dy = Math.abs(ny - ptr.prevY);
    ptr.vx = dx * 8;
    ptr.vy = dy * 8;
    ptr.prevX = nx;
    ptr.prevY = ny;
    ptr.x = nx;
    ptr.y = ny;

    // Calculate proximity to center core
    const distToCenter = Math.hypot(nx - 0.5, ny - 0.5);
    const res = Math.min(1, Math.max(0.1, 1 - distToCenter * 2.2));
    setResonance(res);
    energyRef.current = Math.min(2.5, energyRef.current + (dx + dy) * 3);
  };

  return (
    <div
      id="fire"
      className="world-stage world-stage--fire"
      onPointerMove={handlePointerMove}
      aria-label="World 03: Fire"
    >
      <canvas ref={canvasRef} className="world-canvas fire-canvas" aria-hidden="true" />
      <div className="world-vignette fire-vignette" aria-hidden="true" />

      <div className="world-content-layer fire-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">03 / FIRE</span>
          <span className="world-verb-badge">REACT · KHÔNG GIAN NĂNG LƯỢNG</span>
        </div>

        {/* Narrative Context */}
        <div className="world-typography-block fire-typography">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h2 className="world-display-heading">{copy.title}</h2>
          {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
          <div className="world-statement-box">
            <p className="world-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
          </div>
        </div>

        {/* The Living Center Object: Hidden Music Artifact */}
        <div
          ref={coreRef}
          className={`hidden-music-artifact ${isHoveringCore ? 'is-resonating' : ''}`}
          style={{ '--resonance': resonance.toFixed(3) } as React.CSSProperties}
          onPointerEnter={() => {
            setIsHoveringCore(true);
            energyRef.current = 1.8;
          }}
          onPointerLeave={() => setIsHoveringCore(false)}
        >
          <div className="artifact-aura" aria-hidden="true" />
          <div className="artifact-body">
            <div className="artifact-tag">{project.status}</div>
            <h3 className="artifact-title">HIDDEN MUSIC</h3>
            <p className="artifact-desc">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="artifact-action-link"
              aria-label={`${project.action} - ${project.name}`}
            >
              <span>{project.action}</span>
              <span className="link-arrow">↗</span>
            </a>
          </div>
        </div>

        <div className="world-tactile-indicator" aria-hidden="true">
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Kéo chuột về phía tâm để cộng hưởng năng lượng với Hidden Music'
              : 'Pull toward the center to harmonize energy with Hidden Music'}
          </span>
        </div>
      </div>
    </div>
  );
};
