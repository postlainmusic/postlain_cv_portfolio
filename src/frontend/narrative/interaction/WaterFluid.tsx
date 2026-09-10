import { useEffect, useRef } from 'react';

type WaterFluidProps = { reducedMotion?: boolean };

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  down: boolean;
  impulseX: number;
  impulseY: number;
  impulseStrength: number;
};

const vertex = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const updateFragment = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform sampler2D u_state;
  uniform vec2 u_pointer;
  uniform vec2 u_velocity;
  uniform vec2 u_texel;
  uniform float u_active;
  uniform vec2 u_impulse;
  uniform float u_impulse_strength;
  uniform float u_time;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 34.5);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec4 current = texture2D(u_state, v_uv);
    vec2 velocity = current.rg * 2.0 - 1.0;

    float speed = length(velocity);
    vec2 aspect = vec2(1.0, u_texel.x / max(u_texel.y, 0.0001));
    vec2 back = velocity * 0.008;
    vec2 flowUv = v_uv - back;
    vec4 advected = texture2D(u_state, flowUv);

    velocity = (advected.rg * 2.0 - 1.0) * 0.985;
    float dye = advected.b * 0.992;

    // Pointer cursor force
    vec2 delta = (v_uv - u_pointer) * aspect;
    float dist = length(delta);
    float brush = exp(-dist * 65.0) * u_active;
    vec2 impulse = u_velocity * (1.2 + brush * 6.0);
    velocity += impulse * brush * 3.5;
    dye += brush * (0.35 + length(u_velocity) * 5.0);

    // Droplet click shockwave
    if (u_impulse_strength > 0.01) {
      vec2 impDelta = (v_uv - u_impulse) * aspect;
      float impDist = length(impDelta);
      float diff = impDist - 0.045;
      float ring = exp(-(diff * diff) * 450.0) * u_impulse_strength;
      vec2 outward = normalize(impDelta + vec2(0.0001)) * ring * 2.0;
      velocity += outward;
      dye += ring * 0.95;
    }

    // Ambient Da Lat nocturnal stream drift
    vec2 ambientFlow = vec2(-0.0005, -0.0004) + vec2(
      sin(u_time * 0.5 + v_uv.y * 3.5),
      cos(u_time * 0.45 + v_uv.x * 3.5)
    ) * 0.0004;
    velocity += ambientFlow * (0.5 + speed * 0.5);

    // Micro turbulence noise
    vec2 n = vec2(
      noise(v_uv * 7.0 + velocity * 2.0 + u_time * 0.12),
      noise(v_uv * 7.0 - velocity * 2.0 - u_time * 0.12)
    ) - 0.5;
    velocity += n * 0.003 * (0.3 + speed);
    velocity *= 0.996;

    gl_FragColor = vec4(velocity * 0.5 + 0.5, clamp(dye, 0.0, 1.0), 1.0);
  }
`;

const renderFragment = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform sampler2D u_state;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 texel = 1.0 / u_resolution;

    // Fluid state
    vec4 state = texture2D(u_state, v_uv);
    float dye = state.b;

    // Normal gradient
    float left = texture2D(u_state, v_uv - vec2(texel.x, 0.0)).b;
    float right = texture2D(u_state, v_uv + vec2(texel.x, 0.0)).b;
    float up = texture2D(u_state, v_uv + vec2(0.0, texel.y)).b;
    float down = texture2D(u_state, v_uv - vec2(0.0, texel.y)).b;
    vec2 normal = vec2(left - right, down - up);
    float edge = length(normal);

    // Procedural ambient water wave ripples (always alive)
    float w1 = sin(v_uv.x * 14.0 + u_time * 0.8 + state.r * 4.0) * cos(v_uv.y * 12.0 + u_time * 0.7);
    float w2 = sin(v_uv.x * 26.0 - u_time * 1.0 + v_uv.y * 18.0) * 0.5 + 0.5;
    float ambientRipples = (w1 * 0.5 + 0.5) * 0.25 + w2 * 0.12;

    // Chromatic dispersion (RGB split at wave crests)
    vec2 offsetR = normal * 2.5 * texel;
    vec2 offsetB = -normal * 2.5 * texel;
    float dyeR = texture2D(u_state, v_uv + offsetR).b;
    float dyeB = texture2D(u_state, v_uv + offsetB).b;

    // Light highlights & specular caustics
    vec3 lightDir = normalize(vec3(0.35, 0.65, 0.68));
    vec3 surfNormal = normalize(vec3(normal * 50.0 + vec2(w1 * 0.1, w2 * 0.1), 1.0));
    float specular = pow(max(0.001, dot(surfNormal, lightDir)), 12.0) * (0.35 + edge * 3.5 + ambientRipples * 0.4);

    // Palette Colors:
    // Deep Midnight Abyss: #0a1820
    // Luminous Water Slate: #1a4252
    // Vibrant Cyan Accent: #4f9cb8
    // Crystal White Shimmer: #eef6f8
    vec3 deep = vec3(0.04, 0.095, 0.125);
    vec3 midWater = vec3(0.10, 0.26, 0.32);
    vec3 accent = vec3(0.31, 0.61, 0.72);
    vec3 light = vec3(0.93, 0.96, 0.97);

    // Layered color blending
    vec3 colorR = mix(deep, midWater, smoothstep(0.0, 0.6, dyeR + ambientRipples * 0.5));
    vec3 colorG = mix(deep, midWater, smoothstep(0.0, 0.6, dye + ambientRipples * 0.5));
    vec3 colorB = mix(deep, midWater, smoothstep(0.0, 0.6, dyeB + ambientRipples * 0.5));
    vec3 color = vec3(colorR.r, colorG.g, colorB.b);

    color = mix(color, accent, smoothstep(0.15, 0.85, dye) * 0.75 + ambientRipples * 0.2);
    color += light * edge * 3.2;
    color += light * specular * 0.45;
    color += accent * ambientRipples * 0.18;

    // Subtle atmospheric vignette
    float vignette = smoothstep(1.22, 0.24, length((v_uv - 0.5) * vec2(1.06, 0.94)));
    gl_FragColor = vec4(color * vignette, 0.98);
  }
`;

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('WebGL Shader Compilation Error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl: WebGLRenderingContext, fragment: string) => {
  const vs = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('WebGL Program Link Error:', gl.getProgramInfoLog(program));
    return null;
  }
  return { program, vs, fs };
};

