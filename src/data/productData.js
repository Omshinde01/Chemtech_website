/**
 * productData.js
 * Central data source for all Chemtech Specialty products.
 * Used by /products page, category pages, and individual product pages.
 */

export const SITE_URL = "https://chemtechspecialty.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// ─── Investment Casting Waxes ─────────────────────────────────────────────────
export const waxProducts = [
  {
    slug: "filled-wax",
    title: "Filled Investment Casting Wax",
    shortTitle: "Filled Wax",
    tag: "High Rigidity",
    summary:
      "Enhanced strength & dimensional stability for complex patterns and high-precision casting.",
    metaTitle:
      "Filled Investment Casting Wax | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty Filled Investment Casting Wax provides superior structural rigidity and dimensional stability. Ideal for automotive, aerospace, and precision engineering castings. Request a quote.",
    specs: {
      "Melting Point": "68°C – 74°C",
      "Ash Content": "< 0.015% (Ultra-Clean Burnout)",
      "Volumetric Shrinkage": "< 0.8% (Exceptional Accuracy)",
      "Physical Form": "Pellets / Flakes / Pastilles",
      "Key Characteristic":
        "Resists deformation during multi-dip shell handling",
    },
    intro:
      "Chemtech Filled Investment Casting Wax is engineered to provide superior structural rigidity and dimensional stability during the lost-wax casting process. Its filler formulation resists deformation under mechanical load, ensuring strict pattern integrity from automatic injection through assembly and slurry dipping.",
    points: [
      "High mechanical rigidity prevents pattern distortion in complex geometry",
      "Reduces deformation during manual handling and long-distance transport",
      "Ensures consistent dimensional repeatability across high-volume production batches",
      "Compatible with modern high-speed automatic wax injection presses",
      "Clean, low-ash burnout leaves minimal ceramic shell residue",
    ],
    use: "Widely used in automotive turbine components, aerospace structural brackets, defense hardware, and heavy precision engineering castings.",
  },
  {
    slug: "unfilled-wax",
    title: "Unfilled Investment Casting Wax",
    shortTitle: "Unfilled Wax",
    tag: "Fine Detail",
    summary:
      "Superior surface finish with excellent mold-filling capability and ultra-low ash residue.",
    metaTitle:
      "Unfilled Investment Casting Wax | Chemtech Specialty",
    metaDescription:
      "Unfilled Investment Casting Wax by Chemtech Specialty delivers mirror-smooth surface finish and near-zero ash residue for intricate castings. Contact us for samples and technical data sheets.",
    specs: {
      "Drop Melting Point": "72°C – 78°C",
      "Ash Content": "< 0.008% (Negligible Residue)",
      Viscosity: "Low-viscosity for micro-channels",
      "Surface Finish": "Mirror-smooth casting surface",
      "Key Characteristic": "Flawless reproduction of micro-details",
    },
    intro:
      "Unfilled Investment Casting Wax delivers an exceptionally smooth surface finish and superior flow characteristics for intricate casting molds. Its clean burnout profile ensures zero carbonaceous residue, preserving ceramic shell interior integrity throughout pre-heating and firing.",
    points: [
      "Smooth, defect-free pattern surface eliminating secondary grinding",
      "High mold-filling fluidity ideal for intricate, thin-wall sections",
      "Ultra-low ash residue (<0.008%) preventing inclusion defects in metal",
      "Consistent batch viscosity across fluctuating foundry ambient temperatures",
      "Rapid cooling rate shortening machine injection cycle times",
    ],
    use: "Ideal for intricate casting designs requiring fine detailing, medical surgical implants, turbocharger impellers, and precision luxury goods.",
  },
  {
    slug: "water-soluble-wax",
    title: "Water Soluble Investment Casting Wax",
    shortTitle: "Water Soluble Wax",
    tag: "Complex Cores",
    summary:
      "Fast-dissolving core wax designed for intricate internal hollows and undercut channels.",
    metaTitle:
      "Water Soluble Investment Casting Wax | Chemtech Specialty",
    metaDescription:
      "Water Soluble Casting Wax from Chemtech Specialty dissolves rapidly in warm water enabling clean internal core removal for hollow aerofoils, valve bodies, and complex passages.",
    specs: {
      "Dissolution Speed": "Rapid in warm water (15–25 mins)",
      Environmental: "100% Non-toxic & environmentally safe",
      "Dimensional Stability": "Excellent green strength during handling",
      "Residue After Wash": "0.0% wash-out residue",
      "Key Characteristic": "Eliminates mechanical coring damage",
    },
    intro:
      "Chemtech Water Soluble Wax is formulated specifically for creating internal cores in complex investment casting geometries where mechanical extraction is impossible. It dissolves rapidly and cleanly in warm water, leaving delicate internal passages free of defects.",
    points: [
      "Dissolves cleanly in water without mechanical extraction risk to thin walls",
      "Perfect for internal hollows, cooling channels, and complex undercuts",
      "Reduces post-processing time and labor cost significantly",
      "Seamlessly integrates with standard pattern wax outer shells",
      "Non-toxic, safe for operator handling and standard municipal drainage",
    ],
    use: "Extensively utilized in hollow aerofoil components, fluid manifold passages, complex valve bodies, and pump impellers.",
  },
  {
    slug: "sticky-wax",
    title: "Sticky Wax for Investment Casting",
    shortTitle: "Sticky Wax",
    tag: "Pattern Assembly",
    summary:
      "Fast-setting high-tack adhesion for dependable pattern tree and sprue runner assembly.",
    metaTitle:
      "Sticky Wax for Investment Casting | Pattern Assembly | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty Sticky Wax provides instantaneous high-tack bonding for wax pattern tree assembly, sprue runners, and gates in investment casting foundries.",
    specs: {
      "Setting Time": "3 – 6 seconds (Immediate Tack)",
      "Adhesion Strength": "Rigid, fracture-resistant joint",
      "Meltout Behavior": "Clean meltout without slagging",
      "Application Temp": "65°C – 80°C with heated wax pen",
      "Key Characteristic":
        "Zero pattern tree detachment during slurry dipping",
    },
    intro:
      "Sticky wax is the industry-standard choice for assembling and securing wax patterns onto spruing runners and central trees. Its immediate tack and tough, resilient bond guarantee structural security during repeated handling, robot dipping, and ceramic stucco drying.",
    points: [
      "Instantaneous strong adhesion requiring no clamping or fixturing",
      "Rapid setting speed increases pattern tree assembly throughput",
      "Dependable joint shear strength under high slurry agitation forces",
      "Clean meltout during autoclave dewaxing with zero carbon contamination",
      "Leaves no chemical residue that interferes with ceramic shell adhesion",
    ],
    use: "Used throughout investment casting pattern tree assembly, runner and gate bonding, and emergency pattern fixture attachment.",
  },
  {
    slug: "repair-wax",
    title: "Investment Casting Repair Wax",
    shortTitle: "Repair Wax",
    tag: "Surface Finishing",
    summary:
      "Smoothly blendable formulation to repair pattern defects, knit lines, and handling scars.",
    metaTitle:
      "Investment Casting Repair Wax | Surface Finishing | Chemtech Specialty",
    metaDescription:
      "Repair Wax by Chemtech Specialty is a ductile, workable formulation for correcting surface defects, knit lines, and sink marks on investment casting wax patterns before ceramic shell dipping.",
    specs: {
      "Workability Range": "Plastic and pliable at 25°C – 40°C",
      "Carving Quality": "Toolable without chipping or flaking",
      "Thermal Expansion": "Matched precisely to base pattern wax",
      "Color Matching": "Consistent industrial casting hues",
      "Key Characteristic": "Invisible blending with zero boundary line",
    },
    intro:
      "Chemtech Repair Wax is a workable, ductile formulation engineered to correct surface imperfections, flow knit lines, sink marks, and handling damage on molded wax patterns. Its smooth working consistency blends invisibly with virgin pattern wax.",
    points: [
      "Easily carved, shaped, and polished by hand tool or warm spatula",
      "Blends seamlessly with base wax for an undetectable, smooth repair",
      "Prevents costly scrap of complex patterns with minor surface defects",
      "Matched thermal expansion coefficient prevents cracking during burnout",
      "Long shelf life and thermal stability under ambient storage conditions",
    ],
    use: "Used in quality inspection stations for finishing, patching, and restoring investment casting patterns prior to ceramic shell dipping.",
  },
];

