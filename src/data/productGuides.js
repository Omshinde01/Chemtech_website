/**
 * Long-form guidance for product pages, keyed by product slug.
 * Product claims must match productData.js; everything else is general process guidance.
 */
export const productGuides = {
  "water-soluble-wax": {
    sections: [
      {
        title: "How soluble wax is used in investment casting",
        intro: "Soluble wax forms the internal shape of a pattern that a metal die cannot pull. The usual sequence is:",
        steps: [
          "Inject the soluble wax core in its own die and let it cool fully.",
          "Place the core in the pattern die and inject pattern wax around it.",
          "Immerse the assembly in warm water until the core dissolves, leaving the internal passage open.",
          "Rinse, dry and inspect the pattern before assembly and shell dipping.",
        ],
      },
      {
        title: "Soluble wax core or ceramic core?",
        body: "A soluble core is removed before shelling, so slurry and stucco must be able to enter and coat the open passage. Passages too narrow or too long to coat and dry reliably usually need a preformed ceramic core, which stays in place through casting and is removed afterwards. Where slurry access is good, a soluble core avoids the ceramic core removal step.",
      },
      {
        title: "What affects dissolving time",
        body: "Our stated range is 15–25 minutes in warm water. Core thickness, the size of the openings, water temperature and water movement all change the result. Keep the bath below the temperature at which your pattern wax softens, and confirm the cycle with a trial on your thickest core.",
      },
    ],
    faqs: [
      ["Will the water damage the pattern wax?", "Pattern wax is not normally water soluble, so the usual risk is heat rather than water. Keep the bath below your pattern wax's softening point and test a sample first."],
      ["How should soluble wax be stored?", "Keep it sealed and dry. Water soluble materials can pick up moisture from humid air, so reseal opened packs and protect finished cores until use."],
      ["Which parts commonly need soluble cores?", "Hollow aerofoil components, fluid manifold passages, complex valve bodies and pump impellers."],
    ],
    seeAlso: [
      ["/investment-casting-wax/filled-wax", "Filled investment casting wax"],
      ["/investment-casting-wax/sticky-wax", "Sticky wax for pattern assembly"],
      ["/investment-casting-wax/wax-pattern-cleaner-activator", "Wax pattern cleaner and activator"],
    ],
  },
  "heat-resistant-coating": {
    sections: [
      {
        title: "Choosing a heat resistant coating for metal",
        intro: "Before selecting a high temperature protective coating, establish:",
        steps: [
          "Continuous metal temperature and the highest short-term peak. This coating is rated for continuous service up to 650°C.",
          "How often and how quickly the part heats and cools.",
          "The metal being coated and its current surface condition.",
          "What else the surface faces, such as abrasion, moisture or outdoor exposure.",
        ],
      },
      {
        title: "Surface preparation and curing",
        body: "Poor preparation and excessive film thickness are common causes of early failure in high temperature coatings. Remove oil, rust, mill scale and old paint, and profile the surface as the technical data sheet specifies. Apply thin, even coats, and raise the temperature gradually on first heating so the film can cure without blistering. Follow the data sheet for thickness and cure schedule.",
      },
      {
        title: "Why silicone-ceramic chemistry",
        body: "Conventional organic paint binders break down at the temperatures seen on exhausts and furnaces. This coating uses a crosslinked silicone-ceramic matrix to keep protecting the metal from oxidation and scaling at temperature. Where corrosion rather than heat is the main concern, an anti-corrosion coating is normally the better choice.",
      },
    ],
    faqs: [
      ["What temperature can the coating withstand?", "It is rated for continuous operation up to 650°C (1200°F). Discuss any short-term peaks above this with our engineers before use."],
      ["Is this a non-stick or hot melt coating?", "No. It is a protective coating against heat, oxidation and scaling. For clean part release, see our release agents."],
      ["Where is it typically used?", "Industrial exhaust systems, heat exchangers, boiler housings, furnace muffles, piping manifolds and high-temperature engine hardware."],
    ],
    seeAlso: [
      ["/coatings/anti-corrosion-coating", "Anti-corrosion coating"],
      ["/coatings/surface-protection-coating", "Surface protection coating"],
      ["/release-agents/metal-to-metal-release", "Metal-to-metal release agent"],
    ],
  },
  "rubber-to-metal-adhesive": {
    sections: [
      {
        title: "How rubber to metal bonding works",
        intro: "The bond forms while the rubber vulcanizes against a coated metal part. A typical process is:",
        steps: [
          "Degrease the metal, then blast or chemically treat it to give a clean, active surface.",
          "Apply primer and covercoat, or a single coat, at the thickness given in the data sheet.",
          "Dry fully and protect coated parts from dust, oil and handling.",
          "Load the part, then mould and cure the rubber under pressure.",
          "Test bonded samples and check whether failure occurs in the rubber or at an interface.",
        ],
      },
      {
        title: "Primer and covercoat or single coat?",
        body: "A two-coat system pairs a primer that bonds to the metal with a covercoat that bonds to the rubber, and is commonly chosen for demanding environments. A single-coat rubber bonding agent saves a process step. The right choice depends on the elastomer, metal, cure cycle and service conditions; we offer both configurations.",
      },
      {
        title: "Reading a bond failure",
        body: "Rubber tear means the rubber failed before the bond. Separation at the metal usually points to cleaning, surface treatment or primer application. Separation between rubber and adhesive can point to contamination, adhesive pre-curing in a hot mould, or a mismatch with the compound. Splitting between coats suggests insufficient drying or incorrect film thickness.",
      },
    ],
    faqs: [
      ["Which metals can be bonded?", "Mild steel, stainless steel, aluminum and brass. It is also compatible with engineered plastics. Preparation differs for each substrate."],
      ["Which rubber compounds will it bond?", "Suitability depends on the elastomer and its formulation. Send us the polymer, hardness, cure system and moulding temperature so we can advise on a trial."],
      ["What bond strength and service temperature can I expect?", "Our listed values are above 16 MPa with 100% rubber tear, and -40°C to +150°C continuous service. Confirm them on your own compound and geometry."],
      ["Is this an adhesive or a bonded rubber part?", "This product is the bonding adhesive itself, for manufacturers of rubber-to-metal bonded parts."],
    ],
    seeAlso: [
      ["/release-agents/rubber-to-metal-release", "Release agent for bonded rubber-metal parts"],
      ["/adhesives/friction-material-adhesive", "Friction material adhesive"],
      ["/adhesives/metal-to-metal-adhesive", "Metal-to-metal adhesive"],
    ],
  },
  "composite-release-agent": {
    sections: [
      {
        title: "How to apply a semi-permanent release agent",
        intro: "Semi-permanent release agents form a film on the tool that gives several releases per application. A typical routine is:",
        steps: [
          "Strip old wax, release agent and resin from the tool.",
          "Seal new, repaired or porous tooling with a compatible mould sealer.",
          "Apply thin coats, allowing the data sheet's interval between each.",
          "Allow the final coat to cure before laying up or applying gelcoat.",
          "Touch up when release force starts to rise, before parts begin to stick.",
        ],
      },
      {
        title: "Selecting a mould release agent for composites",
        body: "Match the product to the resin system, maximum cure temperature, tooling material, surface finish and any later bonding or painting. This release agent is listed for epoxy, phenolic, bismaleimide and vinyl ester resins and is autoclave safe up to 260°C. Its silicone-free formulation suits aerospace and marine composites where silicone transfer would interfere with secondary bonding.",
      },
      {
        title: "Release agent, release film or release liner?",
        body: "A release agent is applied to the tool so the finished part demoulds. A release film is a separate layer used in the vacuum bag stack. A release liner is the backing that protects prepreg or adhesive film until lay-up. They do different jobs; this product is a tool release agent, not a liner or film.",
      },
    ],
    faqs: [
      ["How many releases will one application give?", "It depends on the tool surface, part geometry, resin and cure cycle. Establish the number with a trial and set your touch-up interval from it."],
      ["Can parts be bonded or painted afterwards?", "The product is silicone free and listed as permitting direct secondary bonding without sanding. Verify bond or paint adhesion on a sample before production."],
      ["Do you offer water-based or REACH documented grades?", "Tell us your carrier and compliance requirements when you enquire. We will confirm what is available and which documents can be supplied."],
    ],
    seeAlso: [
      ["/release-agents/polyurethane-release-agent", "Polyurethane release agent"],
      ["/release-agents/rubber-release-agent", "Rubber release agent"],
      ["/adhesives/metal-to-metal-adhesive", "Metal-to-metal adhesive"],
    ],
  },
};
