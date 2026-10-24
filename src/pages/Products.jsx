import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { categories as canonicalCategories, SITE_URL } from "../data/productData";

import heroImg from "../assets/wax.png";
import waxImg from "../assets/wax.png";
import releaseImg from "../assets/release.jpg";
import adhesiveImg from "../assets/adhesive.jpg";
import coatingImg from "../assets/coating.jpg";

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

/* ─── ENRICHED PRODUCT DATA WITH TECHNICAL SPECIFICATIONS ───────────────── */
const waxTypes = [
  {
    title: "Filled Wax",
    tag: "High Rigidity",
    summary: "Enhanced strength & dimensional stability for complex patterns and high-precision casting.",
    specs: {
      "Melting Point": "68°C – 74°C",
      "Ash Content": "< 0.015% (Ultra-Clean Burnout)",
      "Volumetric Shrinkage": "< 0.8% (Exceptional Accuracy)",
      "Physical Form": "Pellets / Flakes / Pastilles",
      "Key Characteristic": "Resists deformation during multi-dip shell handling",
    },
    desc: {
      intro: "Chemtech Filled Investment Casting Wax is engineered to provide superior structural rigidity and dimensional stability during the lost-wax casting process. Its filler formulation resists deformation under mechanical load, ensuring strict pattern integrity from automatic injection through assembly and slurry dipping.",
      points: [
        "High mechanical rigidity prevents pattern distortion in complex geometry",
        "Reduces deformation during manual handling and long-distance transport",
        "Ensures consistent dimensional repeatability across high-volume production batches",
        "Compatible with modern high-speed automatic wax injection presses",
        "Clean, low-ash burnout leaves minimal ceramic shell residue",
      ],
      use: "Widely used in automotive turbine components, aerospace structural brackets, defense hardware, and heavy precision engineering castings.",
    },
  },
  {
    title: "Unfilled Wax",
    tag: "Fine Detail",
    summary: "Superior surface finish with excellent mold-filling capability and ultra-low ash residue.",
    specs: {
      "Drop Melting Point": "72°C – 78°C",
      "Ash Content": "< 0.008% (Negligible Residue)",
      "Viscosity": "Low-viscosity for micro-channels",
      "Surface Finish": "Mirror-smooth casting surface",
      "Key Characteristic": "Flawless reproduction of micro-details",
    },
    desc: {
      intro: "Unfilled Investment Casting Wax delivers an exceptionally smooth surface finish and superior flow characteristics for intricate casting molds. Its clean burnout profile ensures zero carbonaceous residue, preserving ceramic shell interior integrity throughout pre-heating and firing.",
      points: [
        "Smooth, defect-free pattern surface eliminating secondary grinding",
        "High mold-filling fluidity ideal for intricate, thin-wall sections",
        "Ultra-low ash residue (<0.008%) preventing inclusion defects in metal",
        "Consistent batch viscosity across fluctuating foundry ambient temperatures",
        "Rapid cooling rate shortening machine injection cycle times",
      ],
      use: "Ideal for intricate casting designs requiring fine detailing, medical surgical implants, turbocharger impellers, and precision luxury goods.",
    },
  },
  {
    title: "Water Soluble Wax",
    tag: "Complex Cores",
    summary: "Fast-dissolving core wax designed for intricate internal hollows and undercut channels.",
    specs: {
      "Dissolution Speed": "Rapid in warm water (15–25 mins)",
      "Environmental": "100% Non-toxic & environmentally safe",
      "Dimensional Stability": "Excellent green strength during handling",
      "Residue After Wash": "0.0% wash-out residue",
      "Key Characteristic": "Eliminates mechanical coring damage",
    },
    desc: {
      intro: "Chemtech Water Soluble Wax is formulated specifically for creating internal cores in complex investment casting geometries where mechanical extraction is impossible. It dissolves rapidly and cleanly in warm water, leaving delicate internal passages free of defects.",
      points: [
        "Dissolves cleanly in water without mechanical extraction risk to thin walls",
        "Perfect for internal hollows, cooling channels, and complex undercuts",
        "Reduces post-processing time and labor cost significantly",
        "Seamlessly integrates with standard pattern wax outer shells",
        "Non-toxic, safe for operator handling and standard municipal drainage",
      ],
      use: "Extensively utilized in hollow aerofoil components, fluid manifold passages, complex valve bodies, and pump impellers.",
    },
  },
  {
    title: "Sticky Wax",
    tag: "Pattern Assembly",
    summary: "Fast-setting high-tack adhesion for dependable pattern tree and sprue runner assembly.",
    specs: {
      "Setting Time": "3 – 6 seconds (Immediate Tack)",
      "Adhesion Strength": "Rigid, fracture-resistant joint",
      "Meltout Behavior": "Clean meltout without slagging",
      "Application Temp": "65°C – 80°C with heated wax pen",
      "Key Characteristic": "Zero pattern tree detachment during slurry dipping",
    },
    desc: {
      intro: "Sticky wax is the industry-standard choice for assembling and securing wax patterns onto spruing runners and central trees. Its immediate tack and tough, resilient bond guarantee structural security during repeated handling, robot dipping, and ceramic stucco drying.",
      points: [
        "Instantaneous strong adhesion requiring no clamping or fixturing",
        "Rapid setting speed increases pattern tree assembly throughput",
        "Dependable joint shear strength under high slurry agitation forces",
        "Clean meltout during autoclave dewaxing with zero carbon contamination",
        "Leaves no chemical residue that interferes with ceramic shell adhesion",
      ],
      use: "Used throughout investment casting pattern tree assembly, runner and gate bonding, and emergency pattern fixture attachment.",
    },
  },
  {
    title: "Repair Wax",
    tag: "Surface Finishing",
    summary: "Smoothly blendable formulation to repair pattern defects, knit lines, and handling scars.",
    specs: {
      "Workability Range": "Plastic and pliable at 25°C – 40°C",
      "Carving Quality": "Toolable without chipping or flaking",
      "Thermal Expansion": "Matched precisely to base pattern wax",
      "Color Matching": "Consistent industrial casting hues",
      "Key Characteristic": "Invisible blending with zero boundary line",
    },
    desc: {
      intro: "Chemtech Repair Wax is a workable, ductile formulation engineered to correct surface imperfections, flow knit lines, sink marks, and handling damage on molded wax patterns. Its smooth working consistency blends invisibly with virgin pattern wax.",
      points: [
        "Easily carved, shaped, and polished by hand tool or warm spatula",
        "Blends seamlessly with base wax for an undetectable, smooth repair",
        "Prevents costly scrap of complex patterns with minor surface defects",
        "Matched thermal expansion coefficient prevents cracking during burnout",
        "Long shelf life and thermal stability under ambient storage conditions",
      ],
      use: "Used in quality inspection stations for finishing, patching, and restoring investment casting patterns prior to ceramic shell dipping.",
    },
  },
  {
    title: "Wax Pattern Cleaner & Activator",
    tag: "Surface Preparation",
    summary: "Precision surface preparation agent for investment casting wax patterns — cleans, conditions, and activates for uniform, defect-free primary ceramic shell adhesion.",
    specs: {
      "Application Method": "Gentle wipe or controlled immersion",
      "Drying Time": "Fast-evaporating; residue-free surface",
      "Substrate Compatibility": "All standard filled and unfilled pattern waxes",
      "Surface Effect": "Micro-etched, activated surface for slurry wetting",
      "Key Characteristic": "Uniform primary coat adhesion, reduced shell defects",
    },
    desc: {
      intro: "Chemtech Wax Pattern Cleaner & Activator is a precision surface preparation agent formulated for use immediately before primary ceramic slurry dipping. It removes mold release residues, airborne contaminants, and handling oils from wax pattern surfaces, then conditions the surface to promote controlled wetting and uniform slurry adhesion. The result is a more consistent primary coating layer and a measurable reduction in coating-related shell defects.",
      points: [
        "Removes mold release agent residues that cause primary slurry dewetting",
        "Eliminates handling oils and airborne contaminants from pattern surfaces",
        "Activates and conditions the wax surface for improved slurry wetting",
        "Promotes a uniform, continuous primary coating layer across complex geometries",
        "Reduces pinholing, crawling, and delamination defects in the ceramic shell",
        "Fast-evaporating formulation integrates seamlessly into existing dipping lines",
      ],
      use: "Applied at the pattern preparation station between wax pattern inspection and primary slurry dipping in investment casting foundries producing aerospace, automotive, medical, and precision engineering components.",
    },
  },
  {
    title: "Nano Polymer Additive for Ceramic Slurry",
    tag: "Slurry Enhancement",
    summary: "Advanced nano polymer additive for ceramic slurry systems — improves shell strength, promotes faster and more uniform drying, and enhances mould permeability for consistent casting quality.",
    specs: {
      "Additive Type": "Nano polymer dispersion for aqueous slurry systems",
      "Dosage Form": "Liquid additive; compatible with standard slurry mixing",
      "Shell Property": "Improved MOR and reduced cracking tendency",
      "Drying Behavior": "Faster and more uniform shell layer drying",
      "Key Characteristic": "Enhanced permeability and process consistency",
    },
    desc: {
      intro: "Chemtech Nano Polymer Additive for Ceramic Slurry is an engineered process additive designed to optimize the performance of ceramic shell systems in investment casting. Incorporating nano-scale polymer particles into the slurry matrix promotes more uniform shell formation, accelerates interlayer drying, and improves the mechanical integrity and permeability of the fired ceramic mould. The outcome is greater process consistency, reduced shell cracking, and a more predictable casting environment.",
      points: [
        "Improves modulus of rupture (MOR) of fired ceramic shells for greater structural reliability",
        "Promotes faster and more uniform drying between shell coating layers",
        "Enhances gas permeability of the ceramic mould, reducing back-pressure during casting",
        "Reduces the tendency for shell cracking during thermal cycling and dewaxing",
        "Supports more uniform ceramic shell formation across complex pattern geometries",
        "Improves batch-to-batch process consistency in multi-dip shell building operations",
      ],
      use: "Added to primary and backup ceramic slurry systems in investment casting foundries manufacturing aerospace turbine blades, automotive precision components, medical implants, and complex industrial hardware.",
    },
  },
];

