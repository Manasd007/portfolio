"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";


const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uActive; // pointer activity, 0 (idle) -> 1 (moving fast)
  uniform vec2  uRes;
  uniform vec2  uMouse;
  uniform vec3  uInk;
  uniform vec3  uAccent;
  uniform vec3  uAccent2;

  // --- hash / noise (Inigo Quilez style) ---
  vec2 hash2(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h * vec3(dot(a, hash2(i)), dot(b, hash2(i+o)), dot(c, hash2(i+1.0)));
    return dot(n, vec3(70.0));
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for(int i = 0; i < 3; i++){
      v += a * noise(p);
      p = rot * p * 2.0 + 100.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    float aspect = uRes.x / uRes.y;

    float t = uTime * 0.1;

    // Pointer in the same space as p (uMouse.y already flipped to match).
    vec2  mp = (uMouse - 0.5) * vec2(aspect, 1.0);
    vec2  dir = p - mp;
    float d = length(dir);
    float pointer = exp(-d * d * 8.0);          // soft blob under the cursor

    // The cursor bends the flow: a swirl plus an outward ripple, stronger
    // while the pointer is actually moving (uActive).
    float boost = 0.15 + uActive;
    vec2  swirl = vec2(-dir.y, dir.x);
    vec2  disp = (swirl * 0.9 + normalize(dir + 1e-4) * sin(d * 9.0 - t * 3.0) * 0.25)
                 * pointer * boost;
    vec2  pw = p + disp;

    // Slow autonomous drift so the whole field keeps travelling on its own.
    vec2 dr = vec2(t * 0.02, t * 0.012);

    // Two-stage domain warp -> big, flowing cells that visibly churn.
    vec2 q = vec2(
      fbm(pw * 0.9 + dr + vec2(0.0, t)),
      fbm(pw * 0.9 + dr + vec2(4.7, 2.3) - vec2(t * 0.8, t * 0.3))
    );
    vec2 r = vec2(
      fbm(pw * 0.9 + 1.7 * q + vec2(1.7, 9.2) + t * 0.9),
      fbm(pw * 0.9 + 1.7 * q + vec2(8.3, 2.8) - t * 0.7)
    );
    float f = fbm(pw * 0.9 + 2.0 * r);
    f = clamp(f * 0.5 + 0.5, 0.0, 1.0);         // normalize to ~0..1
    float flow = length(r);                     // 0 = calm, higher = swirling

    // Streams brighten a touch near the cursor, more so as it moves.
    f += pointer * (0.04 + 0.14 * uActive);

    // Smooth colour ramp: ink -> deep petrol -> warm ember. No thin lines.
    vec3 col = uInk;
    col = mix(col, uAccent2, smoothstep(0.30, 0.78, f) * 0.45);
    col = mix(col, uAccent,  smoothstep(0.60, 0.98, f) * 0.78);

    // Soft ember bloom that pools where the flow swirls (broad, not filaments).
    float bloom = smoothstep(0.55, 1.15, flow);
    col += uAccent * bloom * bloom * 0.35;

    // Warm glow pooling at the cursor, blooming a little as it moves.
    col += uAccent  * pointer * (0.02 + 0.28 * uActive);
    col += uAccent2 * pointer * pointer * 0.10 * uActive;

    // Gentle radial vignette to seat the type.
    float vig = smoothstep(1.35, 0.15, length(p));
    col *= mix(0.55, 1.08, vig);

    // Fade toward the bottom so the headline/paragraph read cleanly.
    col = mix(col, uInk, smoothstep(0.55, -0.15, uv.y) * 0.55);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function toVec3(hex: string) {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  // Pointer "activity": rises when the cursor moves, decays to 0 when idle.
  const active = useRef(0);
  const targetActive = useRef(0);
  const gl = useThree((s) => s.gl);
  const setSize = useThree((s) => s.setSize);

  useEffect(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;
    const fit = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w > 0 && h > 0) setSize(w, h);
    };
    fit();
    const raf = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(raf);
  }, [gl, setSize]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uActive: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uInk: { value: toVec3("#12100e") },
      uAccent: { value: toVec3("#e4572e") },
      uAccent2: { value: toVec3("#1b4965") },
    }),
    []
  );

  
  useFrame((_, delta) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    const d = Math.min(delta, 0.1);
    u.uTime.value += d;
    u.uRes.value.set(gl.domElement.width, gl.domElement.height);
    mouse.current.lerp(target.current, 0.12);
    u.uMouse.value.copy(mouse.current);
    targetActive.current *= Math.exp(-d * 2.6);
    active.current += (targetActive.current - active.current) * 0.12;
    u.uActive.value = active.current;
  });

  // Track the pointer with a passive window listener instead of R3F's
  // onPointerMove, which would raycast the mesh on every mouse move.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = 1 - e.clientY / window.innerHeight;
      // Distance moved this event feeds the activity pulse.
      const speed = Math.hypot(nx - target.current.x, ny - target.current.y);
      targetActive.current = Math.min(1, Math.max(targetActive.current, speed * 14));
      target.current.set(nx, ny);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Plane />
    </Canvas>
  );
}
