import { useState } from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import Products from "../components/Products";
import CastingJourney from "../components/CastingJourney";
import ReleaseJourney from "../components/ReleaseJourney";
import AdhesiveJourney from "../components/AdhesiveJourney";
import CoatingJourney from "../components/CoatingJourney";
import Process from "../components/Process";
import Industries from "../components/Industries";
import CTA from "../components/CTA";

const homeSchema = [
  {
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://chemtechspecialty.com/#organization",
    name: "Chemtech Specialty",
    url: "https://chemtechspecialty.com",
    logo: "https://chemtechspecialty.com/logo.png",
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

const CATEGORY_TABS = [
  { id: "waxes", label: "Investment Casting Waxes", color: "#3B82F6" },
  { id: "release", label: "Release Agents", color: "#22D3EE" },
  { id: "adhesives", label: "Industrial Adhesives", color: "#F59E0B" },
  { id: "coatings", label: "Protective Coatings", color: "#10B981" },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("waxes");

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

      {/* ── 3D INTERACTIVE SIMULATION SHOWCASE ── */}
      <section className="bg-[#071523] pt-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                3D Interactive Simulations
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Explore How Chemtech Materials Perform in Your Process
              </h2>
            </div>
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl">
              {CATEGORY_TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      active
                        ? "text-slate-950 shadow-md"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    style={{
                      backgroundColor: active ? tab.color : "transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {activeTab === "waxes" && <CastingJourney />}
        {activeTab === "release" && <ReleaseJourney />}
        {activeTab === "adhesives" && <AdhesiveJourney />}
        {activeTab === "coatings" && <CoatingJourney />}
      </section>

      <Process />
      <Industries />
      <CTA />
    </>
  );
};

export default Home;