/**
 * POSTLAIN EXPERIENCE RUNTIME (CENTRAL ORCHESTRATOR)
 * Single-loop RAF ticker coordinating timeline progress, input forces,
 * physics integration, scenes, and procedural audio.
 */

import gsap from 'gsap';
import { NarrativeTimeline } from './NarrativeTimeline';
import { InputEngine } from '../input/InputEngine';
import { TypographyPhysicsEngine } from '../typography/TypographyPhysicsEngine';
import { ProceduralAudioEngine } from '../audio/ProceduralAudioEngine';
import { DesertScene } from '../scenes/DesertScene';
import { VolcanoScene } from '../scenes/VolcanoScene';
import { WaterfallScene } from '../scenes/WaterfallScene';
import { ForestScene } from '../scenes/ForestScene';
import { StormScene } from '../scenes/StormScene';
import { MoonScene } from '../scenes/MoonScene';

export class ExperienceRuntime {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private timeline: NarrativeTimeline;
  private input: InputEngine;
  private physics: TypographyPhysicsEngine;
  private audio: ProceduralAudioEngine;

  private desertScene: DesertScene;
  private volcanoScene: VolcanoScene;
  private waterfallScene: WaterfallScene;
  private forestScene: ForestScene;
  private stormScene: StormScene;
  private moonScene: MoonScene;

  private locale: 'vi' | 'en' = 'vi';
  private isDestroyed: boolean = false;
  private lastTime: number = 0;
  private resizeObserver: ResizeObserver;

  constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });

    this.timeline = new NarrativeTimeline();
    this.input = new InputEngine(container, (delta) => {
      this.timeline.addScrollDelta(delta);
    });
    this.physics = new TypographyPhysicsEngine();
    this.audio = new ProceduralAudioEngine();

    this.desertScene = new DesertScene();
    this.volcanoScene = new VolcanoScene();
    this.waterfallScene = new WaterfallScene();
    this.forestScene = new ForestScene();
    this.stormScene = new StormScene();
    this.moonScene = new MoonScene();

    this.handleResize();
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);

    // Single Tick Loop via GSAP Ticker
    gsap.ticker.add(this.tick);
    gsap.ticker.lagSmoothing(0);
  }

  private handleResize = () => {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0); // DPR clamping to max 2.0
    this.canvas.width = Math.floor(rect.width * dpr);
    this.canvas.height = Math.floor(rect.height * dpr);
  };

  private tick = (time: number, deltaTime: number) => {
    if (this.isDestroyed || !this.ctx) return;

    const dt = deltaTime || 16.67;
    const forces = this.input.consumeForces();
    const { progress, velocity } = this.timeline.update(dt);

    // 1. Update Physics & Audio
    this.physics.update(forces, dt);
    this.audio.update(progress, velocity);

    // 2. Update Active Scenes
    this.desertScene.update(progress, forces, dt);
    this.volcanoScene.update(progress, forces, dt);
    this.waterfallScene.update(progress, forces, dt);
    this.forestScene.update(progress, forces, dt);
    this.stormScene.update(progress, forces, dt);
    this.moonScene.update(progress, forces, dt);

    // 3. Multi-Layer Render Composite
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    this.desertScene.render(this.ctx, w, h, progress, this.locale);
    this.volcanoScene.render(this.ctx, w, h, progress, this.locale);
    this.waterfallScene.render(this.ctx, w, h, progress, this.locale);
    this.forestScene.render(this.ctx, w, h, progress, this.locale);
    this.stormScene.render(this.ctx, w, h, progress);
    this.moonScene.render(this.ctx, w, h, progress, this.locale);
  };

  public handlePointerMove(clientX: number, clientY: number) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    const canvasX = (clientX - rect.left) * dpr;
    const canvasY = (clientY - rect.top) * dpr;
    this.moonScene.handlePointerMove(canvasX, canvasY, this.canvas.width, this.canvas.height);
  }

  public handleClick(clientX: number, clientY: number) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    const canvasX = (clientX - rect.left) * dpr;
    const canvasY = (clientY - rect.top) * dpr;
    const node = this.moonScene.handleClick(canvasX, canvasY, this.canvas.width, this.canvas.height);
    if (node) {
      this.audio.playTactileClick();
    }
  }

  public nextBeat() {
    this.timeline.nextBeat();
    this.audio.playTactileClick();
  }

  public prevBeat() {
    this.timeline.prevBeat();
    this.audio.playTactileClick();
  }

  public setBeat(index: number) {
    this.timeline.setBeat(index);
    this.audio.playTactileClick();
  }

  public getCurrentBeatIndex(): number {
    return this.timeline.getCurrentBeatIndex();
  }

  public setLocale(newLocale: 'vi' | 'en') {
    this.locale = newLocale;
    this.audio.playTactileClick();
  }

  public toggleMute(): boolean {
    return this.audio.toggleMute();
  }

  public jumpToProgress(target: number) {
    this.timeline.setProgress(target);
    this.audio.playTactileClick();
  }

  public getProgress(): number {
    return this.timeline.getProgress();
  }

  public destroy() {
    this.isDestroyed = true;
    gsap.ticker.remove(this.tick);
    this.resizeObserver.disconnect();
    this.input.destroy();
  }
}

