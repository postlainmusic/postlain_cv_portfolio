import * as THREE from 'three';

/**
 * WoodWebGL - Generative Bioluminescent Root & Mycorrhizal Network
 * Awwwards-Level WebGL Experience for World 02: WOOD
 * Features:
 * - Multi-tier procedural 3D organic branching roots with glowing xylem
 * - Suspended bioluminescent spore cloud drifting in air currents
 * - Phototropic growth attraction towards cursor
 * - Full memory disposal on unmount
 */
export class WoodWebGL {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private branchesGroup: THREE.Group | null = null;
  private sporesMesh: THREE.Points | null = null;
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
    this.camera.position.set(0, 0, 450);

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

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

    this.createOrganicRoots();
    this.createBioluminescentSpores();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });

    this.render(0);
  }

  private createOrganicRoots() {
    this.branchesGroup = new THREE.Group();

    // Generative organic 3D spline trees
    const numBranches = 14;
    for (let b = 0; b < numBranches; b++) {
      const points: THREE.Vector3[] = [];
      const startX = (Math.random() - 0.5) * 200 + (b - numBranches / 2) * 25;
      const startY = -280;
      const startZ = (Math.random() - 0.5) * 150;

      let current = new THREE.Vector3(startX, startY, startZ);
      points.push(current.clone());

      const segments = 16;
      for (let s = 1; s <= segments; s++) {
        const prog = s / segments;
        const curveX = Math.sin(prog * Math.PI * 1.5 + b * 0.8) * (60 + prog * 100);
        const curveZ = Math.cos(prog * Math.PI * 1.2 + b * 0.5) * (40 + prog * 60);

        current.x += (Math.random() - 0.5) * 25 + curveX * 0.08;
        current.y += (350 / segments) * (0.8 + Math.random() * 0.4);
        current.z += (Math.random() - 0.5) * 20 + curveZ * 0.08;

        points.push(current.clone());
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeom = new THREE.TubeGeometry(curve, 64, 2.8 * (1 - (b % 3) * 0.2), 8, false);

      const tubeMat = new THREE.MeshBasicMaterial({
        color: b % 3 === 0 ? 0x6ee7b7 : b % 2 === 0 ? 0x34d399 : 0x10b981,
        transparent: true,
        opacity: 0.35 + (b % 3) * 0.15,
        wireframe: b % 2 === 0,
      });

      const mesh = new THREE.Mesh(tubeGeom, tubeMat);
      this.branchesGroup.add(mesh);
    }

    this.scene.add(this.branchesGroup);
  }

  private createBioluminescentSpores() {
    const count = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 350;

      sizes[i] = 1.5 + Math.random() * 4.0;
      seeds[i] = Math.random() * 100.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMouse;
        attribute float aSize;
        attribute float aSeed;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          float t = uTime * 0.5 + aSeed;

          // Organic thermal drift
          pos.x += sin(t * 0.7 + pos.y * 0.005) * 16.0;
          pos.y += cos(t * 0.5 + pos.x * 0.005) * 12.0;

          // Gentle phototropism toward mouse
          vec3 toMouse = uMouse - pos;
          float dist = length(toMouse);
          if (dist < 260.0) {
            pos += toMouse * ((1.0 - dist / 260.0) * 0.22);
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          gl_PointSize = aSize * (200.0 / -mvPosition.z);
          vAlpha = 0.25 + 0.65 * sin(t * 1.8);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard;
          // Emerald & golden bioluminescence
          gl_FragColor = vec4(0.43, 0.92, 0.68, vAlpha * 0.85);
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

    // Parallax sway
    if (this.branchesGroup) {
      this.branchesGroup.rotation.y = this.mouse.x * 0.15;
      this.branchesGroup.rotation.x = -this.mouse.y * 0.1;
    }

    this.camera.position.x = this.mouse.x * 40;
    this.camera.position.y = this.mouse.y * 30;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
    this.animId = requestAnimationFrame(this.render);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animId);

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);

    if (this.branchesGroup) {
      this.branchesGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      this.scene.remove(this.branchesGroup);
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
