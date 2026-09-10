/**
 * Typography Material Engine
 * Treats typography as a physical substance participating in the material simulation.
 * Manages physical properties: mass, velocity, inertia, tension, deformation, and readability bounds.
 */

export type ContentHierarchy = 'primary' | 'secondary' | 'decorative';

export interface PhysicalGlyph {
  char: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  mass: number;
  tension: number;
  damping: number;
  rotation: number;
  scale: number;
  opacity: number;
  hierarchy: ContentHierarchy;
}

export interface MaterialTypographyProfile {
  worldId: string;
  massMultiplier: number;
  tension: number;
  damping: number;
  maxDisplacement: {
    primary: number;   // Strictly bounded (e.g. 2-4px) to guarantee readability
    secondary: number; // Moderately flexible (e.g. 10-18px)
    decorative: number;// Free physical range (e.g. 40-80px)
  };
  coupling: {
    velocityScale: number;
    pressureScale: number;
    energyScale: number;
  };
}

export const MATERIAL_PROFILES: Record<string, MaterialTypographyProfile> = {
  void: {
    worldId: 'void',
    massMultiplier: 0.7,
    tension: 0.14,
    damping: 0.88,
    maxDisplacement: { primary: 3, secondary: 12, decorative: 45 },
    coupling: { velocityScale: 0.5, pressureScale: 0.3, energyScale: 0.8 },
  },
  water: {
    worldId: 'water',
    massMultiplier: 1.2,
    tension: 0.08,
    damping: 0.94,
    maxDisplacement: { primary: 4, secondary: 18, decorative: 60 },
    coupling: { velocityScale: 1.6, pressureScale: 1.2, energyScale: 0.6 },
  },
  wood: {
    worldId: 'wood',
    massMultiplier: 1.8,
    tension: 0.22,
    damping: 0.82,
    maxDisplacement: { primary: 2, secondary: 10, decorative: 35 },
    coupling: { velocityScale: 0.4, pressureScale: 0.5, energyScale: 0.9 },
  },
  fire: {
    worldId: 'fire',
    massMultiplier: 0.5,
    tension: 0.25,
    damping: 0.78,
    maxDisplacement: { primary: 3.5, secondary: 22, decorative: 75 },
    coupling: { velocityScale: 2.0, pressureScale: 1.5, energyScale: 2.2 },
  },
  metal: {
    worldId: 'metal',
    massMultiplier: 2.5,
    tension: 0.35,
    damping: 0.72,
    maxDisplacement: { primary: 2, secondary: 8, decorative: 25 },
    coupling: { velocityScale: 0.3, pressureScale: 0.8, energyScale: 0.5 },
  },
  earth: {
    worldId: 'earth',
    massMultiplier: 3.2,
    tension: 0.18,
    damping: 0.65,
    maxDisplacement: { primary: 1.5, secondary: 6, decorative: 15 },
    coupling: { velocityScale: 0.2, pressureScale: 0.4, energyScale: 0.3 },
  },
};

export class TypographyEngine {
  private profile: MaterialTypographyProfile;
  private glyphs: PhysicalGlyph[] = [];

  constructor(worldId = 'void') {
    this.profile = MATERIAL_PROFILES[worldId] || MATERIAL_PROFILES.void;
  }

  public setWorldProfile(worldId: string) {
    if (MATERIAL_PROFILES[worldId]) {
      this.profile = MATERIAL_PROFILES[worldId];
    }
  }

  public registerGlyphs(
    text: string,
    originX: number,
    originY: number,
    letterSpacing = 16,
    hierarchy: ContentHierarchy = 'primary'
  ): PhysicalGlyph[] {
    const newGlyphs: PhysicalGlyph[] = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const bx = originX + i * letterSpacing;
      const by = originY;

      newGlyphs.push({
        char,
        x: bx,
        y: by,
        baseX: bx,
        baseY: by,
        vx: 0,
        vy: 0,
        mass: this.profile.massMultiplier,
        tension: this.profile.tension,
        damping: this.profile.damping,
        rotation: 0,
        scale: 1,
        opacity: 1,
        hierarchy,
      });
    }

    this.glyphs.push(...newGlyphs);
    return newGlyphs;
  }

  /**
   * Updates glyph physics with spring forces, applied material velocity, and readability bounding.
   * Runs in the single RAF loop without triggering React re-renders.
   */
  public updatePhysics(
    appliedForces: { x: number; y: number; vx: number; vy: number; radius: number }[]
  ) {
    const prof = this.profile;

    for (let i = 0; i < this.glyphs.length; i++) {
      const g = this.glyphs[i];

      // 1. Hooke's Law Spring Force towards rest position (baseX, baseY)
      const dx = g.baseX - g.x;
      const dy = g.baseY - g.y;
      const springFx = dx * g.tension;
      const springFy = dy * g.tension;

      // 2. Applied external material force from fluid/energy/pointer
      let extFx = 0;
      let extFy = 0;
      for (let j = 0; j < appliedForces.length; j++) {
        const force = appliedForces[j];
        const dist = Math.hypot(g.x - force.x, g.y - force.y);
        if (dist < force.radius) {
          const falloff = 1 - dist / force.radius;
          extFx += force.vx * falloff * prof.coupling.velocityScale;
          extFy += force.vy * falloff * prof.coupling.velocityScale;
        }
      }

      // Acceleration = F / m
      const ax = (springFx + extFx) / g.mass;
      const ay = (springFy + extFy) / g.mass;

      g.vx = (g.vx + ax) * g.damping;
      g.vy = (g.vy + ay) * g.damping;

      g.x += g.vx;
      g.y += g.vy;

      // 3. Strict Readability Law Clamping
      const maxDisp = prof.maxDisplacement[g.hierarchy];
      const currentOffsetX = g.x - g.baseX;
      const currentOffsetY = g.y - g.baseY;
      const currentDist = Math.hypot(currentOffsetX, currentOffsetY);

      if (currentDist > maxDisp) {
        const ratio = maxDisp / currentDist;
        g.x = g.baseX + currentOffsetX * ratio;
        g.y = g.baseY + currentOffsetY * ratio;
        g.vx *= 0.5;
        g.vy *= 0.5;
      }
    }
  }

  public getGlyphs(): PhysicalGlyph[] {
    return this.glyphs;
  }

  public clear() {
    this.glyphs = [];
  }
}
