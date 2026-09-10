/**
 * WATERFALL SCENE & FLUID TYPOGRAPHY
 * Verified 2D Discrete Wave Grid Fluid Simulation (128x72, damping 0.965).
 * Typography is physically carried by the fluid velocity field with refractive caustics.
 */

import { ForceEvent } from '../input/InputEngine';

const SIM_COLS = 128;
const SIM_ROWS = 72;
const DAMPING = 0.965;

interface FluidGlyph {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseY: number;
  opacity: number;
}

export class WaterfallScene {
  private buf1: Float32Array = new Float32Array(SIM_COLS * SIM_ROWS);
  private buf2: Float32Array = new Float32Array(SIM_COLS * SIM_ROWS);
  private offscreenCanvas: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D | null;
  private imgData: ImageData | null = null;
  private fluidGlyphs: FluidGlyph[] = [];

  constructor() {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = SIM_COLS;
    this.offscreenCanvas.height = SIM_ROWS;
    this.offCtx = this.offscreenCanvas.getContext('2d');
    if (this.offCtx) {
      this.imgData = this.offCtx.createImageData(SIM_COLS, SIM_ROWS);
    }
    this.initFluidGlyphs();
  }

  private initFluidGlyphs() {
    this.fluidGlyphs = [
      { text: 'DÒNG CHẢY KHÁT VỌNG', x: 0.5, y: 0.35, vx: 0, vy: 0.0008, baseY: 0.35, opacity: 1 },
      { text: 'KIÊN TRÌ TÍCH TỤ TỪNG GIỌT NHỎ', x: 0.5, y: 0.48, vx: 0, vy: 0.0006, baseY: 0.48, opacity: 0.85 },
      { text: 'NHỊP ĐIỆU VẬN HÀNH & KỶ LUẬT', x: 0.5, y: 0.60, vx: 0, vy: 0.0005, baseY: 0.60, opacity: 0.75 },
    ];
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;

    // Inject force events into 2D discrete wave grid
    for (let i = 0; i < forces.length; i++) {
      const f = forces[i];
      const cx = Math.floor(Math.max(1, Math.min(SIM_COLS - 2, f.x * SIM_COLS)));
      const cy = Math.floor(Math.max(1, Math.min(SIM_ROWS - 2, f.y * SIM_ROWS)));
      const radius = 3;
      const strength = f.speed * 120 + f.pressure * 80;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (x >= 1 && x < SIM_COLS - 1 && y >= 1 && y < SIM_ROWS - 1) {
            const dist = Math.hypot(dx, dy);
            if (dist <= radius) {
              this.buf1[y * SIM_COLS + x] += (1 - dist / radius) * strength;
            }
          }
        }
      }
    }

    // Discrete Wave Equation solver step
    let b1 = this.buf1;
    const b2 = this.buf2;

    for (let y = 1; y < SIM_ROWS - 1; y++) {
      const rowOffset = y * SIM_COLS;
      for (let x = 1; x < SIM_COLS - 1; x++) {
        const idx = rowOffset + x;
        const val =
          (b1[idx - 1] + b1[idx + 1] + b1[idx - SIM_COLS] + b1[idx + SIM_COLS]) * 0.5 - b2[idx];
        b2[idx] = val * DAMPING;
      }
    }

    this.buf1 = b2;
    this.buf2 = b1;

    // Update immersed fluid typography drift
    for (let i = 0; i < this.fluidGlyphs.length; i++) {
      const g = this.fluidGlyphs[i];
      const gx = Math.floor(Math.max(1, Math.min(SIM_COLS - 2, g.x * SIM_COLS)));
      const gy = Math.floor(Math.max(1, Math.min(SIM_ROWS - 2, g.y * SIM_ROWS)));
      const waveVal = this.buf1[gy * SIM_COLS + gx] || 0;

      g.y += (g.vy + waveVal * 0.00002) * dt;
      if (g.y > 0.85) {
        g.y = 0.25;
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
    // Scene Envelope: Active between progress 0.36 -> 0.68
    let sceneAlpha = 0;
    if (progress >= 0.36 && progress < 0.46) {
      sceneAlpha = (progress - 0.36) / 0.10;
    } else if (progress >= 0.46 && progress <= 0.58) {
      sceneAlpha = 1.0;
    } else if (progress > 0.58 && progress <= 0.68) {
      sceneAlpha = 1.0 - (progress - 0.58) / 0.10; // Parting into forest
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // 1. Deep Mineral Fluid Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0c1218');
    bgGrad.addColorStop(0.4, '#101c26');
    bgGrad.addColorStop(1, '#182b3a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Render 2D Wave Grid caustics to offscreen buffer
    if (this.imgData && this.offCtx) {
      const data = this.imgData.data;
      const b = this.buf1;

      for (let y = 1; y < SIM_ROWS - 1; y++) {
        const rowOffset = y * SIM_COLS;
        for (let x = 1; x < SIM_COLS - 1; x++) {
          const idx = rowOffset + x;
          const pIdx = idx * 4;
          const dx = b[idx + 1] - b[idx - 1];
          const dy = b[idx + SIM_COLS] - b[idx - SIM_COLS];
          const intensity = Math.max(-128, Math.min(128, (dx + dy) * 1.8));

          data[pIdx] = Math.min(255, Math.max(0, 30 + intensity * 0.7)); // R
          data[pIdx + 1] = Math.min(255, Math.max(0, 65 + intensity * 1.1)); // G
          data[pIdx + 2] = Math.min(255, Math.max(0, 95 + intensity * 1.4)); // B
          data[pIdx + 3] = Math.min(255, Math.max(0, Math.abs(intensity) * 2.0 + 35)); // A
        }
      }

      this.offCtx.putImageData(this.imgData, 0, 0);
      ctx.drawImage(this.offscreenCanvas, 0, 0, width, height);
    }

    // 3. Immersed Fluid Typography (Carried by Waterfall current)
    ctx.save();
    ctx.textAlign = 'center';

    const phrases =
      locale === 'vi'
        ? [
            'DÒNG CHẢY KHÁT VỌNG',
            'KIÊN TRÌ TÍCH TỤ TỪNG GIỌT NHỎ',
            'NHỊP ĐIỆU VẬN HÀNH & KỶ LUẬT',
          ]
        : [
            'FLOW OF ASPIRATION',
            'PERSISTENT ACCUMULATION OF EVERY DROP',
            'OPERATIONAL RHYTHM & DISCIPLINE',
          ];

    for (let i = 0; i < this.fluidGlyphs.length; i++) {
      const g = this.fluidGlyphs[i];
      const text = phrases[i] || g.text;
      const gx = g.x * width;
      const gy = g.y * height;

      ctx.font =
        i === 0
          ? '600 clamp(20px, 3.4vw, 42px) "Cormorant Garamond", Georgia, serif'
          : '400 clamp(12px, 1.8vw, 18px) "Space Grotesk", monospace';
      ctx.letterSpacing = i === 0 ? '0.12em' : '0.2em';

      ctx.fillStyle = `rgba(220, 238, 250, ${g.opacity * sceneAlpha * 0.9})`;
      ctx.shadowColor = '#49B3FC';
      ctx.shadowBlur = 14;

      ctx.fillText(text, gx, gy);
    }

    ctx.restore();
    ctx.restore();
  }
}
