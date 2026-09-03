import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDevice } from "@/hooks/use-device";

function OrbitKnot({ color, speed, scale = 1 }: { color: string; speed: number; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.y = t * 0.55;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });
  return (
    <mesh ref={ref} scale={scale}>
      <torusKnotGeometry args={[0.7, 0.2, 90, 12]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.28} />
    </mesh>
  );
}

export default function SectionScene({
  variant = "gold",
  className = "",
}: {
  variant?: "gold" | "teal" | "violet";
  className?: string;
}) {
  const { prefersReducedMotion, isMobile } = useDevice();
  if (prefersReducedMotion || isMobile) return null;
  const color = variant === "gold" ? "#e8c87a" : variant === "teal" ? "#5ec8d8" : "#a78bfa";
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <OrbitKnot color={color} speed={0.35} />
      </Canvas>
    </div>
  );
}
