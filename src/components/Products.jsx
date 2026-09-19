import React from "react";
import { Link } from "react-router-dom";

import wax from "../assets/wax.png";
import release from "../assets/release.jpg";
import adhesive from "../assets/adhesive.jpg";
import coating from "../assets/coating.jpg";
import custom from "../assets/custom.jpg";

const products = [
  {
    title: "Investment Casting Waxes",
    desc: "High-precision waxes designed for smooth surface finish and dimensional accuracy in casting applications.",
    img: wax,
    alt: "Investment casting waxes for precision foundry casting",
    link: "/investment-casting-wax",
  },
  {
    title: "Release Agents",
    desc: "Advanced release solutions ensuring clean separation and improved mold life across industrial processes.",
    img: release,
    alt: "Industrial release agents for rubber, composite, and polyurethane molding",
    link: "/release-agents",
  },
  {
    title: "Industrial Adhesives",
    desc: "Strong and reliable bonding solutions for metal, rubber, and friction materials in demanding environments.",
    img: adhesive,
    alt: "High-strength structural and rubber-to-metal bonding adhesives",
    link: "/adhesives",
  },
  {
    title: "Protective Metal Coatings",
    desc: "Protective coatings enhancing corrosion resistance, thermal stability, and long-term durability.",
    img: coating,
    alt: "Anti-corrosion and high-temperature protective metal coatings",
    link: "/coatings",
  },
  {
    title: "Custom Formulations",
    desc: "Tailor-made specialty chemicals developed to meet unique industrial and application-specific requirements.",
    img: custom,
    alt: "Custom specialty chemical formulation R&D for manufacturing",
    link: "/products",
  },
];

const Products = () => {
  return (
    <section id="products" className="bg-[#0B1C2C] py-24 px-6 text-white">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold">Our Product Solutions</h2>

        <p className="mt-4 text-gray-400">
          Delivering high-performance materials engineered for industrial precision and reliability.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

        {products.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="relative group h-72 rounded-xl overflow-hidden border border-white/10 block focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Explore ${item.title}`}
          >

            {/* Image */}
            <img
              src={item.img}
              alt={item.alt}
              loading="lazy"
              className="absolute w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition"></div>

            {/* Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>

              <p className="text-sm text-gray-300 mt-2 opacity-90">
                {item.desc}
              </p>

              <div className="mt-3 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition">
                Learn More →
              </div>
            </div>

          </Link>
        ))}

      </div>

    </section>
  );
};

export default Products;