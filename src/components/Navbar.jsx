import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1C2C]/80 backdrop-blur-lg shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-white text-xl font-semibold tracking-wide">
          Chemtech <span className="text-blue-400">Specialty</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative group ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              {item.name}

              {/* Underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all ${
                  location.pathname === item.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:block bg-blue-600 px-5 py-2 rounded-lg text-white text-sm font-medium hover:bg-blue-700 transition shadow-md hover:shadow-blue-500/30"
        >
          Get Quote
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            "✕"
          ) : (
            <div className="space-y-1">
              <span className="block w-6 h-[2px] bg-white"></span>
              <span className="block w-6 h-[2px] bg-white"></span>
              <span className="block w-6 h-[2px] bg-white"></span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#0B1C2C]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 text-gray-300 text-sm">

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hover:text-white ${
                location.pathname === item.path ? "text-white" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            to="/contact"
            className="mt-2 bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition text-center"
          >
            Get Quote
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;