import { Link } from "react-router-dom";
import wax480 from "../assets/wax-480.webp";
import wax800 from "../assets/wax-800.webp";
import release480 from "../assets/release-480.webp";
import release800 from "../assets/release-800.webp";
import adhesive480 from "../assets/adhesive-480.webp";
import adhesive800 from "../assets/adhesive-800.webp";
import coating480 from "../assets/coating-480.webp";
import coating800 from "../assets/coating-800.webp";
import custom480 from "../assets/custom-480.webp";
import custom800 from "../assets/custom-800.webp";

const products = [
  {
    title: "Investment Casting Waxes",
    desc: "High-precision waxes designed for smooth surface finish and dimensional accuracy in casting applications.",
    img: [wax480, wax800, 800],
    alt: "Investment casting wax pellets and pattern wax samples",
    link: "/investment-casting-wax",
  },
  {
    title: "Release Agents",
    desc: "Advanced release solutions ensuring clean separation and improved mold life across industrial processes.",
    img: [release480, release800, 800],
    alt: "Release agent being sprayed onto an industrial mold",
    link: "/release-agents",
  },
  {
    title: "Industrial Adhesives",
    desc: "Strong and reliable bonding solutions for metal, rubber, and friction materials in demanding environments.",
    img: [adhesive480, adhesive800, 800],
    alt: "Industrial adhesive being dispensed onto a threaded metal part",
    link: "/adhesives",
  },
  {
    title: "Protective Metal Coatings",
    desc: "Protective coatings enhancing corrosion resistance, thermal stability, and long-term durability.",
    img: [coating480, coating800, 600],
    alt: "Coated metal components on a production line",
    link: "/coatings",
  },
  {
    title: "Custom Formulations",
    desc: "Tailor-made specialty chemicals developed to meet unique industrial and application-specific requirements.",
    img: [custom480, custom800, 800],
    alt: "Custom coating being applied to a large industrial structure",
    link: "/products#custom",
  },
];

export default function Products() {
  return (
    <section id="products" className="bg-[#0B1C2C] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold">Our Product Solutions</h2>
        <p className="mt-4 text-gray-300">Delivering high-performance materials engineered for industrial precision and reliability.</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(({ title, desc, img: [small, large, width], alt, link }) => (
          <Link key={link} to={link} className="group relative block h-72 overflow-hidden rounded-xl border border-white/10">
            <img
              src={small}
              srcSet={`${small} 480w, ${large} ${width}w`}
              sizes="(min-width: 1024px) 410px, (min-width: 768px) 50vw, 100vw"
              alt={alt}
              width="480"
              height="288"
              loading="lazy"
              decoding="async"
              className="absolute h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/70 transition group-hover:bg-black/60" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-gray-200">{desc}</p>
              <span aria-hidden="true" className="mt-3 block text-sm text-blue-300">Learn more →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