const releaseTypes = [
  {
    title: "Rubber Release Agent",
    tag: "Mold Longevity",
    summary: "Semi-permanent non-stick release barrier ensuring clean demolding and extended mold life.",
    specs: {
      "Thermal Resistance": "Operational up to 230°C",
      "Mold Compatibility": "Steel, aluminum, nickel, chrome tooling",
      "Transfer Properties": "Zero silicone transfer to vulcanizate",
      "Coating System": "Semi-permanent, multiple releases per coat",
      "Key Characteristic": "Prevents mold foul & carbon buildup",
    },
    desc: {
      intro: "Chemtech Rubber Release Agents form a durable semi-permanent barrier between hot mold steel and raw rubber vulcanizates, enabling clean part separation without surface tears, knit defects, or heavy mold fouling.",
      points: [
        "Prevents vulcanized rubber sticking and mold fouling over extended shifts",
        "Dramatically extends tooling life and reduces maintenance clean-down time",
        "Improves surface gloss, clarity, and dimensional fidelity of molded parts",
        "Non-interfering chemistry allows secondary painting or bonding when needed",
        "Compatible with Natural Rubber, EPDM, NBR, SBR, Silicone, and Viton compounds",
      ],
      use: "Used across industrial rubber molding — O-rings, hydraulic seals, gaskets, automotive profiles, footwear, and technical molded rubber goods.",
    },
  },
  {
    title: "Composite Release Agent",
    tag: "High Performance",
    summary: "Engineered for clean release in advanced carbon fiber, epoxy, and prepreg manufacturing.",
    specs: {
      "Thermal Rating": "Autoclave safe up to 260°C",
      "Resin Systems": "Epoxy, phenolic, bismaleimide, vinyl ester",
      "Surface Finish": "Class-A aerospace high gloss finish",
      "Contamination": "Zero silicone, non-contaminating",
      "Key Characteristic": "Permits direct secondary bonding without sanding",
    },
    desc: {
      intro: "Composite release agents are formulated for demanding high-performance aerospace and marine manufacturing. They deliver chemically inert, ultra-thin release layers that withstand elevated autoclave pressures and temperatures.",
      points: [
        "Clean, warp-free part release from deep contours and complex tooling",
        "High thermal stability throughout intense autoclave and oven curing cycles",
        "Semi-permanent formulation yields multiple releases per single application",
        "Eliminates silicone contamination that compromises secondary structural bonding",
        "Minimizes mold buildup, keeping tool surfaces clean across extended runs",
      ],
      use: "Essential for aerospace structural panels, marine carbon hulls, wind turbine blades, high-end automotive bodywork, and sporting goods.",
    },
  },
  {
    title: "Polyurethane Release Agent",
    tag: "PU Systems",
    summary: "High-efficiency demolding for flexible foam, rigid insulation, RIM, and cast elastomers.",
    specs: {
      "Application": "Low-pressure air spray or fine wipe",
      "System Compatibility": "Flexible foam, rigid PU, microcellular, RIM",
      "Finish Control": "Uniform matte, satin, or gloss surface",
      "Cycle Speed": "Fast flashing solvent/water carrier for short cycles",
      "Key Characteristic": "Reduces pinholing and surface voids",
    },
    desc: {
      intro: "Chemtech Polyurethane Release Agents provide exceptional demolding performance across rigid insulation panels, microcellular shoe soles, and high-resilience flexible seating foams with minimal mold residue.",
      points: [
        "Superior release consistency across rigid, flexible, and elastomeric PU systems",
        "Long-lasting effect reduces spray frequency and material consumption per shift",
        "Yields smooth, void-free demolded surfaces requiring zero post-demold finishing",
        "Highly effective in fast cycle RIM (Reaction Injection Molding) lines",
        "Available in eco-friendly waterborne and fast-drying solvent formulations",
      ],
      use: "Widely applied in automotive seating, acoustic insulation panels, footwear sole molding, steering wheels, and industrial cast polyurethane rollers.",
    },
  },
];

