/**
 * VOLCANO SCENE — THE LIVING PHOTOREALISTIC BIRTH OF IDENTITY
 * Real 4K active volcanic crater with churning molten magma lake, incandescent veins,
 * and the physical birth & stabilization of NGÔ PHÚC / POSTLAIN from liquid rock.
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
  private img: HTMLImageElement | null = null;
  private isImageLoaded: boolean = false;
  private spurs: MagmaSpur[] = [];
  private readonly maxSpurs = 260;

  constructor() {
    this.loadImage();
    this.initSpurs();
  }

  private loadImage() {
    this.img = new Image();
    this.img.src = '/images/volcano.jpg';
    this.img.onload = () => {
      this.isImageLoaded = true;
    };
  }

  private initSpurs() {
    this.spurs = [];
    for (let i = 0; i < this.maxSpurs; i++) {
      this.spurs.push({
        x: 0.5 + (Math.random() - 0.5) * 0.45,
        y: 0.65 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.0012,
        vy: -0.0012 - Math.random() * 0.0035,
        radius: 2 + Math.random() * 5.5,
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
      s.life += 0.007 * dt;

      // Force attraction
      for (let j = 0; j < forces.length; j++) {
        const f = forces[j];
        const dx = s.x - f.x;
        const dy = s.y - f.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.22) {
          s.vx += (dx / (dist + 0.001)) * f.speed * 0.0035;
          s.vy += (dy / (dist + 0.001)) * f.speed * 0.0035;
        }
      }

      s.vx *= Math.pow(0.94, dt);
      s.vy *= Math.pow(0.96, dt);

      if (s.y < 0.1 || s.life > 1.0) {
        s.x = 0.5 + (Math.random() - 0.5) * 0.45;
        s.y = 0.72 + Math.random() * 0.28;
        s.vx = (Math.random() - 0.5) * 0.0012;
        s.vy = -0.0015 - Math.random() * 0.004;
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
    let sceneAlpha = 0;
    if (progress >= 0.14 && progress < 0.24) {
      sceneAlpha = (progress - 0.14) / 0.10;
    } else if (progress >= 0.24 && progress <= 0.38) {
      sceneAlpha = 1.0;
    } else if (progress > 0.38 && progress <= 0.48) {
      sceneAlpha = 1.0 - (progress - 0.38) / 0.10;
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    const coolingProgress = Math.max(0, Math.min(1, (progress - 0.32) / 0.12));

    // 1. Draw Real 4K Volcano Photo Plate
    if (this.isImageLoaded && this.img) {
      const zoomScale = 1.0 + (progress - 0.14) * 0.35;
      const dw = width * zoomScale;
      const dh = height * zoomScale;
      const dx = (width - dw) * 0.5;
      const dy = (height - dh) * 0.5;

      ctx.drawImage(this.img, dx, dy, dw, dh);
    } else {
      ctx.fillStyle = '#0f0806';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Churning Molten Magma Convection Overlay in Caldera Core
    const coreX = width * 0.5;
    const coreY = height * 0.72;
    const coreRadius = Math.max(120, width * 0.22);

    const magmaGlow = ctx.createRadialGradient(coreX, coreY, 10, coreX, coreY, coreRadius * 2.2);
    if (coolingProgress > 0) {
      magmaGlow.addColorStop(0, 'rgba(80, 140, 200, 0.45)'); // Steam & cooling vapor
      magmaGlow.addColorStop(0.5, 'rgba(30, 45, 60, 0.3)');
      magmaGlow.addColorStop(1, 'rgba(10, 15, 20, 0)');
    } else {
      magmaGlow.addColorStop(0, 'rgba(255, 180, 40, 0.75)');
      magmaGlow.addColorStop(0.4, 'rgba(255, 60, 10, 0.5)');
      magmaGlow.addColorStop(1, 'rgba(30, 10, 5, 0)');
    }
    ctx.fillStyle = magmaGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Magma Spurs & Rising Convection Embers
    for (let i = 0; i < this.spurs.length; i++) {
      const s = this.spurs[i];
      const sx = s.x * width;
      const sy = s.y * height;
      const emberAlpha = (1 - s.life) * sceneAlpha;

      ctx.beginPath();
      ctx.arc(sx, sy, s.radius * (1 - s.life * 0.4), 0, Math.PI * 2);

      if (coolingProgress > 0.5) {
        ctx.fillStyle = `rgba(180, 220, 255, ${emberAlpha * 0.8})`;
        ctx.shadowColor = '#7890a3';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = `rgba(255, ${Math.floor(120 + (1 - s.life) * 135)}, 30, ${emberAlpha})`;
        ctx.shadowColor = '#ff4500';
        ctx.shadowBlur = 14;
      }
      ctx.fill();
    }

    // 4. The Living Birth of Identity: NGÔ PHÚC / POSTLAIN
    const formationFactor = Math.max(0, Math.min(1, (progress - 0.20) / 0.08));
    const settleFactor = Math.max(0, Math.min(1, (progress - 0.26) / 0.06));

    if (formationFactor > 0) {
      ctx.save();
      const identityY = height * 0.36 - (1 - settleFactor) * (height * 0.06);
      ctx.textAlign = 'center';

      // Primary: NGÔ PHÚC (Cormorant Garamond, Born from fire)
      ctx.font = '700 clamp(42px, 6.8vw, 88px) "Cormorant Garamond", Georgia, serif';
      ctx.letterSpacing = '0.04em';

      if (coolingProgress > 0) {
        ctx.fillStyle = `rgba(245, 250, 255, ${sceneAlpha})`;
        ctx.shadowColor = 'rgba(73, 179, 252, 0.75)';
        ctx.shadowBlur = 16;
      } else {
        ctx.fillStyle = `rgba(255, 245, 235, ${sceneAlpha})`;
        ctx.shadowColor = '#cf4525';
        ctx.shadowBlur = 30 * (1 - settleFactor * 0.4);
      }
      ctx.fillText(AUTOBIOGRAPHY_DATA.identity.name, width * 0.5, identityY);

      // Sub-identity: POSTLAIN
      ctx.font = '600 clamp(14px, 2.0vw, 22px) "Space Grotesk", monospace';
      ctx.letterSpacing = '0.32em';
      ctx.fillStyle =
        coolingProgress > 0
          ? 'rgba(180, 210, 240, 0.9)'
          : 'rgba(255, 140, 70, 0.95)';
      ctx.shadowBlur = 10;
      ctx.fillText(
        `[ ${AUTOBIOGRAPHY_DATA.identity.brand} ]`,
        width * 0.5,
        identityY + 48
      );

      // Role subtitle: Operations & Studio Manager
      ctx.font = '500 clamp(11px, 1.3vw, 15px) "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '0.2em';
      ctx.fillStyle = 'rgba(235, 225, 215, 0.85)';
      ctx.shadowBlur = 0;
      ctx.fillText(
        AUTOBIOGRAPHY_DATA.identity.roleTitle[locale],
        width * 0.5,
        identityY + 80
      );

      ctx.restore();
    }

    ctx.restore();
  }
}
