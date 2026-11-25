import { Suspense, lazy } from "react";
import { getCategoryBySlug, getProductBySlug } from "./data/productData";

// A lazy page that renders synchronously once preloaded, so prerendering and hydration
// never hit a Suspense fallback.
function page(source, load) {
  let Loaded = null;
  const Lazy = lazy(load);
  function Page() {
    return <Suspense fallback={<div className="min-h-screen bg-[#071523]" />}>{Loaded ? <Loaded /> : <Lazy />}</Suspense>;
  }
  return { source, Page, preload: () => load().then((m) => { Loaded = m.default; }) };
}

const pages = {
  home: page("src/pages/Home.jsx", () => import("./pages/Home")),
  products: page("src/pages/Products.jsx", () => import("./pages/Products")),
  about: page("src/pages/About.jsx", () => import("./pages/About")),
  contact: page("src/pages/Contact.jsx", () => import("./pages/Contact")),
  category: page("src/pages/CategoryPage.jsx", () => import("./pages/CategoryPage")),
  product: page("src/pages/ProductPage.jsx", () => import("./pages/ProductPage")),
  notFound: page("src/pages/NotFound.jsx", () => import("./pages/NotFound")),
};

const STATIC = new Map([["", pages.home], ["products", pages.products], ["about", pages.about], ["contact", pages.contact]]);

// The one place a URL is mapped to a page. Unknown slugs fall through to NotFound.
export function matchPage(pathname) {
  const [a = "", b, ...rest] = pathname.split("/").filter(Boolean);
  if (rest.length) return pages.notFound;
  if (b === undefined) return STATIC.get(a) || (getCategoryBySlug(a) ? pages.category : pages.notFound);
  return getProductBySlug(a, b) ? pages.product : pages.notFound;
}
