/**
 * CONTINUOUS NARRATIVE TIMELINE INTERPOLATOR
 * Normalizes user scroll into smooth [0.00, 1.00] timeline with inertia and reverse continuity.
 */

export class NarrativeTimeline {
  private targetProgress: number = 0;
  private currentProgress: number = 0;
  private velocity: number = 0;
  private readonly friction: number = 0.88;
  private readonly springStrength: number = 0.08;

  public addScrollDelta(delta: number) {
    // Delta sensitivity scaling: 1 scroll tick moves ~0.0015 of timeline
    const sensitivity = 0.00045;
    this.targetProgress = Math.max(0, Math.min(1, this.targetProgress + delta * sensitivity));
  }

  public setProgress(value: number) {
    this.targetProgress = Math.max(0, Math.min(1, value));
  }

  public update(deltaTime: number): { progress: number; velocity: number } {
    // Spring-damper integration
    const dt = Math.min(deltaTime, 33) / 16.67;
    const force = (this.targetProgress - this.currentProgress) * this.springStrength;
    this.velocity = (this.velocity + force * dt) * Math.pow(this.friction, dt);
    this.currentProgress += this.velocity * dt;

    // Clamp bounds smoothly
    if (this.currentProgress < 0) {
      this.currentProgress = 0;
      this.velocity = 0;
    } else if (this.currentProgress > 1) {
      this.currentProgress = 1;
      this.velocity = 0;
    }

    return {
      progress: this.currentProgress,
      velocity: this.velocity,
    };
  }

  public getProgress(): number {
    return this.currentProgress;
  }

  public getTargetProgress(): number {
    return this.targetProgress;
  }

  public getVelocity(): number {
    return this.velocity;
  }
}
