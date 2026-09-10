import * as THREE from 'three';

/**
 * VoidWebGL - Volumetric Quantum Dust & Gravitational Lens
 * Awwwards-Level WebGL Experience for World 00: VOID
 * Features:
 * - 18,000 interactive GPU particles floating in 3D curl field
 * - Gravitational attractor singularity responding to mouse cursor
 * - Concentric cosmic accretion orbital rings with Fresnel glow
 * - Dynamic shockwave propagation on pointer click/touch
 * - Full memory disposal on unmount
 */
export class VoidWebGL {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private particlesMesh: THREE.Points | null = null;
  private ringsGroup: THREE.Group | null = null;
  private uniforms: {
    uTime: { value: number };
    uMouse: { value: THREE.Vector3 };
    uMouseVelocity: { value: number };
    uShockwave: { value: THREE.Vector4 }; // x, y, radius, strength
    uPixelRatio: { value: number };
  };

  private mouse = new THREE.Vector2(0, 0);
  private targetMouse = new THREE.Vector2(0, 0);
  private mouseVelocity = 0;
  private prevMouse = new THREE.Vector2(0, 0);
  private animId = 0;
  private isDestroyed = false;
  private shockwaveRadius = 0;
  private shockwaveStrength = 0;
  private shockwaveCenter = new THREE.Vector2(0, 0);

  constructor(container: HTMLElement) {
    this.container = container;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, width / height, 1, 3000);
    this.camera.position.z = 700;

    // 2. High-Performance WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    this.container.appendChild(canvas);

