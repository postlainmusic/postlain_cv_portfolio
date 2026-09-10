import * as THREE from 'three';

/**
 * MetalWebGL - 7 Floating Crystalline Titanium Nodes & Laser Tension Matrix
 * Awwwards-Level WebGL Experience for World 04: METAL
 * Features:
 * - 7 3D geometric metallic polyhedra with Fresnel reflection & specular highlights
 * - Real-time dynamic laser filaments connecting nodes in 3D space
 * - Magnetic attraction to mouse with inertia and spatial rotation
 * - Full memory disposal on unmount
 */
export class MetalWebGL {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private nodesGroup: THREE.Group | null = null;
  private laserLines: THREE.LineSegments | null = null;
  private nodeMeshes: THREE.Mesh[] = [];
  private nodePositions: THREE.Vector3[] = [];
  private basePositions: THREE.Vector3[] = [];

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
    this.camera.position.set(0, 0, 520);

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

    this.createMetalNodes();
    this.createLaserMatrix();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });

    this.render(0);
  }

  private createMetalNodes() {
    this.nodesGroup = new THREE.Group();
    // Shift slightly to right to pair with editorial copy on left
    this.nodesGroup.position.set(120, 0, 0);

    const count = 7;
    const radius = 175;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (radius * 0.85);
      const z = (Math.random() - 0.5) * 80;

      const basePos = new THREE.Vector3(x, y, z);
      this.basePositions.push(basePos.clone());
      this.nodePositions.push(basePos.clone());

      // 3D Crystal Octahedron / Icosahedron
      const geom = i % 2 === 0 ? new THREE.OctahedronGeometry(24, 0) : new THREE.IcosahedronGeometry(22, 0);

      // Iridescent Metallic Chrome Material
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xd8e8f8,
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(basePos);
      this.nodeMeshes.push(mesh);
      this.nodesGroup.add(mesh);
    }

    // Add ambient and directional lights for metallic reflections
    const ambLight = new THREE.AmbientLight(0x223344, 1.2);
    this.scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xaaccff, 2.5);
    dirLight1.position.set(200, 300, 400);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe85338, 1.8);
    dirLight2.position.set(-200, -200, -200);
    this.scene.add(dirLight2);

    this.scene.add(this.nodesGroup);
  }

  private createLaserMatrix() {
    // Dynamic connection lines
    const maxLines = 7 * 6;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(maxLines * 2 * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
      color: 0xa5d8ff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    this.laserLines = new THREE.LineSegments(geometry, material);
    if (this.nodesGroup) {
      this.nodesGroup.add(this.laserLines);
    }
  }

  private updateLaserMatrix() {
    if (!this.laserLines) return;
    const posAttr = this.laserLines.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    let lineIdx = 0;
    const count = this.nodeMeshes.length;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const a = this.nodeMeshes[i].position;
        const b = this.nodeMeshes[j].position;
        const dist = a.distanceTo(b);

        if (dist < 260) {
          const idx = lineIdx * 6;
          arr[idx] = a.x;
          arr[idx + 1] = a.y;
          arr[idx + 2] = a.z;
          arr[idx + 3] = b.x;
          arr[idx + 4] = b.y;
          arr[idx + 5] = b.z;
          lineIdx++;
        }
      }
    }

    this.laserLines.geometry.setDrawRange(0, lineIdx * 2);
    posAttr.needsUpdate = true;
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

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.06;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.06;

    // Orbit group rotation and mouse tilt
    if (this.nodesGroup) {
      this.nodesGroup.rotation.z = t * 0.06;
      this.nodesGroup.rotation.y = this.mouse.x * 0.25;
      this.nodesGroup.rotation.x = -this.mouse.y * 0.25;
    }

    // Individual node crystal rotation
    for (let i = 0; i < this.nodeMeshes.length; i++) {
      const mesh = this.nodeMeshes[i];
      mesh.rotation.x = t * (0.8 + i * 0.1);
      mesh.rotation.y = t * (0.6 + i * 0.1);

      // Subtle breathing float
      const base = this.basePositions[i];
      mesh.position.x = base.x + Math.sin(t * 1.2 + i) * 8;
      mesh.position.y = base.y + Math.cos(t * 1.4 + i) * 8;
      mesh.position.z = base.z + Math.sin(t * 0.9 + i * 2) * 12;
    }

    this.updateLaserMatrix();

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

    this.nodeMeshes.forEach((mesh) => {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
      else mesh.material.dispose();
    });

    if (this.laserLines) {
      this.laserLines.geometry.dispose();
      (this.laserLines.material as THREE.Material).dispose();
    }

    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
