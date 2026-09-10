import * as THREE from 'three';

/**
 * WaterWebGL - High-End Mineral Fluid Caustics & Liquid Refraction
 * Awwwards-Level WebGL Experience for World 01: WATER
 * Features:
 * - Real-time procedural Voronoi water caustics GLSL fragment shader
 * - Gerstner wave displacement with cursor ripple propagation
 * - Suspended luminous mineral phytoplankton particles in fluid currents
 * - Full memory disposal on unmount
 */
export class WaterWebGL {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private waterMesh: THREE.Mesh | null = null;
  private sporesMesh: THREE.Points | null = null;
  private uniforms: {
    uTime: { value: number };
    uMouse: { value: THREE.Vector2 };
    uMouseSpeed: { value: number };
    uResolution: { value: THREE.Vector2 };
    uRipples: { value: THREE.Vector4[] }; // x, y, time, strength
  };

  private mouse = new THREE.Vector2(0.5, 0.5);
  private targetMouse = new THREE.Vector2(0.5, 0.5);
  private prevMouse = new THREE.Vector2(0.5, 0.5);
  private mouseSpeed = 0;
  private ripples: { x: number; y: number; time: number; strength: number }[] = [];
  private animId = 0;
  private isDestroyed = false;

  constructor(container: HTMLElement) {
    this.container = container;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 100;

    // 2. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    this.container.appendChild(canvas);

    // 3. Ripples pool (max 6 active ripples)
    const rippleUniforms: THREE.Vector4[] = [];
    for (let i = 0; i < 6; i++) {
      rippleUniforms.push(new THREE.Vector4(0, 0, 0, 0));
    }

    this.uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseSpeed: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uRipples: { value: rippleUniforms },
    };

    // 4. Construct Water Mesh & Particles
    this.createWaterPlane();
    this.createPhytoplankton();

