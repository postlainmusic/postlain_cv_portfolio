/**
 * MOON & STARS SCENE & DISCOVERED CONSTELLATION CONTACT
 * Sublime nocturnal stillness, silver crescent moon, living Hidden Music artifact,
 * and natural constellation discovery of Ngô Phúc and verified direct contact channels.
 */

import { ForceEvent } from '../input/InputEngine';
import { AUTOBIOGRAPHY_DATA } from '../data/autobiographyData';

interface StarNode {
  x: number;
  y: number;
  baseRadius: number;
  pulsePhase: number;
  alpha: number;
}

export class MoonScene {
  private stars: StarNode[] = [];
  private readonly maxStars = 140;

  constructor() {
    this.initStars();
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random() * 0.85,
        baseRadius: 0.8 + Math.random() * 1.8,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: 0.3 + Math.random() * 0.6,
      });
    }
  }

  public update(progress: number, forces: ForceEvent[], deltaTime: number) {
    const dt = Math.min(deltaTime, 33) / 16.67;

    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.pulsePhase += 0.03 * dt;
    }
  }

  public render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number,
    locale: 'vi' | 'en'
  ) {
    // Scene Envelope: Active between progress 0.90 -> 1.00
    const sceneAlpha = Math.max(0, Math.min(1, (progress - 0.90) / 0.06));
    if (sceneAlpha <= 0) return;

    ctx.save();
    ctx.globalAlpha = sceneAlpha;

    // 1. Midnight Indigo Celestial Expanse
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#040609');
    skyGrad.addColorStop(0.6, '#080d14');
    skyGrad.addColorStop(1, '#0e1622');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Radiant Silver Crescent Moon (Top Right: x = 75% vw, y = 20% vh)
    const moonX = width * 0.78;
    const moonY = height * 0.22;
    const moonRadius = Math.max(32, width * 0.045);

    ctx.save();
    // Moon Outer Glow
    const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.5, moonX, moonY, moonRadius * 3.0);
    moonGlow.addColorStop(0, 'rgba(230, 240, 255, 0.45)');
    moonGlow.addColorStop(1, 'rgba(230, 240, 255, 0)');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 3.0, 0, Math.PI * 2);
    ctx.fill();

    // Crescent Moon Shape
    ctx.fillStyle = '#f0f5fa';
    ctx.shadowColor = '#e0edff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0.2 * Math.PI, 1.8 * Math.PI, false);
    ctx.arc(moonX + moonRadius * 0.4, moonY, moonRadius * 0.85, 1.7 * Math.PI, 0.3 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Twinkling Starlight Field
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      const sx = s.x * width;
      const sy = s.y * height;
      const pulse = 0.7 + Math.sin(s.pulsePhase) * 0.3;

      ctx.beginPath();
      ctx.arc(sx, sy, s.baseRadius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225, 235, 250, ${s.alpha * pulse * sceneAlpha})`;
      ctx.fill();
    }

    // 4. Living Artifact: HIDDEN MUSIC Gateway (Left side: x = 25% vw, y = 52% vh)
    const portalX = width * 0.28;
    const portalY = height * 0.52;

    ctx.save();
    ctx.textAlign = 'center';
    // Pulsing Harmonic Resonance Ring
    const pulseRing = Math.sin(Date.now() * 0.003) * 6;
    ctx.strokeStyle = 'rgba(73, 179, 252, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(portalX, portalY - 24, 42 + pulseRing, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '700 clamp(16px, 2.2vw, 24px) "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '0.12em';
    ctx.fillStyle = '#e8f0fe';
    ctx.shadowColor = '#49b3fc';
    ctx.shadowBlur = 12;
    ctx.fillText('HIDDEN MUSIC', portalX, portalY - 18);

    ctx.font = '400 clamp(10px, 1.1vw, 12px) "Space Grotesk", monospace';
    ctx.letterSpacing = '0.18em';
    ctx.fillStyle = 'rgba(180, 210, 240, 0.8)';
    ctx.shadowBlur = 0;
    ctx.fillText('LIVING SONIC ARTWORK', portalX, portalY + 8);
    ctx.fillText('hiddenmusic.postlain.com ↗', portalX, portalY + 28);
    ctx.restore();

    // 5. Constellation Contact & Identity Resolution (Center/Right side: x = 65% vw, y = 52% vh)
    const contactX = width * 0.65;
    const contactY = height * 0.50;

    ctx.save();
    ctx.textAlign = 'left';

    // Person Name
    ctx.font = '700 clamp(24px, 3.8vw, 48px) "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '0.04em';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#cf4525';
    ctx.shadowBlur = 10;
    ctx.fillText(AUTOBIOGRAPHY_DATA.identity.name, contactX, contactY - 38);

    // Philosophy Tagline
    ctx.font = 'italic 400 clamp(12px, 1.4vw, 16px) "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '0.06em';
    ctx.fillStyle = 'rgba(215, 205, 190, 0.85)';
    ctx.shadowBlur = 0;
    ctx.fillText(AUTOBIOGRAPHY_DATA.identity.philosophy[locale], contactX, contactY - 12);

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(contactX, contactY + 2);
    ctx.lineTo(contactX + Math.min(width * 0.28, 320), contactY + 2);
    ctx.stroke();

    // Hotline
    ctx.font = '700 clamp(13px, 1.5vw, 17px) "Space Grotesk", monospace';
    ctx.letterSpacing = '0.14em';
    ctx.fillStyle = '#ff9667';
    ctx.fillText(`HOTLINE: ${AUTOBIOGRAPHY_DATA.identity.hotline}`, contactX, contactY + 28);

    // Email
    ctx.font = '400 clamp(12px, 1.4vw, 15px) "Space Grotesk", monospace';
    ctx.letterSpacing = '0.1em';
    ctx.fillStyle = 'rgba(240, 240, 240, 0.9)';
    ctx.fillText(`EMAIL: ${AUTOBIOGRAPHY_DATA.identity.email}`, contactX, contactY + 54);

    // Location
    ctx.font = '400 clamp(11px, 1.2vw, 13px) "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(160, 175, 190, 0.7)';
    ctx.fillText(AUTOBIOGRAPHY_DATA.identity.location, contactX, contactY + 80);

    ctx.restore();
    ctx.restore();
  }
}
