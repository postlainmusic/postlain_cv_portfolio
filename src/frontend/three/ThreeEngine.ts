/**
 * THREE.JS CENTRAL SOTY ENGINE — POSTLAIN
 * Master Orchestrator: Dynamic Frustum Fitting, GPU Shader Warm-Up,
 * Camera Spline Navigation, Zero-Allocation Render Loop, and Audio Sync.
 */

import * as THREE from 'three';
import gsap from 'gsap';
import { NarrativeTimeline } from '../narrative/runtime/NarrativeTimeline';
import { ProceduralAudioEngine } from '../narrative/audio/ProceduralAudioEngine';
import { Desert3DWorld } from './worlds/Desert3DWorld';
import { Volcano3DWorld } from './worlds/Volcano3DWorld';
import { Waterfall3DWorld } from './worlds/Waterfall3DWorld';
import { Forest3DWorld } from './worlds/Forest3DWorld';
import { Storm3DWorld } from './worlds/Storm3DWorld';
import { Moon3DWorld, ConstellationTarget } from './worlds/Moon3DWorld';

export class ThreeEngine {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  public timeline: NarrativeTimeline;
  public audio: ProceduralAudioEngine;

  // 6 Continuous 3D Worlds
  public desertWorld: Desert3DWorld;
  public volcanoWorld: Volcano3DWorld;
  public waterfallWorld: Waterfall3DWorld;
  public forestWorld: Forest3DWorld;
  public stormWorld: Storm3DWorld;
  public moonWorld: Moon3DWorld;

  private sunLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private magmaLight: THREE.PointLight;

  private raycaster: THREE.Raycaster;
  private mouseVec: THREE.Vector2;
  private isDestroyed: boolean = false;
  private resizeObserver: ResizeObserver;

  // Hovered target
  public hoveredTarget: ConstellationTarget | null = null;
  public onBeatChange?: (beatIndex: number) => void;

  constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
    this.canvas = canvas;
    this.timeline = new NarrativeTimeline();
    this.audio = new ProceduralAudioEngine();
    this.raycaster = new THREE.Raycaster();
    this.mouseVec = new THREE.Vector2(-10, -10);