    // 5. Event Listeners
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown, { passive: true });

    // 6. Start Loop
    this.render(0);
  }

  private createWaterPlane() {
    // Large plane covering the camera viewport
    const geometry = new THREE.PlaneGeometry(240, 150, 64, 64);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseSpeed;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vDisplacement;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Gentle undulating 3D oceanic wave swells
          float waveA = sin(pos.x * 0.08 + uTime * 1.2) * cos(pos.y * 0.08 + uTime * 0.9) * 2.5;
          float waveB = sin(pos.x * 0.15 - uTime * 1.8 + pos.y * 0.1) * 1.2;
          
          // Mouse proximity ripple lift
          vec2 mouseUV = (uMouse - 0.5) * vec2(240.0, 150.0);
          float distToMouse = length(pos.xy - mouseUV);
          float mouseWave = exp(-distToMouse * 0.05) * (uMouseSpeed * 3.5);

          float totalDisp = waveA + waveB + mouseWave;
          pos.z += totalDisp;
          vDisplacement = totalDisp;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseSpeed;
        uniform vec2 uResolution;
        uniform vec4 uRipples[6]; // x, y, time, strength

        varying vec2 vUv;
        varying float vDisplacement;

        // 2D Hash
        vec2 hash2(vec2 p) {
          return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
        }

        // Procedural Voronoi Caustics
        float voronoiCaustic(vec2 uv, float time) {
          vec2 i = floor(uv);
          vec2 f = fract(uv);
          float m_dist = 1.0;

          for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
              vec2 neighbor = vec2(float(x), float(y));
              vec2 point = hash2(i + neighbor);
              // Animate caustic nodes
              point = 0.5 + 0.5 * sin(time + 6.2831 * point);
              vec2 diff = neighbor + point - f;
              float dist = length(diff);
              m_dist = min(m_dist, dist);
            }
          }
          return pow(m_dist, 1.6);
        }

        void main() {
          vec2 uv = vUv;
          float t = uTime * 0.6;

          // 1. Dual-layer dancing mineral water caustics
          vec2 cUv1 = uv * 9.0 + vec2(t * 0.2, t * 0.15);
          vec2 cUv2 = uv * 14.0 - vec2(t * 0.18, t * 0.25);
          float caustic1 = voronoiCaustic(cUv1, t * 1.4);
          float caustic2 = voronoiCaustic(cUv2, t * 1.8);
          float caustic = pow(min(caustic1, caustic2), 0.85);

          // 2. Deep Mineral Gradient Palette
          vec3 abyssColor = vec3(0.02, 0.04, 0.07);      // Deep obsidian void
          vec3 deepWater  = vec3(0.05, 0.12, 0.18);      // Dark mineral fluid
          vec3 causticLit = vec3(0.18, 0.72, 0.92);      // Bioluminescent mineral cyan
          vec3 crestWhite = vec3(0.85, 0.95, 1.0);       // Radiant surface crest

          vec3 baseFluid = mix(abyssColor, deepWater, uv.y * 0.8 + 0.2);

          // Blend caustics with high contrast
          float causticIntensity = smoothstep(0.18, 0.75, caustic);
          vec3 finalColor = mix(baseFluid, causticLit, causticIntensity * 0.65);

          // Add surface displacement highlight
          finalColor += crestWhite * smoothstep(1.5, 3.5, vDisplacement) * 0.35;

          // 3. Mouse wake illumination
          float distToMouse = length(uv - uMouse);
          float mouseWake = smoothstep(0.35, 0.0, distToMouse);
          finalColor += causticLit * mouseWake * (0.35 + uMouseSpeed * 0.8);

          // 4. Expanding ripple rings from interactions
          for (int i = 0; i < 6; i++) {
            if (uRipples[i].w > 0.01) {
              vec2 rPos = uRipples[i].xy;
              float rRadius = uRipples[i].z;
              float rStrength = uRipples[i].w;
              float d = length(uv - rPos);
              float ring = exp(-pow((d - rRadius) * 28.0, 2.0)) * rStrength;
              finalColor += vec3(0.3, 0.85, 1.0) * ring * 1.2;
            }
          }

          // Edge vignette falloff
          float vignette = smoothstep(0.95, 0.45, length(uv - 0.5));
          gl_FragColor = vec4(finalColor, 0.88 * vignette);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    this.waterMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.waterMesh);
  }

  private createPhytoplankton() {
    // Suspended bioluminescent mineral spores
    const count = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 + 5;

      sizes[i] = 1.0 + Math.random() * 3.5;
      seeds[i] = Math.random() * 100.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uTime;
        attribute float aSize;
        attribute float aSeed;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          float t = uTime * 0.4 + aSeed;

          // Water drift currents
          pos.x += sin(t * 0.8 + pos.y * 0.05) * 6.0;
          pos.y += cos(t * 0.6 + pos.x * 0.05) * 4.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = aSize * (150.0 / -mvPosition.z);
          vAlpha = 0.3 + 0.7 * sin(t * 1.5);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard;
          gl_FragColor = vec4(0.25, 0.85, 0.95, vAlpha * 0.7);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.sporesMesh = new THREE.Points(geometry, material);
    this.scene.add(this.sporesMesh);
  }

  private onPointerMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.targetMouse.x = e.clientX / w;
    this.targetMouse.y = 1.0 - e.clientY / h;

    const dx = this.targetMouse.x - this.prevMouse.x;
    const dy = this.targetMouse.y - this.prevMouse.y;
    this.mouseSpeed = Math.min(2.5, Math.hypot(dx, dy) * 35.0);
    this.prevMouse.copy(this.targetMouse);
  };

  private onPointerDown = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const nx = e.clientX / w;
    const ny = 1.0 - e.clientY / h;

    // Add ripple
    this.ripples.push({
      x: nx,
      y: ny,
      time: 0,
      strength: 1.0,
    });
    if (this.ripples.length > 6) {
      this.ripples.shift();
    }
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
    this.uniforms.uResolution.value.set(width, height);
  };

  private render = (currentTime: number) => {
    if (this.isDestroyed) return;

    const t = currentTime * 0.001;
    this.uniforms.uTime.value = t;

    // Smooth mouse lerp
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.07;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.07;
    this.mouseSpeed *= 0.93;

    this.uniforms.uMouse.value.copy(this.mouse);
    this.uniforms.uMouseSpeed.value = this.mouseSpeed;

    // Update ripples
    for (let i = 0; i < 6; i++) {
      if (i < this.ripples.length) {
        const r = this.ripples[i];
        r.time += 0.016;
        r.strength *= 0.96;
        const radius = r.time * 0.45;
        this.uniforms.uRipples.value[i].set(r.x, r.y, radius, r.strength);
      } else {
        this.uniforms.uRipples.value[i].set(0, 0, 0, 0);
      }
    }

    // Gentle camera drift
    this.camera.position.x = (this.mouse.x - 0.5) * 8.0;
    this.camera.position.y = (this.mouse.y - 0.5) * 6.0;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
    this.animId = requestAnimationFrame(this.render);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animId);

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);

    if (this.waterMesh) {
      this.waterMesh.geometry.dispose();
      (this.waterMesh.material as THREE.Material).dispose();
      this.scene.remove(this.waterMesh);
    }

    if (this.sporesMesh) {
      this.sporesMesh.geometry.dispose();
      (this.sporesMesh.material as THREE.Material).dispose();
      this.scene.remove(this.sporesMesh);
    }

    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
