import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react';

export type WaterSimulation = {
  canvasRef: RefObject<HTMLCanvasElement>;
  containerRef: RefObject<HTMLElement>;
  flowState: number;
  isReducedMotion: boolean;
  nextFlowState: () => void;
  dropRipple: (normX: number, normY: number, strength?: number, radius?: number) => void;
  bind: {
    onPointerDown: (event: PointerEvent<HTMLElement>) => void;
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
  };
};

type Target = { texture: WebGLTexture; framebuffer: WebGLFramebuffer };

type Program = {
  program: WebGLProgram;
  position: number;
  uniforms: Record<string, WebGLUniformLocation | null>;
};

const SIM_COLS = 128;
const SIM_ROWS = 72;
const PRESSURE_ITERATIONS = 10;

const vertexSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const advectSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_velocity;
  uniform sampler2D u_dye;
  uniform vec2 u_texel;
  uniform vec2 u_pointer;
  uniform vec2 u_force;
  uniform float u_active;
  uniform float u_forceScale;
  uniform float u_radius;

  void main() {
    vec2 velocity = texture2D(u_velocity, v_uv).xy * 2.0 - 1.0;
    vec2 back = v_uv - velocity * u_texel * 3.0;
    vec2 advectedVelocity = texture2D(u_velocity, back).xy;
    vec4 dye = texture2D(u_dye, back);

    vec2 delta = (v_uv - u_pointer) / vec2(u_texel.y, u_texel.x);
    float distanceToPointer = length(delta);
    float brush = exp(-distanceToPointer * u_radius) * u_active;
    vec2 force = u_force * brush * u_forceScale;

    velocity = (advectedVelocity * 2.0 - 1.0) * 0.985 + force;
    float injectedDye = brush * (0.12 + length(u_force) * 1.6);
    dye.rgb = max(dye.rgb * 0.994, vec3(injectedDye));

    gl_FragColor = vec4(velocity * 0.5 + 0.5, 1.0);
  }
`;

const dyeSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_velocity;
  uniform sampler2D u_dye;
  uniform vec2 u_texel;
  uniform vec2 u_pointer;
  uniform vec2 u_force;
  uniform float u_active;
  uniform float u_forceScale;
  uniform float u_radius;

  void main() {
    vec2 velocity = texture2D(u_velocity, v_uv).xy * 2.0 - 1.0;
    vec2 back = v_uv - velocity * u_texel * 3.0;
    vec3 dye = texture2D(u_dye, back).rgb * 0.992;

    vec2 delta = (v_uv - u_pointer) / vec2(u_texel.y, u_texel.x);
    float brush = exp(-length(delta) * u_radius) * u_active;
    float energy = brush * (0.16 + length(u_force) * 2.0) * u_forceScale;
    dye += vec3(energy);

    gl_FragColor = vec4(clamp(dye, 0.0, 1.0), 1.0);
  }
`;

const divergenceSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_velocity;
  uniform vec2 u_texel;
  void main() {
    float l = texture2D(u_velocity, v_uv - vec2(u_texel.x, 0.0)).x * 2.0 - 1.0;
    float r = texture2D(u_velocity, v_uv + vec2(u_texel.x, 0.0)).x * 2.0 - 1.0;
    float b = texture2D(u_velocity, v_uv - vec2(0.0, u_texel.y)).y * 2.0 - 1.0;
    float t = texture2D(u_velocity, v_uv + vec2(0.0, u_texel.y)).y * 2.0 - 1.0;
    float divergence = 0.5 * (r - l + t - b);
    gl_FragColor = vec4(divergence * 0.5 + 0.5, 0.5, 0.5, 1.0);
  }
`;

const pressureSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_pressure;
  uniform sampler2D u_divergence;
  uniform vec2 u_texel;
  void main() {
    float l = texture2D(u_pressure, v_uv - vec2(u_texel.x, 0.0)).r * 2.0 - 1.0;
    float r = texture2D(u_pressure, v_uv + vec2(u_texel.x, 0.0)).r * 2.0 - 1.0;
    float b = texture2D(u_pressure, v_uv - vec2(0.0, u_texel.y)).r * 2.0 - 1.0;
    float t = texture2D(u_pressure, v_uv + vec2(0.0, u_texel.y)).r * 2.0 - 1.0;
    float divergence = texture2D(u_divergence, v_uv).r * 2.0 - 1.0;
    float p = (l + r + b + t - divergence) * 0.25;
    gl_FragColor = vec4(p * 0.5 + 0.5, 0.5, 0.5, 1.0);
  }
`;

const gradientSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_velocity;
  uniform sampler2D u_pressure;
  uniform vec2 u_texel;
  void main() {
    float l = texture2D(u_pressure, v_uv - vec2(u_texel.x, 0.0)).r * 2.0 - 1.0;
    float r = texture2D(u_pressure, v_uv + vec2(u_texel.x, 0.0)).r * 2.0 - 1.0;
    float b = texture2D(u_pressure, v_uv - vec2(0.0, u_texel.y)).r * 2.0 - 1.0;
    float t = texture2D(u_pressure, v_uv + vec2(0.0, u_texel.y)).r * 2.0 - 1.0;
    vec2 velocity = texture2D(u_velocity, v_uv).xy * 2.0 - 1.0;
    velocity -= vec2(r - l, t - b) * 0.5;
    velocity *= 0.997;
    gl_FragColor = vec4(velocity * 0.5 + 0.5, 1.0);
  }
`;

const renderSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_velocity;
  uniform sampler2D u_dye;
  uniform vec2 u_texel;
  uniform float u_time;
  void main() {
    vec3 dye = texture2D(u_dye, v_uv).rgb;
    vec2 velocity = texture2D(u_velocity, v_uv).xy * 2.0 - 1.0;
    float dl = texture2D(u_dye, v_uv - vec2(u_texel.x, 0.0)).r;
    float dr = texture2D(u_dye, v_uv + vec2(u_texel.x, 0.0)).r;
    float db = texture2D(u_dye, v_uv - vec2(0.0, u_texel.y)).r;
    float dt = texture2D(u_dye, v_uv + vec2(0.0, u_texel.y)).r;
    float edge = abs(dl - dr) + abs(db - dt);
    float shimmer = 0.5 + 0.5 * sin(u_time * 0.55 + velocity.x * 4.0 + v_uv.y * 7.0);

    vec3 deep = vec3(0.025, 0.075, 0.095);
    vec3 water = vec3(0.08, 0.25, 0.30);
    vec3 light = vec3(0.74, 0.82, 0.78);
    vec3 color = mix(deep, water, smoothstep(0.0, 0.42, dye.r));
    color = mix(color, light, smoothstep(0.28, 0.9, dye.r) * 0.32);
    color += light * edge * 2.0;
    color += light * shimmer * dye.r * 0.035;

    float vignette = smoothstep(1.15, 0.2, length((v_uv - 0.5) * vec2(1.08, 0.96)));
    gl_FragColor = vec4(color * vignette, 0.96);
  }
`;

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const makeProgram = (gl: WebGLRenderingContext, source: string, names: string[]): Program | null => {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, source);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  names.forEach((name) => { uniforms[name] = gl.getUniformLocation(program, name); });
  return { program, position: gl.getAttribLocation(program, 'a_position'), uniforms };
};

const makeTarget = (gl: WebGLRenderingContext, width: number, height: number): Target | null => {
  const texture = gl.createTexture();
  const framebuffer = gl.createFramebuffer();
  if (!texture || !framebuffer) return null;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  const complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return complete ? { texture, framebuffer } : null;
};

