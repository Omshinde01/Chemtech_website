import { Component, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Hand, Pause, Play } from "lucide-react";
import { useHydrated } from "../../lib/useHydrated";
import { JOURNEYS } from "./journeys";

const AUTOPLAY_MS = 6500;

let webglSupport;
function hasWebGL() {
  if (webglSupport === undefined) {
    try {
      const c = document.createElement("canvas");
      webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

// `once` latches to true after the first time the element is seen.
function useVisibility(ref, { rootMargin = "0px", threshold = 0, once = false } = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
      else if (!once) setVisible(false);
    }, { rootMargin, threshold });
    obs.observe(ref.current);
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

function Placeholder({ number, title, message }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <span className="a-text text-7xl font-semibold opacity-30">{String(number).padStart(2, "0")}</span>
      <span className="mt-2 text-lg font-medium text-white">{title}</span>
      <span className="mt-2 max-w-xs text-sm text-gray-400">{message}</span>
    </div>
  );
}

const controlClass = "a-ring rounded-full border border-white/15 bg-white/5 p-3 hover:bg-white/10";

function StagePanel({ stage, index, active, isLast, slug, explore }) {
  return (
    <div hidden={!active} className="h-full">
      <div className="stage-in flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="a-text text-sm">Stage {index + 1}</p>
        <h3 className="mt-1 text-2xl font-semibold">{stage.title}</h3>
        <p className="mt-3 leading-relaxed text-gray-300">{stage.summary}</p>

        <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-medium text-white">Why it matters</p>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{stage.matters}</p>
        </div>

        {stage.materials.length > 0 && (
          <div className="mt-5">
            <p className="text-sm font-medium text-white">Chemtech materials at this stage</p>
            <ul className="mt-2 space-y-2">
              {stage.materials.map((m) => (
                <li key={m.name}>
                  <Link to={m.link} className="a-chip a-ring flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 transition hover:brightness-125">
                    <span className="text-sm font-medium">{m.name}</span>
                    <span className="text-right text-xs text-gray-300">{m.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isLast && (
          <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
            <Link to="/contact" className="a-solid rounded-lg px-5 py-3 text-center font-medium text-slate-950 transition hover:brightness-110">Get a quote</Link>
            <Link to={`/${slug}`} className="rounded-lg border border-white/20 px-5 py-3 text-center transition hover:bg-white/10">{explore}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Journey({ slug }) {
  const { STAGES, TRUST_POINTS, Scene, accent, bg, glow, title, intro, model, explore } = JOURNEYS[slug];
  const ref = useRef(null);
  const hydrated = useHydrated();
  const reduced = hydrated && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = hydrated && !!navigator.connection?.saveData;
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [forceLoad, setForceLoad] = useState(false);
  const near = useVisibility(ref, { rootMargin: "200px 0px", once: true });
  const inView = useVisibility(ref, { threshold: 0.3 });

  const webgl = near && hasWebGL();
  const showScene = webgl && (!saveData || forceLoad);
  const playing = !paused && !reduced;

  // Autoplay: only while on screen, and it stops as soon as the visitor takes over.
  useEffect(() => {
    if (!playing || !inView) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % STAGES.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, inView, stage, STAGES.length]);

  const stop = useCallback(() => setPaused(true), []);
  const go = (i) => { stop(); setStage((i + STAGES.length) % STAGES.length); };
  const placeholder = (message) => <Placeholder number={stage + 1} title={STAGES[stage].title} message={message} />;
  const titleId = `${slug}-journey-title`;

  return (
    <section ref={ref} aria-labelledby={titleId} className="px-6 py-20 text-white" style={{ "--accent": accent, "--bg": bg, background: bg }}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 id={titleId} className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
          <p className="mt-4 leading-relaxed text-gray-300">{intro}</p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
          <div className="min-w-0 lg:col-span-3">
            <div
              role="group"
              aria-label={`Interactive 3D model of ${model}. Drag to rotate.`}
              className="relative isolate h-[380px] overflow-hidden rounded-2xl border border-white/10 sm:h-[460px] lg:h-[540px]"
              style={{ background: `radial-gradient(ellipse at 50% 30%, ${glow} 0%, ${bg} 72%)` }}
            >
              {showScene ? (
                <SceneBoundary fallback={placeholder("The 3D view couldn't start on this device. The stages below still tell the full story.")}>
                  <Suspense fallback={placeholder("Loading 3D model…")}>
                    <Scene stage={stage} active={inView} reduced={reduced} autoRotate={inView} onInteract={stop} />
                  </Suspense>
                </SceneBoundary>
              ) : (
                placeholder(near && !webgl ? "3D view isn't supported on this device. The stages below still tell the full story." : "Interactive 3D model")
              )}

              {webgl && saveData && !forceLoad && (
                <button type="button" onClick={() => setForceLoad(true)} className="a-solid absolute left-1/2 top-2/3 -translate-x-1/2 rounded-lg px-4 py-2 text-sm font-medium text-slate-950">Load 3D model</button>
              )}

              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-gray-300">
                Stage {stage + 1} of {STAGES.length}
              </div>
              {showScene && (
                <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-gray-300 sm:flex">
                  <Hand size={12} /> Drag to rotate
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[var(--bg)] to-transparent px-4 pb-4 pt-10">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => go(stage - 1)} aria-label="Previous stage" className={controlClass}><ChevronLeft size={18} /></button>
                  <button type="button" onClick={() => setPaused((p) => !p)} aria-label={playing ? "Pause automatic tour" : "Play automatic tour"} className={controlClass}>
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button type="button" onClick={() => go(stage + 1)} aria-label="Next stage" className={controlClass}><ChevronRight size={18} /></button>
                </div>
                <div className="flex flex-1 justify-end gap-1.5" aria-hidden="true">
                  {STAGES.map((st, i) => (
                    <span key={st.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === stage ? "a-solid w-8" : i < stage ? "a-solid w-4 opacity-50" : "w-4 bg-white/15"}`} />
                  ))}
                </div>
              </div>
            </div>

            <ol className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {STAGES.map((st, i) => (
                <li key={st.id} className="flex-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === stage ? "step" : undefined}
                    className={`a-ring w-full whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-sm transition ${i === stage ? "a-chip" : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"}`}
                  >
                    <span className="a-text mr-2">{i + 1}</span>{st.short}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Every stage is in the HTML (only the current one shows) so all of it is crawlable. */}
          <div className="min-w-0 lg:col-span-2" aria-live={playing ? "off" : "polite"}>
            {STAGES.map((st, i) => (
              <StagePanel key={st.id} stage={st} index={i} active={i === stage} isLast={i === STAGES.length - 1} slug={slug} explore={explore} />
            ))}
          </div>
        </div>

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
