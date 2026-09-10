/**
 * NARRATIVE TIMELINE — STORY-BEAT SNAPPING ENGINE
 * Step-by-Step Storytelling Choreography ("Không cuộn ào ào").
 * Pinned scrub locking across 10 sequential narrative beats.
 */

export interface StoryBeat {
  index: number;
  progress: number;
  id: string;
  title: { vi: string; en: string };
}

export class NarrativeTimeline {
  public static readonly STORY_BEATS: StoryBeat[] = [
    { index: 0, progress: 0.00, id: 'desert_greeting', title: { vi: 'Thức Giác Giữa Sa Mạc', en: 'Awakening in the Desert' } },
    { index: 1, progress: 0.14, id: 'magma_friction', title: { vi: 'Địa Tầng Sục Sôi', en: 'Subsurface Friction' } },
    { index: 2, progress: 0.28, id: 'volcano_birth', title: { vi: 'Ngọn Lửa Ngô Phúc · Postlain', en: 'Volcanic Forge of Identity' } },
    { index: 3, progress: 0.44, id: 'waterfall_flow', title: { vi: 'Dòng Chảy Khát Vọng', en: 'Aspiration Waterfall' } },
    { index: 4, progress: 0.58, id: 'tree_viva', title: { vi: 'Cây 01: Viva Star Coffee (2019)', en: 'Tree 01: Viva Star Coffee (2019)' } },
    { index: 5, progress: 0.66, id: 'tree_sb', title: { vi: 'Cây 02: SB Studio (2023)', en: 'Tree 02: SB Studio (2023)' } },
    { index: 6, progress: 0.74, id: 'tree_phui', title: { vi: 'Cây 03: Phủi Steak (2024)', en: 'Tree 03: Phủi Steak (2024)' } },
    { index: 7, progress: 0.82, id: 'tree_aldo', title: { vi: 'Cây 04: ALDO GO! (2025)', en: 'Tree 04: ALDO GO! (2025)' } },
    { index: 8, progress: 0.90, id: 'storm_rift', title: { vi: 'Cơn Bão Xé Toang Mây', en: 'Storm Cloud Rift' } },
    { index: 9, progress: 1.00, id: 'moon_contact', title: { vi: 'Mặt Trăng & Ngân Hà Liên Hệ', en: 'Moon, Stars & Contact' } },
  ];

  private currentBeatIndex: number = 0;
  private currentProgress: number = 0;
  private targetProgress: number = 0;
  private velocity: number = 0;

  private gestureAccumulator: number = 0;
  private readonly gestureThreshold: number = 42; // Minimum threshold to step forward/backward
  private gestureCooldown: number = 0; // Cooldown in ms to prevent accidental hyper-skipping

  // Spring physics parameters for buttery smooth snapping
  private readonly springStiffness: number = 0.09;
  private readonly springDamping: number = 0.82;

  constructor() {
    this.targetProgress = NarrativeTimeline.STORY_BEATS[0].progress;
    this.currentProgress = this.targetProgress;
  }

  public addScrollDelta(delta: number) {
    if (this.gestureCooldown > 0) return;

    this.gestureAccumulator += delta;

    if (this.gestureAccumulator > this.gestureThreshold) {
      this.nextBeat();
      this.gestureAccumulator = 0;
      this.gestureCooldown = 280; // 280ms cooldown between steps
    } else if (this.gestureAccumulator < -this.gestureThreshold) {
      this.prevBeat();
      this.gestureAccumulator = 0;
      this.gestureCooldown = 280;
    }
  }

  public nextBeat(): boolean {
    if (this.currentBeatIndex < NarrativeTimeline.STORY_BEATS.length - 1) {
      this.setBeat(this.currentBeatIndex + 1);
      return true;
    }
    return false;
  }

  public prevBeat(): boolean {
    if (this.currentBeatIndex > 0) {
      this.setBeat(this.currentBeatIndex - 1);
      return true;
    }
    return false;
  }

  public setBeat(index: number) {
    const clampedIndex = Math.max(0, Math.min(NarrativeTimeline.STORY_BEATS.length - 1, index));
    this.currentBeatIndex = clampedIndex;
    this.targetProgress = NarrativeTimeline.STORY_BEATS[clampedIndex].progress;
  }

  public setProgress(value: number) {
    const clamped = Math.max(0, Math.min(1, value));
    this.targetProgress = clamped;
    // Find closest beat index
    let closestIndex = 0;
    let minDiff = 999;
    for (let i = 0; i < NarrativeTimeline.STORY_BEATS.length; i++) {
      const diff = Math.abs(NarrativeTimeline.STORY_BEATS[i].progress - clamped);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    this.currentBeatIndex = closestIndex;
  }

  public update(deltaTime: number): { progress: number; velocity: number; beatIndex: number } {
    const dt = Math.min(deltaTime, 33) / 16.67;

    if (this.gestureCooldown > 0) {
      this.gestureCooldown -= deltaTime;
    }

    // Spring towards target progress
    const displacement = this.targetProgress - this.currentProgress;
    const springForce = displacement * this.springStiffness;

    this.velocity = (this.velocity + springForce * dt) * Math.pow(this.springDamping, dt);
    this.currentProgress += this.velocity * dt;

    // Settle when practically stopped
    if (Math.abs(this.velocity) < 0.00005 && Math.abs(displacement) < 0.0001) {
      this.currentProgress = this.targetProgress;
      this.velocity = 0;
    }

    return {
      progress: this.currentProgress,
      velocity: this.velocity,
      beatIndex: this.currentBeatIndex,
    };
  }

  public getProgress(): number {
    return this.currentProgress;
  }

  public getTargetProgress(): number {
    return this.targetProgress;
  }

  public getCurrentBeatIndex(): number {
    return this.currentBeatIndex;
  }

  public getCurrentBeat(): StoryBeat {
    return NarrativeTimeline.STORY_BEATS[this.currentBeatIndex];
  }

  public getVelocity(): number {
    return this.velocity;
  }
}
