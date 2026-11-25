/* eslint-disable react-hooks/immutability -- three.js cameras and canvases are mutated by design */
import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows, Sparkles, Html } from "@react-three/drei";
import { BackSide } from "three";

// Label pinned to a point on a model. Colors come from --accent on the journey section.
export function Hotspot({ pos, label, text }) {
  const [open, setOpen] = useState(false);
  return (
    <Html position={pos} zIndexRange={[20, 0]} style={{ pointerEvents: "auto" }}>
      <div className="hs-in relative" style={{ transform: "translate(-7px,-7px)" }}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          aria-expanded={open}
          className="a-ring flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-[#0B1C2C]/85 py-1 pl-1.5 pr-3 text-xs text-white backdrop-blur"
        >
          <span className="relative flex h-3 w-3">
            <span className="a-solid absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
            <span className="a-solid relative inline-flex h-3 w-3 rounded-full" />
          </span>
          {label}
        </button>
        {open && (
          <div className="absolute left-0 top-full z-10 mt-2 w-52 rounded-lg border border-white/10 bg-[#0B1C2C]/95 p-3 text-xs leading-relaxed text-gray-200 shadow-xl">
            {text}
          </div>
        )}
      </div>
    </Html>
  );
}

// Lights, turntable and camera controls shared by every scene.
function Stage({ theme, target, tableY, reduced, autoRotate, onInteract, children }) {
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera);
  const { width, height } = useThree((s) => s.size);

  // Pull back a little on tall/narrow (phone) viewports so the whole model stays in frame.
  useEffect(() => {
    camera.zoom = width / height < 1 ? 0.78 : 1;
    camera.updateProjectionMatrix();
  }, [camera, width, height]);

  // OrbitControls sets touch-action:none which would trap page scrolling on phones.
  useEffect(() => { gl.domElement.style.touchAction = "pan-y"; }, [gl]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 8, 4]} intensity={1.75} />
      <directionalLight position={[-5, 4, -4]} intensity={1.15} color={theme.rim} />

      <Environment resolution={256} frames={1} environmentIntensity={0.88}>
        <mesh scale={60}><sphereGeometry args={[1, 32, 16]} /><meshBasicMaterial color={theme.sky} side={BackSide} /></mesh>
        <Lightformer form="rect" intensity={3.75} position={[0, 6, -3]} scale={[12, 2.5, 1]} color={theme.key} />
        <Lightformer form="rect" intensity={2.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} color={theme.fill} />
        <Lightformer form="rect" intensity={3} position={[6, 2, 3]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} color="#ffffff" />
      </Environment>

      {/* Turntable */}
      <mesh position={[0, tableY, 0]}>
        <cylinderGeometry args={[2.35, 2.45, 0.14, 96]} />
        <meshStandardMaterial color={theme.table} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, tableY + 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.25, 2.33, 96]} />
        <meshBasicMaterial color={theme.accent} />
      </mesh>
      <ContactShadows position={[0, tableY + 0.08, 0]} opacity={0.55} scale={7} blur={2.4} far={2.2} resolution={256} />

      {children}

      {!reduced && <Sparkles count={34} scale={[7, 3.5, 7]} position={[0, 1.4, 0]} size={2.2} speed={0.25} opacity={0.5} color={theme.spark} />}

      <OrbitControls
        target={target}
        enablePan={false}
        enableZoom={false}
        enableDamping
        minPolarAngle={0.85}
        maxPolarAngle={1.62}
        autoRotate={autoRotate && !reduced}
        autoRotateSpeed={0.85}
        onStart={onInteract}
      />
    </>
  );
}

export default function SceneShell({ active, camera, ...stage }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: camera, fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => { gl.localClippingEnabled = true; }}
    >
      <Stage {...stage} />
    </Canvas>
  );
}
