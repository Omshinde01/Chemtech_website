import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#081521] text-gray-300 pt-16 pb-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company Overview & Brand Authority */}
        <div>
          <Link to="/" className="text-white text-xl font-bold tracking-wide">
            Chemtech <span className="text-blue-400">Specialty</span>
          </Link>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Delivering high-performance industrial specialty materials — precision investment casting waxes, release agents, industrial bonding adhesives, and protective coatings for demanding manufacturing environments.
          </p>
          <div className="mt-4 text-xs text-blue-400 font-semibold tracking-wider uppercase">
            ISO-Compliant Quality & Custom R&D
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-base">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400 transition">Product Catalogue</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Company</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact & RFQ</Link></li>
          </ul>
        </div>

        {/* Products - Deep Link Hierarchy for Search Engines */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-base">Industrial Products</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/investment-casting-wax" className="hover:text-blue-400 transition flex items-center gap-1.5">
                <span className="text-blue-500 font-mono text-xs">01</span> Investment Casting Waxes
              </Link>
            </li>
            <li>
              <Link to="/release-agents" className="hover:text-blue-400 transition flex items-center gap-1.5">
                <span className="text-cyan-400 font-mono text-xs">02</span> Release Agents
              </Link>
            </li>
            <li>
              <Link to="/adhesives" className="hover:text-blue-400 transition flex items-center gap-1.5">
                <span className="text-amber-400 font-mono text-xs">03</span> Industrial Adhesives
              </Link>
            </li>
            <li>
              <Link to="/coatings" className="hover:text-blue-400 transition flex items-center gap-1.5">
                <span className="text-emerald-400 font-mono text-xs">04</span> Protective Metal Coatings
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-400 transition flex items-center gap-1.5">
                <span className="text-purple-400 font-mono text-xs">05</span> All Products Catalogue
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information & Local SEO Signals */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-base">Contact & Supply</h3>
          <address className="not-italic space-y-2.5 text-sm text-gray-300">
            <p>
              <span className="text-gray-500 block text-xs uppercase font-medium">Headquarters & Works</span>
              Shinde House, Sahyadrinagar, Vadner Dumala, Nashik - 422401, Maharashtra, India
            </p>
            <p>
              <span className="text-gray-500 block text-xs uppercase font-medium">Direct Inquiries</span>
              <a href="mailto:info@chemtechspecialty.com" className="hover:text-blue-400 transition">
                info@chemtechspecialty.com
              </a>
            </p>
            <p>
              <span className="text-gray-500 block text-xs uppercase font-medium">Phone</span>
              <a href="tel:+918668758151" className="hover:text-blue-400 transition">
                +91 8668758151
              </a>
            </p>
            <p className="text-xs text-gray-400 pt-1">
              Pan-India distribution & global export capabilities
            </p>
          </address>
        </div>

      </div>

      {/* Bottom Legal & SEO Footprint */}
      <div className="border-t border-white/10 mt-12 pt-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          © {new Date().getFullYear()} Chemtech Specialty. All rights reserved. Precision chemical manufacturing.
        </div>
        <div className="flex gap-6">
          <Link to="/products" className="hover:text-gray-400 transition">Products</Link>
          <Link to="/about" className="hover:text-gray-400 transition">Company</Link>
          <Link to="/contact" className="hover:text-gray-400 transition">Request Quote</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;