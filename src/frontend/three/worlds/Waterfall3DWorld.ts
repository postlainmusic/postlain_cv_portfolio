/**
 * WATERFALL 3D WORLD — FLOW OF ASPIRATION
 * 3D Canyon Gorge, GLSL Water Flow & Caustics Shader,
 * Dynamic Refraction, and Soft Cyan Mist Spray Particles.
 */

import * as THREE from 'three';
import { createSoftGlowTexture } from '../utils/textureUtils';

export class Waterfall3DWorld {
  public group: THREE.Group;
  private gorgeMesh: THREE.Mesh;
  private waterMesh: THREE.Mesh;
  private waterMaterial: THREE.ShaderMaterial;
  private sprayPoints: THREE.Points;
  private sprayGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. Canyon Basalt Gorge Walls
    const gorgeGeo = new THREE.BoxGeometry(32, 14, 20);
    const gorgeMat = new THREE.MeshStandardMaterial({
      color: 0x090c10,
      roughness: 0.95,
      metalness: 0.1,
      side: THREE.BackSide,
    });
    this.gorgeMesh = new THREE.Mesh(gorgeGeo, gorgeMat);
    this.gorgeMesh.position.set(0, 0, -4);
    this.group.add(this.gorgeMesh);

    // 2. Flowing Water Plane with GLSL Caustics & Wave Displacement
    const waterGeo = new THREE.PlaneGeometry(16, 28, 64, 64);
    waterGeo.rotateX(-Math.PI / 2.5);
    waterGeo.translate(0, -1.8, -3);

    this.waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Downward cascading wave displacement
          float wave1 = sin(pos.y * 1.5 - uTime * 4.0) * 0.18;
          float wave2 = cos(pos.x * 2.0 - uTime * 2.5) * 0.12;
          pos.z += wave1 + wave2;

          vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;

        void main() {
          // Flowing caustics pattern
          vec2 uv = vUv * 8.0;
          float c1 = sin(uv.x * 3.0 + uTime * 3.0 + sin(uv.y * 4.0));
          float c2 = cos(uv.y * 3.0 - uTime * 4.0 + cos(uv.x * 4.0));
          float caustics = pow(max(0.0, c1 * c2 + 0.5), 3.0);

          // Deep aquatic indigo to bright luminous cyan
          vec3 deepWater = vec3(0.02, 0.08, 0.16);
          vec3 shallowCyan = vec3(0.12, 0.65, 0.95);
          vec3 foamWhite = vec3(0.85, 0.96, 1.0);

          vec3 color = mix(deepWater, shallowCyan, vUv.y * 0.8 + 0.2);
          color += foamWhite * caustics * 0.7;

          // Edge falloff
          float edge = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
          color *= edge;

          gl_FragColor = vec4(color, edge * 0.88);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.waterMesh = new THREE.Mesh(waterGeo, this.waterMaterial);
    this.group.add(this.waterMesh);

    // 3. Soft Glowing Cyan Water Mist & Spray Particles
    const sprayCount = 80;
    const sprayPositions = new Float32Array(sprayCount * 3);
    for (let i = 0; i < sprayCount; i++) {
      sprayPositions[i * 3] = (Math.random() - 0.5) * 12;
      sprayPositions[i * 3 + 1] = Math.random() * 6 - 3;
      sprayPositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }

    this.sprayGeo = new THREE.BufferGeometry();
    this.sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPositions, 3));

    const sprayMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      map: createSoftGlowTexture('#38bdf8'),
      size: 0.5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.sprayPoints = new THREE.Points(this.sprayGeo, sprayMat);
    this.group.add(this.sprayPoints);
  }

  public update(progress: number, time: number) {
    this.waterMaterial.uniforms.uTime.value = time;

    // Mist spray particle flow
    const positions = this.sprayGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.035; // fall down
      positions[i] += Math.sin(time * 2.0 + positions[i + 1]) * 0.015;

      if (positions[i + 1] < -3.5) {
        positions[i + 1] = 3.0;
        positions[i] = (Math.random() - 0.5) * 12;
      }
    }
    this.sprayGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: 0.38 -> 0.56
    let alpha = 0;
    if (progress >= 0.38 && progress < 0.44) {
      alpha = (progress - 0.38) / 0.06;
    } else if (progress >= 0.44 && progress <= 0.50) {
      alpha = 1.0;
    } else if (progress > 0.50 && progress <= 0.56) {
      alpha = 1.0 - (progress - 0.50) / 0.06;
    }
    this.group.visible = alpha > 0.01;
    this.group.position.y = (1.0 - alpha) * -3;
  }

  public dispose() {
    this.gorgeMesh.geometry.dispose();
    (this.gorgeMesh.material as THREE.Material).dispose();
    this.waterMesh.geometry.dispose();
    this.waterMaterial.dispose();
    this.sprayGeo.dispose();
    (this.sprayPoints.material as THREE.Material).dispose();
  }
}
