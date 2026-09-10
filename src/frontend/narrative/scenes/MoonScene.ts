/**
 * MOON & STARS SCENE — LIVING CELESTIAL GATEWAY & INTERACTIVE CONSTELLATION NETWORK
 * Procedural Lunar Surface, Atmospheric Corona Diffraction, Resonant Hidden Music Artifact,
 * and Interactive Luminous Constellation Nodes for Ngô Phúc's Direct Contact.
 */

import { ForceEvent } from '../input/InputEngine';
import { AUTOBIOGRAPHY_DATA } from '../data/autobiographyData';

export interface InteractiveNode {
  id: 'phone' | 'email' | 'hiddenmusic' | 'identity';
  x: number;
  y: number;
  radius: number;
  label: string;
  subLabel: string;
  url?: string;
  copyValue?: string;
  isHovered: boolean;
  pulsePhase: number;
}

interface StarNode {
  x: number;
  y: number;
  baseRadius: number;
  pulsePhase: number;
  alpha: number;
}

export class MoonScene {
  private stars: StarNode[] = [];
  private readonly maxStars = 160;
  private time: number = 0;
  private pointerX: number = -1000;
  private pointerY: number = -1000;

  // Interactive Constellation Targets
  public interactiveNodes: InteractiveNode[] = [];
  public toastMessage: string | null = null;
  private toastTimer: number = 0;

