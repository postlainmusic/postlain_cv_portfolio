/**
 * PerformanceGovernor
 * Implements Law 7: Adaptive Performance Governor.
 * Continuously monitors frame intervals and adapts quality levels
 * (DPR clamping, particle budgets, shader passes) before frame drops impact user experience.
 */

export type QualityTier = 'high' | 'medium' | 'low';

export interface PerformanceMetrics {
  fps: number;
  frameTimeMs: number;
  qualityTier: QualityTier;
  recommendedDpr: number;
}

export class PerformanceGovernor {
  private static instance: PerformanceGovernor | null = null;
  private qualityTier: QualityTier = 'high';
  private frameCount = 0;
  private lastTime = performance.now();
  private fpsBuffer: number[] = [];
  private currentFps = 60;
  private currentFrameTime = 16.6;
  private consecutiveSlowFrames = 0;
  private listeners: Set<(metrics: PerformanceMetrics) => void> = new Set();
  private isRunning = false;
  private animId = 0;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.startMonitoring();
    }
  }

  public static getInstance(): PerformanceGovernor {
    if (!PerformanceGovernor.instance) {
      PerformanceGovernor.instance = new PerformanceGovernor();
    }
    return PerformanceGovernor.instance;
  }

  private startMonitoring() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();

    const loop = (time: number) => {
      const delta = time - this.lastTime;
      this.lastTime = time;

      if (delta > 0 && delta < 200) {
        this.currentFrameTime = delta;
        const instantFps = 1000 / delta;
        this.fpsBuffer.push(instantFps);
        if (this.fpsBuffer.length > 30) {
          this.fpsBuffer.shift();
        }

        // Calculate rolling average FPS
        let sum = 0;
        for (let i = 0; i < this.fpsBuffer.length; i++) {
          sum += this.fpsBuffer[i];
        }
        this.currentFps = Math.round(sum / this.fpsBuffer.length);

        // Law 7: Adaptive Scaling Check
        if (delta > 26.0) {
          // Frame took longer than ~38 FPS
          this.consecutiveSlowFrames++;
          if (this.consecutiveSlowFrames > 45) {
            // Sustained slow performance detected -> scale down
            this.stepDownQuality();
            this.consecutiveSlowFrames = 0;
          }
        } else if (delta < 18.0) {
          if (this.consecutiveSlowFrames > 0) this.consecutiveSlowFrames--;
        }
      }

      this.frameCount++;
      // Notify listeners every 15 frames to prevent overhead
      if (this.frameCount % 15 === 0 && this.listeners.size > 0) {
        const metrics = this.getMetrics();
        this.listeners.forEach((cb) => cb(metrics));
      }

      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }

  private stepDownQuality() {
    if (this.qualityTier === 'high') {
      this.qualityTier = 'medium';
    } else if (this.qualityTier === 'medium') {
      this.qualityTier = 'low';
    }
  }

  public getQualityTier(): QualityTier {
    return this.qualityTier;
  }

  public getRecommendedDpr(): number {
    const rawDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    switch (this.qualityTier) {
      case 'high':
        return Math.min(rawDpr, 2.0); // Clamped max 2.0
      case 'medium':
        return Math.min(rawDpr, 1.5);
      case 'low':
        return 1.0;
    }
  }

  public getMetrics(): PerformanceMetrics {
    return {
      fps: this.currentFps,
      frameTimeMs: parseFloat(this.currentFrameTime.toFixed(1)),
      qualityTier: this.qualityTier,
      recommendedDpr: this.getRecommendedDpr(),
    };
  }

  public subscribe(cb: (metrics: PerformanceMetrics) => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public destroy() {
    this.isRunning = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    this.listeners.clear();
  }
}
