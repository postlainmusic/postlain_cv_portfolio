/**
 * Web Audio API Synthesizer for Awwwards-style Atmospheric Soundscape
 * Only initializes and plays sound when explicitly activated by user.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;

  // Initialize only on user action
  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(enabled: boolean) {
    this.isMuted = !enabled;
    if (enabled) {
      this.initContext();
      this.startAmbient();
      this.playBeep(587.33, 0.12, 'sine'); // D5 confirmation blip
    } else {
      this.stopAmbient();
    }
  }

  public playClick(freq = 659.25) { // E5 micro click
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // safe fallback
    }
  }

  public playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(330, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // safe fallback
    }
  }

  private playBeep(freq: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  private startAmbient() {
    if (!this.ctx) return;
    this.stopAmbient();

    try {
      // Master ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 2.5); // smooth fade in

      // Low pass filter with subtle modulation
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(480, this.ctx.currentTime);

      // Low frequency oscillator for organic breathing effect
      this.lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime); // ~5.5s breathing cycle
      lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      // Atmospheric chord: A minor 9 (A1, E2, B2, C3)
      const freqs = [55.0, 82.41, 123.47, 130.81];

      this.oscs = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);
        // Slight detune for lush thickness
        osc.detune.setValueAtTime((i - 1.5) * 4.2, this.ctx!.currentTime);
        osc.connect(this.filter!);
        osc.start();
        return osc;
      });

      this.filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
    } catch {
      // Audio fallback
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        setTimeout(() => {
          this.oscs.forEach((o) => {
            try { o.stop(); o.disconnect(); } catch { /* ignore */ }
          });
          this.oscs = [];
          if (this.lfo) {
            try { this.lfo.stop(); this.lfo.disconnect(); } catch { /* ignore */ }
            this.lfo = null;
          }
        }, 900);
      } catch {
        this.oscs = [];
      }
    }
  }
}

export const soundEngine = new SoundEngine();
