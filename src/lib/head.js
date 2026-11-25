import { OG_IMAGE, SITE_URL } from "./site";

const INDEX = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

const breadcrumbSchema = (crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.path}`,
  })),
});

// Single definition of every per-page <head> tag. The prerenderer turns the result into
// HTML and the browser turns it into DOM nodes, so the two can never disagree.
function headTags({ title, description, path, schema = [], breadcrumbs, noindex = false }) {
  const url = `${SITE_URL}${path}`;
  const meta = (key, name, content) => ({ tag: "meta", attrs: { [key]: name, content } });
  const tags = [
    { tag: "title", text: title },
    meta("name", "description", description),
    meta("name", "robots", noindex ? "noindex, follow" : INDEX),
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", "Chemtech Specialty"),
    meta("property", "og:locale", "en_IN"),
    meta("property", "og:title", title),
    meta("property", "og:description", description),
    meta("property", "og:image", OG_IMAGE),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", "Chemtech Specialty industrial materials"),
    meta("name", "twitter:card", "summary_large_image"),
  ];
  if (!noindex) tags.push({ tag: "link", attrs: { rel: "canonical", href: url } }, meta("property", "og:url", url));

  const graph = [...(breadcrumbs ? [breadcrumbSchema(breadcrumbs)] : []), ...schema];
  if (graph.length) {
    tags.push({
      tag: "script",
      attrs: { type: "application/ld+json" },
      text: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
    });
  }
  return tags;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function renderHead(meta) {
  return headTags(meta)
    .map(({ tag, attrs = {}, text }) => {
      const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join("");
      if (text === undefined) return `<${tag}${a} data-head>`;
      return `<${tag}${a} data-head>${tag === "script" ? text : esc(text)}</${tag}>`;
    })
    .join("\n    ");
}

export function applyHead(meta) {
  document.head.querySelectorAll("[data-head], title").forEach((el) => el.remove());
  for (const { tag, attrs = {}, text } of headTags(meta)) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    el.setAttribute("data-head", "");
    if (text !== undefined) el.textContent = text;
    document.head.appendChild(el);
  }
}
