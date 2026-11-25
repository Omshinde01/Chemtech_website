import { lazy } from "react";
import * as casting from "./castingStages";
import * as release from "./releaseStages";
import * as adhesive from "./adhesiveStages";
import * as coating from "./coatingStages";

// Keyed by category slug. three.js only downloads when a Scene actually renders.
export const JOURNEYS = {
  "investment-casting-wax": {
    ...casting,
    Scene: lazy(() => import("./CastingScene")),
    accent: "#60A5FA", bg: "#0B1C2C", glow: "#17385a",
    title: "See how a precision casting is made",
    intro: "Follow one turbine wheel through lost-wax investment casting. Drag the model to look around, or step through each stage to see where wax quality decides the result.",
    model: "a casting",
    explore: "Explore waxes",
  },
  "release-agents": {
    ...release,
    Scene: lazy(() => import("./ReleaseScene")),
    accent: "#22D3EE", bg: "#071724", glow: "#113149",
    title: "See how precision mold release works",
    intro: "Follow a precision elastomeric seal through tool preparation, barrier coating, and clean demolding. Drag the 3D tooling to inspect cavity contours, or step through each stage to see how release chemistry safeguards tooling and part quality.",
    model: "mold tooling and a demolded part",
    explore: "Explore release agents",
  },
  adhesives: {
    ...adhesive,
    Scene: lazy(() => import("./AdhesiveScene")),
    accent: "#FBBF24", bg: "#150f05", glow: "#2d1e08",
    title: "See how structural rubber-to-metal bonding is achieved",
    intro: "Follow a dynamic anti-vibration mount through substrate preparation, primer coating, covercoat deposition, and high-pressure vulcanization. Drag the 3D assembly to inspect the bond line, or step through each stage to see how Chemtech adhesives deliver rubber-tearing joint strength (>16 MPa).",
    model: "a rubber-to-metal bonded assembly",
    explore: "Explore adhesives",
  },
  coatings: {
    ...coating,
    Scene: lazy(() => import("./CoatingScene")),
    accent: "#34D399", bg: "#051812", glow: "#0e382b",
    title: "See how industrial protective coatings defend critical metal",
    intro: "Follow a flanged pipeline valve component through blasting, anti-corrosion barrier deposition, 650°C ceramic thermal shielding, and wear-resistant hard armor curing. Drag the 3D model to examine coating coverage, or step through each stage to see how Chemtech coatings halt corrosion and thermal degradation.",
    model: "a coated industrial valve body",
    explore: "Explore coatings",
  },
};
