/**
 * POSTLAIN CYBER-ACOUSTIC SOUND ENGINE (Web Audio API)
 * Built specifically for electronic music production & interactive sound design.
 * Features:
 * - 16-Step Procedural Sequencer (Kick, Snare, Hi-hat, Bassline, Arp Lead)
 * - 2 Sound Modes: "CYBER_SYNTH" (124 BPM Synthwave) & "LOFI_CHILL" (84 BPM Downtempo)
 * - Interactive Soundboard One-Shots (Kick, Snare, Hihat, Laser, Sub Drop)
 * - Real-time AnalyserNode for audio-reactive visualizers
 * - Zero external mp3 dependencies: 100% synthesized in real-time.
 */

export type TrackMode = 'cyber' | 'lofi';

class PostlainSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;

  // Sequencer state
  private timerId: number | null = null;
  private currentStep: number = 0;
  private trackMode: TrackMode = 'cyber';
  private bpm: number = 124;

  // Musical sequences (Notes in Hz)
  // Cyber: A minor driving arpeggio (Am, F, C, G)
  private readonly cyberScale = [
    220.00, // A3
    261.63, // C4
    329.63, // E4
    440.00, // A4
    523.25, // C5
    659.25, // E5
    587.33, // D5
    392.00, // G4
  ];

  // Lofi: Jazzy F#m9 / Dmaj7 pentatonic scale
  private readonly lofiScale = [
    185.00, // F#3
    220.00, // A3
    277.18, // C#4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    554.37, // C#5
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.8);

      // Analyser for UI visualizers
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Stereo delay effect bus
      this.delayNode = this.ctx.createDelay();
      this.delayNode.delayTime.setValueAtTime(0.24, this.ctx.currentTime);
      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.setValueAtTime(0.35, this.ctx.currentTime);

      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(enabled: boolean) {
    this.isMuted = !enabled;
    if (enabled) {
      this.initContext();
      this.startSequencer();
      this.playOneShot('laser');
    } else {
      this.stopSequencer();
    }
  }

  public setTrackMode(mode: TrackMode) {
    this.trackMode = mode;
    this.bpm = mode === 'cyber' ? 124 : 84;
    if (!this.isMuted) {
      this.stopSequencer();
      this.startSequencer();
      this.playOneShot('hihat');
    }
  }

  public getTrackMode(): TrackMode {
    return this.trackMode;
  }

  public getBpm(): number {
    return this.bpm;
  }

  public isSoundActive(): boolean {
    return !this.isMuted;
  }

  // Frequency data for audio visualizers
  public getVisualizerData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16).fill(0);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  // Start the 16-step rhythmic groove
  private startSequencer() {
    if (this.timerId !== null) return;
    this.currentStep = 0;

    const stepIntervalMs = (60 / this.bpm / 4) * 1000; // 16th note interval

    this.timerId = window.setInterval(() => {
      this.tickStep();
      this.currentStep = (this.currentStep + 1) % 16;
    }, stepIntervalMs);
  }

  private stopSequencer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
    }
  }

  // 16th note groove tick
  private tickStep() {
    if (!this.ctx || this.isMuted) return;

    const step = this.currentStep;
    const isCyber = this.trackMode === 'cyber';

    // 1. Kick Drum Pattern
    if (isCyber) {
      // 4-on-the-floor Synthwave Kick (steps 0, 4, 8, 12) + syncopated 14
      if (step === 0 || step === 4 || step === 8 || step === 12 || step === 14) {
        this.synthKick(step === 14 ? 0.6 : 0.9);
      }
    } else {
      // Chillhop Boom-bap Kick (steps 0, 6, 10)
      if (step === 0 || step === 6 || step === 10) {
        this.synthKick(0.75);
      }
    }

    // 2. Snare / Clap Pattern
    if (isCyber) {
      // Snare on 4 and 12
      if (step === 4 || step === 12) {
        this.synthSnare(0.75);
      }
    } else {
      // Lazy backbeat snare on 4 and 12 with subtle ghost note on 15
      if (step === 4 || step === 12) {
        this.synthSnare(0.65);
      } else if (step === 15) {
        this.synthSnare(0.25);
      }
    }

    // 3. Hi-Hat Pattern (every 2 steps or 16th groove)
    if (step % 2 === 0 || (isCyber && step % 4 === 2)) {
      this.synthHiHat(step % 4 === 2 ? 0.5 : 0.25);
    }

    // 4. Bassline Pattern
    if (isCyber) {
      // Driving 16th rolling bass
      if (step % 2 === 0) {
        const bassFreq = step < 8 ? 55.0 : 43.65; // A1 -> F1
        this.synthBass(bassFreq, 0.12);
      }
    } else {
      // Deep sub-bass drop on 0 and 8
      if (step === 0) {
        this.synthBass(46.25, 0.45); // F#1
      } else if (step === 8) {
        this.synthBass(36.71, 0.45); // D1
      }
    }

    // 5. Melodic Arp Lead / Chime Pattern
    const scale = isCyber ? this.cyberScale : this.lofiScale;
    if (isCyber) {
      // Hypnotic rolling arpeggio
      const noteIdx = (step * 3) % scale.length;
      this.synthArp(scale[noteIdx], 0.14, 'sawtooth');
    } else {
      // Sparsely sprinkled warm bell chords on accents
      if (step === 0 || step === 3 || step === 7 || step === 11) {
        const noteIdx = (step + 2) % scale.length;
        this.synthArp(scale[noteIdx], 0.35, 'triangle');
      }
    }
  }

  // --- SYNTHESIZED SOUND MODULES ---

  // 1. Punchy 808 Sub-Kick
  private synthKick(velocity = 1.0) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startTime = this.ctx.currentTime;
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(45, startTime + 0.08);

    gain.gain.setValueAtTime(0.35 * velocity, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.3);
  }

  // 2. Synthesized Snare / White Noise Burst
  private synthSnare(velocity = 1.0) {
    if (!this.ctx || !this.masterGain) return;
    const startTime = this.ctx.currentTime;

    // Noise buffer generator
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22 * velocity, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(startTime);
    noise.stop(startTime + 0.18);
  }

  // 3. Crisp Hi-Hat
  private synthHiHat(velocity = 0.5) {
    if (!this.ctx || !this.masterGain) return;
    const startTime = this.ctx.currentTime;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.05);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.09 * velocity, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.045);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(startTime);
    noise.stop(startTime + 0.05);
  }

  // 4. Resonant Synth Bassline
  private synthBass(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const startTime = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, startTime);
    filter.frequency.exponentialRampToValueAtTime(160, startTime + duration);
    filter.Q.setValueAtTime(4.5, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  // 5. Arp Lead with Delay bus
  private synthArp(freq: number, duration: number, type: OscillatorType = 'sawtooth') {
    if (!this.ctx || !this.masterGain || !this.delayNode) return;
    const startTime = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.8, startTime);
    filter.Q.setValueAtTime(2.0, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    gain.connect(this.delayNode); // send to echo delay

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // --- INTERACTIVE ONE-SHOTS & SOUNDBOARD ---
  public playOneShot(type: 'kick' | 'snare' | 'hihat' | 'laser' | 'subdrop') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    if (type === 'kick') {
      this.synthKick(1.2);
    } else if (type === 'snare') {
      this.synthSnare(1.1);
    } else if (type === 'hihat') {
      this.synthHiHat(1.0);
    } else if (type === 'laser') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'subdrop') {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.65);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.75);
    }
  }

  public playClick(freq = 659.25) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }

  public playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new PostlainSoundEngine();
