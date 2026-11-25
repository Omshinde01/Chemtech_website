import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { categories } from "../data/productData";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#071523] px-6 py-24 text-center">
      <SEO
        title="Page Not Found | Chemtech Specialty"
        description="The page you are looking for could not be found."
        path="/404"
        noindex
      />
      <p aria-hidden="true" className="mb-4 text-[120px] font-extrabold leading-none text-blue-500/20">404</p>
      <h1 className="mb-4 text-3xl font-bold text-[#F0F6FF]">Page Not Found</h1>
      <p className="mb-10 max-w-[480px] leading-relaxed text-[#8BAEC9]">
        The page you are looking for doesn&apos;t exist or may have been moved. Explore our industrial specialty materials below.
      </p>
      <nav aria-label="Suggested pages" className="space-y-6 text-sm">
        <ul className="flex flex-wrap justify-center gap-3 font-semibold">
          <li><Link to="/" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">Return to Homepage</Link></li>
          <li><Link to="/products" className="inline-block rounded-lg border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10">Browse Products</Link></li>
          <li><Link to="/contact" className="inline-block rounded-lg border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10">Contact Us</Link></li>
        </ul>
        <ul className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <li key={c.slug}><Link to={`/${c.slug}`} className="inline-block rounded border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-blue-400">{c.label}</Link></li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
