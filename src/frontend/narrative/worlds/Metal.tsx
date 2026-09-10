import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { WorldCopy } from '../../content/narrativeCopy';

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

export const Metal: React.FC<MetalProps> = ({ copy, locale, materials: rawMaterials }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCombination, setActiveCombination] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodesRef = useRef<MaterialItem[]>([]);
  const draggingNodeRef = useRef<MaterialItem | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize material node positions in orbital composition space
  const initNodes = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w * 0.5;
    const cy = h * 0.52;
    const rx = Math.min(w * 0.32, 280);
    const ry = Math.min(h * 0.28, 200);

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
      };
    });
  }, [rawMaterials]);

  useEffect(() => {
    initNodes();
    const handleResize = () => initNodes();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initNodes]);

  // Spring physics & laser connection lines render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const dragging = draggingNodeRef.current;

      // Update node physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node !== dragging) {
          const dx = node.targetX - node.x;
          const dy = node.targetY - node.y;
          node.vx = node.vx * 0.85 + dx * 0.05;
          node.vy = node.vy * 0.85 + dy * 0.05;
          node.x += node.vx;
          node.y += node.vy;
        }
      }

      // Check pairwise proximity to draw dynamic tension connections
      let foundCombo: string | null = null;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          if (dist < 180) {
            const alpha = Math.max(0.1, 1 - dist / 180);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200, 220, 240, ${alpha * 0.75})`;
            ctx.lineWidth = Math.max(1, (1 - dist / 180) * 3);
            ctx.stroke();

            // Active combination synthesis
            if (dist < 90) {
              foundCombo = `${a.name} × ${b.name}`;
            }
          }
        }
      }

      setActiveCombination(foundCombo);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePointerDown = (node: MaterialItem, e: React.PointerEvent) => {
    e.stopPropagation();
    draggingNodeRef.current = node;
    setSelectedNode(node.id);
    dragOffsetRef.current = {
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingNodeRef.current) {
      draggingNodeRef.current.x = e.clientX - dragOffsetRef.current.x;
      draggingNodeRef.current.y = e.clientY - dragOffsetRef.current.y;
      draggingNodeRef.current.targetX = draggingNodeRef.current.x;
      draggingNodeRef.current.targetY = draggingNodeRef.current.y;
    }
  };

  const handlePointerUp = () => {
    draggingNodeRef.current = null;
  };

  return (
    <div
      id="metal"
      ref={containerRef}
      className="world-stage world-stage--metal"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
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
          <div className="metal-combo-badge" aria-live="polite">
            <span className="combo-symbol">⚡</span>
            <span className="combo-text">{activeCombination}</span>
            <span className="combo-desc">
              {locale === 'vi' ? 'CỘNG HƯỞNG CHẤT LIỆU MỚI' : 'MATERIAL RESONANCE ACTIVE'}
            </span>
          </div>
        )}

        {/* Floating Interactive Material Nodes */}
        <div className="metal-nodes-container" aria-hidden="true">
          {nodesRef.current.map((node) => {
            const isSelected = selectedNode === node.id;
            return (
              <div
                key={node.id}
                className={`metal-material-node ${isSelected ? 'is-selected' : ''}`}
                style={{
                  transform: `translate3d(${node.x}px, ${node.y}px, 0px) translate(-50%, -50%)`,
                }}
                onPointerDown={(e) => handlePointerDown(node, e)}
              >
                <div className="node-crystal" />
                <span className="node-title">{node.name}</span>
                <span className="node-descriptor">{node.descriptor}</span>
              </div>
            );
          })}
        </div>

        <div className="world-tactile-indicator" aria-hidden="true">
          <span className="tactile-caption">
            {locale === 'vi'
              ? 'Kéo các nút chất liệu lại gần nhau để kiến tạo hành vi cộng hưởng mới'
              : 'Drag material nodes together to compose emergent resonance'}
          </span>
        </div>
      </div>
    </div>
  );
};
