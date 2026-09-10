/**
 * MOON 3D WORLD — THE CELESTIAL GATEWAY & CONSTELLATION NETWORK
 * 3D Atmospheric Moon Sphere, Concentric Soundwave Orbits (Hidden Music),
 * Raycasted Constellation Nodes, and Soft Luminous Starfield.
 */

import * as THREE from 'three';
import { createSoftGlowTexture } from '../utils/textureUtils';

export interface ConstellationTarget {
  id: string;
  name: string;
  url: string;
  position: THREE.Vector3;
  mesh: THREE.Mesh;
}

export class Moon3DWorld {
  public group: THREE.Group;
  private moonMesh: THREE.Mesh;
  private moonCorona: THREE.Mesh;
  private soundWaveRings: THREE.LineLoop[] = [];
  public constellationTargets: ConstellationTarget[] = [];
  private starPoints: THREE.Points;
  private starGeo: THREE.BufferGeometry;

  constructor() {
    this.group = new THREE.Group();

    // 1. 3D Atmospheric Moon Sphere (Positioned top-right in deep celestial space)
    const moonGeo = new THREE.SphereGeometry(3.6, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.85,
      metalness: 0.05,
      emissive: 0x222630,
      emissiveIntensity: 0.35,
    });

    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonMesh.position.set(4.2, 1.2, -5.5);
    this.group.add(this.moonMesh);

    // Soft Atmospheric Corona Glow
    const coronaGeo = new THREE.SphereGeometry(4.2, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    this.moonCorona = new THREE.Mesh(coronaGeo, coronaMat);
    this.moonCorona.position.copy(this.moonMesh.position);
    this.group.add(this.moonCorona);

    // 2. Concentric Resonant Soundwave Orbits (Hidden Music Gateway - Left side)
    const soundOrigin = new THREE.Vector3(-4.0, 0, -3.5);
    const ringRadii = [2.0, 3.2, 4.5, 5.8];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      ringGeo.setFromPoints(points);

      const ringMat = new THREE.LineBasicMaterial({
        color: i === 0 ? 0x38bdf8 : 0x475569,
        transparent: true,
        opacity: 0.35 - i * 0.06,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.LineLoop(ringGeo, ringMat);
      ring.position.copy(soundOrigin);
      this.group.add(ring);
      this.soundWaveRings.push(ring);
    });

    // 3. Interactive Constellation Network Nodes
    const channels = [
      { id: 'hotline', name: 'Hotline / Zalo: 0938-649-420', url: 'tel:0938649420', pos: new THREE.Vector3(-0.2, 0.2, -2.5) },
      { id: 'email', name: 'Email: studionopu@gmail.com', url: 'mailto:studionopu@gmail.com', pos: new THREE.Vector3(1.5, -1.8, -2.5) },
    ];

    channels.forEach((c) => {
      const nodeGeo = new THREE.SphereGeometry(0.28, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(c.pos);
      this.group.add(nodeMesh);

      this.constellationTargets.push({
        id: c.id,
        name: c.name,
        url: c.url,
        position: c.pos,
        mesh: nodeMesh,
      });
    });

    // 4. Soft Luminous Deep Starfield
    const starCount = 120;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 35;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }

    this.starGeo = new THREE.BufferGeometry();
    this.starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      map: createSoftGlowTexture('#ffffff'),
      size: 0.38,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.starPoints = new THREE.Points(this.starGeo, starMat);
    this.group.add(this.starPoints);
  }

  public update(progress: number, time: number) {
    // Moon subtle rotation
    this.moonMesh.rotation.y = time * 0.04;
    this.moonCorona.position.copy(this.moonMesh.position);

    // Soundwave rings gentle pulsation
    this.soundWaveRings.forEach((ring, idx) => {
      const scale = 1.0 + Math.sin(time * 2.0 - idx * 0.5) * 0.035;
      ring.scale.set(scale, scale, 1);
    });

    // Constellation node breathing glow
    this.constellationTargets.forEach((t, idx) => {
      const s = 1.0 + Math.sin(time * 3.0 + idx * 2.0) * 0.12;
      t.mesh.scale.set(s, s, s);
    });

    // World Visibility Envelope: 0.88 -> 1.00
    let alpha = 0;
    if (progress >= 0.88) {
      alpha = Math.min(1.0, (progress - 0.88) / 0.08);
    }
    this.group.visible = alpha > 0.01;
    this.group.position.y = (1.0 - alpha) * 4;
  }

  public handleIntersect(object: THREE.Object3D): ConstellationTarget | null {
    return this.constellationTargets.find((t) => t.mesh === object) || null;
  }

  public handleNodeClick(target: ConstellationTarget) {
    window.open(target.url, '_blank', 'noopener,noreferrer');
  }

  public dispose() {
    this.moonMesh.geometry.dispose();
    (this.moonMesh.material as THREE.Material).dispose();
    this.moonCorona.geometry.dispose();
    (this.moonCorona.material as THREE.Material).dispose();
    this.soundWaveRings.forEach((r) => {
      r.geometry.dispose();
      (r.material as THREE.Material).dispose();
    });
    this.constellationTargets.forEach((t) => {
      t.mesh.geometry.dispose();
      (t.mesh.material as THREE.Material).dispose();
    });
    this.starGeo.dispose();
    (this.starPoints.material as THREE.Material).dispose();
  }
}
