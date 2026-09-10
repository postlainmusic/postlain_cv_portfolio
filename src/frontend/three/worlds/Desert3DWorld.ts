/**
 * DESERT 3D WORLD — THE AWAKENING HORIZON
 * Three.js Procedural Dune Mesh, GLSL Vertex Displacement, Golden Rim Lighting,
 * 3D Dust Particles, and Subsurface Thermal Fissures.
 */

import * as THREE from 'three';

export class Desert3DWorld {
  public group: THREE.Group;
  private duneMesh: THREE.Mesh;
  private duneMaterial: THREE.ShaderMaterial;
  private dustPoints: THREE.Points;
  private dustGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. Procedural 3D Dunes Geometry & Shader
    const geometry = new THREE.PlaneGeometry(80, 80, 100, 100);
    geometry.rotateX(-Math.PI / 2.2);
    geometry.translate(0, -3.5, -8);

    this.duneMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uHeat: { value: 0 },
        uSunDirection: { value: new THREE.Vector3(0.4, 0.8, -0.6).normalize() },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uHeat;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;

        // FBM 2D Noise
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Rolling sand dune ridges
          float duneHeight = sin(pos.x * 0.12 + cos(pos.y * 0.08) * 1.5) * 2.8;
          duneHeight += fbm(pos.xy * 0.08) * 1.8;
          
          // Thermal fissure distortion when heating up
          duneHeight -= uHeat * sin(pos.x * 0.4) * 0.6;

          pos.z += duneHeight;
          vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
          vNormal = normalize(normalMatrix * normal);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uHeat;
        uniform vec3 uSunDirection;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPos;

        void main() {
          // Warm sand palette
          vec3 baseSand = vec3(0.18, 0.11, 0.06);
          vec3 sunLitSand = vec3(0.88, 0.62, 0.32);
          vec3 ambientSky = vec3(0.08, 0.06, 0.09);

          // Directional Sun lighting & Grazing Rim Light
          float NdotL = max(0.0, dot(vNormal, uSunDirection));
          vec3 color = mix(baseSand, sunLitSand, NdotL * 1.2);
          color += ambientSky * 0.4;

          // Subsurface incandescent fissure glow
          if (uHeat > 0.01) {
            float fissurePattern = sin(vWorldPos.x * 1.8 + sin(vWorldPos.z * 1.2) * 3.0);
            float fissureMask = smoothstep(0.85, 0.98, fissurePattern) * uHeat;
            vec3 magmaGlow = vec3(1.0, 0.35, 0.05) * 2.8;
            color = mix(color, magmaGlow, fissureMask);
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    this.duneMesh = new THREE.Mesh(geometry, this.duneMaterial);
    this.group.add(this.duneMesh);

    // 2. Drifting 3D Golden Sand Dust Particles
    const dustCount = 180;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 40;
      dustPositions[i * 3 + 1] = Math.random() * 12 - 2;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }

    this.dustGeo = new THREE.BufferGeometry();
    this.dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.15,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    this.dustPoints = new THREE.Points(this.dustGeo, dustMat);
    this.group.add(this.dustPoints);
  }

  public update(progress: number, time: number) {
    this.duneMaterial.uniforms.uTime.value = time;

    // Heat fissures ramp up between progress 0.06 -> 0.18
    const heatProgress = Math.max(0, Math.min(1, (progress - 0.06) / 0.10));
    this.duneMaterial.uniforms.uHeat.value = heatProgress;

    // Drifting dust simulation
    const positions = this.dustGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += 0.012; // drift right
      positions[i + 1] += Math.sin(time + positions[i]) * 0.005;

      if (positions[i] > 20) {
        positions[i] = -20;
      }
    }
    this.dustGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: 0.00 -> 0.22
    let alpha = 1.0;
    if (progress > 0.14) {
      alpha = Math.max(0, 1.0 - (progress - 0.14) / 0.08);
    }
    this.group.visible = alpha > 0.01;
    this.duneMesh.position.y = -3.5 - (1.0 - alpha) * 10;
  }

  public dispose() {
    this.duneMesh.geometry.dispose();
    this.duneMaterial.dispose();
    this.dustGeo.dispose();
    (this.dustPoints.material as THREE.Material).dispose();
  }
}