const adhesiveTypes = [
  {
    title: "Rubber to Metal Adhesive",
    tag: "Structural Bond",
    summary: "High-strength vulcanization bonding agent for dynamic shock and vibration applications.",
    specs: {
      "Bond Strength": "> 16 MPa (100% Rubber Tear)",
      "Service Temperature": "-40°C to +150°C continuous",
      "Environmental Resistance": "Salt spray, fuels, transmission oil, glycols",
      "System Configuration": "Dual-coat (Primer + Covercoat) & Single-coat options",
      "Key Characteristic": "Withstands extreme dynamic fatigue and shear",
    },
    desc: {
      intro: "Chemtech Rubber-to-Metal Bonding Agents establish indestructible, chemically crosslinked bonds between elastomeric compounds and treated metal substrates during the molding and vulcanization process.",
      points: [
        "Delivers rubber-tearing failure strength exceeding 16 MPa under peel and shear",
        "Exceptional fatigue resistance in dynamic, high-vibration applications",
        "Robust chemical resistance against road salt, motor oils, fuels, and hydraulic fluids",
        "Available in high-performance primer and covercoat configurations",
        "Compatible with mild steel, stainless steel, aluminum, brass, and engineered plastics",
      ],
      use: "Critical in automotive engine mounts, suspension bushings, anti-vibration industrial mounts, railway suspension pads, and oilfield packers.",
    },
  },
  {
    title: "Metal to Metal Adhesive",
    tag: "Structural Engineering",
    summary: "High-tensile structural adhesives replacing mechanical fasteners and spot welds.",
    specs: {
      "Tensile Lap Shear": "> 22 MPa (ASTM D1002)",
      "Gap Filling": "Up to 2.0 mm with thixotropic viscosity",
      "Corrosion Barrier": "Passivates joint interface against galvanic corrosion",
      "Thermal Endurance": "-50°C to +180°C operating window",
      "Key Characteristic": "Distributes stress uniformly across bonded assemblies",
    },
    desc: {
      intro: "Structural metal-to-metal bonding adhesives distribute mechanical stress uniformly across joint interfaces, eliminating the stress concentration and corrosion vulnerability inherent in welds, rivets, and bolts.",
      points: [
        "High tensile, shear, and peel resistance in heavy mechanical assemblies",
        "Complete seal against moisture, preventing galvanic corrosion between dissimilar metals",
        "High vibration dampening properties improving structural acoustics",
        "Thixotropic formulation enables gap-filling capability across imperfect joint fit-up",
        "Reduces component weight by replacing heavy mechanical fasteners",
      ],
      use: "Used across heavy structural engineering, commercial trailer manufacture, electrical enclosures, HVAC machinery, and precision machine assemblies.",
    },
  },
  {
    title: "Friction Material Adhesive",
    tag: "Braking Systems",
    summary: "High-temperature thermoset adhesive engineered for automotive and rail brake pad bonding.",
    specs: {
      "Thermal Peak Resistance": "Up to 380°C under severe braking friction",
      "Shear Adhesion": "Complies with ISO and SAE automotive brake standards",
      "Impact Resistance": "Extreme resistance to sudden thermal shock loads",
      "Cure Type": "Heat-activated thermosetting crosslink",
      "Key Characteristic": "Zero adhesive degradation under sustained friction",
    },
    desc: {
      intro: "Specialized friction material bonding adhesives formulated to withstand extreme shear loads, mechanical shock, and scorching temperatures generated during commercial vehicle and train braking cycles.",
      points: [
        "Sustained shear integrity at peak brake operating temperatures up to 380°C",
        "High impact and shock resistance under aggressive emergency braking forces",
        "Uniform coating coverage ensures consistent pad bond across product service life",
        "Fully compliant with stringent OEM and aftermarket braking safety specifications",
        "Formulated for clean application via roller coating, dipping, or spraying",
      ],
      use: "Applied in passenger car brake pads, heavy commercial vehicle brake shoes, rail transit friction pads, and industrial crane clutch assemblies.",
    },
  },
];

