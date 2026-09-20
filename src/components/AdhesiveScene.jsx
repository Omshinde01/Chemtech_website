/* eslint-disable react-hooks/immutability, react-hooks/refs */
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import { STAGES } from "./adhesiveStages";

const CHANNELS = ["prep", "primer", "covercoat", "vulcanize", "test"];
const DURATION = {
  prep: 1.6,
  primer: 2.0,
  covercoat: 2.0,
  vulcanize: 2.4,
  test: 1.8,
};

// 5 stages
const TARGETS = [
  /* 0: prep       */ [1, 0, 0, 0, 0],
  /* 1: primer     */ [1, 1, 0, 0, 0],
  /* 2: covercoat  */ [1, 1, 1, 0, 0],
  /* 3: vulcanize  */ [1, 1, 1, 1, 0],
  /* 4: test       */ [1, 1, 1, 1, 1],
].map((row) => Object.fromEntries(CHANNELS.map((c, i) => [c, row[i]])));

const ease = (x) => x * x * (3 - 2 * x);
const lerp = THREE.MathUtils.lerp;

function Hotspot({ pos, label, text }) {
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
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-amber-300/40 bg-[#1e1507]/85 py-1 pl-1.5 pr-3 text-xs text-white backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
          </span>
          {label}
        </button>
        {open && (
          <div className="absolute left-0 top-full z-10 mt-2 w-52 rounded-lg border border-white/10 bg-[#1e1507]/95 p-3 text-xs leading-relaxed text-gray-200 shadow-xl">
            {text}
          </div>
        )}
      </div>
    </Html>
  );
}

function Model({ stage, reduced }) {
  const anim = useRef(Object.fromEntries(CHANNELS.map((c) => [c, 0])));

  const refs = {
    primerRing: useRef(),
    covercoatRing: useRef(),
    rubberDamper: useRef(),
    heatLight: useRef(),
    scanLine: useRef(),
    ringOk: useRef(),
    sprayRing: useRef(),
  };

  useFrame(({ clock }, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const T = TARGETS[stage];
    const a = anim.current;
    for (const c of CHANNELS) {
      const step = reduced ? 1 : dt / DURATION[c];
      a[c] = a[c] < T[c] ? Math.min(T[c], a[c] + step) : Math.max(T[c], a[c] - step);
    }
    const e = Object.fromEntries(CHANNELS.map((c) => [c, ease(a[c])]));
    const time = clock.elapsedTime;

    // Primer coating shimmer
    if (refs.primerRing.current) {
      refs.primerRing.current.visible = e.primer > 0.01;
      refs.primerRing.current.material.opacity = lerp(0, 0.65, e.primer);
    }

    // Covercoat layer appearance
    if (refs.covercoatRing.current) {
      refs.covercoatRing.current.visible = e.covercoat > 0.01;
      refs.covercoatRing.current.material.opacity = lerp(0, 0.75, e.covercoat);
    }

    // Rubber Damper Core
    // In stages 0-2: descending from top Y=2.5 to seated position Y=0.75 in stage 3
    if (refs.rubberDamper.current) {
      const isVisible = e.vulcanize > 0.02;
      refs.rubberDamper.current.visible = isVisible;
      refs.rubberDamper.current.position.y = lerp(2.2, 0.65, e.vulcanize);
      // Under vibration test (stage 4): subtle dynamic pulse
      if (e.test > 0.5) {
        refs.rubberDamper.current.position.y = 0.65 + Math.sin(time * 12) * 0.03;
      }
    }

    // Vulcanization Heat Light
    if (refs.heatLight.current) {
      refs.heatLight.current.intensity = 18 * e.vulcanize * (1 - 0.7 * e.test);
    }

    // Coating Spray sweep ring
    if (refs.sprayRing.current) {
      const isApplying = (a.primer > 0.02 && a.primer < 0.98) || (a.covercoat > 0.02 && a.covercoat < 0.98);
      refs.sprayRing.current.visible = isApplying;
      if (isApplying) {
        const prog = a.covercoat > 0 ? a.covercoat : a.primer;
        refs.sprayRing.current.position.y = lerp(0.1, 1.3, prog);
        refs.sprayRing.current.material.opacity = 0.8 * (1 - Math.pow(Math.abs(2 * prog - 1), 4));
      }
    }

    // Inspection scan line
    if (refs.scanLine.current) {
      const active = e.test > 0.02;
      refs.scanLine.current.visible = active;
      refs.scanLine.current.position.y = 0.2 + (Math.sin(time * 2.2) * 0.5 + 0.5) * 1.2;
      refs.scanLine.current.material.opacity = 0.6 * e.test;
    }

    // Quality test verified ring
    if (refs.ringOk.current) {
      refs.ringOk.current.visible = e.test > 0.02;
      refs.ringOk.current.material.opacity = 0.85 * e.test;
      refs.ringOk.current.scale.setScalar(lerp(0.7, 1, e.test));
    }
  });

  const hs = STAGES[stage].hotspots;
  const flat = () => [-Math.PI / 2, 0, 0];

  return (
    <group>
      {/* Outer Steel Mounting Flange Bracket */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.0, 2.1, 0.2, 64]} />
        <meshStandardMaterial color="#3b4a59" metalness={0.88} roughness={0.25} />
      </mesh>

      {/* Outer Steel Bushing Cylinder Sleeve */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[1.65, 1.65, 1.0, 64, 1, true]} />
        <meshStandardMaterial color="#425568" metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner Machined Steel Arbor Core */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.4, 48]} />
        <meshStandardMaterial color="#60768c" metalness={0.92} roughness={0.2} />
      </mesh>

      {/* Inner Central Bore Through-Hole */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.42, 32]} />
        <meshStandardMaterial color="#1a2530" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Primer Layer (Passivating thin film coating inner sleeve face & arbor outer face) */}
      <mesh ref={refs.primerRing} position={[0, 0.65, 0]} visible={false}>
        <cylinderGeometry args={[0.58, 0.58, 1.02, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.5}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Adhesive Covercoat Layer (Active bonding polymer interface) */}
      <mesh ref={refs.covercoatRing} position={[0, 0.65, 0]} visible={false}>
        <cylinderGeometry args={[0.61, 0.61, 1.01, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.6}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Molded Elastomeric Damper Bushing (Dampening rubber compound fused between arbor & sleeve) */}
      <group ref={refs.rubberDamper} position={[0, 0.65, 0]} visible={false}>
        <mesh>
          <cylinderGeometry args={[1.6, 1.6, 0.95, 64, 1, true]} />
          <meshStandardMaterial color="#121820" roughness={0.6} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
        {/* Annular rubber body */}
        <mesh rotation={flat()} position={[0, 0, 0]}>
          <ringGeometry args={[0.62, 1.59, 48]} />
          <meshStandardMaterial color="#18222d" roughness={0.55} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={flat()} position={[0, 0.45, 0]}>
          <ringGeometry args={[0.62, 1.59, 48]} />
          <meshStandardMaterial color="#18222d" roughness={0.55} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={flat()} position={[0, -0.45, 0]}>
          <ringGeometry args={[0.62, 1.59, 48]} />
          <meshStandardMaterial color="#18222d" roughness={0.55} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Effects: Spray ring, scan laser, heat light */}
      <mesh ref={refs.sprayRing} rotation={flat()} position={[0, 0.6, 0]} visible={false}>
        <ringGeometry args={[1.75, 1.9, 64]} />
        <meshBasicMaterial color="#f59e0b" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={refs.scanLine} rotation={flat()} visible={false}>
        <ringGeometry args={[0, 1.9, 64]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={refs.ringOk} rotation={flat()} position={[0, 0.1, 0]} visible={false}>
        <ringGeometry args={[2.05, 2.15, 96]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <pointLight ref={refs.heatLight} position={[0, 0.8, 0]} color="#f59e0b" distance={8} decay={2} intensity={0} />

      {hs.map((h) => (
        <Hotspot key={`${stage}-${h.label}`} {...h} />
      ))}
    </group>
  );
}

