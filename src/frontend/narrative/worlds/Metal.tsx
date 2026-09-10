import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';
import { InputSampler } from '../interaction/InputSampler';

interface MaterialItem {
  id: string;
  name: string;
  descriptor: string;
  detail: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  mass: number;
}

interface MetalProps {
  copy: WorldCopy;
  locale: 'vi' | 'en';
  materials: Array<{
    id: string;
    name: string;
    descriptor: string;
    detail: string;
  }>;
}

// Curated emergent syntheses for physical material pairings
const COMBINATIONS: Record<string, { vi: string; en: string }> = {
  'code-sound': {
    vi: 'THUẬT TOÁN ÂM THANH · ALGORITHMIC SONIFICATION',
    en: 'ALGORITHMIC SONIFICATION · MATHEMATICAL FREQUENCIES',
  },
  'sound-image': {
    vi: 'CỘNG HƯỞNG ĐỒNG CẢM · SYNESTHETIC RESONANCE',
    en: 'SYNESTHETIC RESONANCE · AUDIO-VISUAL HARMONY',
  },
  'type-motion': {
    vi: 'CHỮ ĐỘNG ĐIỆN ẢNH · KINETIC TYPOGRAPHY',
    en: 'KINETIC TYPOGRAPHY · MOMENTUM & LEGIBILITY',
  },
  'code-system': {
    vi: 'KIẾN TRÚC NỀN TẢNG · PURE ARCHITECTURE',
    en: 'PURE ARCHITECTURE · SCALABLE ECOSYSTEMS',
  },
  'space-sound': {
    vi: 'KHÔNG GIAN ÂM HỌC · ACOUSTIC REVERBERATION',
    en: 'ACOUSTIC REVERBERATION · SPATIAL FIELD DEPTH',
  },
  'image-motion': {
    vi: 'THỊ GIÁC ĐỘNG LỰC · DYNAMIC VISUAL KINETICS',
    en: 'DYNAMIC VISUAL KINETICS · TEMPORAL COMPOSITION',
  },
  'space-type': {
    vi: 'CẤU TRÚC KHÔNG GIAN · SPATIAL TYPOGRAPHY',
    en: 'SPATIAL TYPOGRAPHY · TENSION & GRAVITATIONAL BALANCE',
  },
};

/**
 * World 04: METAL (COMPOSE — Composition Instrument)
 * Physical Behavior:
 * - 7 Tactile Material Nodes: CODE, SOUND, IMAGE, TYPE, SYSTEM, SPACE, MOTION.
 * - Multi-body spring dynamics, magnetic attraction, and crystalline tension connections.
 * - Zero React setState in the RAF loop (Law 5 compliant).
 * - Direct DOM transform updates for 120 FPS buttery physics.
 */