// ─── Release Agents ───────────────────────────────────────────────────────────
export const releaseProducts = [
  {
    slug: "rubber-release-agent",
    title: "Rubber Release Agent",
    shortTitle: "Rubber Release",
    tag: "Mold Longevity",
    summary:
      "Semi-permanent non-stick release barrier ensuring clean demolding and extended mold life.",
    metaTitle:
      "Rubber Release Agent | Industrial Rubber Molding | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty Rubber Release Agents provide semi-permanent non-stick barriers for clean demolding of O-rings, seals, gaskets, and technical rubber goods. Extends tooling life significantly.",
    specs: {
      "Thermal Resistance": "Operational up to 230°C",
      "Mold Compatibility": "Steel, aluminum, nickel, chrome tooling",
      "Transfer Properties": "Zero silicone transfer to vulcanizate",
      "Coating System": "Semi-permanent, multiple releases per coat",
      "Key Characteristic": "Prevents mold foul & carbon buildup",
    },
    intro:
      "Chemtech Rubber Release Agents form a durable semi-permanent barrier between hot mold steel and raw rubber vulcanizates, enabling clean part separation without surface tears, knit defects, or heavy mold fouling.",
    points: [
      "Prevents vulcanized rubber sticking and mold fouling over extended shifts",
      "Dramatically extends tooling life and reduces maintenance clean-down time",
      "Improves surface gloss, clarity, and dimensional fidelity of molded parts",
      "Non-interfering chemistry allows secondary painting or bonding when needed",
      "Compatible with Natural Rubber, EPDM, NBR, SBR, Silicone, and Viton compounds",
    ],
    use: "Used across industrial rubber molding — O-rings, hydraulic seals, gaskets, automotive profiles, footwear, and technical molded rubber goods.",
  },
  {
    slug: "composite-release-agent",
    title: "Composite Release Agent",
    shortTitle: "Composite Release",
    tag: "High Performance",
    summary:
      "Engineered for clean release in advanced carbon fiber, epoxy, and prepreg manufacturing.",
    metaTitle:
      "Composite Release Agent | Carbon Fibre & Epoxy | Chemtech Specialty",
    metaDescription:
      "Composite Release Agents from Chemtech Specialty deliver Class-A surface finishes for aerospace carbon fibre, epoxy panels, and autoclave-cured composites without silicone contamination.",
    specs: {
      "Thermal Rating": "Autoclave safe up to 260°C",
      "Resin Systems": "Epoxy, phenolic, bismaleimide, vinyl ester",
      "Surface Finish": "Class-A aerospace high gloss finish",
      Contamination: "Zero silicone, non-contaminating",
      "Key Characteristic": "Permits direct secondary bonding without sanding",
    },
    intro:
      "Composite release agents are formulated for demanding high-performance aerospace and marine manufacturing. They deliver chemically inert, ultra-thin release layers that withstand elevated autoclave pressures and temperatures.",
    points: [
      "Clean, warp-free part release from deep contours and complex tooling",
      "High thermal stability throughout intense autoclave and oven curing cycles",
      "Semi-permanent formulation yields multiple releases per single application",
      "Eliminates silicone contamination that compromises secondary structural bonding",
      "Minimizes mold buildup, keeping tool surfaces clean across extended runs",
    ],
    use: "Essential for aerospace structural panels, marine carbon hulls, wind turbine blades, high-end automotive bodywork, and sporting goods.",
  },
  {
    slug: "polyurethane-release-agent",
    title: "Polyurethane Release Agent",
    shortTitle: "PU Release Agent",
    tag: "PU Systems",
    summary:
      "High-efficiency demolding for flexible foam, rigid insulation, RIM, and cast elastomers.",
    metaTitle:
      "Polyurethane Release Agent | PU Foam & RIM | Chemtech Specialty",
    metaDescription:
      "Polyurethane Release Agents by Chemtech Specialty provide superior demolding for flexible PU foam, rigid insulation, RIM components, and cast elastomers with minimal mold residue.",
    specs: {
      Application: "Low-pressure air spray or fine wipe",
      "System Compatibility": "Flexible foam, rigid PU, microcellular, RIM",
      "Finish Control": "Uniform matte, satin, or gloss surface",
      "Cycle Speed": "Fast flashing solvent/water carrier for short cycles",
      "Key Characteristic": "Reduces pinholing and surface voids",
    },
    intro:
      "Chemtech Polyurethane Release Agents provide exceptional demolding performance across rigid insulation panels, microcellular shoe soles, and high-resilience flexible seating foams with minimal mold residue.",
    points: [
      "Superior release consistency across rigid, flexible, and elastomeric PU systems",
      "Long-lasting effect reduces spray frequency and material consumption per shift",
      "Yields smooth, void-free demolded surfaces requiring zero post-demold finishing",
      "Highly effective in fast cycle RIM (Reaction Injection Molding) lines",
      "Available in eco-friendly waterborne and fast-drying solvent formulations",
    ],
    use: "Widely applied in automotive seating, acoustic insulation panels, footwear sole molding, steering wheels, and industrial cast polyurethane rollers.",
  },
  {
    slug: "rubber-to-metal-release",
    title: "Rubber-to-Metal Release Agent",
    shortTitle: "Rubber-to-Metal Release",
    tag: "Bonded Assemblies",
    summary:
      "Precision release agent preventing adhesive contamination on bonded rubber-metal assemblies.",
    metaTitle:
      "Rubber-to-Metal Release Agent | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty Rubber-to-Metal Release Agents prevent adhesive contamination on adjacent tooling surfaces during bonded rubber-to-metal vulcanization, protecting mold geometry and part quality.",
    specs: {
      Application: "Spray or brush onto parting surfaces",
      "Selective Action": "Releases tool steel; does not contaminate bond interface",
      "Temperature Range": "Up to 200°C vulcanization cycles",
      "Compatibility": "Works with Chemlok and similar bonding systems",
      "Key Characteristic": "Zero bond strength reduction on intended interface",
    },
    intro:
      "When manufacturing bonded rubber-to-metal assemblies, controlled release is critical — you need clean separation at parting lines without contaminating the adhesive bond interface. Chemtech Rubber-to-Metal Release Agents are formulated for exactly this purpose.",
    points: [
      "Applied selectively to parting surfaces; does not migrate to bonded zones",
      "Prevents mold fouling from vulcanized rubber flash on parting lines",
      "Protects adjacent mold geometry from residue buildup over long production runs",
      "Maintains zero interference with rubber-to-metal adhesive bond strength",
      "Compatible with standard bonding system overcoats and single-coat systems",
    ],
    use: "Used in automotive engine mount manufacturing, suspension bush molding, anti-vibration mount production, and oilfield bonded rubber components.",
  },
  {
    slug: "metal-to-metal-release",
    title: "Metal-to-Metal Release Agent",
    shortTitle: "Metal-to-Metal Release",
    tag: "Die & Tooling",
    summary:
      "High-temperature release agent for clean separation of metal castings and die-cast components from steel tooling.",
    metaTitle:
      "Metal-to-Metal Release Agent | Die Casting | Chemtech Specialty",
    metaDescription:
      "Metal-to-Metal Release Agents from Chemtech Specialty enable clean separation of aluminum, zinc, and ferrous castings from steel tooling in high-temperature die casting and press forming operations.",
    specs: {
      "Operating Temperature": "Up to 650°C for die casting applications",
      "Substrate Metals": "Aluminum, zinc, magnesium, ferrous alloys",
      "Film Type": "Ultra-thin, non-porous release layer",
      Application: "Spray, dip, or electrostatic application",
      "Key Characteristic": "Prevents soldering and die erosion",
    },
    intro:
      "In metal die casting and press forming, tool protection and clean part release are essential to maintaining dimensional accuracy and production uptime. Chemtech Metal-to-Metal Release Agents provide a protective thermal barrier between molten metal and high-cost steel tooling.",
    points: [
      "Prevents aluminum and zinc soldering to die steel surfaces",
      "Provides thermal insulation reducing thermal fatigue on die surfaces",
      "Ultra-thin film application maintains tight dimensional casting tolerances",
      "Reduces die maintenance frequency and extends expensive tooling life",
      "Available in aqueous and solvent-based formulations for different process needs",
    ],
    use: "Applied in aluminum die casting, zinc alloy die casting, gravity casting, and hot press forming operations across automotive and hardware manufacturing.",
  },
];

