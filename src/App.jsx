import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">
        <Routes>
          {/* ── Core pages ── */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ── SEO Product Category pages ── */}
          {/* /investment-casting-wax */}
          {/* /release-agents */}
          {/* /adhesives */}
          {/* /coatings */}
          <Route path="/:categorySlug" element={<CategoryPage />} />

          {/* ── SEO Individual Product pages ── */}
          {/* /investment-casting-wax/filled-wax */}
          {/* /investment-casting-wax/unfilled-wax */}
          {/* /investment-casting-wax/water-soluble-wax */}
          {/* /investment-casting-wax/sticky-wax */}
          {/* /investment-casting-wax/repair-wax */}
          {/* /release-agents/rubber-release-agent */}
          {/* /release-agents/composite-release-agent */}
          {/* /release-agents/polyurethane-release-agent */}
          {/* /release-agents/rubber-to-metal-release */}
          {/* /release-agents/metal-to-metal-release */}
          {/* /adhesives/rubber-to-metal-adhesive */}
          {/* /adhesives/metal-to-metal-adhesive */}
          {/* /adhesives/friction-material-adhesive */}
          {/* /coatings/anti-corrosion-coating */}
          {/* /coatings/heat-resistant-coating */}
          {/* /coatings/surface-protection-coating */}
          <Route path="/:categorySlug/:productSlug" element={<ProductPage />} />

          {/* ── 404 ── */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;