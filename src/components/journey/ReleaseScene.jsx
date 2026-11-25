/* eslint-disable react-hooks/immutability, react-hooks/refs */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneShell, { Hotspot } from "./SceneShell";
import { STAGES } from "./releaseStages";

const CHANNELS = ["toolPrep", "barrier", "charge", "clamp", "heat", "demold", "inspect"];
const DURATION = {
  toolPrep: 1.5,
  barrier: 2.0,
  charge: 1.8,
  clamp: 1.6,
  heat: 2.2,
  demold: 2.0,
  inspect: 1.5,
};

// 6 stages
const TARGETS = [
  /* 0: prep     */ [1, 0, 0, 0, 0, 0, 0],
  /* 1: barrier  */ [1, 1, 0, 0, 0, 0, 0],
  /* 2: loading  */ [1, 1, 1, 0, 0, 0, 0],
  /* 3: cure     */ [1, 1, 1, 1, 1, 0, 0],
  /* 4: demold   */ [1, 1, 1, 0, 0.2, 1, 0],
  /* 5: repeat   */ [1, 1, 0, 0, 0, 0, 1],
].map((row) => Object.fromEntries(CHANNELS.map((c, i) => [c, row[i]])));

const ease = (x) => x * x * (3 - 2 * x);
const lerp = THREE.MathUtils.lerp;

function Model({ stage, reduced }) {
  const anim = useRef(Object.fromEntries(CHANNELS.map((c) => [c, 0])));

  const refs = {
    upperDie: useRef(),
    part: useRef(),
    barrierFilm: useRef(),
    heatLight: useRef(),
    ringSpray: useRef(),
    scanLine: useRef(),
    ringOk: useRef(),
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

    // Upper die movement: clamps down to Y=0.7 in stage 3, lifts up to Y=2.8 in other stages
    if (refs.upperDie.current) {
      refs.upperDie.current.position.y = lerp(2.8, 0.72, e.clamp);
    }

    // Molded Part (Rubber seal ring):
    // Appears at charge, sits inside cavity at cure, rises up to Y=1.7 during demold
    if (refs.part.current) {
      const isVisible = e.charge > 0.02;
      refs.part.current.visible = isVisible;
      const demoldHeight = lerp(0.28, 1.65, e.demold);
      refs.part.current.position.y = isVisible ? demoldHeight : 0.28;
      // Slight rotation while floating after demold
      if (e.demold > 0.5) {
        refs.part.current.rotation.y = time * 0.4;
      } else {
        refs.part.current.rotation.y = 0;
      }
    }

    // Release Barrier Film: Shimmers during barrier application
    if (refs.barrierFilm.current) {
      refs.barrierFilm.current.visible = e.barrier > 0.01;
      refs.barrierFilm.current.material.opacity = lerp(0, 0.45, e.barrier);
    }

    // Heating Light
    if (refs.heatLight.current) {
      refs.heatLight.current.intensity = 16 * e.heat;
    }

    // Barrier spray halo
    if (refs.ringSpray.current) {
      const on = a.barrier > 0.02 && a.barrier < 0.98;
      refs.ringSpray.current.visible = on;
      if (on) {
        refs.ringSpray.current.position.y = lerp(0.2, 1.2, a.barrier);
        refs.ringSpray.current.material.opacity = 0.8 * (1 - Math.pow(Math.abs(2 * a.barrier - 1), 4));
      }
    }

    // Inspection scan
    if (refs.scanLine.current) {
      const active = e.inspect > 0.02;
      refs.scanLine.current.visible = active;
      refs.scanLine.current.position.y = 0.2 + (Math.sin(time * 2) * 0.5 + 0.5) * 1.5;
      refs.scanLine.current.material.opacity = 0.6 * e.inspect;
    }

    if (refs.ringOk.current) {
      refs.ringOk.current.visible = e.inspect > 0.02;
      refs.ringOk.current.material.opacity = 0.85 * e.inspect;
      refs.ringOk.current.scale.setScalar(lerp(0.7, 1, e.inspect));
    }
  });

  const hs = STAGES[stage].hotspots;
  const flat = () => [-Math.PI / 2, 0, 0];

  return (
    <group>
      {/* Lower Mold Base (Tool Steel Cavity Die) */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.0, 2.1, 0.45, 64]} />
        <meshStandardMaterial color="#22364a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Mold Cavity Recess Rim */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.65, 1.65, 0.06, 64]} />
        <meshStandardMaterial color="#162738" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Inner Core Island of the Mold */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.7, 0.75, 0.22, 48]} />
        <meshStandardMaterial color="#2d445a" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* Release Barrier Layer (Luminescent semi-transparent film lining cavity) */}
      <mesh ref={refs.barrierFilm} position={[0, 0.2, 0]} rotation={flat()} visible={false}>
        <ringGeometry args={[0.72, 1.6, 64]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Molded Rubber Seal Part (Torus with precision profile) */}
      <group ref={refs.part} position={[0, 0.28, 0]} visible={false}>
        <mesh rotation={flat()}>
          <torusGeometry args={[1.15, 0.32, 32, 64]} />
          <meshStandardMaterial color="#111822" roughness={0.45} metalness={0.15} />
        </mesh>
        {/* Fine ribbed details on the seal */}
        <mesh rotation={flat()} position={[0, 0.08, 0]}>
          <torusGeometry args={[1.15, 0.12, 16, 48]} />
          <meshStandardMaterial color="#1a2533" roughness={0.5} metalness={0.1} />
        </mesh>
      </group>

      {/* Upper Mold Die / Ram (Lifts and clamps) */}
      <group ref={refs.upperDie} position={[0, 2.8, 0]}>
        <mesh>
          <cylinderGeometry args={[1.9, 1.85, 0.5, 64]} />
          <meshStandardMaterial color="#334b62" metalness={0.85} roughness={0.3} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.6, 32]} />
          <meshStandardMaterial color="#1f3142" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Effects: Spray ring, scan laser, heat light */}
      <mesh ref={refs.ringSpray} rotation={flat()} position={[0, 0.4, 0]} visible={false}>
        <ringGeometry args={[1.7, 1.85, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={refs.scanLine} rotation={flat()} visible={false}>
        <ringGeometry args={[0, 1.9, 64]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh ref={refs.ringOk} rotation={flat()} position={[0, 0.05, 0]} visible={false}>
        <ringGeometry args={[2.0, 2.1, 96]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <pointLight ref={refs.heatLight} position={[0, 0.8, 0]} color="#f97316" distance={8} decay={2} intensity={0} />

      {hs.map((h) => (
        <Hotspot key={`${stage}-${h.label}`} {...h} />
      ))}
    </group>
  );
}

const THEME = { accent: "#22d3ee", table: "#0c2333", sky: "#071b28", rim: "#38bdf8", key: "#cffafe", fill: "#38bdf8", spark: "#38bdf8" };

export default function ReleaseScene(props) {
  return (
    <SceneShell {...props} theme={THEME} target={[0, 0.9, 0]} camera={[5.8, 3.8, 6.8]} tableY={-0.34}>
      <Model stage={props.stage} reduced={props.reduced} />
    </SceneShell>
  );
}
