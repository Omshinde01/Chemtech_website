import { Link } from "react-router-dom";
import SEO from "../components/SEO";

/**
 * 404 Not Found page.
 * Returns a user-friendly 404 page. Note: for proper HTTP 404 status
 * a server-side solution or prerender config is needed in production.
 */
export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Chemtech Specialty"
        description="The page you are looking for could not be found. Return to Chemtech Specialty to explore our investment casting waxes, release agents, adhesives, and protective coatings."
        canonicalPath="/404"
        robots="noindex, follow"
      />

      <div
        style={{
          background: "#071523",
          minHeight: "100vh",
          color: "#E8EFF8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "40px 24px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: "rgba(59,130,246,0.15)",
            lineHeight: 1,
            marginBottom: 16,
            letterSpacing: "-0.04em",
          }}
          aria-hidden="true"
        >
          404
        </div>

        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 700,
            margin: "0 0 16px",
            color: "#F0F6FF",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#6A8FA8",
            maxWidth: 480,
            lineHeight: 1.7,
            margin: "0 0 40px",
          }}
        >
          The page you are looking for doesn&apos;t exist or may have been
          moved. Explore our industrial specialty materials below.
        </p>

        <nav aria-label="Recovery navigation">
          <ul
            style={{
              listStyle: "none",
              margin: "0 0 40px",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  background: "#3B82F6",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Return to Homepage
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#E8EFF8",
                  padding: "12px 24px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Browse Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#E8EFF8",
                  padding: "12px 24px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            maxWidth: 560,
            width: "100%",
          }}
        >
          <p
            style={{ fontSize: 13, color: "#4A6A86", margin: "0 0 12px" }}
          >
            Popular pages you may be looking for:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {[
              { label: "Investment Casting Wax", to: "/investment-casting-wax" },
              { label: "Release Agents", to: "/release-agents" },
              { label: "Industrial Adhesives", to: "/adhesives" },
              { label: "Protective Coatings", to: "/coatings" },
              { label: "About Us", to: "/about" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    color: "#3B82F6",
                    textDecoration: "none",
                    fontSize: 13,
                    padding: "4px 10px",
                    background: "rgba(59,130,246,0.08)",
                    borderRadius: 4,
                    border: "1px solid rgba(59,130,246,0.2)",
                    display: "inline-block",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
