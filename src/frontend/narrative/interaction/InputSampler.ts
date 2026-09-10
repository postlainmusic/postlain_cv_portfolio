/**
 * InputSamplerEngine
 * Coalesces high-frequency pointer and touch events into a budget-capped array of ForceEvents.
 * Implements Law 4: Input Coalescing (max 8 events per frame, merge nearby, zero GC churn).
 */

export interface ForceEvent {
  x: number; // Normalized 0..1
  y: number; // Normalized 0..1
  dx: number;
  dy: number;
  strength: number;
  radius: number;
  timestamp: number;
}

const MAX_FORCE_EVENTS = 8;
const MIN_DISTANCE_THRESHOLD = 0.005; // 0.5% of viewport

export class InputSampler {
  private static instance: InputSampler | null = null;
  private eventPool: ForceEvent[] = [];
  private activeEvents: ForceEvent[] = [];
  private pointerState = {
    x: 0.5,
    y: 0.5,
    prevX: 0.5,
    prevY: 0.5,
    vx: 0,
    vy: 0,
    isDown: false,
    lastUpdate: 0,
  };

  private constructor() {
    // Pre-allocate pool to eliminate GC allocations during frame loops
    for (let i = 0; i < MAX_FORCE_EVENTS * 2; i++) {
      this.eventPool.push({
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        strength: 0,
        radius: 0.05,
        timestamp: 0,
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('pointerdown', this.onPointerDown, { passive: true });
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('pointerup', this.onPointerUp, { passive: true });
      window.addEventListener('pointercancel', this.onPointerUp, { passive: true });
    }
  }

  public static getInstance(): InputSampler {
    if (!InputSampler.instance) {
      InputSampler.instance = new InputSampler();
    }
    return InputSampler.instance;
  }

  private onPointerDown = (e: PointerEvent) => {
    this.pointerState.isDown = true;
    this.recordEvent(e.clientX, e.clientY, 1.8, 0.06);
  };

  private onPointerMove = (e: PointerEvent) => {
    // Check for native coalesced events if available
    if (typeof (e as any).getCoalescedEvents === 'function') {
      const coalesced = (e as any).getCoalescedEvents() as PointerEvent[];
      if (coalesced.length > 0) {
        for (let i = 0; i < Math.min(coalesced.length, 4); i++) {
          const ev = coalesced[i];
          this.recordEvent(ev.clientX, ev.clientY, this.pointerState.isDown ? 1.4 : 0.8, 0.045);
        }
        return;
      }
    }

    this.recordEvent(e.clientX, e.clientY, this.pointerState.isDown ? 1.4 : 0.8, 0.045);
  };

  private onPointerUp = () => {
    this.pointerState.isDown = false;
  };

  private recordEvent(clientX: number, clientY: number, baseStrength: number, radius: number) {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const nx = Math.max(0, Math.min(1, clientX / w));
    const ny = Math.max(0, Math.min(1, clientY / h));

    const dx = nx - this.pointerState.prevX;
    const dy = ny - this.pointerState.prevY;
    const speed = Math.hypot(dx, dy);

    this.pointerState.x = nx;
    this.pointerState.y = ny;
    this.pointerState.prevX = nx;
    this.pointerState.prevY = ny;
    this.pointerState.vx = dx * 10;
    this.pointerState.vy = dy * 10;
    this.pointerState.lastUpdate = performance.now();

    // Check if we can merge with the last event in queue (spatial deduplication)
    if (this.activeEvents.length > 0) {
      const last = this.activeEvents[this.activeEvents.length - 1];
      const dist = Math.hypot(nx - last.x, ny - last.y);
      if (dist < MIN_DISTANCE_THRESHOLD) {
        last.x = (last.x + nx) * 0.5;
        last.y = (last.y + ny) * 0.5;
        last.dx += dx;
        last.dy += dy;
        last.strength = Math.min(2.5, last.strength + speed * 4);
        return;
      }
    }

    // Budget check: do not exceed MAX_FORCE_EVENTS
    if (this.activeEvents.length >= MAX_FORCE_EVENTS) {
      return;
    }

    // Acquire pooled event
    const pooled = this.eventPool.pop();
    if (pooled) {
      pooled.x = nx;
      pooled.y = ny;
      pooled.dx = dx;
      pooled.dy = dy;
      pooled.strength = Math.min(2.5, baseStrength + speed * 6);
      pooled.radius = radius;
      pooled.timestamp = this.pointerState.lastUpdate;
      this.activeEvents.push(pooled);
    }
  }

  /**
   * Flushes and returns coalesced events for the active physics step.
   * Returns events back to the pool to maintain zero allocations.
   */
  public sampleForces(): ForceEvent[] {
    const results = [...this.activeEvents];
    // Return objects to pool
    while (this.activeEvents.length > 0) {
      const ev = this.activeEvents.pop();
      if (ev) this.eventPool.push(ev);
    }
    return results;
  }

  public getPointerState() {
    return this.pointerState;
  }

  public destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', this.onPointerDown);
      window.removeEventListener('pointermove', this.onPointerMove);
      window.removeEventListener('pointerup', this.onPointerUp);
      window.removeEventListener('pointercancel', this.onPointerUp);
    }
  }
}
