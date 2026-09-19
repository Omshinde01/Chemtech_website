import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Hand, Pause, Play } from "lucide-react";
import { STAGES, TRUST_POINTS } from "./castingStages";

// three.js is large, so it only downloads when the section is near the viewport.
const CastingScene = lazy(() => import("./CastingScene"));

const AUTOPLAY_MS = 6500;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// `once` latches to true after the first time the element is seen.
function useVisibility(ref, { rootMargin = "0px", threshold = 0, once = false } = {}) {
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
      else if (!once) setVisible(false);
    }, { rootMargin, threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin, threshold, once]);
  return visible;
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { console.error("3D scene failed:", err); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function Placeholder({ stage, message }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <span className="text-7xl font-semibold text-blue-400/30">{String(stage + 1).padStart(2, "0")}</span>
      <span className="mt-2 text-lg font-medium text-white">{STAGES[stage].title}</span>
      <span className="mt-2 max-w-xs text-sm text-gray-400">{message}</span>
    </div>
  );
}

export default function CastingJourney() {
  const sectionRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [reduced] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const [playing, setPlaying] = useState(!reduced);
  const [webgl] = useState(() => typeof document !== "undefined" && hasWebGL());
  const loadScene = useVisibility(sectionRef, { rootMargin: "300px 0px", once: true });
  const inView = useVisibility(sectionRef, { threshold: 0.3 });

  // Autoplay: only while on screen, and it stops as soon as the visitor takes over.
  useEffect(() => {
    if (!playing || !inView) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % STAGES.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, inView, stage]);

  const go = useCallback((i) => { setPlaying(false); setStage((i + STAGES.length) % STAGES.length); }, []);
  const stopAutoplay = useCallback(() => setPlaying(false), []);
  const s = STAGES[stage];

  return (
    <section ref={sectionRef} id="casting-journey" aria-labelledby="journey-title" className="bg-[#0B1C2C] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="journey-title" className="text-3xl font-bold leading-tight md:text-4xl">
            See how a precision casting is made
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Follow one turbine wheel through lost-wax investment casting. Drag the model to look around, or step through
            each stage to see where wax quality decides the result.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
          {/* 3D viewport */}
          <div className="min-w-0 lg:col-span-3">
            <div
              role="group"
              aria-label="Interactive 3D model of a casting. Drag to rotate."
              className="relative isolate h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_50%_30%,#17385a_0%,#0B1C2C_72%)] sm:h-[460px] lg:h-[540px]"
            >
              {webgl && loadScene ? (
                <SceneBoundary fallback={<Placeholder stage={stage} message="The 3D view couldn't start on this device. The stages below still tell the full story." />}>
                  <Suspense fallback={<Placeholder stage={stage} message="Loading 3D model…" />}>
                    <CastingScene stage={stage} active={inView} reduced={reduced} autoRotate={inView} onInteract={stopAutoplay} />
                  </Suspense>
                </SceneBoundary>
              ) : (
                <Placeholder stage={stage} message={webgl ? "Loading 3D model…" : "3D view isn't supported on this device. The stages below still tell the full story."} />
              )}

              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-[#0B1C2C]/80 px-3 py-1 text-xs text-gray-300 backdrop-blur">
                Stage {stage + 1} of {STAGES.length}
              </div>
              {webgl && (
                <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-1.5 rounded-full border border-white/10 bg-[#0B1C2C]/80 px-3 py-1 text-xs text-gray-300 backdrop-blur sm:flex">
                  <Hand size={12} /> Drag to rotate
                </div>
              )}

              {/* Transport controls */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[#0B1C2C] to-transparent px-4 pb-4 pt-10">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => go(stage - 1)} aria-label="Previous stage" className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause automatic tour" : "Play automatic tour"} className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button type="button" onClick={() => go(stage + 1)} aria-label="Next stage" className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="flex flex-1 justify-end gap-1.5" aria-hidden="true">
                  {STAGES.map((st, i) => (
                    <span key={st.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === stage ? "w-8 bg-blue-400" : i < stage ? "w-4 bg-blue-400/50" : "w-4 bg-white/15"}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Stage picker */}
            <ol className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {STAGES.map((st, i) => (
                <li key={st.id} className="flex-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === stage ? "step" : undefined}
                    className={`w-full whitespace-nowrap rounded-lg border px-3 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      i === stage ? "border-blue-400/60 bg-blue-500/15 text-white" : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="mr-2 text-blue-400">{i + 1}</span>{st.short}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Explanation */}
          <div className="min-w-0 lg:col-span-2">
            <div key={s.id} aria-live="polite" className="stage-in flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-sm text-blue-400">Stage {stage + 1}</p>
              <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-300">{s.summary}</p>

              <div className="mt-5 rounded-xl border border-white/10 bg-[#0B1C2C]/60 p-4">
                <p className="text-sm font-medium text-white">Why it matters</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{s.matters}</p>
              </div>

              {s.materials.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-white">Chemtech materials at this stage</p>
                  <ul className="mt-2 space-y-2">
                    {s.materials.map((m) => (
                      <li key={m.name}>
                        <Link to={m.link || "/investment-casting-wax"} className="group flex items-baseline justify-between gap-3 rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 transition hover:border-blue-400/50 hover:bg-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                          <span className="text-sm font-medium text-blue-200">{m.name}</span>
                          <span className="text-right text-xs text-gray-400">{m.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {stage === STAGES.length - 1 && (
                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                  <Link to="/contact" className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium transition hover:bg-blue-700">Get a quote</Link>
                  <Link to="/investment-casting-wax" className="rounded-lg border border-white/20 px-5 py-3 text-center transition hover:bg-white/10">Explore waxes</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust points (restating what the About page already says) */}
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {TRUST_POINTS.map((t) => (
            <li key={t.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-medium text-white">{t.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{t.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
