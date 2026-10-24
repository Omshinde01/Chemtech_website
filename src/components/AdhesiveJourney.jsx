import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Hand, Pause, Play } from "lucide-react";
import { STAGES, TRUST_POINTS } from "./adhesiveStages";

const AdhesiveScene = lazy(() => import("./AdhesiveScene"));

const AUTOPLAY_MS = 6500;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function useVisibility(ref, { rootMargin = "0px", threshold = 0, once = false } = {}) {
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin, threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin, threshold, once]);
  return visible;
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.error("Adhesive 3D scene failed:", err);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Placeholder({ stage, message }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <span className="text-7xl font-semibold text-amber-400/30">
        {String(stage + 1).padStart(2, "0")}
      </span>
      <span className="mt-2 text-lg font-medium text-white">{STAGES[stage].title}</span>
      <span className="mt-2 max-w-xs text-sm text-gray-400">{message}</span>
    </div>
  );
}

export default function AdhesiveJourney() {
  const sectionRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  const [playing, setPlaying] = useState(!reduced);
  const [webgl] = useState(() => typeof document !== "undefined" && hasWebGL());
  const loadScene = useVisibility(sectionRef, { rootMargin: "300px 0px", once: true });
  const inView = useVisibility(sectionRef, { threshold: 0.3 });

  useEffect(() => {
    if (!playing || !inView) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % STAGES.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, inView, stage]);

  const go = useCallback((i) => {
    setPlaying(false);
    setStage((i + STAGES.length) % STAGES.length);
  }, []);
  const stopAutoplay = useCallback(() => setPlaying(false), []);
  const s = STAGES[stage];

  return (
    <section
      ref={sectionRef}
      id="adhesive-journey"
      aria-labelledby="adhesive-journey-title"
      className="bg-[#150f05] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Interactive Bonding Simulation
          </div>
          <h2 id="adhesive-journey-title" className="text-3xl font-bold leading-tight md:text-4xl">
            See how structural rubber-to-metal bonding is achieved
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Follow a dynamic anti-vibration mount through substrate preparation, passivating primer coating, covercoat
            deposition, and high-pressure vulcanization. Drag the 3D assembly to inspect the bond line, or step through
            each stage to see how Chemtech adhesives deliver rubber-tearing joint strength (&gt;16 MPa).
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
          {/* 3D viewport */}
          <div className="min-w-0 lg:col-span-3">
            <div
              role="group"
              aria-label="Interactive 3D model of a rubber-to-metal bonded assembly. Drag to rotate."
              className="relative isolate h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_50%_30%,#2d1e08_0%,#150f05_72%)] sm:h-[460px] lg:h-[540px]"
            >
              {webgl && loadScene ? (
                <SceneBoundary
                  fallback={
                    <Placeholder
                      stage={stage}
                      message="The 3D view couldn't start on this device. The stages below still tell the full story."
                    />
                  }
                >
                  <Suspense fallback={<Placeholder stage={stage} message="Loading 3D model…" />}>
                    <AdhesiveScene
                      stage={stage}
                      active={inView}
                      reduced={reduced}
                      autoRotate={inView}
                      onInteract={stopAutoplay}
                    />
                  </Suspense>
                </SceneBoundary>
              ) : (
                <Placeholder
                  stage={stage}
                  message={
                    webgl
                      ? "Loading 3D model…"
                      : "3D view isn't supported on this device. The stages below still tell the full story."
                  }
                />
              )}

              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-[#150f05]/80 px-3 py-1 text-xs text-gray-300 backdrop-blur">
                Stage {stage + 1} of {STAGES.length}
              </div>
              {webgl && (
                <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-1.5 rounded-full border border-white/10 bg-[#150f05]/80 px-3 py-1 text-xs text-gray-300 backdrop-blur sm:flex">
                  <Hand size={12} /> Drag to rotate
                </div>
              )}

              {/* Transport controls */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[#150f05] to-transparent px-4 pb-4 pt-10">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => go(stage - 1)}
                    aria-label="Previous stage"
                    className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause automatic tour" : "Play automatic tour"}
                    className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => go(stage + 1)}
                    aria-label="Next stage"
                    className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="flex flex-1 justify-end gap-1.5" aria-hidden="true">
                  {STAGES.map((st, i) => (
                    <span
                      key={st.id}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === stage ? "w-8 bg-amber-400" : i < stage ? "w-4 bg-amber-400/50" : "w-4 bg-white/15"
                      }`}
                    />
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
                    className={`w-full whitespace-nowrap rounded-lg border px-3 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      i === stage
                        ? "border-amber-400/60 bg-amber-500/15 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="mr-2 text-amber-400">{i + 1}</span>
                    {st.short}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Explanation */}
          <div className="min-w-0 lg:col-span-2">
            <div
              key={s.id}
              aria-live="polite"
              className="stage-in flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <p className="text-sm text-amber-400">Stage {stage + 1}</p>
              <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-300">{s.summary}</p>

              <div className="mt-5 rounded-xl border border-white/10 bg-[#150f05]/60 p-4">
                <p className="text-sm font-medium text-white">Why it matters</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{s.matters}</p>
              </div>

              {s.materials.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-white">Chemtech materials at this stage</p>
                  <ul className="mt-2 space-y-2">
                    {s.materials.map((m) => (
                      <li key={m.name}>
                        <Link
                          to={m.link || "/adhesives"}
                          className="group flex items-baseline justify-between gap-3 rounded-lg border border-amber-400/20 bg-amber-500/10 px-3 py-2 transition hover:border-amber-400/50 hover:bg-amber-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                          <span className="text-sm font-medium text-amber-200">{m.name}</span>
                          <span className="text-right text-xs text-gray-400">{m.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {stage === STAGES.length - 1 && (
                <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                  <Link
                    to="/contact"
                    className="rounded-lg bg-amber-500 px-5 py-3 text-center font-medium text-slate-950 transition hover:bg-amber-400"
                  >
                    Request a Quote
                  </Link>
                  <Link
                    to="/adhesives"
                    className="rounded-lg border border-white/20 px-5 py-3 text-center transition hover:bg-white/10"
                  >
                    Explore Adhesives
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust points */}
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