export const Metal: React.FC<MetalProps> = ({ copy, locale, materials: rawMaterials }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodeElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State only updated upon actual changes to prevent React render loops
  const [activeCombination, setActiveCombination] = useState<{ name: string; desc: string } | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeComboKeyRef = useRef<string | null>(null);
  const nodesRef = useRef<MaterialItem[]>([]);
  const draggingNodeRef = useRef<MaterialItem | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    isReducedMotionRef.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Initialize node layout with responsive elliptical orbital coordinates
  const initNodes = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const cx = w * (isMobile ? 0.5 : 0.62);
    const cy = h * (isMobile ? 0.6 : 0.52);
    const rx = Math.min(w * (isMobile ? 0.38 : 0.28), 300);
    const ry = Math.min(h * (isMobile ? 0.22 : 0.26), 210);

    nodesRef.current = rawMaterials.map((m, i) => {
      const angle = (i / rawMaterials.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle) * ry;
      return {
        ...m,
        x,
        y,
        vx: 0,
        vy: 0,
        targetX: x,
        targetY: y,
        radius: isMobile ? 32 : 38,
        mass: 1.5 + (i % 3) * 0.4,
      };
    });
  }, [rawMaterials]);

  useEffect(() => {
    initNodes();
    const handleResize = () => initNodes();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [initNodes]);

  // Spring physics, collision, and laser tension lines RAF ticker
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) * 0.001, 0.05);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const dragging = draggingNodeRef.current;

      // 1. Multi-body spring physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node !== dragging) {
          // Hooke's Law Spring Force towards home orbit target
          const dx = node.targetX - node.x;
          const dy = node.targetY - node.y;
          const springK = 0.08 / node.mass;
          const damping = 0.86;

          node.vx = (node.vx + dx * springK) * damping;
          node.vy = (node.vy + dy * springK) * damping;

          node.x += node.vx;
          node.y += node.vy;
        }

        // Repulsion collision between nodes (prevents unnatural overlap)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const cdx = other.x - node.x;
          const cdy = other.y - node.y;
          const dist = Math.hypot(cdx, cdy);
          const minDist = node.radius + other.radius + 12;

          if (dist < minDist && dist > 0.01) {
            const overlap = (minDist - dist) * 0.5;
            const nx = (cdx / dist) * overlap;
            const ny = (cdy / dist) * overlap;

            if (node !== dragging) {
              node.x -= nx * 0.6;
              node.y -= ny * 0.6;
            }
            if (other !== dragging) {
              other.x += nx * 0.6;
              other.y += ny * 0.6;
            }
          }
        }
      }

      // 2. Pairwise crystalline tension links & emergent combination detection
      let detectedComboKey: string | null = null;
      let detectedComboName = '';
      let detectedComboDesc = '';

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const maxTensionDist = 220;

          if (dist < maxTensionDist) {
            const normDist = dist / maxTensionDist;
            const alpha = Math.max(0.08, (1 - normDist) * 0.85);

            // Crystalline laser connection
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(195, 220, 245, ${alpha})`;
            ctx.lineWidth = Math.max(0.75, (1 - normDist) * 3.2);
            ctx.stroke();

            // Inner harmonic laser filament
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 120) * 0.9})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }

            // Proximity synthesis trigger (< 95px)
            if (dist < 95 && !detectedComboKey) {
              const pairKey1 = `${a.id}-${b.id}`;
              const pairKey2 = `${b.id}-${a.id}`;
              const match = COMBINATIONS[pairKey1] || COMBINATIONS[pairKey2];

              detectedComboKey = pairKey1;
              detectedComboName = `${a.name} × ${b.name}`;
              detectedComboDesc = match
                ? match[locale]
                : locale === 'vi'
                ? 'CHẤT LIỆU LAI TẠO ĐỘC BẢN'
                : 'SYNTHESIZED HYBRID RESONANCE';
            }
          }
        }
      }

      // Update React state ONLY if the detected combination changed (Zero-render RAF)
      if (detectedComboKey !== activeComboKeyRef.current) {
        activeComboKeyRef.current = detectedComboKey;
        if (detectedComboKey) {
          setActiveCombination({ name: detectedComboName, desc: detectedComboDesc });
        } else {
          setActiveCombination(null);
        }
      }

      // 3. Update DOM transforms directly without triggering React re-renders
      for (let i = 0; i < nodes.length; i++) {
        const el = nodeElementsRef.current[i];
        if (el) {
          const node = nodes[i];
          el.style.transform = `translate3d(${node.x.toFixed(1)}px, ${node.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [locale]);

  // Pointer drag interactions with setPointerCapture
  const handlePointerDown = (node: MaterialItem, e: React.PointerEvent<HTMLDivElement>) => {
    draggingNodeRef.current = node;
    setSelectedNodeId(node.id);
    dragOffsetRef.current = {
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const dragging = draggingNodeRef.current;
    if (dragging) {
      dragging.x = e.clientX - dragOffsetRef.current.x;
      dragging.y = e.clientY - dragOffsetRef.current.y;
      // Also update target position to introduce user repositioning
      dragging.targetX = dragging.x;
      dragging.targetY = dragging.y;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }
    draggingNodeRef.current = null;
  };

  // Keyboard navigation for material nodes
  const handleKeyDown = (node: MaterialItem, e: React.KeyboardEvent) => {
    const step = 25;
    if (e.key === 'ArrowRight') {
      node.targetX += step;
      setSelectedNodeId(node.id);
    } else if (e.key === 'ArrowLeft') {
      node.targetX -= step;
      setSelectedNodeId(node.id);
    } else if (e.key === 'ArrowUp') {
      node.targetY -= step;
      setSelectedNodeId(node.id);
    } else if (e.key === 'ArrowDown') {
      node.targetY += step;
      setSelectedNodeId(node.id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      setSelectedNodeId(node.id);
    }
  };

  return (
    <div
      id="metal"
      ref={containerRef}
      className="world-stage world-stage--metal"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="World 04: Metal"
    >
      <canvas ref={canvasRef} className="world-canvas metal-canvas" aria-hidden="true" />
      <div className="world-vignette metal-vignette" aria-hidden="true" />

      <div className="world-content-layer metal-layout">
        <div className="world-editorial-header" aria-hidden="true">
          <span className="world-index-num">04 / METAL</span>
          <span className="world-verb-badge">COMPOSE · KHÍ CỤ SÁNG TẠO</span>
        </div>

        {/* Narrative Context */}
        <div className="world-typography-block metal-typography">
          <p className="world-kicker-text">{copy.kicker}</p>
          <h2 className="world-display-heading">{copy.title}</h2>
          {copy.subtitle && <p className="world-subtitle-text">{copy.subtitle}</p>}
          <div className="world-statement-box">
            <p className="world-statement-text">{copy.statement}</p>
            {copy.secondary && <p className="world-secondary-text">{copy.secondary}</p>}
          </div>
        </div>

        {/* Dynamic Synthesis Monitor */}
        {activeCombination && (
          <div className="metal-combo-badge" role="status" aria-live="polite">
            <span className="combo-symbol" aria-hidden="true">
              ⚡
            </span>
            <div className="combo-content">
              <span className="combo-text">{activeCombination.name}</span>
              <span className="combo-desc">{activeCombination.desc}</span>
            </div>
          </div>
        )}

        {/* Floating Interactive Material Nodes */}
        <div className="metal-nodes-container" role="group" aria-label="Interactive Material Nodes">
          {rawMaterials.map((mat, i) => {
            const isSelected = selectedNodeId === mat.id;
            return (
              <div
                key={mat.id}
                ref={(el) => {
                  nodeElementsRef.current[i] = el;
                }}
                className={`metal-material-node ${isSelected ? 'is-selected' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`${mat.name}: ${mat.descriptor}. ${mat.detail}`}
                onPointerDown={(e) => handlePointerDown(nodesRef.current[i], e)}
                onKeyDown={(e) => handleKeyDown(nodesRef.current[i], e)}
                onFocus={() => setSelectedNodeId(mat.id)}
              >
                <div className="node-crystal" aria-hidden="true" />
                <span className="node-title">{mat.name}</span>
                <span className="node-descriptor">{mat.descriptor}</span>
              </div>
            );
          })}
        </div>

        <div className="world-tactile-indicator" aria-hidden="true">
          <span className="tactile-pulse" />
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Kéo các khối chất liệu lại gần nhau để kích hoạt cấu trúc cộng hưởng mới'
              : 'Drag material nodes together to compose emergent resonance structures'}
          </span>
        </div>
      </div>
    </div>
  );
};
