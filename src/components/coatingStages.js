// Content for the interactive protective coatings journey.
// Matches the product catalogue under /coatings.

export const STAGES = [
  {
    id: "prep",
    title: "Surface decontamination & abrasive blasting",
    short: "Surface Prep",
    summary:
      "Substrate metal is degreased and abrasive blasted to Near-White Metal (SSPC-SP 10 / NACE No. 2) with a uniform 50–75 µm anchor profile.",
    matters:
      "Eliminating mill scale, rust, and surface contaminants ensures maximum chemical crosslinking and prevents underfilm blistering.",
    materials: [
      {
        name: "Anti-Corrosion Coating",
        note: "Passivating single-coat or multi-layer barrier",
        link: "/coatings/anti-corrosion-coating",
      },
      {
        name: "Surface Protection Coating",
        note: "Preserves micro-tolerances of precision tooling",
        link: "/coatings/surface-protection-coating",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.45, 0],
        label: "Sa 2.5 Profile",
        text: "Near-white blast profile ensures deep mechanical keying for harsh service conditions.",
      },
    ],
  },
  {
    id: "primer",
    title: "Passivating anti-corrosion barrier",
    short: "Anti-Corrosion",
    summary:
      "High-solids passivating barrier primer is applied via airless spray, sealing substrate micro-crevices and passivating steel against oxidation.",
    matters:
      "Exceeds 1,200+ hours in ASTM B117 salt spray exposure without blister formation or undercut creep.",
    materials: [
      {
        name: "Anti-Corrosion Coating",
        note: ">1,200 hours ASTM B117 salt spray pass",
        link: "/coatings/anti-corrosion-coating",
      },
      {
        name: "Surface Protection Coating",
        note: "Impermeable to cutting fluids and industrial solvents",
        link: "/coatings/surface-protection-coating",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.85, 0],
        label: "Pore-free barrier",
        text: "Dense molecular barrier passivates substrate steel against aggressive atmospheric salt fog.",
      },
    ],
  },
  {
    id: "thermal",
    title: "High-temperature ceramic matrix",
    short: "Thermal Shield",
    summary:
      "Modified silicone-ceramic matrix is applied across thermal zones, engineered for continuous operation up to 650°C (1200°F).",
    matters:
      "Prevents metal decarburization, thermal oxidation scaling, and flaking under relentless thermal quenching cycles.",
    materials: [
      {
        name: "Heat Resistant Coating",
        note: "Continuous up to 650°C (1200°F)",
        link: "/coatings/heat-resistant-coating",
      },
    ],
    hotspots: [
      {
        pos: [0, 1.25, 0],
        label: "650°C Ceramic",
        text: "Silicone-ceramic crosslinks into a refractory shield surviving rapid thermal quenches.",
      },
    ],
  },
  {
    id: "armor",
    title: "Wear-resistant surface armor",
    short: "Hard Armor",
    summary:
      "Ultra-hard wear-resistant topcoat is cured, providing Shore D 85+ surface hardness and high Taber abrasion resistance.",
    matters:
      "Shields high-value valves, machine shafts, and tooling dies from abrasive slurries, gouging, and mechanical fretting.",
    materials: [
      {
        name: "Surface Protection Coating",
        note: "Shore D 85+ / Pencil Hardness 4H+",
        link: "/coatings/surface-protection-coating",
      },
      {
        name: "Heat Resistant Coating",
        note: "Low VOC outgassing during thermal cure",
        link: "/coatings/heat-resistant-coating",
      },
    ],
    hotspots: [
      {
        pos: [0, 1.55, 0],
        label: "Shore D 85+",
        text: "Impervious to abrasive wear, hydraulic oils, and high-frequency friction drag.",
      },
    ],
  },
  {
    id: "inspect",
    title: "Film thickness & holiday spark testing",
    short: "Validation",
    summary:
      "Finished component undergoes dry film thickness (DFT) verification, cross-hatch adhesion testing, and holiday porosity spark inspection.",
    matters:
      "Guarantees 100% pinhole-free coverage for long-term asset life in offshore, chemical plant, and furnace environments.",
    materials: [
      {
        name: "Anti-Corrosion Coating",
        note: "Pinhole-free passivating barrier",
        link: "/coatings/anti-corrosion-coating",
      },
      {
        name: "Heat Resistant Coating",
        note: "Zero flaking under rapid thermal quench",
        link: "/coatings/heat-resistant-coating",
      },
      {
        name: "Surface Protection Coating",
        note: "High Taber abrasion resistance index",
        link: "/coatings/surface-protection-coating",
      },
    ],
    hotspots: [
      {
        pos: [0, 1.85, 0],
        label: "Certified Pass",
        text: "Pinhole-free verification ensures decade-long asset defense in aggressive environments.",
      },
    ],
  },
];

export const TRUST_POINTS = [
  {
    title: ">1,200 Hr salt spray defense",
    body: "Surpasses 1,200+ hours in ASTM B117 salt fog testing without blister formation or undercut rusting.",
  },
  {
    title: "650°C continuous thermal ceiling",
    body: "Silicone-ceramic matrix resists thermal oxidation, metal scaling, and flaking under extreme heat.",
  },
  {
    title: "Shore D 85+ wear armor",
    body: "Engineered surface treatments resist abrasive slurry wear, scratching, and aggressive chemicals.",
  },
];
