import * as THREE from 'three';

/**
 * FireWebGL - Blazing 3D Plasma Singularity & Solar Flare Corona
 * Awwwards-Level WebGL Experience for World 03: FIRE
 * Features:
 * - 3D procedural noise plasma sphere with vertex displacement
 * - 5,000 swirling thermal ember particles in turbulent convection
 * - Acoustic frequency orbital rings pulsating with harmonic resonance
 * - Full memory disposal on unmount
 */
export class FireWebGL {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private plasmaCore: THREE.Mesh | null = null;
  private embersMesh: THREE.Points | null = null;
  private acousticRings: THREE.Group | null = null;
  private uniforms: {
    uTime: { value: number };
    uMouse: { value: THREE.Vector3 };
    uResonance: { value: number };
  };

  private mouse = new THREE.Vector2(0, 0);
  private targetMouse = new THREE.Vector2(0, 0);
  private resonance = 0.2;
  private targetResonance = 0.2;
  private animId = 0;
  private isDestroyed = false;

  constructor(container: HTMLElement) {
    this.container = container;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    this.camera.position.set(0, 0, 480);

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;

    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    this.container.appendChild(canvas);

    this.uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uResonance: { value: 0.2 },
    };

    this.createPlasmaCore();
    this.createEmbers();
    this.createAcousticRings();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });

    this.render(0);
  }

  private createPlasmaCore() {
    const geometry = new THREE.IcosahedronGeometry(75, 48);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uResonance;
        varying vec3 vNormal;
        varying vec3 vPosition;

        // 3D Simplex noise approximation
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          vec4 j = p - 49.0 * floor(p * (1.0 / 49.0));
          vec4 x_ = floor(j * (1.0 / 7.0));
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * (2.0 / 7.0) + 0.5 / 7.0 - 1.0;
          vec4 y = y_ * (2.0 / 7.0) + 0.5 / 7.0 - 1.0;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec3 pos = position;

          // Blazing solar flare displacement
          float noiseVal = snoise(pos * 0.025 + uTime * 0.7);
          float disp = noiseVal * (12.0 + uResonance * 24.0);
          pos += normal * disp;

          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uResonance;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, viewDir)), 2.8);

          // Thermal flame palette: Deep crimson -> Blazing orange -> Incandescent Gold
          vec3 darkCore = vec3(0.35, 0.05, 0.02);
          vec3 blaze    = vec3(0.92, 0.32, 0.12);
          vec3 gold     = vec3(1.0, 0.85, 0.45);

          vec3 color = mix(darkCore, blaze, fresnel * 1.5);
          color += gold * pow(fresnel, 4.0) * (1.2 + uResonance * 1.5);

          gl_FragColor = vec4(color, 0.92);
        }
      `,
      transparent: true,
    });

    this.plasmaCore = new THREE.Mesh(geometry, material);
    // Shift slightly to right to balance editorial text on left
    this.plasmaCore.position.set(160, 10, 0);
    this.scene.add(this.plasmaCore);
  }

  private createEmbers() {
    const count = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 60 + Math.pow(Math.random(), 2.0) * 380;
      positions[i * 3] = 160 + Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      sizes[i] = 1.5 + Math.random() * 4.5;
      seeds[i] = Math.random() * 100.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uResonance;
        attribute float aSize;
        attribute float aSeed;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          float t = uTime * 0.9 + aSeed;

          // Orbit swirl around core
          float angle = t * 0.4;
          float dx = pos.x - 160.0;
          float dy = pos.y;
          float r = length(vec2(dx, dy));

          pos.x = 160.0 + cos(angle + aSeed) * r;
          pos.y = sin(angle + aSeed) * r + sin(t * 2.0) * 15.0;
          pos.z += sin(t * 1.5) * 20.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = aSize * (1 + uResonance * 0.8) * (220.0 / -mvPosition.z);
          vAlpha = 0.3 + 0.7 * sin(t * 2.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard;
          gl_FragColor = vec4(1.0, 0.55, 0.2, vAlpha * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.embersMesh = new THREE.Points(geometry, material);
    this.scene.add(this.embersMesh);
  }

  private createAcousticRings() {
    this.acousticRings = new THREE.Group();
    const radii = [110, 160, 230, 310];

    radii.forEach((r, idx) => {
      const ringGeom = new THREE.RingGeometry(r, r + 1.5, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0xff7a33 : 0xffbe44,
        transparent: true,
        opacity: 0.22 - idx * 0.04,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.set(160, 10, 0);
      ringMesh.rotation.x = Math.PI * 0.28;
      this.acousticRings!.add(ringMesh);
    });

    this.scene.add(this.acousticRings);
  }

  private onPointerMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.targetMouse.x = (e.clientX / w) * 2 - 1;
    this.targetMouse.y = -(e.clientY / h) * 2 + 1;

    // Calculate proximity to the 3D core
    const coreScreenX = 0.3; // Right side of viewport
    const distToCore = Math.hypot(this.targetMouse.x - coreScreenX, this.targetMouse.y);
    this.targetResonance = Math.max(0.15, Math.min(1.2, 1.2 - distToCore * 1.5));
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
  };

  private render = (currentTime: number) => {
    if (this.isDestroyed) return;

    const t = currentTime * 0.001;
    this.uniforms.uTime.value = t;

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.06;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.06;
    this.resonance += (this.targetResonance - this.resonance) * 0.08;
    this.uniforms.uResonance.value = this.resonance;

    if (this.plasmaCore) {
      this.plasmaCore.rotation.y = t * 0.35;
      this.plasmaCore.rotation.x = Math.sin(t * 0.2) * 0.25;
    }

    if (this.acousticRings) {
      this.acousticRings.rotation.z = t * 0.15;
    }

    this.camera.position.x = this.mouse.x * 35;
    this.camera.position.y = this.mouse.y * 25;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
    this.animId = requestAnimationFrame(this.render);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animId);

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);

    if (this.plasmaCore) {
      this.plasmaCore.geometry.dispose();
      (this.plasmaCore.material as THREE.Material).dispose();
      this.scene.remove(this.plasmaCore);
    }

    if (this.embersMesh) {
      this.embersMesh.geometry.dispose();
      (this.embersMesh.material as THREE.Material).dispose();
      this.scene.remove(this.embersMesh);
    }

    if (this.acousticRings) {
      this.acousticRings.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      this.scene.remove(this.acousticRings);
    }

    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
