import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import Journey from "../components/journey/Journey";
import { categories, getCategoryBySlug } from "../data/productData";
import { SITE_URL } from "../lib/site";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const cat = getCategoryBySlug(categorySlug);
  const path = `/${cat.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: cat.label, path },
  ];
  const quote = `/contact?product=${encodeURIComponent(cat.label)}`;

  return (
    <div className="bg-[#071523]" style={{ "--accent": cat.accent }}>
      <SEO
        title={cat.metaTitle}
        description={cat.metaDescription}
        path={path}
        breadcrumbs={crumbs}
        schema={[{
          "@type": "ItemList",
          name: cat.label,
          numberOfItems: cat.products.length,
          itemListElement: cat.products.map((p, i) => ({
            "@type": "ListItem", position: i + 1, name: p.title, url: `${SITE_URL}${path}/${p.slug}`,
          })),
        }]}
      />

      <div className="mx-auto max-w-[1140px] px-6 pb-16 pt-24 sm:px-8">
        <header className="mb-12">
          <Breadcrumbs items={crumbs} />
          <p className="a-chip mb-6 inline-block rounded px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest">Product Category {cat.number}</p>
          <h1 className="mb-5 max-w-[700px] text-3xl font-extrabold leading-tight tracking-tight text-[#F0F6FF] md:text-[52px]">{cat.label}</h1>
          <p className="mb-8 max-w-[640px] leading-relaxed text-[#8BAEC9]">{cat.description}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to={quote} className="a-solid rounded-lg px-6 py-3 font-bold text-[#071523] hover:brightness-110">Request a Quote →</Link>
            <Link to="/products" className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10">← All Products</Link>
          </div>
        </header>

        <h2 className="mb-6 text-xl font-bold text-[#F0F6FF]">{cat.label} Products</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cat.products.map((p) => <ProductCard key={p.slug} product={p} accent={cat.accent} to={`${path}/${p.slug}`} />)}
        </div>

        <section aria-labelledby="guide-title" className="mt-16">
          <h2 id="guide-title" className="mb-2 text-xl font-bold text-[#F0F6FF]">Which product do you need?</h2>
          <p className="mb-6 text-sm text-[#8BAEC9]">Compare the range by what each product does best and where it is used.</p>
          <div className="overflow-x-auto rounded-xl border border-white/10" tabIndex={0} role="region" aria-labelledby="guide-title">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/5 text-[#C8D8E8]">
                <tr><th scope="col" className="p-4">Product</th><th scope="col" className="p-4">Key characteristic</th><th scope="col" className="p-4">Where it is used</th></tr>
              </thead>
              <tbody className="text-[#8BAEC9]">
                {cat.products.map((p) => (
                  <tr key={p.slug} className="border-t border-white/5 align-top">
                    <th scope="row" className="p-4 font-semibold"><Link to={`${path}/${p.slug}`} className="a-text hover:underline">{p.shortTitle}</Link></th>
                    <td className="p-4">{p.specs["Key Characteristic"]}</td>
                    <td className="p-4">{p.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <Journey key={cat.slug} slug={cat.slug} />

      <div className="mx-auto max-w-[1140px] px-6 py-16 sm:px-8">
        <section>
          <h2 className="mb-2 text-xl font-bold text-[#F0F6FF]">Other Product Categories</h2>
          <p className="mb-6 text-sm text-[#8BAEC9]">Chemtech Specialty supplies a complete range of industrial specialty materials.</p>
          <ul className="flex flex-wrap gap-3 text-[13px]">
            {categories.filter((c) => c !== cat).map((c) => (
              <li key={c.slug}><Link to={`/${c.slug}`} className="inline-block rounded-md border border-white/10 bg-white/5 px-4 py-3 text-[#7AAECB] hover:text-white">{c.label} →</Link></li>
            ))}
          </ul>
        </section>

        <section className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-8 py-7">
          <div>
            <h2 className="mb-1.5 text-lg font-bold text-[#F0F6FF]">Need technical data sheets or a trial sample?</h2>
            <p className="text-sm text-[#8BAEC9]">Our engineers are available to assist with product selection, technical specifications, and trial batch requests.</p>
          </div>
          <Link to={quote} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Contact Our Engineers →</Link>
        </section>
      </div>
    </div>
  );
}
