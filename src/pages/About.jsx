import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   1. SCROLL TO TOP ON EVERY PAGE VISIT
   Put this hook in the component — fires on mount
   so the page always starts at the very top.
───────────────────────────────────────────── */
function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
}

/* ─────────────────────────────────────────────
   2. INTERSECTION OBSERVER — re-triggers every
   time the element enters the viewport so
   animations fire on EVERY scroll pass.
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // Set true when entering, false when leaving → re-animates each scroll
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

/* ─────────────────────────────────────────────
   3. REVEAL WRAPPER — multiple animation variants
───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  direction = "up",   // "up" | "down" | "left" | "right" | "scale" | "fade"
  className = "",
  style = {},
}) {
  const [ref, visible] = useScrollReveal();

  const hiddenTransforms = {
    up:    "translateY(40px)",
    down:  "translateY(-40px)",
    left:  "translateX(50px)",
    right: "translateX(-50px)",
    scale: "scale(0.88)",
    fade:  "translateY(0)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0) scale(1)" : hiddenTransforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s,
                     transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal();
  useEffect(() => {
    if (!visible) {
      setCount(0);
      return;
    }
    let v = 0;
    const step = Math.max(1, Math.ceil(to / 40));
    const t = setInterval(() => {
      v += step;
      if (v >= to) { setCount(to); clearInterval(t); } else setCount(v);
    }, 28);
    return () => clearInterval(t);
  }, [visible, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Hero SVG Illustration ── */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Industrial chemical manufacturing facility illustration"
      role="img"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1E35" />
          <stop offset="100%" stopColor="#071523" />
        </linearGradient>
        <linearGradient id="tankGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0F2040" />
        </linearGradient>
        <linearGradient id="pipeH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A4A72" />
          <stop offset="50%" stopColor="#3A6A9A" />
          <stop offset="100%" stopColor="#1A3050" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D2640" />
          <stop offset="100%" stopColor="#071A30" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="floorGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <clipPath id="tankClip1"><rect x="72" y="90" width="86" height="220" rx="6" /></clipPath>
        <clipPath id="tankClip2"><rect x="200" y="60" width="110" height="250" rx="6" /></clipPath>
        <clipPath id="tankClip3"><rect x="360" y="80" width="90" height="220" rx="6" /></clipPath>
      </defs>

      <rect width="560" height="400" fill="url(#bgGrad)" rx="14" />
      {[...Array(10)].map((_, i) => <line key={`v${i}`} x1={i*62} y1="0" x2={i*62} y2="400" stroke="#3B82F6" strokeOpacity="0.03" strokeWidth="1" />)}
      {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*67} x2="560" y2={i*67} stroke="#3B82F6" strokeOpacity="0.03" strokeWidth="1" />)}
      <ellipse cx="280" cy="340" rx="260" ry="30" fill="url(#floorGlow)" />

      {/* Tank 1 */}
      <g>
        <rect x="72" y="90" width="86" height="220" rx="6" fill="url(#tankGrad)" stroke="#1E4080" strokeWidth="1.5" />
        <rect x="74" y="195" width="82" height="113" fill="#1A4A80" opacity="0.6" clipPath="url(#tankClip1)" />
        <rect x="74" y="193" width="82" height="4" rx="2" fill="#3B82F6" opacity="0.5" filter="url(#glow)" />
        <rect x="74" y="91" width="12" height="218" rx="3" fill="white" opacity="0.04" />
        <rect x="68" y="82" width="94" height="14" rx="5" fill="#1E3A5F" stroke="#2A5090" strokeWidth="1" />
        <rect x="106" y="68" width="18" height="16" rx="3" fill="#1A3060" stroke="#2A5090" strokeWidth="1" />
        {[130,180,230,270].map((y,i) => <rect key={i} x="72" y={y} width="86" height="5" fill="#0F2040" opacity="0.5" />)}
        <rect x="162" y="140" width="6" height="140" rx="3" fill="#0A1530" stroke="#1E3A5F" strokeWidth="1" />
        <rect x="163" y="195" width="4" height="83" rx="2" fill="#3B82F6" opacity="0.7" />
        <circle cx="165" cy="196" r="4" fill="#60A5FA" filter="url(#glow)" />
        <rect x="60" y="308" width="110" height="10" rx="4" fill="#0F2040" stroke="#1E3A5F" strokeWidth="1" />
        <rect x="82" y="318" width="18" height="16" rx="2" fill="#0A1830" />
        <rect x="118" y="318" width="18" height="16" rx="2" fill="#0A1830" />
        <rect x="82" y="245" width="66" height="22" rx="4" fill="#0A1530" stroke="#1E4080" strokeWidth="1" />
        <text x="115" y="260" textAnchor="middle" fill="#60A5FA" fontSize="8" fontFamily="monospace" fontWeight="600">TANK-01</text>
      </g>

      {/* Tank 2 */}
      <g>
        <rect x="200" y="60" width="110" height="250" rx="6" fill="url(#tankGrad)" stroke="#1E4080" strokeWidth="1.5" />
        <rect x="202" y="170" width="106" height="138" fill="#0E3050" opacity="0.7" clipPath="url(#tankClip2)" />
        <rect x="202" y="168" width="106" height="4" rx="2" fill="#22D3EE" opacity="0.55" filter="url(#glow)" />
        <rect x="202" y="61" width="14" height="248" rx="3" fill="white" opacity="0.04" />
        <rect x="194" y="50" width="122" height="16" rx="5" fill="#1E3A5F" stroke="#2A5090" strokeWidth="1" />
        <rect x="247" y="28" width="16" height="26" rx="4" fill="#1A3060" stroke="#2A5090" strokeWidth="1" />
        <circle cx="255" cy="26" r="6" fill="#1A3060" stroke="#2A5090" strokeWidth="1" />
        {[100,150,210,260].map((y,i) => <rect key={i} x="200" y={y} width="110" height="6" fill="#0F2040" opacity="0.45" />)}
        <circle cx="254" cy="130" r="16" fill="#0A1530" stroke="#22D3EE" strokeWidth="1.5" />
        <circle cx="254" cy="130" r="12" fill="#071020" />
        <line x1="254" y1="130" x2="254" y2="120" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" filter="url(#glow)" />
        <circle cx="254" cy="130" r="2" fill="#22D3EE" />
        <rect x="188" y="308" width="134" height="10" rx="4" fill="#0F2040" stroke="#1E3A5F" strokeWidth="1" />
        <rect x="208" y="318" width="22" height="18" rx="2" fill="#0A1830" />
        <rect x="278" y="318" width="22" height="18" rx="2" fill="#0A1830" />
        <rect x="212" y="270" width="86" height="22" rx="4" fill="#0A1530" stroke="#1E4080" strokeWidth="1" />
        <text x="255" y="285" textAnchor="middle" fill="#22D3EE" fontSize="8" fontFamily="monospace" fontWeight="600">TANK-02</text>
      </g>

      {/* Tank 3 */}
      <g>
        <rect x="360" y="80" width="90" height="220" rx="6" fill="url(#tankGrad)" stroke="#1E4080" strokeWidth="1.5" />
        <rect x="362" y="200" width="86" height="98" fill="#1A4A60" opacity="0.6" clipPath="url(#tankClip3)" />
        <rect x="362" y="198" width="86" height="4" rx="2" fill="#10B981" opacity="0.5" filter="url(#glow)" />
        <rect x="362" y="81" width="12" height="218" rx="3" fill="white" opacity="0.04" />
        <rect x="354" y="72" width="106" height="14" rx="5" fill="#1E3A5F" stroke="#2A5090" strokeWidth="1" />
        <rect x="393" y="58" width="18" height="16" rx="3" fill="#1A3060" stroke="#2A5090" strokeWidth="1" />
        {[120,165,215,255].map((y,i) => <rect key={i} x="360" y={y} width="90" height="5" fill="#0F2040" opacity="0.5" />)}
        <circle cx="405" cy="150" r="14" fill="#0A1530" stroke="#10B981" strokeWidth="1.5" />
        <circle cx="405" cy="150" r="10" fill="#071020" />
        <line x1="405" y1="150" x2="410" y2="143" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" filter="url(#glow)" />
        <circle cx="405" cy="150" r="2" fill="#10B981" />
        <rect x="350" y="298" width="110" height="10" rx="4" fill="#0F2040" stroke="#1E3A5F" strokeWidth="1" />
        <rect x="368" y="308" width="18" height="16" rx="2" fill="#0A1830" />
        <rect x="424" y="308" width="18" height="16" rx="2" fill="#0A1830" />
        <rect x="368" y="240" width="74" height="22" rx="4" fill="#0A1530" stroke="#1E4080" strokeWidth="1" />
        <text x="405" y="255" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="600">TANK-03</text>
      </g>

      {/* Pipes */}
      <rect x="50" y="330" width="460" height="8" rx="4" fill="url(#pipeH)" />
      {[115,254,404].map((x,i) => (
        <g key={i}>
          <rect x={x-4} y="318" width="8" height="14" rx="2" fill="#1E3A5F" />
          <rect x={x-4} y="338" width="8" height="24" rx="2" fill="#1A3060" />
          <circle cx={x} cy={366} r="7" fill="#0F2040" stroke="#2A5090" strokeWidth="1.5" />
          <line x1={x-5} y1={366} x2={x+5} y2={366} stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}

      {/* Control Panel */}
      <g>
        <rect x="462" y="130" width="84" height="160" rx="8" fill="#0A1830" stroke="#1E3A5F" strokeWidth="1.5" />
        <rect x="468" y="138" width="72" height="48" rx="4" fill="url(#screenGrad)" stroke="#1E4080" strokeWidth="1" />
        {[0,1,2,3,4].map(i => <rect key={i} x={470+i*13} y={172-[18,24,14,30,20][i]} width="8" height={[18,24,14,30,20][i]} rx="2" fill="#3B82F6" opacity="0.7" />)}
        <line x1="468" y1="172" x2="540" y2="172" stroke="#1E4080" strokeWidth="0.5" />
        {[0,1,2].map(i => <circle key={i} cx={476+i*22} cy={200} r="6" fill={["#10B981","#3B82F6","#F59E0B"][i]} opacity="0.8" filter="url(#glow)" />)}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x="472" y={215+i*17} width="32" height="8" rx="4" fill="#0F2040" stroke="#1E3A5F" strokeWidth="1" />
            <circle cx={i%2===0?496:480} cy={219+i*17} r="5" fill={i%2===0?"#3B82F6":"#22D3EE"} opacity="0.9" />
            <rect x="510" y={215+i*17} width="28" height="8" rx="2" fill="#0A1525" />
            <rect x="511" y={216+i*17} width={[18,14,22,10][i]} height="6" rx="2" fill={["#3B82F6","#22D3EE","#10B981","#3B82F6"][i]} opacity="0.6" />
          </g>
        ))}
      </g>

      {/* Connecting pipes */}
      <path d="M158 140 Q185 120 200 130" stroke="#2A4A72" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M158 140 Q185 120 200 130" stroke="#3A6A9A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M310 110 Q335 90 360 100" stroke="#2A4A72" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M310 110 Q335 90 360 100" stroke="#3A6A9A" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Glows */}
      <ellipse cx="115" cy="318" rx="50" ry="8" fill="#3B82F6" opacity="0.08" />
      <ellipse cx="255" cy="318" rx="65" ry="10" fill="#22D3EE" opacity="0.08" />
      <ellipse cx="405" cy="308" rx="55" ry="8" fill="#10B981" opacity="0.08" />

      {/* Badges */}
      <g filter="url(#softGlow)">
        <rect x="28" y="40" width="76" height="34" rx="6" fill="#0A1830" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.5" />
        <text x="66" y="53" textAnchor="middle" fill="#60A5FA" fontSize="7" fontFamily="monospace">PRESSURE</text>
        <text x="66" y="65" textAnchor="middle" fill="#93C5FD" fontSize="10" fontFamily="monospace" fontWeight="700">2.4 BAR</text>
        <rect x="390" y="24" width="80" height="34" rx="6" fill="#0A1830" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.5" />
        <text x="430" y="37" textAnchor="middle" fill="#67E8F9" fontSize="7" fontFamily="monospace">TEMP</text>
        <text x="430" y="50" textAnchor="middle" fill="#A5F3FC" fontSize="10" fontFamily="monospace" fontWeight="700">187°C</text>
        <rect x="476" y="90" width="72" height="34" rx="6" fill="#0A1830" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5" />
        <text x="512" y="103" textAnchor="middle" fill="#6EE7B7" fontSize="7" fontFamily="monospace">OUTPUT</text>
        <text x="512" y="115" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontFamily="monospace" fontWeight="700">98.2%</text>
      </g>

      {/* Corner brackets */}
      <path d="M12 12 L12 30 M12 12 L30 12" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.3" fill="none" strokeLinecap="round" />
      <path d="M548 12 L548 30 M548 12 L530 12" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.3" fill="none" strokeLinecap="round" />
      <path d="M12 388 L12 370 M12 388 L30 388" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.3" fill="none" strokeLinecap="round" />
      <path d="M548 388 L548 370 M548 388 L530 388" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity="0.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ── Data ── */
const stats = [
  { value: 15, suffix: "+", label: "Years in Industry" },
  { value: 200, suffix: "+", label: "Industrial Clients" },
  { value: 5, suffix: "", label: "Product Categories" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

const values = [
  { number: "01", title: "Quality Focus", body: "Every product is developed with strict attention to consistency, reliability, and industrial performance standards. We never compromise on the formulation integrity that our clients depend on.", accent: "#3B82F6" },
  { number: "02", title: "Technical Expertise", body: "Our deep understanding of industrial applications — casting, bonding, release, and coating — enables us to create practical and effective material solutions for real manufacturing challenges.", accent: "#22D3EE" },
  { number: "03", title: "Long-Term Partnerships", body: "We believe in building relationships that last — through reliable products, responsive technical support, and a commitment to growing alongside our clients' evolving needs.", accent: "#10B981" },
];

const industries = [
  "Automotive", "Aerospace", "Precision Engineering",
  "Industrial Manufacturing", "Heavy Engineering", "Rubber & Composites",
];

const process = [
  { step: "01", title: "Requirement Analysis", desc: "We begin by understanding your specific application, process environment, and performance targets — no generic assumptions." },
  { step: "02", title: "Material Formulation", desc: "Our technical team develops or selects formulations matched to your exact operating conditions and material compatibility requirements." },
  { step: "03", title: "Testing & Validation", desc: "Products are rigorously tested for consistency, performance, and reliability before reaching your production line." },
  { step: "04", title: "Ongoing Support", desc: "We stay engaged after delivery — monitoring performance, resolving process issues, and refining solutions as your needs evolve." },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function About() {
  // ✅ Always scroll to top when this page mounts
  useScrollToTop();

  return (
    <div
      style={{
        background: "#071523",
        color: "#E8EFF8",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .about-who-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 64px;
          align-items: start;
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .about-sticky { position: sticky; top: 80px; }
        @media (max-width: 900px) {
          .about-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-who-grid  { grid-template-columns: 1fr; gap: 32px; }
          .about-values-grid { grid-template-columns: 1fr 1fr; }
          .about-sticky { position: static; }
        }
        @media (max-width: 580px) {
          .about-values-grid { grid-template-columns: 1fr; }
          .about-cta-pad { padding: 40px 24px !important; }
        }
        .about-stat-row { display: flex; gap: 32px; flex-wrap: wrap; }
        @media (max-width: 400px) { .about-stat-row { gap: 18px; } }
        .about-val-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 32px 28px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
          height: 100%;
        }
        .about-val-card:hover { transform: translateY(-5px); }
        .about-process-row {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 32px;
          padding: 28px 0;
        }
        @media (max-width: 480px) {
          .about-process-row { grid-template-columns: 44px 1fr; gap: 18px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden" }} aria-labelledby="about-hero-heading">
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: -80, right: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1140, margin: "0 auto", padding: "100px 32px 80px" }}>
          <div className="about-hero-grid">

            {/* Left text */}
            <div>
              <Reveal direction="left">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 4, padding: "5px 14px", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", marginBottom: 28 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                  About Chemtech Specialty
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.08}>
                <h1 id="about-hero-heading" style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.12, margin: "0 0 24px", color: "#F0F6FF", letterSpacing: "-0.02em" }}>
                  Precision Materials for
                  <span style={{ display: "block", color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(90deg, #3B82F6, #22D3EE)" }}>
                    Modern Industry
                  </span>
                </h1>
              </Reveal>

              <Reveal direction="up" delay={0.16}>
                <p style={{ fontSize: 16, color: "#6A8FA8", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 460 }}>
                  Chemtech Specialty delivers high-performance industrial materials engineered for precision manufacturing — from investment casting waxes and release agents to adhesives and protective coatings.
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.24}>
                <div className="about-stat-row">
                  {stats.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#3B82F6", lineHeight: 1 }}>
                        <Counter to={s.value} suffix={s.suffix} />
                      </div>
                      <div style={{ fontSize: 12, color: "#4A6A86", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: illustration */}
            <Reveal direction="right" delay={0.1}>
              <div style={{ position: "relative" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: -12, border: "1px solid rgba(59,130,246,0.15)", borderRadius: 20, pointerEvents: "none" }} />
                <HeroIllustration />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }} aria-labelledby="who-we-are-heading">
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "80px 32px" }}>
          <div className="about-who-grid">

            <Reveal direction="left">
              <div className="about-sticky">
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 16 }}>Who We Are</div>
                <h2 id="who-we-are-heading" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#F0F6FF", lineHeight: 1.2, margin: 0, letterSpacing: "-0.02em" }}>
                  Built on Technical Trust
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Reveal direction="up" delay={0.08}>
                <p style={{ fontSize: 16, color: "#7A9BB8", lineHeight: 1.85, margin: 0 }}>
                  We are a manufacturer and supplier of industrial specialty materials, committed to supporting businesses with reliable and high-quality solutions. Our products are developed to meet the demanding requirements of modern industrial environments where consistency and performance are critical.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.16}>
                <p style={{ fontSize: 16, color: "#7A9BB8", lineHeight: 1.85, margin: 0 }}>
                  Over time, we have built a deep understanding of manufacturing processes and the challenges that arise within them. This knowledge allows us to provide practical material solutions that improve production efficiency, minimize process issues, and maintain high quality across every run.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.24}>
                <div style={{ marginTop: 8, padding: "24px 28px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 16, opacity: 0.8 }}>Industries We Serve</div>
                  <ul style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: 0, padding: 0, listStyle: "none" }} aria-label="Industries served by Chemtech Specialty">
                    {industries.map((ind, i) => (
                      <li key={i} style={{ fontSize: 13, fontWeight: 500, color: "#A8C0D6", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 14px" }}>{ind}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "96px 32px" }} aria-labelledby="process-heading">
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22D3EE", marginBottom: 14 }}>Our Process</div>
            <h2 id="process-heading" style={{ fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 700, color: "#F0F6FF", margin: 0, letterSpacing: "-0.02em" }}>How We Work</h2>
          </div>
        </Reveal>

        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #3B82F6, #22D3EE, transparent)", opacity: 0.25 }} />
          <ol style={{ display: "flex", flexDirection: "column", gap: 0, margin: 0, padding: 0, listStyle: "none" }}>
            {process.map((item, i) => (
              <li key={i}>
                {/* Alternate left/right slide for each step */}
                <Reveal direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.07}>
                  <div className="about-process-row" style={{ borderBottom: i < process.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#60A5FA", letterSpacing: "0.05em", flexShrink: 0 }} aria-hidden="true">
                        {item.step}
                      </div>
                    </div>
                    <div style={{ paddingTop: 12 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: "#E8EFF8", margin: "0 0 10px" }}>{item.title}</h3>
                      <p style={{ fontSize: 15, color: "#6A8FA8", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", padding: "96px 0" }} aria-labelledby="values-heading">
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
          <Reveal direction="up">
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#10B981", marginBottom: 14 }}>Our Values</div>
              <h2 id="values-heading" style={{ fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 700, color: "#F0F6FF", margin: 0, letterSpacing: "-0.02em" }}>What Drives Us</h2>
            </div>
          </Reveal>

          <div className="about-values-grid">
            {values.map((val, i) => (
              <Reveal key={i} direction="scale" delay={i * 0.12}>
                <article
                  className="about-val-card"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${val.accent}44`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  aria-label={val.title}
                >
                  <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: val.accent, opacity: 0.6 }} />
                  <div style={{ fontSize: 42, fontWeight: 700, color: val.accent, opacity: 0.15, lineHeight: 1, marginBottom: 20, letterSpacing: "-0.04em" }} aria-hidden="true">{val.number}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#E8EFF8", margin: "0 0 14px" }}>{val.title}</h3>
                  <p style={{ fontSize: 14, color: "#5A7A96", lineHeight: 1.75, margin: 0 }}>{val.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "96px 32px" }} aria-labelledby="cta-heading">
        <Reveal direction="scale">
          <div className="about-cta-pad" style={{ position: "relative", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 20, padding: "64px 56px", overflow: "hidden", textAlign: "center" }}>
            <div aria-hidden="true" style={{ position: "absolute", right: -60, bottom: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div aria-hidden="true" style={{ position: "absolute", left: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

            <Reveal direction="up" delay={0.05}>
              <div style={{ position: "relative", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", marginBottom: 20 }}>Looking Ahead</div>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <h2 id="cta-heading" style={{ position: "relative", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 700, color: "#F0F6FF", margin: "0 auto 20px", maxWidth: 580, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                Driving Innovation Through Industrial Materials
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.18}>
              <p style={{ position: "relative", fontSize: 15, color: "#6A8FA8", lineHeight: 1.8, margin: "0 auto 36px", maxWidth: 560 }}>
                As industries evolve, we remain committed to innovation, process improvement, and delivering advanced material solutions that support modern manufacturing.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.24}>
              <a
                href="/contact"
                style={{ position: "relative", display: "inline-block", background: "#3B82F6", color: "#fff", fontSize: 14, fontWeight: 600, padding: "13px 32px", borderRadius: 8, textDecoration: "none", letterSpacing: "0.02em", transition: "background 0.2s, transform 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#3B82F6"; e.currentTarget.style.transform = "translateY(0)"; }}
                aria-label="Contact Chemtech Specialty"
              >
                Get in Touch →
              </a>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 32px", textAlign: "center", fontSize: 12, color: "#2A4A66" }} role="contentinfo">
        <p style={{ margin: 0 }}>Chemtech Specialty — Engineered materials for industrial performance</p>
      </div>
    </div>
  );
}