// ─── Adhesives ────────────────────────────────────────────────────────────────
export const adhesiveProducts = [
  {
    slug: "rubber-to-metal-adhesive",
    title: "Rubber-to-Metal Adhesive",
    shortTitle: "Rubber to Metal",
    tag: "Structural Bond",
    summary:
      "High-strength vulcanization bonding agent for dynamic shock and vibration applications.",
    metaTitle:
      "Rubber-to-Metal Adhesive | Industrial Bonding | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty Rubber-to-Metal Adhesives deliver >16 MPa bond strength for engine mounts, suspension bushings, anti-vibration mounts, and industrial bonded assemblies.",
    specs: {
      "Bond Strength": "> 16 MPa (100% Rubber Tear)",
      "Service Temperature": "-40°C to +150°C continuous",
      "Environmental Resistance": "Salt spray, fuels, transmission oil, glycols",
      "System Configuration": "Dual-coat (Primer + Covercoat) & Single-coat options",
      "Key Characteristic": "Withstands extreme dynamic fatigue and shear",
    },
    intro:
      "Chemtech Rubber-to-Metal Bonding Agents establish indestructible, chemically crosslinked bonds between elastomeric compounds and treated metal substrates during the molding and vulcanization process.",
    points: [
      "Delivers rubber-tearing failure strength exceeding 16 MPa under peel and shear",
      "Exceptional fatigue resistance in dynamic, high-vibration applications",
      "Robust chemical resistance against road salt, motor oils, fuels, and hydraulic fluids",
      "Available in high-performance primer and covercoat configurations",
      "Compatible with mild steel, stainless steel, aluminum, brass, and engineered plastics",
    ],
    use: "Critical in automotive engine mounts, suspension bushings, anti-vibration industrial mounts, railway suspension pads, and oilfield packers.",
  },
  {
    slug: "metal-to-metal-adhesive",
    title: "Metal-to-Metal Structural Adhesive",
    shortTitle: "Metal to Metal",
    tag: "Structural Engineering",
    summary:
      "High-tensile structural adhesives replacing mechanical fasteners and spot welds.",
    metaTitle:
      "Metal-to-Metal Structural Adhesive | Chemtech Specialty",
    metaDescription:
      "Metal-to-Metal Structural Adhesives from Chemtech Specialty deliver >22 MPa lap shear strength to replace welds and bolts in structural assemblies, trailers, HVAC, and precision machinery.",
    specs: {
      "Tensile Lap Shear": "> 22 MPa (ASTM D1002)",
      "Gap Filling": "Up to 2.0 mm with thixotropic viscosity",
      "Corrosion Barrier": "Passivates joint interface against galvanic corrosion",
      "Thermal Endurance": "-50°C to +180°C operating window",
      "Key Characteristic": "Distributes stress uniformly across bonded assemblies",
    },
    intro:
      "Structural metal-to-metal bonding adhesives distribute mechanical stress uniformly across joint interfaces, eliminating the stress concentration and corrosion vulnerability inherent in welds, rivets, and bolts.",
    points: [
      "High tensile, shear, and peel resistance in heavy mechanical assemblies",
      "Complete seal against moisture, preventing galvanic corrosion between dissimilar metals",
      "High vibration dampening properties improving structural acoustics",
      "Thixotropic formulation enables gap-filling capability across imperfect joint fit-up",
      "Reduces component weight by replacing heavy mechanical fasteners",
    ],
    use: "Used across heavy structural engineering, commercial trailer manufacture, electrical enclosures, HVAC machinery, and precision machine assemblies.",
  },
  {
    slug: "friction-material-adhesive",
    title: "Friction Material Adhesive",
    shortTitle: "Friction Adhesive",
    tag: "Braking Systems",
    summary:
      "High-temperature thermoset adhesive engineered for automotive and rail brake pad bonding.",
    metaTitle:
      "Friction Material Adhesive | Brake Pad Bonding | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty Friction Material Adhesives withstand up to 380°C for reliable brake pad and brake shoe bonding in automotive, commercial vehicles, and rail transit applications.",
    specs: {
      "Thermal Peak Resistance": "Up to 380°C under severe braking friction",
      "Shear Adhesion": "Complies with ISO and SAE automotive brake standards",
      "Impact Resistance": "Extreme resistance to sudden thermal shock loads",
      "Cure Type": "Heat-activated thermosetting crosslink",
      "Key Characteristic": "Zero adhesive degradation under sustained friction",
    },
    intro:
      "Specialized friction material bonding adhesives formulated to withstand extreme shear loads, mechanical shock, and scorching temperatures generated during commercial vehicle and train braking cycles.",
    points: [
      "Sustained shear integrity at peak brake operating temperatures up to 380°C",
      "High impact and shock resistance under aggressive emergency braking forces",
      "Uniform coating coverage ensures consistent pad bond across product service life",
      "Fully compliant with stringent OEM and aftermarket braking safety specifications",
      "Formulated for clean application via roller coating, dipping, or spraying",
    ],
    use: "Applied in passenger car brake pads, heavy commercial vehicle brake shoes, rail transit friction pads, and industrial crane clutch assemblies.",
  },
];