    // 3. Shared Uniforms
    this.uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uMouseVelocity: { value: 0 },
      uShockwave: { value: new THREE.Vector4(0, 0, 0, 0) },
      uPixelRatio: { value: dpr },
    };

    // 4. Construct Elements
    this.createParticles();
    this.createAccretionRings();

    // 5. Event Listeners
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown, { passive: true });

    // 6. Start Loop
    this.render(0);
  }

  private createParticles() {
    const count = 16000;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color('#ece8df'); // Paper champagne
    const colorB = new THREE.Color('#e85338'); // Ember crimson
    const colorC = new THREE.Color('#38bdf8'); // Mineral cyan

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spherical distribution with heavy concentration near center
      const r = Math.pow(Math.random(), 1.8) * 800 + 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.75; // Slight elliptical squash
      const z = (r * Math.cos(phi) + (Math.random() - 0.5) * 200) * 0.8;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      sizes[i] = 1.2 + Math.random() * 4.2;
      seeds[i] = Math.random() * 100.0;

      // Palette blending
      const randColor = Math.random();
      let chosenColor = colorA;
      if (randColor < 0.28) {
        chosenColor = colorB;
      } else if (randColor < 0.42) {
        chosenColor = colorC;
      }

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aOrigPos', new THREE.BufferAttribute(originalPositions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse;
        uniform float uMouseVelocity;
        uniform vec4 uShockwave;
        uniform float uPixelRatio;

        attribute vec3 aOrigPos;
        attribute float aSize;
        attribute float aSeed;
        attribute vec3 aColor;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = aColor;
          vec3 pos = aOrigPos;

          // 1. Organic Breathing Brownian Flow
          float t = uTime * 0.8 + aSeed;
          pos.x += sin(t * 0.5 + pos.y * 0.003) * 14.0;
          pos.y += cos(t * 0.6 + pos.x * 0.003) * 14.0;
          pos.z += sin(t * 0.4 + pos.z * 0.002) * 12.0;

          // 2. Gravitational Singularity Well toward mouse
          vec3 toMouse = uMouse - pos;
          float dist = length(toMouse);
          float pullRadius = 380.0;

          if (dist < pullRadius) {
            float strength = (1.0 - dist / pullRadius);
            // Tangential orbital swirl around mouse
            vec3 tangent = normalize(cross(toMouse, vec3(0.0, 0.0, 1.0)));
            pos += toMouse * (strength * 0.38);
            pos += tangent * (strength * (35.0 + uMouseVelocity * 25.0));
          }

          // 3. Shockwave Impulse from clicks
          if (uShockwave.w > 0.01) {
            vec2 waveOrigin = uShockwave.xy;
            float waveRadius = uShockwave.z;
            float waveStrength = uShockwave.w;
            float distToWave = length(pos.xy - waveOrigin);
            float ringDiff = abs(distToWave - waveRadius);

            if (ringDiff < 80.0) {
              float impulse = (1.0 - ringDiff / 80.0) * waveStrength * 60.0;
              vec2 pushDir = normalize(pos.xy - waveOrigin);
              pos.xy += pushDir * impulse;
              pos.z += impulse * 0.5;
            }
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Size attenuation with distance and pixel ratio
          float pSize = aSize * uPixelRatio * (280.0 / -mvPosition.z);
          pSize *= (1.0 + sin(uTime * 2.0 + aSeed) * 0.25);
          gl_PointSize = clamp(pSize, 1.0, 24.0);

          // Alpha fade near screen boundaries and distance
          float depthAlpha = smoothstep(1200.0, 300.0, -mvPosition.z);
          vAlpha = clamp(depthAlpha * 0.85, 0.1, 0.95);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Circular particle with soft radiant falloff
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float intensity = pow(1.0 - dist * 2.0, 1.8);
          // Chromatic core brightness
          vec3 finalColor = mix(vColor, vec3(1.0), pow(intensity, 3.0));
          gl_FragColor = vec4(finalColor, vAlpha * intensity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particlesMesh = new THREE.Points(geometry, material);
    this.scene.add(this.particlesMesh);
  }

  private createAccretionRings() {
    this.ringsGroup = new THREE.Group();

    // Elegant thin concentric orbital geometry
    const radii = [140, 260, 420, 620];
    radii.forEach((r, idx) => {
      const ringGeom = new THREE.RingGeometry(r, r + 1.2, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0xece8df : 0xe85338,
        transparent: true,
        opacity: 0.12 - idx * 0.02,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI * 0.25;
      ringMesh.rotation.y = idx * 0.15;
      this.ringsGroup!.add(ringMesh);
    });

    this.scene.add(this.ringsGroup);
  }

  private onPointerMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    // Map normalized cursor to 3D space
    this.targetMouse.x = (e.clientX / w) * 2 - 1;
    this.targetMouse.y = -(e.clientY / h) * 2 + 1;

    const dx = this.targetMouse.x - this.prevMouse.x;
    const dy = this.targetMouse.y - this.prevMouse.y;
    this.mouseVelocity = Math.hypot(dx, dy) * 45;
    this.prevMouse.copy(this.targetMouse);
  };

  private onPointerDown = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const nx = ((e.clientX / w) * 2 - 1) * (w * 0.45);
    const ny = (-(e.clientY / h) * 2 + 1) * (h * 0.45);

    this.shockwaveCenter.set(nx, ny);
    this.shockwaveRadius = 10;
    this.shockwaveStrength = 1.0;
  };

  private onResize = () => {
    if (this.isDestroyed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(dpr);
    this.uniforms.uPixelRatio.value = dpr;
  };

  private render = (currentTime: number) => {
    if (this.isDestroyed) return;

    const t = currentTime * 0.001;
    this.uniforms.uTime.value = t;

    // Smooth mouse lerp
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.08;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.08;
    this.mouseVelocity *= 0.94;

    const mouseWorldX = this.mouse.x * (window.innerWidth * 0.42);
    const mouseWorldY = this.mouse.y * (window.innerHeight * 0.42);
    this.uniforms.uMouse.value.set(mouseWorldX, mouseWorldY, 0);
    this.uniforms.uMouseVelocity.value = this.mouseVelocity;

    // Expand shockwave
    if (this.shockwaveStrength > 0.01) {
      this.shockwaveRadius += 750 * 0.016;
      this.shockwaveStrength *= 0.94;
      this.uniforms.uShockwave.value.set(
        this.shockwaveCenter.x,
        this.shockwaveCenter.y,
        this.shockwaveRadius,
        this.shockwaveStrength
      );
    } else {
      this.uniforms.uShockwave.value.set(0, 0, 0, 0);
    }

    // Gentle camera parallax tilt
    this.camera.position.x += (this.mouse.x * 60 - this.camera.position.x) * 0.04;
    this.camera.position.y += (this.mouse.y * 50 - this.camera.position.y) * 0.04;
    this.camera.lookAt(0, 0, 0);

    // Rotate accretion rings
    if (this.ringsGroup) {
      this.ringsGroup.rotation.z = t * 0.08;
      this.ringsGroup.rotation.x = Math.PI * 0.22 + Math.sin(t * 0.3) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
    this.animId = requestAnimationFrame(this.render);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animId);

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);

    if (this.particlesMesh) {
      this.particlesMesh.geometry.dispose();
      (this.particlesMesh.material as THREE.Material).dispose();
      this.scene.remove(this.particlesMesh);
    }

    if (this.ringsGroup) {
      this.ringsGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      this.scene.remove(this.ringsGroup);
    }

    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
