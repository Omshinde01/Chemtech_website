import SEO from "../components/SEO";
import Hero from "../components/Hero";
import Products from "../components/Products";
import CastingJourney from "../components/CastingJourney";
import Process from "../components/Process";
import Industries from "../components/Industries";
import CTA from "../components/CTA";

const homeSchema = [
  {
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://chemtechspecialty.com/#organization",
    name: "Chemtech Specialty",
    url: "https://chemtechspecialty.com",
    logo: "https://chemtechspecialty.com/favicon.svg",
    image: "https://chemtechspecialty.com/og-image.jpg",
    description:
      "Manufacturer and supplier of high-performance investment casting waxes, industrial mold release agents, rubber-to-metal bonding adhesives, and protective metal coatings.",
    telephone: "+91-8668758151",
    email: "info@chemtechspecialty.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shinde House, Sahyadrinagar, Vadner Dumala",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      postalCode: "422401",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.9975",
      longitude: "73.7898",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    knowsAbout: [
      "Investment Casting Waxes",
      "Filled Wax",
      "Unfilled Wax",
      "Water Soluble Wax",
      "Pattern Assembly Sticky Wax",
      "Foundry Repair Wax",
      "Industrial Mold Release Agents",
      "Polyurethane Mold Release",
      "Rubber-to-Metal Bonding Adhesives",
      "Friction Material Adhesives",
      "Anti-Corrosion Metal Coatings",
      "High-Temperature Heat Resistant Coatings",
    ],
  },
  {
    "@type": "WebSite",
    "@id": "https://chemtechspecialty.com/#website",
    url: "https://chemtechspecialty.com",
    name: "Chemtech Specialty",
    publisher: { "@id": "https://chemtechspecialty.com/#organization" },
    inLanguage: "en-US",
  },
];

const Home = () => {
  return (
    <>
      <SEO
        title="Chemtech Specialty | Industrial Waxes, Release Agents & Protective Coatings"
        description="Chemtech Specialty manufactures high-performance investment casting waxes, industrial release agents, rubber-to-metal adhesives, and protective coatings in India. Pan-India supply from Nashik, Maharashtra."
        canonicalPath="/"
        schema={homeSchema}
        keywords="investment casting wax India, filled wax for casting, mold release agent manufacturer, rubber to metal adhesive, anti corrosion coating, industrial specialty chemicals Nashik"
      />

      <Hero />
      <Products />
      <CastingJourney />
      <Process />
      <Industries />
      <CTA />
    </>
  );
};

export default Home;