    // 1. Scene & Camera with Dynamic Vertical FOV
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x030508);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    this.camera.position.set(0, 0, 8);

    // 2. High-Performance WebGL Renderer with Rock-Solid Headless & Multi-Platform Support
    this.canvas.style.backgroundColor = '#030508';
    
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    const contextAttributes: WebGLContextAttributes = {
      alpha: false,
      depth: true,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
    };

    try {
      gl = this.canvas.getContext('webgl2', contextAttributes);
    } catch (_) {}

    if (!gl) {
      try {
        gl = this.canvas.getContext('webgl', contextAttributes) ||
             (this.canvas.getContext('experimental-webgl', contextAttributes) as WebGLRenderingContext);
      } catch (_) {}
    }

    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        context: gl || undefined,
        powerPreference: 'default',
        antialias: false,
        alpha: false,
        stencil: false,
        depth: true,
        failIfMajorPerformanceCaveat: false,
      });
    } catch (err) {
      console.warn('Initializing WebGLRenderer with depth fallback:', err);
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: false,
        alpha: false,
        stencil: false,
        depth: false,
        failIfMajorPerformanceCaveat: false,
      });
    }

    this.renderer.setClearColor(0x030508, 1.0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.handleResize(container);

    // 3. Cinematic Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xfef08a, 2.2);
    this.sunLight.position.set(10, 20, 15);
    this.scene.add(this.sunLight);

    this.magmaLight = new THREE.PointLight(0xff5500, 0, 25);
    this.magmaLight.position.set(0, -1.0, 0);
    this.scene.add(this.magmaLight);

    // 4. Instantiate 6 Procedural Worlds
    this.desertWorld = new Desert3DWorld();
    this.volcanoWorld = new Volcano3DWorld();
    this.waterfallWorld = new Waterfall3DWorld();
    this.forestWorld = new Forest3DWorld();
    this.stormWorld = new Storm3DWorld();
    this.moonWorld = new Moon3DWorld();

    this.scene.add(this.desertWorld.group);
    this.scene.add(this.volcanoWorld.group);
    this.scene.add(this.waterfallWorld.group);
    this.scene.add(this.forestWorld.group);
    this.scene.add(this.stormWorld.group);
    this.scene.add(this.moonWorld.group);

    // 5. Responsive Resize Observer
    this.resizeObserver = new ResizeObserver(() => this.handleResize(container));
    this.resizeObserver.observe(container);

    // 6. Single Ticker via GSAP Ticker
    gsap.ticker.add(this.tick);
    gsap.ticker.lagSmoothing(0);
  }

  /**
   * GPU Shader Pre-Compilation Warm-Up (Executed during Preloader)
   */
  public async warmUpShaders(): Promise<void> {
    return new Promise((resolve) => {
      // Force GPU driver to compile all shader programs into VRAM
      this.renderer.compile(this.scene, this.camera);
      // Execute 1 single render pass
      this.renderer.render(this.scene, this.camera);
      resolve();
    });
  }

  private handleResize = (container: HTMLElement) => {
    if (!this.canvas || this.isDestroyed) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const aspect = width / height;

    // SOTY Dynamic Frustum fitting: widen FOV on mobile portrait to fit 3D space
    if (aspect < 1.0) {
      this.camera.fov = 2 * Math.atan(Math.tan((45 * Math.PI) / 360) / aspect) * (180 / Math.PI);
    } else {
      this.camera.fov = 45;
    }
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    // DPR Clamping: max 1.5 on mobile to prevent overheating, 2.0 on desktop
    const isMobile = width < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
  };

  private tick = (time: number, deltaTime: number) => {
    if (this.isDestroyed) return;

    const dt = deltaTime || 16.67;
    const { progress, velocity, beatIndex } = this.timeline.update(dt);

    if (this.onBeatChange) {
      this.onBeatChange(beatIndex);
    }

    // 1. Update Audio Harmonics
    this.audio.update(progress, velocity);

    // 2. Camera Spline Navigation (Smooth 3D trajectory across the 6 worlds)
    this.updateCameraPath(progress, time);

    // 3. Update Active 3D Worlds
    this.desertWorld.update(progress, time);
    this.volcanoWorld.update(progress, time);
    this.waterfallWorld.update(progress, time);
    this.forestWorld.update(progress, time);
    this.stormWorld.update(progress, time);
    this.moonWorld.update(progress, time);

    // Dynamic light modulation
    if (progress >= 0.14 && progress <= 0.44) {
      this.magmaLight.intensity = (1.0 - Math.abs(progress - 0.28) / 0.16) * 4.5;
    } else {
      this.magmaLight.intensity = 0;
    }

    // 4. Raycasting on Moon Constellations
    if (progress >= 0.88) {
      this.raycaster.setFromCamera(this.mouseVec, this.camera);
      const meshes = this.moonWorld.constellationTargets.map((t) => t.mesh);
      const intersects = this.raycaster.intersectObjects(meshes, false);
      if (intersects.length > 0) {
        this.hoveredTarget = this.moonWorld.handleIntersect(intersects[0].object);
      } else {
        this.hoveredTarget = null;
      }
    } else {
      this.hoveredTarget = null;
    }

    // 5. Render Scene
    this.renderer.render(this.scene, this.camera);
  };

  private updateCameraPath(progress: number, time: number) {
    if (progress < 0.20) {
      // 1. Desert
      const p = progress / 0.20;
      this.camera.position.set(Math.sin(time * 0.2) * 0.2, 0.2 - p * 0.5, 8.0 - p * 1.0);
      this.camera.lookAt(0, -0.8, -2);
    } else if (progress < 0.40) {
      // 2. Volcano
      const p = (progress - 0.20) / 0.20;
      this.camera.position.set(0, 0.4 + p * 0.2, 7.2 - p * 0.4);
      this.camera.lookAt(0, -1.2, -2);
    } else if (progress < 0.54) {
      // 3. Waterfall
      const p = (progress - 0.40) / 0.14;
      this.camera.position.set(0, 0.6 - p * 0.2, 7.5);
      this.camera.lookAt(0, -0.6, -3);
    } else if (progress < 0.86) {
      // 4. Forest
      const p = (progress - 0.54) / 0.32;
      this.camera.position.set(Math.sin(p * Math.PI) * 0.8, 0.5, 8.5);
      this.camera.lookAt(0, 0, -6);
    } else if (progress < 0.92) {
      // 5. Storm
      this.camera.position.set(0, 0.2, 7.2);
      this.camera.lookAt(0, 0, -4);
    } else {
      // 6. Moon & Constellation
      const p = (progress - 0.92) / 0.08;
      this.camera.position.set(0, 0.2, 8.0 - p * 0.5);
      this.camera.lookAt(0, 0, -4);
    }
  }

  public setMouse(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseVec.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.mouseVec.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  }

  public handleCanvasClick(clientX: number, clientY: number) {
    this.setMouse(clientX, clientY);
    if (this.hoveredTarget) {
      this.moonWorld.handleNodeClick(this.hoveredTarget);
      this.audio.playTactileClick();
    }
  }

  public addScrollDelta(delta: number) {
    this.timeline.addScrollDelta(delta);
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

  public destroy() {
    this.isDestroyed = true;
    gsap.ticker.remove(this.tick);
    this.resizeObserver.disconnect();

    this.desertWorld.dispose();
    this.volcanoWorld.dispose();
    this.waterfallWorld.dispose();
    this.forestWorld.dispose();
    this.stormWorld.dispose();
    this.moonWorld.dispose();

    this.renderer.dispose();
  }
}
