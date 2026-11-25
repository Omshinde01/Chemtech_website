import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import { categories, customCategory } from "../data/productData";
import { SITE_URL } from "../lib/site";
import { useHydrated } from "../lib/useHydrated";

const all = [...categories, customCategory];
const catalogue = categories.flatMap((c) => c.products.map((p) => `${SITE_URL}/${c.slug}/${p.slug}`));
const CRUMBS = [{ name: "Home", path: "/" }, { name: "Products", path: "/products" }];
const contactFor = (title) => `/contact?product=${encodeURIComponent(title)}`;

const ADVANTAGES = [
  ["Ultra-Clean Burnout", "Ash content consistently under 0.015%, eliminating inclusion defects in critical alloy castings."],
  ["Multi-Substrate Adhesion", "Chemical crosslinking capable of bonding diverse combinations of metals, elastomers, and composites."],
  ["High-Temperature Endurance", "Formulated to perform reliably under thermal cycles exceeding 260°C to 650°C."],
  ["Pan-India & Export Supply", "Dependable dispatch networks from Nashik, Maharashtra with ISO-compliant batch tracking."],
];

const matches = (p, q) =>
  [p.title, p.tag, p.summary, p.intro, p.use, ...Object.values(p.specs)].join(" ").toLowerCase().includes(q);

export default function Products() {
  const [params, setParams] = useSearchParams();
  const { hash } = useLocation();
  const hydrated = useHydrated();
  const [query, setQuery] = useState("");

  // The prerendered page shows everything; ?category= filters after hydration.
  const selected = hydrated ? all.find((c) => c.key === params.get("category")) : undefined;
  const q = query.trim().toLowerCase();
  const shown = (selected && !q ? [selected] : all)
    .map((c) => ({ ...c, products: q ? c.products.filter((p) => matches(p, q)) : c.products }))
    .filter((c) => c.products.length);
  const count = shown.reduce((n, c) => n + c.products.length, 0);

  useEffect(() => {
    if (!hash) return;
    // After App's scroll-to-top, which runs in a later effect
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  const pick = (key) => { setQuery(""); setParams(key ? { category: key } : {}, { replace: true }); };
  const tab = (active) => `whitespace-nowrap border-b-2 px-5 py-4 text-[13px] ${active ? "a-text border-current font-bold" : "border-transparent font-medium text-[#8BAEC9] hover:text-white"}`;

  return (
    <div className="bg-[#071523]">
      <SEO
        title="Industrial Specialty Products Catalogue | Chemtech Specialty"
        description="Browse investment casting waxes, mold release agents, rubber-to-metal adhesives and high-temperature metal coatings from Chemtech Specialty, with full specs."
        path="/products"
        breadcrumbs={CRUMBS}
        schema={[{
          "@type": "ItemList",
          name: "Industrial Specialty Materials Catalogue",
          numberOfItems: catalogue.length,
          itemListElement: catalogue.map((url, i) => ({ "@type": "ListItem", position: i + 1, url })),
        }]}
      />

      <header className="mx-auto max-w-[1140px] px-6 pb-12 pt-28 sm:px-8">
        <p className="mb-6 inline-block rounded border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-blue-400">Engineered Material Solutions</p>
        <h1 className="mb-5 max-w-[780px] text-4xl font-extrabold leading-tight tracking-tight text-[#F0F6FF] md:text-[58px]">
          Precision Materials for{" "}
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Industrial Manufacturing</span>
        </h1>
        <p className="mb-8 max-w-[640px] leading-relaxed text-[#8BAEC9]">
          High-performance investment casting waxes, advanced mold release agents, industrial structural adhesives, and protective metal coatings — formulated with strict batch consistency for foundries and precision manufacturers.
        </p>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g. filled wax, brake, 650°C"
          aria-label="Search the product catalogue"
          className="w-full max-w-[520px] rounded-[10px] border border-white/15 bg-white/5 px-4 py-3.5 text-base placeholder:text-[#8BAEC9]"
        />
        <p role="status" className="mt-3 min-h-5 text-sm text-[#8BAEC9]">{q ? `${count} ${count === 1 ? "product" : "products"} found` : ""}</p>
      </header>

      <nav aria-label="Product categories" className="sticky top-[60px] z-20 overflow-x-auto border-y border-white/5 bg-[#071523]/95">
        <div className="mx-auto flex max-w-[1140px] sm:px-3">
          <button type="button" onClick={() => pick(null)} aria-pressed={!selected && !q} style={{ "--accent": "#60A5FA" }} className={tab(!selected && !q)}>All</button>
          {all.map((c) => (
            <button key={c.key} type="button" onClick={() => pick(c.key)} aria-pressed={selected === c && !q} style={{ "--accent": c.accent }} className={tab(selected === c && !q)}>{c.shortLabel}</button>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-[1140px] px-6 py-14 sm:px-8">
        {count === 0 && (
          <p className="mb-14 rounded-xl border border-white/10 p-9 text-center text-[#8BAEC9]">
            No products matched “{query}”. <Link to="/contact" className="text-blue-400 underline">Ask our chemical engineering team</Link> about a custom formulation.
          </p>
        )}
        {shown.map((c) => (
          <section key={c.key} id={c.key} aria-labelledby={`${c.key}-title`} className="mb-20 scroll-mt-32" style={{ "--accent": c.accent }}>
            <p className="a-text mb-2 text-[11px] font-bold uppercase tracking-widest">Category {c.number}</p>
            <h2 id={`${c.key}-title`} className="mb-3 text-2xl font-bold tracking-tight text-[#F0F6FF] md:text-4xl">
              {c.slug ? <Link to={`/${c.slug}`} className="hover:underline">{c.label}</Link> : c.label}
            </h2>
            <p className="mb-8 max-w-[640px] text-[15px] leading-relaxed text-[#8BAEC9]">{c.description}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.products.map((p) => (
                <ProductCard key={p.title} product={p} accent={c.accent} to={p.slug ? `/${c.slug}/${p.slug}` : contactFor(p.title)} cta={p.slug ? undefined : "Discuss your requirement"} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              {c.slug && <Link to={`/${c.slug}`} className="a-text py-2 hover:underline">Compare all {c.label} →</Link>}
              <Link to={contactFor(c.label)} className="a-text py-2 hover:underline">Request technical data sheet (TDS) →</Link>
            </div>
          </section>
        ))}

        <section aria-labelledby="advantages-title" className="border-t border-white/5 pt-12">
          <h2 id="advantages-title" className="mb-3 text-center text-2xl font-bold text-[#F0F6FF]">Engineered Quality Across All Material Lines</h2>
          <p className="mx-auto mb-10 max-w-[600px] text-center text-sm text-[#8BAEC9]">
            From initial raw material testing to final production certification, Chemtech Specialty adheres to rigorous industrial quality control.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map(([title, desc]) => (
              <li key={title} className="rounded-[10px] border border-white/5 bg-white/[0.02] p-5">
                <h3 className="mb-1.5 text-[15px] font-semibold">{title}</h3>
                <p className="text-[13px] leading-relaxed text-[#8BAEC9]">{desc}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
