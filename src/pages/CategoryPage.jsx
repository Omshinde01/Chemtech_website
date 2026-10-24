import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import NotFound from "./NotFound";
import { getCategoryBySlug, SITE_URL } from "../data/productData";
import CastingJourney from "../components/CastingJourney";
import ReleaseJourney from "../components/ReleaseJourney";
import AdhesiveJourney from "../components/AdhesiveJourney";
import CoatingJourney from "../components/CoatingJourney";

/* ─── Breadcrumb component ──────────────────────────────────────────────────── */
function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "4px 6px",
          fontSize: 13,
          color: "#4A6A86",
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {idx > 0 && (
              <span aria-hidden="true" style={{ color: "#2A4A66" }}>
                /
              </span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                style={{ color: "#4A7A9B", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "#A8C0D6" }} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─── Product Card ──────────────────────────────────────────────────────────── */
function ProductCard({ product, cat }) {
  return (
    <article
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "24px 22px 20px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.045)";
        e.currentTarget.style.borderColor = cat.accent + "55";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.025)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Accent top bar */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: cat.accent,
          opacity: 0.5,
        }}
      />

      {/* Tag */}
      <div
        style={{
          display: "inline-block",
          background: cat.accentMuted,
          border: `1px solid ${cat.accent}44`,
          borderRadius: 4,
          padding: "2px 10px",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: cat.accent,
          marginBottom: 12,
        }}
      >
        {product.tag}
      </div>

      <h2
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "#E8EFF8",
          margin: "0 0 8px",
        }}
      >
        {product.title}
      </h2>

      <p
        style={{
          fontSize: 13,
          color: "#6A8FA8",
          lineHeight: 1.65,
          margin: "0 0 16px",
        }}
      >
        {product.summary}
      </p>

      {/* First 2 specs */}
      {product.specs && (
        <div
          style={{
            margin: "0 0 16px",
            padding: "8px 10px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {Object.entries(product.specs)
            .slice(0, 2)
            .map(([k, v], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#7A9BB8",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: "#4A6A86" }}>{k}:</span>
                <span style={{ fontWeight: 600, color: "#C8D8E8" }}>{v}</span>
              </div>
            ))}
        </div>
      )}

      <Link
        to={`/${cat.slug}/${product.slug}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 13,
          fontWeight: 600,
          color: cat.accent,
          textDecoration: "none",
        }}
        aria-label={`View full details for ${product.title}`}
      >
        View Full Details & Specifications
        <svg
          width="11"
          height="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </article>
  );
}

/* ─── Main Category Page ────────────────────────────────────────────────────── */
export default function CategoryPage() {
  const { categorySlug } = useParams();
  const cat = getCategoryBySlug(categorySlug);

  // If category is not found, render 404 page
  if (!cat) {
    return <NotFound />;
  }

  const breadcrumbSchema = [
    { name: "Home", item: "/" },
    { name: "Products", item: "/products" },
    { name: cat.label, item: `/${cat.slug}` },
  ];

  const itemListSchema = {
    "@type": "ItemList",
    name: cat.label,
    description: cat.description,
    numberOfItems: cat.products.length,
    itemListElement: cat.products.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.title,
      url: `${SITE_URL}/${cat.slug}/${p.slug}`,
    })),
  };

  return (
    <>
      <SEO
        title={cat.metaTitle}
        description={cat.metaDescription}
        canonicalPath={`/${cat.slug}`}
        breadcrumbs={breadcrumbSchema}
        schema={itemListSchema}
      />

      <div
        style={{
          background: "#071523",
          minHeight: "100vh",
          color: "#E8EFF8",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* ── HERO HEADER ── */}
        <header
          style={{
            position: "relative",
            maxWidth: 1140,
            margin: "0 auto",
            padding: "100px 32px 48px",
          }}
        >
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: cat.label },
            ]}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: cat.accentMuted,
              border: `1px solid ${cat.accent}44`,
              borderRadius: 4,
              padding: "4px 14px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: cat.accent,
              marginBottom: 24,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: cat.accent,
                display: "inline-block",
              }}
            />
            Product Category {cat.number}
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 20px",
              maxWidth: 700,
              color: "#F0F6FF",
              letterSpacing: "-0.025em",
            }}
          >
            {cat.label}
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#6A8FA8",
              maxWidth: 640,
              lineHeight: 1.8,
              margin: "0 0 32px",
            }}
          >
            {cat.description}
          </p>

          <div
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <Link
              to="/contact"
              style={{
                background: cat.accent,
                color: "#071523",
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Request a Quote →
            </Link>
            <Link
              to="/products"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#E8EFF8",
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              ← All Products
            </Link>
          </div>
        </header>

        {/* ── PRODUCTS GRID ── */}
        <main
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            padding: "0 32px 80px",
          }}
        >
          <h2
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#3A5A76",
              marginBottom: 24,
            }}
          >
            Available Products in This Category ({cat.products.length})
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {cat.products.map((product) => (
              <ProductCard key={product.slug} product={product} cat={cat} />
            ))}
          </div>

          {/* ── 3D INTERACTIVE SIMULATION ── */}
          <div
            style={{
              marginTop: 64,
              borderRadius: 20,
              overflow: "hidden",
              border: `1px solid ${cat.accent}33`,
            }}
          >
            {cat.slug === "investment-casting-wax" && <CastingJourney />}
            {cat.slug === "release-agents" && <ReleaseJourney />}
            {cat.slug === "adhesives" && <AdhesiveJourney />}
            {cat.slug === "coatings" && <CoatingJourney />}
          </div>

          {/* Related categories */}
          <section
            style={{
              marginTop: 64,
              paddingTop: 48,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#F0F6FF",
                margin: "0 0 8px",
              }}
            >
              Other Product Categories
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#6A8FA8",
                margin: "0 0 24px",
              }}
            >
              Chemtech Specialty supplies a complete range of industrial
              specialty materials.
            </p>
            <nav aria-label="Other product categories">
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {[
                  {
                    label: "Investment Casting Wax",
                    slug: "investment-casting-wax",
                  },
                  { label: "Release Agents", slug: "release-agents" },
                  { label: "Industrial Adhesives", slug: "adhesives" },
                  {
                    label: "Protective Coatings",
                    slug: "coatings",
                  },
                ]
                  .filter((c) => c.slug !== cat.slug)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/${c.slug}`}
                        style={{
                          color: "#7AAECB",
                          textDecoration: "none",
                          fontSize: 13,
                          padding: "8px 16px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 6,
                          display: "inline-block",
                          transition: "border-color 0.2s, color 0.2s",
                        }}
                      >
                        {c.label} →
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </section>

          {/* CTA */}
          <div
            style={{
              marginTop: 48,
              padding: "28px 32px",
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.18)",
              borderRadius: 14,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#F0F6FF",
                  margin: "0 0 6px",
                }}
              >
                Need technical data sheets or a trial sample?
              </h2>
              <p style={{ fontSize: 14, color: "#6A8FA8", margin: 0 }}>
                Our engineers are available to assist with product selection,
                technical specifications, and trial batch requests.
              </p>
            </div>
            <Link
              to={`/contact?product=${encodeURIComponent(cat.label)}`}
              style={{
                background: "#3B82F6",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                whiteSpace: "nowrap",
              }}
            >
              Contact Our Engineers →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