const coatingTypes = [
  {
    title: "Anti-Corrosion Coating",
    tag: "Protection",
    summary: "Heavy-duty barrier coating providing superior salt spray and chemical corrosion protection.",
    specs: {
      "Salt Spray Resistance": "> 1,200 hours (ASTM B117 pass)",
      "Film Formation": "Dense, pore-free passivating barrier",
      "Substrates": "Carbon steel, ductile iron, cast aluminum",
      "Application Methods": "Airless spray, dipping, electrostatic, brushing",
      "Key Characteristic": "Zero blister formation under harsh marine humidity",
    },
    desc: {
      intro: "Chemtech Anti-Corrosion Coatings deliver an impenetrable physical and chemical barrier between metal surfaces and aggressive environmental factors such as salt fog, coastal humidity, acid fumes, and industrial effluents.",
      points: [
        "Unrivaled resistance exceeding 1,200+ hours in ASTM B117 salt spray testing",
        "Extends component service life in outdoor, marine, and chemical plant environments",
        "Excellent mechanical adhesion prevents peeling and undercut rusting",
        "Passivates metal substrate, protecting against oxidation and pitting",
        "Available as high-build primers, intermediate barriers, and single-coat systems",
      ],
      use: "Deployed on structural steel frames, coastal infrastructure, offshore drilling hardware, industrial valves, and automotive chassis parts.",
    },
  },
  {
    title: "Heat Resistant Coating",
    tag: "Thermal Stability",
    summary: "Ceramic-reinforced protective coating maintaining integrity under continuous high temperatures.",
    specs: {
      "Operating Temperature": "Continuous up to 650°C (1200°F)",
      "Chemistry": "Silicone ceramic crosslinked matrix",
      "Thermal Cycling": "Zero flaking under rapid thermal quench",
      "Oxidation Defense": "Prevents metal scaling and decarburization",
      "Key Characteristic": "Low VOC outgassing during thermal ramp-up",
    },
    desc: {
      intro: "Heat resistant industrial coatings engineered with modified silicone-ceramic resins that withstand relentless thermal stress, preventing metal oxidation, scaling, and degradation at elevated temperatures.",
      points: [
        "Stable structural integrity at continuous service temperatures up to 650°C",
        "Stops thermal oxidation, scaling, and metal degradation on furnace steels",
        "Thermal shock resistant — survives rapid cycling between hot and cold states",
        "Ceramic-reinforced binder provides resistance against surface abrasion",
        "Virtually zero VOC smoke or outgassing during initial thermal cure-in",
      ],
      use: "Standard for industrial exhaust systems, heat exchangers, boiler housings, furnace muffles, piping manifolds, and high-temp engine hardware.",
    },
  },
  {
    title: "Surface Protection Coating",
    tag: "Wear Resistance",
    summary: "Ultra-hard surface treatment engineered to resist abrasion, scratching, and chemical wear.",
    specs: {
      "Hardness Rating": "Shore D 85+ / Pencil Hardness 4H+",
      "Wear Resistance": "High Taber abrasion resistance index",
      "Chemical Defense": "Resistant to oils, hydraulic fluids, and industrial solvents",
      "Friction Coefficient": "Low surface friction finish",
      "Key Characteristic": "Preserves micro-tolerances of precision tooling",
    },
    desc: {
      intro: "Formulated to fortify machine components against abrasive wear, surface scratching, gouging, and aggressive chemical contact, preserving dimensional tolerances and pristine cosmetic appearance.",
      points: [
        "Exceptional surface hardness protecting precision machined tolerances",
        "Resists micro-abrasive wear from dust, slurry, and high-frequency friction",
        "Impermeable to cutting fluids, industrial solvents, grease, and lubricants",
        "Smooth low-friction surface finish reduces mechanical drag",
        "Long service life drastically reduces downtime for component resurfacing",
      ],
      use: "Applied to tooling dies, guide rails, instrumentation housings, rotating machine shafts, and mechanical wear plates.",
    },
  },
];

