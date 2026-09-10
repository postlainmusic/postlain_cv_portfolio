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
  precision highp float;
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

    velocity = (advected.rg * 2.0 - 1.0) * 0.984;
    float dye = advected.b * 0.991;

    // Pointer brush force
    vec2 delta = (v_uv - u_pointer) * aspect;
    float dist = length(delta);
    float brush = exp(-dist * 80.0) * u_active;
    vec2 impulse = u_velocity * (0.9 + brush * 5.5);
    velocity += impulse * brush * 2.8;
    dye += brush * (0.24 + length(u_velocity) * 4.2);

    // Droplet click shockwave
    if (u_impulse_strength > 0.01) {
      vec2 impDelta = (v_uv - u_impulse) * aspect;
      float impDist = length(impDelta);
      float ring = exp(-pow(impDist - 0.045, 2.0) * 450.0) * u_impulse_strength;
      vec2 outward = normalize(impDelta + 0.0001) * ring * 1.5;
      velocity += outward;
      dye += ring * 0.85;
    }

    // Ambient Da Lat nocturnal stream drift
    vec2 ambientFlow = vec2(-0.0004, -0.0003) + vec2(
      sin(u_time * 0.4 + v_uv.y * 3.5),
      cos(u_time * 0.35 + v_uv.x * 3.5)
    ) * 0.00035;
    velocity += ambientFlow * (0.4 + speed * 0.6);

    // Micro turbulence noise
    vec2 n = vec2(
      noise(v_uv * 8.0 + velocity * 2.2 + u_time * 0.1),
      noise(v_uv * 8.0 - velocity * 2.2 - u_time * 0.1)
    ) - 0.5;
    velocity += n * 0.0028 * (0.25 + speed);
    velocity *= 0.996;

    gl_FragColor = vec4(velocity * 0.5 + 0.5, clamp(dye, 0.0, 1.0), 1.0);
  }
`;

const renderFragment = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_state;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 texel = 1.0 / u_resolution;

    // Central state
    vec4 state = texture2D(u_state, v_uv);
    float dye = state.b;

    // Normal gradient calculation
    float left = texture2D(u_state, v_uv - vec2(texel.x, 0.0)).b;
    float right = texture2D(u_state, v_uv + vec2(texel.x, 0.0)).b;
    float up = texture2D(u_state, v_uv + vec2(0.0, texel.y)).b;
    float down = texture2D(u_state, v_uv - vec2(0.0, texel.y)).b;
    vec2 normal = vec2(left - right, down - up);
    float edge = length(normal);

    // Chromatic dispersion (RGB split at wave crests)
    vec2 offsetR = normal * 1.8 * texel;
    vec2 offsetB = -normal * 1.8 * texel;
    float dyeR = texture2D(u_state, v_uv + offsetR).b;
    float dyeB = texture2D(u_state, v_uv + offsetB).b;

    // Natural light shimmer & specular reflection
    float shimmer = 0.5 + 0.5 * sin(u_time * 0.8 + v_uv.y * 9.0 + state.r * 6.0);
    vec3 lightDir = normalize(vec3(0.3, 0.6, 0.7));
    vec3 surfNormal = normalize(vec3(normal * 45.0, 1.0));
    float specular = pow(max(0.0, dot(surfNormal, lightDir)), 14.0) * (0.4 + edge * 2.5);

    // Editorial Palette tokens:
    // Deep Ink Water: #081a20 (0.03, 0.10, 0.13)
    // Water Slate:    #16323d (0.085, 0.195, 0.24)
    // Fog Highlight:  #7890a3 (0.47, 0.56, 0.64)
    // Light Shimmer:  #e7e3d9 (0.91, 0.89, 0.85)
    vec3 deep = vec3(0.03, 0.10, 0.13);
    vec3 midWater = vec3(0.085, 0.195, 0.24);
    vec3 fogAccent = vec3(0.47, 0.56, 0.64);
    vec3 light = vec3(0.91, 0.89, 0.85);

    // Composite fluid color layers
    vec3 colorR = mix(deep, midWater, smoothstep(0.0, 0.5, dyeR));
    vec3 colorG = mix(deep, midWater, smoothstep(0.0, 0.5, dye));
    vec3 colorB = mix(deep, midWater, smoothstep(0.0, 0.5, dyeB));
    vec3 color = vec3(colorR.r, colorG.g, colorB.b);

    color = mix(color, fogAccent, smoothstep(0.2, 0.85, dye) * 0.55);
    color += light * edge * 2.2;
    color += light * specular * 0.35;
    color += fogAccent * shimmer * dye * 0.045;

    // Atmospheric Vignette
    float vignette = smoothstep(1.18, 0.28, length((v_uv - 0.5) * vec2(1.08, 0.92)));
    gl_FragColor = vec4(color * vignette, 0.98);
  }
`;

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
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

const createProgram = (gl: WebGLRenderingContext, fragment: string) => {
  const vs = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
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
    if (!gl) return;

    const update = createProgram(gl, updateFragment);
    const render = createProgram(gl, renderFragment);
    if (!update || !render) return;

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
      vx: 0.05,
      vy: 0.03,
      down: false,
      impulseX: 0.5,
      impulseY: 0.5,
      impulseStrength: 0.4,
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
      point.impulseStrength = Math.max(0, point.impulseStrength - dt * 1.8);

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
