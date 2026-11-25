// Content for the interactive structural bonding journey.
// Matches the product catalogue under /adhesives.

export const STAGES = [
  {
    id: "prep",
    title: "Substrate degreasing & grit blasting",
    short: "Surface Prep",
    summary:
      "Metal inserts (steel, aluminum, ductile iron) undergo solvent degreasing and angular grit blasting to create a chemically active surface profile.",
    matters:
      "Proper surface roughness (Ra 3.5–5.0 µm) creates mechanical keying essential for bonding agents to achieve >16 MPa tensile lap shear strength.",
    materials: [
      {
        name: "Rubber-to-Metal Adhesive",
        note: "Dual-coat primer + covercoat system",
        link: "/adhesives/rubber-to-metal-adhesive",
      },
      {
        name: "Metal-to-Metal Structural Adhesive",
        note: "Passivates joint interface against corrosion",
        link: "/adhesives/metal-to-metal-adhesive",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.45, 0],
        label: "Anchor profile",
        text: "Angular grit blasting creates microscopic mechanical anchor points across the steel substrate.",
      },
    ],
  },
  {
    id: "primer",
    title: "Passivating primer coat",
    short: "Primer Coat",
    summary:
      "A passivating primer is applied to the bare metal, forming a robust organosilane/phenolic bond to the metal oxide lattice.",
    matters:
      "The primer seals the metal against moisture underfilm corrosion and creates an unbreakable chemical anchor for the adhesive covercoat.",
    materials: [
      {
        name: "Rubber-to-Metal Adhesive",
        note: "Withstands salt spray, fuels, transmission oils",
        link: "/adhesives/rubber-to-metal-adhesive",
      },
      {
        name: "Friction Material Adhesive",
        note: "Heat-activated thermosetting crosslink",
        link: "/adhesives/friction-material-adhesive",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.7, 0],
        label: "Passivating barrier",
        text: "Arrests galvanic oxidation and anchors chemically to the underlying metal lattice.",
      },
    ],
  },
  {
    id: "covercoat",
    title: "Bonding covercoat application",
    short: "Covercoat",
    summary:
      "The active polymer covercoat is sprayed onto primed components, readying the interface for dynamic vulcanization bonding.",
    matters:
      "The covercoat co-crosslinks simultaneously with the elastomer matrix during mold press cycles, bridging elastomeric polymers with metal.",
    materials: [
      {
        name: "Rubber-to-Metal Adhesive",
        note: "Withstands dynamic fatigue and shock",
        link: "/adhesives/rubber-to-metal-adhesive",
      },
      {
        name: "Metal-to-Metal Structural Adhesive",
        note: "Gap-filling thixotropic viscosity up to 2.0 mm",
        link: "/adhesives/metal-to-metal-adhesive",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.9, 0],
        label: "Crosslink interface",
        text: "Reactive polymers co-vulcanize with rubber compound during the mold cycle.",
      },
    ],
  },
  {
    id: "vulcanize",
    title: "High-pressure vulcanization",
    short: "Vulcanize",
    summary:
      "Elastomer compound is molded over the prepared metal at 150°C–180°C under high hydraulic pressure, creating unbreakable covalent bonds.",
    matters:
      "Bond strength exceeds the cohesive tensile strength of the elastomer itself, guaranteeing 100% rubber-tear failure under extreme shear.",
    materials: [
      {
        name: "Rubber-to-Metal Adhesive",
        note: ">16 MPa bond strength (100% rubber tear)",
        link: "/adhesives/rubber-to-metal-adhesive",
      },
      {
        name: "Friction Material Adhesive",
        note: "Peak thermal resistance up to 380°C",
        link: "/adhesives/friction-material-adhesive",
      },
    ],
    hotspots: [
      {
        pos: [0, 1.35, 0],
        label: "Covalent fusion",
        text: "Extreme pressure and heat fuse rubber and metal into an indestructible bonded assembly.",
      },
    ],
  },
  {
    id: "test",
    title: "Dynamic shear & fatigue testing",
    short: "Validation",
    summary:
      "The bonded anti-vibration mount undergoes severe cyclic shear, tensile peel, and environmental fluid testing.",
    matters:
      "Withstands millions of dynamic cycles in automotive engine mounts, rail bogies, and suspension bushings without debonding.",
    materials: [
      {
        name: "Rubber-to-Metal Adhesive",
        note: "Continuous service -40°C to +150°C",
        link: "/adhesives/rubber-to-metal-adhesive",
      },
      {
        name: "Metal-to-Metal Structural Adhesive",
        note: "Lap shear >22 MPa (ASTM D1002 pass)",
        link: "/adhesives/metal-to-metal-adhesive",
      },
    ],
    hotspots: [
      {
        pos: [0, 1.75, 0],
        label: "100% Rubber tear",
        text: "Under destructive load testing, rubber tears before the Chemtech adhesive joint separates.",
      },
    ],
  },
];

export const TRUST_POINTS = [
  {
    title: "Rubber-tearing bond strength",
    body: "Delivers >16 MPa bond strength with 100% rubber tear failure across dynamic vibration mounts.",
  },
  {
    title: "Extreme environmental defense",
    body: "Resists continuous immersion in road salts, motor oils, transmission fluids, and glycols.",
  },
  {
    title: "Wide thermal operating window",
    body: "Maintains joint integrity from sub-zero conditions (-50°C) up to 380°C peak braking friction.",
  },
];
