/**
 * ANCIENT FOREST SCENE & 4 CARVED CV MILESTONES
 * Procedural Hyper-Detailed FBM Bark Textures, Volumetric Sunbeam God Rays,
 * Cinematic Camera Tracking Dolly, and 2.5D Incised Golden-Embossed Inscriptions.
 */

import { ForceEvent } from '../input/InputEngine';
import { AUTOBIOGRAPHY_DATA } from '../data/autobiographyData';

interface FoliageLeaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  color: string;
}

export class ForestScene {
  private leaves: FoliageLeaf[] = [];
  private readonly maxLeaves = 90;
  private barkTextureCanvas: HTMLCanvasElement | null = null;
  private time: number = 0;

  constructor() {
    this.initLeaves();
    this.generateBarkTexture();
  }

  private initLeaves() {
    this.leaves = [];
    const colors = ['rgba(145, 175, 115, 0.75)', 'rgba(180, 160, 95, 0.7)', 'rgba(95, 135, 80, 0.8)', 'rgba(210, 185, 120, 0.65)'];
    for (let i = 0; i < this.maxLeaves; i++) {
      this.leaves.push({
        x: Math.random() * 5.0, // Across 500vw horizontal tracking span
        y: Math.random(),
        vx: 0.00015 + Math.random() * 0.00045,
        vy: 0.00025 + Math.random() * 0.00045,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.025,
        size: 3.5 + Math.random() * 6.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  /**
   * Generates a high-fidelity procedural FBM weathered woodgrain bark texture
   */
  private generateBarkTexture() {
    const width = 512;
    const height = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Multi-octave pseudo-FBM noise algorithm for vertical wood fiber crevices
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = x / width;
        const ny = y / height;

        // Long vertical striations stretched 8x vertically
        const v1 = Math.sin(nx * 48.0 + Math.sin(ny * 12.0) * 4.0);
        const v2 = Math.sin(nx * 110.0 + ny * 6.0);
        const v3 = Math.cos(nx * 220.0 + Math.sin(ny * 24.0) * 6.0);
        
        // Deep fissure grooves
        const groove = Math.pow(Math.abs(Math.sin(nx * 18.0 + Math.sin(ny * 8.0) * 2.0)), 3.0);
        
        const barkNoise = (v1 * 0.45 + v2 * 0.35 + v3 * 0.20) * 0.5 + 0.5;
        const finalTone = Math.max(0.1, Math.min(1.0, barkNoise * 0.7 + (1.0 - groove) * 0.4));

        // Organic redwood bark color spectrum: deep walnut umber to lichen moss
        const r = Math.floor((38 + finalTone * 45) * (0.8 + 0.2 * Math.sin(ny * 4.0)));
        const g = Math.floor((48 + finalTone * 48) * (0.85 + 0.15 * Math.sin(nx * 6.0)));
        const b = Math.floor((34 + finalTone * 32));

        const index = (y * width + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    this.barkTextureCanvas = canvas;
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;
    this.time += dt * 0.016;

    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];
      leaf.x += leaf.vx * dt;
      leaf.y += leaf.vy * dt;
      leaf.rotation += leaf.vRot * dt;

      if (leaf.y > 1.05) {
        leaf.y = -0.05;
        leaf.x = Math.random() * 5.0;
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
    // Scene Envelope: Active between progress 0.50 -> 0.88
    let sceneAlpha = 0;
    if (progress >= 0.50 && progress < 0.56) {
      sceneAlpha = (progress - 0.50) / 0.06;
    } else if (progress >= 0.56 && progress <= 0.84) {
      sceneAlpha = 1.0;
    } else if (progress > 0.84 && progress <= 0.88) {
      sceneAlpha = 1.0 - (progress - 0.84) / 0.04; // Wind storm buildup
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // Horizontal Camera Coordinate: Maps progress [0.56, 0.84] across the 4 milestones
    const forestProgress = Math.max(0, Math.min(1, (progress - 0.56) / 0.28));
    const totalTrackingSpan = width * 3.6;
    const cameraX = forestProgress * totalTrackingSpan;

    // 1. Atmosphere Background (Morning redwood canopy, emerald haze & deep mist)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#060d09');
    bgGrad.addColorStop(0.35, '#0d1812');
    bgGrad.addColorStop(0.7, '#14241a');
    bgGrad.addColorStop(1, '#1b2c21');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Parallax Layer 0: Distant Misty Silhouette Trunks (Speed 0.25x)
    ctx.save();
    ctx.fillStyle = 'rgba(10, 20, 14, 0.6)';
    for (let i = 0; i < 14; i++) {
      const treeX = i * width * 0.32 - cameraX * 0.25;
      const tw = width * 0.07;
      ctx.fillRect(treeX, 0, tw, height);
    }
    ctx.restore();

    // 3. Parallax Layer 1: Midground Trunks (Speed 0.55x)
    ctx.save();
    ctx.fillStyle = 'rgba(18, 32, 22, 0.78)';
    for (let i = 0; i < 9; i++) {
      const treeX = i * width * 0.52 - cameraX * 0.55;
      const tw = width * 0.12;
      ctx.fillRect(treeX, 0, tw, height);
    }
    ctx.restore();

    // 4. Primary Layer: The 4 Monumental CV Milestone Trees (Speed 1.0x)
    const milestones = AUTOBIOGRAPHY_DATA.milestones;
    // Tree world positions corresponding precisely to beats 4, 5, 6, 7
    const treeWorldPositions = [0.12 * totalTrackingSpan + width * 0.45, 0.38 * totalTrackingSpan + width * 0.45, 0.64 * totalTrackingSpan + width * 0.45, 0.90 * totalTrackingSpan + width * 0.45];

    for (let i = 0; i < milestones.length; i++) {
      const m = milestones[i];
      const treeWorldX = treeWorldPositions[i];
      const screenX = treeWorldX - cameraX;

      // Render only when within visible screen margin
      if (screenX > -width * 0.5 && screenX < width * 1.5) {
        const trunkWidth = Math.max(300, width * 0.32);
        const trunkLeft = screenX - trunkWidth * 0.5;

        // Draw Bark Texture with FBM pattern
        ctx.save();
        if (this.barkTextureCanvas) {
          ctx.drawImage(this.barkTextureCanvas, trunkLeft, 0, trunkWidth, height);
        }

        // Cylindrical 3D Shading Overlay (Light from top-left)
        const trunkShade = ctx.createLinearGradient(trunkLeft, 0, trunkLeft + trunkWidth, 0);
        trunkShade.addColorStop(0, 'rgba(4, 7, 5, 0.92)');
        trunkShade.addColorStop(0.18, 'rgba(15, 24, 17, 0.45)');
        trunkShade.addColorStop(0.5, 'rgba(48, 64, 45, 0.15)'); // Amber wood highlight
        trunkShade.addColorStop(0.82, 'rgba(12, 18, 13, 0.55)');
        trunkShade.addColorStop(1, 'rgba(3, 5, 4, 0.95)');
        ctx.fillStyle = trunkShade;
        ctx.fillRect(trunkLeft, 0, trunkWidth, height);

        // Volumetric Sunbeam Focus (Highlights the active tree)
        const distToCenter = Math.abs(screenX - width * 0.5);
        const focusFactor = Math.max(0, 1 - distToCenter / (width * 0.45));

        if (focusFactor > 0.05) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          const beamGrad = ctx.createLinearGradient(screenX - trunkWidth * 0.6, 0, screenX + trunkWidth * 0.6, height);
          beamGrad.addColorStop(0, `rgba(255, 230, 170, ${0.35 * focusFactor})`);
          beamGrad.addColorStop(0.5, `rgba(220, 195, 130, ${0.22 * focusFactor})`);
          beamGrad.addColorStop(1, `rgba(140, 180, 120, ${0.05 * focusFactor})`);
          ctx.fillStyle = beamGrad;
          ctx.fillRect(trunkLeft - 40, 0, trunkWidth + 80, height);
          ctx.restore();
        }

        // 2.5D Carved Typography (Deeply Incised & Golden Sunbeam Highlighted)
        ctx.save();
        ctx.textAlign = 'center';
        const textCenterY = height * 0.45;

        // Year & Period Badge
        ctx.font = '700 clamp(12px, 1.3vw, 15px) "Space Grotesk", monospace';
        ctx.letterSpacing = '0.24em';
        ctx.fillStyle = `rgba(225, 195, 140, ${0.75 + 0.25 * focusFactor})`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = 4;
        ctx.fillText(`[ ${m.year} · ${m.period} ]`, screenX, textCenterY - 60);

        // Company Name (Monumental Incision)
        ctx.font = '700 clamp(24px, 3.2vw, 42px) "Cormorant Garamond", Georgia, serif';
        ctx.letterSpacing = '0.08em';

        // Deep Crevice Occlusion (Chiseled Groove Shadow)
        ctx.fillStyle = 'rgba(4, 8, 5, 0.95)';
        ctx.fillText(m.company, screenX + 2.5, textCenterY - 14 + 2.5);

        // Golden Sunbeam Catchlight Bevel
        ctx.fillStyle = '#f6edd9';
        ctx.shadowColor = focusFactor > 0.3 ? '#d88632' : 'transparent';
        ctx.shadowBlur = focusFactor > 0.3 ? 12 : 0;
        ctx.fillText(m.company, screenX, textCenterY - 14);

        // Role Title
        ctx.shadowBlur = 0;
        ctx.font = '600 clamp(12px, 1.5vw, 17px) "Plus Jakarta Sans", sans-serif';
        ctx.letterSpacing = '0.14em';
        ctx.fillStyle = 'rgba(235, 220, 195, 0.92)';
        ctx.fillText(m.role.toUpperCase(), screenX, textCenterY + 28);

        // Summary Prose (Incised Body Text)
        ctx.font = '400 clamp(11px, 1.15vw, 14px) "Plus Jakarta Sans", sans-serif';
        ctx.letterSpacing = '0.04em';
        ctx.fillStyle = 'rgba(205, 218, 205, 0.85)';
        const summaryText = m.summary[locale];
        this.wrapText(ctx, summaryText, screenX, textCenterY + 68, trunkWidth * 0.84, 22);

        // Key Responsibility Bullets
        if (m.responsibilities && m.responsibilities[locale]) {
          ctx.font = '400 clamp(10px, 1.0vw, 12px) "Space Grotesk", monospace';
          ctx.fillStyle = 'rgba(175, 195, 175, 0.7)';
          let bulletY = textCenterY + 140;
          for (let h = 0; h < Math.min(2, m.responsibilities[locale].length); h++) {
            this.wrapText(ctx, `· ${m.responsibilities[locale][h]}`, screenX, bulletY, trunkWidth * 0.80, 18);
            bulletY += 32;
          }
        }

        ctx.restore();
        ctx.restore();
      }
    }

    // 5. Drifting Foliage Leaves (Foreground Layer 3)
    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];
      const lx = leaf.x * width - cameraX * 1.35;
      const ly = leaf.y * height;

      if (lx > -50 && lx < width + 50) {
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(leaf.rotation + Math.sin(this.time + i) * 0.2);
        ctx.fillStyle = leaf.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size * 1.6, leaf.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    ctx.restore();
  }

  private wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
  }
}

