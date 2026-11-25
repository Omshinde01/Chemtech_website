import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { getCategoryBySlug, getProductBySlug } from "../data/productData";
import { BUSINESS, ORG_REF, SITE_URL } from "../lib/site";

const WHY = [
  "Consistent batch-to-batch quality",
  "Technical support from experienced engineers",
  "Pan-India supply from Nashik, Maharashtra",
  "Custom formulation capability for unique requirements",
];

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="a-rule mb-4 pb-3 text-[22px] font-bold text-[#F0F6FF]">{title}</h2>
      {children}
    </section>
  );
}

export default function ProductPage() {
  const { categorySlug, productSlug } = useParams();
  const cat = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(categorySlug, productSlug);
  const path = `/${cat.slug}/${product.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: cat.label, path: `/${cat.slug}` },
    { name: product.title, path },
  ];
  const quote = `/contact?product=${encodeURIComponent(product.title)}`;
  // Start after the current product and wrap, so every product gets linked equally.
  const at = cat.products.indexOf(product);
  const related = [...cat.products.slice(at + 1), ...cat.products.slice(0, at)].slice(0, 3);

  return (
    <div className="bg-[#071523]" style={{ "--accent": cat.accent }}>
      <SEO
        title={product.metaTitle}
        description={product.metaDescription}
        path={path}
        breadcrumbs={crumbs}
        schema={[{
          "@type": "Product",
          name: product.title,
          description: product.intro,
          category: cat.label,
          url: `${SITE_URL}${path}`,
          brand: { "@type": "Brand", name: BUSINESS.name },
          manufacturer: ORG_REF,
          additionalProperty: Object.entries(product.specs).map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
        }, { "@type": "Organization", ...ORG_REF, name: BUSINESS.name, url: `${SITE_URL}/` }]}
      />

      <div className="mx-auto max-w-[1140px] px-6 pb-20 pt-24 sm:px-8">
        <header className="mb-12">
          <Breadcrumbs items={crumbs} />
          <p className="a-chip mb-6 inline-block rounded px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest">{product.tag}</p>
          <h1 className="mb-5 max-w-[720px] text-3xl font-extrabold leading-tight tracking-tight text-[#F0F6FF] md:text-[52px]">{product.title}</h1>
          <p className="mb-8 max-w-[640px] text-[17px] leading-relaxed text-[#8BAEC9]">{product.summary}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to={quote} className="a-solid rounded-lg px-6 py-3 font-bold text-[#071523] hover:brightness-110">Request a Quote for {product.shortTitle} →</Link>
            <Link to={`/${cat.slug}`} className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10">← {cat.label}</Link>
          </div>
        </header>

        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <div>
            <Section title="Product Overview"><p className="text-[15px] leading-loose text-[#A8C0D6]">{product.intro}</p></Section>

            <Section title="Key Performance Features">
              <ul className="space-y-3 text-sm leading-relaxed text-[#B8D0E8]">
                {product.points.map((point) => (
                  <li key={point} className="flex gap-3"><span aria-hidden="true" className="a-text font-bold">✓</span>{point}</li>
                ))}
              </ul>
            </Section>

            <Section title="Applications & Use Cases">
              <p className="a-card rounded-lg px-5 py-4 text-sm leading-relaxed text-[#A8C0D6]">{product.use}</p>
            </Section>

            <Section title="Why Choose Chemtech Specialty">
              <ul className="grid gap-3 sm:grid-cols-2">
                {WHY.map((w) => <li key={w} className="rounded-lg border border-white/5 bg-white/[0.025] px-3.5 py-3 text-[13px] text-[#A8C0D6]">{w}</li>)}
              </ul>
            </Section>
          </div>

          <aside className="space-y-6 md:sticky md:top-24">
            <div className="a-card rounded-xl p-5">
              <h2 className="a-text mb-4 text-[13px] font-bold uppercase tracking-wider">Technical Specifications</h2>
              <dl className="divide-y divide-white/5 text-[13px]">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 py-2.5">
                    <dt className="text-[#8BAEC9]">{k}</dt>
                    <dd className="text-right font-semibold text-[#E8EFF8]">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link to={quote} className="a-solid mt-5 block rounded-lg px-4 py-3 text-center text-[13px] font-bold text-[#071523] hover:brightness-110">Request Quote / TDS</Link>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h2 className="mb-3 text-sm font-bold">Direct Inquiry</h2>
              <address className="text-[13px] not-italic leading-relaxed text-[#8BAEC9]">
                <strong className="text-[#A8C0D6]">{BUSINESS.name}</strong><br />
                {BUSINESS.street}, {BUSINESS.city} — {BUSINESS.postalCode}, {BUSINESS.region}, India<br />
                <a href={BUSINESS.phoneHref} className="inline-block py-1 text-blue-400">{BUSINESS.phone}</a><br />
                <a href={`mailto:${BUSINESS.email}`} className="inline-block py-1 text-blue-400">{BUSINESS.email}</a>
              </address>
            </div>
          </aside>
        </div>

        <section className="mt-16 border-t border-white/5 pt-12">
          <h2 className="mb-6 text-[22px] font-bold text-[#F0F6FF]">
            Related <Link to={`/${cat.slug}`} className="a-text hover:underline">{cat.label}</Link> Products
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ProductCard key={r.slug} product={r} accent={cat.accent} to={`/${cat.slug}/${r.slug}`} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
