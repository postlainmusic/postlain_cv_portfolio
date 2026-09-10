import React, { useEffect, useState } from 'react';
import { PerformanceGovernor, type PerformanceMetrics } from './PerformanceGovernor';

interface PerformanceHUDProps {
  currentWorldId: string;
}

/**
 * Dev-Only Performance HUD
 * Displays real-time 60/120 FPS metrics, frame times, quality tiers, and active world state.
 * Toggled via Shift + P or url param `?perf=true`.
 */
export const PerformanceHUD: React.FC<PerformanceHUDProps> = ({ currentWorldId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>(() =>
    PerformanceGovernor.getInstance().getMetrics()
  );

  useEffect(() => {
    // Check url param
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('perf') === 'true' || urlParams.get('debug') === 'true') {
        setIsVisible(true);
      }
    }

    // Keyboard shortcut: Shift + P
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const governor = PerformanceGovernor.getInstance();
    const unsubscribe = governor.subscribe((newMetrics) => {
      setMetrics(newMetrics);
    });
    return unsubscribe;
  }, [isVisible]);

  if (!isVisible) return null;

  const fpsColor =
    metrics.fps >= 55 ? '#4ade80' : metrics.fps >= 35 ? '#facc15' : '#f87171';

  return (
    <aside
      className="performance-hud"
      role="complementary"
      aria-label="Performance Telemetry HUD"
    >
      <div className="hud-header">
        <span className="hud-title">TELEMETRY</span>
        <span className="hud-world">STAGE: {currentWorldId.toUpperCase()}</span>
      </div>

      <div className="hud-grid">
        <div className="hud-item">
          <span className="hud-label">FPS</span>
          <span className="hud-val" style={{ color: fpsColor }}>
            {metrics.fps}
          </span>
        </div>

        <div className="hud-item">
          <span className="hud-label">TIME</span>
          <span className="hud-val">{metrics.frameTimeMs} ms</span>
        </div>

        <div className="hud-item">
          <span className="hud-label">DPR</span>
          <span className="hud-val">{metrics.recommendedDpr}x</span>
        </div>

        <div className="hud-item">
          <span className="hud-label">TIER</span>
          <span className="hud-val tier-badge">{metrics.qualityTier.toUpperCase()}</span>
        </div>
      </div>

      <div className="hud-footer">
        <span>Toggle: Shift + P</span>
      </div>
    </aside>
  );
};
