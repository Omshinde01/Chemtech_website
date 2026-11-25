// Business facts used across pages, structured data and the prerenderer.
export const SITE_URL = "https://chemtechspecialty.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const BUSINESS = {
  name: "Chemtech Specialty",
  email: "info@chemtechspecialty.com",
  phone: "+91 86687 58151",
  phoneHref: "tel:+918668758151",
  street: "Shinde House, Sahyadrinagar, Vadner Dumala",
  city: "Nashik",
  region: "Maharashtra",
  postalCode: "422401",
};

export const ORG_REF = { "@id": `${SITE_URL}/#organization` };

export const businessSchema = {
  "@type": ["Organization", "LocalBusiness"],
  ...ORG_REF,
  name: BUSINESS.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: OG_IMAGE,
  description:
    "Manufacturer and supplier of investment casting waxes, industrial mold release agents, rubber-to-metal bonding adhesives, and protective metal coatings.",
  telephone: "+918668758151",
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: "IN",
  },
  areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
  knowsAbout: [
    "Investment Casting Waxes", "Filled Wax", "Unfilled Wax", "Water Soluble Wax", "Sticky Wax", "Repair Wax",
    "Mold Release Agents", "Rubber-to-Metal Bonding Adhesives", "Friction Material Adhesives",
    "Anti-Corrosion Coatings", "Heat Resistant Coatings",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BUSINESS.name,
  publisher: ORG_REF,
  inLanguage: "en-IN",
};