const customTypes = [
  {
    title: "Tailored Industrial Coatings",
    tag: "Custom R&D",
    summary: "Custom chemical formulations developed to exact client process and regulatory specs.",
    specs: {
      "Development Path": "Laboratory proof-of-concept to plant qualification",
      "Chemistry Options": "Solvent-borne, waterborne, 100% solids, UV-curable",
      "Regulatory Standards": "Compliant with RoHS, REACH, and VOC targets",
      "Batch Volumes": "Flexible pilot batches to multi-ton bulk production",
      "Key Characteristic": "Engineered for proprietary customer parameters",
    },
    desc: {
      intro: "When standard catalogue formulations fail to meet unconventional operating parameters, our technical R&D team works side-by-side with clients to engineer bespoke coatings with customized viscosity, cure speed, and resilience.",
      points: [
        "In-depth technical consultation and analytical substrate evaluation",
        "Iterative laboratory synthesis followed by real-world factory qualification trials",
        "Formulation flexibility across waterborne, solvent-borne, or zero-VOC solids",
        "Complete Technical Data Sheets (TDS) and Safety Data Sheets (SDS) provided",
        "Strict batch-to-batch quality control and certificate of analysis (COA) with each lot",
      ],
      use: "Designed for unique process requirements in aerospace, defense, renewable energy, electronics encapsulation, and harsh environment manufacturing.",
    },
  },
  {
    title: "Application-Specific Solutions",
    tag: "Bespoke Engineering",
    summary: "Comprehensive material engineering integrating products directly with customer line setups.",
    specs: {
      "Engineering Scope": "Substrate prep, application tooling, curing parameters",
      "Material Breadth": "Metals, engineered composites, ceramics, elastomers",
      "Audit Support": "On-site production audits and process parameter tuning",
      "Supply Stability": "Guaranteed batch repeatability and reserved inventory",
      "Key Characteristic": "Turnkey performance guarantee for production lines",
    },
    desc: {
      intro: "We provide end-to-end material engineering that goes beyond chemistry to encompass application methodology, spray equipment selection, curing cycles, and quality control metrics directly on your factory floor.",
      points: [
        "Comprehensive process optimization reducing cycle times and scrap rates",
        "On-site technical troubleshooting and trial coordination by material engineers",
        "Multi-substrate compatibility across metals, composites, polymers, and glass",
        "Scalable production capacity from initial qualification runs to steady supply",
        "Dedicated technical support team responsive to process line adaptations",
      ],
      use: "Deployed in high-throughput automotive manufacturing lines, specialized defense contractors, and precision casting foundries.",
    },
  },
];

