import { useEffect, useRef } from 'react';

type FluidPoint = { x: number; y: number; vx: number; vy: number; down: boolean };

type WaterFluidProps = { reducedMotion?: boolean };

const vertex = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform vec2 u_velocity;
  uniform float u_time;
  uniform float u_down;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 p = (uv - u_pointer) * aspect;
    float dist = length(p);
    float velocity = length(u_velocity);

    float wake = exp(-dist * 7.5) * (0.18 + velocity * 3.0) * (0.35 + u_down * 0.65);
    float rings = sin(dist * 38.0 - u_time * 2.2 - velocity * 8.0) * wake;
    vec2 flow = vec2(
      noise(uv * 3.0 + vec2(u_time * 0.045, -u_time * 0.03)),
      noise(uv * 3.0 + vec2(-u_time * 0.035, u_time * 0.04))
    ) - 0.5;

    float grain = noise(uv * 18.0 + flow * 2.0) * 0.025;
    float luminous = 0.025 + rings * 0.32 + grain + length(flow) * 0.018;
    vec3 deep = vec3(0.045, 0.095, 0.12);
    vec3 water = vec3(0.20, 0.34, 0.39);
    vec3 light = vec3(0.75, 0.82, 0.78);
    vec3 color = mix(deep, water, smoothstep(0.0, 1.0, uv.y + luminous));
    color += light * max(luminous, 0.0) * 0.45;

    float edge = smoothstep(1.15, 0.15, length((uv - 0.5) * vec2(1.15, 1.0)));
    gl_FragColor = vec4(color * edge, 0.9);
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

export const WaterFluid = ({ reducedMotion = false }: WaterFluidProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'high-performance' });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertex);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, 'u_resolution');
    const pointer = gl.getUniformLocation(program, 'u_pointer');
    const velocity = gl.getUniformLocation(program, 'u_velocity');
    const time = gl.getUniformLocation(program, 'u_time');
    const down = gl.getUniformLocation(program, 'u_down');
    const point: FluidPoint = { x: 0.5, y: 0.5, vx: 0, vy: 0, down: false };
    let target = { x: 0.5, y: 0.5 };
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
      const dx = x - target.x;
      const dy = y - target.y;
      target = { x, y };
      point.vx = point.vx * 0.55 + dx * 0.45;
      point.vy = point.vy * 0.55 + dy * 0.45;
    };

    const downHandler = () => { point.down = true; };
    const upHandler = () => { point.down = false; };

    canvas.addEventListener('pointermove', move, { passive: true });
    canvas.addEventListener('pointerdown', downHandler, { passive: true });
    window.addEventListener('pointerup', upHandler, { passive: true });
    window.addEventListener('resize', resize);
    resize();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      point.x += (target.x - point.x) * Math.min(1, dt * 7);
      point.y += (target.y - point.y) * Math.min(1, dt * 7);
      point.vx *= Math.pow(0.08, dt);
      point.vy *= Math.pow(0.08, dt);

      gl.useProgram(program);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointer, point.x, point.y);
      gl.uniform2f(velocity, point.vx, point.vy);
      gl.uniform1f(time, now / 1000);
      gl.uniform1f(down, point.down ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerdown', downHandler);
      window.removeEventListener('pointerup', upHandler);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="water-fluid" aria-hidden="true" />;
};
