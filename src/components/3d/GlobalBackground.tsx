import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevice } from "@/hooks/use-device";

function StarField({ count, size, color, opacity, speed }: { count: number; size: number; color: string; opacity: number; speed: number }) {
  const ref = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = -Math.random() * 12 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * speed;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.03;
    // Twinkle
    if (mat.current) mat.current.opacity = opacity * (0.82 + 0.18 * Math.sin(t * 0.9));
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function DustLayer({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = -Math.random() * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.35;
    ref.current.rotation.y = -state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#5ec8d8"
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Occasional shooting star streaking across the sky. */
function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const state = useRef({ next: 2.5, start: 0, from: new THREE.Vector3(), active: false });

  useFrame((clock) => {
    const t = clock.clock.elapsedTime;
    const s = state.current;
    if (!ref.current || !mat.current) return;
    if (!s.active && t > s.next) {
      s.active = true;
      s.start = t;
      s.from.set(6 + Math.random() * 8, 3 + Math.random() * 4, -6);
      ref.current.position.copy(s.from);
      ref.current.rotation.z = -0.5;
    }
    if (s.active) {
      const p = (t - s.start) / 1.1;
      if (p >= 1) {
        s.active = false;
        s.next = t + 4 + Math.random() * 6;
        mat.current.opacity = 0;
      } else {
        ref.current.position.x = s.from.x - p * 18;
        ref.current.position.y = s.from.y - p * 7;
        mat.current.opacity = Math.sin(p * Math.PI) * 0.8;
      }
    }
  });

  return (
    <mesh ref={ref} visible>
      <planeGeometry args={[1.6, 0.02]} />
      <meshBasicMaterial ref={mat} color="#ffe9b8" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

export default function GlobalBackground() {
  const { isMobile, prefersReducedMotion, dpr } = useDevice();
  if (prefersReducedMotion) return null;
  const stars = isMobile ? 350 : 900;
  const dust = isMobile ? 150 : 400;

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, Math.min(dpr, 1.75)]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <StarField count={stars} size={0.035} color="#d8c690" opacity={0.55} speed={0.008} />
        <StarField count={Math.floor(stars / 3)} size={0.06} color="#ffffff" opacity={0.5} speed={-0.004} />
        <DustLayer count={dust} />
        {!isMobile && <ShootingStar />}
      </Canvas>
      {/* Drifting nebula glows */}
      <div
        className="absolute inset-0 animate-[nebula-drift_26s_ease-in-out_infinite_alternate]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 15% 20%, oklch(0.78 0.12 75 / 0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 85% 80%, oklch(0.72 0.10 200 / 0.04) 0%, transparent 60%)",
        }}
      />
      <style>{`@keyframes nebula-drift { from { transform: translate3d(-2%, -1%, 0) scale(1); } to { transform: translate3d(2%, 2%, 0) scale(1.06); } }`}</style>
    </div>
  );
}
