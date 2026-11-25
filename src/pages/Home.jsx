import { useState } from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Journey from "../components/journey/Journey";
import Process from "../components/Process";
import Industries from "../components/Industries";
import CTA from "../components/CTA";
import { categories } from "../data/productData";
import { businessSchema, websiteSchema } from "../lib/site";

export default function Home() {
  const [active, setActive] = useState(categories[0].slug);

  return (
    <>
      <SEO
        title="Chemtech Specialty | Casting Waxes, Release Agents & Coatings"
        description="Manufacturer of investment casting waxes, mold release agents, rubber-to-metal adhesives and protective coatings in Nashik, India. Pan-India supply. Get a quote."
        path="/"
        schema={[businessSchema, websiteSchema]}
      />
      <Hero />
      <Products />

      <section aria-labelledby="simulations-title" className="border-t border-white/5 bg-[#071523] pt-16">
        <div className="mx-auto mb-8 flex max-w-6xl flex-col justify-between gap-6 px-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-400">3D Interactive Simulations</p>
            <h2 id="simulations-title" className="text-2xl font-extrabold text-white md:text-3xl">
              Explore How Chemtech Materials Perform in Your Process
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                aria-pressed={active === c.slug}
                onClick={() => setActive(c.slug)}
                style={{ "--accent": c.accent }}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${active === c.slug ? "a-solid text-slate-950" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <Journey key={active} slug={active} />
      </section>

      <Process />
      <Industries />
      <CTA />
    </>
  );
}
