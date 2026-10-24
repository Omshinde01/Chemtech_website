import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Heromain from "../assets/Heromain.jpg";

const Hero = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    });
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Optimized Background */}
      <img
        src={Heromain}
        alt="Chemtech Specialty precision industrial material manufacturing"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0B1C2C]/80"></div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl will-change-transform"
      >
        <p className="text-blue-400 uppercase tracking-wider text-sm mb-4">
          Chemtech Specialty
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Advanced Waxes &
          <span className="block text-blue-400 mt-2">
            Industrial Coating Solutions
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          Delivering high-performance materials for precision casting,
          bonding, and surface engineering across global industries.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          {/* CONTACT PAGE */}
          <Link
            to="/contact"
            className="bg-blue-600 px-6 py-3 rounded-lg text-white font-medium hover:bg-blue-700 transition inline-block text-center"
          >
            Get a Quote
          </Link>

          {/* PRODUCTS PAGE */}
          <Link
            to="/products"
            className="border border-gray-300 px-6 py-3 rounded-lg text-white hover:bg-gray-700 transition inline-block text-center"
          >
            View Products
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;