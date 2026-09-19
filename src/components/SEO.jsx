import { useEffect } from "react";

const SITE_URL = "https://chemtechspecialty.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath = "",
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  schema = null,
  breadcrumbs = null,
}) {
  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title;
    }

    // Helper to create or update meta tags
    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to create or update link tags
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

    // Standard SEO Tags
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setLink("canonical", canonicalUrl);

    // OpenGraph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", "Chemtech Specialty");
    setMeta("property", "og:locale", "en_US");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Dynamic JSON-LD Structured Data
    const scriptId = "dynamic-seo-schema";
    let scriptEl = document.getElementById(scriptId);

    const schemaGraph = [];

    // Default Breadcrumbs if provided or auto-generated
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.item.startsWith("http") ? crumb.item : `${SITE_URL}${crumb.item}`,
        })),
      });
    }

    // Append custom page schema(s)
    if (schema) {
      if (Array.isArray(schema)) {
        schemaGraph.push(...schema);
      } else {
        schemaGraph.push(schema);
      }
    }

    if (schemaGraph.length > 0) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = scriptId;
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": schemaGraph,
      });
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, canonicalPath, ogType, ogImage, schema, breadcrumbs]);

  return null;
}
