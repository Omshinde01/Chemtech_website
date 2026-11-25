import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { matchPage } from "./routes";

export default function App() {
  const { pathname } = useLocation();
  const { Page } = matchPage(pathname);
  const element = <ErrorBoundary key={pathname}><Page /></ErrorBoundary>;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        {/* These patterns only provide useParams; matchPage decides what renders. */}
        <Routes>
          <Route path="/:categorySlug?/:productSlug?" element={element} />
          <Route path="*" element={element} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
