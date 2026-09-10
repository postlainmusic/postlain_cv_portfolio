/**
 * WATERFALL 3D WORLD — FLOW OF ASPIRATION
 * 3D Canyon Gorge, Cascading Water Shader with Chromatic Dispersion & Caustics,
 * and 3D Water Spray Foam Particles.
 */

import * as THREE from 'three';

export class Waterfall3DWorld {
  public group: THREE.Group;
  private waterfallMesh: THREE.Mesh;
  private poolMesh: THREE.Mesh;
  private waterMaterial: THREE.ShaderMaterial;
  private sprayPoints: THREE.Points;
  private sprayGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. Cascading Waterfall Flow Shader
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
          // Fluid wave ripple displacement
          pos.z += sin(pos.y * 3.0 + uTime * 4.0) * 0.15;
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

        // Simplex 2D
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          // Flowing UV coordinates downward
          vec2 flowUv = vec2(vUv.x * 2.0, vUv.y * 6.0 - uTime * 3.5);
          float noise = snoise(flowUv);
          float foam = smoothstep(0.45, 0.85, noise + sin(flowUv.y * 4.0) * 0.3);

          // Deep crystalline cyan-blue to white foam
          vec3 deepWater = vec3(0.04, 0.18, 0.32);
          vec3 crystalCyan = vec3(0.25, 0.75, 0.95);
          vec3 whiteFoam = vec3(0.95, 0.98, 1.0);

          vec3 color = mix(deepWater, crystalCyan, smoothstep(-0.5, 0.5, noise));
          color = mix(color, whiteFoam, foam);

          // Specular Fresnel rim light
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
          color += vec3(0.4, 0.8, 1.0) * fresnel * 0.6;

          gl_FragColor = vec4(color, 0.88);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Vertical Waterfall Sheet
    const waterfallGeo = new THREE.PlaneGeometry(8, 22, 32, 64);
    waterfallGeo.translate(0, 3, -12);
    this.waterfallMesh = new THREE.Mesh(waterfallGeo, this.waterMaterial);
    this.group.add(this.waterfallMesh);

    // Basin Pool Plane
    const poolGeo = new THREE.PlaneGeometry(30, 30, 48, 48);
    poolGeo.rotateX(-Math.PI / 2);
    poolGeo.translate(0, -8, -12);
    this.poolMesh = new THREE.Mesh(poolGeo, this.waterMaterial);
    this.group.add(this.poolMesh);

    // 2. 3D Water Spray Foam Particles
    const sprayCount = 260;
    const sprayPositions = new Float32Array(sprayCount * 3);
    for (let i = 0; i < sprayCount; i++) {
      sprayPositions[i * 3] = (Math.random() - 0.5) * 12;
      sprayPositions[i * 3 + 1] = -8 + Math.random() * 6;
      sprayPositions[i * 3 + 2] = -12 + (Math.random() - 0.5) * 10;
    }

    this.sprayGeo = new THREE.BufferGeometry();
    this.sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPositions, 3));

    const sprayMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.18,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    this.sprayPoints = new THREE.Points(this.sprayGeo, sprayMat);
    this.group.add(this.sprayPoints);
  }

  public update(progress: number, time: number) {
    this.waterMaterial.uniforms.uTime.value = time;

    // Spray particles simulation
    const positions = this.sprayGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += 0.04 + Math.random() * 0.02; // rise
      positions[i] += (Math.random() - 0.5) * 0.05;

      if (positions[i + 1] > -2) {
        positions[i + 1] = -8;
      }
    }
    this.sprayGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: 0.34 -> 0.62
    let alpha = 0;
    if (progress >= 0.34 && progress < 0.44) {
      alpha = (progress - 0.34) / 0.10;
    } else if (progress >= 0.44 && progress <= 0.54) {
      alpha = 1.0;
    } else if (progress > 0.54 && progress <= 0.62) {
      alpha = 1.0 - (progress - 0.54) / 0.08;
    }
    this.group.visible = alpha > 0.01;
  }

  public dispose() {
    this.waterfallMesh.geometry.dispose();
    this.poolMesh.geometry.dispose();
    this.waterMaterial.dispose();
    this.sprayGeo.dispose();
    (this.sprayPoints.material as THREE.Material).dispose();
  }
}
