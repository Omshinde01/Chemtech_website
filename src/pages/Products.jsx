import React, { useState, useEffect, useRef, useCallback } from "react";
import heroImg from "../assets/wax.png";
import waxImg from "../assets/wax.png";
import releaseImg from "../assets/release.jpg";
import adhesiveImg from "../assets/adhesive.jpg";
import coatingImg from "../assets/coating.jpg";

function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
}

/* ─── SEO: inject meta tags ─────────────────────────────────────────────── */
function useSEO({ title, description, keywords }) {
  useEffect(() => {
    document.title = title;
    const set = (name, content, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    set("description", description);
    set("keywords", keywords);
    set("robots", "index, follow");
    set("og:title", title, true);
    set("og:description", description, true);
    set("og:type", "website", true);
    set("twitter:card", "summary_large_image");
    set("twitter:title", title);
    set("twitter:description", description);
  }, [title, description, keywords]);
}

/* ─── Intersection observer hook ────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Fade-up wrapper ───────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const waxTypes = [
  { title: "Filled Wax", tag: "High Rigidity", summary: "Enhanced strength & dimensional stability for complex patterns.", desc: { intro: "Filled waxes are engineered to provide enhanced strength and dimensional stability during investment casting processes. Their unique formulation resists deformation under load, ensuring pattern integrity from injection through assembly.", points: ["High rigidity for complex pattern structures", "Reduces deformation during handling and transport", "Ensures consistent dimensional accuracy across batches", "Compatible with automated injection systems"], use: "Widely used in automotive, aerospace, and precision engineering components." } },
  { title: "Unfilled Wax", tag: "Fine Detail", summary: "Superior surface finish with excellent mold-filling capability.", desc: { intro: "Unfilled wax offers superior surface finish and excellent flow characteristics for detailed casting. The clean burnout profile ensures minimal ash residue, preserving ceramic shell integrity throughout firing.", points: ["Smooth, defect-free surface output", "High mold-filling capability for intricate geometry", "Low ash residue during complete burnout", "Consistent viscosity across operating temperatures"], use: "Ideal for intricate casting designs requiring fine detailing and flawless surface quality." } },
  { title: "Water Soluble Wax", tag: "Complex Cores", summary: "Designed for easy dissolution in complex internal structures.", desc: { intro: "Water soluble wax is specifically formulated for creating internal cores in complex investment casting geometries. It dissolves cleanly in water, eliminating mechanical extraction risk to delicate thin-wall sections.", points: ["Dissolves rapidly in water, leaving no residue", "Perfect for hollow bodies and internal cavities", "Reduces post-processing time significantly", "Compatible with standard pattern wax outer shells"], use: "Used in complex casting geometries, internal channel designs, and hollow aerofoil components." } },
  { title: "Sticky Wax", tag: "Pattern Assembly", summary: "Fast-setting adhesion for reliable pattern tree assembly.", desc: { intro: "Sticky wax is the preferred choice for assembling and repairing wax patterns on spruing trees. Its rapid tack and strong bond ensure structural integrity during repeated handling and shell dipping.", points: ["Instant strong adhesion with minimal application", "Quick setting — no clamping or fixturing required", "Reliable joint strength through all shell dipping stages", "Clean meltout with no residue contamination"], use: "Used throughout pattern assembly, runner attachment, and repair operations." } },
  { title: "Repair Wax", tag: "Surface Finishing", summary: "Correct surface defects and restore pattern quality.", desc: { intro: "Repair wax is a workable formulation engineered to correct surface defects, knit lines, and handling damage on completed wax patterns. Its smooth working consistency blends seamlessly with base pattern wax.", points: ["Easily shaped by tool or fingertip for precise application", "Blends invisibly for an undetectable finish", "Improves final casting surface quality at zero pattern cost", "Stable shelf life under standard storage conditions"], use: "Used for finishing, patching, and restoring casting patterns before shell application." } },
];

const releaseTypes = [
  { title: "Rubber Release", tag: "Mold Longevity", summary: "Smooth separation and extended mold life for rubber tooling.", desc: { intro: "Rubber release agents form a reliable barrier between mold surfaces and molded material, enabling clean part removal without tearing or surface damage.", points: ["Prevents material adhesion and mold sticking", "Extends productive mold service life", "Improves surface quality on molded parts", "Non-reactive with standard rubber compounds"], use: "Used across rubber molding — seals, gaskets, automotive profiles, and technical rubber goods." } },
  { title: "Composite Release", tag: "High Performance", summary: "Engineered for clean release in advanced composite manufacturing.", desc: { intro: "Composite release agents are developed for demanding high-performance composite manufacturing. They provide chemically stable release layers that survive elevated cure temperatures.", points: ["Clean, warp-free release from complex tool surfaces", "High thermal stability through autoclave cycles", "Consistent output across multiple releases per application", "No silicone transfer that could affect secondary bonding"], use: "Used in aerospace, marine, wind energy, and high-performance automotive composite production." } },
  { title: "Polyurethane Release", tag: "PU Systems", summary: "Efficient demolding for polyurethane foam and elastomer applications.", desc: { intro: "Polyurethane release agents enable efficient and clean demolding in PU foam, RIM, and elastomer applications.", points: ["High-performance release across rigid and flexible PU systems", "Long-lasting effect — fewer re-applications per shift", "Smooth demolded surfaces requiring minimal finishing", "Effective at high injection speeds and short cycle times"], use: "Used in PU foam seating, insulation panels, structural RIM parts, and cast elastomers." } },
];

const adhesiveTypes = [
  { title: "Rubber to Metal", tag: "Structural Bond", summary: "Durable bonding between rubber compounds and metal substrates.", desc: { intro: "These bonding agents achieve high-strength, chemically resistant bonds between rubber vulcanisates and metal surfaces.", points: ["Exceptional peel and shear strength after cure", "Heat and fatigue resistance in dynamic applications", "Compatible with a wide range of rubber compound types", "Single or two-coat systems available for process flexibility"], use: "Used in automotive anti-vibration mounts, bushings, industrial isolators, and rail pads." } },
  { title: "Metal to Metal", tag: "Structural Engineering", summary: "High-strength structural adhesives for metal-to-metal assemblies.", desc: { intro: "Structural metal-to-metal adhesives distribute stress uniformly across bonded areas, outperforming spot welds in fatigue resistance.", points: ["High tensile, shear, and peel strength", "Excellent corrosion resistance at the bond line", "Suitable for dissimilar metal bonding with thermal expansion mismatch", "Gap-filling capability for imperfect joint fit-up"], use: "Used in heavy engineering, structural assemblies, trailer manufacture, and industrial machinery." } },
  { title: "Friction Material", tag: "Braking Systems", summary: "Specialist adhesives for brake pads and clutch friction systems.", desc: { intro: "Friction material bonding adhesives are formulated to maintain adhesion integrity under extreme thermal and mechanical cycling in braking systems.", points: ["Sustained adhesion at elevated brake operating temperatures", "Shear and impact resistance under braking loads", "Compatible with OEM and aftermarket friction pad formulations", "Uniform coverage for consistent performance across pad life"], use: "Used in automotive, commercial vehicle, rail, and industrial braking and clutch systems." } },
];

const coatingTypes = [
  { title: "Anti-Corrosion Coating", tag: "Protection", summary: "Barrier protection to prevent corrosion and extend component life.", desc: { intro: "Anti-corrosion coatings provide a robust physical and chemical barrier between metal surfaces and corrosive environments.", points: ["Excellent resistance to salt spray, humidity, and chemical exposure", "Extends component service life in outdoor or marine environments", "Suitable for ferrous and non-ferrous substrates", "Available in primer, topcoat, and combined single-coat systems"], use: "Used in industrial infrastructure, offshore equipment, and outdoor structural components." } },
  { title: "Heat Resistant Coating", tag: "Thermal Stability", summary: "Protective coatings engineered for sustained high-temperature service.", desc: { intro: "Heat resistant coatings maintain structural integrity at sustained elevated temperatures. Ceramic-reinforced binders prevent oxidation and scaling.", points: ["Stable performance up to rated temperature limits", "Prevents oxidation and scale formation on metal surfaces", "Low thermal conductivity options for insulative applications", "Minimal outgassing during initial heat-up cycles"], use: "Used on furnace components, exhaust systems, engine parts, and high-temperature machinery." } },
  { title: "Surface Protection Coating", tag: "Wear Resistance", summary: "Hardened coatings that resist wear, scratch, and surface damage.", desc: { intro: "Surface protection coatings add a hard, wear-resistant layer to precision components, extending service life and maintaining dimensional tolerances.", points: ["High hardness — resists scratching and abrasive wear", "Maintains dimensional accuracy of precision components", "Improves surface finish and appearance", "Resistant to common industrial solvents and lubricants"], use: "Used in precision engineering, tooling, instrumentation, and high-wear mechanical components." } },
];

const customTypes = [
  { title: "Tailored Industrial Coatings", tag: "Custom R&D", summary: "Coating systems developed to your exact process specifications.", desc: { intro: "Our technical team partners directly with customers to develop coating formulations that address unique process requirements not met by standard catalogue products.", points: ["Requirement scoping and technical consultation included", "Lab-scale development through full production qualification", "Flexible chemistry — solvent-borne, waterborne, powder, or UV-cure", "Full technical data sheet and application guidance provided"], use: "Used where standard products fall short — specialist substrates, extreme environments, and regulated industries." } },
  { title: "Application-Specific Solutions", tag: "Bespoke Engineering", summary: "End-to-end solutions designed around your production environment.", desc: { intro: "We offer complete application-specific solutions — combining the right product with application method, equipment, and process parameter recommendations.", points: ["Adaptable across metals, composites, ceramics, and polymers", "Process optimisation support to maximise production efficiency", "On-site trials and technical support available", "Scalable from prototype batches to full production volumes"], use: "Deployed across automotive, aerospace, defence, medical device, and specialist manufacturing sectors." } },
];

const categories = [
  { key: "waxes",    label: "Investment Casting Waxes", shortLabel: "Waxes",    number: "01", img: waxImg,      accent: "#3B82F6", accentMuted: "rgba(59,130,246,0.12)",  desc: "Investment casting waxes are critical to achieving precision, repeatability, and surface integrity across all casting phases. Our wax range is formulated for excellent flow, minimal burnout residue, and consistent dimensional control.", data: waxTypes },
  { key: "release",  label: "Release Agents",           shortLabel: "Release",  number: "02", img: releaseImg,  accent: "#22D3EE", accentMuted: "rgba(34,211,238,0.12)",  desc: "Release agents are essential for clean, repeatable separation between molds and materials. Our range protects tooling, reduces defects, and maintains production throughput across rubber, composite, and polyurethane processes.", data: releaseTypes },
  { key: "adhesive", label: "Adhesives",                shortLabel: "Adhesives",number: "03", img: adhesiveImg, accent: "#F59E0B", accentMuted: "rgba(245,158,11,0.12)",  desc: "Our industrial adhesives deliver strong, durable bonds engineered for high-performance environments. From rubber-to-metal to friction bonding, each system is formulated for the specific demands of your application.", data: adhesiveTypes },
  { key: "coating",  label: "Metal Coatings",           shortLabel: "Coatings", number: "04", img: coatingImg,  accent: "#10B981", accentMuted: "rgba(16,185,129,0.12)",  desc: "Our metal coatings protect and enhance critical components in demanding industrial environments — from corrosion barriers to heat-resistant and wear-protective systems engineered for service life.", data: coatingTypes },
  { key: "custom",   label: "Custom Solutions",         shortLabel: "Custom",   number: "05", img: coatingImg,  accent: "#A78BFA", accentMuted: "rgba(167,139,250,0.12)", desc: "When standard products don't meet your requirements, our R&D team develops application-specific solutions — from custom-formulated chemistries to full process integration support.", data: customTypes },
];

/* ─── Product Card ──────────────────────────────────────────────────────── */
function ProductCard({ item, cat, index, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView(0.08);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(item)}
      aria-label={`View details for ${item.title}`}
      style={{
        background: hovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? cat.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12, padding: "22px 22px 18px",
        cursor: "pointer", position: "relative", overflow: "hidden", outline: "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.985)",
        transition: `opacity 0.5s ease ${index * 0.065}s, transform 0.5s ease ${index * 0.065}s, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? `0 6px 28px rgba(0,0,0,0.28), 0 0 0 1px ${cat.accent}1a` : "none",
      }}
    >
      {/* Animated accent top bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, height: 2,
          width: hovered ? "100%" : "28%",
          background: cat.accent, opacity: hovered ? 0.85 : 0.3,
          transition: "width 0.42s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s",
        }}
      />
      {/* Hover glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at top left, ${cat.accent}0d 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0, transition: "opacity 0.35s",
        }}
      />

      {/* Tag */}
      <div
        style={{
          display: "inline-block", background: cat.accentMuted,
          border: `1px solid ${cat.accent}44`, borderRadius: 4, padding: "2px 10px",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          color: cat.accent, marginBottom: 13,
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "transform 0.25s",
        }}
      >
        {item.tag}
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#E8EFF8", margin: "0 0 7px", letterSpacing: "-0.01em" }}>
        {item.title}
      </h3>
      <p style={{ fontSize: 13, color: hovered ? "#7A9BB8" : "#4A6A86", lineHeight: 1.65, margin: "0 0 14px", transition: "color 0.25s" }}>
        {item.summary}
      </p>

      <div
        style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 12, fontWeight: 600, color: cat.accent,
          opacity: hovered ? 1 : 0.5,
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "opacity 0.25s, transform 0.25s",
        }}
      >
        View details
        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </article>
  );
}

/* ─── Overview Category Card ────────────────────────────────────────────── */
function CategoryCard({ cat, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView(0.1);

  return (
    <article
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Explore ${cat.label}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? cat.accent + "44" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14, padding: "26px 26px 22px", cursor: "pointer", outline: "none",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(22px)",
        transition: `opacity 0.52s ease ${index * 0.07}s, transform 0.52s ease ${index * 0.07}s, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.22)" : "none",
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 800, color: cat.accent, opacity: 0.14, lineHeight: 1, marginBottom: 14, letterSpacing: "-0.04em" }}>
        {cat.number}
      </div>
      <h2 style={{ fontSize: 17, fontWeight: 600, color: "#E8EFF8", margin: "0 0 7px" }}>
        {cat.label}
      </h2>
      <p style={{ fontSize: 12, color: "#3A5A76", margin: "0 0 16px", fontWeight: 500 }}>
        {cat.data.length} product{cat.data.length !== 1 ? "s" : ""} available
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {cat.data.map((item) => (
          <span
            key={item.tag}
            style={{
              fontSize: 10, fontWeight: 600, color: cat.accent,
              background: cat.accentMuted, border: `1px solid ${cat.accent}30`,
              borderRadius: 4, padding: "2px 8px", letterSpacing: "0.06em", textTransform: "uppercase",
            }}
          >
            {item.tag}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function Products() {
  useScrollToTop();
  useSEO({
    title: "Industrial Products — Chemtech Specialty | Waxes, Release Agents, Adhesives & Coatings",
    description: "Chemtech Specialty manufactures high-performance investment casting waxes, release agents, industrial adhesives, metal coatings, and custom coating solutions for precision manufacturing.",
    keywords: "investment casting wax, release agents, industrial adhesives, rubber to metal adhesive, metal coatings, anti-corrosion coating, heat resistant coating, custom industrial coatings, Chemtech Specialty",
  });

  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);

  const currentCat = categories.find((c) => c.key === activeCategory);

  const handleCategoryClick = useCallback((key) => {
    if (activeCategory === key) {
      setPanelVisible(false);
      setTimeout(() => setActiveCategory(null), 260);
    } else {
      setPanelVisible(false);
      setTimeout(() => {
        setActiveCategory(key);
        requestAnimationFrame(() => setTimeout(() => setPanelVisible(true), 16));
      }, activeCategory ? 180 : 0);
    }
  }, [activeCategory]);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedItem]);

  return (
    <div
      style={{
        background: "#071523", minHeight: "100vh", color: "#E8EFF8",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
        @keyframes slideUpModal  { from{opacity:0;transform:translateY(18px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse         { 0%,100%{opacity:0.45} 50%{opacity:1} }
        *:focus-visible { outline: 2px solid #3B82F6; outline-offset: 2px; border-radius: 4px; }
      `}</style>

      {/* Noise overlay */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.4, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")" }} />

      {/* ── HERO ── */}
      <header style={{ position: "relative", zIndex: 1, maxWidth: 1140, margin: "0 auto", padding: "96px 32px 64px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(59,130,246,0.13)", border: "1px solid rgba(59,130,246,0.28)", borderRadius: 4, padding: "4px 14px", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", marginBottom: 24 }}>
            <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "#60A5FA", display: "inline-block", animation: "pulse 2.4s ease-in-out infinite" }} />
            Product Catalogue
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 62px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 20px", maxWidth: 620, color: "#F0F6FF", letterSpacing: "-0.025em" }}>
            Engineered Materials for{" "}
            <span style={{ color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(90deg, #3B82F6, #60A5FA 55%, #22D3EE)" }}>
              Industrial Precision
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.14}>
          <p style={{ fontSize: 16, color: "#5A7A96", maxWidth: 500, lineHeight: 1.78, margin: 0 }}>
            High-performance waxes, release agents, adhesives, and coatings —
            formulated for the demands of precision manufacturing and industrial process environments.
          </p>
        </FadeUp>
      </header>

      {/* ── STICKY CATEGORY NAV ── */}
      <nav
        aria-label="Product categories"
        style={{
          position: "sticky", top: 0, zIndex: 10,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(7,21,35,0.9)", backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)", overflowX: "auto",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px", display: "flex" }}>
          {categories.map((cat) => {
            const active = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                aria-expanded={active}
                aria-controls={`panel-${cat.key}`}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: `2px solid ${active ? cat.accent : "transparent"}`,
                  padding: "17px 22px",
                  color: active ? cat.accent : "#4A6A86",
                  fontSize: 13, fontWeight: active ? 600 : 500,
                  fontFamily: "inherit", letterSpacing: "0.03em", whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.22s, font-weight 0.1s",
                }}
              >
                <span style={{ fontSize: 10, opacity: 0.5, marginRight: 7, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {cat.number}
                </span>
                {cat.shortLabel}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── CATEGORY PANEL ── */}
      {currentCat && (
        <section
          id={`panel-${currentCat.key}`}
          aria-label={currentCat.label}
          style={{
            position: "relative", zIndex: 1,
            background: `linear-gradient(135deg, ${currentCat.accentMuted} 0%, rgba(7,21,35,0) 55%)`,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            opacity: panelVisible ? 1 : 0,
            transform: panelVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "60px 32px" }}>

            {/* Category header */}
            <div style={{ display: "flex", gap: 48, marginBottom: 44, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 380px" }}>
                <FadeUp>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: currentCat.accent, marginBottom: 10 }}>
                    {currentCat.number} — {currentCat.shortLabel}
                  </div>
                  <h2 style={{ fontSize: 34, fontWeight: 700, color: "#F0F6FF", margin: "0 0 14px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                    {currentCat.label}
                  </h2>
                  <p style={{ color: "#6A8FA8", lineHeight: 1.78, fontSize: 15, margin: 0, maxWidth: 460 }}>
                    {currentCat.desc}
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.1} style={{ flex: "0 0 220px" }}>
                <img
                  src={currentCat.img}
                  alt={`${currentCat.label} — Chemtech Specialty industrial products`}
                  loading="lazy"
                  width={220}
                  height={148}
                  style={{
                    width: "100%", borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.08)", display: "block",
                    filter: "brightness(0.88) saturate(0.8)",
                    transition: "filter 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1) saturate(1)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(0.88) saturate(0.8)"; e.currentTarget.style.transform = "scale(1)"; }}
                />
              </FadeUp>
            </div>

            {/* Product grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
              {currentCat.data.map((item, i) => (
                <ProductCard
                  key={item.title}
                  item={item}
                  cat={currentCat}
                  index={i}
                  onSelect={(it) => setSelectedItem({ ...it, cat: currentCat })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OVERVIEW (no category selected) ── */}
      {!activeCategory && (
        <main
          style={{ position: "relative", zIndex: 1, maxWidth: 1140, margin: "0 auto", padding: "52px 32px 96px" }}
          aria-label="Product categories overview"
        >
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2A4A66", marginBottom: 28 }}>
              Select a category above to explore products
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 18 }}>
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.key}
                cat={cat}
                index={i}
                onClick={() => handleCategoryClick(cat.key)}
              />
            ))}
          </div>
        </main>
      )}

      {/* ── PRODUCT DETAIL MODAL ── */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Product detail: ${selectedItem.title}`}
          onClick={() => setSelectedItem(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(4,12,24,0.84)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
            animation: "fadeInOverlay 0.22s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0D2035", border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 18, width: "100%", maxWidth: 600,
              maxHeight: "88vh", overflowY: "auto", position: "relative",
              animation: "slideUpModal 0.28s cubic-bezier(0.34,1.1,0.64,1)",
            }}
          >
            <div style={{ height: 3, background: selectedItem.cat.accent, borderRadius: "18px 18px 0 0" }} />

            <div style={{ padding: "30px 34px 34px" }}>
              {/* Close */}
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close product detail"
                style={{
                  position: "absolute", top: 18, right: 18,
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50%", width: 34, height: 34, cursor: "pointer",
                  color: "#7A9BB8", fontSize: 15, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F0F6FF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#7A9BB8"; }}
              >
                ✕
              </button>

              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: selectedItem.cat.accent, marginBottom: 9, opacity: 0.75 }}>
                {selectedItem.cat.label}
              </div>

              <h2 style={{ fontSize: 26, fontWeight: 700, color: "#F0F6FF", margin: "0 0 10px", lineHeight: 1.2, paddingRight: 40, letterSpacing: "-0.02em" }}>
                {selectedItem.title}
              </h2>

              <div style={{ display: "inline-block", background: selectedItem.cat.accentMuted, border: `1px solid ${selectedItem.cat.accent}44`, borderRadius: 4, padding: "3px 12px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: selectedItem.cat.accent, marginBottom: 22 }}>
                {selectedItem.tag}
              </div>

              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 22px" }} />

              <p style={{ fontSize: 14, color: "#A8C0D6", lineHeight: 1.8, margin: "0 0 22px" }}>
                {selectedItem.desc.intro}
              </p>

              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3A5A76", marginBottom: 12 }}>
                  Key Features
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {selectedItem.desc.points.map((p, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: selectedItem.cat.accentMuted, border: `1px solid ${selectedItem.cat.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: selectedItem.cat.accent }} />
                      </div>
                      <span style={{ fontSize: 13, color: "#B8D0E8", lineHeight: 1.7 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `3px solid ${selectedItem.cat.accent}`, borderRadius: "0 8px 8px 0", padding: "13px 16px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: selectedItem.cat.accent, marginBottom: 5, opacity: 0.75 }}>
                  Typical Applications
                </div>
                <p style={{ fontSize: 13, color: "#6A8FA8", margin: 0, lineHeight: 1.65 }}>
                  {selectedItem.desc.use}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "22px 32px", textAlign: "center", fontSize: 12, color: "#2A4A66" }}>
        <p style={{ margin: 0 }}>Chemtech Specialty — Engineered materials for industrial performance</p>
      </footer>
    </div>
  );
}