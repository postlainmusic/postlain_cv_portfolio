/**
 * MOON 3D WORLD — LIVING CELESTIAL HORIZON & INTERACTIVE CONSTELLATIONS
 * 3D Textured Moon Sphere with Corona Shader, Resonant Hidden Music Orb,
 * 3D Starlight Nebula Field, and Raycasted Constellation Network.
 */

import * as THREE from 'three';
import { AUTOBIOGRAPHY_DATA } from '../../narrative/data/autobiographyData';

export interface ConstellationTarget {
  id: 'phone' | 'email' | 'hiddenmusic' | 'identity';
  mesh: THREE.Mesh;
  label: string;
  subLabel: string;
  copyValue?: string;
  url?: string;
}

export class Moon3DWorld {
  public group: THREE.Group;
  private moonMesh: THREE.Mesh;
  private coronaMesh: THREE.Mesh;
  private hiddenMusicOrb: THREE.Mesh;
  private pulseRings: THREE.Mesh[] = [];
  private starPoints: THREE.Points;
  private starGeo: THREE.BufferGeometry;
  private constellationLines!: THREE.LineSegments;

  public constellationTargets: ConstellationTarget[] = [];
  public toastMessage: string | null = null;
  private toastTimer: number = 0;

  constructor() {
    this.group = new THREE.Group();

    // 1. 3D Crescent Moon Sphere with Atmospheric Corona Glow
    const moonGeo = new THREE.SphereGeometry(3.6, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.85,
      metalness: 0.15,
      emissive: 0x93c5fd,
      emissiveIntensity: 0.15,
    });

    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonMesh.position.set(7.5, 4.2, -14);
    this.group.add(this.moonMesh);

    // Multi-Layer Corona Glow Disc
    const coronaGeo = new THREE.PlaneGeometry(16, 16);
    const coronaMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, dist);
          vec3 coronaColor = vec3(0.72, 0.88, 1.0);
          gl_FragColor = vec4(coronaColor, alpha * 0.45);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    this.coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    this.coronaMesh.position.set(7.5, 4.2, -14.2);
    this.group.add(this.coronaMesh);

    // 2. Resonant Hidden Music Living Crystalline Orb
    const orbGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.85,
    });
    this.hiddenMusicOrb = new THREE.Mesh(orbGeo, orbMat);
    this.hiddenMusicOrb.position.set(-6.5, -0.5, -10);
    this.group.add(this.hiddenMusicOrb);

    // Concentric 3D Sound Wave Rings
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(1.8 + i * 0.8, 1.9 + i * 0.8, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4 - i * 0.1,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(-6.5, -0.5, -10);
      this.pulseRings.push(ringMesh);
      this.group.add(ringMesh);
    }

    // 3. 3D Starfield Nebula Points
    const starCount = 380;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 2] = -18 + (Math.random() - 0.5) * 16;
    }

    this.starGeo = new THREE.BufferGeometry();
    this.starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xf8fafc,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    this.starPoints = new THREE.Points(this.starGeo, starMat);
    this.group.add(this.starPoints);

    // 4. 3D Interactive Constellation Nodes & Connecting Lines
    this.initConstellations();
  }

  private initConstellations() {
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });

    // Identity Node
    const idMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), nodeMat.clone());
    idMesh.position.set(2.5, 0.5, -10);
    this.group.add(idMesh);
    this.constellationTargets.push({
      id: 'identity',
      mesh: idMesh,
      label: AUTOBIOGRAPHY_DATA.identity.name,
      subLabel: AUTOBIOGRAPHY_DATA.identity.roleTitle.vi,
    });

    // Phone Node
    const phoneMesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), nodeMat.clone());
    phoneMesh.position.set(2.5, -1.8, -10);
    this.group.add(phoneMesh);
    this.constellationTargets.push({
      id: 'phone',
      mesh: phoneMesh,
      label: `HOTLINE: ${AUTOBIOGRAPHY_DATA.identity.hotline}`,
      subLabel: 'Click to copy number',
      copyValue: AUTOBIOGRAPHY_DATA.identity.hotline,
    });

    // Email Node
    const emailMesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), nodeMat.clone());
    emailMesh.position.set(2.5, -3.8, -10);
    this.group.add(emailMesh);
    this.constellationTargets.push({
      id: 'email',
      mesh: emailMesh,
      label: `EMAIL: ${AUTOBIOGRAPHY_DATA.identity.email}`,
      subLabel: 'Click to write email',
      copyValue: AUTOBIOGRAPHY_DATA.identity.email,
    });

    // Hidden Music Portal Target
    this.constellationTargets.push({
      id: 'hiddenmusic',
      mesh: this.hiddenMusicOrb,
      label: 'HIDDEN MUSIC',
      subLabel: 'Living Sonic Platform ↗',
      url: 'https://hiddenmusic.postlain.com',
    });

    // Connecting 3D Constellation Vectors
    const linePoints: number[] = [
      -6.5, -0.5, -10, 2.5, 0.5, -10,
      2.5, 0.5, -10, 2.5, -1.8, -10,
      2.5, -1.8, -10, 2.5, -3.8, -10,
    ];

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    this.constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    this.group.add(this.constellationLines);
  }

  public handleIntersect(intersectedMesh: THREE.Object3D | null): ConstellationTarget | null {
    if (!intersectedMesh) return null;
    return this.constellationTargets.find((t) => t.mesh === intersectedMesh) || null;
  }

  public handleNodeClick(target: ConstellationTarget) {
    if (target.url) {
      window.open(target.url, '_blank', 'noopener,noreferrer');
    } else if (target.copyValue) {
      navigator.clipboard.writeText(target.copyValue);
      this.toastMessage = `Copied ${target.copyValue} to clipboard!`;
      this.toastTimer = 3.0;
    }
  }

  public update(progress: number, time: number) {
    // Moon gentle rotation
    this.moonMesh.rotation.y = time * 0.05;
    this.hiddenMusicOrb.rotation.y = time * 0.2;

    // Pulse wave rings animation
    for (let i = 0; i < this.pulseRings.length; i++) {
      const ring = this.pulseRings[i];
      const scale = 1.0 + ((time * 0.8 + i * 0.4) % 1.2);
      ring.scale.set(scale, scale, 1);
      (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.5 - (scale - 1.0) * 0.4);
    }

    if (this.toastTimer > 0) {
      this.toastTimer -= 0.016;
      if (this.toastTimer <= 0) {
        this.toastMessage = null;
      }
    }

    // World Visibility Envelope: 0.88 -> 1.00
    const alpha = Math.max(0, Math.min(1, (progress - 0.88) / 0.06));
    this.group.visible = alpha > 0.01;
  }

  public dispose() {
    this.moonMesh.geometry.dispose();
    (this.moonMesh.material as THREE.Material).dispose();
    this.coronaMesh.geometry.dispose();
    (this.coronaMesh.material as THREE.Material).dispose();
    this.hiddenMusicOrb.geometry.dispose();
    (this.hiddenMusicOrb.material as THREE.Material).dispose();
    for (const r of this.pulseRings) {
      r.geometry.dispose();
      (r.material as THREE.Material).dispose();
    }
    this.starGeo.dispose();
    (this.starPoints.material as THREE.Material).dispose();
    this.constellationLines.geometry.dispose();
    (this.constellationLines.material as THREE.Material).dispose();
  }
}
