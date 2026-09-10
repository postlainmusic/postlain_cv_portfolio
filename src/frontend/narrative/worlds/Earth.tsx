import React, { useEffect, useRef, useState } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { InputSampler } from '../interaction/InputSampler';

interface EarthProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  brand: {
    entity: string;
    person: string;
    tagline: string;
    email: string;
  };
  onRestart?: () => void;
}

interface SedimentParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  mass: number;
  alpha: number;
  baseAlpha: number;
  settled: boolean;
}

/**
 * World 05: EARTH (SETTLE — Density / Gravity / Human Ground)
 * Physical Behavior:
 * - Sedimentation physics: mineral particles slowly descend under gentle gravity and air friction.
 * - Pointer movement creates subtle ambient air currents displacing floating motes.
 * - Quiet, dignified human reveal of NGÔ PHÚC / POSTLAIN.
 * - Direct contact gateway: email action, copy address, and graceful return loop to Void.
 * - Zero React setState in RAF loop (Law 5 compliant).
 */
export const Earth: React.FC<EarthProps> = ({ copy, locale, brand, onRestart }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const isReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    isReducedMotionRef.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(brand.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Sedimentation particle simulation ticker
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const inputSampler = InputSampler.getInstance();
    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const particles: SedimentParticle[] = [];
    const NUM_PARTICLES = 120;

    const initParticles = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: 0.15 + Math.random() * 0.35, // Slow downward gravitational drift
          size: 1.0 + Math.random() * 2.2,
          mass: 1.0 + Math.random() * 2.0,
          alpha: 0.2 + Math.random() * 0.45,
          baseAlpha: 0.2 + Math.random() * 0.45,
          settled: false,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        initParticles(width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) * 0.001, 0.05);
      lastTime = currentTime;
      const t = currentTime * 0.001;

      ctx.clearRect(0, 0, width, height);

      if (isReducedMotionRef.current) {
        // Serene warm ambient ground glow for reduced motion
        const groundGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
        groundGrad.addColorStop(0, 'transparent');
        groundGrad.addColorStop(1, 'rgba(160, 120, 80, 0.08)');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, height * 0.6, width, height * 0.4);
        animId = requestAnimationFrame(render);
        return;
      }

      // Input forces create soft air displacement
      const forces = inputSampler.sampleForces();
      const pointerState = inputSampler.getPointerState();
      const ptrX = pointerState.x * width;
      const ptrY = pointerState.y * height;

      // Draw and update sedimentation particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gravitational downward settling + slight Brownian drift
        const brownian = Math.sin(t * 1.5 + i * 0.5) * 0.08;
        p.vx = p.vx * 0.95 + brownian;
        p.vy = Math.min(0.8, p.vy * 0.98 + 0.008); // Terminal settling velocity

        // Air displacement from pointer
        const dx = p.x - ptrX;
        const dy = p.y - ptrY;
        const dist = Math.hypot(dx, dy);
        const airRadius = 140;

        if (dist < airRadius && dist > 0.1) {
          const push = (1 - dist / airRadius) * (0.8 / p.mass);
          p.vx += (dx / dist) * push;
          p.vy += (dy / dist) * push;
        }

        // Additional impulse from coalesced input events
        for (let f = 0; f < forces.length; f++) {
          const force = forces[f];
          const fdx = p.x - force.x * width;
          const fdy = p.y - force.y * height;
          const fdist = Math.hypot(fdx, fdy);
          if (fdist < 100) {
            const fpush = (1 - fdist / 100) * force.strength * 0.5;
            p.vx += (fdx / (fdist || 1)) * fpush;
            p.vy += (fdy / (fdist || 1)) * fpush;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around top when reaching viewport bottom to maintain continuous sedimentation
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
          p.vx = (Math.random() - 0.5) * 0.2;
          p.vy = 0.15 + Math.random() * 0.35;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Render warm mineral dust mote
        ctx.fillStyle = `rgba(215, 195, 170, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft sedimentation horizon at the bottom edge
      const groundGrad = ctx.createLinearGradient(0, height * 0.75, 0, height);
      groundGrad.addColorStop(0, 'transparent');
      groundGrad.addColorStop(1, 'rgba(140, 105, 75, 0.08)');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, height * 0.75, width, height * 0.25);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div id="earth" className="world-stage world-stage--earth" aria-label="World 05: Earth">
      <canvas ref={canvasRef} className="world-canvas earth-canvas" aria-hidden="true" />
      <div className="earth-warm-glow" aria-hidden="true" />
      <div className="earth-subtle-grain" aria-hidden="true" />

      <div className="world-content-layer earth-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">05 / EARTH</span>
          <span className="world-verb-badge">SETTLE · ĐIỂM TỰA BẢN NGUYÊN</span>
        </div>

        {/* Quiet Human Reveal */}
        <div className="earth-identity-block">
          <p className="earth-kicker">{copy.kicker}</p>
          <div className="earth-person-name">
            <span className="name-primary">{brand.person}</span>
            <span className="name-entity">[{brand.entity}]</span>
          </div>
          <p className="earth-tagline">{brand.tagline}</p>

          <div className="earth-narrative-prose">
            <p className="prose-statement">{copy.statement}</p>
            {copy.secondary && <p className="prose-secondary">{copy.secondary}</p>}
          </div>

          {/* Contact & Frequency Channels */}
          <div className="earth-actions">
            <a
              href={`mailto:${brand.email}`}
              className="earth-email-button"
              aria-label={`Send email to ${brand.email}`}
            >
              <span className="email-label">{brand.email}</span>
              <span className="email-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="earth-copy-btn"
              aria-label="Copy email address to clipboard"
            >
              {copied
                ? locale === 'vi'
                  ? 'Đã sao chép email'
                  : 'Copied to clipboard'
                : locale === 'vi'
                ? 'Sao chép'
                : 'Copy address'}
            </button>
          </div>

          {/* Settle Ground Footer & Ouroboros Loop */}
          <div className="earth-footer-meta">
            <span className="meta-item">© 2026 POSTLAIN</span>
            <span className="meta-separator" aria-hidden="true">
              ·
            </span>
            <span className="meta-item">ALL DISCIPLINES CONVERGE INTO ART</span>
            <span className="meta-separator" aria-hidden="true">
              ·
            </span>
            {onRestart && (
              <button
                type="button"
                onClick={onRestart}
                className="earth-restart-btn"
                aria-label="Return to beginning (World 00: Void)"
              >
                {locale === 'vi' ? 'Khởi động lại từ Hư Không (00)' : 'Return to Void (00)'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