// ─── Coatings ─────────────────────────────────────────────────────────────────
export const coatingProducts = [
  {
    slug: "anti-corrosion-coating",
    title: "Anti-Corrosion Coating",
    shortTitle: "Anti-Corrosion",
    tag: "Corrosion Protection",
    summary:
      "Heavy-duty barrier coating providing superior salt spray and chemical corrosion protection.",
    metaTitle:
      "Anti-Corrosion Coating for Industrial Metals | Chemtech Specialty",
    metaDescription:
      "Anti-Corrosion Coatings from Chemtech Specialty provide >1200-hour salt spray resistance for structural steel, offshore hardware, industrial valves, and automotive chassis components.",
    specs: {
      "Salt Spray Resistance": "> 1,200 hours (ASTM B117 pass)",
      "Film Formation": "Dense, pore-free passivating barrier",
      Substrates: "Carbon steel, ductile iron, cast aluminum",
      "Application Methods": "Airless spray, dipping, electrostatic, brushing",
      "Key Characteristic": "Zero blister formation under harsh marine humidity",
    },
    intro:
      "Chemtech Anti-Corrosion Coatings deliver an impenetrable physical and chemical barrier between metal surfaces and aggressive environmental factors such as salt fog, coastal humidity, acid fumes, and industrial effluents.",
    points: [
      "Unrivaled resistance exceeding 1,200+ hours in ASTM B117 salt spray testing",
      "Extends component service life in outdoor, marine, and chemical plant environments",
      "Excellent mechanical adhesion prevents peeling and undercut rusting",
      "Passivates metal substrate, protecting against oxidation and pitting",
      "Available as high-build primers, intermediate barriers, and single-coat systems",
    ],
    use: "Deployed on structural steel frames, coastal infrastructure, offshore drilling hardware, industrial valves, and automotive chassis parts.",
  },
  {
    slug: "heat-resistant-coating",
    title: "Heat Resistant Coating",
    shortTitle: "Heat Resistant",
    tag: "Thermal Stability",
    summary:
      "Ceramic-reinforced protective coating maintaining integrity under continuous high temperatures.",
    metaTitle:
      "Heat Resistant Industrial Coating up to 650°C | Chemtech Specialty",
    metaDescription:
      "Heat Resistant Coatings from Chemtech Specialty withstand continuous temperatures up to 650°C for exhaust systems, furnaces, boilers, heat exchangers, and high-temperature industrial equipment.",
    specs: {
      "Operating Temperature": "Continuous up to 650°C (1200°F)",
      Chemistry: "Silicone ceramic crosslinked matrix",
      "Thermal Cycling": "Zero flaking under rapid thermal quench",
      "Oxidation Defense": "Prevents metal scaling and decarburization",
      "Key Characteristic": "Low VOC outgassing during thermal ramp-up",
    },
    intro:
      "Heat resistant industrial coatings engineered with modified silicone-ceramic resins that withstand relentless thermal stress, preventing metal oxidation, scaling, and degradation at elevated temperatures.",
    points: [
      "Stable structural integrity at continuous service temperatures up to 650°C",
      "Stops thermal oxidation, scaling, and metal degradation on furnace steels",
      "Thermal shock resistant — survives rapid cycling between hot and cold states",
      "Ceramic-reinforced binder provides resistance against surface abrasion",
      "Virtually zero VOC smoke or outgassing during initial thermal cure-in",
    ],
    use: "Standard for industrial exhaust systems, heat exchangers, boiler housings, furnace muffles, piping manifolds, and high-temp engine hardware.",
  },
  {
    slug: "surface-protection-coating",
    title: "Surface Protection Coating",
    shortTitle: "Surface Protection",
    tag: "Wear Resistance",
    summary:
      "Ultra-hard surface treatment engineered to resist abrasion, scratching, and chemical wear.",
    metaTitle:
      "Surface Protection Coating | Abrasion & Wear Resistance | Chemtech Specialty",
    metaDescription:
      "Surface Protection Coatings from Chemtech Specialty offer Shore D 85+ hardness and high Taber abrasion resistance for tooling dies, machine shafts, guide rails, and precision components.",
    specs: {
      "Hardness Rating": "Shore D 85+ / Pencil Hardness 4H+",
      "Wear Resistance": "High Taber abrasion resistance index",
      "Chemical Defense": "Resistant to oils, hydraulic fluids, and industrial solvents",
      "Friction Coefficient": "Low surface friction finish",
      "Key Characteristic": "Preserves micro-tolerances of precision tooling",
    },
    intro:
      "Formulated to fortify machine components against abrasive wear, surface scratching, gouging, and aggressive chemical contact, preserving dimensional tolerances and pristine cosmetic appearance.",
    points: [
      "Exceptional surface hardness protecting precision machined tolerances",
      "Resists micro-abrasive wear from dust, slurry, and high-frequency friction",
      "Impermeable to cutting fluids, industrial solvents, grease, and lubricants",
      "Smooth low-friction surface finish reduces mechanical drag",
      "Long service life drastically reduces downtime for component resurfacing",
    ],
    use: "Applied to tooling dies, guide rails, instrumentation housings, rotating machine shafts, and mechanical wear plates.",
  },
];

