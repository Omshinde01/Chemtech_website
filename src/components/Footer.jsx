import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#081521] text-gray-300 pt-16 pb-8 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h3 className="text-white text-lg font-semibold">
            Chemtech Specialty
          </h3>
          <p className="mt-3 text-sm text-gray-400">
            Delivering high-performance industrial materials and solutions for global applications.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#products" className="hover:text-white">Products</a></li>
            <li><a href="#industries" className="hover:text-white">Industries</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-white font-medium mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            <li>Investment Casting Waxes</li>
            <li>Releasing Agents</li>
            <li>Adhesives</li>
            <li>Metal Coatings</li>
            <li>Custom Coatings</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-3">Contact</h4>
          <p className="text-sm">Email: yourcompany@email.com</p>
          <p className="text-sm mt-1">Phone: +91 XXXXX XXXXX</p>
          <p className="text-sm mt-1">India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Chemtech Specialty. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;