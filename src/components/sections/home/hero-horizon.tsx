import { useEffect, useRef, useState } from "react";

interface HeroHorizonProps {
  /** false: desenha um quadro só e para (celular, movimento reduzido). */
  animate: boolean;
  paused: boolean;
}

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Horizonte de planeta: corpo escuro embaixo, linha de borda fina e brilho
// ciano subindo, com um foco de luz que passeia devagar pela borda.
const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uAccent;
uniform vec3 uBg;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float aspect = uRes.x / uRes.y;
  vec2 p = frag / uRes.y;

  float radius = 1.6;
  vec2 center = vec2(aspect * 0.5, 0.2 - radius);
  vec2 dp = p - center;
  float d = length(dp) - radius;
  float angle = atan(dp.x, dp.y);

  float sweep = 0.5 * sin(uTime * 0.22);
  float focus = exp(-pow((angle - sweep) / 0.55, 2.0));

  vec3 col = uBg;

  if (d > 0.0) {
    vec2 cell = floor(frag / 3.0);
    float h = hash(cell);
    float twinkle = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.6 + h * 2.0) + h * 40.0));
    float brightness = 0.25 + 0.75 * hash(cell + 17.0);
    float star = step(0.9988, h) * brightness * twinkle * smoothstep(0.05, 0.35, d);
    col += vec3(star * 0.6);

    vec3 deep = uAccent * vec3(0.25, 0.55, 0.75);
    col += deep * exp(-d * 6.0) * (0.12 + 0.28 * focus);
    col += uAccent * exp(-d * 28.0) * (0.25 + 0.75 * focus) * 0.55;
  } else {
    col = uBg * 0.8 + uAccent * exp(d * 18.0) * (0.10 + 0.25 * focus) * 0.35;
  }

  float onePixel = 1.0 / uRes.y;
  float rim = exp(-abs(d) / (onePixel * 1.6)) * (0.35 + 0.9 * focus);
  col += mix(uAccent, vec3(1.0), 0.45) * rim;

  // Ruído de 1/255 tira os degraus que degradê escuro costuma mostrar.
  col += (hash(frag + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

function readRgbVar(name: string, fallback: [number, number, number]): [number, number, number] {
  const parts = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  const rgb = parts.length === 3 && parts.every((n) => !Number.isNaN(n)) ? parts : fallback;
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

const HeroHorizon = ({ animate, paused }: HeroHorizonProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<((time: number) => void) | null>(null);
  const elapsedRef = useRef(0);
  const [inView, setInView] = useState(true);

  // Monta o WebGL uma vez. Se o aparelho não tiver WebGL, o canvas fica
  // transparente e aparece o degradê CSS que está por baixo.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    gl.uniform3fv(gl.getUniformLocation(program, "uAccent"), readRgbVar("--brand-accent", [34, 211, 238]));
    gl.uniform3fv(gl.getUniformLocation(program, "uBg"), readRgbVar("--background", [9, 11, 14]));

    let lost = false;
    const draw = (time: number) => {
      if (lost) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    drawRef.current = draw;
    draw(elapsedRef.current);

    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
    };
    canvas.addEventListener("webglcontextlost", onLost);
    const resizeObserver = new ResizeObserver(() => draw(elapsedRef.current));
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      drawRef.current = null;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Parado quando pausado ou fora da tela. O tempo só anda enquanto roda,
  // então retomar continua de onde parou, sem salto.
  useEffect(() => {
    if (!animate || paused || !inView) return;
    let frame = 0;
    let last = performance.now();
    let sinceDraw = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      elapsedRef.current += delta;
      sinceDraw += delta;
      // 30 quadros por segundo: o movimento é lento, e isso corta pela
      // metade o trabalho da placa de vídeo.
      if (sinceDraw < 1 / 30) return;
      sinceDraw = 0;
      drawRef.current?.(elapsedRef.current);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, paused, inView]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
};

export default HeroHorizon;
