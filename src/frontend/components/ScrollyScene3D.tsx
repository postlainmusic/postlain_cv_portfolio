import React, { useEffect, useRef } from 'react';

interface ScrollyScene3DProps {
  className?: string;
}

export const ScrollyScene3D: React.FC<ScrollyScene3DProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isMobile = false;

    // Detect mobile device
    const checkMobile = () => {
      isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    };
    checkMobile();

    // Resize handling with DPR capping to prevent GPU thermal throttling
    const handleResize = () => {
      checkMobile();
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Interaction state with physics lerping
    const target = {
      rotX: 0.35,
      rotY: 0,
      scrollProgress: 0,
      pointerX: 0,
      pointerY: 0,
    };

    const current = {
      rotX: 0.35,
      rotY: 0,
      scrollProgress: 0,
      pointerX: 0,
      pointerY: 0,
    };

    // Pointer events (Desktop mouse & Mobile touch)
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      target.pointerX = (clientX / width - 0.5) * 2;
      target.pointerY = (clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Scroll listener for scrollytelling camera sync
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Generate 3D Particle Cloud
    const particleCount = isMobile ? 48 : 110;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
    }> = [];

    const palette = [
      'rgba(0, 242, 254, 0.75)',   // Neon Cyan
      'rgba(168, 85, 247, 0.75)',  // Electric Purple
      'rgba(245, 158, 11, 0.7)',   // Amber Gold
      'rgba(255, 255, 255, 0.85)', // Starlight White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 600,
        size: Math.random() * 2.2 + 0.8,
        color: palette[Math.floor(Math.random() * palette.length)],
        speed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    // Concentric Ring Nodes for Procedural 3D Gyroscope
    const ringPointCount = isMobile ? 36 : 64;
    const rings = [
      { radius: 155, tiltX: 0.45, tiltZ: 0.1, speedY: 0.008, color: 'rgba(0, 242, 254, 0.45)' },
      { radius: 120, tiltX: -0.5, tiltZ: 0.35, speedY: -0.012, color: 'rgba(168, 85, 247, 0.45)' },
      { radius: 85, tiltX: 0.8, tiltZ: -0.25, speedY: 0.016, color: 'rgba(245, 158, 11, 0.5)' },
    ];

    let angleGlobal = 0;
    let lastTime = performance.now();

    // Render loop
    const render = (time: number) => {
      // Throttle delta for smooth consistent animation
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      angleGlobal += delta * 0.65;

      // Lerp physics (0.05 for buttery smooth inertia)
      current.pointerX += (target.pointerX - current.pointerX) * 0.06;
      current.pointerY += (target.pointerY - current.pointerY) * 0.06;
      current.scrollProgress += (target.scrollProgress - current.scrollProgress) * 0.08;

      current.rotY = angleGlobal * 0.4 + current.pointerX * 0.8 + current.scrollProgress * Math.PI * 2.5;
      current.rotX = 0.25 + current.pointerY * 0.5 + Math.sin(current.scrollProgress * Math.PI) * 0.5;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 380;

      // 3D projection math helper
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const cosY = Math.cos(current.rotY);
        const sinY = Math.sin(current.rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X axis
        const cosX = Math.cos(current.rotX);
        const sinX = Math.sin(current.rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective division
        const distance = fov + z2 + 350;
        if (distance <= 1) return null;
        const scale = fov / distance;

        return {
          sx: cx + x1 * scale,
          sy: cy + y2 * scale,
          scale,
          z: z2,
        };
      };

      // 1. Draw 3D Concentric Orbital Rings
      rings.forEach((ring, rIdx) => {
        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= ringPointCount; i++) {
          const theta = (i / ringPointCount) * Math.PI * 2;
          const rx0 = Math.cos(theta) * ring.radius;
          const rz0 = Math.sin(theta) * ring.radius;
          const ry0 = Math.sin(theta * 3 + angleGlobal * (rIdx + 1)) * 12; // wave modulation

          // Local ring tilt
          const ry1 = ry0 * Math.cos(ring.tiltX) - rz0 * Math.sin(ring.tiltX);
          const rz1 = rz0 * Math.cos(ring.tiltX) + ry0 * Math.sin(ring.tiltX);

          const rx2 = rx0 * Math.cos(ring.tiltZ) - ry1 * Math.sin(ring.tiltZ);
          const ry2 = ry1 * Math.cos(ring.tiltZ) + rx0 * Math.sin(ring.tiltZ);

          const p = project(rx2, ry2, rz1);
          if (p) {
            if (!started) {
              ctx.moveTo(p.sx, p.sy);
              started = true;
            } else {
              ctx.lineTo(p.sx, p.sy);
            }
          }
        }

        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Highlight nodes on the ring
        if (!isMobile || rIdx === 0) {
          for (let i = 0; i < 4; i++) {
            const nodeTheta = ((i * (ringPointCount / 4) + Math.floor(angleGlobal * 10)) % ringPointCount) / ringPointCount * Math.PI * 2;
            const rx0 = Math.cos(nodeTheta) * ring.radius;
            const rz0 = Math.sin(nodeTheta) * ring.radius;
            const ry0 = 0;

            const ry1 = ry0 * Math.cos(ring.tiltX) - rz0 * Math.sin(ring.tiltX);
            const rz1 = rz0 * Math.cos(ring.tiltX) + ry0 * Math.sin(ring.tiltX);
            const rx2 = rx0 * Math.cos(ring.tiltZ) - ry1 * Math.sin(ring.tiltZ);
            const ry2 = ry1 * Math.cos(ring.tiltZ) + rx0 * Math.sin(ring.tiltZ);

            const p = project(rx2, ry2, rz1);
            if (p) {
              ctx.fillStyle = ring.color;
              ctx.beginPath();
              ctx.arc(p.sx, p.sy, 2.5 * p.scale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });

      // 2. Draw 3D Floating Particle Field
      particles.forEach((pt) => {
        pt.z += Math.sin(angleGlobal + pt.x) * 0.4;
        const p = project(pt.x, pt.y, pt.z);
        if (p && p.sx > 0 && p.sx < width && p.sy > 0 && p.sy < height) {
          const alpha = Math.min(Math.max((p.scale - 0.2) * 1.5, 0.1), 0.9);
          ctx.fillStyle = pt.color.replace(/[\d\.]+\)$/, `${alpha})`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, pt.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Central Pulsing Ambient Core
      const coreP = project(0, 0, 0);
      if (coreP) {
        const coreGradient = ctx.createRadialGradient(
          coreP.sx,
          coreP.sy,
          2,
          coreP.sx,
          coreP.sy,
          isMobile ? 90 : 160
        );
        coreGradient.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
        coreGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.18)');
        coreGradient.addColorStop(1, 'rgba(3, 3, 5, 0)');

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(coreP.sx, coreP.sy, isMobile ? 90 : 160, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={`pointer-events-none relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};
