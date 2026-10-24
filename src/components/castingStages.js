// Content for the interactive casting journey.
// Product names match the catalogue on the Products page. Copy about Chemtech only
// restates what the site already says; the rest describes the casting process itself.
export const STAGES = [
  {
    id: "pattern",
    title: "Wax pattern",
    short: "Pattern",
    summary: "Molten wax is injected into a precision die and cools into an exact copy of the finished part.",
    matters:
      "Every dimension of the metal part is inherited from this wax. Fine detail, surface finish and stability are decided here, before anything is cast.",
    materials: [
      { name: "Unfilled Wax", note: "Fine detail and excellent mold filling", link: "/investment-casting-wax/unfilled-wax" },
      { name: "Filled Wax", note: "Rigidity for complex, thin sections", link: "/investment-casting-wax/filled-wax" },
      { name: "Water Soluble Wax", note: "Cores for internal channels", link: "/investment-casting-wax/water-soluble-wax" },
    ],
    hotspots: [{ pos: [1.25, 0.45, 0.6], label: "Thin blades", text: "Thin, curved sections only come out right if the wax fills the die completely." }],
  },
  {
    id: "assembly",
    title: "Finish and assemble",
    short: "Assemble",
    summary: "Surface marks are repaired, then the pattern is joined to a wax sprue that will become the pouring channel.",
    matters:
      "A clean surface and a solid joint keep defects from being copied into the metal. Sprues also carry several patterns on one tree in production.",
    materials: [
      { name: "Repair Wax", note: "Corrects knit lines and handling marks", link: "/investment-casting-wax/repair-wax" },
      { name: "Sticky Wax", note: "Fast-setting joints for pattern trees", link: "/investment-casting-wax/sticky-wax" },
      { name: "Wax Pattern Cleaner & Activator", note: "Removes release residues; activates surface for slurry", link: "/investment-casting-wax/wax-pattern-cleaner-activator" },
    ],
    hotspots: [
      { pos: [0, 1.55, 0], label: "Sprue joint", text: "Sticky wax bonds the pattern to the sprue." },
      { pos: [-1.1, 0.3, -0.6], label: "Surface repair", text: "Repair wax blends into the base wax, so touch-ups don't show in the casting." },
    ],
  },
  {
    id: "shell",
    title: "Ceramic shell",
    short: "Shell",
    summary: "The assembly is dipped in ceramic slurry and coated with fine sand, layer after layer, until a strong shell forms.",
    matters:
      "The pattern is handled and dipped repeatedly. If it flexes or deforms, the cavity inside the shell is wrong for good.",
    materials: [
      { name: "Filled Wax", note: "Resists deformation during handling", link: "/investment-casting-wax/filled-wax" },
      { name: "Wax Pattern Cleaner & Activator", note: "Uniform primary coat adhesion before first dip", link: "/investment-casting-wax/wax-pattern-cleaner-activator" },
      { name: "Nano Polymer Additive for Ceramic Slurry", note: "Improves shell strength, drying and permeability", link: "/investment-casting-wax/nano-polymer-additive-ceramic-slurry" },
    ],
    hotspots: [{ pos: [1.5, 0.55, -0.4], label: "Shell layers", text: "Each dip adds a layer. The shell copies the wax surface, so wax finish carries through." }],
  },
  {
    id: "dewax",
    title: "Dewax",
    short: "Dewax",
    summary: "The shell is heated, the wax melts and drains out, and a hollow ceramic mold is left behind. The view is cut away.",
    matters:
      "Wax has to leave completely and cleanly. Residue or expansion problems show up later as casting defects.",
    materials: [{ name: "Water Soluble Wax", note: "Cores dissolve rapidly without residue", link: "/investment-casting-wax/water-soluble-wax" }],
    hotspots: [{ pos: [0, 0.75, 0.9], label: "Empty cavity", text: "The space the wax occupied is now the exact shape of the part." }],
  },
  {
    id: "pour",
    title: "Metal pour",
    short: "Pour",
    summary: "Molten metal runs down the sprue and fills the cavity, taking the exact shape the wax once had.",
    matters:
      "The cavity is only as accurate as the wax pattern that made it. This is where earlier consistency pays off or costs you.",
    materials: [],
    hotspots: [{ pos: [0.9, 2.5, 0], label: "Pouring cup", text: "Metal enters here and flows down through the sprue." }],
  },
  {
    id: "finish",
    title: "Finish and inspect",
    short: "Inspect",
    summary: "The shell is knocked away, the sprue is cut off, and the finished part is cleaned and inspected.",
    matters:
      "Repeatable wax means repeatable castings. Automotive, aerospace and precision engineering customers rely on that batch after batch.",
    materials: [],
    hotspots: [{ pos: [1.2, 0.5, 0.5], label: "Finished part", text: "Same geometry as the wax pattern, now in metal." }],
  },
];

export const TRUST_POINTS = [
  { title: "Consistency you can plan around", body: "Each product is developed with strict attention to consistency, reliability and performance." },
  { title: "Formulated for your process", body: "Materials are developed or selected to match your operating conditions, not a generic spec." },
  { title: "Support after delivery", body: "We stay engaged after delivery, resolving process issues as your needs evolve." },
];
