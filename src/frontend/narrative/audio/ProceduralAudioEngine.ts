/**
 * PROCEDURAL WEB AUDIO ENGINE
 * Zero MP3 downloads. Continuous procedural synthesizers synchronized to narrative progress.
 * Autoplay-safe, user mute toggle, and smooth gain ramps.
 */

export class ProceduralAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private masterGain: GainNode | null = null;
  private rumbleGain: GainNode | null = null;
  private fluidGain: GainNode | null = null;
  private windGain: GainNode | null = null;

  private rumbleOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.setupSynthesizers();
      this.isInitialized = true;
    } catch {
      // AudioContext unavailable / user gesture blocked
    }
  }

  private setupSynthesizers() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Subterranean Rumble (Volcano / Heat)
    this.rumbleOsc = this.ctx.createOscillator();
    this.rumbleOsc.type = 'triangle';
    this.rumbleOsc.frequency.setValueAtTime(42, this.ctx.currentTime);

    this.rumbleGain = this.ctx.createGain();
    this.rumbleGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.rumbleOsc.connect(this.rumbleGain);
    this.rumbleGain.connect(this.masterGain);
    this.rumbleOsc.start();

    // 2. White/Pink Noise Generator (Fluid / Wind)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Fluid Filter & Gain
    const fluidFilter = this.ctx.createBiquadFilter();
    fluidFilter.type = 'bandpass';
    fluidFilter.frequency.setValueAtTime(480, this.ctx.currentTime);
    fluidFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    this.fluidGain = this.ctx.createGain();
    this.fluidGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.noiseNode.connect(fluidFilter);
    fluidFilter.connect(this.fluidGain);
    this.fluidGain.connect(this.masterGain);

    // Wind Filter & Gain
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.noiseNode.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    this.noiseNode.start();
  }

  public update(progress: number, velocity: number) {
    if (!this.ctx || !this.isInitialized || this.isMuted) return;

    const now = this.ctx.currentTime;
    const activity = Math.min(1.0, Math.abs(velocity) * 8.0);

    // 1. Rumble Gain (Peak at Volcano: 0.18 -> 0.38)
    if (this.rumbleGain) {
      let targetRumble = 0;
      if (progress >= 0.12 && progress <= 0.42) {
        targetRumble = Math.sin(((progress - 0.12) / 0.30) * Math.PI) * (0.35 + activity * 0.3);
      }
      this.rumbleGain.gain.setTargetAtTime(targetRumble, now, 0.1);
    }

    // 2. Fluid Gain (Peak at Waterfall: 0.40 -> 0.65)
    if (this.fluidGain) {
      let targetFluid = 0;
      if (progress >= 0.38 && progress <= 0.68) {
        targetFluid = Math.sin(((progress - 0.38) / 0.30) * Math.PI) * (0.28 + activity * 0.4);
      }
      this.fluidGain.gain.setTargetAtTime(targetFluid, now, 0.1);
    }

    // 3. Wind Gain (Peak at Forest & Storm: 0.68 -> 0.94)
    if (this.windGain) {
      let targetWind = 0;
      if (progress >= 0.68 && progress <= 0.94) {
        targetWind = Math.sin(((progress - 0.68) / 0.26) * Math.PI) * (0.22 + activity * 0.45);
      }
      this.windGain.gain.setTargetAtTime(targetWind, now, 0.1);
    }
  }

  public playTactileClick() {
    this.init();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // AudioContext interrupted
    }
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.28, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}