const categories = [
  {
    key: "waxes",
    label: "Investment Casting Waxes",
    shortLabel: "Waxes",
    number: "01",
    img: waxImg,
    accent: "#3B82F6",
    accentMuted: "rgba(59,130,246,0.12)",
    desc: "Precision investment casting waxes engineered for dimensional stability, low thermal shrinkage, and zero-ash burnout. Formulated for foundries producing critical aerospace, automotive, and industrial components.",
    data: waxTypes,
  },
  {
    key: "release",
    label: "Release Agents",
    shortLabel: "Release",
    number: "02",
    img: releaseImg,
    accent: "#22D3EE",
    accentMuted: "rgba(34,211,238,0.12)",
    desc: "Semi-permanent and sacrificial mold release agents designed for clean demolding, superior surface finish, and extended tooling life across rubber molding, composite manufacturing, and polyurethane systems.",
    data: releaseTypes,
  },
  {
    key: "adhesive",
    label: "Adhesives",
    shortLabel: "Adhesives",
    number: "03",
    img: adhesiveImg,
    accent: "#F59E0B",
    accentMuted: "rgba(245,158,11,0.12)",
    desc: "High-performance structural adhesives and vulcanizing bonding agents delivering exceptional peel, shear, and fatigue resistance for rubber-to-metal assemblies, structural metal joints, and friction brake pads.",
    data: adhesiveTypes,
  },
  {
    key: "coating",
    label: "Metal Coatings",
    shortLabel: "Coatings",
    number: "04",
    img: coatingImg,
    accent: "#10B981",
    accentMuted: "rgba(16,185,129,0.12)",
    desc: "Protective metal surface treatments engineering robust barriers against severe atmospheric corrosion, high-temperature oxidation up to 650°C, and heavy mechanical abrasive wear.",
    data: coatingTypes,
  },
  {
    key: "custom",
    label: "Custom Solutions",
    shortLabel: "Custom",
    number: "05",
    img: coatingImg,
    accent: "#A78BFA",
    accentMuted: "rgba(167,139,250,0.12)",
    desc: "Bespoke chemical R&D and tailored formulations for challenging industrial applications requiring specialized viscosity, cure kinetics, extreme temperature resistance, or regulatory compliance.",
    data: customTypes,
  },
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
      aria-label={`View detailed specifications for ${item.title}`}
      style={{
        background: hovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? cat.accent + "66" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12,
        padding: "22px 22px 18px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        outline: "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.985)",
        transition: `opacity 0.5s ease ${index * 0.065}s, transform 0.5s ease ${index * 0.065}s, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.32), 0 0 0 1px ${cat.accent}25` : "none",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 2.5,
          width: hovered ? "100%" : "28%",
          background: cat.accent,
          opacity: hovered ? 1 : 0.4,
          transition: "width 0.42s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at top left, ${cat.accent}14 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s",
        }}
      />

      <div
        style={{
          display: "inline-block",
          background: cat.accentMuted,
          border: `1px solid ${cat.accent}44`,
          borderRadius: 4,
          padding: "2px 10px",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: cat.accent,
          marginBottom: 13,
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "transform 0.25s",
        }}
      >
        {item.tag}
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E8EFF8", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
        {item.title}
      </h3>
      <p style={{ fontSize: 13, color: hovered ? "#8BAEC9" : "#517494", lineHeight: 1.65, margin: "0 0 14px", transition: "color 0.25s" }}>
        {item.summary}
      </p>

      {/* Mini Specs Snapshot */}
      {item.specs && (
        <div style={{ margin: "0 0 14px", padding: "8px 10px", background: "rgba(0,0,0,0.2)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.04)" }}>
          {Object.entries(item.specs).slice(0, 2).map(([k, v], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7A9BB8", lineHeight: 1.6 }}>
              <span style={{ color: "#4A6A86" }}>{k}:</span>
              <span style={{ fontWeight: 600, color: "#C8D8E8" }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 12,
          fontWeight: 600,
          color: cat.accent,
          opacity: hovered ? 1 : 0.65,
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "opacity 0.25s, transform 0.25s",
        }}
      >
        Technical Specs & Details
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
        border: `1px solid ${hovered ? cat.accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        padding: "28px 26px 24px",
        cursor: "pointer",
        outline: "none",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(22px)",
        transition: `opacity 0.52s ease ${index * 0.07}s, transform 0.52s ease ${index * 0.07}s, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        boxShadow: hovered ? "0 8px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 800, color: cat.accent, opacity: 0.16, lineHeight: 1, marginBottom: 14, letterSpacing: "-0.04em" }}>
        {cat.number}
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#E8EFF8", margin: "0 0 8px" }}>
        {cat.label}
      </h2>
      <p style={{ fontSize: 13, color: "#6A8FA8", margin: "0 0 16px", lineHeight: 1.6 }}>
        {cat.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {cat.data.map((item) => (
          <span
            key={item.tag}
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: cat.accent,
              background: cat.accentMuted,
              border: `1px solid ${cat.accent}30`,
              borderRadius: 4,
              padding: "3px 8px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {item.title}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(categoryParam || null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync category param if URL changes directly
  useEffect(() => {
    if (categoryParam && categories.some((c) => c.key === categoryParam)) {
      setActiveCategory(categoryParam);
      setPanelVisible(true);
    }
  }, [categoryParam]);

  const currentCat = categories.find((c) => c.key === activeCategory);

  const handleCategoryClick = useCallback(
    (key) => {
      if (activeCategory === key) {
        setPanelVisible(false);
        setTimeout(() => {
          setActiveCategory(null);
          setSearchParams({}, { replace: true });
        }, 260);
      } else {
        setPanelVisible(false);
        setTimeout(() => {
          setActiveCategory(key);
          setSearchParams({ category: key }, { replace: true });
          requestAnimationFrame(() => setTimeout(() => setPanelVisible(true), 16));
        }, activeCategory ? 180 : 0);
      }
    },
    [activeCategory, setSearchParams]
  );

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedItem]);

  // Global search across all products for on-page instant lookup
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const results = [];
    categories.forEach((cat) => {
      cat.data.forEach((item) => {
        const text = `${item.title} ${item.tag} ${item.summary} ${item.desc.intro} ${item.desc.use} ${Object.values(item.specs || {}).join(" ")}`.toLowerCase();
        if (text.includes(q)) {
          results.push({ ...item, cat });
        }
      });
    });
    return results;
  }, [searchQuery]);

  // Schema.org ItemList and Product generation for Google rich results (quote-based B2B materials)
  const productsSchema = useMemo(() => {
    const itemList = [];
    let pos = 1;
    canonicalCategories.forEach((cat) => {
      cat.products.forEach((p) => {
        itemList.push({
          "@type": "ListItem",
          "position": pos++,
          "item": {
            "@type": "Product",
            "name": p.title,
            "description": p.summary,
            "category": cat.label,
            "url": `${SITE_URL}/${cat.slug}/${p.slug}`,
            "brand": {
              "@type": "Brand",
              "name": "Chemtech Specialty",
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Chemtech Specialty",
            },
          },
        });
      });
    });

    return [
      {
        "@type": "ItemList",
        "name": "Industrial Specialty Materials Catalogue",
        "description": "Comprehensive range of investment casting waxes, release agents, industrial adhesives, and protective metal coatings by Chemtech Specialty.",
        "numberOfItems": itemList.length,
        "itemListElement": itemList,
      },
    ];
  }, []);

  return (
    <div
      style={{
        background: "#071523",
        minHeight: "100vh",
        color: "#E8EFF8",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <SEO
        title="Industrial Specialty Products Catalogue | Investment Casting Waxes, Release Agents, Adhesives & Coatings | Chemtech Specialty"
        description="Browse high-performance investment casting waxes (filled, unfilled, water soluble, sticky, repair), mold release agents, rubber-to-metal adhesives, and high-temp metal coatings manufactured by Chemtech Specialty."
        keywords="investment casting wax catalogue, filled pattern wax, unfilled wax, water soluble wax casting, sticky wax, casting repair wax, mold release agents, rubber release agent, composite release agent, polyurethane release agent, rubber to metal bonding adhesive, structural metal adhesive, friction material adhesive, anti corrosion metal coating, heat resistant coating 650C, custom specialty chemical formulation"
        canonicalPath="/products"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Products Catalogue", item: "/products" },
        ]}
        schema={productsSchema}
      />

      <style>{`
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
        @keyframes slideUpModal  { from{opacity:0;transform:translateY(18px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse         { 0%,100%{opacity:0.45} 50%{opacity:1} }
        *:focus-visible { outline: 2px solid #3B82F6; outline-offset: 2px; border-radius: 4px; }
      `}</style>

      {/* Noise overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.4,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── HERO HEADER ── */}
      <header style={{ position: "relative", zIndex: 1, maxWidth: 1140, margin: "0 auto", padding: "100px 32px 48px" }}>
        <FadeUp>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(59,130,246,0.13)",
              border: "1px solid rgba(59,130,246,0.28)",
              borderRadius: 4,
              padding: "4px 14px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#60A5FA",
              marginBottom: 24,
            }}
          >
            <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "#60A5FA", display: "inline-block", animation: "pulse 2.4s ease-in-out infinite" }} />
            Engineered Material Solutions
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 58px)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 20px",
              maxWidth: 780,
              color: "#F0F6FF",
              letterSpacing: "-0.025em",
            }}
          >
            Precision Materials for{" "}
            <span
              style={{
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(90deg, #3B82F6, #60A5FA 55%, #22D3EE)",
              }}
            >
              Industrial Manufacturing
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.14}>
          <p style={{ fontSize: 16, color: "#6A8FA8", maxWidth: 640, lineHeight: 1.8, margin: "0 0 32px" }}>
            High-performance investment casting waxes, advanced mold release agents, industrial structural adhesives, and protective metal coatings — formulated with strict batch consistency for foundries and precision manufacturers.
          </p>
        </FadeUp>

        {/* Search / Filter Bar */}
        <FadeUp delay={0.2}>
          <div style={{ position: "relative", maxWidth: 520, margin: "0 0 10px" }}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product, application, or material (e.g. 'filled wax', 'rubber to metal', 'heat resistant')..."
              aria-label="Search industrial products catalogue"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                padding: "14px 18px 14px 44px",
                color: "#E8EFF8",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#3B82F6"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            />
            <svg
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#60A5FA", pointerEvents: "none" }}
              width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 14 }}
              >
                ✕
              </button>
            )}
          </div>
        </FadeUp>
      </header>

      {/* ── SEARCH RESULTS PANEL (If search active) ── */}
      {searchResults && (
        <section style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#93C5FD", margin: 0 }}>
              Search Results ({searchResults.length} {searchResults.length === 1 ? "product" : "products"} found for "{searchQuery}")
            </h2>
            <button
              onClick={() => setSearchQuery("")}
              style={{ background: "none", border: "none", color: "#60A5FA", fontSize: 13, cursor: "pointer", textDecoration: "underline" }}
            >
              Clear search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "36px", textAlign: "center", color: "#6A8FA8" }}>
              <p style={{ margin: "0 0 12px", fontSize: 16 }}>No products matched your exact query "{searchQuery}".</p>
              <p style={{ margin: 0, fontSize: 13 }}>
                Looking for a custom formulation? <button onClick={() => navigate("/contact")} style={{ color: "#3B82F6", background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>Contact our chemical engineering team</button>.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {searchResults.map((item, i) => (
                <ProductCard
                  key={item.title}
                  item={item}
                  cat={item.cat}
                  index={i}
                  onSelect={(it) => setSelectedItem({ ...it, cat: item.cat })}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── STICKY CATEGORY NAV ── */}
      <nav
        aria-label="Product categories"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(7,21,35,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          overflowX: "auto",
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
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderBottom: `2px solid ${active ? cat.accent : "transparent"}`,
                  padding: "18px 22px",
                  color: active ? cat.accent : "#5B7A98",
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  fontFamily: "inherit",
                  letterSpacing: "0.03em",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.22s",
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

      {/* ── ACTIVE CATEGORY PANEL ── */}
      {currentCat && !searchResults && (
        <section
          id={`panel-${currentCat.key}`}
          aria-label={currentCat.label}
          style={{
            position: "relative",
            zIndex: 1,
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
                    Category {currentCat.number} — {currentCat.shortLabel}
                  </div>
                  <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#F0F6FF", margin: "0 0 14px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                    {currentCat.label}
                  </h2>
                  <p style={{ color: "#7A9BB8", lineHeight: 1.8, fontSize: 15, margin: 0, maxWidth: 520 }}>
                    {currentCat.desc}
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.1} style={{ flex: "0 0 240px" }}>
                <img
                  src={currentCat.img}
                  alt={`${currentCat.label} manufacturer - Chemtech Specialty`}
                  loading="lazy"
                  width={240}
                  height={160}
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "block",
                    filter: "brightness(0.9) saturate(0.85)",
                    transition: "filter 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1) saturate(1)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(0.9) saturate(0.85)"; e.currentTarget.style.transform = "scale(1)"; }}
                />
              </FadeUp>
            </div>

            {/* Product grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
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

            {/* In-Category Direct RFQ Banner */}
            <div style={{ marginTop: 40, padding: "24px 28px", background: "rgba(255,255,255,0.02)", border: `1px solid ${currentCat.accent}33`, borderRadius: 12, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#E8EFF8", margin: "0 0 4px" }}>
                  Need technical data sheets or a custom trial batch for {currentCat.label}?
                </h3>
                <p style={{ fontSize: 13, color: "#6A8FA8", margin: 0 }}>
                  Our technical engineers provide formulation consultation and sample testing for qualified foundries and manufacturers.
                </p>
              </div>
              <button
                onClick={() => navigate(`/contact?product=${encodeURIComponent(currentCat.label)}`)}
                style={{
                  background: currentCat.accent,
                  color: "#071523",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "10px 22px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Request Technical Data Sheet (TDS) →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── OVERVIEW (when no category selected and no search) ── */}
      {!activeCategory && !searchResults && (
        <main
          style={{ position: "relative", zIndex: 1, maxWidth: 1140, margin: "0 auto", padding: "40px 32px 96px" }}
          aria-label="Product categories overview"
        >
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3A5A76", marginBottom: 24 }}>
              Select a category to view individual products and technical data
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.key}
                cat={cat}
                index={i}
                onClick={() => handleCategoryClick(cat.key)}
              />
            ))}
          </div>

          {/* Key Advantages Grid */}
          <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#F0F6FF", textAlign: "center", margin: "0 0 12px" }}>
              Engineered Quality Across All Material Lines
            </h2>
            <p style={{ fontSize: 14, color: "#6A8FA8", textAlign: "center", maxWidth: 600, margin: "0 auto 40px" }}>
              From initial raw material testing to final production certification, Chemtech Specialty adheres to rigorous industrial quality control.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {[
                { title: "Ultra-Clean Burnout", desc: "Ash content consistently under 0.015%, eliminating inclusion defects in critical alloy castings.", icon: "🔥" },
                { title: "Multi-Substrate Adhesion", desc: "Chemical crosslinking capable of bonding diverse combinations of metals, elastomers, and composites.", icon: "🔗" },
                { title: "High-Temperature Endurance", desc: "Formulated to perform reliably under thermal cycles exceeding 260°C to 650°C.", icon: "🌡️" },
                { title: "Pan-India & Export Supply", desc: "Dependable dispatch networks from Nashik, Maharashtra with ISO-compliant batch tracking.", icon: "🌐" },
              ].map((adv, idx) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "20px" }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{adv.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#E8EFF8", margin: "0 0 6px" }}>{adv.title}</h3>
                  <p style={{ fontSize: 13, color: "#6A8FA8", margin: 0, lineHeight: 1.6 }}>{adv.desc}</p>
                </div>
              ))}
            </div>
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
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(4,12,24,0.86)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            animation: "fadeInOverlay 0.22s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0D2035",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 18,
              width: "100%",
              maxWidth: 640,
              maxHeight: "88vh",
              overflowY: "auto",
              position: "relative",
              animation: "slideUpModal 0.28s cubic-bezier(0.34,1.1,0.64,1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ height: 3.5, background: selectedItem.cat.accent, borderRadius: "18px 18px 0 0" }} />

            <div style={{ padding: "30px 34px 34px" }}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close product detail"
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  cursor: "pointer",
                  color: "#7A9BB8",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F0F6FF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#7A9BB8"; }}
              >
                ✕
              </button>

              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: selectedItem.cat.accent, marginBottom: 9, opacity: 0.85 }}>
                {selectedItem.cat.label}
              </div>

              <h2 style={{ fontSize: 26, fontWeight: 700, color: "#F0F6FF", margin: "0 0 10px", lineHeight: 1.2, paddingRight: 40, letterSpacing: "-0.02em" }}>
                {selectedItem.title}
              </h2>

              <div style={{ display: "inline-block", background: selectedItem.cat.accentMuted, border: `1px solid ${selectedItem.cat.accent}44`, borderRadius: 4, padding: "3px 12px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: selectedItem.cat.accent, marginBottom: 22 }}>
                {selectedItem.tag}
              </div>

              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px" }} />

              <p style={{ fontSize: 14, color: "#A8C0D6", lineHeight: 1.8, margin: "0 0 22px" }}>
                {selectedItem.desc.intro}
              </p>

              {/* Technical Specifications Table */}
              {selectedItem.specs && (
                <div style={{ marginBottom: 24, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: selectedItem.cat.accent, marginBottom: 12 }}>
                    Technical Specifications
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {Object.entries(selectedItem.specs).map(([key, val], idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: idx < Object.keys(selectedItem.specs).length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", paddingBottom: 6, fontSize: 12 }}>
                        <span style={{ color: "#7A9BB8" }}>{key}</span>
                        <span style={{ fontWeight: 600, color: "#E8EFF8", textAlign: "right" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A6A86", marginBottom: 12 }}>
                  Key Performance Features
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

              {/* Applications */}
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `3px solid ${selectedItem.cat.accent}`, borderRadius: "0 8px 8px 0", padding: "14px 16px", marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: selectedItem.cat.accent, marginBottom: 5, opacity: 0.85 }}>
                  Recommended Applications & Use Cases
                </div>
                <p style={{ fontSize: 13, color: "#7A9BB8", margin: 0, lineHeight: 1.65 }}>
                  {selectedItem.desc.use}
                </p>
              </div>

              {/* Modal RFQ Action */}
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  onClick={() => setSelectedItem(null)}
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#C8D8E8", fontSize: 13, padding: "10px 18px", borderRadius: 8, cursor: "pointer" }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedItem.title;
                    setSelectedItem(null);
                    navigate(`/contact?product=${encodeURIComponent(title)}`);
                  }}
                  style={{
                    background: "#3B82F6",
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "10px 22px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                  }}
                >
                  Request Quote for {selectedItem.title} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 32px", textAlign: "center", fontSize: 12, color: "#4A6A86" }}>
        <p style={{ margin: 0 }}>Chemtech Specialty — High-performance industrial materials engineered for precision</p>
      </footer>
    </div>
  );
}