  constructor() {
    this.initStars();
    this.initInteractiveNodes();
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random() * 0.9,
        baseRadius: 0.7 + Math.random() * 1.8,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.65,
      });
    }
  }

  private initInteractiveNodes() {
    this.interactiveNodes = [
      {
        id: 'identity',
        x: 0.65,
        y: 0.44,
        radius: 28,
        label: AUTOBIOGRAPHY_DATA.identity.name,
        subLabel: 'Creative Technologist · Sound Architect',
        isHovered: false,
        pulsePhase: 0,
      },
      {
        id: 'phone',
        x: 0.65,
        y: 0.58,
        radius: 22,
        label: `HOTLINE: ${AUTOBIOGRAPHY_DATA.identity.hotline}`,
        subLabel: 'Click to Copy & Connect',
        copyValue: AUTOBIOGRAPHY_DATA.identity.hotline,
        isHovered: false,
        pulsePhase: 1.2,
      },
      {
        id: 'email',
        x: 0.65,
        y: 0.68,
        radius: 22,
        label: `EMAIL: ${AUTOBIOGRAPHY_DATA.identity.email}`,
        subLabel: 'Click to Copy / Write',
        copyValue: AUTOBIOGRAPHY_DATA.identity.email,
        isHovered: false,
        pulsePhase: 2.4,
      },
      {
        id: 'hiddenmusic',
        x: 0.28,
        y: 0.54,
        radius: 46,
        label: 'HIDDEN MUSIC',
        subLabel: 'Living Sonic Artwork ↗',
        url: 'https://hiddenmusic.postlain.com',
        isHovered: false,
        pulsePhase: 3.6,
      },
    ];
  }

  public handlePointerMove(screenX: number, screenY: number, width: number, height: number) {
    this.pointerX = screenX;
    this.pointerY = screenY;

    for (let i = 0; i < this.interactiveNodes.length; i++) {
      const node = this.interactiveNodes[i];
      const nx = node.x * width;
      const ny = node.y * height;
      const dist = Math.hypot(screenX - nx, screenY - ny);
      node.isHovered = dist < node.radius + 30;
    }
  }

  public handleClick(screenX: number, screenY: number, width: number, height: number): InteractiveNode | null {
    for (let i = 0; i < this.interactiveNodes.length; i++) {
      const node = this.interactiveNodes[i];
      const nx = node.x * width;
      const ny = node.y * height;
      const dist = Math.hypot(screenX - nx, screenY - ny);

      if (dist < node.radius + 35) {
        if (node.url) {
          window.open(node.url, '_blank', 'noopener,noreferrer');
        } else if (node.copyValue) {
          navigator.clipboard.writeText(node.copyValue);
          this.toastMessage = `Copied ${node.copyValue} to clipboard!`;
          this.toastTimer = 2.8;
        }
        return node;
      }
    }
    return null;
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;
    this.time += dt * 0.016;

    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.pulsePhase += 0.035 * dt;
    }

    for (let i = 0; i < this.interactiveNodes.length; i++) {
      const n = this.interactiveNodes[i];
      n.pulsePhase += 0.04 * dt;
    }

    if (this.toastTimer > 0) {
      this.toastTimer -= dt * 0.016;
      if (this.toastTimer <= 0) {
        this.toastMessage = null;
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
    // Scene Envelope: Active between progress 0.88 -> 1.00
    const sceneAlpha = Math.max(0, Math.min(1, (progress - 0.88) / 0.06));
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // 1. Deep Midnight Nebula Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#030508');
    skyGrad.addColorStop(0.5, '#070c14');
    skyGrad.addColorStop(1, '#0c1420');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Radiant Lunar Surface & Corona (Top Right: x = 76% vw, y = 20% vh)
    const moonX = width * 0.76;
    const moonY = height * 0.20;
    const moonRadius = Math.max(34, width * 0.042);

    ctx.save();
    // Atmospheric Corona Diffraction
    const coronaGrad = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.6, moonX, moonY, moonRadius * 3.8);
    coronaGrad.addColorStop(0, 'rgba(235, 245, 255, 0.45)');
    coronaGrad.addColorStop(0.3, 'rgba(180, 215, 255, 0.18)');
    coronaGrad.addColorStop(1, 'rgba(180, 215, 255, 0)');
    ctx.fillStyle = coronaGrad;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 3.8, 0, Math.PI * 2);
    ctx.fill();

    // Crescent Moon with Surface Maria Occlusion
    ctx.fillStyle = '#f2f7fc';
    ctx.shadowColor = '#d2e6ff';
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0.22 * Math.PI, 1.78 * Math.PI, false);
    ctx.arc(moonX + moonRadius * 0.42, moonY, moonRadius * 0.86, 1.68 * Math.PI, 0.32 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Twinkling Starlight Nebula Field
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      const sx = s.x * width;
      const sy = s.y * height;
      const pulse = 0.65 + Math.sin(s.pulsePhase) * 0.35;

      // Pointer magnetic gravitational attraction
      const distToPointer = Math.hypot(sx - this.pointerX, sy - this.pointerY);
      const pull = distToPointer < 160 ? (1 - distToPointer / 160) * 8 : 0;

      ctx.beginPath();
      ctx.arc(sx + pull, sy + pull, s.baseRadius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225, 238, 255, ${s.alpha * pulse * sceneAlpha})`;
      ctx.fill();
    }

    // 4. Living Artifact: HIDDEN MUSIC Resonant Sonic Gateway (Left: x = 28% vw, y = 54% vh)
    const portal = this.interactiveNodes.find((n) => n.id === 'hiddenmusic')!;
    const portalX = portal.x * width;
    const portalY = portal.y * height;

    ctx.save();
    ctx.textAlign = 'center';

    // Concentric Audio Wave Rings (Pulsing Procedurally)
    const waveCount = 3;
    for (let w = 0; w < waveCount; w++) {
      const ringRadius = portal.radius + ((this.time * 24 + w * 22) % 65);
      const ringAlpha = Math.max(0, 1.0 - (ringRadius - portal.radius) / 65) * (portal.isHovered ? 0.75 : 0.35);
      ctx.strokeStyle = `rgba(73, 179, 252, ${ringAlpha})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(portalX, portalY, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crystalline Core Orb
    const coreGrad = ctx.createRadialGradient(portalX, portalY, 0, portalX, portalY, portal.radius);
    coreGrad.addColorStop(0, portal.isHovered ? '#ffffff' : '#e0f2fe');
    coreGrad.addColorStop(0.5, portal.isHovered ? '#60a5fa' : '#38bdf8');
    coreGrad.addColorStop(1, 'rgba(14, 165, 233, 0.1)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(portalX, portalY, portal.radius, 0, Math.PI * 2);
    ctx.fill();

    // Portal Typography
    ctx.font = '700 clamp(16px, 2.2vw, 24px) "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '0.12em';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = portal.isHovered ? 18 : 10;
    ctx.fillText(portal.label, portalX, portalY + portal.radius + 30);

    ctx.font = '400 clamp(10px, 1.1vw, 12px) "Space Grotesk", monospace';
    ctx.letterSpacing = '0.18em';
    ctx.fillStyle = portal.isHovered ? '#93c5fd' : 'rgba(186, 230, 253, 0.8)';
    ctx.shadowBlur = 0;
    ctx.fillText(portal.subLabel, portalX, portalY + portal.radius + 52);
    ctx.restore();

    // 5. Interactive Constellation Lines (Connecting Nodes to Starlight Core)
    const identityNode = this.interactiveNodes.find((n) => n.id === 'identity')!;
    const phoneNode = this.interactiveNodes.find((n) => n.id === 'phone')!;
    const emailNode = this.interactiveNodes.find((n) => n.id === 'email')!;

    const ix = identityNode.x * width;
    const iy = identityNode.y * height;
    const px = phoneNode.x * width;
    const py = phoneNode.y * height;
    const ex = emailNode.x * width;
    const ey = emailNode.y * height;

    // Constellation Vector Connections
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 6]);

    ctx.beginPath();
    ctx.moveTo(portalX + portal.radius, portalY);
    ctx.lineTo(ix, iy);
    ctx.lineTo(px, py);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // 6. Render Interactive Identity & Contact Nodes
    for (let i = 0; i < this.interactiveNodes.length; i++) {
      const node = this.interactiveNodes[i];
      if (node.id === 'hiddenmusic') continue;

      const nx = node.x * width;
      const ny = node.y * height;

      ctx.save();
      // Glowing Starburst Node Point
      const starPulse = 0.8 + Math.sin(node.pulsePhase) * 0.2;
      ctx.fillStyle = node.isHovered ? '#ff9667' : '#f0f5fa';
      ctx.shadowColor = node.isHovered ? '#ff7043' : '#68b5ff';
      ctx.shadowBlur = node.isHovered ? 20 : 8;

      ctx.beginPath();
      ctx.arc(nx, ny, (node.isHovered ? 6 : 4) * starPulse, 0, Math.PI * 2);
      ctx.fill();

      // Node Text Labels
      ctx.textAlign = 'left';
      if (node.id === 'identity') {
        ctx.font = '700 clamp(24px, 3.6vw, 44px) "Cormorant Garamond", Georgia, serif';
        ctx.letterSpacing = '0.04em';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(node.label, nx + 20, ny + 8);

        ctx.font = 'italic 400 clamp(12px, 1.3vw, 15px) "Cormorant Garamond", Georgia, serif';
        ctx.letterSpacing = '0.06em';
        ctx.fillStyle = 'rgba(215, 210, 195, 0.85)';
        ctx.fillText(AUTOBIOGRAPHY_DATA.identity.philosophy[locale], nx + 20, ny + 32);
      } else {
        ctx.font = `${node.isHovered ? '700' : '600'} clamp(12px, 1.4vw, 16px) "Space Grotesk", monospace`;
        ctx.letterSpacing = '0.12em';
        ctx.fillStyle = node.isHovered ? '#ff9667' : 'rgba(240, 245, 255, 0.95)';
        ctx.fillText(node.label, nx + 20, ny + 5);

        ctx.font = '400 clamp(10px, 1.1vw, 12px) "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = node.isHovered ? '#ffc5b1' : 'rgba(160, 180, 205, 0.7)';
        ctx.fillText(node.subLabel, nx + 20, ny + 24);
      }

      ctx.restore();
    }

    // 7. Click-To-Copy Toast Feedback Notification
    if (this.toastMessage) {
      ctx.save();
      ctx.textAlign = 'center';
      const toastY = height * 0.90;
      ctx.font = '600 clamp(12px, 1.3vw, 15px) "Space Grotesk", monospace';
      ctx.letterSpacing = '0.08em';

      const metrics = ctx.measureText(this.toastMessage);
      const boxW = metrics.width + 48;
      const boxH = 40;

      // Toast pill background
      ctx.fillStyle = 'rgba(15, 24, 38, 0.92)';
      ctx.strokeStyle = '#49b3fc';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#49b3fc';
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.roundRect(width * 0.5 - boxW * 0.5, toastY - boxH * 0.5, boxW, boxH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.fillText(this.toastMessage, width * 0.5, toastY + 5);
      ctx.restore();
    }

    ctx.restore();
  }
}
