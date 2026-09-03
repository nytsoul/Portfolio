import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDevice } from "@/hooks/use-device";

function ParticleSphere({ count, radius }: { count: number; radius: number }) {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const gold = new THREE.Color("#e8c87a");
    const teal = new THREE.Color("#5ec8d8");
    const white = new THREE.Color("#fff6e0");
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // fibonacci sphere + jitter for organic feel
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = radius * (0.92 + Math.random() * 0.16);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const roll = Math.random();
      if (roll > 0.92) tmp.copy(white);
      else tmp.copy(gold).lerp(teal, Math.random() * 0.35);
      col[i * 3] = tmp.r;
      col[i * 3 + 1] = tmp.g;
      col[i * 3 + 2] = tmp.b;
    }
    return { positions: pos, colors: col };
  }, [count, radius]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.z = Math.sin(t * 0.1) * 0.12;
    // mouse parallax
    const mx = state.pointer.x * 0.25;
    const my = state.pointer.y * 0.2;
    points.current.rotation.x += (my - points.current.rotation.x) * 0.03;
    points.current.rotation.y += (mx * 0.4 + t * 0.08 - points.current.rotation.y) * 0.03;
    // scroll-driven scale pulse
    const scroll = Math.min(window.scrollY / viewport.height / 2, 1);
    points.current.scale.setScalar(1 - scroll * 0.25);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Soft additive halo behind the sphere for depth. */
function Halo({ radius }: { radius: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius * 1.45, 32, 32]} />
      <meshBasicMaterial color="#e8c87a" transparent opacity={0.05} side={THREE.BackSide} depthWrite={false} />
    </mesh>
  );
}

function WireRings() {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const g3 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g1.current) {
      g1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.15) * 0.1;
      g1.current.rotation.z = t * 0.05;
    }
    if (g2.current) {
      g2.current.rotation.x = Math.PI / 1.8 + Math.cos(t * 0.12) * 0.1;
      g2.current.rotation.z = -t * 0.04;
    }
    if (g3.current) {
      g3.current.rotation.y = t * 0.07;
      g3.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.1) * 0.08;
    }
  });
  return (
    <group>
      <mesh ref={g1}>
        <torusGeometry args={[2.35, 0.006, 8, 128]} />
        <meshBasicMaterial color="#e8c87a" transparent opacity={0.35} />
      </mesh>
      <mesh ref={g2}>
        <torusGeometry args={[2.7, 0.005, 8, 128]} />
        <meshBasicMaterial color="#5ec8d8" transparent opacity={0.22} />
      </mesh>
      <mesh ref={g3}>
        <torusGeometry args={[3.05, 0.004, 8, 128]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

function CoreGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
    ref.current.scale.setScalar(s);
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshBasicMaterial color="#e8c87a" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

/** Scroll dolly: camera pushes in gently as the user scrolls. */
function ScrollDolly() {
  const { camera, viewport } = useThree();
  useFrame(() => {
    const p = Math.min(window.scrollY / viewport.height, 1);
    camera.position.z += (7 - p * 1.6 - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ className = "" }: { className?: string }) {
  const { isMobile, prefersReducedMotion, dpr } = useDevice();
  if (prefersReducedMotion) return null;
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <Canvas
        dpr={[1, Math.min(dpr, 2)]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        <ParticleSphere count={isMobile ? 1600 : 3800} radius={1.9} />
        <Halo radius={1.9} />
        {!isMobile && <WireRings />}
        <CoreGlow />
        <ScrollDolly />
      </Canvas>
    </div>
  );
}
