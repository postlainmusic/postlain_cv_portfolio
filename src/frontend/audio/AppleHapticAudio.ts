/**
 * PROCEDURAL WEB AUDIO SYNTHESIZER & HAPTIC ENGINE
 * Zero external MP3 dependencies. Pure Web Audio API.
 */

class AppleHapticAudioEngine {
  private ctx: AudioContext | null = null;
  private isSoundEnabled: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;

  constructor() {
    // AudioContext is initialized upon first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.isSoundEnabled = enabled;
    if (enabled) {
      this.initContext();
      this.playPowerOnSweep();
    } else {
      this.stopAmbientDrone();
    }
  }

  public getSoundEnabled(): boolean {
    return this.isSoundEnabled;
  }

  public toggleSound(): boolean {
    const newState = !this.isSoundEnabled;
    this.setSoundEnabled(newState);
    return newState;
  }

  /**
   * Tactile mechanical micro-click (Hover / Button click)
   */
  public playClick(freq = 1200, duration = 0.02) {
    if (!this.isSoundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  /**
   * Delicate acoustic chirp for tab switching / card opening
   */
  public playCardSnap() {
    if (!this.isSoundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  /**
   * Power on sweep when user enables sound
   */
  public playPowerOnSweep() {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {}
  }

  /**
   * Interactive musical chord snippet for Hidden Music preview
   */
  public playHiddenMusicPreview(onDuration = 2.5) {
    if (!this.isSoundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const freqs = [174.61, 220.0, 261.63, 329.63, 392.0]; // F major 9 ambient chord
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const startTime = this.ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.02, startTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + onDuration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + onDuration);
      });
    } catch {}
  }

  private stopAmbientDrone() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    }
  }
}

export const AppleAudio = new AppleHapticAudioEngine();
