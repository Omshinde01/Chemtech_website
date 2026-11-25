import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px]">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-[#4A6A86]">/</span>}
            {i < items.length - 1 ? (
              <Link to={item.path} className="text-[#7AAECB] hover:text-white">{item.name}</Link>
            ) : (
              <span aria-current="page" className="text-[#A8C0D6]">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
