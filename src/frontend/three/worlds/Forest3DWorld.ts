/**
 * FOREST 3D WORLD — 4 MONUMENTAL REDWOOD TREES & GOD RAYS
 * Towering 3D Cylindrical Redwood Trunks, Volumetric God Ray Cones,
 * Drifting 3D Foliage Leaves, and Horizontal Dolly Coordination.
 */

import * as THREE from 'three';

export class Forest3DWorld {
  public group: THREE.Group;
  private trees: THREE.Mesh[] = [];
  private godRays: THREE.Mesh[] = [];
  private leafPoints: THREE.Points;
  private leafGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. 3D Redwood Trunk Bark Material
    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x221812,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });

    // 4 Monumental Redwood Trees spaced horizontally across tracking span
    const treeXPositions = [-24, -8, 8, 24];
    for (let i = 0; i < treeXPositions.length; i++) {
      const treeGeo = new THREE.CylinderGeometry(2.4, 3.8, 40, 24);
      const treeMesh = new THREE.Mesh(treeGeo, barkMat);
      treeMesh.position.set(treeXPositions[i], 0, -12);
      this.trees.push(treeMesh);
      this.group.add(treeMesh);

      // Volumetric 3D God Ray Cone for each tree
      const rayGeo = new THREE.ConeGeometry(5, 28, 16, 1, true);
      rayGeo.rotateZ(Math.PI);
      rayGeo.translate(0, 4, 0);

      const rayMat = new THREE.MeshBasicMaterial({
        color: 0xfef08a,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      const rayMesh = new THREE.Mesh(rayGeo, rayMat);
      rayMesh.position.set(treeXPositions[i] + 1.2, 2, -11);
      rayMesh.rotation.z = -0.15;
      this.godRays.push(rayMesh);
      this.group.add(rayMesh);
    }

    // 2. Drifting 3D Organic Foliage Leaves
    const leafCount = 180;
    const leafPositions = new Float32Array(leafCount * 3);
    for (let i = 0; i < leafCount; i++) {
      leafPositions[i * 3] = (Math.random() - 0.5) * 60;
      leafPositions[i * 3 + 1] = Math.random() * 20 - 5;
      leafPositions[i * 3 + 2] = -12 + (Math.random() - 0.5) * 16;
    }

    this.leafGeo = new THREE.BufferGeometry();
    this.leafGeo.setAttribute('position', new THREE.BufferAttribute(leafPositions, 3));

    const leafMat = new THREE.PointsMaterial({
      color: 0x86efac,
      size: 0.28,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending,
    });

    this.leafPoints = new THREE.Points(this.leafGeo, leafMat);
    this.group.add(this.leafPoints);
  }

  public update(progress: number, time: number) {
    // Camera horizontal track across the 4 trees in progress [0.52, 0.84]
    const forestProgress = Math.max(0, Math.min(1, (progress - 0.52) / 0.32));
    this.group.position.x = 24 - forestProgress * 48; // Smooth dolly across the 4 trees

    // God rays gentle pulsing
    for (let i = 0; i < this.godRays.length; i++) {
      const ray = this.godRays[i];
      (ray.material as THREE.MeshBasicMaterial).opacity = 0.08 + Math.sin(time * 1.5 + i) * 0.04;
    }

    // Leaf flutter
    const positions = this.leafGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.02 + Math.random() * 0.01; // falling
      positions[i] += Math.sin(time + positions[i + 1]) * 0.02;

      if (positions[i + 1] < -6) {
        positions[i + 1] = 15;
      }
    }
    this.leafGeo.attributes.position.needsUpdate = true;

    // World Visibility Envelope: 0.50 -> 0.88
    let alpha = 0;
    if (progress >= 0.50 && progress < 0.58) {
      alpha = (progress - 0.50) / 0.08;
    } else if (progress >= 0.58 && progress <= 0.82) {
      alpha = 1.0;
    } else if (progress > 0.82 && progress <= 0.88) {
      alpha = 1.0 - (progress - 0.82) / 0.06;
    }
    this.group.visible = alpha > 0.01;
  }

  public dispose() {
    for (const tree of this.trees) {
      tree.geometry.dispose();
      (tree.material as THREE.Material).dispose();
    }
    for (const ray of this.godRays) {
      ray.geometry.dispose();
      (ray.material as THREE.Material).dispose();
    }
    this.leafGeo.dispose();
    (this.leafPoints.material as THREE.Material).dispose();
  }
}
