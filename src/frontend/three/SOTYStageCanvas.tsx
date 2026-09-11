import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface SOTYStageCanvasProps {
  currentSession: number;
  transitionProgress: number; // 0 to 1 during transition
  isTransitioning: boolean;
  mousePos: { x: number; y: number };
  dualTension?: number; // 0 (Logic) to 1 (Art)
}

export const SOTYStageCanvas: React.FC<SOTYStageCanvasProps> = ({
  currentSession,
  transitionProgress,
  isTransitioning,
  mousePos,
  dualTension = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uMouse: { value: THREE.Vector2 };
    uSession: { value: number };
    uTransition: { value: number };
    uDualTension: { value: number };
    uResolution: { value: THREE.Vector2 };
  }>({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uSession: { value: 0 },
    uTransition: { value: 0 },
    uDualTension: { value: 0.5 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  });

  // Track props into uniforms
  useEffect(() => {
    uniformsRef.current.uSession.value = currentSession;
    uniformsRef.current.uTransition.value = transitionProgress;
    uniformsRef.current.uDualTension.value = dualTension;
  }, [currentSession, transitionProgress, dualTension]);

  useEffect(() => {
    uniformsRef.current.uMouse.value.set(mousePos.x, mousePos.y);
  }, [mousePos]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x070809, 1);
    container.appendChild(renderer.domElement);

    // 2. Full-Screen Shader Mesh (Liquid + Shutter + Vortex + Depth Shaders combined)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uSession;
      uniform float uTransition;
      uniform float uDualTension;
      uniform vec2 uResolution;
      varying vec2 vUv;

      // Simplex noise approximation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                           -0.577350269189626,  // -1.0 + 2.0 * C.x
                            0.024390243902439); // 1.0 / 41.0
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
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
        vec2 uv = vUv;
        vec2 centeredUv = uv - 0.5;
        centeredUv.x *= uResolution.x / uResolution.y;

        // Mouse Parallax Offset
        vec2 mOffset = uMouse * 0.04;
        vec2 pUv = centeredUv + mOffset;

        // Default obsidian base color
        vec3 col = vec3(0.03, 0.035, 0.045);

        // --- SESSION 00: GENESIS TUNNEL & AMBIENT DEPTH ---
        if (uSession < 0.5) {
          float dist = length(pUv);
          float ring = sin(dist * 18.0 - uTime * 1.5) * 0.5 + 0.5;
          float glow = smoothstep(0.8, 0.0, dist);
          
          vec3 amberGlow = vec3(1.0, 0.35, 0.05) * ring * glow * 0.25;
          vec3 darkCore = vec3(0.02, 0.025, 0.03);
          col = darkCore + amberGlow;

          // Transition 0 -> 1: Depth Zoom Blast
          if (uTransition > 0.0) {
            float blast = uTransition * 8.0;
            float flare = smoothstep(0.0, 1.0, 1.0 - abs(dist - blast * 0.2));
            col += vec3(1.0, 0.45, 0.1) * flare * uTransition * 0.8;
          }
        }

        // --- SESSION 01: DUAL-ENGINE LIQUID MATRIX ---
        else if (uSession >= 0.5 && uSession < 1.5) {
          float n1 = snoise(pUv * 2.5 + vec2(uTime * 0.2, uTime * 0.15));
          float n2 = snoise(pUv * 5.0 - vec2(uTime * 0.15, uTime * 0.25));
          float liquid = (n1 + n2 * 0.5);

          // Left Logic (Cyan/Titanium) vs Right Art (Amber/Molten Orange)
          vec3 logicCol = vec3(0.05, 0.35, 0.65) * smoothstep(-0.5, 0.5, -pUv.x + liquid * 0.2);
          vec3 artCol = vec3(0.95, 0.32, 0.05) * smoothstep(-0.5, 0.5, pUv.x + liquid * 0.2);

          // Balance with uDualTension
          vec3 blended = mix(logicCol, artCol, uDualTension);
          col = vec3(0.02, 0.025, 0.03) + blended * 0.3;

          // Transition 1 -> 2: Liquid Wave Melt
          if (uTransition > 0.0) {
            float wave = sin(pUv.y * 12.0 + uTime * 4.0) * uTransition * 0.4;
            float melt = smoothstep(0.0, 1.0, uTransition + wave);
            col = mix(col, vec3(0.01, 0.012, 0.018), melt);
          }
        }

        // --- SESSION 02: 4 CRUCIBLES MECHANICAL SHUTTER GRID ---
        else if (uSession >= 1.5 && uSession < 2.5) {
          // Industrial caliper laser lines
          float gridX = abs(fract(pUv.x * 6.0) - 0.5);
          float gridY = abs(fract(pUv.y * 6.0) - 0.5);
          float laser = smoothstep(0.48, 0.5, max(gridX, gridY));

          vec3 baseGrid = vec3(0.03, 0.035, 0.04);
          vec3 laserGlow = vec3(1.0, 0.3, 0.0) * laser * 0.08;
          col = baseGrid + laserGlow;

          // Transition 2 -> 3: Kinetic Shutter Guillotine Slices
          if (uTransition > 0.0) {
            float strip = fract(pUv.x * 8.0 + pUv.y * 4.0);
            float slice = step(1.0 - uTransition, strip);
            col = mix(col, vec3(0.08, 0.02, 0.01), slice * 0.6);
          }
        }

        // --- SESSION 03: 4 COMMAND ARSENALS PARTICLE VORTEX ---
        else if (uSession >= 2.5 && uSession < 3.5) {
          float angle = atan(pUv.y, pUv.x);
          float radius = length(pUv);
          float spiral = sin(angle * 4.0 + radius * 12.0 - uTime * 2.0);
          float core = smoothstep(0.6, 0.0, radius);

          vec3 vortexCol = vec3(0.9, 0.25, 0.05) * (spiral * 0.5 + 0.5) * core * 0.35;
          vec3 ambientCyan = vec3(0.05, 0.4, 0.7) * smoothstep(0.2, 0.8, radius) * 0.15;
          col = vec3(0.025, 0.028, 0.035) + vortexCol + ambientCyan;

          // Transition 3 -> 4: Gravitational Warp Acceleration
          if (uTransition > 0.0) {
            float warpRadius = radius * (1.0 + uTransition * 4.0);
            float warpFlash = smoothstep(0.2, 0.0, abs(warpRadius - 1.0));
            col += vec3(1.0, 0.5, 0.1) * warpFlash * uTransition * 0.9;
          }
        }

        // --- SESSION 04: TERMINAL OF ENGAGEMENT MONOLITH ---
        else {
          float horizon = smoothstep(0.4, -0.6, pUv.y);
          vec3 horizonGlow = vec3(0.95, 0.35, 0.05) * horizon * 0.18;
          vec3 deepSky = vec3(0.02, 0.025, 0.035);
          
          // Subtle chromatic aberration border
          float edgeVignette = smoothstep(1.1, 0.2, length(pUv));
          col = (deepSky + horizonGlow) * edgeVignette;
        }

        // Subtle film grain
        float noise = fract(sin(dot(uv + uTime * 0.01, vec2(12.9898, 78.233))) * 43758.5453);
        col += (noise - 0.5) * 0.025;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      depthWrite: false,
      depthTest: false,
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMesh = new THREE.Mesh(quadGeo, shaderMaterial);
    scene.add(quadMesh);

    // 3. Floating 3D Micro-Particles Layer (Additive Blending)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const speedArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 12;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 8;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speedArray[i] = 0.2 + Math.random() * 0.6;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffaa44,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 4. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniformsRef.current.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 5. Single RAF Ticker via GSAP
    let lastTime = performance.now();
    const startTime = performance.now();

    const tickerUpdate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsedTime = (now - startTime) / 1000;

      uniformsRef.current.uTime.value = elapsedTime;

      // Slowly drift particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += speedArray[i] * delta * 0.3;
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -4;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Parallax camera tilt
      camera.position.x += (mousePos.x * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (-mousePos.y * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    gsap.ticker.add(tickerUpdate);

    // 6. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(tickerUpdate);

      quadGeo.dispose();
      shaderMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black"
    />
  );
};
