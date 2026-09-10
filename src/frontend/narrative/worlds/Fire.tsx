import React, { useEffect, useRef, useState } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { InputSampler } from '../interaction/InputSampler';

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

/**
 * World 03: FIRE (REACT — Energy / Heat / Hidden Music Singularity)
 * Physical Behavior:
 * - Central gravitational singularity holding the living Hidden Music artifact.
 * - Harmonic thermal wave field radiating outward with standing-wave equations.
 * - Pointer movement injects kinetic energy into thermal turbulence.
 * - Approaching the core draws energy inward, exciting resonance and acoustic frequency rings.
 * - Zero React setState in the RAF animation loop (Law 5 compliant).
 */
export const Fire: React.FC<FireProps> = ({ copy, locale, project }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const isHoveringCoreRef = useRef<boolean>(false);
  const resonanceRef = useRef<number>(0.2);
  const energyRef = useRef<number>(0.25);
  const isReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    isReducedMotionRef.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const inputSampler = InputSampler.getInstance();
    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.0); // DPR clamping (max 2.0)
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Radial Harmonic Wave parameters
    const numWaves = 16;
    const wavePoints = 96;
    const numFreqBars = 48;

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;
      const t = currentTime * 0.001;

      // Sample coalesced input forces (Law 4: Input Coalescing)
      const forces = inputSampler.sampleForces();
      const pointerState = inputSampler.getPointerState();

      // Energy accretion from input
      let forceVelocity = 0;
      for (let i = 0; i < forces.length; i++) {
        forceVelocity += forces[i].strength;
      }
      energyRef.current = Math.min(
        3.0,
        Math.max(0.18, energyRef.current * (1 - dt * 1.8) + forceVelocity * 0.4)
      );

      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const ptrX = pointerState.x * width;
      const ptrY = pointerState.y * height;
      const distToCenter = Math.hypot(ptrX - centerX, ptrY - centerY);

      // Smooth Resonance calculation
      const targetRes = isHoveringCoreRef.current
        ? 1.0
        : Math.min(1.0, Math.max(0.15, 1.0 - distToCenter / (Math.min(width, height) * 0.48)));

      resonanceRef.current += (targetRes - resonanceRef.current) * Math.min(1, dt * 6.0);
      const res = resonanceRef.current;
      const energy = energyRef.current;

      // Update DOM CSS custom property directly (Law 5: Zero setState in RAF)
      if (coreRef.current) {
        coreRef.current.style.setProperty('--resonance', res.toFixed(3));
      }

      // 1. Dark Thermal Vacuum Clearing
      ctx.fillStyle = '#100806';
      ctx.fillRect(0, 0, width, height);

      if (isReducedMotionRef.current) {
        // Serene static thermal glow for reduced motion
        const grad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, width * 0.45);
        grad.addColorStop(0, 'rgba(232, 83, 56, 0.22)');
        grad.addColorStop(0.7, 'rgba(180, 50, 25, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        animId = requestAnimationFrame(render);
        return;
      }

      // 2. Harmonic Wave Fields with Gravitational Singularity Warping
      const baseRadius = Math.min(width, height) * 0.08;
      const maxRadius = Math.min(width, height) * 0.52;

      for (let w = 0; w < numWaves; w++) {
        const progress = w / numWaves;
        const waveRadius = baseRadius + progress * (maxRadius - baseRadius) * (1 + energy * 0.15);
        const waveFreq = 2 + (w % 4) * 1.5;
        const waveSpeed = t * (0.8 + progress * 0.6) + energy * 0.8;
        const alpha = Math.max(
          0.04,
          (1 - progress) * (0.18 + res * 0.45 + energy * 0.25)
        );

        ctx.beginPath();
        for (let p = 0; p <= wavePoints; p++) {
          const theta = (p / wavePoints) * Math.PI * 2;

          // Acoustic Standing-wave interference equation
          const standingWave =
            Math.sin(theta * waveFreq + waveSpeed) * (4 + energy * 16 * (1 - progress)) +
            Math.cos(theta * 4 - waveSpeed * 1.2) * (2 + res * 10);

          let px = centerX + Math.cos(theta) * (waveRadius + standingWave);
          let py = centerY + Math.sin(theta) * (waveRadius + standingWave);

          // Gravitational warp toward pointer force
          const distToPtr = Math.hypot(px - ptrX, py - ptrY);
          const warpRadius = 240 * (1 + energy * 0.3);
          if (distToPtr < warpRadius) {
            const pull = (1 - distToPtr / warpRadius) * (22 + energy * 30);
            px += (ptrX - px) * (pull / warpRadius);
            py += (ptrY - py) * (pull / warpRadius);
          }

          if (p === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        // Color thermal ramp: Deep amber -> Ember crimson -> Incandescent gold
        const r = Math.min(255, Math.floor(210 + res * 45 + energy * 20));
        const g = Math.min(255, Math.floor(55 + progress * 40 + res * 80 + energy * 40));
        const b = Math.min(255, Math.floor(20 + progress * 15 + res * 30));

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = Math.max(0.8, (1 - progress) * (1.2 + res * 1.8));
        ctx.stroke();
      }

      // 3. Circular Acoustic Spectrum Frequency Bars (Hidden Music's living sonic breath)
      const spectrumRadius = baseRadius * (1.1 + res * 0.2);
      ctx.save();
      for (let b = 0; b < numFreqBars; b++) {
        const theta = (b / numFreqBars) * Math.PI * 2;
        // Synthetic harmonic spectrum: simulates dynamic frequency peaks of sound
        const freqNoise =
          Math.sin(theta * 8 + t * 4) * 0.4 +
          Math.cos(theta * 14 - t * 6) * 0.3 +
          Math.sin(theta * 3 + t * 2) * 0.3;
        const barHeight = Math.max(3, (8 + Math.abs(freqNoise) * 35) * (0.4 + res * 0.8 + energy * 0.5));

        const bx1 = centerX + Math.cos(theta) * spectrumRadius;
        const by1 = centerY + Math.sin(theta) * spectrumRadius;
        const bx2 = centerX + Math.cos(theta) * (spectrumRadius + barHeight);
        const by2 = centerY + Math.sin(theta) * (spectrumRadius + barHeight);

        const barAlpha = 0.15 + res * 0.65 + energy * 0.2;
        ctx.strokeStyle = `rgba(245, ${Math.floor(120 + res * 80)}, 50, ${barAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx1, by1);
        ctx.lineTo(bx2, by2);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Central Singularity Event Horizon (Deep core aura)
      const coreRadius = 38 + Math.sin(t * 3) * 4 + res * 22;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 2.2);
      coreGrad.addColorStop(0, `rgba(255, 180, 80, ${0.25 + res * 0.45})`);
      coreGrad.addColorStop(0.4, `rgba(235, 75, 40, ${0.2 + res * 0.3})`);
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div id="fire" className="world-stage world-stage--fire" aria-label="World 03: Fire">
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
          className="hidden-music-artifact"
          onPointerEnter={() => {
            isHoveringCoreRef.current = true;
            energyRef.current = Math.min(3.0, energyRef.current + 1.2);
          }}
          onPointerLeave={() => {
            isHoveringCoreRef.current = false;
          }}
          onFocus={() => {
            isHoveringCoreRef.current = true;
          }}
          onBlur={() => {
            isHoveringCoreRef.current = false;
          }}
        >
          <div className="artifact-aura" aria-hidden="true" />
          <div className="artifact-body">
            <div className="artifact-tag">{project.status}</div>
            <h3 className="artifact-title">{project.name.toUpperCase()}</h3>
            <p className="artifact-desc">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="artifact-action-link"
              aria-label={`${project.action} - ${project.name}`}
            >
              <span>{project.action}</span>
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        <div className="world-tactile-indicator" aria-hidden="true">
          <span className="tactile-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Di chuyển hoặc chạm để tương tác với sóng hài và cộng hưởng cùng Hidden Music'
              : 'Interact to excite harmonic waveforms and resonate with Hidden Music'}
          </span>
        </div>
      </div>
    </div>
  );
};
