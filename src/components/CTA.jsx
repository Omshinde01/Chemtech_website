import React from "react";

const CTA = () => {
  return (
    <section className="bg-[#081521] py-20 px-6 text-white text-center relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-600/20 blur-2xl"></div>

      <div className="relative max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Need Reliable Industrial Materials?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-gray-400 text-sm md:text-base">
          Get high-performance waxes, coatings, and adhesives tailored to your exact application.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          {/* Primary CTA */}
          <a
            href="/contact"
            className="bg-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30"
          >
            Request a Quote
          </a>

          {/* Secondary CTA */}
          <a
            href="/products"
            className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Explore Products
          </a>

        </div>

      </div>
    </section>
  );
};

export default CTA;