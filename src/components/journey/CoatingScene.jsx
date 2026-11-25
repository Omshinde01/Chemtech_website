/* eslint-disable react-hooks/immutability, react-hooks/refs */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneShell, { Hotspot } from "./SceneShell";
import { STAGES } from "./coatingStages";

const CHANNELS = ["blast", "corrosion", "thermal", "armor", "inspect"];
const DURATION = {
  blast: 1.6,
  corrosion: 2.2,
  thermal: 2.2,
  armor: 2.0,
  inspect: 1.6,
};

// 5 stages
const TARGETS = [
  /* 0: prep       */ [1, 0, 0, 0, 0],
  /* 1: primer     */ [1, 1, 0, 0, 0],
  /* 2: thermal    */ [1, 1, 1, 0, 0],
  /* 3: armor      */ [1, 1, 1, 1, 0],
  /* 4: inspect    */ [1, 1, 1, 1, 1],
].map((row) => Object.fromEntries(CHANNELS.map((c, i) => [c, row[i]])));

const ease = (x) => x * x * (3 - 2 * x);
const lerp = THREE.MathUtils.lerp;

function Model({ stage, reduced }) {
  const anim = useRef(Object.fromEntries(CHANNELS.map((c) => [c, 0])));

  const refs = {
    barrierLayer: useRef(),
    thermalGlow: useRef(),
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

    // Anti-corrosion passivating coat: Shimmers emerald / teal
    if (refs.barrierLayer.current) {
      refs.barrierLayer.current.visible = e.corrosion > 0.01;
      for (const mesh of refs.barrierLayer.current.children) mesh.material.opacity = 0.55 * e.corrosion;
    }

    // Thermal Ceramic Matrix heat glow
    if (refs.thermalGlow.current) {
      refs.thermalGlow.current.intensity = 18 * e.thermal * (1 - 0.7 * e.armor);
    }

    // Spray sweep ring during application
    if (refs.sprayRing.current) {
      const isSpraying =
        (a.corrosion > 0.02 && a.corrosion < 0.98) ||
        (a.thermal > 0.02 && a.thermal < 0.98) ||
        (a.armor > 0.02 && a.armor < 0.98);
      refs.sprayRing.current.visible = isSpraying;
      if (isSpraying) {
        const prog = a.armor > 0 ? a.armor : a.thermal > 0 ? a.thermal : a.corrosion;
        refs.sprayRing.current.position.y = lerp(-0.1, 1.6, prog);
        refs.sprayRing.current.material.opacity = 0.8 * (1 - Math.pow(Math.abs(2 * prog - 1), 4));
      }
    }

    // Inspection scan line
    if (refs.scanLine.current) {
      const active = e.inspect > 0.02;
      refs.scanLine.current.visible = active;
      refs.scanLine.current.position.y = 0.1 + (Math.sin(time * 2.2) * 0.5 + 0.5) * 1.6;
      refs.scanLine.current.material.opacity = 0.6 * e.inspect;
    }

    // Inspection verified green ring
    if (refs.ringOk.current) {
      refs.ringOk.current.visible = e.inspect > 0.02;
      refs.ringOk.current.material.opacity = 0.85 * e.inspect;
      refs.ringOk.current.scale.setScalar(lerp(0.7, 1, e.inspect));
    }
  });

  const hs = STAGES[stage].hotspots;
  const flat = () => [-Math.PI / 2, 0, 0];

  return (
    <group position={[0, 0.4, 0]}>
      {/* Central Spherical Valve Body */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.9, 48, 32]} />
        <meshStandardMaterial color="#425563" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Horizontal Pipe Through-Body */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 2.8, 48]} />
        <meshStandardMaterial color="#3b4d5a" metalness={0.82} roughness={0.28} />
      </mesh>

      {/* Left Flange Ring with Bolt Cutouts */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[-1.4, 0.4, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.18, 48]} />
        <meshStandardMaterial color="#2d3d49" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Right Flange Ring with Bolt Cutouts */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[1.4, 0.4, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.18, 48]} />
        <meshStandardMaterial color="#2d3d49" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Vertical Bonnet Neck */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.48, 0.54, 0.7, 32]} />
        <meshStandardMaterial color="#384956" metalness={0.86} roughness={0.25} />
      </mesh>

      {/* Top Bonnet Flange */}
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.14, 36]} />
        <meshStandardMaterial color="#2c3a44" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Handwheel / Actuator Stem */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.35, 24]} />
        <meshStandardMaterial color="#1f2930" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Protective Barrier Coating Envelope (Slightly larger scale, glowing passivated finish) */}
      <group ref={refs.barrierLayer} visible={false}>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.92, 48, 32]} />
          <meshPhysicalMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.4}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.63, 0.63, 2.76, 48]} />
          <meshPhysicalMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.35}
            roughness={0.15}
            clearcoat={1}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.49, 0.55, 0.69, 32]} />
          <meshPhysicalMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.35}
            roughness={0.15}
            clearcoat={1}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      {/* Effects: Spray ring, scan laser, thermal light */}
      <mesh ref={refs.sprayRing} rotation={flat()} position={[0, 0.4, 0]} visible={false}>
        <ringGeometry args={[1.7, 1.85, 64]} />
        <meshBasicMaterial color="#10b981" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={refs.scanLine} rotation={flat()} visible={false}>
        <ringGeometry args={[0, 1.9, 64]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={refs.ringOk} rotation={flat()} position={[0, -0.2, 0]} visible={false}>
        <ringGeometry args={[2.05, 2.15, 96]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <pointLight ref={refs.thermalGlow} position={[0, 0.5, 0]} color="#fbbf24" distance={9} decay={2} intensity={0} />

      {hs.map((h) => (
        <Hotspot key={`${stage}-${h.label}`} {...h} />
      ))}
    </group>
  );
}

const THEME = { accent: "#10b981", table: "#0b241c", sky: "#061c14", rim: "#10b981", key: "#d1fae5", fill: "#10b981", spark: "#34d399" };

export default function CoatingScene(props) {
  return (
    <SceneShell {...props} theme={THEME} target={[0, 0.8, 0]} camera={[5.8, 3.8, 6.8]} tableY={-0.25}>
      <Model stage={props.stage} reduced={props.reduced} />
    </SceneShell>
  );
}
