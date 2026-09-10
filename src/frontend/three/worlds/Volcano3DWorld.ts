/**
 * VOLCANO 3D WORLD — FORGE OF IDENTITY
 * 3D Caldera Cone Mesh, GLSL Voronoi Molten Magma Convection Shader,
 * Thermal Emission, Volcanic Sparks, and Basalt Cooling Physics.
 */

import * as THREE from 'three';

export class Volcano3DWorld {
  public group: THREE.Group;
  private calderaMesh: THREE.Mesh;
  private magmaMesh: THREE.Mesh;
  private magmaMaterial: THREE.ShaderMaterial;
  private sparkPoints: THREE.Points;
  private sparkGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. 3D Volcanic Caldera Rim Mesh
    const calderaGeo = new THREE.CylinderGeometry(14, 26, 12, 48, 1, true);
    calderaGeo.translate(0, -6, -10);

    const calderaMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.95,
      metalness: 0.1,
      flatShading: true,
    });
    this.calderaMesh = new THREE.Mesh(calderaGeo, calderaMat);
    this.group.add(this.calderaMesh);

    // 2. Molten Magma Lake with GLSL Voronoi Convection Shader
    const magmaGeo = new THREE.CircleGeometry(13.8, 64);
    magmaGeo.rotateX(-Math.PI / 2);
    magmaGeo.translate(0, -5.8, -10);

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
          // Subsurface boiling turbulence
          pos.y += sin(pos.x * 0.8 + uTime * 2.0) * cos(pos.z * 0.8 + uTime * 1.5) * 0.25;
          vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uCooling;
        varying vec2 vUv;
        varying vec3 vWorldPos;

        // Voronoi Cellular Noise
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
              o = 0.5 + 0.5 * sin(uTime * 1.5 + 6.2831 * o);
              vec2 r = g + o - f;
              float d = dot(r, r);
              if (d < md) md = d;
            }
          }
          return sqrt(md);
        }

        void main() {
          vec2 uv = (vUv - 0.5) * 8.0;
          float v1 = voronoi(uv);
          float v2 = voronoi(uv * 2.0 + uTime * 0.3);
          float lavaFissure = smoothstep(0.12, 0.48, v1 * 0.7 + v2 * 0.3);

          // Glowing Molten Magma Spectrum
          vec3 moltenCore = vec3(1.0, 0.85, 0.25) * 3.2; // Intense incandescent yellow-white
          vec3 moltenLiquid = vec3(1.0, 0.32, 0.02) * 2.4; // Glowing lava orange
          vec3 basaltCrust = vec3(0.06, 0.04, 0.05); // Cooling black crust

          vec3 color = mix(moltenCore, moltenLiquid, smoothstep(0.0, 0.35, lavaFissure));
          color = mix(color, basaltCrust, smoothstep(0.35, 0.85, lavaFissure));

          // Crust cools and darkens as cooling progress advances
          color = mix(color, basaltCrust * 0.8, uCooling * 0.85);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    this.magmaMesh = new THREE.Mesh(magmaGeo, this.magmaMaterial);
    this.group.add(this.magmaMesh);

    // 3. Dynamic 3D Incandescent Volcanic Sparks
    const sparkCount = 220;
    const sparkPositions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 16;
      sparkPositions[i * 3 + 1] = -5.5 + Math.random() * 14;
      sparkPositions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 16;
    }

    this.sparkGeo = new THREE.BufferGeometry();
    this.sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.22,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    this.sparkPoints = new THREE.Points(this.sparkGeo, sparkMat);
    this.group.add(this.sparkPoints);
  }

  public update(progress: number, time: number) {
    this.magmaMaterial.uniforms.uTime.value = time;

    // Cooling transition: 0.32 -> 0.44
    const coolingProgress = Math.max(0, Math.min(1, (progress - 0.32) / 0.12));
    this.magmaMaterial.uniforms.uCooling.value = coolingProgress;

    // Sparks upward simulation
    const positions = this.sparkGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += 0.08 + Math.random() * 0.04; // rise
      positions[i] += Math.sin(time * 2.0 + positions[i + 1]) * 0.02;

      if (positions[i + 1] > 10) {
        positions[i + 1] = -5.5;
        positions[i] = (Math.random() - 0.5) * 14;
      }
    }
    this.sparkGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: Active between 0.12 -> 0.44
    let alpha = 0;
    if (progress >= 0.12 && progress < 0.22) {
      alpha = (progress - 0.12) / 0.10;
    } else if (progress >= 0.22 && progress <= 0.36) {
      alpha = 1.0;
    } else if (progress > 0.36 && progress <= 0.44) {
      alpha = 1.0 - (progress - 0.36) / 0.08;
    }
    this.group.visible = alpha > 0.01;
  }

  public dispose() {
    this.calderaMesh.geometry.dispose();
    (this.calderaMesh.material as THREE.Material).dispose();
    this.magmaMesh.geometry.dispose();
    this.magmaMaterial.dispose();
    this.sparkGeo.dispose();
    (this.sparkPoints.material as THREE.Material).dispose();
  }
}
