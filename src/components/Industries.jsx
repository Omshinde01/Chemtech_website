import React from "react";
import {
  Factory,
  Car,
  Settings,
  Wind,
  Wrench,
  Layers,
} from "lucide-react";

const industries = [
  { name: "Investment Casting", icon: Factory },
  { name: "Automotive", icon: Car },
  { name: "Rubber & Molding", icon: Layers },
  { name: "Metal Processing", icon: Settings },
  { name: "Renewable Energy", icon: Wind },
  { name: "Manufacturing", icon: Wrench },
];

const Industries = () => {
  return (
    <section id="industries" className="bg-[#0B1C2C] py-16 text-white">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Industries We Serve</h2>
        <p className="mt-2 text-gray-400 text-sm">
          Supporting diverse industries with high-performance material solutions
        </p>
      </div>

      {/* Wrapper */}
      <div className="relative max-w-6xl mx-auto overflow-hidden">

        {/* Fade Left */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0B1C2C] to-transparent z-10"></div>

        {/* Fade Right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0B1C2C] to-transparent z-10"></div>

        {/* Marquee Track */}
        <div className="flex gap-20 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] px-4">

          {[...industries, ...industries].map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition duration-300"
              >
                <Icon
                  size={28}
                  className="text-blue-400 group-hover:scale-110 transition"
                />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Industries;