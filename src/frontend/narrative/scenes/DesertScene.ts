/**
 * DESERT SCENE & HEAT TRANSITION
 * The dry, spacious, quiet mineral landscape where uncertainty begins.
 * Features sand grain displacement and subterranean heat fracture emergence.
 */

import { ForceEvent } from '../input/InputEngine';

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  heat: number; // 0 = cool mineral dust, 1 = glowing ember
}

export class DesertScene {
  private dustPool: DustParticle[] = [];
  private readonly maxParticles = 350;

  constructor() {
    this.initDust();
  }

  private initDust() {
    this.dustPool = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.dustPool.push({
        x: Math.random(),
        y: 0.52 + Math.random() * 0.48, // Dune ground plane (lower 48%)
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0002,
        size: 1.0 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.4,
        baseAlpha: 0.2 + Math.random() * 0.4,
        heat: 0,
      });
    }
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;
    // Heat calculation: at progress > 0.10, subterranean heat begins rising
    const heatProgress = Math.max(0, Math.min(1, (progress - 0.08) / 0.14));

    for (let i = 0; i < this.dustPool.length; i++) {
      const p = this.dustPool[i];

      // Wind & Thermal Convection
      p.x += (p.vx + (heatProgress > 0 ? 0.0003 : 0.0001)) * dt;
      p.y += (p.vy - heatProgress * 0.0012) * dt; // Embers rise under heat buoyancy

      // Input force disturbance
      for (let j = 0; j < forces.length; j++) {
        const f = forces[j];
        const dx = p.x - f.x;
        const dy = p.y - f.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.18) {
          const push = (1 - dist / 0.18) * f.speed * 0.0025;
          p.vx += (dx / (dist + 0.001)) * push;
          p.vy += (dy / (dist + 0.001)) * push;
        }
      }

      // Drag
      p.vx *= Math.pow(0.92, dt);
      p.vy *= Math.pow(0.92, dt);

      // Heat state transition
      p.heat = heatProgress;

      // Wrap boundaries
      if (p.x > 1.05) p.x = -0.05;
      if (p.x < -0.05) p.x = 1.05;
      if (p.y < 0.2 && heatProgress > 0) {
        p.y = 0.95 + Math.random() * 0.05;
        p.x = Math.random();
      } else if (p.y > 1.05) {
        p.y = 0.55;
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
    // Scene envelope: Active between progress 0.00 -> 0.26
    const sceneAlpha = Math.max(0, Math.min(1, 1 - (progress - 0.16) / 0.10));
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    const horizonY = height * 0.55;
    const heatProgress = Math.max(0, Math.min(1, (progress - 0.08) / 0.14));

    // 1. Atmosphere Gradient (Pale dry mineral sky transitioning to warm ambient horizon)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    if (heatProgress > 0) {
      skyGrad.addColorStop(0, '#1c1815');
      skyGrad.addColorStop(0.7, '#2e2019');
      skyGrad.addColorStop(1, '#542618'); // Subterranean heat glow reflection
    } else {
      skyGrad.addColorStop(0, '#e4e0d6');
      skyGrad.addColorStop(0.7, '#ddd8cd');
      skyGrad.addColorStop(1, '#d0c9bb');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, horizonY);

    // 2. Desert Ground Bed (Dry mineral earth)
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    if (heatProgress > 0) {
      groundGrad.addColorStop(0, '#3a1a12');
      groundGrad.addColorStop(0.4, '#24120e');
      groundGrad.addColorStop(1, '#150a08');
    } else {
      groundGrad.addColorStop(0, '#c5bdae');
      groundGrad.addColorStop(0.3, '#b8b0a0');
      groundGrad.addColorStop(1, '#a69d8d');
    }
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY, width, height - horizonY);

    // 3. Subterranean Glowing Heat Fissures (Emerges as heatProgress rises)
    if (heatProgress > 0) {
      ctx.save();
      ctx.globalAlpha = sceneAlpha * heatProgress;
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 2.5 * heatProgress;
      ctx.shadowColor = '#cf4525';
      ctx.shadowBlur = 18 * heatProgress;

      // Branching fracture paths across the ground
      ctx.beginPath();
      const cx = width * 0.5;
      ctx.moveTo(cx, height);
      ctx.quadraticCurveTo(cx - width * 0.15, height * 0.78, cx - width * 0.08, height * 0.65);
      ctx.lineTo(cx + width * 0.12, height * 0.58);
      ctx.moveTo(cx, height * 0.85);
      ctx.lineTo(cx + width * 0.25, height * 0.72);
      ctx.lineTo(cx + width * 0.35, height * 0.62);
      ctx.stroke();
      ctx.restore();
    }

    // 4. Horizon Subtle Line
    ctx.strokeStyle = heatProgress > 0 ? 'rgba(255, 107, 53, 0.4)' : 'rgba(160, 150, 135, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(width, horizonY);
    ctx.stroke();

    // 5. Sand & Thermal Ember Particles
    for (let i = 0; i < this.dustPool.length; i++) {
      const p = this.dustPool[i];
      const px = p.x * width;
      const py = p.y * height;

      if (p.heat > 0.15) {
        // Glowing ember
        ctx.fillStyle = `rgba(255, ${Math.floor(120 + Math.random() * 80)}, 40, ${p.alpha * sceneAlpha})`;
        ctx.shadowColor = '#cf4525';
        ctx.shadowBlur = 8;
      } else {
        // Mineral sand grain
        ctx.fillStyle = `rgba(140, 130, 115, ${p.alpha * sceneAlpha})`;
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(px, py, p.size * (1 + p.heat * 0.8), 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Ground-Embedded Greeting (Mineral Incision)
    ctx.save();
    const greetingY = horizonY - height * 0.06;
    ctx.textAlign = 'center';
    ctx.font = '300 clamp(16px, 2.2vw, 24px) "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '0.08em';

    const greetingText =
      locale === 'vi'
        ? 'Không biết không phải là khoảng trống. Đó là nơi hành trình bắt đầu.'
        : 'Uncertainty is not an empty void. It is where everything begins.';

    if (heatProgress > 0) {
      ctx.fillStyle = `rgba(255, 180, 140, ${0.85 * sceneAlpha * (1 - heatProgress * 0.6)})`;
      ctx.shadowColor = '#cf4525';
      ctx.shadowBlur = 12 * heatProgress;
    } else {
      ctx.fillStyle = `rgba(40, 38, 35, ${0.65 * sceneAlpha})`;
      ctx.shadowBlur = 0;
    }

    ctx.fillText(greetingText, width * 0.5, greetingY);

    // Sub-greeting
    ctx.font = '400 clamp(11px, 1.2vw, 13px) "Space Grotesk", monospace';
    ctx.letterSpacing = '0.15em';
    ctx.fillStyle = heatProgress > 0 ? 'rgba(255, 140, 90, 0.6)' : 'rgba(100, 95, 85, 0.5)';
    const subText =
      locale === 'vi'
        ? 'POSTLAIN · KHỞI NGUYÊN TĨNH LẶNG'
        : 'POSTLAIN · THE SILENT ORIGIN';
    ctx.fillText(subText, width * 0.5, greetingY + 34);

    ctx.restore();
    ctx.restore();
  }
}
