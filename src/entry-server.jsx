import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { HeadSink } from "./lib/headSink";
import { renderHead } from "./lib/head";
import { SITE_URL } from "./lib/site";
import { matchPage } from "./routes";
import { categories } from "./data/productData";

export { SITE_URL };

export const paths = [
  "/", "/products", "/about", "/contact",
  ...categories.flatMap((c) => [`/${c.slug}`, ...c.products.map((p) => `/${c.slug}/${p.slug}`)]),
];

export async function render(path) {
  const match = matchPage(path);
  await match.preload();
  let meta = null;
  const sink = { report: (m) => { meta = m; } };
  const html = renderToString(
    <StrictMode>
      <HeadSink.Provider value={sink}>
        <StaticRouter location={path}><App /></StaticRouter>
      </HeadSink.Provider>
    </StrictMode>
  );
  return { html, head: renderHead(meta), source: match.source };
}
