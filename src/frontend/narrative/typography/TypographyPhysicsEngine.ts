/**
 * TYPOGRAPHY PHYSICS ENGINE
 * Semi-Implicit Euler mass-spring-damper solver for physical typography.
 * Enforces maximum displacement clamping and 100% recovery to crisp geometry.
 */

import { ForceEvent } from '../input/InputEngine';

export interface GlyphParticle {
  id: string;
  char: string;
  originX: number; // Viewport percentage [0, 1]
  originY: number; // Viewport percentage [0, 1]
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  rotation: number;
  opacity: number;
  mass: number;
  damping: number;
  stiffness: number;
  isSettled: boolean;
}

export class TypographyPhysicsEngine {
  private particles: GlyphParticle[] = [];

  public registerGlyphs(
    glyphs: Array<{
      id: string;
      char: string;
      originX: number;
      originY: number;
      mass?: number;
      stiffness?: number;
      damping?: number;
    }>
  ) {
    this.particles = glyphs.map((g) => ({
      id: g.id,
      char: g.char,
      originX: g.originX,
      originY: g.originY,
      x: g.originX,
      y: g.originY,
      vx: 0,
      vy: 0,
      scale: 1.0,
      rotation: 0,
      opacity: 1.0,
      mass: g.mass || 1.0,
      damping: g.damping || 0.88,
      stiffness: g.stiffness || 0.12,
      isSettled: true,
    }));
  }

  public update(forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // 1. External Force Accumulation from input forces
      let fx = 0;
      let fy = 0;

      for (let j = 0; j < forces.length; j++) {
        const f = forces[j];
        const dx = p.x - f.x;
        const dy = p.y - f.y;
        const dist = Math.hypot(dx, dy);
        const radius = 0.15; // 15% viewport interaction radius

        if (dist < radius && dist > 0.001) {
          const strength = (1 - dist / radius) * f.pressure * 0.008;
          fx += (dx / dist) * strength + f.vx * 0.05;
          fy += (dy / dist) * strength + f.vy * 0.05;
        }
      }

      // 2. Hooke's Law Spring Force toward Origin
      const dispX = p.x - p.originX;
      const dispY = p.y - p.originY;
      const springFx = -dispX * p.stiffness;
      const springFy = -dispY * p.stiffness;

      // 3. Semi-Implicit Euler Integration
      const totalFx = fx + springFx;
      const totalFy = fy + springFy;

      p.vx = (p.vx + (totalFx / p.mass) * dt) * Math.pow(p.damping, dt);
      p.vy = (p.vy + (totalFy / p.mass) * dt) * Math.pow(p.damping, dt);

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // 4. Maximum Displacement Clamping (Readability preservation rule: max 2.5% viewport displacement)
      const maxDisp = 0.025;
      const currentDisp = Math.hypot(p.x - p.originX, p.y - p.originY);
      if (currentDisp > maxDisp) {
        const ratio = maxDisp / currentDisp;
        p.x = p.originX + (p.x - p.originX) * ratio;
        p.y = p.originY + (p.y - p.originY) * ratio;
        p.vx *= 0.5;
        p.vy *= 0.5;
      }

      // 5. Angular & Scale dynamics
      p.rotation = p.vx * 1.5;
      p.scale = 1.0 + Math.min(0.15, Math.hypot(p.vx, p.vy) * 2.0);

      // 6. Settling Check
      const speed = Math.hypot(p.vx, p.vy);
      if (speed < 0.0001 && currentDisp < 0.0002) {
        p.x = p.originX;
        p.y = p.originY;
        p.vx = 0;
        p.vy = 0;
        p.rotation = 0;
        p.scale = 1.0;
        p.isSettled = true;
      } else {
        p.isSettled = false;
      }
    }
  }

  public getParticles(): GlyphParticle[] {
    return this.particles;
  }
}
