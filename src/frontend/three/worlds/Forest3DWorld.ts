/**
 * FOREST 3D WORLD — 4 REDWOOD MONOLITHS (CAREER ROOTS)
 * 4 Cylindrical 3D Redwood Trunks (Viva Star 2019, SB Studio 2023, Phủi Steak 2024, ALDO GO! 2025),
 * Volumetric 3D God Rays, and Soft Glowing Firefly Spores.
 */

import * as THREE from 'three';
import { createSoftGlowTexture } from '../utils/textureUtils';

export class Forest3DWorld {
  public group: THREE.Group;
  private treeMeshes: THREE.Mesh[] = [];
  private godRayMeshes: THREE.Mesh[] = [];
  private sporePoints: THREE.Points;
  private sporeGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. 4 Towering 3D Redwood Trunks (Positioned in deep perspective)
    const trunkConfigs = [
      { x: -7.5, z: -5.0, radius: 1.6, height: 26, color: 0x221812 }, // Viva Star Coffee (2019)
      { x: -2.8, z: -7.5, radius: 1.4, height: 26, color: 0x1e1610 }, // SB Studio (2023)
      { x: 2.8, z: -7.5, radius: 1.4, height: 26, color: 0x1e1610 },  // Phủi Steak (2024)
      { x: 7.5, z: -5.0, radius: 1.6, height: 26, color: 0x221812 },  // ALDO GO! (2025)
    ];

    trunkConfigs.forEach((cfg) => {
      const geo = new THREE.CylinderGeometry(cfg.radius * 0.9, cfg.radius * 1.15, cfg.height, 28);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.92,
        metalness: 0.08,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.x, 0, cfg.z);
      this.group.add(mesh);
      this.treeMeshes.push(mesh);
    });

    // 2. Volumetric 3D God Ray Cones (Translucent golden light shafts)
    for (let i = 0; i < 3; i++) {
      const coneGeo = new THREE.ConeGeometry(3.5, 20, 16, 1, true);
      coneGeo.rotateZ(0.2 - i * 0.18);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.045,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const coneMesh = new THREE.Mesh(coneGeo, coneMat);
      coneMesh.position.set(-4 + i * 4, 3, -6);
      this.group.add(coneMesh);
      this.godRayMeshes.push(coneMesh);
    }

    // 3. Soft Glowing Emerald & Golden Forest Firefly Spores
    const sporeCount = 75;
    const sporePositions = new Float32Array(sporeCount * 3);
    for (let i = 0; i < sporeCount; i++) {
      sporePositions[i * 3] = (Math.random() - 0.5) * 22;
      sporePositions[i * 3 + 1] = Math.random() * 12 - 5;
      sporePositions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }

    this.sporeGeo = new THREE.BufferGeometry();
    this.sporeGeo.setAttribute('position', new THREE.BufferAttribute(sporePositions, 3));

    const sporeMat = new THREE.PointsMaterial({
      color: 0xa7f3d0,
      map: createSoftGlowTexture('#34d399'),
      size: 0.48,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.sporePoints = new THREE.Points(this.sporeGeo, sporeMat);
    this.group.add(this.sporePoints);
  }

  public update(progress: number, time: number) {
    // Subtle tree breathing and spore drifting
    const positions = this.sporeGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time * 1.5 + positions[i]) * 0.008;
      positions[i] += Math.cos(time * 1.2 + positions[i + 1]) * 0.006;
    }
    this.sporeGeo.attributes.position.needsUpdate = true;

    // Subtle godray pulsing
    this.godRayMeshes.forEach((ray, idx) => {
      ray.rotation.z = 0.2 - idx * 0.18 + Math.sin(time * 0.5 + idx) * 0.03;
    });

    // World Visibility Envelope: 0.52 -> 0.88
    let alpha = 0;
    if (progress >= 0.52 && progress < 0.58) {
      alpha = (progress - 0.52) / 0.06;
    } else if (progress >= 0.58 && progress <= 0.82) {
      alpha = 1.0;
    } else if (progress > 0.82 && progress <= 0.88) {
      alpha = 1.0 - (progress - 0.82) / 0.06;
    }
    this.group.visible = alpha > 0.01;
    this.group.position.y = (1.0 - alpha) * -5;
  }

  public dispose() {
    this.treeMeshes.forEach((m) => {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    });
    this.godRayMeshes.forEach((m) => {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    });
    this.sporeGeo.dispose();
    (this.sporePoints.material as THREE.Material).dispose();
  }
}
