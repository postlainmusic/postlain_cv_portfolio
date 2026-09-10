/**
 * STORM 3D WORLD — THE CLOUD RIFT
 * 3D Swirling Electric Cloud Vortex, Branching Lightning Arcs,
 * Physical Cloud Veil Split, and Soft High-Voltage Violet Sparks.
 */

import * as THREE from 'three';
import { createSoftGlowTexture } from '../utils/textureUtils';

export class Storm3DWorld {
  public group: THREE.Group;
  private vortexMesh: THREE.Mesh;
  private vortexMaterial: THREE.ShaderMaterial;
  private lightningLines: THREE.LineSegments;
  private lightningGeo: THREE.BufferGeometry;
  private electricPoints: THREE.Points;
  private electricGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. Swirling Cloud Vortex Cylinder
    const vortexGeo = new THREE.CylinderGeometry(9, 18, 18, 36, 1, true);
    vortexGeo.rotateX(Math.PI / 2);

    this.vortexMaterial = new THREE.ShaderMaterial({
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
          // Swirling vortex torque
          float angle = pos.z * 0.18 + uTime * 1.5;
          float s = sin(angle);
          float c = cos(angle);
          pos.xy = mat2(c, -s, s, c) * pos.xy;

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
          vec2 uv = vUv * 6.0;
          float noise1 = sin(uv.x * 2.0 + uTime * 2.0) * cos(uv.y * 3.0 - uTime * 1.5);
          float noise2 = sin(uv.y * 4.0 + uTime * 3.0);
          float cloudDensity = smoothstep(-0.2, 0.6, noise1 + noise2);

          // Electric Storm Palette: Midnight indigo to high-voltage cyan
          vec3 stormDark = vec3(0.02, 0.03, 0.06);
          vec3 electricViolet = vec3(0.35, 0.15, 0.65);
          vec3 lightningCyan = vec3(0.25, 0.75, 1.0);

          vec3 color = mix(stormDark, electricViolet, cloudDensity * 0.7);
          color += lightningCyan * pow(max(0.0, sin(uTime * 12.0) * noise2), 4.0) * 1.5;

          // Rift split: Veil tears open in the center
          float riftMask = 1.0 - smoothstep(0.4, 0.6, abs(vUv.x - 0.5) * 2.0) * uRift;
          float alpha = cloudDensity * 0.75 * riftMask;

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.vortexMesh = new THREE.Mesh(vortexGeo, this.vortexMaterial);
    this.vortexMesh.position.set(0, 0, -4);
    this.group.add(this.vortexMesh);

    // 2. Branching Lightning Arcs
    const maxLightningSegments = 24;
    const lightningPositions = new Float32Array(maxLightningSegments * 6);
    this.lightningGeo = new THREE.BufferGeometry();
    this.lightningGeo.setAttribute('position', new THREE.BufferAttribute(lightningPositions, 3));

    const lightningMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    this.lightningLines = new THREE.LineSegments(this.lightningGeo, lightningMat);
    this.group.add(this.lightningLines);

    // 3. High-Voltage Electric Sparks
    const sparkCount = 60;
    const sparkPositions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 14;
      sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }

    this.electricGeo = new THREE.BufferGeometry();
    this.electricGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const electricMat = new THREE.PointsMaterial({
      color: 0xa5b4fc,
      map: createSoftGlowTexture('#818cf8'),
      size: 0.52,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.electricPoints = new THREE.Points(this.electricGeo, electricMat);
    this.group.add(this.electricPoints);
  }

  public update(progress: number, time: number) {
    this.vortexMaterial.uniforms.uTime.value = time;

    // Rift split parameter: 0.86 -> 0.94
    const riftProgress = Math.max(0, Math.min(1, (progress - 0.86) / 0.08));
    this.vortexMaterial.uniforms.uRift.value = riftProgress;

    // Procedural Lightning Arcs Generation
    const pos = this.lightningGeo.attributes.position.array as Float32Array;
    let startX = (Math.random() - 0.5) * 6;
    let startY = 5;
    let startZ = -3;

    for (let i = 0; i < 24; i++) {
      const idx = i * 6;
      pos[idx] = startX;
      pos[idx + 1] = startY;
      pos[idx + 2] = startZ;

      const nextX = startX + (Math.random() - 0.5) * 2.2;
      const nextY = startY - 0.45;
      const nextZ = startZ + (Math.random() - 0.5) * 1.5;

      pos[idx + 3] = nextX;
      pos[idx + 4] = nextY;
      pos[idx + 5] = nextZ;

      startX = nextX;
      startY = nextY;
      startZ = nextZ;
    }
    this.lightningGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: 0.84 -> 0.94
    let alpha = 0;
    if (progress >= 0.84 && progress < 0.88) {
      alpha = (progress - 0.84) / 0.04;
    } else if (progress >= 0.88 && progress <= 0.91) {
      alpha = 1.0;
    } else if (progress > 0.91 && progress <= 0.94) {
      alpha = 1.0 - (progress - 0.91) / 0.03;
    }
    this.group.visible = alpha > 0.01;
  }

  public dispose() {
    this.vortexMesh.geometry.dispose();
    this.vortexMaterial.dispose();
    this.lightningGeo.dispose();
    (this.lightningLines.material as THREE.Material).dispose();
    this.electricGeo.dispose();
    (this.electricPoints.material as THREE.Material).dispose();
  }
}
