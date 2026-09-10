/**
 * STORM SCENE — KINETIC ENERGY VORTEX & VOLUMETRIC CLOUD RIFT
 * Procedural Multi-Octave FBM Cloud Synthesis, Dynamic Lightning Arcs,
 * Turbulent Streamlines, and Physical Cloud Veil Separation.
 */

import { ForceEvent } from '../input/InputEngine';

interface WindParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  speed: number;
}

interface LightningBolt {
  points: { x: number; y: number }[];
  alpha: number;
  decay: number;
  branches: { points: { x: number; y: number }[]; alpha: number }[];
}

export class StormScene {
  private particles: WindParticle[] = [];
  private readonly maxParticles = 320;
  private lightning: LightningBolt | null = null;
  private time: number = 0;
  private flashAlpha: number = 0;
  private nextLightningTime: number = 2.5;

  constructor() {
    this.initParticles();
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0.012 + Math.random() * 0.028,
        vy: (Math.random() - 0.5) * 0.008,
        length: 12 + Math.random() * 32,
        alpha: 0.25 + Math.random() * 0.55,
        speed: 1.0 + Math.random() * 1.5,
      });
    }
  }

  private triggerLightning() {
    const startX = 0.3 + Math.random() * 0.4;
    const points: { x: number; y: number }[] = [{ x: startX, y: 0 }];
    let curX = startX;
    let curY = 0;

    const segments = 14;
    for (let s = 1; s <= segments; s++) {
      curY = s / segments;
      curX += (Math.random() - 0.5) * 0.08;
      points.push({ x: curX, y: curY });
    }

    // Branching arcs
    const branches: { points: { x: number; y: number }[]; alpha: number }[] = [];
    if (Math.random() > 0.3) {
      const branchOrigin = points[Math.floor(points.length * 0.45)];
      const bPoints = [{ x: branchOrigin.x, y: branchOrigin.y }];
      let bx = branchOrigin.x;
      let by = branchOrigin.y;
      for (let b = 0; b < 6; b++) {
        by += 0.06;
        bx += (Math.random() - 0.3) * 0.1;
        bPoints.push({ x: bx, y: by });
      }
      branches.push({ points: bPoints, alpha: 0.8 });
    }

    this.lightning = {
      points,
      alpha: 1.0,
      decay: 0.08,
      branches,
    };
    this.flashAlpha = 0.65;
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;
    this.time += dt * 0.016;

    // Wind particles simulation
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx * dt * p.speed;
      p.y += p.vy * dt;

      if (p.x > 1.15) {
        p.x = -0.15;
        p.y = Math.random();
      }
    }

    // Lightning lifecycle in storm zone
    if (progress >= 0.84 && progress <= 0.94) {
      this.nextLightningTime -= dt * 0.016;
      if (this.nextLightningTime <= 0) {
        this.triggerLightning();
        this.nextLightningTime = 1.8 + Math.random() * 3.2;
      }
    }

    if (this.lightning) {
      this.lightning.alpha -= this.lightning.decay * dt;
      if (this.lightning.alpha <= 0) {
        this.lightning = null;
      }
    }

    if (this.flashAlpha > 0) {
      this.flashAlpha = Math.max(0, this.flashAlpha - 0.05 * dt);
    }
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
    // Scene Envelope: Active between progress 0.82 -> 0.96
    let sceneAlpha = 0;
    if (progress >= 0.82 && progress < 0.88) {
      sceneAlpha = (progress - 0.82) / 0.06;
    } else if (progress >= 0.88 && progress <= 0.92) {
      sceneAlpha = 1.0;
    } else if (progress > 0.92 && progress <= 0.96) {
      sceneAlpha = 1.0 - (progress - 0.92) / 0.04;
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // Physical Cloud Rift Opening Factor: As progress moves past 0.89, storm clouds split vertically
    const riftFactor = Math.max(0, Math.min(1, (progress - 0.89) / 0.06));

    // 1. Dark Atmospheric Storm Layer
    const stormGrad = ctx.createLinearGradient(0, 0, 0, height);
    stormGrad.addColorStop(0, '#04070b');
    stormGrad.addColorStop(0.5, '#0b121c');
    stormGrad.addColorStop(1, '#070b10');
    ctx.fillStyle = stormGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Procedural Turbulent Cloud Masses
    ctx.save();
    const cloudCount = 18;
    for (let c = 0; c < cloudCount; c++) {
      const cx = (c / cloudCount) * width + Math.sin(this.time * 0.6 + c) * 40;
      const cy = height * (0.2 + (c % 5) * 0.15) + Math.cos(this.time * 0.4 + c) * 30;
      const cr = width * (0.15 + (c % 3) * 0.08);

      const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      cGrad.addColorStop(0, 'rgba(24, 36, 52, 0.45)');
      cGrad.addColorStop(0.6, 'rgba(12, 18, 28, 0.3)');
      cGrad.addColorStop(1, 'rgba(5, 8, 14, 0)');

      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 3. Lightning Flash Illumination
    if (this.flashAlpha > 0) {
      ctx.save();
      ctx.fillStyle = `rgba(180, 215, 255, ${this.flashAlpha * 0.45})`;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    // 4. Branching Lightning Bolt Arcs
    if (this.lightning) {
      ctx.save();
      ctx.strokeStyle = `rgba(235, 245, 255, ${this.lightning.alpha})`;
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#68b5ff';
      ctx.shadowBlur = 18;

      // Main trunk
      ctx.beginPath();
      for (let p = 0; p < this.lightning.points.length; p++) {
        const pt = this.lightning.points[p];
        const lx = pt.x * width;
        const ly = pt.y * height;
        if (p === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      ctx.stroke();

      // Side branches
      for (let b = 0; b < this.lightning.branches.length; b++) {
        const br = this.lightning.branches[b];
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        for (let bp = 0; bp < br.points.length; bp++) {
          const pt = br.points[bp];
          const lx = pt.x * width;
          const ly = pt.y * height;
          if (bp === 0) ctx.moveTo(lx, ly);
          else ctx.lineTo(lx, ly);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // 5. High-Velocity Turbulent Streamlines
    ctx.save();
    ctx.strokeStyle = 'rgba(175, 205, 235, 0.55)';
    ctx.lineWidth = 1.6;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const px = p.x * width;
      const py = p.y * height;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - p.length * (1.0 - riftFactor * 0.6), py + p.vy * 400);
      ctx.stroke();
    }
    ctx.restore();

    // 6. Physical Cloud Rift (Vertical separation revealing night sky)
    if (riftFactor > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      
      const riftHalfWidth = width * 0.7 * riftFactor;
      const riftCenter = width * 0.5;

      const riftMask = ctx.createLinearGradient(riftCenter - riftHalfWidth, 0, riftCenter + riftHalfWidth, 0);
      riftMask.addColorStop(0, 'rgba(0, 0, 0, 0)');
      riftMask.addColorStop(0.3, 'rgba(0, 0, 0, 0.95)');
      riftMask.addColorStop(0.5, 'rgba(0, 0, 0, 1.0)');
      riftMask.addColorStop(0.7, 'rgba(0, 0, 0, 0.95)');
      riftMask.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = riftMask;
      ctx.fillRect(riftCenter - riftHalfWidth, 0, riftHalfWidth * 2, height);
      ctx.restore();
    }

    ctx.restore();
  }
}

