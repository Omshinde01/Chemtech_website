import { Link } from "react-router-dom";
import { categories } from "../data/productData";
import { BUSINESS } from "../lib/site";

const quickLinks = [["/", "Home"], ["/products", "Product Catalogue"], ["/about", "About Company"], ["/contact", "Contact & RFQ"]];
const KEY = ["filled-wax", "water-soluble-wax", "rubber-release-agent", "composite-release-agent", "rubber-to-metal-adhesive", "anti-corrosion-coating", "heat-resistant-coating"];
const keyProducts = categories.flatMap((c) =>
  c.products.filter((p) => KEY.includes(p.slug)).map((p) => [`/${c.slug}/${p.slug}`, p.title])
);

function Column({ title, children }) {
  return (
    <div>
      <p className="mb-4 font-semibold text-white">{title}</p>
      {children}
    </div>
  );
}

const Links = ({ items }) => (
  <ul className="space-y-1 text-sm">
    {items.map(([to, label]) => (
      <li key={to}><Link to={to} className="inline-block py-1 transition hover:text-blue-400">{label}</Link></li>
    ))}
  </ul>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#081521] px-6 pb-8 pt-16 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link to="/" className="text-xl font-bold tracking-wide text-white">Chemtech <span className="text-blue-400">Specialty</span></Link>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Delivering high-performance industrial specialty materials — precision investment casting waxes, release agents, industrial bonding adhesives, and protective coatings for demanding manufacturing environments.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-blue-400">ISO-Compliant Quality &amp; Custom R&amp;D</p>
        </div>
        <Column title="Quick Links"><Links items={quickLinks} /></Column>
        <Column title="Product Categories"><Links items={categories.map((c) => [`/${c.slug}`, c.label])} /></Column>
        <Column title="Key Products"><Links items={keyProducts} /></Column>
        <Column title="Contact & Supply">
          <address className="space-y-2.5 text-sm not-italic">
            <p>{BUSINESS.street}, {BUSINESS.city} - {BUSINESS.postalCode}, {BUSINESS.region}, India</p>
            <p><a href={`mailto:${BUSINESS.email}`} className="inline-block py-1 hover:text-blue-400">{BUSINESS.email}</a></p>
            <p><a href={BUSINESS.phoneHref} className="inline-block py-1 hover:text-blue-400">{BUSINESS.phone}</a></p>
            <p className="text-xs text-gray-400">Pan-India distribution &amp; global export capabilities</p>
          </address>
        </Column>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-gray-400" suppressHydrationWarning>
        © {new Date().getFullYear()} Chemtech Specialty. All rights reserved. Precision chemical manufacturing.
      </p>
    </footer>
  );
}
