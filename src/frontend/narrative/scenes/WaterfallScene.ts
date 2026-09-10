/**
 * WATERFALL SCENE — THE LIVING PHOTOREALISTIC ASPIRATION FLOW
 * Real 4K mountain waterfall canyon combined with verified 2D discrete wave simulation.
 * Typography is physically carried downstream by the fluid velocity field.
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
  private img: HTMLImageElement | null = null;
  private isImageLoaded: boolean = false;
  private buf1: Float32Array = new Float32Array(SIM_COLS * SIM_ROWS);
  private buf2: Float32Array = new Float32Array(SIM_COLS * SIM_ROWS);
  private offscreenCanvas: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D | null;
  private imgData: ImageData | null = null;
  private fluidGlyphs: FluidGlyph[] = [];

  constructor() {
    this.loadImage();
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = SIM_COLS;
    this.offscreenCanvas.height = SIM_ROWS;
    this.offCtx = this.offscreenCanvas.getContext('2d');
    if (this.offCtx) {
      this.imgData = this.offCtx.createImageData(SIM_COLS, SIM_ROWS);
    }
    this.initFluidGlyphs();
  }

  private loadImage() {
    this.img = new Image();
    this.img.src = '/images/waterfall.jpg';
    this.img.onload = () => {
      this.isImageLoaded = true;
    };
  }

  private initFluidGlyphs() {
    this.fluidGlyphs = [
      { text: 'DÒNG CHẢY KHÁT VỌNG', x: 0.5, y: 0.35, vx: 0, vy: 0.0009, baseY: 0.35, opacity: 1 },
      { text: 'KIÊN TRÌ TÍCH TỤ TỪNG GIỌT NHỎ', x: 0.5, y: 0.48, vx: 0, vy: 0.0007, baseY: 0.48, opacity: 0.88 },
      { text: 'NHỊP ĐIỆU VẬN HÀNH & KỶ LUẬT', x: 0.5, y: 0.60, vx: 0, vy: 0.0006, baseY: 0.60, opacity: 0.78 },
    ];
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;

    // Force injection into wave grid
    for (let i = 0; i < forces.length; i++) {
      const f = forces[i];
      const cx = Math.floor(Math.max(1, Math.min(SIM_COLS - 2, f.x * SIM_COLS)));
      const cy = Math.floor(Math.max(1, Math.min(SIM_ROWS - 2, f.y * SIM_ROWS)));
      const radius = 3;
      const strength = f.speed * 140 + f.pressure * 90;

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

    // 2D Wave step
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

    // Fluid typography drift
    for (let i = 0; i < this.fluidGlyphs.length; i++) {
      const g = this.fluidGlyphs[i];
      const gx = Math.floor(Math.max(1, Math.min(SIM_COLS - 2, g.x * SIM_COLS)));
      const gy = Math.floor(Math.max(1, Math.min(SIM_ROWS - 2, g.y * SIM_ROWS)));
      const waveVal = this.buf1[gy * SIM_COLS + gx] || 0;

      g.y += (g.vy + waveVal * 0.000025) * dt;
      if (g.y > 0.88) {
        g.y = 0.22;
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
    if (progress >= 0.36 && progress < 0.46) {
      sceneAlpha = (progress - 0.36) / 0.10;
    } else if (progress >= 0.46 && progress <= 0.58) {
      sceneAlpha = 1.0;
    } else if (progress > 0.58 && progress <= 0.68) {
      sceneAlpha = 1.0 - (progress - 0.58) / 0.10;
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // 1. Draw Real 4K Waterfall Canyon Photo Plate with Downward Plunge Parallax
    if (this.isImageLoaded && this.img) {
      const plungeScale = 1.0 + (progress - 0.36) * 0.25;
      const dw = width * plungeScale;
      const dh = height * plungeScale;
      const dx = (width - dw) * 0.5;
      const dy = (height - dh) * 0.5 - (progress - 0.36) * height * 0.15; // Downward tracking

      ctx.drawImage(this.img, dx, dy, dw, dh);
    } else {
      ctx.fillStyle = '#0e1822';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Wave Grid Fluid Caustics Overlay
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

          data[pIdx] = Math.min(255, Math.max(0, 40 + intensity * 0.8));
          data[pIdx + 1] = Math.min(255, Math.max(0, 80 + intensity * 1.2));
          data[pIdx + 2] = Math.min(255, Math.max(0, 120 + intensity * 1.5));
          data[pIdx + 3] = Math.min(255, Math.max(0, Math.abs(intensity) * 1.8 + 25));
        }
      }

      this.offCtx.putImageData(this.imgData, 0, 0);
      ctx.save();
      ctx.globalAlpha = 0.55 * sceneAlpha;
      ctx.drawImage(this.offscreenCanvas, 0, 0, width, height);
      ctx.restore();
    }

    // 3. Immersed Fluid Typography (Flowing with Water Torrent)
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
          ? '600 clamp(24px, 4.0vw, 52px) "Cormorant Garamond", Georgia, serif'
          : '500 clamp(12px, 1.8vw, 20px) "Space Grotesk", monospace';
      ctx.letterSpacing = i === 0 ? '0.12em' : '0.24em';

      ctx.fillStyle = `rgba(240, 250, 255, ${g.opacity * sceneAlpha * 0.95})`;
      ctx.shadowColor = '#49b3fc';
      ctx.shadowBlur = 18;

      ctx.fillText(text, gx, gy);
    }

    ctx.restore();
    ctx.restore();
  }
}
