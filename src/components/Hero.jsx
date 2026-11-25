import { Link } from "react-router-dom";
import avif640 from "../assets/hero-640.avif";
import avif1020 from "../assets/hero-1020.avif";
import webp640 from "../assets/hero-640.webp";
import webp1020 from "../assets/hero-1020.webp";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <picture>
        <source type="image/avif" srcSet={`${avif640} 640w, ${avif1020} 1020w`} sizes="100vw" />
        <img
          src={webp1020}
          srcSet={`${webp640} 640w, ${webp1020} 1020w`}
          sizes="100vw"
          width="1020"
          height="512"
          alt="Chemtech Specialty engineer working on an industrial wax and coating formulation"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-[#0B1C2C]/80" />

      <div className="hero-in relative z-10 max-w-4xl px-6 pb-12 pt-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-wider text-blue-400">Chemtech Specialty · Nashik, India</p>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
          Investment Casting Waxes &amp;
          <span className="mt-2 block text-blue-400">Industrial Coating Solutions</span>
        </h1>
        <p className="mt-6 text-lg text-gray-200">
          Delivering high-performance waxes, release agents, adhesives and coatings for precision casting,
          bonding, and surface engineering across global industries.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/contact" className="rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700">Get a Quote</Link>
          <Link to="/products" className="rounded-lg border border-gray-300 px-6 py-3 text-center text-white transition hover:bg-white/10">View Products</Link>
        </div>
      </div>
    </section>
  );
}