const createTarget = (gl: WebGLRenderingContext, width: number, height: number) => {
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

export const WaterFluid = ({ reducedMotion = false }: WaterFluidProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.warn('WebGL not supported on this browser context');
      return;
    }

    const update = createProgram(gl, updateFragment);
    const render = createProgram(gl, renderFragment);
    if (!update || !render) {
      console.error('Failed to create WebGL update or render programs');
      return;
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    let targets: Array<{ texture: WebGLTexture; framebuffer: WebGLFramebuffer }> = [];
    let width = 1;
    let height = 1;
    let read = 0;
    let raf = 0;
    let last = performance.now();
    const point: Point = {
      x: 0.5,
      y: 0.5,
      vx: 0.08,
      vy: 0.06,
      down: false,
      impulseX: 0.5,
      impulseY: 0.5,
      impulseStrength: 0.6,
    };
    let targetPointer = { x: 0.5, y: 0.5 };

    const bindQuad = (program: WebGLProgram) => {
      const position = gl.getAttribLocation(program, 'a_position');
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = Math.max(64, Math.floor(rect.width * dpr));
      height = Math.max(64, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      targets.forEach((target) => {
        gl.deleteTexture(target.texture);
        gl.deleteFramebuffer(target.framebuffer);
      });
      targets = [createTarget(gl, width, height), createTarget(gl, width, height)].filter(Boolean) as typeof targets;
      read = 0;

      if (targets.length === 2) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, targets[0].framebuffer);
        gl.clearColor(0.5, 0.5, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindFramebuffer(gl.FRAMEBUFFER, targets[1].framebuffer);
        gl.clearColor(0.5, 0.5, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
      const dx = x - targetPointer.x;
      const dy = y - targetPointer.y;
      targetPointer = { x, y };
      point.vx = point.vx * 0.52 + dx * 0.48;
      point.vy = point.vy * 0.52 + dy * 0.48;
    };

    const down = (event: PointerEvent) => {
      point.down = true;
      const rect = canvas.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
      point.impulseX = x;
      point.impulseY = y;
      point.impulseStrength = 1.0;
    };

    const up = () => {
      point.down = false;
    };

    const container = canvas.parentElement || canvas;
    container.addEventListener('pointermove', move as EventListener, { passive: true });
    container.addEventListener('pointerdown', down as EventListener, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('resize', resize);
    resize();

    const draw = (now: number) => {
      if (targets.length !== 2) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      point.x += (targetPointer.x - point.x) * Math.min(1, dt * 9);
      point.y += (targetPointer.y - point.y) * Math.min(1, dt * 9);
      point.vx *= Math.pow(0.035, dt);
      point.vy *= Math.pow(0.035, dt);
      point.impulseStrength = Math.max(0, point.impulseStrength - dt * 1.6);

      const write = 1 - read;
      gl.bindFramebuffer(gl.FRAMEBUFFER, targets[write].framebuffer);
      gl.viewport(0, 0, width, height);
      gl.useProgram(update.program);
      bindQuad(update.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, targets[read].texture);
      gl.uniform1i(gl.getUniformLocation(update.program, 'u_state'), 0);
      gl.uniform2f(gl.getUniformLocation(update.program, 'u_pointer'), point.x, point.y);
      gl.uniform2f(gl.getUniformLocation(update.program, 'u_velocity'), point.vx, point.vy);
      gl.uniform2f(gl.getUniformLocation(update.program, 'u_texel'), width, height);
      gl.uniform1f(gl.getUniformLocation(update.program, 'u_active'), point.down ? 1.0 : 0.45);
      gl.uniform2f(gl.getUniformLocation(update.program, 'u_impulse'), point.impulseX, point.impulseY);
      gl.uniform1f(gl.getUniformLocation(update.program, 'u_impulse_strength'), point.impulseStrength);
      gl.uniform1f(gl.getUniformLocation(update.program, 'u_time'), now / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.useProgram(render.program);
      bindQuad(render.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, targets[write].texture);
      gl.uniform1i(gl.getUniformLocation(render.program, 'u_state'), 0);
      gl.uniform2f(gl.getUniformLocation(render.program, 'u_resolution'), width, height);
      gl.uniform1f(gl.getUniformLocation(render.program, 'u_time'), now / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      read = write;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointermove', move as EventListener);
      container.removeEventListener('pointerdown', down as EventListener);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('resize', resize);
      targets.forEach((target) => {
        gl.deleteTexture(target.texture);
        gl.deleteFramebuffer(target.framebuffer);
      });
      gl.deleteBuffer(quad);
      gl.deleteProgram(update.program);
      gl.deleteProgram(render.program);
      gl.deleteShader(update.vs);
      gl.deleteShader(update.fs);
      gl.deleteShader(render.vs);
      gl.deleteShader(render.fs);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="water-fluid" aria-hidden="true" />;
};
