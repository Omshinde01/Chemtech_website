import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import NotFound from "./NotFound";
import { getCategoryBySlug, getProductBySlug, SITE_URL } from "../data/productData";

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

/* ─── Main Product Page ─────────────────────────────────────────────────────── */
export default function ProductPage() {
  const { categorySlug, productSlug } = useParams();
  const cat = getCategoryBySlug(categorySlug);
  const product = cat ? getProductBySlug(categorySlug, productSlug) : null;

  // Render 404 if category or product is unknown
  if (!cat || !product) {
    return <NotFound />;
  }

  const breadcrumbSchema = [
    { name: "Home", item: "/" },
    { name: "Products", item: "/products" },
    { name: cat.label, item: `/${cat.slug}` },
    { name: product.title, item: `/${cat.slug}/${product.slug}` },
  ];

  const productSchema = {
    "@type": "Product",
    name: product.title,
    description: product.intro,
    category: cat.label,
    brand: {
      "@type": "Brand",
      name: "Chemtech Specialty",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Chemtech Specialty",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: {
        "@type": "Organization",
        name: "Chemtech Specialty",
      },
    },
  };

  // Related products (same category, excluding current)
  const relatedProducts = cat.products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <SEO
        title={product.metaTitle}
        description={product.metaDescription}
        canonicalPath={`/${cat.slug}/${product.slug}`}
        breadcrumbs={breadcrumbSchema}
        schema={productSchema}
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
            zIndex: 1,
            maxWidth: 1140,
            margin: "0 auto",
            padding: "100px 32px 48px",
          }}
        >
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: cat.label, href: `/${cat.slug}` },
              { label: product.shortTitle || product.title },
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
            {product.tag}
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 20px",
              maxWidth: 720,
              color: "#F0F6FF",
              letterSpacing: "-0.025em",
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "#6A8FA8",
              maxWidth: 640,
              lineHeight: 1.8,
              margin: "0 0 32px",
            }}
          >
            {product.summary}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              to={`/contact?product=${encodeURIComponent(product.title)}`}
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
              Request a Quote for {product.shortTitle || product.title} →
            </Link>
            <Link
              to={`/${cat.slug}`}
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
              ← {cat.label}
            </Link>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            padding: "0 32px 80px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,2fr) minmax(280px,1fr)",
              gap: 40,
              alignItems: "start",
            }}
            className="product-detail-grid"
          >
            {/* ── LEFT COLUMN ── */}
            <div>
              {/* Product Overview */}
              <section aria-labelledby="overview-heading" style={{ marginBottom: 48 }}>
                <h2
                  id="overview-heading"
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#F0F6FF",
                    margin: "0 0 16px",
                    paddingBottom: 12,
                    borderBottom: `2px solid ${cat.accent}33`,
                  }}
                >
                  Product Overview
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "#A8C0D6",
                    lineHeight: 1.85,
                    margin: 0,
                  }}
                >
                  {product.intro}
                </p>
              </section>

              {/* Key Performance Features */}
              <section aria-labelledby="features-heading" style={{ marginBottom: 48 }}>
                <h2
                  id="features-heading"
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#F0F6FF",
                    margin: "0 0 16px",
                    paddingBottom: 12,
                    borderBottom: `2px solid ${cat.accent}33`,
                  }}
                >
                  Key Performance Features
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {product.points.map((point, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: cat.accentMuted,
                          border: `1px solid ${cat.accent}44`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: cat.accent,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#B8D0E8",
                          lineHeight: 1.7,
                        }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Applications */}
              <section aria-labelledby="applications-heading" style={{ marginBottom: 48 }}>
                <h2
                  id="applications-heading"
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#F0F6FF",
                    margin: "0 0 16px",
                    paddingBottom: 12,
                    borderBottom: `2px solid ${cat.accent}33`,
                  }}
                >
                  Applications &amp; Use Cases
                </h2>
                <div
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: `3px solid ${cat.accent}`,
                    borderRadius: "0 8px 8px 0",
                    padding: "16px 20px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: "#7A9BB8",
                      margin: 0,
                      lineHeight: 1.75,
                    }}
                  >
                    {product.use}
                  </p>
                </div>
              </section>

              {/* Why Choose Chemtech Specialty */}
              <section aria-labelledby="why-chemtech-heading" style={{ marginBottom: 48 }}>
                <h2
                  id="why-chemtech-heading"
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#F0F6FF",
                    margin: "0 0 16px",
                    paddingBottom: 12,
                    borderBottom: `2px solid ${cat.accent}33`,
                  }}
                >
                  Why Choose Chemtech Specialty
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  {[
                    "Consistent batch-to-batch quality",
                    "Technical support from experienced engineers",
                    "Pan-India supply from Nashik, Maharashtra",
                    "Custom formulation capability for unique requirements",
                  ].map((point, idx) => (
                    <li
                      key={idx}
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 8,
                        padding: "12px 14px",
                        fontSize: 13,
                        color: "#A8C0D6",
                        lineHeight: 1.5,
                      }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ── RIGHT COLUMN — Specs Sidebar ── */}
            <aside aria-labelledby="specs-heading">
              {/* Technical Specifications */}
              <div
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: `1px solid ${cat.accent}22`,
                  borderRadius: 12,
                  padding: "20px 22px",
                  marginBottom: 24,
                  position: "sticky",
                  top: 80,
                }}
              >
                <h2
                  id="specs-heading"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: cat.accent,
                    margin: "0 0 16px",
                  }}
                >
                  Technical Specifications
                </h2>

                <dl style={{ margin: 0 }}>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 12,
                        borderBottom:
                          idx < Object.keys(product.specs).length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                        paddingBottom: 10,
                        marginBottom: 10,
                        fontSize: 13,
                      }}
                    >
                      <dt style={{ color: "#7A9BB8", flexShrink: 0 }}>{key}</dt>
                      <dd
                        style={{
                          fontWeight: 600,
                          color: "#E8EFF8",
                          textAlign: "right",
                          margin: 0,
                        }}
                      >
                        {val}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  to={`/contact?product=${encodeURIComponent(product.title)}`}
                  style={{
                    display: "block",
                    marginTop: 20,
                    background: cat.accent,
                    color: "#071523",
                    padding: "11px 16px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Request Quote / TDS
                </Link>
              </div>

              {/* Contact info */}
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "18px 20px",
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#E8EFF8",
                    margin: "0 0 12px",
                  }}
                >
                  Direct Inquiry
                </h3>
                <address
                  style={{
                    fontStyle: "normal",
                    fontSize: 13,
                    color: "#6A8FA8",
                    lineHeight: 1.7,
                  }}
                >
                  <p style={{ margin: "0 0 6px" }}>
                    <strong style={{ color: "#A8C0D6" }}>Chemtech Specialty</strong>
                  </p>
                  <p style={{ margin: "0 0 6px" }}>
                    Shinde House, Sahyadrinagar,
                    <br />
                    Vadner Dumala, Nashik — 422401,
                    <br />
                    Maharashtra, India
                  </p>
                  <p style={{ margin: "0 0 4px" }}>
                    <a
                      href="tel:+918668758151"
                      style={{ color: "#60A5FA", textDecoration: "none" }}
                    >
                      +91 8668758151
                    </a>
                  </p>
                  <p style={{ margin: 0 }}>
                    <a
                      href="mailto:info@chemtechspecialty.com"
                      style={{ color: "#60A5FA", textDecoration: "none" }}
                    >
                      info@chemtechspecialty.com
                    </a>
                  </p>
                </address>
              </div>
            </aside>
          </div>

          {/* ── RELATED PRODUCTS ── */}
          {relatedProducts.length > 0 && (
            <section
              aria-labelledby="related-heading"
              style={{
                marginTop: 64,
                paddingTop: 48,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h2
                id="related-heading"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#F0F6FF",
                  margin: "0 0 8px",
                }}
              >
                Related {cat.label} Products
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#6A8FA8",
                  margin: "0 0 24px",
                }}
              >
                Explore other products in the{" "}
                <Link
                  to={`/${cat.slug}`}
                  style={{ color: cat.accent, textDecoration: "none" }}
                >
                  {cat.label}
                </Link>{" "}
                category.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                {relatedProducts.slice(0, 3).map((related) => (
                  <li key={related.slug}>
                    <Link
                      to={`/${cat.slug}/${related.slug}`}
                      style={{
                        display: "block",
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 10,
                        padding: "16px 18px",
                        textDecoration: "none",
                        transition: "border-color 0.2s, background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = cat.accent + "44";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.07)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.025)";
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: cat.accent,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: 8,
                        }}
                      >
                        {related.tag}
                      </div>
                      <h3
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#E8EFF8",
                          margin: "0 0 6px",
                        }}
                      >
                        {related.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#6A8FA8",
                          margin: "0 0 10px",
                          lineHeight: 1.6,
                        }}
                      >
                        {related.summary}
                      </p>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: cat.accent,
                        }}
                      >
                        View Details →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>

        <style>{`
          @media (max-width: 768px) {
            .product-detail-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
