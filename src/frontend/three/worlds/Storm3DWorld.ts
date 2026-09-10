/**
 * STORM 3D WORLD — KINETIC ENERGY VORTEX & LIGHTNING
 * 3D Cloud Vortex Cylinder, Branching 3D Lightning Bolts,
 * Wind Vector Streamlines, and Physical Cloud Rift Separation.
 */

import * as THREE from 'three';

export class Storm3DWorld {
  public group: THREE.Group;
  private vortexMesh: THREE.Mesh;
  private vortexMat: THREE.ShaderMaterial;
  private lightningLines: THREE.LineSegments | null = null;
  private windPoints: THREE.Points;
  private windGeo: THREE.BufferGeometry;
  private nextLightningTime: number = 2.0;

  constructor() {
    this.group = new THREE.Group();

    // 1. 3D Cloud Vortex Cylinder & Shader
    const vortexGeo = new THREE.CylinderGeometry(18, 18, 30, 48, 16, true);
    vortexGeo.translate(0, 0, -10);

    this.vortexMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRift: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          vUv = uv;
          vec3 pos = position;
          // Swirling vortex twist
          float angle = pos.y * 0.15 + uTime * 1.2;
          float s = sin(angle);
          float c = cos(angle);
          pos.xz = vec2(pos.x * c - pos.z * s, pos.x * s + pos.z * c);
          vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uRift;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          vec3 darkCloud = vec3(0.02, 0.04, 0.07);
          vec3 thunderGlow = vec3(0.12, 0.18, 0.28);
          
          float band = sin(vUv.y * 20.0 + uTime * 3.0) * 0.5 + 0.5;
          vec3 color = mix(darkCloud, thunderGlow, band * 0.4);

          // Physical cloud rift alpha cutout in center
          float riftMask = 1.0 - smoothstep(0.0, 0.85, abs(vUv.x - 0.5) * 2.0 * (1.0 - uRift));
          float alpha = (0.75 - uRift * 0.7) * (1.0 - riftMask);

          gl_FragColor = vec4(color, max(0.0, alpha));
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.vortexMesh = new THREE.Mesh(vortexGeo, this.vortexMat);
    this.group.add(this.vortexMesh);

    // 2. High-Velocity 3D Wind Vector Particles
    const windCount = 280;
    const windPositions = new Float32Array(windCount * 3);
    for (let i = 0; i < windCount; i++) {
      windPositions[i * 3] = (Math.random() - 0.5) * 36;
      windPositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      windPositions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 20;
    }

    this.windGeo = new THREE.BufferGeometry();
    this.windGeo.setAttribute('position', new THREE.BufferAttribute(windPositions, 3));

    const windMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.16,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    this.windPoints = new THREE.Points(this.windGeo, windMat);
    this.group.add(this.windPoints);
  }

  private triggerLightning() {
    if (this.lightningLines) {
      this.group.remove(this.lightningLines);
      this.lightningLines.geometry.dispose();
      (this.lightningLines.material as THREE.Material).dispose();
      this.lightningLines = null;
    }

    const segments = 12;
    const points: number[] = [];
    let curX = (Math.random() - 0.5) * 8;
    let curY = 12;
    let curZ = -8;

    for (let s = 0; s < segments; s++) {
      const nextX = curX + (Math.random() - 0.5) * 2.5;
      const nextY = curY - 2.0;
      const nextZ = curZ + (Math.random() - 0.5) * 1.5;

      points.push(curX, curY, curZ, nextX, nextY, nextZ);

      curX = nextX;
      curY = nextY;
      curZ = nextZ;
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xe0f2fe,
      linewidth: 3,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
    });

    this.lightningLines = new THREE.LineSegments(lineGeo, lineMat);
    this.group.add(this.lightningLines);
  }

  public update(progress: number, time: number) {
    this.vortexMat.uniforms.uTime.value = time;

    // Physical Cloud Rift Opening: 0.88 -> 0.94
    const riftFactor = Math.max(0, Math.min(1, (progress - 0.88) / 0.06));
    this.vortexMat.uniforms.uRift.value = riftFactor;

    // Trigger procedural lightning
    if (progress >= 0.82 && progress <= 0.94) {
      this.nextLightningTime -= 0.016;
      if (this.nextLightningTime <= 0) {
        this.triggerLightning();
        this.nextLightningTime = 1.2 + Math.random() * 2.5;
      }
    }

    if (this.lightningLines) {
      const mat = this.lightningLines.material as THREE.LineBasicMaterial;
      mat.opacity -= 0.08;
      if (mat.opacity <= 0) {
        this.group.remove(this.lightningLines);
        this.lightningLines.geometry.dispose();
        mat.dispose();
        this.lightningLines = null;
      }
    }

    // High velocity wind swirl
    const positions = this.windGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += 0.45; // rapid rightward sweep
      positions[i + 1] += Math.sin(time * 3.0 + positions[i]) * 0.05;

      if (positions[i] > 18) {
        positions[i] = -18;
      }
    }
    this.windGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: 0.80 -> 0.96
    let alpha = 0;
    if (progress >= 0.80 && progress < 0.86) {
      alpha = (progress - 0.80) / 0.06;
    } else if (progress >= 0.86 && progress <= 0.92) {
      alpha = 1.0;
    } else if (progress > 0.92 && progress <= 0.96) {
      alpha = 1.0 - (progress - 0.92) / 0.04;
    }
    this.group.visible = alpha > 0.01;
  }

  public dispose() {
    this.vortexMesh.geometry.dispose();
    this.vortexMat.dispose();
    this.windGeo.dispose();
    (this.windPoints.material as THREE.Material).dispose();
    if (this.lightningLines) {
      this.lightningLines.geometry.dispose();
      (this.lightningLines.material as THREE.Material).dispose();
    }
  }
}
