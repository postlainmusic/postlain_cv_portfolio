import * as THREE from 'three';

/**
 * EarthWebGL - 3D Golden Sedimentation & Mineral Bedrock Depth
 * Awwwards-Level WebGL Experience for World 05: EARTH
 * Features:
 * - 6,000 warm golden mineral sedimentation motes falling in 3D laminar flow
 * - Soft ground horizon accumulation with volumetric depth
 * - Parallax camera drift and full memory disposal on unmount
 */
export class EarthWebGL {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private sedimentMesh: THREE.Points | null = null;
  private uniforms: {
    uTime: { value: number };
    uMouse: { value: THREE.Vector3 };
  };

  private mouse = new THREE.Vector2(0, 0);
  private targetMouse = new THREE.Vector2(0, 0);
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
    this.renderer.toneMappingExposure = 1.1;

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
    };

    this.createSedimentParticles();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });

    this.render(0);
  }

  private createSedimentParticles() {
    const count = 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const cGold = new THREE.Color('#d4af37'); // Warm antique gold
    const cAmber = new THREE.Color('#b48c5f'); // Mineral earth amber
    const cSand = new THREE.Color('#ece8df'); // Light sand mote

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

      sizes[i] = 1.2 + Math.random() * 4.0;
      seeds[i] = Math.random() * 100.0;

      const r = Math.random();
      const col = r < 0.4 ? cGold : r < 0.7 ? cAmber : cSand;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse;
        attribute float aSize;
        attribute float aSeed;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = aColor;
          vec3 pos = position;
          float t = uTime * 0.4 + aSeed;

          // Continuous gentle sedimentation fall
          float fallSpeed = 35.0 + mod(aSeed, 25.0);
          pos.y = mod(pos.y - uTime * fallSpeed + 300.0, 600.0) - 300.0;

          // Brownian air drift
          pos.x += sin(t * 0.8 + pos.y * 0.004) * 14.0;
          pos.z += cos(t * 0.6 + pos.x * 0.004) * 10.0;

          // Pointer wind deflection
          vec3 toMouse = uMouse - pos;
          float dist = length(toMouse);
          if (dist < 200.0) {
            pos += -normalize(toMouse) * ((1.0 - dist / 200.0) * 35.0);
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = aSize * (180.0 / -mvPosition.z);
          vAlpha = 0.35 + 0.55 * sin(t * 1.5);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard;
          gl_FragColor = vec4(vColor, vAlpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.sedimentMesh = new THREE.Points(geometry, material);
    this.scene.add(this.sedimentMesh);
  }

  private onPointerMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.targetMouse.x = (e.clientX / w) * 2 - 1;
    this.targetMouse.y = -(e.clientY / h) * 2 + 1;
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

    const mouseX = this.mouse.x * (window.innerWidth * 0.35);
    const mouseY = this.mouse.y * (window.innerHeight * 0.35);
    this.uniforms.uMouse.value.set(mouseX, mouseY, 0);

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

    if (this.sedimentMesh) {
      this.sedimentMesh.geometry.dispose();
      (this.sedimentMesh.material as THREE.Material).dispose();
      this.scene.remove(this.sedimentMesh);
    }

    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
