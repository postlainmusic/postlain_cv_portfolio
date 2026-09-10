/**
 * STORM SCENE & KINETIC ENERGY VORTEX
 * The pressure, struggle, and clearing of all non-essential noise.
 * High-velocity wind particles, cloud division, and transition to celestial clarity.
 */

import { ForceEvent } from '../input/InputEngine';

interface WindParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
}

export class StormScene {
  private particles: WindParticle[] = [];
  private readonly maxParticles = 380;

  constructor() {
    this.initParticles();
  }

  private initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0.008 + Math.random() * 0.02,
        vy: (Math.random() - 0.5) * 0.004,
        length: 8 + Math.random() * 24,
        alpha: 0.2 + Math.random() * 0.5,
      });
    }
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.x > 1.1) {
        p.x = -0.1;
        p.y = Math.random();
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
    // Scene Envelope: Active between progress 0.80 -> 0.96
    let sceneAlpha = 0;
    if (progress >= 0.80 && progress < 0.88) {
      sceneAlpha = (progress - 0.80) / 0.08;
    } else if (progress >= 0.88 && progress <= 0.92) {
      sceneAlpha = 1.0;
    } else if (progress > 0.92 && progress <= 0.96) {
      sceneAlpha = 1.0 - (progress - 0.92) / 0.04; // Clouds roll outward
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // Cloud Clearing Factor: As progress moves past 0.91, storm clouds part
    const clearingFactor = Math.max(0, Math.min(1, (progress - 0.90) / 0.05));

    // 1. Dark Storm Cloud Background
    ctx.fillStyle = '#070a0e';
    ctx.fillRect(0, 0, width, height);

    // 2. High-Velocity Wind Vectors
    ctx.strokeStyle = 'rgba(160, 185, 205, 0.45)';
    ctx.lineWidth = 1.5;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const px = p.x * width;
      const py = p.y * height;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - p.length * (1 - clearingFactor * 0.7), py);
      ctx.stroke();
    }

    // 3. Central Vertical Cloud Rift (Opening to Moon)
    if (clearingFactor > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const riftWidth = width * clearingFactor * 1.4;
      const riftGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        riftWidth
      );
      riftGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      riftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = riftGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    ctx.restore();
  }
}
