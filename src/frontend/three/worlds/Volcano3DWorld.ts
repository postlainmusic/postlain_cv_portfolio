/**
 * VOLCANO 3D WORLD — FORGE OF IDENTITY
 * 3D Caldera Mesh, GLSL Voronoi Molten Magma Convection Shader,
 * Incandescent Thermal Emission, Volcanic Sparks, and Basalt Cooling Physics.
 */

import * as THREE from 'three';
import { createSoftGlowTexture } from '../utils/textureUtils';

export class Volcano3DWorld {
  public group: THREE.Group;
  private magmaMesh: THREE.Mesh;
  private magmaMaterial: THREE.ShaderMaterial;
  private sparkPoints: THREE.Points;
  private sparkGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. Molten Magma Lake with GLSL Voronoi Convection Shader
    const magmaGeo = new THREE.PlaneGeometry(42, 36, 80, 80);
    magmaGeo.rotateX(-Math.PI / 2.3);
    magmaGeo.translate(0, -2.0, -1);

    this.magmaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uCooling: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        void main() {
          vUv = uv;
          vec3 pos = position;
          // Turbulent molten magma swell
          float wave = sin(pos.x * 0.4 + uTime * 2.2) * cos(pos.y * 0.4 + uTime * 1.8) * 0.45;
          pos.z += wave;

          vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uCooling;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        vec2 hash2(vec2 p) {
          return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
        }

        float voronoi(vec2 x) {
          vec2 n = floor(x);
          vec2 f = fract(x);
          float md = 8.0;
          for (int j = -1; j <= 1; j++) {
            for (int i = -1; i <= 1; i++) {
              vec2 g = vec2(float(i), float(j));
              vec2 o = hash2(n + g);
              o = 0.5 + 0.5 * sin(uTime * 1.8 + 6.2831 * o);
              vec2 r = g + o - f;
              float d = dot(r, r);
              if (d < md) md = d;
            }
          }
          return sqrt(md);
        }

        void main() {
          vec2 uv = (vUv - 0.5) * 5.0;
          float v1 = voronoi(uv);
          float v2 = voronoi(uv * 2.2 + uTime * 0.4);
          float fissure = smoothstep(0.12, 0.48, v1 * 0.7 + v2 * 0.3);

          // Glowing Incandescent Molten Magma Spectrum
          vec3 moltenCore = vec3(1.0, 0.92, 0.45) * 2.8; // Incandescent core
          vec3 moltenLava = vec3(0.98, 0.38, 0.05) * 2.2; // Glowing orange
          vec3 basaltCrust = vec3(0.05, 0.03, 0.04); // Cooling obsidian crust

          vec3 color = mix(moltenCore, moltenLava, smoothstep(0.0, 0.35, fissure));
          color = mix(color, basaltCrust, smoothstep(0.35, 0.85, fissure));

          // Crust cools and darkens
          color = mix(color, basaltCrust * 0.6, uCooling * 0.85);

          // Horizon atmospheric blend
          float fog = smoothstep(12.0, -10.0, vWorldPos.z);
          vec3 bgObsidian = vec3(0.012, 0.02, 0.032);
          color = mix(bgObsidian, color, fog * 0.9);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    this.magmaMesh = new THREE.Mesh(magmaGeo, this.magmaMaterial);
    this.group.add(this.magmaMesh);

    // 2. Volcanic Rising Sparks (Luminous soft embers)
    const sparkCount = 90;
    const sparkPositions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 16;
      sparkPositions[i * 3 + 1] = Math.random() * 8 - 2.5;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
    }

    this.sparkGeo = new THREE.BufferGeometry();
    this.sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xff6600,
      map: createSoftGlowTexture('#ff6600'),
      size: 0.5,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.sparkPoints = new THREE.Points(this.sparkGeo, sparkMat);
    this.group.add(this.sparkPoints);
  }

  public update(progress: number, time: number) {
    this.magmaMaterial.uniforms.uTime.value = time;

    // Cooling progress: 0.28 -> 0.44
    const cooling = Math.max(0, Math.min(1, (progress - 0.28) / 0.16));
    this.magmaMaterial.uniforms.uCooling.value = cooling;

    // Sparks upward simulation
    const positions = this.sparkGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += 0.045 + Math.random() * 0.02; // rise
      positions[i] += Math.sin(time * 2.0 + positions[i + 1]) * 0.01;

      if (positions[i + 1] > 6) {
        positions[i + 1] = -2.5;
        positions[i] = (Math.random() - 0.5) * 16;
      }
    }
    this.sparkGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: Active between 0.12 -> 0.44
    let alpha = 0;
    if (progress >= 0.12 && progress < 0.20) {
      alpha = (progress - 0.12) / 0.08;
    } else if (progress >= 0.20 && progress <= 0.36) {
      alpha = 1.0;
    } else if (progress > 0.36 && progress <= 0.44) {
      alpha = 1.0 - (progress - 0.36) / 0.08;
    }
    this.group.visible = alpha > 0.01;
    this.magmaMesh.position.y = -2.0 - (1.0 - alpha) * 6;
  }

  public dispose() {
    this.magmaMesh.geometry.dispose();
    this.magmaMaterial.dispose();
    this.sparkGeo.dispose();
    (this.sparkPoints.material as THREE.Material).dispose();
  }
}
