// Renders every route to static HTML from the real React app (no separate copy to keep in
// sync), inlines the stylesheet, preloads the page's chunk, and writes sitemap.xml.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const { render, paths, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")));

const manifest = JSON.parse(fs.readFileSync(path.join(dist, ".vite/manifest.json"), "utf8"));
const template = fs
  .readFileSync(path.join(dist, "index.html"), "utf8")
  .replace(/<link rel="stylesheet"[^>]*href="(\/[^"]+\.css)"[^>]*>/g, (_, href) =>
    `<style>${fs.readFileSync(path.join(dist, href), "utf8").trim()}</style>`
  );

function chunkPreloads(source) {
  const files = new Set();
  const visit = (key) => {
    const c = manifest[key];
    if (!c || files.has(c.file)) return;
    files.add(c.file);
    (c.imports || []).forEach(visit);
  };
  visit(source);
  return [...files]
    .filter((f) => !template.includes(f))
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`)
    .join("\n    ");
}

async function write(route, file) {
  const { html, head, source } = await render(route);
  const page = template
    .replace(/<title>.*?<\/title>\s*/, "")
    .replace("<!--app-head-->", () => `${head}\n    ${chunkPreloads(source)}`)
    .replace("<!--app-html-->", () => html);
  if (page.includes("<!--app-")) throw new Error(`Unfilled template slot on ${route}`);
  const target = path.join(dist, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, page);
}

for (const p of paths) await write(p, p === "/" ? "index.html" : `${p.slice(1)}/index.html`);
await write("/404", "404.html");

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n")}
</urlset>
`
);

// Cloudflare's own trailing-slash redirect is a temporary 307; these make it permanent.
fs.writeFileSync(
  path.join(dist, "_redirects"),
  paths.filter((p) => p !== "/").map((p) => `${p}/ ${p} 301\n`).join("")
);

fs.rmSync(path.join(dist, ".vite"), { recursive: true });
fs.rmSync(ssrDir, { recursive: true });
console.log(`Prerendered ${paths.length} pages + 404, wrote sitemap.xml`);