// ─── Category registry ────────────────────────────────────────────────────────
export const categories = [
  {
    slug: "investment-casting-wax",
    key: "waxes",
    label: "Investment Casting Wax",
    shortLabel: "Waxes",
    number: "01",
    accent: "#3B82F6",
    accentMuted: "rgba(59,130,246,0.12)",
    metaTitle:
      "Investment Casting Wax Supplier in India | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty supplies filled, unfilled, water soluble, sticky, and repair investment casting waxes to foundries across India. Request technical data sheets or a trial sample.",
    description:
      "Precision investment casting waxes engineered for dimensional stability, low thermal shrinkage, and zero-ash burnout. Formulated for foundries producing critical aerospace, automotive, and industrial components.",
    products: waxProducts,
  },
  {
    slug: "release-agents",
    key: "release",
    label: "Release Agents",
    shortLabel: "Release",
    number: "02",
    accent: "#22D3EE",
    accentMuted: "rgba(34,211,238,0.12)",
    metaTitle:
      "Industrial Release Agents | Rubber, Composite & PU | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty Release Agents cover rubber molding, composite manufacturing, polyurethane foam, rubber-to-metal, and die casting applications. Request a sample or technical consultation.",
    description:
      "Semi-permanent and sacrificial mold release agents designed for clean demolding, superior surface finish, and extended tooling life across rubber molding, composite manufacturing, and polyurethane systems.",
    products: releaseProducts,
  },
  {
    slug: "adhesives",
    key: "adhesive",
    label: "Industrial Adhesives",
    shortLabel: "Adhesives",
    number: "03",
    accent: "#F59E0B",
    accentMuted: "rgba(245,158,11,0.12)",
    metaTitle:
      "Industrial Adhesives | Rubber-to-Metal, Structural & Friction | Chemtech Specialty",
    metaDescription:
      "High-performance industrial adhesives from Chemtech Specialty for rubber-to-metal bonding, structural metal joints, and friction material brake pad applications. Contact us for samples.",
    description:
      "High-performance structural adhesives and vulcanizing bonding agents delivering exceptional peel, shear, and fatigue resistance for rubber-to-metal assemblies, structural metal joints, and friction brake pads.",
    products: adhesiveProducts,
  },
  {
    slug: "coatings",
    key: "coating",
    label: "Protective Industrial Coatings",
    shortLabel: "Coatings",
    number: "04",
    accent: "#10B981",
    accentMuted: "rgba(16,185,129,0.12)",
    metaTitle:
      "Protective Industrial Coatings | Anti-Corrosion & Heat Resistant | Chemtech Specialty",
    metaDescription:
      "Chemtech Specialty provides anti-corrosion coatings, heat resistant coatings up to 650°C, and surface protection coatings for industrial metals, infrastructure, and manufacturing equipment.",
    description:
      "Protective metal surface treatments engineering robust barriers against severe atmospheric corrosion, high-temperature oxidation up to 650°C, and heavy mechanical abrasive wear.",
    products: coatingProducts,
  },
];

// Helper: find category by slug
export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

// Helper: find product by category slug and product slug
export function getProductBySlug(categorySlug, productSlug) {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return null;
  return cat.products.find((p) => p.slug === productSlug) || null;
}
