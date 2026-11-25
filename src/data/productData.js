/**
 * productData.js
 * Central data source for all Chemtech Specialty products.
 * Used by /products page, category pages, and individual product pages.
 */

// ─── Investment Casting Waxes ─────────────────────────────────────────────────
const waxProducts = [
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
      "Filled investment casting wax, 68–74°C melting point, under 0.8% shrinkage. Rigid, stable patterns for automotive and aerospace castings. Request a quote.",
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
      "Unfilled investment casting wax with under 0.008% ash and a mirror-smooth finish for thin-wall, intricate castings. Request samples and data sheets.",
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
      "Water Soluble Casting Wax for Cores | Chemtech Specialty",
    metaDescription:
      "Water soluble wax for internal cores in investment casting. Dissolves in warm water in 15–25 minutes, residue-free. Request a sample or quote.",
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
      "Sticky Wax for Pattern Assembly | Chemtech Specialty",
    metaDescription:
      "Sticky wax for investment casting pattern trees, runners and gates. Sets in 3–6 seconds with a rigid joint and clean meltout. Request a quote.",
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
      "Repair Wax for Investment Casting | Chemtech Specialty",
    metaDescription:
      "Workable repair wax that corrects knit lines, sink marks and handling damage on wax patterns and blends invisibly before shell dipping. Request a sample.",
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
  {
    slug: "wax-pattern-cleaner-activator",
    title: "Wax Pattern Cleaner & Activator",
    shortTitle: "Pattern Cleaner & Activator",
    tag: "Surface Preparation",
    summary:
      "Precision surface preparation agent for investment casting wax patterns — cleans, conditions, and activates for uniform, defect-free primary ceramic shell adhesion.",
    metaTitle:
      "Wax Pattern Cleaner & Activator | Chemtech Specialty",
    metaDescription:
      "Wax pattern cleaner that removes release residue and activates the surface for uniform slurry wetting and fewer ceramic shell defects. Request a quote.",
    specs: {
      "Application Method": "Gentle wipe or controlled immersion",
      "Drying Time": "Fast-evaporating; residue-free surface",
      "Substrate Compatibility": "All standard filled and unfilled pattern waxes",
      "Surface Effect": "Micro-etched, activated surface for slurry wetting",
      "Key Characteristic": "Uniform primary coat adhesion, reduced shell defects",
    },
    intro:
      "Chemtech Wax Pattern Cleaner & Activator is a precision surface preparation agent formulated for use immediately before primary ceramic slurry dipping. It removes mold release residues, airborne contaminants, and handling oils from wax pattern surfaces, then conditions the surface to promote controlled wetting and uniform slurry adhesion. The result is a more consistent primary coating layer and a measurable reduction in coating-related shell defects.",
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
  {
    slug: "nano-polymer-additive-ceramic-slurry",
    title: "Nano Polymer Additive for Ceramic Slurry",
    shortTitle: "Nano Polymer Additive",
    tag: "Slurry Enhancement",
    summary:
      "Advanced nano polymer additive for ceramic slurry systems — improves shell strength, promotes faster and more uniform drying, and enhances mould permeability for consistent casting quality.",
    metaTitle:
      "Nano Polymer Additive for Ceramic Slurry | Chemtech Specialty",
    metaDescription:
      "Nano polymer additive for investment casting slurry: stronger shells, faster uniform drying, better permeability and less cracking. Request a data sheet.",
    specs: {
      "Additive Type": "Nano polymer dispersion for aqueous slurry systems",
      "Dosage Form": "Liquid additive; compatible with standard slurry mixing",
      "Shell Property": "Improved MOR and reduced cracking tendency",
      "Drying Behavior": "Faster and more uniform shell layer drying",
      "Key Characteristic": "Enhanced permeability and process consistency",
    },
    intro:
      "Chemtech Nano Polymer Additive for Ceramic Slurry is an engineered process additive designed to optimize the performance of ceramic shell systems in investment casting. Incorporating nano-scale polymer particles into the slurry matrix promotes more uniform shell formation, accelerates interlayer drying, and improves the mechanical integrity and permeability of the fired ceramic mould. The outcome is greater process consistency, reduced shell cracking, and a more predictable casting environment.",
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
];

// ─── Release Agents ───────────────────────────────────────────────────────────
const releaseProducts = [
  {
    slug: "rubber-release-agent",
    title: "Rubber Release Agent",
    shortTitle: "Rubber Release",
    tag: "Mold Longevity",
    summary:
      "Semi-permanent non-stick release barrier ensuring clean demolding and extended mold life.",
    metaTitle:
      "Rubber Mold Release Agent | Chemtech Specialty",
    metaDescription:
      "Semi-permanent rubber mold release agent, up to 230°C, for O-rings, seals and gaskets. Multiple releases per coat, less mold fouling. Request a quote.",
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
      "Composite Release Agent, Carbon & Epoxy | Chemtech Specialty",
    metaDescription:
      "Silicone-free composite release agent for carbon fibre, epoxy and prepreg. Autoclave safe to 260°C with a Class-A finish. Request a sample or quote.",
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
      "Polyurethane (PU) Release Agent | Chemtech Specialty",
    metaDescription:
      "PU release agent for flexible foam, rigid insulation, RIM and cast elastomers. Fewer pinholes, short cycles, low residue. Request a sample or quote.",
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
      "Selective release agent for bonded rubber-metal molding. Releases parting surfaces without reducing bond strength, up to 200°C. Request a quote.",
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
      "Die Casting Release Agent | Chemtech Specialty",
    metaDescription:
      "Metal-to-metal release agent for aluminium and zinc die casting and press forming, up to 650°C. Prevents soldering and die erosion. Request a quote.",
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
const adhesiveProducts = [
  {
    slug: "rubber-to-metal-adhesive",
    title: "Rubber-to-Metal Adhesive",
    shortTitle: "Rubber to Metal",
    tag: "Structural Bond",
    summary:
      "High-strength vulcanization bonding agent for dynamic shock and vibration applications.",
    metaTitle:
      "Rubber-to-Metal Bonding Adhesive | Chemtech Specialty",
    metaDescription:
      "Rubber-to-metal bonding adhesive, over 16 MPa with 100% rubber tear, for engine mounts, bushings and anti-vibration mounts. Request a quote.",
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
      "Structural metal adhesive with over 22 MPa lap shear (ASTM D1002) and 2 mm gap fill. An alternative to welds, rivets and bolts. Request a quote.",
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
      "Friction Material & Brake Adhesive | Chemtech Specialty",
    metaDescription:
      "Thermosetting friction material adhesive for brake pads, shoes and clutches. Holds shear strength up to 380°C. Request a sample or data sheet.",
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
const coatingProducts = [
  {
    slug: "anti-corrosion-coating",
    title: "Anti-Corrosion Coating",
    shortTitle: "Anti-Corrosion",
    tag: "Corrosion Protection",
    summary:
      "Heavy-duty barrier coating providing superior salt spray and chemical corrosion protection.",
    metaTitle:
      "Anti-Corrosion Metal Coating | Chemtech Specialty",
    metaDescription:
      "Anti-corrosion coating with over 1,200 hours salt spray resistance (ASTM B117) for structural steel, valves and chassis parts. Request a quote.",
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
      "Heat Resistant Coating up to 650°C | Chemtech Specialty",
    metaDescription:
      "Silicone-ceramic heat resistant coating for continuous 650°C service on exhausts, furnaces, boilers and heat exchangers. Request a quote.",
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
      "Wear Resistant Surface Coating | Chemtech Specialty",
    metaDescription:
      "Wear and abrasion resistant surface coating, Shore D 85+ / 4H+, for tooling dies, shafts, guide rails and wear plates. Request a quote.",
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

// ─── Custom formulation services (no product pages of their own) ──────────────
const customProducts = [
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
    metaTitle:
      "Investment Casting Wax Manufacturer India | Chemtech Specialty",
    metaDescription:
      "Filled, unfilled, water soluble, sticky and repair waxes for investment casting foundries. Made in Nashik, supplied across India. Request a TDS or trial sample.",
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
    metaTitle:
      "Industrial Mold Release Agents India | Chemtech Specialty",
    metaDescription:
      "Mold release agents for rubber, composite, polyurethane, bonded rubber-metal and die casting. Clean demolding and longer tool life. Request a sample.",
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
    metaTitle:
      "Industrial Bonding Adhesives India | Chemtech Specialty",
    metaDescription:
      "Industrial adhesives for rubber-to-metal bonding, structural metal joints and brake friction materials. Made for high shear and fatigue. Request samples.",
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
    metaTitle:
      "Protective Metal Coatings India | Chemtech Specialty",
    metaDescription:
      "Anti-corrosion, heat resistant (to 650°C) and wear resistant coatings for industrial metals and equipment. Made in Nashik, India. Request a quote.",
    description:
      "Protective metal surface treatments engineering robust barriers against severe atmospheric corrosion, high-temperature oxidation up to 650°C, and heavy mechanical abrasive wear.",
    products: coatingProducts,
  },
];

export const customCategory = {
  key: "custom",
  label: "Custom Formulations",
  shortLabel: "Custom",
  number: "05",
  accent: "#A78BFA",
  description:
    "Bespoke chemical R&D and tailored formulations for challenging industrial applications requiring specialized viscosity, cure kinetics, extreme temperature resistance, or regulatory compliance.",
  products: customProducts,
};

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
