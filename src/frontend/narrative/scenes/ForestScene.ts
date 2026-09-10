/**
 * ANCIENT FOREST SCENE & 4 CARVED CV MILESTONES
 * Vertical scroll drives 400vw horizontal tracking shot through an ancient forest.
 * 4 Monumental Trees with 100% verified CV milestones incised into weathered bark.
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
}

export class ForestScene {
  private leaves: FoliageLeaf[] = [];
  private readonly maxLeaves = 80;

  constructor() {
    this.initLeaves();
  }

  private initLeaves() {
    this.leaves = [];
    for (let i = 0; i < this.maxLeaves; i++) {
      this.leaves.push({
        x: Math.random() * 4.0, // Across 400vw
        y: Math.random(),
        vx: 0.0002 + Math.random() * 0.0006,
        vy: 0.0003 + Math.random() * 0.0005,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02,
        size: 3 + Math.random() * 6,
      });
    }
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;

    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];
      leaf.x += leaf.vx * dt;
      leaf.y += leaf.vy * dt;
      leaf.rotation += leaf.vRot * dt;

      if (leaf.y > 1.05) {
        leaf.y = -0.05;
        leaf.x = Math.random() * 4.0;
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
    // Scene Envelope: Active between progress 0.60 -> 0.88
    let sceneAlpha = 0;
    if (progress >= 0.60 && progress < 0.68) {
      sceneAlpha = (progress - 0.60) / 0.08;
    } else if (progress >= 0.68 && progress <= 0.82) {
      sceneAlpha = 1.0;
    } else if (progress > 0.82 && progress <= 0.88) {
      sceneAlpha = 1.0 - (progress - 0.82) / 0.06; // Wind storm buildup
    }
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // Horizontal Camera Coordinate: Maps progress [0.68, 0.84] to [0, 3 * width]
    const forestProgress = Math.max(0, Math.min(1, (progress - 0.68) / 0.16));
    const cameraX = forestProgress * width * 3.0;

    // 1. Atmosphere Background (Morning forest canopy & mist)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0a100d');
    bgGrad.addColorStop(0.5, '#131e17');
    bgGrad.addColorStop(1, '#1e2b20');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Parallax Layer 0: Distant Silhouette Trunks (Speed 0.25x)
    ctx.save();
    ctx.fillStyle = 'rgba(10, 16, 12, 0.7)';
    for (let i = 0; i < 12; i++) {
      const treeX = i * width * 0.35 - cameraX * 0.25;
      ctx.fillRect(treeX, 0, width * 0.08, height);
    }
    ctx.restore();

    // 3. Parallax Layer 1: Midground Trunks & God Rays (Speed 0.55x)
    ctx.save();
    ctx.fillStyle = 'rgba(20, 32, 24, 0.85)';
    for (let i = 0; i < 8; i++) {
      const treeX = i * width * 0.55 - cameraX * 0.55;
      ctx.fillRect(treeX, 0, width * 0.14, height);
    }
    ctx.restore();

    // 4. Layer 2: The 4 Primary CV Milestone Trees (Speed 1.0x)
    const milestones = AUTOBIOGRAPHY_DATA.milestones;
    const treePositions = [0.45, 1.4, 2.35, 3.3]; // Expressed in multiples of screen width

    for (let i = 0; i < milestones.length; i++) {
      const m = milestones[i];
      const treeWorldX = treePositions[i] * width;
      const screenX = treeWorldX - cameraX;

      // Render only if near viewport
      if (screenX > -width * 0.6 && screenX < width * 1.6) {
        const trunkWidth = Math.max(260, width * 0.28);
        const trunkLeft = screenX - trunkWidth * 0.5;

        // Tree Trunk Bark Geometry
        const trunkGrad = ctx.createLinearGradient(trunkLeft, 0, trunkLeft + trunkWidth, 0);
        trunkGrad.addColorStop(0, '#151b14');
        trunkGrad.addColorStop(0.15, '#262f22');
        trunkGrad.addColorStop(0.5, '#3b4736'); // Cylindrical highlight
        trunkGrad.addColorStop(0.85, '#242e20');
        trunkGrad.addColorStop(1, '#0e130d');

        ctx.fillStyle = trunkGrad;
        ctx.fillRect(trunkLeft, 0, trunkWidth, height);

        // Bark Weathered Grooves
        ctx.strokeStyle = 'rgba(10, 14, 10, 0.45)';
        ctx.lineWidth = 3;
        for (let g = 0; g < 6; g++) {
          const gx = trunkLeft + (g + 1) * (trunkWidth / 7);
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx + (g % 2 === 0 ? 8 : -8), height);
          ctx.stroke();
        }

        // 2.5D Carved Typography (Incised into bark, catching directional sunbeam)
        ctx.save();
        ctx.textAlign = 'center';

        const textCenterY = height * 0.46;

        // Year Badge
        ctx.font = '700 clamp(12px, 1.4vw, 15px) "Space Grotesk", monospace';
        ctx.letterSpacing = '0.22em';
        ctx.fillStyle = 'rgba(215, 185, 130, 0.9)';
        ctx.fillText(`[ ${m.year} · ${m.period} ]`, screenX, textCenterY - 48);

        // Company Name (Deep Incision)
        ctx.font = '700 clamp(20px, 3.0vw, 36px) "Cormorant Garamond", Georgia, serif';
        ctx.letterSpacing = '0.08em';
        // Crevice shadow
        ctx.fillStyle = '#0a0e0a';
        ctx.fillText(m.company, screenX + 1.5, textCenterY + 1.5);
        // Sunlight bevel highlight
        ctx.fillStyle = '#f0e6d2';
        ctx.shadowColor = '#cf4525';
        ctx.shadowBlur = 8;
        ctx.fillText(m.company, screenX, textCenterY);

        // Role Title
        ctx.font = '600 clamp(12px, 1.6vw, 18px) "Plus Jakarta Sans", sans-serif';
        ctx.letterSpacing = '0.12em';
        ctx.fillStyle = 'rgba(230, 215, 190, 0.85)';
        ctx.shadowBlur = 0;
        ctx.fillText(m.role.toUpperCase(), screenX, textCenterY + 36);

        // Summary Prose
        ctx.font = '400 clamp(11px, 1.2vw, 14px) "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(195, 205, 195, 0.75)';
        const summaryText = m.summary[locale];
        // Wrap text to fit trunk width
        this.wrapText(ctx, summaryText, screenX, textCenterY + 70, trunkWidth * 0.82, 20);

        ctx.restore();
      }
    }

    // 5. Drifting Foliage Leaves (Foreground Layer 3)
    ctx.fillStyle = 'rgba(180, 160, 100, 0.65)';
    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];
      const lx = leaf.x * width - cameraX * 1.35;
      const ly = leaf.y * height;

      if (lx > -50 && lx < width + 50) {
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(leaf.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size * 1.5, leaf.size * 0.7, 0, 0, Math.PI * 2);
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
