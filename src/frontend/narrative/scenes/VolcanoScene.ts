/**
 * VOLCANO SCENE & THE PHYSICAL BIRTH OF IDENTITY
 * Molten magma caldera where NGÔ PHÚC / POSTLAIN is physically born from incandescent rock.
 * Features upward convection, elastic stretch, and cooling stabilization.
 */

import { ForceEvent } from '../input/InputEngine';
import { AUTOBIOGRAPHY_DATA } from '../data/autobiographyData';

interface MagmaSpur {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  heat: number;
  life: number;
}

export class VolcanoScene {
  private spurs: MagmaSpur[] = [];
  private readonly maxSpurs = 220;

  constructor() {
    this.initSpurs();
  }

  private initSpurs() {
    this.spurs = [];
    for (let i = 0; i < this.maxSpurs; i++) {
      this.spurs.push({
        x: 0.5 + (Math.random() - 0.5) * 0.4,
        y: 0.6 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 0.001,
        vy: -0.001 - Math.random() * 0.003,
        radius: 2 + Math.random() * 5,
        heat: 0.8 + Math.random() * 0.2,
        life: Math.random(),
      });
    }
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;

    for (let i = 0; i < this.spurs.length; i++) {
      const s = this.spurs[i];
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life += 0.006 * dt;

      // Force attraction
      for (let j = 0; j < forces.length; j++) {
        const f = forces[j];
        const dx = s.x - f.x;
        const dy = s.y - f.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.2) {
          s.vx += (dx / (dist + 0.001)) * f.speed * 0.003;
          s.vy += (dy / (dist + 0.001)) * f.speed * 0.003;
        }
      }

      // Drag and buoyancy
      s.vx *= Math.pow(0.94, dt);
      s.vy *= Math.pow(0.96, dt);

      // Reset when life expires or rises past top
      if (s.y < 0.1 || s.life > 1.0) {
        s.x = 0.5 + (Math.random() - 0.5) * 0.45;
        s.y = 0.75 + Math.random() * 0.25;
        s.vx = (Math.random() - 0.5) * 0.0012;
        s.vy = -0.0015 - Math.random() * 0.0035;
        s.life = 0;
      }
    }
  }

  public render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number,
    locale: 'vi' | 'en'
  ) {
    // Scene Envelope: Active between progress 0.14 -> 0.48
    let sceneAlpha = 0;
    if (progress >= 0.14 && progress < 0.24) {
      sceneAlpha = (progress - 0.14) / 0.10; // Fade in from desert
    } else if (progress >= 0.24 && progress <= 0.38) {
      sceneAlpha = 1.0;
    } else if (progress > 0.38 && progress <= 0.48) {
      sceneAlpha = 1.0 - (progress - 0.38) / 0.10; // Cool into water
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // Cooling factor: As progress moves past 0.34, thermal colors grade toward slate basalt
    const coolingProgress = Math.max(0, Math.min(1, (progress - 0.32) / 0.12));

    // 1. Dark Volcanic Sky & Atmosphere
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    if (coolingProgress > 0) {
      skyGrad.addColorStop(0, '#0a0d10');
      skyGrad.addColorStop(0.5, '#12181f');
      skyGrad.addColorStop(1, '#1b242e'); // Steam & blue condensation tones
    } else {
      skyGrad.addColorStop(0, '#0c0706');
      skyGrad.addColorStop(0.5, '#1e0c08');
      skyGrad.addColorStop(1, '#3a130c'); // Radiant magma glow
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Volcanic Crater Base Geometry
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width * 0.2, height * 0.62);
    ctx.lineTo(width * 0.45, height * 0.72);
    ctx.lineTo(width * 0.55, height * 0.72);
    ctx.lineTo(width * 0.8, height * 0.62);
    ctx.lineTo(width, height);
    ctx.closePath();

    const craterGrad = ctx.createLinearGradient(0, height * 0.62, 0, height);
    if (coolingProgress > 0) {
      craterGrad.addColorStop(0, '#151b22');
      craterGrad.addColorStop(1, '#090d12');
    } else {
      craterGrad.addColorStop(0, '#ff4500');
      craterGrad.addColorStop(0.3, '#cf4525');
      craterGrad.addColorStop(1, '#1a0805');
    }
    ctx.fillStyle = craterGrad;
    ctx.shadowColor = coolingProgress > 0 ? '#4895ef' : '#ff4500';
    ctx.shadowBlur = coolingProgress > 0 ? 10 : 35;
    ctx.fill();
    ctx.restore();

    // 3. Magma Spurs & Rising Convection Embers
    for (let i = 0; i < this.spurs.length; i++) {
      const s = this.spurs[i];
      const sx = s.x * width;
      const sy = s.y * height;
      const emberAlpha = (1 - s.life) * sceneAlpha;

      ctx.beginPath();
      ctx.arc(sx, sy, s.radius * (1 - s.life * 0.4), 0, Math.PI * 2);

      if (coolingProgress > 0.5) {
        ctx.fillStyle = `rgba(160, 200, 240, ${emberAlpha * 0.7})`; // Steam condensation droplet
        ctx.shadowColor = '#7890a3';
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = `rgba(255, ${Math.floor(100 + (1 - s.life) * 155)}, 30, ${emberAlpha})`;
        ctx.shadowColor = '#cf4525';
        ctx.shadowBlur = 12;
      }
      ctx.fill();
    }

    // 4. The Birth of Identity: NGÔ PHÚC & POSTLAIN
    // Progress window for formation: 0.22 -> 0.36
    const formationFactor = Math.max(0, Math.min(1, (progress - 0.20) / 0.08));
    const settleFactor = Math.max(0, Math.min(1, (progress - 0.26) / 0.06));

    if (formationFactor > 0) {
      ctx.save();
      const identityY = height * 0.38 - (1 - settleFactor) * (height * 0.08); // Elastic rise and settle
      ctx.textAlign = 'center';

      // Primary: NGÔ PHÚC (Display Serif Cormorant Garamond)
      ctx.font = '700 clamp(36px, 6vw, 76px) "Cormorant Garamond", Georgia, serif';
      ctx.letterSpacing = '0.04em';

      if (coolingProgress > 0) {
        ctx.fillStyle = `rgba(240, 244, 248, ${sceneAlpha})`;
        ctx.shadowColor = 'rgba(120, 144, 163, 0.6)';
        ctx.shadowBlur = 12;
      } else {
        ctx.fillStyle = `rgba(255, 235, 220, ${sceneAlpha})`;
        ctx.shadowColor = '#cf4525';
        ctx.shadowBlur = 25 * (1 - settleFactor * 0.5);
      }

      ctx.fillText(AUTOBIOGRAPHY_DATA.identity.name, width * 0.5, identityY);

      // Sub-identity: POSTLAIN
      ctx.font = '600 clamp(13px, 1.8vw, 20px) "Space Grotesk", monospace';
      ctx.letterSpacing = '0.28em';
      ctx.fillStyle =
        coolingProgress > 0
          ? 'rgba(160, 185, 210, 0.85)'
          : 'rgba(255, 120, 60, 0.9)';
      ctx.shadowBlur = 8;
      ctx.fillText(
        `[ ${AUTOBIOGRAPHY_DATA.identity.brand} ]`,
        width * 0.5,
        identityY + 44
      );

      // Role subtitle: Operations & Studio Manager
      ctx.font = '400 clamp(10px, 1.2vw, 13px) "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '0.18em';
      ctx.fillStyle = 'rgba(210, 200, 190, 0.7)';
      ctx.shadowBlur = 0;
      ctx.fillText(
        AUTOBIOGRAPHY_DATA.identity.roleTitle[locale],
        width * 0.5,
        identityY + 74
      );

      ctx.restore();
    }

    ctx.restore();
  }
}