function Stage({ stage, reduced, autoRotate, onInteract }) {
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera);
  const { width, height } = useThree((s) => s.size);

  useEffect(() => {
    camera.zoom = width / height < 1 ? 0.78 : 1;
    camera.updateProjectionMatrix();
  }, [camera, width, height]);

  useEffect(() => {
    gl.domElement.style.touchAction = "pan-y";
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 8, 4]} intensity={1.8} />
      <directionalLight position={[-5, 4, -4]} intensity={1.2} color="#f59e0b" />

      <Environment resolution={256} frames={1} environmentIntensity={0.85}>
        <mesh scale={60}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color="#1a1408" side={THREE.BackSide} />
        </mesh>
        <Lightformer form="rect" intensity={3.5} position={[0, 6, -3]} scale={[12, 2.5, 1]} color="#fef3c7" />
        <Lightformer form="rect" intensity={2.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} color="#f59e0b" />
        <Lightformer form="rect" intensity={3} position={[6, 2, 3]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} color="#ffffff" />
      </Environment>

      {/* Turntable */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[2.35, 2.45, 0.14, 96]} />
        <meshStandardMaterial color="#261b0d" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.175, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.25, 2.33, 96]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <ContactShadows position={[0, -0.17, 0]} opacity={0.55} scale={7} blur={2.4} far={2.2} resolution={256} />

      <Model stage={stage} reduced={reduced} />

      {!reduced && (
        <Sparkles count={32} scale={[7, 3.5, 7]} position={[0, 1.4, 0]} size={2.2} speed={0.25} opacity={0.5} color="#fbbf24" />
      )}

      <OrbitControls
        target={[0, 0.7, 0]}
        enablePan={false}
        enableZoom={false}
        enableDamping
        minPolarAngle={0.85}
        maxPolarAngle={1.62}
        autoRotate={autoRotate && !reduced}
        autoRotateSpeed={0.8}
        onStart={onInteract}
      />
    </>
  );
}

export default function AdhesiveScene({ stage, active, reduced, autoRotate, onInteract }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [5.8, 3.8, 6.8], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Stage stage={stage} reduced={reduced} autoRotate={autoRotate} onInteract={onInteract} />
    </Canvas>
  );
}
