/* eslint-disable react-hooks/immutability, react-hooks/refs -- three.js objects are mutated imperatively in useFrame by design */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows, Sparkles, Html } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { STAGES } from "./castingStages";

/* ───────────────────────── Geometry (procedural turbine wheel) ───────────────────────── */

const N_BLADES = 9;
const TOP = 2.9; // above everything, used as "fully open" clip height
const BOTTOM = -0.35;

// Hub contour in (radius, height): a cubic Bezier from the inducer (top) to the outer rim.
const P = [[0.3, 1.1], [0.35, 0.5], [0.7, 0.2], [1.5, 0.12]];
function hubAt(t) {
  const u = 1 - t;
  const b = (i) => (i === 0 ? u * u * u : i === 1 ? 3 * u * u * t : i === 2 ? 3 * u * t * t : t * t * t);
  let r = 0, y = 0;
  for (let i = 0; i < 4; i++) { r += b(i) * P[i][0]; y += b(i) * P[i][1]; }
  const d = (i) => (i === 0 ? 3 * u * u : i === 1 ? 6 * u * t : 3 * t * t);
  let dr = 0, dy = 0;
  for (let i = 0; i < 3; i++) { dr += d(i) * (P[i + 1][0] - P[i][0]); dy += d(i) * (P[i + 1][1] - P[i][1]); }
  const len = Math.hypot(dr, dy);
  return { r, y, nr: -dy / len, ny: dr / len }; // n = outward normal of the hub surface
}

// Indexed quad grid from a parametric surface f(u, v) -> Vector3.
function grid(f, nu, nv) {
  const pos = [], idx = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) { const p = f(i / nu, j / nv); pos.push(p.x, p.y, p.z); }
  for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
    const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function buildBlade({ thick, pad }) {
  const pt = (s, w, side) => {
    const h = hubAt(s);
    const height = 0.46 * (1 - s) + 0.24 * s + pad;
    const d = -0.06 + w * (height + 0.06);
    const r = h.r + h.nr * d, y = h.y + h.ny * d;
    const th = -0.95 * Math.pow(s, 1.2) + 0.18 * w; // backsweep + lean
    const t = (thick * (1 - 0.4 * w) * Math.min(1, (1 - s) * 10 + 0.35)) / 2;
    return new THREE.Vector3(r * Math.cos(th) - Math.sin(th) * side * t, y, r * Math.sin(th) + Math.cos(th) * side * t);
  };
  // Separate patches keep hard edges crisp (normals aren't smoothed across them).
  return mergeGeometries([
    grid((u, v) => pt(u, v, 1), 44, 8),
    grid((u, v) => pt(u, v, -1), 44, 8),
    grid((u, v) => pt(0, v, 1 - 2 * u), 2, 8),
    grid((u, v) => pt(1, v, 1 - 2 * u), 2, 8),
    grid((u, v) => pt(u, 1, 1 - 2 * v), 44, 2),
  ]);
}

function buildHub(pad) {
  const pts = [new THREE.Vector2(0, -0.2 - pad), new THREE.Vector2(1.5 + pad, -0.2 - pad)];
  for (let i = 0; i <= 24; i++) {
    const h = hubAt(1 - i / 24);
    pts.push(new THREE.Vector2(h.r + h.nr * pad, h.y + h.ny * pad));
  }
  pts.push(new THREE.Vector2(0.28, 1.14 + pad), new THREE.Vector2(0, 1.17 + pad));
  const g = new THREE.LatheGeometry(pts, 72);
  g.deleteAttribute("uv");
  return g;
}

function buildWheel({ thick, pad }) {
  const blade = buildBlade({ thick, pad });
  const parts = [buildHub(pad)];
  for (let i = 0; i < N_BLADES; i++) {
    const g = blade.clone();
    g.applyMatrix4(new THREE.Matrix4().makeRotationY((i / N_BLADES) * Math.PI * 2));
    parts.push(g);
  }
  return mergeGeometries(parts);
}

function buildSprue(pad) {
  const pts = [[0, 1.0], [0.16 + pad, 1.0], [0.16 + pad, 1.95], [0.3 + pad, 2.1], [0.6 + pad, 2.6 + pad], [0.53, 2.6 + pad], [0.13, 2.15], [0, 2.15]]
    .map(([r, y]) => new THREE.Vector2(r, y));
  const g = new THREE.LatheGeometry(pts, 48);
  g.deleteAttribute("uv");
  return g;
}

function noiseTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const img = ctx.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) { const v = 90 + Math.random() * 165; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 4);
  return t;
}

/* ───────────────────────── Animation targets per stage ───────────────────────── */

// Each channel animates 0..1 at a fixed rate toward its target, so any stage can be
// jumped to (forwards or backwards) and the scene animates smoothly from where it is.
const CHANNELS = ["pattern", "sprue", "shell", "cut", "drain", "heat", "metal", "cool", "shellOut", "sprueCut", "inspect"];
const DURATION = { pattern: 2.2, sprue: 1.3, shell: 2.8, cut: 1.2, drain: 2.2, heat: 1.6, metal: 2.6, cool: 3.2, shellOut: 1.5, sprueCut: 1.5, inspect: 1.2 };
const TARGETS = [
  /* pattern  */ [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  /* assembly */ [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  /* shell    */ [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  /* dewax    */ [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  /* pour     */ [1, 1, 1, 1, 1, 0.25, 1, 0, 0, 0, 0],
  /* finish   */ [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
].map((row) => Object.fromEntries(CHANNELS.map((c, i) => [c, row[i]])));

const ease = (x) => x * x * (3 - 2 * x);
const lerp = THREE.MathUtils.lerp;
const MOLTEN = new THREE.Color("#ff8a2a");
const STEEL = new THREE.Color("#cfd6df");
const SLURRY = new THREE.Color("#e6e1d6");
const SAND = new THREE.Color("#c7b08d");

/* ───────────────────────── Scene ───────────────────────── */

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
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-blue-300/40 bg-[#0B1C2C]/85 py-1 pl-1.5 pr-3 text-xs text-white backdrop-blur focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-400" />
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

function Model({ stage, reduced }) {
  const camera = useThree((s) => s.camera);
  const anim = useRef(Object.fromEntries(CHANNELS.map((c) => [c, 0])));

  const geo = useMemo(() => ({
    wheel: buildWheel({ thick: 0.06, pad: 0 }),
    sprue: buildSprue(0),
    shellWheel: buildWheel({ thick: 0.2, pad: 0.11 }),
    shellSprue: buildSprue(0.1),
  }), []);
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);

  const P_ = useMemo(() => ({
    build: new THREE.Plane(new THREE.Vector3(0, -1, 0), TOP),
    drain: new THREE.Plane(new THREE.Vector3(0, -1, 0), TOP),
    fill: new THREE.Plane(new THREE.Vector3(0, -1, 0), BOTTOM),
    coat: new THREE.Plane(new THREE.Vector3(0, -1, 0), BOTTOM),
    cut: new THREE.Plane(new THREE.Vector3(0, 0, -1), 3),
    scan: new THREE.Plane(new THREE.Vector3(0, -1, 0), TOP),
  }), []);

  const mats = useMemo(() => {
    const wax = () => new THREE.MeshPhysicalMaterial({
      color: "#f2b441", roughness: 0.28, clearcoat: 0.5, clearcoatRoughness: 0.3, sheen: 0.5, sheenColor: new THREE.Color("#ffd98a"),
      emissive: new THREE.Color("#ff5a00"), emissiveIntensity: 0, side: THREE.DoubleSide, transparent: true,
    });
    const shell = () => new THREE.MeshStandardMaterial({
      color: "#e6e1d6", roughness: 1, metalness: 0, bumpMap: noiseTexture(), bumpScale: 2.5, emissive: new THREE.Color("#ff4d00"),
      emissiveIntensity: 0, side: THREE.DoubleSide, transparent: true,
    });
    const metal = () => new THREE.MeshStandardMaterial({
      color: "#ff8a2a", metalness: 1, roughness: 0.5, emissive: new THREE.Color("#ff5a10"), emissiveIntensity: 0,
      side: THREE.DoubleSide, transparent: true,
    });
    const m = { wax: wax(), waxSprue: wax(), shell: shell(), shellSprue: shell(), metal: metal(), metalSprue: metal() };
    m.wax.clippingPlanes = [P_.build, P_.drain];
    m.waxSprue.clippingPlanes = [P_.drain];
    m.shell.clippingPlanes = [P_.coat, P_.cut];
    m.shellSprue.clippingPlanes = [P_.coat, P_.cut];
    m.metal.clippingPlanes = [P_.fill];
    m.metalSprue.clippingPlanes = [P_.fill];
    return m;
  }, [P_]);
  useEffect(() => () => Object.values(mats).forEach((m) => { m.bumpMap?.dispose(); m.dispose(); }), [mats]);

  const refs = { sprueGroup: useRef(), shellGroup: useRef(), metalSprueGroup: useRef(), heatLight: useRef(), pourLight: useRef(),
    stream: useRef(), ringBuild: useRef(), ringFill: useRef(), ringScan: useRef(), ringOk: useRef(), scanLine: useRef() };

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

    // Sweeping clip planes
    P_.build.constant = lerp(BOTTOM, 1.4, e.pattern);
    P_.drain.constant = lerp(TOP, BOTTOM, e.drain);
    P_.fill.constant = lerp(BOTTOM, 2.7, e.metal);
    P_.coat.constant = lerp(BOTTOM, TOP, e.shell);
    // Cut-away always removes the half of the shell that faces the camera
    const cx = camera.position.x, cz = camera.position.z, cl = Math.hypot(cx, cz) || 1;
    P_.cut.normal.set(-cx / cl, 0, -cz / cl);
    P_.cut.constant = lerp(3, 0, e.cut);

    // Wax
    mats.wax.emissiveIntensity = mats.waxSprue.emissiveIntensity = 0.5 * e.heat;
    mats.waxSprue.opacity = e.sprue;
    refs.sprueGroup.current.visible = e.sprue > 0.01;
    refs.sprueGroup.current.position.y = lerp(1.6, 0, e.sprue);

    // Shell: dips up the part, slurry -> sand, then glows while heated and finally knocks off
    const coatCol = SLURRY.clone().lerp(SAND, Math.min(1, e.shell * 1.6));
    for (const m of [mats.shell, mats.shellSprue]) {
      m.color.copy(coatCol);
      m.emissiveIntensity = 0.38 * e.heat;
      m.opacity = 1 - e.shellOut;
    }
    refs.shellGroup.current.visible = e.shell > 0.01 && e.shellOut < 0.99;
    refs.shellGroup.current.scale.setScalar(1 + 0.1 * e.shellOut);

    // Metal: molten orange -> steel
    const molten = e.metal * (1 - e.cool);
    for (const m of [mats.metal, mats.metalSprue]) {
      m.color.copy(MOLTEN).lerp(STEEL, e.cool);
      m.roughness = lerp(0.55, 0.22, e.cool);
      m.emissiveIntensity = 2.4 * molten;
    }
    mats.metalSprue.opacity = 1 - e.sprueCut;
    refs.metalSprueGroup.current.position.y = 1.5 * e.sprueCut;
    refs.metalSprueGroup.current.visible = e.metal > 0.01 && e.sprueCut < 0.99;

    // Lights that sell the heat
    refs.heatLight.current.intensity = 5 * e.heat;
    refs.pourLight.current.intensity = 22 * molten;

    // Pour stream
    const streamOn = ease(THREE.MathUtils.clamp((a.metal - 0.02) / 0.08, 0, 1)) * (1 - ease(THREE.MathUtils.clamp((a.metal - 0.82) / 0.12, 0, 1)));
    refs.stream.current.visible = streamOn > 0.02 && stage === 4;
    refs.stream.current.material.opacity = streamOn;

    // Halo rings tracking each sweep
    const ring = (mesh, progress, y) => {
      const on = progress > 0.015 && progress < 0.985;
      mesh.visible = on;
      if (on) { mesh.position.y = y; mesh.material.opacity = 0.75 * (1 - Math.pow(Math.abs(2 * progress - 1), 4)); }
    };
    ring(refs.ringBuild.current, a.pattern, P_.build.constant);
    ring(refs.ringFill.current, a.metal, P_.fill.constant);
    ring(refs.ringScan.current, a.shell, P_.coat.constant);

    // Inspection laser + verified ring
    const scan = refs.scanLine.current;
    scan.visible = e.inspect > 0.02;
    scan.position.y = 0.1 + (Math.sin(time * 1.6) * 0.5 + 0.5) * 1.05;
    scan.material.opacity = 0.55 * e.inspect;
    refs.ringOk.current.visible = e.inspect > 0.02;
    refs.ringOk.current.material.opacity = 0.9 * e.inspect * (0.65 + 0.35 * Math.sin(time * 2.4));
    refs.ringOk.current.scale.setScalar(lerp(0.6, 1, e.inspect));
  });

  const hs = STAGES[stage].hotspots;
  const flat = () => [-Math.PI / 2, 0, 0];
  return (
    <group>
      {/* Wax pattern + sprue */}
      <mesh geometry={geo.wheel} material={mats.wax} />
      <group ref={refs.sprueGroup}><mesh geometry={geo.sprue} material={mats.waxSprue} /></group>

      {/* Ceramic shell */}
      <group ref={refs.shellGroup}>
        <mesh geometry={geo.shellWheel} material={mats.shell} />
        <mesh geometry={geo.shellSprue} material={mats.shellSprue} />
      </group>

      {/* Cast metal (slightly inset to avoid z-fighting with the wax it replaces) */}
      <group scale={0.996}>
        <mesh geometry={geo.wheel} material={mats.metal} />
        <group ref={refs.metalSprueGroup}><mesh geometry={geo.sprue} material={mats.metalSprue} /></group>
      </group>

      {/* Effects */}
      <mesh ref={refs.stream} position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.07, 0.11, 1.7, 16]} />
        <meshBasicMaterial color="#ffc27a" transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {[["ringBuild", "#60a5fa", 1.85], ["ringFill", "#ff9a3c", 1.85], ["ringScan", "#e6e1d6", 1.85]].map(([k, color, r]) => (
        <mesh key={k} ref={refs[k]} rotation={flat()} visible={false}>
          <ringGeometry args={[r - 0.07, r, 96]} />
          <meshBasicMaterial color={color} transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
      <mesh ref={refs.scanLine} rotation={flat()} visible={false}>
        <ringGeometry args={[0, 1.7, 64]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={refs.ringOk} rotation={flat()} position={[0, -0.24, 0]} visible={false}>
        <ringGeometry args={[2.0, 2.09, 96]} />
        <meshBasicMaterial color="#34d399" transparent side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <pointLight ref={refs.heatLight} position={[0, 1.2, 0]} color="#ff6a1a" distance={9} decay={2} intensity={0} />
      <pointLight ref={refs.pourLight} position={[0, 0.9, 0]} color="#ff8a2a" distance={9} decay={2} intensity={0} />

      {hs.map((h) => <Hotspot key={`${stage}-${h.label}`} {...h} />)}
    </group>
  );
}

function Stage({ stage, reduced, autoRotate, onInteract }) {
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
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 7, 4]} intensity={1.7} />
      <directionalLight position={[-5, 3, -4]} intensity={1.1} color="#5b9dff" />

      <Environment resolution={256} frames={1} environmentIntensity={0.9}>
        <mesh scale={60}><sphereGeometry args={[1, 32, 16]} /><meshBasicMaterial color="#0c1f33" side={THREE.BackSide} /></mesh>
        <Lightformer form="rect" intensity={4} position={[0, 6, -3]} scale={[12, 2.5, 1]} color="#dbe9ff" />
        <Lightformer form="rect" intensity={2.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} color="#6aa3ff" />
        <Lightformer form="rect" intensity={3} position={[6, 2, 3]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} color="#ffffff" />
      </Environment>

      {/* Turntable */}
      <mesh position={[0, -0.34, 0]}>
        <cylinderGeometry args={[2.35, 2.45, 0.14, 96]} />
        <meshStandardMaterial color="#0d2438" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.265, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.25, 2.33, 96]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      <ContactShadows position={[0, -0.26, 0]} opacity={0.55} scale={7} blur={2.4} far={2.2} resolution={256} />

      <Model stage={stage} reduced={reduced} />

      {!reduced && <Sparkles count={36} scale={[7, 3.5, 7]} position={[0, 1.4, 0]} size={2.2} speed={0.25} opacity={0.55} color="#7db3ff" />}

      <OrbitControls
        target={[0, 1.3, 0]}
        enablePan={false}
        enableZoom={false}
        enableDamping
        minPolarAngle={0.85}
        maxPolarAngle={1.62}
        autoRotate={autoRotate && !reduced}
        autoRotateSpeed={0.9}
        onStart={onInteract}
      />
    </>
  );
}

export default function CastingScene({ stage, active, reduced, autoRotate, onInteract }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [5.9, 3.3, 7.0], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => { gl.localClippingEnabled = true; }}
    >
      <Stage stage={stage} reduced={reduced} autoRotate={autoRotate} onInteract={onInteract} />
    </Canvas>
  );
}
