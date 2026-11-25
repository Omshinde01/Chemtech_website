import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main"
      className={`fixed z-50 w-full border-b transition-colors duration-300 ${
        scrolled || menuOpen ? "border-white/10 bg-[#0B1C2C]/95 shadow-lg" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={close} className="text-xl font-semibold tracking-wide text-white">
          Chemtech <span className="text-blue-400">Specialty</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `border-b-2 pb-0.5 transition-colors ${isActive ? "border-blue-400 text-white" : "border-transparent text-gray-300 hover:border-blue-400 hover:text-white"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <Link to="/contact" className="hidden rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 md:block">
          Get Quote
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-xl text-white md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "✕" : (
            <span className="space-y-1" aria-hidden="true">
              <span className="block h-[2px] w-6 bg-white" />
              <span className="block h-[2px] w-6 bg-white" />
              <span className="block h-[2px] w-6 bg-white" />
            </span>
          )}
        </button>
      </div>

      <div id="mobile-menu" hidden={!menuOpen} className="md:hidden">
        <div className="flex flex-col gap-1 px-6 pb-5 text-sm">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end onClick={close} className={({ isActive }) => `py-3 ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`}>
              {item.name}
            </NavLink>
          ))}
          <Link to="/contact" onClick={close} className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700">
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
