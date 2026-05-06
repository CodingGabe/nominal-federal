"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = u_time * 0.12;

    // Multiple overlapping diagonal waves for complex mixing
    float d1 = sin((uv.x * 1.2 - uv.y * 0.8 + t) * 4.5) * 0.5 + 0.5;
    float d2 = sin((uv.x * 0.7 + uv.y * 1.3 + t * 0.7) * 3.8) * 0.5 + 0.5;
    float d3 = sin((uv.x * 1.5 - uv.y * 0.5 + t * 1.1) * 5.2) * 0.5 + 0.5;

    // Blend the three waves together
    float blend = (d1 * 0.5 + d2 * 0.3 + d3 * 0.2);

    // Colors from reference: deep black, vivid green, cool grey
    vec3 black = vec3(0.02, 0.02, 0.02);
    vec3 green = vec3(0.04, 0.38, 0.10);
    vec3 grey  = vec3(0.52, 0.55, 0.52);

    // Mix across the three colors based on blend value
    vec3 color = mix(black, green, smoothstep(0.15, 0.55, blend));
    color = mix(color, grey, smoothstep(0.5, 0.85, blend));
    color = mix(color, black, smoothstep(0.82, 1.0, blend));

    // Bottom-left stays darkest like the reference
    float corner = smoothstep(0.0, 0.8, uv.x) *
                   smoothstep(0.0, 0.7, 1.0 - uv.y);
    color *= mix(0.15, 1.0, corner);

    // Film grain
    float grain = noise(uv * 600.0 + t * 10.0) * 0.10;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile error");
  }
  return shader;
}

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Compile & link
    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Program link error");
    }
    gl.useProgram(program);

    // Full-screen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");

    const setSize = () => {
      const parent = canvas.parentElement;
      const w = (parent?.clientWidth  || window.innerWidth);
      const h = (parent?.clientHeight || window.innerHeight);
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let rafId = 0;
    let alive = true;

    const seed = Math.random() * 1000;
    const startTime = performance.now();
    let lastDrawTime = -Infinity;
    const FRAME_BUDGET = 1000 / 60;

    const draw = () => {
      if (!alive) return;

      const now = performance.now();
      const t = (now - startTime) / 1000 + seed;

      if (now - lastDrawTime >= FRAME_BUDGET) {
        lastDrawTime = now;
        gl.uniform1f(uTime, t);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  );
}
