import { Factory, Car, Settings, Wind, Wrench, Layers } from "lucide-react";

const industries = [
  { name: "Investment Casting", icon: Factory, accent: "#3B82F6" },
  { name: "Automotive", icon: Car, accent: "#22D3EE" },
  { name: "Rubber & Molding", icon: Layers, accent: "#10B981" },
  { name: "Metal Processing", icon: Settings, accent: "#F59E0B" },
  { name: "Renewable Energy", icon: Wind, accent: "#A78BFA" },
  { name: "Heavy Manufacturing", icon: Wrench, accent: "#F87171" },
];
const reversed = [...industries].reverse();

function Group({ items, ...props }) {
  return (
    <ul className="flex shrink-0" {...props}>
      {items.map(({ name, icon: Icon, accent }) => (
        <li key={name} className="flex items-center gap-3 px-9" style={{ "--accent": accent }}>
          <span className="a-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
          <span className="whitespace-nowrap text-sm font-semibold text-[#C8D8E8]">{name}</span>
        </li>
      ))}
    </ul>
  );
}

// Two identical halves scroll by exactly one half for a seamless loop. Only the first
// copy of the list is exposed to assistive technology and search engines.
function Row({ items, reverse, decorative }) {
  return (
    <div className="overflow-hidden" aria-hidden={decorative || undefined}>
      <div className={`marquee flex w-max ${reverse ? "marquee-reverse" : ""}`}>
        <Group items={items} />
        <Group items={items} aria-hidden="true" />
        <Group items={items} aria-hidden="true" />
        <Group items={items} aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="bg-[#071523] py-20">
      <div className="mb-12 px-6 text-center">
        <h2 id="industries-title" className="text-3xl font-extrabold tracking-tight text-[#F0F6FF] md:text-[44px]">Industries We Serve</h2>
        <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-relaxed text-[#8BAEC9]">
          Supporting diverse sectors with precision-engineered material solutions built for demanding industrial environments.
        </p>
      </div>
      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_100px,#000_calc(100%-100px),transparent)]">
        <Row items={industries} />
        <Row items={reversed} reverse decorative />
      </div>
    </section>
  );
}
