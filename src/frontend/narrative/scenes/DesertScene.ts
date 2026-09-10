/**
 * DESERT SCENE — THE LIVING PHOTOREALISTIC ORIGIN
 * Real 4K cinematic desert dunes with sunrise lighting, heat shimmer,
 * living sand drift, and ground-embedded mineral typography.
 */

import { ForceEvent } from '../input/InputEngine';

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  heat: number;
}

export class DesertScene {
  private img: HTMLImageElement | null = null;
  private isImageLoaded: boolean = false;
  private dustPool: DustParticle[] = [];
  private readonly maxParticles = 240;

  constructor() {
    this.loadImage();
    this.initDust();
  }

  private loadImage() {
    this.img = new Image();
    this.img.src = '/images/desert.jpg';
    this.img.onload = () => {
      this.isImageLoaded = true;
    };
  }

  private initDust() {
    this.dustPool = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.dustPool.push({
        x: Math.random(),
        y: 0.45 + Math.random() * 0.55,
        vx: 0.0002 + Math.random() * 0.0006,
        vy: (Math.random() - 0.5) * 0.0003,
        size: 1.0 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.45,
        heat: 0,
      });
    }
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;
    const heatProgress = Math.max(0, Math.min(1, (progress - 0.08) / 0.14));

    for (let i = 0; i < this.dustPool.length; i++) {
      const p = this.dustPool[i];

      // Wind & Buoyancy
      p.x += (p.vx + (heatProgress > 0 ? 0.0005 : 0.0002)) * dt;
      p.y += (p.vy - heatProgress * 0.0014) * dt;

      // Force disturbance
      for (let j = 0; j < forces.length; j++) {
        const f = forces[j];
        const dx = p.x - f.x;
        const dy = p.y - f.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.16) {
          const push = (1 - dist / 0.16) * f.speed * 0.0028;
          p.vx += (dx / (dist + 0.001)) * push;
          p.vy += (dy / (dist + 0.001)) * push;
        }
      }

      p.vx *= Math.pow(0.92, dt);
      p.vy *= Math.pow(0.92, dt);
      p.heat = heatProgress;

      if (p.x > 1.05) p.x = -0.05;
      if (p.y < 0.2 && heatProgress > 0) {
        p.y = 0.9 + Math.random() * 0.1;
        p.x = Math.random();
      } else if (p.y > 1.05) {
        p.y = 0.5;
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
    const sceneAlpha = Math.max(0, Math.min(1, 1 - (progress - 0.16) / 0.10));
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    const heatProgress = Math.max(0, Math.min(1, (progress - 0.08) / 0.14));

    // 1. Draw Real 4K Desert Photo Plate with 2.5D Dolly Scale & Parallax
    if (this.isImageLoaded && this.img) {
      const dollyScale = 1.0 + progress * 0.22; // Subtle camera forward glide
      const dw = width * dollyScale;
      const dh = height * dollyScale;
      const dx = (width - dw) * 0.5;
      const dy = (height - dh) * 0.5 - progress * height * 0.08;

      ctx.drawImage(this.img, dx, dy, dw, dh);
    } else {
      // Fallback procedural gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#e4e0d6');
      bgGrad.addColorStop(0.55, '#d0c9bb');
      bgGrad.addColorStop(1, '#a69d8d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Solar Flare & Morning Atmospheric Haze Overlay
    const sunX = width * 0.65;
    const sunY = height * 0.18;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, width * 0.6);
    if (heatProgress > 0) {
      sunGlow.addColorStop(0, 'rgba(255, 120, 50, 0.55)');
      sunGlow.addColorStop(0.5, 'rgba(255, 70, 20, 0.25)');
      sunGlow.addColorStop(1, 'rgba(20, 10, 8, 0.65)'); // Darkening ground under heat
    } else {
      sunGlow.addColorStop(0, 'rgba(255, 245, 220, 0.45)');
      sunGlow.addColorStop(0.4, 'rgba(255, 220, 160, 0.18)');
      sunGlow.addColorStop(1, 'rgba(230, 215, 190, 0)');
    }
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, width, height);

    // 3. Subterranean Incandescent Heat Cracks (Spreading as heat builds)
    if (heatProgress > 0) {
      ctx.save();
      ctx.globalAlpha = sceneAlpha * heatProgress;
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 2.5 * heatProgress;
      ctx.shadowColor = '#cf4525';
      ctx.shadowBlur = 20 * heatProgress;

      const cx = width * 0.5;
      ctx.beginPath();
      ctx.moveTo(cx, height);
      ctx.quadraticCurveTo(cx - width * 0.18, height * 0.78, cx - width * 0.08, height * 0.62);
      ctx.lineTo(cx + width * 0.15, height * 0.52);
      ctx.moveTo(cx, height * 0.85);
      ctx.lineTo(cx + width * 0.28, height * 0.70);
      ctx.stroke();
      ctx.restore();
    }

    // 4. Living Sand & Glowing Thermal Ember Particles
    for (let i = 0; i < this.dustPool.length; i++) {
      const p = this.dustPool[i];
      const px = p.x * width;
      const py = p.y * height;

      if (p.heat > 0.15) {
        ctx.fillStyle = `rgba(255, ${Math.floor(120 + Math.random() * 80)}, 30, ${p.alpha * sceneAlpha})`;
        ctx.shadowColor = '#cf4525';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = `rgba(245, 230, 195, ${p.alpha * sceneAlpha * 0.75})`;
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(px, py, p.size * (1 + p.heat * 0.8), 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Ground-Embedded Greeting (Breathes with warm sunlight)
    ctx.save();
    const greetingY = height * 0.50;
    ctx.textAlign = 'center';
    ctx.font = '300 clamp(18px, 2.4vw, 32px) "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '0.08em';

    const greetingText =
      locale === 'vi'
        ? 'Không biết không phải là khoảng trống. Đó là nơi hành trình bắt đầu.'
        : 'Uncertainty is not an empty void. It is where everything begins.';

    // Text bevel and shadow
    if (heatProgress > 0) {
      ctx.fillStyle = `rgba(255, 200, 160, ${0.9 * sceneAlpha * (1 - heatProgress * 0.5)})`;
      ctx.shadowColor = '#cf4525';
      ctx.shadowBlur = 16 * heatProgress;
    } else {
      ctx.fillStyle = `rgba(255, 250, 240, ${0.92 * sceneAlpha})`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 10;
    }
    ctx.fillText(greetingText, width * 0.5, greetingY);

    // Subtitle
    ctx.font = '500 clamp(11px, 1.2vw, 14px) "Space Grotesk", monospace';
    ctx.letterSpacing = '0.22em';
    ctx.fillStyle = heatProgress > 0 ? 'rgba(255, 160, 100, 0.85)' : 'rgba(240, 225, 195, 0.8)';
    const subText =
      locale === 'vi'
        ? 'POSTLAIN · NƠI MỌI THỨ BẮT ĐẦU TRONG TĨNH LẶNG'
        : 'POSTLAIN · WHERE EVERYTHING BEGINS IN SILENCE';
    ctx.fillText(subText, width * 0.5, greetingY + 38);

    ctx.restore();
    ctx.restore();
  }
}
