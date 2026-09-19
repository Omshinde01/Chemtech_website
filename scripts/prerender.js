/**
 * prerender.js
 * Generates static, crawlable HTML pages for every route in the site.
 * Reads dist/index.html as the template and outputs route-specific HTML files
 * with dedicated <title>, <meta description>, canonical <link>, OpenGraph tags,
 * Twitter card tags, JSON-LD Schema.org graphs, and full semantic HTML.
 *
 * Runs automatically after `vite build`.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  OG_IMAGE,
  categories,
} from "../src/data/productData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

if (!fs.existsSync(distDir)) {
  console.error("Error: dist directory does not exist. Run vite build first.");
  process.exit(1);
}

const templatePath = path.join(distDir, "index.html");
const template = fs.readFileSync(templatePath, "utf-8");

// Shared Business Entity for JSON-LD schemas
const businessSchema = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "Chemtech Specialty",
  alternateName: "Chemtech Specialty Chemicals & Materials",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: OG_IMAGE,
  description:
    "Manufacturer and supplier of high-performance investment casting waxes, industrial mold release agents, rubber-to-metal bonding adhesives, and protective metal coatings.",
  telephone: "+91-8668758151",
  email: "info@chemtechspecialty.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shinde House, Sahyadrinagar, Vadner Dumala",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    postalCode: "422401",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.9975",
    longitude: "73.7898",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "AdministrativeArea", name: "Worldwide" },
  ],
  priceRange: "$$",
};

function renderNav() {
  return `
  <nav aria-label="Main Navigation" style="padding:16px 24px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;background:#071523;">
    <a href="/" style="color:#ffffff;text-decoration:none;font-size:20px;font-weight:bold;">
      Chemtech <span style="color:#3B82F6;">Specialty</span>
    </a>
    <ul style="list-style:none;display:flex;gap:20px;margin:0;padding:0;">
      <li><a href="/" style="color:#E8EFF8;text-decoration:none;">Home</a></li>
      <li><a href="/products" style="color:#E8EFF8;text-decoration:none;">Products</a></li>
      <li><a href="/investment-casting-wax" style="color:#E8EFF8;text-decoration:none;">Waxes</a></li>
      <li><a href="/release-agents" style="color:#E8EFF8;text-decoration:none;">Release Agents</a></li>
      <li><a href="/adhesives" style="color:#E8EFF8;text-decoration:none;">Adhesives</a></li>
      <li><a href="/coatings" style="color:#E8EFF8;text-decoration:none;">Coatings</a></li>
      <li><a href="/about" style="color:#E8EFF8;text-decoration:none;">About</a></li>
      <li><a href="/contact" style="color:#3B82F6;text-decoration:none;font-weight:600;">Contact / Quote</a></li>
    </ul>
  </nav>
  `;
}

function renderFooter() {
  return `
  <footer style="padding:48px 24px 32px;background:#071523;border-top:1px solid rgba(255,255,255,0.08);color:#A8C0D6;margin-top:60px;">
    <div style="max-width:1140px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:32px;">
      <div>
        <p style="color:#ffffff;font-size:18px;font-weight:bold;margin:0 0 12px;">Chemtech Specialty</p>
        <p style="font-size:13px;line-height:1.7;margin:0;">Precision investment casting waxes, industrial mold release agents, rubber-to-metal bonding adhesives, and protective metal coatings.</p>
      </div>
      <div>
        <p style="color:#ffffff;font-weight:600;margin:0 0 12px;">Product Categories</p>
        <ul style="list-style:none;padding:0;margin:0;font-size:13px;line-height:2;">
          <li><a href="/investment-casting-wax" style="color:#7AAECB;text-decoration:none;">Investment Casting Waxes</a></li>
          <li><a href="/release-agents" style="color:#7AAECB;text-decoration:none;">Release Agents</a></li>
          <li><a href="/adhesives" style="color:#7AAECB;text-decoration:none;">Industrial Adhesives</a></li>
          <li><a href="/coatings" style="color:#7AAECB;text-decoration:none;">Protective Metal Coatings</a></li>
          <li><a href="/products" style="color:#7AAECB;text-decoration:none;">All Products Catalogue</a></li>
        </ul>
      </div>
      <div>
        <p style="color:#ffffff;font-weight:600;margin:0 0 12px;">Company &amp; Support</p>
        <ul style="list-style:none;padding:0;margin:0;font-size:13px;line-height:2;">
          <li><a href="/" style="color:#7AAECB;text-decoration:none;">Home</a></li>
          <li><a href="/about" style="color:#7AAECB;text-decoration:none;">About Chemtech Specialty</a></li>
          <li><a href="/contact" style="color:#7AAECB;text-decoration:none;">Contact &amp; Request Quote</a></li>
        </ul>
      </div>
      <div>
        <p style="color:#ffffff;font-weight:600;margin:0 0 12px;">Headquarters</p>
        <address style="font-style:normal;font-size:13px;line-height:1.7;">
          Shinde House, Sahyadrinagar,<br>
          Vadner Dumala, Nashik - 422401,<br>
          Maharashtra, India<br>
          Phone: <a href="tel:+918668758151" style="color:#3B82F6;text-decoration:none;">+91 8668758151</a><br>
          Email: <a href="mailto:info@chemtechspecialty.com" style="color:#3B82F6;text-decoration:none;">info@chemtechspecialty.com</a>
        </address>
      </div>
    </div>
    <div style="max-width:1140px;margin:32px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;font-size:12px;color:#5A7A96;">
      &copy; ${new Date().getFullYear()} Chemtech Specialty. All rights reserved. Industrial precision materials.
    </div>
  </footer>
  `;
}

function renderBreadcrumbHtml(crumbs) {
  const items = crumbs
    .map((crumb, idx) => {
      const isLast = idx === crumbs.length - 1;
      return `<li style="display:inline-flex;align-items:center;gap:6px;">
        ${idx > 0 ? '<span aria-hidden="true" style="color:#2A4A66;">/</span>' : ""}
        ${
          isLast
            ? `<span aria-current="page" style="color:#A8C0D6;">${crumb.name}</span>`
            : `<a href="${crumb.item}" style="color:#4A7A9B;text-decoration:none;">${crumb.name}</a>`
        }
      </li>`;
    })
    .join("");

  return `<nav aria-label="Breadcrumb" style="margin-bottom:24px;">
    <ol style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;font-size:13px;">
      ${items}
    </ol>
  </nav>`;
}

function buildHtml({
  title,
  description,
  canonicalPath,
  contentHtml,
  schema = null,
  breadcrumbs = null,
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
}) {
  const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

  // Build JSON-LD graph
  const schemaGraph = [];
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemaGraph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.name,
        item: crumb.item.startsWith("http")
          ? crumb.item
          : `${SITE_URL}${crumb.item}`,
      })),
    });
  }
  if (schema) {
    if (Array.isArray(schema)) {
      schemaGraph.push(...schema);
    } else {
      schemaGraph.push(schema);
    }
  }

  const jsonLdString =
    schemaGraph.length > 0
      ? `<script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  },
  null,
  2
)}
</script>`
      : "";

  let html = template;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${description.replace(/"/g, "&quot;")}" />`
  );

  // Replace robots
  html = html.replace(
    /<meta\s+name="robots"\s+content=".*?"\s*\/?>/i,
    `<meta name="robots" content="${robots}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" data-managed="true" />`
  );

  // Replace OpenGraph title, description, url
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace Twitter title, description, url
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${title.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${description.replace(/"/g, "&quot;")}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:url" content="${canonicalUrl}" />`
  );

  // Replace base JSON-LD schema with page-specific schema
  if (jsonLdString) {
    html = html.replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
      jsonLdString
    );
  }

  // Inject semantic HTML inside <div id="root"></div>
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${contentHtml}</div>`
  );

  return html;
}

function writePage(routePath, htmlContent) {
  let targetFile;
  if (routePath === "/" || routePath === "") {
    targetFile = path.join(distDir, "index.html");
  } else if (routePath === "/404") {
    targetFile = path.join(distDir, "404.html");
  } else {
    const cleanPath = routePath.replace(/^\//, "");
    const pageDir = path.join(distDir, cleanPath);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }
    targetFile = path.join(pageDir, "index.html");
  }

  fs.writeFileSync(targetFile, htmlContent, "utf-8");
  console.log(`✓ Prerendered: ${routePath} -> ${path.relative(distDir, targetFile)}`);
}

// ─── Generate Route Pages ───────────────────────────────────────────────────

console.log("Starting static HTML prerender for Chemtech Specialty...");

// 1. Homepage (/)
{
  const crumbs = [{ name: "Home", item: "/" }];
  const contentHtml = `
    ${renderNav()}
    <main id="main-content" style="max-width:1140px;margin:0 auto;padding:48px 24px;color:#E8EFF8;">
      <header style="text-align:center;padding:40px 0 60px;">
        <p style="color:#3B82F6;text-transform:uppercase;letter-spacing:0.12em;font-size:12px;font-weight:700;margin:0 0 12px;">Chemtech Specialty</p>
        <h1 style="font-size:clamp(32px, 5vw, 54px);font-weight:800;color:#F0F6FF;margin:0 0 20px;line-height:1.15;">
          Advanced Waxes &amp; Industrial Coating Solutions
        </h1>
        <p style="font-size:18px;color:#7A9BB8;max-width:700px;margin:0 auto 32px;line-height:1.7;">
          Delivering high-performance materials for precision investment casting, mold release, industrial bonding, and metal surface protection across global industries.
        </p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="/contact" style="background:#3B82F6;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">Request a Quote</a>
          <a href="/products" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">Browse All Products</a>
        </div>
      </header>

      <section aria-labelledby="home-solutions" style="padding:40px 0;">
        <h2 id="home-solutions" style="font-size:28px;font-weight:700;color:#F0F6FF;text-align:center;margin:0 0 12px;">
          Our Industrial Product Solutions
        </h2>
        <p style="color:#7A9BB8;text-align:center;max-width:600px;margin:0 auto 40px;font-size:15px;">
          Engineered precision materials formulated for strict batch repeatability and high manufacturing yields.
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
          <article style="background:rgba(255,255,255,0.03);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:28px;">
            <p style="font-size:11px;font-weight:700;color:#3B82F6;text-transform:uppercase;margin:0 0 8px;">Category 01</p>
            <h3 style="font-size:20px;color:#ffffff;margin:0 0 12px;"><a href="/investment-casting-wax" style="color:#ffffff;text-decoration:none;">Investment Casting Waxes</a></h3>
            <p style="font-size:14px;color:#7A9BB8;line-height:1.7;margin:0 0 16px;">Filled wax, unfilled wax, water soluble core wax, pattern assembly sticky wax, and repair wax with ultra-clean burnout (&lt;0.015% ash).</p>
            <a href="/investment-casting-wax" style="color:#3B82F6;font-size:13px;font-weight:600;text-decoration:none;">Explore Investment Casting Waxes &rarr;</a>
          </article>

          <article style="background:rgba(255,255,255,0.03);border:1px solid rgba(34,211,238,0.3);border-radius:12px;padding:28px;">
            <p style="font-size:11px;font-weight:700;color:#22D3EE;text-transform:uppercase;margin:0 0 8px;">Category 02</p>
            <h3 style="font-size:20px;color:#ffffff;margin:0 0 12px;"><a href="/release-agents" style="color:#ffffff;text-decoration:none;">Industrial Release Agents</a></h3>
            <p style="font-size:14px;color:#7A9BB8;line-height:1.7;margin:0 0 16px;">Semi-permanent mold release agents for rubber molding, aerospace composites, polyurethane systems, and metal-to-metal die casting.</p>
            <a href="/release-agents" style="color:#22D3EE;font-size:13px;font-weight:600;text-decoration:none;">Explore Release Agents &rarr;</a>
          </article>

          <article style="background:rgba(255,255,255,0.03);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:28px;">
            <p style="font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;margin:0 0 8px;">Category 03</p>
            <h3 style="font-size:20px;color:#ffffff;margin:0 0 12px;"><a href="/adhesives" style="color:#ffffff;text-decoration:none;">Industrial Adhesives</a></h3>
            <p style="font-size:14px;color:#7A9BB8;line-height:1.7;margin:0 0 16px;">High-strength rubber-to-metal bonding agents (&gt;16 MPa), structural metal adhesives, and friction material brake pad bonding systems.</p>
            <a href="/adhesives" style="color:#F59E0B;font-size:13px;font-weight:600;text-decoration:none;">Explore Industrial Adhesives &rarr;</a>
          </article>

          <article style="background:rgba(255,255,255,0.03);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:28px;">
            <p style="font-size:11px;font-weight:700;color:#10B981;text-transform:uppercase;margin:0 0 8px;">Category 04</p>
            <h3 style="font-size:20px;color:#ffffff;margin:0 0 12px;"><a href="/coatings" style="color:#ffffff;text-decoration:none;">Protective Metal Coatings</a></h3>
            <p style="font-size:14px;color:#7A9BB8;line-height:1.7;margin:0 0 16px;">Anti-corrosion coatings (&gt;1,200 hrs salt spray pass), continuous high-temperature coatings up to 650&deg;C, and wear-resistant surface treatments.</p>
            <a href="/coatings" style="color:#10B981;font-size:13px;font-weight:600;text-decoration:none;">Explore Protective Coatings &rarr;</a>
          </article>
        </div>
      </section>

      <section aria-labelledby="home-about-brief" style="padding:40px 0;border-top:1px solid rgba(255,255,255,0.08);">
        <h2 id="home-about-brief" style="font-size:24px;font-weight:700;color:#F0F6FF;margin:0 0 16px;">About Chemtech Specialty</h2>
        <p style="font-size:15px;color:#7A9BB8;line-height:1.8;max-width:800px;margin:0 0 20px;">
          Chemtech Specialty is an Indian manufacturer and supplier of precision specialty chemical materials based in Nashik, Maharashtra. We serve foundries, automotive manufacturers, aerospace suppliers, and engineering firms across India and internationally.
        </p>
        <p style="font-size:15px;color:#7A9BB8;line-height:1.8;max-width:800px;margin:0 0 24px;">
          Our core product portfolio encompasses filled and unfilled investment casting waxes, water-soluble core waxes, high-tack pattern assembly waxes, semi-permanent mold release agents for rubber and composite manufacturing, dynamic rubber-to-metal bonding adhesives, and heat-resistant industrial coatings.
        </p>
        <a href="/about" style="color:#3B82F6;font-weight:600;text-decoration:none;">Read More About Our Capabilities &rarr;</a>
      </section>
    </main>
    ${renderFooter()}
  `;

  writePage(
    "/",
    buildHtml({
      title:
        "Chemtech Specialty | Industrial Waxes, Release Agents & Protective Coatings",
      description:
        "Chemtech Specialty manufactures high-performance investment casting waxes, industrial release agents, rubber-to-metal adhesives, and protective coatings in India. Pan-India supply from Nashik, Maharashtra.",
      canonicalPath: "/",
      contentHtml,
      schema: [
        businessSchema,
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "Chemtech Specialty",
          publisher: { "@id": `${SITE_URL}/#organization` },
          inLanguage: "en-US",
        },
      ],
      breadcrumbs: crumbs,
    })
  );
}

// 2. Products Main Catalogue (/products)
{
  const crumbs = [
    { name: "Home", item: "/" },
    { name: "Products", item: "/products" },
  ];

  const allProductItems = [];
  categories.forEach((c) => {
    c.products.forEach((p) => {
      allProductItems.push({
        "@type": "Product",
        name: p.title,
        description: p.summary,
        category: c.label,
        url: `${SITE_URL}/${c.slug}/${p.slug}`,
        brand: { "@type": "Brand", name: "Chemtech Specialty" },
        manufacturer: { "@type": "Organization", name: "Chemtech Specialty" },
      });
    });
  });

  const contentHtml = `
    ${renderNav()}
    <main id="main-content" style="max-width:1140px;margin:0 auto;padding:48px 24px;color:#E8EFF8;">
      ${renderBreadcrumbHtml(crumbs)}
      <header style="margin-bottom:48px;">
        <h1 style="font-size:clamp(28px, 4.5vw, 48px);font-weight:800;color:#F0F6FF;margin:0 0 16px;">
          Precision Materials for Industrial Manufacturing
        </h1>
        <p style="font-size:16px;color:#7A9BB8;max-width:720px;line-height:1.7;margin:0 0 24px;">
          Explore our complete catalogue of precision investment casting waxes, advanced mold release agents, industrial structural adhesives, and protective metal coatings.
        </p>
      </header>

      ${categories
        .map(
          (c) => `
        <section aria-labelledby="cat-${c.slug}" style="margin-bottom:56px;padding:32px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;margin-bottom:20px;">
            <div>
              <p style="font-size:11px;font-weight:700;color:${c.accent};text-transform:uppercase;margin:0 0 6px;">Category ${c.number}</p>
              <h2 id="cat-${c.slug}" style="font-size:26px;font-weight:700;color:#F0F6FF;margin:0 0 8px;">
                <a href="/${c.slug}" style="color:#F0F6FF;text-decoration:none;">${c.label}</a>
              </h2>
              <p style="font-size:14px;color:#7A9BB8;max-width:640px;line-height:1.6;margin:0;">${c.description}</p>
            </div>
            <a href="/${c.slug}" style="background:${c.accent};color:#071523;padding:8px 18px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:700;white-space:nowrap;">
              View Category (${c.products.length} products) &rarr;
            </a>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">
            ${c.products
              .map(
                (p) => `
              <article style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:18px;">
                <span style="font-size:10px;font-weight:700;color:${c.accent};text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:8px;">${p.tag}</span>
                <h3 style="font-size:16px;font-weight:700;color:#ffffff;margin:0 0 8px;">
                  <a href="/${c.slug}/${p.slug}" style="color:#ffffff;text-decoration:none;">${p.title}</a>
                </h3>
                <p style="font-size:12px;color:#6A8FA8;line-height:1.6;margin:0 0 12px;">${p.summary}</p>
                <a href="/${c.slug}/${p.slug}" style="color:${c.accent};font-size:12px;font-weight:600;text-decoration:none;">Full Specs &amp; Details &rarr;</a>
              </article>
            `
              )
              .join("")}
          </div>
        </section>
      `
        )
        .join("")}
    </main>
    ${renderFooter()}
  `;

  writePage(
    "/products",
    buildHtml({
      title:
        "Industrial Specialty Products Catalogue | Investment Casting Waxes, Release Agents, Adhesives & Coatings | Chemtech Specialty",
      description:
        "Browse high-performance investment casting waxes (filled, unfilled, water soluble, sticky, repair), mold release agents, rubber-to-metal adhesives, and high-temp metal coatings manufactured by Chemtech Specialty.",
      canonicalPath: "/products",
      contentHtml,
      schema: [
        {
          "@type": "ItemList",
          name: "Industrial Specialty Materials Catalogue",
          numberOfItems: allProductItems.length,
          itemListElement: allProductItems,
        },
      ],
      breadcrumbs: crumbs,
    })
  );
}

// 3. About Page (/about)
{
  const crumbs = [
    { name: "Home", item: "/" },
    { name: "About Chemtech Specialty", item: "/about" },
  ];

  const contentHtml = `
    ${renderNav()}
    <main id="main-content" style="max-width:1140px;margin:0 auto;padding:48px 24px;color:#E8EFF8;">
      ${renderBreadcrumbHtml(crumbs)}
      <header style="margin-bottom:48px;">
        <p style="color:#3B82F6;text-transform:uppercase;letter-spacing:0.12em;font-size:11px;font-weight:700;margin:0 0 12px;">About Chemtech Specialty</p>
        <h1 style="font-size:clamp(28px, 4.5vw, 48px);font-weight:800;color:#F0F6FF;margin:0 0 20px;line-height:1.2;">
          Precision Materials for Modern Industry
        </h1>
        <p style="font-size:17px;color:#7A9BB8;max-width:720px;line-height:1.8;margin:0 0 32px;">
          Chemtech Specialty delivers high-performance industrial materials engineered for precision manufacturing — from investment casting waxes and release agents to structural adhesives and protective coatings.
        </p>
      </header>

      <section aria-labelledby="about-who" style="margin-bottom:48px;">
        <h2 id="about-who" style="font-size:24px;font-weight:700;color:#F0F6FF;margin:0 0 16px;">Built on Technical Trust</h2>
        <p style="font-size:15px;color:#7A9BB8;line-height:1.8;max-width:800px;margin:0 0 16px;">
          We are a manufacturer and supplier of industrial specialty materials based in Nashik, Maharashtra, committed to supporting manufacturing businesses with reliable, high-quality material formulations. Our products are formulated to meet the demanding requirements of modern foundries, automotive component producers, and precision engineering works.
        </p>
        <p style="font-size:15px;color:#7A9BB8;line-height:1.8;max-width:800px;margin:0;">
          With deep practical knowledge across lost-wax investment casting, mold demolding, elastomeric bonding, and corrosion protection, our technical team works closely with customers to improve production efficiency, minimize defect scrap, and ensure consistent batch-to-batch repeatability.
        </p>
      </section>

      <section aria-labelledby="about-process" style="margin-bottom:48px;padding:32px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
        <h2 id="about-process" style="font-size:24px;font-weight:700;color:#F0F6FF;margin:0 0 24px;">How We Work</h2>
        <ol style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;">
          <li style="padding:16px;background:rgba(255,255,255,0.02);border-radius:8px;">
            <p style="color:#3B82F6;font-size:13px;font-weight:700;margin:0 0 8px;">Step 01</p>
            <h3 style="font-size:16px;color:#ffffff;margin:0 0 8px;">Requirement Analysis</h3>
            <p style="font-size:13px;color:#7A9BB8;line-height:1.6;margin:0;">We understand your specific application, operating temperatures, substrate materials, and performance criteria.</p>
          </li>
          <li style="padding:16px;background:rgba(255,255,255,0.02);border-radius:8px;">
            <p style="color:#22D3EE;font-size:13px;font-weight:700;margin:0 0 8px;">Step 02</p>
            <h3 style="font-size:16px;color:#ffffff;margin:0 0 8px;">Material Formulation</h3>
            <p style="font-size:13px;color:#7A9BB8;line-height:1.6;margin:0;">Our technical team recommends or custom-formulates products matched to your line setup and cycle times.</p>
          </li>
          <li style="padding:16px;background:rgba(255,255,255,0.02);border-radius:8px;">
            <p style="color:#10B981;font-size:13px;font-weight:700;margin:0 0 8px;">Step 03</p>
            <h3 style="font-size:16px;color:#ffffff;margin:0 0 8px;">Testing &amp; Validation</h3>
            <p style="font-size:13px;color:#7A9BB8;line-height:1.6;margin:0;">Products undergo stringent laboratory testing for ash content, adhesion strength, or thermal limits before dispatch.</p>
          </li>
          <li style="padding:16px;background:rgba(255,255,255,0.02);border-radius:8px;">
            <p style="color:#F59E0B;font-size:13px;font-weight:700;margin:0 0 8px;">Step 04</p>
            <h3 style="font-size:16px;color:#ffffff;margin:0 0 8px;">Ongoing Technical Support</h3>
            <p style="font-size:13px;color:#7A9BB8;line-height:1.6;margin:0;">We provide continuous application troubleshooting and batch tracking to support smooth factory operations.</p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="about-contact-cta" style="text-align:center;padding:40px 24px;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:14px;">
        <h2 id="about-contact-cta" style="font-size:24px;font-weight:700;color:#F0F6FF;margin:0 0 12px;">Work With Chemtech Specialty</h2>
        <p style="font-size:15px;color:#7A9BB8;max-width:540px;margin:0 auto 24px;line-height:1.7;">
          Contact our technical team to discuss your process requirements or request evaluation samples.
        </p>
        <a href="/contact" style="background:#3B82F6;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Get in Touch &rarr;</a>
      </section>
    </main>
    ${renderFooter()}
  `;

  writePage(
    "/about",
    buildHtml({
      title:
        "About Chemtech Specialty | Industrial Material Solutions | Nashik, India",
      description:
        "Learn about Chemtech Specialty, a manufacturer of industrial specialty materials including investment casting waxes, release agents, adhesives, and protective coatings. Based in Nashik, Maharashtra.",
      canonicalPath: "/about",
      contentHtml,
      schema: [
        businessSchema,
        {
          "@type": "AboutPage",
          "@id": `${SITE_URL}/about#webpage`,
          url: `${SITE_URL}/about`,
          name: "About Chemtech Specialty",
        },
      ],
      breadcrumbs: crumbs,
    })
  );
}

// 4. Contact Page (/contact)
{
  const crumbs = [
    { name: "Home", item: "/" },
    { name: "Contact & Request a Quote", item: "/contact" },
  ];

  const contentHtml = `
    ${renderNav()}
    <main id="main-content" style="max-width:1140px;margin:0 auto;padding:48px 24px;color:#E8EFF8;">
      ${renderBreadcrumbHtml(crumbs)}
      <header style="margin-bottom:48px;">
        <p style="color:#3B82F6;text-transform:uppercase;letter-spacing:0.12em;font-size:11px;font-weight:700;margin:0 0 12px;">Contact Us</p>
        <h1 style="font-size:clamp(28px, 4.5vw, 48px);font-weight:800;color:#F0F6FF;margin:0 0 20px;line-height:1.2;">
          Let's Build Reliable Industrial Solutions Together
        </h1>
        <p style="font-size:16px;color:#7A9BB8;max-width:700px;line-height:1.8;margin:0;">
          Whether you require investment casting waxes, industrial release agents, bonding adhesives, or protective coatings, our team is ready to assist you with reliable materials tailored to your manufacturing requirements.
        </p>
      </header>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:40px;">
        <section aria-labelledby="contact-inquiry-heading" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:32px;">
          <h2 id="contact-inquiry-heading" style="font-size:22px;font-weight:700;color:#F0F6FF;margin:0 0 12px;">Send an Inquiry</h2>
          <p style="font-size:13px;color:#7A9BB8;line-height:1.6;margin:0 0 24px;">Complete the form below or contact our sales and technical team directly for trial samples and technical data sheets.</p>
          <form style="display:flex;flex-direction:column;gap:16px;">
            <div>
              <label for="contact-name" style="display:block;font-size:12px;font-weight:600;color:#A8C0D6;margin-bottom:6px;">Full Name *</label>
              <input id="contact-name" type="text" name="name" placeholder="Your Name" style="width:100%;padding:10px 14px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.2);color:#ffffff;box-sizing:border-box;" required />
            </div>
            <div>
              <label for="contact-email" style="display:block;font-size:12px;font-weight:600;color:#A8C0D6;margin-bottom:6px;">Email Address *</label>
              <input id="contact-email" type="email" name="email" placeholder="Your Business Email" style="width:100%;padding:10px 14px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.2);color:#ffffff;box-sizing:border-box;" required />
            </div>
            <div>
              <label for="contact-company" style="display:block;font-size:12px;font-weight:600;color:#A8C0D6;margin-bottom:6px;">Company Name</label>
              <input id="contact-company" type="text" name="company" placeholder="Company / Foundry Name" style="width:100%;padding:10px 14px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.2);color:#ffffff;box-sizing:border-box;" />
            </div>
            <div>
              <label for="contact-message" style="display:block;font-size:12px;font-weight:600;color:#A8C0D6;margin-bottom:6px;">Requirement Details *</label>
              <textarea id="contact-message" name="message" rows="4" placeholder="Specify products of interest (e.g. Filled Wax, Rubber Release Agent, Rubber to Metal Adhesive) and application details..." style="width:100%;padding:10px 14px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);background:rgba(0,0,0,0.2);color:#ffffff;box-sizing:border-box;" required></textarea>
            </div>
            <button type="submit" style="background:#3B82F6;color:#ffffff;padding:12px 24px;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Send Inquiry &rarr;</button>
          </form>
        </section>

        <section aria-labelledby="contact-info-heading" style="display:flex;flex-direction:column;gap:24px;">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:32px;">
            <h2 id="contact-info-heading" style="font-size:22px;font-weight:700;color:#3B82F6;margin:0 0 20px;">Contact Information</h2>
            <div style="display:flex;flex-direction:column;gap:16px;font-size:14px;">
              <div>
                <p style="color:#5A7A96;font-size:11px;font-weight:700;text-transform:uppercase;margin:0 0 4px;">Direct Phone / Inquiries</p>
                <a href="tel:+918668758151" style="color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;">+91 8668758151</a>
              </div>
              <div>
                <p style="color:#5A7A96;font-size:11px;font-weight:700;text-transform:uppercase;margin:0 0 4px;">Email</p>
                <a href="mailto:info@chemtechspecialty.com" style="color:#ffffff;text-decoration:none;font-size:16px;">info@chemtechspecialty.com</a>
              </div>
              <div>
                <p style="color:#5A7A96;font-size:11px;font-weight:700;text-transform:uppercase;margin:0 0 4px;">Headquarters Address</p>
                <address style="font-style:normal;color:#A8C0D6;line-height:1.7;">
                  Chemtech Specialty<br>
                  Shinde House, Sahyadrinagar,<br>
                  Vadner Dumala, Nashik - 422401,<br>
                  Maharashtra, India
                </address>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    ${renderFooter()}
  `;

  writePage(
    "/contact",
    buildHtml({
      title:
        "Contact Chemtech Specialty | Request a Quote | Nashik, India",
      description:
        "Contact Chemtech Specialty for investment casting waxes, release agents, adhesives, and protective coatings. Our engineers are available for technical consultation, sample requests, and quotes.",
      canonicalPath: "/contact",
      contentHtml,
      schema: [
        businessSchema,
        {
          "@type": "ContactPage",
          "@id": `${SITE_URL}/contact#webpage`,
          url: `${SITE_URL}/contact`,
          name: "Contact Chemtech Specialty",
        },
      ],
      breadcrumbs: crumbs,
    })
  );
}

// 5. Category Pages (4 categories)
categories.forEach((cat) => {
  const crumbs = [
    { name: "Home", item: "/" },
    { name: "Products", item: "/products" },
    { name: cat.label, item: `/${cat.slug}` },
  ];

  const itemList = cat.products.map((p, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: p.title,
    url: `${SITE_URL}/${cat.slug}/${p.slug}`,
  }));

  const contentHtml = `
    ${renderNav()}
    <main id="main-content" style="max-width:1140px;margin:0 auto;padding:48px 24px;color:#E8EFF8;">
      ${renderBreadcrumbHtml(crumbs)}
      <header style="margin-bottom:48px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${cat.accent};margin-bottom:12px;display:inline-block;">Product Category ${cat.number}</span>
        <h1 style="font-size:clamp(28px, 4.5vw, 48px);font-weight:800;color:#F0F6FF;margin:0 0 16px;line-height:1.2;">
          ${cat.label}
        </h1>
        <p style="font-size:16px;color:#7A9BB8;max-width:700px;line-height:1.8;margin:0 0 28px;">
          ${cat.description}
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/contact" style="background:${cat.accent};color:#071523;padding:10px 22px;border-radius:6px;text-decoration:none;font-weight:700;font-size:13px;">Request a Quote &rarr;</a>
          <a href="/products" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#E8EFF8;padding:10px 22px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">&larr; All Products</a>
        </div>
      </header>

      <section aria-labelledby="cat-products-list" style="margin-bottom:56px;">
        <h2 id="cat-products-list" style="font-size:20px;font-weight:700;color:#F0F6FF;margin:0 0 24px;">
          Available Products in This Category (${cat.products.length})
        </h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;">
          ${cat.products
            .map(
              (p) => `
            <article style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;">
              <span style="display:inline-block;background:${cat.accentMuted};border:1px solid ${cat.accent}44;border-radius:4px;padding:2px 10px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${cat.accent};margin-bottom:12px;">${p.tag}</span>
              <h3 style="font-size:18px;font-weight:700;color:#ffffff;margin:0 0 8px;">
                <a href="/${cat.slug}/${p.slug}" style="color:#ffffff;text-decoration:none;">${p.title}</a>
              </h3>
              <p style="font-size:13px;color:#6A8FA8;line-height:1.65;margin:0 0 16px;">${p.summary}</p>

              ${
                p.specs
                  ? `
                <div style="margin:0 0 16px;padding:8px 10px;background:rgba(0,0,0,0.25);border-radius:6px;font-size:11px;">
                  ${Object.entries(p.specs)
                    .slice(0, 2)
                    .map(
                      ([k, v]) => `
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;color:#7A9BB8;">
                      <span style="color:#4A6A86;">${k}:</span>
                      <span style="color:#C8D8E8;font-weight:600;">${v}</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              `
                  : ""
              }

              <a href="/${cat.slug}/${p.slug}" style="color:${cat.accent};font-size:13px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                View Full Details &amp; Specifications &rarr;
              </a>
            </article>
          `
            )
            .join("")}
        </div>
      </section>

      <section aria-labelledby="other-categories" style="padding-top:40px;border-top:1px solid rgba(255,255,255,0.08);">
        <h2 id="other-categories" style="font-size:18px;font-weight:700;color:#F0F6FF;margin:0 0 16px;">Other Product Categories</h2>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:12px;">
          ${categories
            .filter((c) => c.slug !== cat.slug)
            .map(
              (c) => `
            <li>
              <a href="/${c.slug}" style="color:#7AAECB;text-decoration:none;font-size:13px;padding:8px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;display:inline-block;">
                ${c.label} &rarr;
              </a>
            </li>
          `
            )
            .join("")}
        </ul>
      </section>
    </main>
    ${renderFooter()}
  `;

  writePage(
    `/${cat.slug}`,
    buildHtml({
      title: cat.metaTitle,
      description: cat.metaDescription,
      canonicalPath: `/${cat.slug}`,
      contentHtml,
      schema: [
        {
          "@type": "ItemList",
          name: cat.label,
          description: cat.description,
          numberOfItems: cat.products.length,
          itemListElement: itemList,
        },
      ],
      breadcrumbs: crumbs,
    })
  );

  // 6. Individual Product Pages for this category
  cat.products.forEach((product) => {
    const productCrumbs = [
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: cat.label, item: `/${cat.slug}` },
      { name: product.shortTitle || product.title, item: `/${cat.slug}/${product.slug}` },
    ];

    const related = cat.products.filter((p) => p.slug !== product.slug);

    const productSchema = {
      "@type": "Product",
      name: product.title,
      description: product.intro,
      category: cat.label,
      brand: { "@type": "Brand", name: "Chemtech Specialty" },
      manufacturer: {
        "@type": "Organization",
        name: "Chemtech Specialty",
        url: SITE_URL,
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "INR",
        seller: { "@type": "Organization", name: "Chemtech Specialty" },
      },
    };

    const productContentHtml = `
      ${renderNav()}
      <main id="main-content" style="max-width:1140px;margin:0 auto;padding:48px 24px;color:#E8EFF8;">
        ${renderBreadcrumbHtml(productCrumbs)}
        <header style="margin-bottom:40px;">
          <span style="display:inline-block;background:${cat.accentMuted};border:1px solid ${cat.accent}44;border-radius:4px;padding:2px 10px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${cat.accent};margin-bottom:12px;">${product.tag}</span>
          <h1 style="font-size:clamp(28px, 4.5vw, 48px);font-weight:800;color:#F0F6FF;margin:0 0 16px;line-height:1.2;">
            ${product.title}
          </h1>
          <p style="font-size:16px;color:#7A9BB8;max-width:700px;line-height:1.8;margin:0 0 24px;">
            ${product.summary}
          </p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="/contact?product=${encodeURIComponent(product.title)}" style="background:${cat.accent};color:#071523;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
              Request a Quote for ${product.shortTitle || product.title} &rarr;
            </a>
            <a href="/${cat.slug}" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#E8EFF8;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
              &larr; All ${cat.label}
            </a>
          </div>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:40px;align-items:start;">
          <div>
            <section aria-labelledby="product-overview-h2" style="margin-bottom:36px;">
              <h2 id="product-overview-h2" style="font-size:22px;font-weight:700;color:#F0F6FF;margin:0 0 16px;border-bottom:2px solid ${cat.accent}33;padding-bottom:10px;">
                Product Overview
              </h2>
              <p style="font-size:15px;color:#A8C0D6;line-height:1.85;margin:0;">${product.intro}</p>
            </section>

            <section aria-labelledby="product-features-h2" style="margin-bottom:36px;">
              <h2 id="product-features-h2" style="font-size:22px;font-weight:700;color:#F0F6FF;margin:0 0 16px;border-bottom:2px solid ${cat.accent}33;padding-bottom:10px;">
                Key Performance Features
              </h2>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;">
                ${product.points
                  .map(
                    (pt) => `
                  <li style="display:flex;align-items:flex-start;gap:10px;font-size:14px;color:#B8D0E8;line-height:1.7;">
                    <span aria-hidden="true" style="color:${cat.accent};margin-top:2px;">&#10003;</span>
                    <span>${pt}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </section>

            <section aria-labelledby="product-applications-h2" style="margin-bottom:36px;">
              <h2 id="product-applications-h2" style="font-size:22px;font-weight:700;color:#F0F6FF;margin:0 0 16px;border-bottom:2px solid ${cat.accent}33;padding-bottom:10px;">
                Applications &amp; Industries Served
              </h2>
              <div style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-left:3px solid ${cat.accent};border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="font-size:14px;color:#7A9BB8;line-height:1.75;margin:0;">${product.use}</p>
              </div>
            </section>

            <section aria-labelledby="why-choose-h2" style="margin-bottom:36px;">
              <h2 id="why-choose-h2" style="font-size:22px;font-weight:700;color:#F0F6FF;margin:0 0 16px;border-bottom:2px solid ${cat.accent}33;padding-bottom:10px;">
                Why Choose Chemtech Specialty
              </h2>
              <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
                <li style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 14px;font-size:13px;color:#A8C0D6;">Consistent batch-to-batch quality</li>
                <li style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 14px;font-size:13px;color:#A8C0D6;">Direct engineer-to-engineer consultation</li>
                <li style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 14px;font-size:13px;color:#A8C0D6;">Pan-India supply from Nashik, Maharashtra</li>
                <li style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 14px;font-size:13px;color:#A8C0D6;">Custom chemical synthesis capability</li>
              </ul>
            </section>
          </div>

          <aside aria-labelledby="product-specs-h2">
            <div style="background:rgba(0,0,0,0.25);border:1px solid ${cat.accent}33;border-radius:12px;padding:22px;">
              <h2 id="product-specs-h2" style="font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${cat.accent};margin:0 0 16px;">
                Technical Specifications
              </h2>
              <dl style="margin:0;">
                ${Object.entries(product.specs)
                  .map(
                    ([k, v]) => `
                  <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;gap:12px;">
                    <dt style="color:#7A9BB8;flex-shrink:0;">${k}</dt>
                    <dd style="font-weight:600;color:#E8EFF8;text-align:right;margin:0;">${v}</dd>
                  </div>
                `
                  )
                  .join("")}
              </dl>
              <a href="/contact?product=${encodeURIComponent(product.title)}" style="display:block;margin-top:20px;background:${cat.accent};color:#071523;padding:11px 16px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;text-align:center;">
                Request Quote / TDS
              </a>
            </div>

            <div style="margin-top:24px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px;">
              <h3 style="font-size:14px;font-weight:700;color:#E8EFF8;margin:0 0 10px;">Direct Supply &amp; Inquiries</h3>
              <address style="font-style:normal;font-size:13px;color:#6A8FA8;line-height:1.7;">
                <strong style="color:#A8C0D6;">Chemtech Specialty</strong><br>
                Shinde House, Sahyadrinagar,<br>
                Vadner Dumala, Nashik - 422401,<br>
                Maharashtra, India<br>
                Phone: <a href="tel:+918668758151" style="color:#3B82F6;text-decoration:none;">+91 8668758151</a><br>
                Email: <a href="mailto:info@chemtechspecialty.com" style="color:#3B82F6;text-decoration:none;">info@chemtechspecialty.com</a>
              </address>
            </div>
          </aside>
        </div>

        ${
          related.length > 0
            ? `
          <section aria-labelledby="related-products-h2" style="margin-top:60px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.08);">
            <h2 id="related-products-h2" style="font-size:22px;font-weight:700;color:#F0F6FF;margin:0 0 8px;">
              Related ${cat.label} Products
            </h2>
            <p style="font-size:14px;color:#6A8FA8;margin:0 0 20px;">Explore other formulations in this category.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;">
              ${related
                .slice(0, 3)
                .map(
                  (r) => `
                <article style="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:16px;">
                  <span style="font-size:10px;font-weight:700;color:${cat.accent};text-transform:uppercase;display:inline-block;margin-bottom:6px;">${r.tag}</span>
                  <h3 style="font-size:15px;font-weight:700;color:#ffffff;margin:0 0 6px;">
                    <a href="/${cat.slug}/${r.slug}" style="color:#ffffff;text-decoration:none;">${r.title}</a>
                  </h3>
                  <p style="font-size:12px;color:#6A8FA8;margin:0 0 10px;line-height:1.5;">${r.summary}</p>
                  <a href="/${cat.slug}/${r.slug}" style="color:${cat.accent};font-size:12px;font-weight:600;text-decoration:none;">View Details &rarr;</a>
                </article>
              `
                )
                .join("")}
            </div>
          </section>
        `
            : ""
        }
      </main>
      ${renderFooter()}
    `;

    writePage(
      `/${cat.slug}/${product.slug}`,
      buildHtml({
        title: product.metaTitle,
        description: product.metaDescription,
        canonicalPath: `/${cat.slug}/${product.slug}`,
        contentHtml: productContentHtml,
        schema: [productSchema],
        breadcrumbs: productCrumbs,
      })
    );
  });
});

// 7. 404 Page (/404)
{
  const contentHtml = `
    ${renderNav()}
    <main id="main-content" style="max-width:800px;margin:80px auto;padding:48px 24px;text-align:center;color:#E8EFF8;">
      <p style="font-size:96px;font-weight:800;color:rgba(59,130,246,0.2);line-height:1;margin:0 0 16px;">404</p>
      <h1 style="font-size:32px;font-weight:700;color:#F0F6FF;margin:0 0 16px;">Page Not Found</h1>
      <p style="font-size:16px;color:#7A9BB8;margin:0 0 32px;line-height:1.7;">
        The requested page does not exist. Explore our industrial specialty materials below:
      </p>
      <ul style="list-style:none;padding:0;margin:0 0 32px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
        <li><a href="/" style="background:#3B82F6;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Home</a></li>
        <li><a href="/products" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">All Products</a></li>
        <li><a href="/investment-casting-wax" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Investment Casting Wax</a></li>
        <li><a href="/release-agents" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Release Agents</a></li>
        <li><a href="/adhesives" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Adhesives</a></li>
        <li><a href="/coatings" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Coatings</a></li>
        <li><a href="/contact" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Contact Us</a></li>
      </ul>
    </main>
    ${renderFooter()}
  `;

  writePage(
    "/404",
    buildHtml({
      title: "Page Not Found | Chemtech Specialty",
      description:
        "The page you are looking for could not be found. Return to Chemtech Specialty to explore our precision waxes, release agents, adhesives, and coatings.",
      canonicalPath: "/404",
      contentHtml,
      robots: "noindex, follow",
    })
  );
}

console.log("Static HTML prerendering completed successfully!");
