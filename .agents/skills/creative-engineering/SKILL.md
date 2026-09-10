---
name: creative-engineering
description: "Master creative technologist and WebGL/WebGPU engineering skill for building award-winning websites (Awwwards SOTY/SOTD, FWA, CSSDA). Covers 3-layer architecture, single-loop RAF orchestration (Lenis + GSAP + Three.js/OGL/WebGPU), GLSL/WGSL shaders, DOM-to-WebGL projection, procedural Web Audio synthesis, and extreme 60/120 FPS performance optimization."
---

# Creative Engineering & Awwwards WebGL Master Skill

This skill guides the design and implementation of elite interactive digital experiences, cinematic web graphics, custom shaders, and 60/120 FPS render architectures.

---

## 1. Core Architecture: The 3-Tier Layering Model

Always separate visual effects from semantic document structure:

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2: UI Overlay, Sensory Controller & Kinetic Cursor   │
│ • Custom cursor / magnetic attractors (with lag/inertia)    │
│ • Navigation drawer, sound controls, fullscreen menu        │
│ • Web Audio API interactive sound synthesis                 │
├─────────────────────────────────────────────────────────────┤
│ LAYER 1: Semantic DOM Content (HTML/CSS)                    │
│ • Typography, layout, accessible elements (ARIA, SEO)      │
│ • SplitText line/character reveals                          │
│ • <img> / <video> acting as transparent hitbox anchors      │
├─────────────────────────────────────────────────────────────┤
│ LAYER 0: Fixed Fullscreen Canvas (WebGL/WebGPU)             │
│ • 3D Meshes, particles, raymarching SDFs, fluid sims        │
│ • Plane meshes matched 1:1 with DOM element coordinates     │
│ • Post-processing: Bloom, Chromatic Aberration, Grain       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Central RAF Orchestrator (Single-Loop Rule)

Never create multiple disconnected `requestAnimationFrame` loops. Run all scroll, physics, uniforms, and rendering sequentially inside one ticker.

```typescript
import Lenis from 'lenis';
import gsap from 'gsap';
import * as THREE from 'three';

export class CentralEngine {
  private lenis: Lenis;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private uniforms: Record<string, THREE.IUniform>;

  constructor() {
    this.lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.uniforms = {
      uTime: { value: 0 },
      uScrollVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    };

    // Single Tick Loop via GSAP Ticker
    gsap.ticker.add(this.tick.bind(this));
    gsap.ticker.lagSmoothing(0);
  }

  private tick(time: number, deltaTime: number, frame: number) {
    // 1. Update Smooth Scroll
    this.lenis.raf(time * 1000);
    const scrollVelocity = this.lenis.velocity;

    // 2. Update Global Uniforms
    this.uniforms.uTime.value = time;
    this.uniforms.uScrollVelocity.value = scrollVelocity;

    // 3. Render WebGL Scene
    this.renderer.render(this.scene, this.camera);
  }

  public destroy() {
    gsap.ticker.remove(this.tick.bind(this));
    this.lenis.destroy();
    this.renderer.dispose();
  }
}
```

---

## 3. DOM-to-WebGL Projection (The Plane Sync Trick)

Match HTML `<img>` elements 1:1 with WebGL `PlaneGeometry` meshes in 3D world space.

```typescript
export function syncMeshWithDOM(
  mesh: THREE.Mesh,
  domElement: HTMLElement,
  camera: THREE.PerspectiveCamera
) {
  const rect = domElement.getBoundingClientRect();
  const distance = camera.position.z;
  const vFov = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
  const visibleWidth = visibleHeight * camera.aspect;

  // Scale mesh to match exact DOM dimensions
  mesh.scale.x = (rect.width / window.innerWidth) * visibleWidth;
  mesh.scale.y = (rect.height / window.innerHeight) * visibleHeight;

  // Position mesh matching exact top/left on screen
  mesh.position.x = ((rect.left + rect.width / 2) / window.innerWidth - 0.5) * visibleWidth;
  mesh.position.y = -((rect.top + rect.height / 2) / window.innerHeight - 0.5) * visibleHeight;
}
```

---

## 4. GLSL Shader Grimoire

### 4.1. Liquid Wave & Ripple Fragment Shader
```glsl
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

// Simplex Noise 2D
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float dist = distance(uv, uMouse);
  float ripple = sin(dist * 20.0 - uTime * 4.0) * exp(-dist * 4.0) * uHover;
  float noise = snoise(uv * 4.0 + uTime * 0.2);
  vec2 distortedUv = uv + vec2(noise * 0.03 + ripple * 0.05);

  // Chromatic Aberration
  float r = texture2D(uTexture, distortedUv + vec2(0.005 * uHover, 0.0)).r;
  float g = texture2D(uTexture, distortedUv).g;
  float b = texture2D(uTexture, distortedUv - vec2(0.005 * uHover, 0.0)).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
```

### 4.2. Dithering & Film Grain (Band-Free Dark Gradients)
```glsl
float random(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 applyDither(vec3 color, vec2 uv, float time, float intensity) {
  float noise = (random(uv + fract(time)) - 0.5) * intensity;
  return color + noise;
}
```

---

## 5. Performance Engineering (60/120 FPS Discipline)

### 5.1. Zero Allocations in Render Loop (Memory Pool)
- **Never instantiate objects (`new THREE.Vector3()`, `new Matrix4()`) inside `tick()` or event callbacks.**
- Pre-allocate temporary variables at module scope:

```typescript
// ✅ Pre-allocated static temporary objects
const _tempVec3 = new THREE.Vector3();
const _tempMatrix = new THREE.Matrix4();
const _tempQuat = new THREE.Quaternion();

export function animateMesh(mesh: THREE.Mesh, target: { x: number; y: number; z: number }) {
  _tempVec3.set(target.x, target.y, target.z);
  mesh.position.lerp(_tempVec3, 0.1);
}
```

### 5.2. Complete VRAM Disposal Routine
Prevent memory leaks when navigating between pages or closing WebGL overlays:

```typescript
export function disposeCreativeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const mat of materials) {
          for (const key of Object.keys(mat)) {
            const prop = mat[key];
            if (prop && typeof prop.dispose === 'function') {
              prop.dispose();
            }
          }
          mat.dispose();
        }
      }
    }
  });

  renderer.dispose();
  renderer.forceContextLoss();
}
```

### 5.3. Adaptive DPR Scaling
```typescript
export function initAdaptiveRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ canvas, powerPreference: 'high-performance' });
  
  // Clamp DPR to max 2.0 to prevent 3x Retina GPU meltdown
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
  return renderer;
}
```

---

## 6. Procedural Web Audio Engine

Synthetic micro-interactions without audio file downloads:

```typescript
export class ProceduralAudio {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Tactile mechanical click
  public playClick(pitch = 700) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.035);
  }
}
```