export const useWaterSimulation = (): WaterSimulation => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flowState, setFlowState] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const pointerRef = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0, active: false });
  const dropRef = useRef<{ x: number; y: number; strength: number; radius: number } | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'high-performance' });
    if (!gl) return;

    const advect = makeProgram(gl, advectSource, ['u_velocity', 'u_dye', 'u_texel', 'u_pointer', 'u_force', 'u_active', 'u_forceScale', 'u_radius']);
    const dye = makeProgram(gl, dyeSource, ['u_velocity', 'u_dye', 'u_texel', 'u_pointer', 'u_force', 'u_active', 'u_forceScale', 'u_radius']);
    const divergence = makeProgram(gl, divergenceSource, ['u_velocity', 'u_texel']);
    const pressure = makeProgram(gl, pressureSource, ['u_pressure', 'u_divergence', 'u_texel']);
    const gradient = makeProgram(gl, gradientSource, ['u_velocity', 'u_pressure', 'u_texel']);
    const render = makeProgram(gl, renderSource, ['u_velocity', 'u_dye', 'u_texel', 'u_time']);
    if (!advect || !dye || !divergence || !pressure || !gradient || !render) return;

    const quad = gl.createBuffer();
    if (!quad) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    let velocityTargets: Target[] = [];
    let dyeTargets: Target[] = [];
    let pressureTargets: Target[] = [];
    let divergenceTarget: Target | null = null;
    let velocityRead = 0;
    let dyeRead = 0;
    let pressureRead = 0;
    let width = SIM_COLS;
    let height = SIM_ROWS;
    let raf = 0;
    let last = performance.now();
    let ambientTimer = 0;

    const deleteTargets = (targets: Target[]) => targets.forEach((target) => {
      gl.deleteTexture(target.texture);
      gl.deleteFramebuffer(target.framebuffer);
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const mobile = Math.min(window.innerWidth, window.innerHeight) < 700;
      const scale = mobile ? 1 : 1;
      width = Math.max(64, Math.floor(Math.min(rect.width * (window.devicePixelRatio || 1), mobile ? 512 : 768)));
      height = Math.max(64, Math.floor(Math.min(rect.height * (window.devicePixelRatio || 1), mobile ? 512 : 768)));
      width = Math.min(width, 768);
      height = Math.min(height, 768);
      void scale;
      canvas.width = width;
      canvas.height = height;

      deleteTargets(velocityTargets);
      deleteTargets(dyeTargets);
      deleteTargets(pressureTargets);
      if (divergenceTarget) deleteTargets([divergenceTarget]);
      velocityTargets = [makeTarget(gl, width, height), makeTarget(gl, width, height)].filter(Boolean) as Target[];
      dyeTargets = [makeTarget(gl, width, height), makeTarget(gl, width, height)].filter(Boolean) as Target[];
      pressureTargets = [makeTarget(gl, width, height), makeTarget(gl, width, height)].filter(Boolean) as Target[];
      divergenceTarget = makeTarget(gl, width, height);
      velocityRead = 0;
      dyeRead = 0;
      pressureRead = 0;

      [...velocityTargets, ...dyeTargets, ...pressureTargets].forEach((target) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
        gl.clearColor(0.5, 0.5, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
      });
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    const drawQuad = (program: Program) => {
      gl.useProgram(program.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(program.position);
      gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const texture = (unit: number, target: Target, location: WebGLUniformLocation | null) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, target.texture);
      gl.uniform1i(location, unit);
    };

    const runPass = (program: Program, target: Target | null, inputs: Array<{ unit: number; target: Target; location: WebGLUniformLocation | null }>) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target?.framebuffer ?? null);
      gl.viewport(0, 0, width, height);
      inputs.forEach((input) => texture(input.unit, input.target, input.location));
      drawQuad(program);
    };

    const draw = (now: number) => {
      if (velocityTargets.length !== 2 || dyeTargets.length !== 2 || pressureTargets.length !== 2 || !divergenceTarget) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min(0.035, (now - last) / 1000);
      last = now;
      const pointer = pointerRef.current;
      const drop = dropRef.current;
      const forceX = pointer.vx;
      const forceY = pointer.vy;
      const active = pointer.active || !!drop;
      const pointerX = drop?.x ?? pointer.x;
      const pointerY = drop?.y ?? pointer.y;
      const strength = drop?.strength ?? 1;
      const radius = drop?.radius ?? 70;

      if (flowState === 1 && now - ambientTimer > 1100) {
        ambientTimer = now;
        dropRef.current = { x: 0.35 + Math.sin(now * 0.0007) * 0.18, y: 0.48 + Math.cos(now * 0.0009) * 0.18, strength: 0.32, radius: 85 };
      }
      if (flowState === 2 && now - ambientTimer > 520) {
        ambientTimer = now;
        dropRef.current = { x: 0.5 + (Math.random() - 0.5) * 0.7, y: 0.5 + (Math.random() - 0.5) * 0.7, strength: 0.48, radius: 70 };
      }

      const velocityWrite = 1 - velocityRead;
      runPass(advect, velocityTargets[velocityWrite], [
        { unit: 0, target: velocityTargets[velocityRead], location: advect.uniforms.u_velocity },
        { unit: 1, target: dyeTargets[dyeRead], location: advect.uniforms.u_dye },
      ]);
      gl.uniform2f(advect.uniforms.u_texel, 1 / width, 1 / height);
      gl.uniform2f(advect.uniforms.u_pointer, pointerX, pointerY);
      gl.uniform2f(advect.uniforms.u_force, forceX, forceY);
      gl.uniform1f(advect.uniforms.u_active, active ? 1 : 0);
      gl.uniform1f(advect.uniforms.u_forceScale, 0.9 + strength * 0.9);
      gl.uniform1f(advect.uniforms.u_radius, radius);
      drawQuad(advect);
      velocityRead = velocityWrite;

      const dyeWrite = 1 - dyeRead;
      runPass(dye, dyeTargets[dyeWrite], [
        { unit: 0, target: velocityTargets[velocityRead], location: dye.uniforms.u_velocity },
        { unit: 1, target: dyeTargets[dyeRead], location: dye.uniforms.u_dye },
      ]);
      gl.uniform2f(dye.uniforms.u_texel, 1 / width, 1 / height);
      gl.uniform2f(dye.uniforms.u_pointer, pointerX, pointerY);
      gl.uniform2f(dye.uniforms.u_force, forceX, forceY);
      gl.uniform1f(dye.uniforms.u_active, active ? 1 : 0);
      gl.uniform1f(dye.uniforms.u_forceScale, 0.8 + strength);
      gl.uniform1f(dye.uniforms.u_radius, radius);
      drawQuad(dye);
      dyeRead = dyeWrite;

      runPass(divergence, divergenceTarget, [
        { unit: 0, target: velocityTargets[velocityRead], location: divergence.uniforms.u_velocity },
      ]);
      gl.uniform2f(divergence.uniforms.u_texel, 1 / width, 1 / height);
      drawQuad(divergence);

      for (let i = 0; i < PRESSURE_ITERATIONS; i += 1) {
        const pressureWrite = 1 - pressureRead;
        runPass(pressure, pressureTargets[pressureWrite], [
          { unit: 0, target: pressureTargets[pressureRead], location: pressure.uniforms.u_pressure },
          { unit: 1, target: divergenceTarget, location: pressure.uniforms.u_divergence },
        ]);
        gl.uniform2f(pressure.uniforms.u_texel, 1 / width, 1 / height);
        drawQuad(pressure);
        pressureRead = pressureWrite;
      }

      const correctedVelocity = 1 - velocityRead;
      runPass(gradient, velocityTargets[correctedVelocity], [
        { unit: 0, target: velocityTargets[velocityRead], location: gradient.uniforms.u_velocity },
        { unit: 1, target: pressureTargets[pressureRead], location: gradient.uniforms.u_pressure },
      ]);
      gl.uniform2f(gradient.uniforms.u_texel, 1 / width, 1 / height);
      drawQuad(gradient);
      velocityRead = correctedVelocity;

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      texture(0, velocityTargets[velocityRead], render.uniforms.u_velocity);
      texture(1, dyeTargets[dyeRead], render.uniforms.u_dye);
      gl.uniform2f(render.uniforms.u_texel, 1 / width, 1 / height);
      gl.uniform1f(render.uniforms.u_time, now / 1000);
      drawQuad(render);

      pointer.vx *= Math.pow(0.02, dt);
      pointer.vy *= Math.pow(0.02, dt);
      if (dropRef.current) dropRef.current = null;
      raf = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      deleteTargets(velocityTargets);
      deleteTargets(dyeTargets);
      deleteTargets(pressureTargets);
      if (divergenceTarget) deleteTargets([divergenceTarget]);
      gl.deleteBuffer(quad);
      [advect, dye, divergence, pressure, gradient, render].forEach((program) => gl.deleteProgram(program.program));
    };
  }, [flowState, isReducedMotion]);

  const updatePointer = useCallback((event: PointerEvent<HTMLElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
    const previous = pointerRef.current;
    pointerRef.current = {
      x,
      y,
      vx: previous.vx * 0.35 + (x - previous.x) * 0.65,
      vy: previous.vy * 0.35 + (y - previous.y) * 0.65,
      active: previous.active,
    };
    if (Math.abs(x - previous.x) > 0.001 || Math.abs(y - previous.y) > 0.001) {
      dropRef.current = { x, y, strength: previous.active ? 1.25 : 0.65, radius: previous.active ? 52 : 76 };
    }
  }, [isReducedMotion]);

  const dropRipple = useCallback((normX: number, normY: number, strength = 1, radius = 4) => {
    if (isReducedMotion) return;
    dropRef.current = {
      x: Math.min(1, Math.max(0, normX)),
      y: Math.min(1, Math.max(0, normY)),
      strength,
      radius: Math.max(30, 110 - radius * 12),
    };
  }, [isReducedMotion]);

  return {
    canvasRef,
    containerRef,
    flowState,
    isReducedMotion,
    nextFlowState: () => {
      setFlowState((current) => (current + 1) % 3);
      dropRipple(0.5, 0.5, 1.4, 7);
    },
    dropRipple,
    bind: {
      onPointerDown: (event) => {
        pointerRef.current.active = true;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        updatePointer(event);
      },
      onPointerMove: updatePointer,
      onPointerLeave: () => {
        pointerRef.current.active = false;
      },
    },
  };
};
