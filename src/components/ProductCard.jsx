import { Link } from "react-router-dom";

// `to` is the product page, or the contact page for custom work. The whole card is the link.
export default function ProductCard({ product, accent, to, cta = "Specifications & details", as: Heading = "h3" }) {
  return (
    <article className="a-card reveal relative flex flex-col overflow-hidden rounded-xl p-6" style={{ "--accent": accent }}>
      <span aria-hidden="true" className="a-solid absolute inset-x-0 top-0 h-0.5 opacity-50" />
      <span className="a-chip mb-3 self-start rounded px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">{product.tag}</span>
      <Heading className="mb-2 text-[17px] font-bold text-[#E8EFF8]">
        <Link to={to} className="after:absolute after:inset-0">{product.title}</Link>
      </Heading>
      <p className="mb-4 text-[13px] leading-relaxed text-[#8BAEC9]">{product.summary}</p>
      <dl className="mb-4 rounded-md border border-white/5 bg-black/20 px-2.5 py-2 text-xs leading-relaxed">
        {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-[#7A9BB8]">{k}</dt>
            <dd className="text-right font-semibold text-[#C8D8E8]">{v}</dd>
          </div>
        ))}
      </dl>
      <span aria-hidden="true" className="a-text mt-auto text-[13px] font-semibold">{cta} →</span>
    </article>
  );
}
