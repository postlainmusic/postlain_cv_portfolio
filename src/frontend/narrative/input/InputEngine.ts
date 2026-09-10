/**
 * INPUT COALESCING & FORCE ENGINE
 * Aggregates pointer, wheel, touch, and keyboard events into normalized ForceEvents
 */

export interface ForceEvent {
  x: number; // Normalized [0, 1]
  y: number; // Normalized [0, 1]
  vx: number; // Vector x velocity
  vy: number; // Vector y velocity
  speed: number;
  pressure: number;
  type: 'pointer' | 'touch' | 'scroll' | 'drag';
}

export class InputEngine {
  private container: HTMLElement;
  private pointerPos = { x: 0.5, y: 0.5 };
  private prevPointerPos = { x: 0.5, y: 0.5 };
  private isPointerDown = false;
  private touchStartY = 0;
  private touchStartX = 0;
  private queuedForces: ForceEvent[] = [];
  private onScrollCallback?: (delta: number) => void;

  constructor(container: HTMLElement, onScroll?: (delta: number) => void) {
    this.container = container;
    this.onScrollCallback = onScroll;
    this.bindEvents();
  }

  private bindEvents() {
    window.addEventListener('wheel', this.handleWheel, { passive: false });
    window.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public destroy() {
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY || e.deltaX;
    this.onScrollCallback?.(delta);

    // Queue subtle scroll force
    this.queueForce({
      x: this.pointerPos.x,
      y: this.pointerPos.y,
      vx: (e.deltaX || 0) * 0.001,
      vy: delta * 0.001,
      speed: Math.abs(delta) * 0.01,
      pressure: 0.5,
      type: 'scroll',
    });
  };

  private handlePointerDown = (e: PointerEvent) => {
    this.isPointerDown = true;
    this.updatePointerCoords(e);
    this.queueForce({
      x: this.pointerPos.x,
      y: this.pointerPos.y,
      vx: 0,
      vy: 0,
      speed: 1.5,
      pressure: e.pressure || 1.0,
      type: 'pointer',
    });
  };

  private handlePointerMove = (e: PointerEvent) => {
    this.updatePointerCoords(e);
    const dx = this.pointerPos.x - this.prevPointerPos.x;
    const dy = this.pointerPos.y - this.prevPointerPos.y;
    const speed = Math.hypot(dx, dy) * 50;

    if (speed > 0.02 || this.isPointerDown) {
      this.queueForce({
        x: this.pointerPos.x,
        y: this.pointerPos.y,
        vx: dx * 10,
        vy: dy * 10,
        speed,
        pressure: this.isPointerDown ? (e.pressure || 1.2) : 0.4,
        type: this.isPointerDown ? 'drag' : 'pointer',
      });
    }
  };

  private handlePointerUp = () => {
    this.isPointerDown = false;
  };

  private handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  };

  private handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      e.preventDefault();
      const touch = e.touches[0];
      const deltaY = this.touchStartY - touch.clientY;
      const deltaX = this.touchStartX - touch.clientX;
      this.touchStartY = touch.clientY;
      this.touchStartX = touch.clientX;

      this.onScrollCallback?.(deltaY * 2.2);

      const normX = touch.clientX / window.innerWidth;
      const normY = touch.clientY / window.innerHeight;

      this.queueForce({
        x: normX,
        y: normY,
        vx: -deltaX * 0.005,
        vy: deltaY * 0.005,
        speed: Math.hypot(deltaX, deltaY) * 0.05,
        pressure: 1.0,
        type: 'touch',
      });
    }
  };

  private handleTouchEnd = () => {
    this.isPointerDown = false;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      this.onScrollCallback?.(120);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      this.onScrollCallback?.(-120);
    }
  };

  private updatePointerCoords(e: PointerEvent) {
    const rect = this.container.getBoundingClientRect();
    this.prevPointerPos = { ...this.pointerPos };
    this.pointerPos = {
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
    };
  }

  private queueForce(force: ForceEvent) {
    // Budget limit: max 8 forces queued per frame to prevent buffer bloat
    if (this.queuedForces.length < 8) {
      this.queuedForces.push(force);
    }
  }

  public consumeForces(): ForceEvent[] {
    const forces = [...this.queuedForces];
    this.queuedForces = [];
    return forces;
  }

  public getPointer(): { x: number; y: number; isDown: boolean } {
    return {
      x: this.pointerPos.x,
      y: this.pointerPos.y,
      isDown: this.isPointerDown,
    };
  }
}
