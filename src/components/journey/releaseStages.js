// Content for the interactive mold release journey.
// Matches the product catalogue under /release-agents.

export const STAGES = [
  {
    id: "prep",
    title: "Tool & mold preparation",
    short: "Tool Prep",
    summary:
      "Tooling steel is cleaned, degreased, and brought to operating temperature before applying release chemistry.",
    matters:
      "A pristine tool steel surface allows semi-permanent release chemistry to anchor chemically, preventing micro-pinholes or premature flaking under high press pressure.",
    materials: [
      {
        name: "Rubber Release Agent",
        note: "Thermal stability for hot steel tooling",
        link: "/release-agents/rubber-release-agent",
      },
      {
        name: "Metal-to-Metal Release Agent",
        note: "Protects die steel from soldering",
        link: "/release-agents/metal-to-metal-release",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.45, 0],
        label: "Tool surface",
        text: "Pristine tool steel is required for uniform chemical bonding of the release barrier.",
      },
    ],
  },
  {
    id: "barrier",
    title: "Release barrier application",
    short: "Barrier Film",
    summary:
      "An ultra-thin, semi-permanent non-stick film is applied across complex cavity contours via fine spray or lint-free wipe.",
    matters:
      "A uniform sub-micron release barrier eliminates parting line build-up while ensuring multiple consecutive releases per coat without silicone transfer.",
    materials: [
      {
        name: "Rubber Release Agent",
        note: "Semi-permanent non-stick barrier",
        link: "/release-agents/rubber-release-agent",
      },
      {
        name: "Composite Release Agent",
        note: "Class-A finish for epoxy & carbon fiber",
        link: "/release-agents/composite-release-agent",
      },
      {
        name: "Polyurethane Release Agent",
        note: "Reduces pinholing in flexible & rigid PU",
        link: "/release-agents/polyurethane-release-agent",
      },
    ],
    hotspots: [
      {
        pos: [0.85, 0.6, 0.6],
        label: "Micro-barrier",
        text: "Sub-micron coating crosslinks into a resilient, non-transferring release shield.",
      },
    ],
  },
  {
    id: "loading",
    title: "Compound charge & loading",
    short: "Charge",
    summary:
      "Raw elastomer preform, polyurethane reaction mixture, or composite prepreg is positioned into the treated mold cavity.",
    matters:
      "Selective release chemistry resists displacement under heavy resin wash and high mechanical shear during cavity filling.",
    materials: [
      {
        name: "Rubber-to-Metal Release Agent",
        note: "Selective parting line release",
        link: "/release-agents/rubber-to-metal-release",
      },
      {
        name: "Polyurethane Release Agent",
        note: "Fast cycle RIM compatibility",
        link: "/release-agents/polyurethane-release-agent",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.95, 0],
        label: "Cavity fill",
        text: "The barrier film stays anchored even under aggressive material injection velocities.",
      },
    ],
  },
  {
    id: "cure",
    title: "Thermal cure & vulcanization",
    short: "Vulcanize",
    summary:
      "The press clamps shut under hydraulic pressure and elevated temperatures (up to 230°C) to crosslink the elastomeric compound.",
    matters:
      "High thermal stability prevents smoke, toxic outgassing, and carbonaceous foul buildup, protecting expensive tooling dies shift after shift.",
    materials: [
      {
        name: "Rubber Release Agent",
        note: "Operational up to 230°C continuous",
        link: "/release-agents/rubber-release-agent",
      },
      {
        name: "Composite Release Agent",
        note: "Autoclave safe up to 260°C",
        link: "/release-agents/composite-release-agent",
      },
    ],
    hotspots: [
      {
        pos: [0, 1.35, 0],
        label: "Thermal cure",
        text: "Resists breakdown and mold fouling at sustained high vulcanization temperatures.",
      },
    ],
  },
  {
    id: "demold",
    title: "Clean part separation & demold",
    short: "Demold",
    summary:
      "Tooling opens and the cured part separates effortlessly with zero surface tears, knit defects, or silicone contamination.",
    matters:
      "Clean demolding eliminates secondary degreasing and sanding, permitting immediate structural bonding, coating, or assembly.",
    materials: [
      {
        name: "Rubber Release Agent",
        note: "Zero part tears or knit defects",
        link: "/release-agents/rubber-release-agent",
      },
      {
        name: "Polyurethane Release Agent",
        note: "Void-free surface finish",
        link: "/release-agents/polyurethane-release-agent",
      },
    ],
    hotspots: [
      {
        pos: [0, 1.85, 0],
        label: "Clean release",
        text: "Part separates effortlessly without flash tears or adhesive pull.",
      },
    ],
  },
  {
    id: "repeat",
    title: "Multi-cycle tool longevity",
    short: "Multi-Cycle",
    summary:
      "The semi-permanent release barrier remains anchored to the tool steel, enabling multiple consecutive demold cycles.",
    matters:
      "Foundries and molders slash downtime, extend tooling life by years, and minimize per-shift chemical consumption.",
    materials: [
      {
        name: "Rubber Release Agent",
        note: "Multiple releases per single coat",
        link: "/release-agents/rubber-release-agent",
      },
      {
        name: "Metal-to-Metal Release Agent",
        note: "Prevents die erosion & soldering",
        link: "/release-agents/metal-to-metal-release",
      },
    ],
    hotspots: [
      {
        pos: [0, 0.45, 0],
        label: "Tool longevity",
        text: "Tools run longer between maintenance clean-downs, maximizing press productivity.",
      },
    ],
  },
];

export const TRUST_POINTS = [
  {
    title: "Zero silicone contamination",
    body: "Non-migrating formulations ensure clean parts ready for post-cure bonding, painting, or coating.",
  },
  {
    title: "Extended tooling lifespan",
    body: "Semi-permanent barriers prevent mold foul, resin attack, and metal soldering on precision dies.",
  },
  {
    title: "Multi-release efficiency",
    body: "Engineered to deliver multiple clean releases per application, reducing cycle times and waste.",
  },
];
