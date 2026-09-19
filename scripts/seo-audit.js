/**
 * seo-audit.js
 * Comprehensive automated SEO validator for Chemtech Specialty.
 * Checks sitemap, robots.txt, canonicals, titles, meta descriptions,
 * headings, JSON-LD validity, and indexability across all generated pages.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

console.log("==========================================");
console.log("RUNNING AUTOMATED TECHNICAL SEO AUDIT");
console.log("==========================================\n");

let passed = 0;
let warnings = 0;
let errors = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    errors++;
  }
}

// 1. Robots.txt audit
console.log("1. AUDITING ROBOTS.TXT");
const robotsPath = path.join(distDir, "robots.txt");
assert(fs.existsSync(robotsPath), "robots.txt exists in dist/");
const robotsContent = fs.readFileSync(robotsPath, "utf-8");
assert(robotsContent.includes("User-agent: *"), "robots.txt specifies User-agent: *");
assert(robotsContent.includes("Allow: /"), "robots.txt specifies Allow: /");
assert(
  robotsContent.includes("Sitemap: https://chemtechspecialty.com/sitemap.xml"),
  "robots.txt specifies sitemap location"
);
assert(!robotsContent.includes("Disallow: /"), "robots.txt does not block all public pages");

// 2. Sitemap.xml audit
console.log("\n2. AUDITING SITEMAP.XML");
const sitemapPath = path.join(distDir, "sitemap.xml");
assert(fs.existsSync(sitemapPath), "sitemap.xml exists in dist/");
const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert(locMatches.length >= 24, `sitemap.xml contains ${locMatches.length} URLs (>= 24 expected)`);
assert(
  !locMatches.some((url) => url.includes("?")),
  "sitemap.xml contains zero URLs with query parameters"
);
assert(
  !locMatches.some((url) => url.includes("/404")),
  "sitemap.xml does not include 404 page"
);

// 3. Audit every page generated in dist/
console.log("\n3. AUDITING ALL GENERATED HTML PAGES");

const titlesSeen = new Map();
const descriptionsSeen = new Map();
const canonicalsSeen = new Map();

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = findHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in dist/ to audit:\n`);

htmlFiles.forEach((filePath) => {
  const relPath = path.relative(distDir, filePath);
  const content = fs.readFileSync(filePath, "utf-8");
  const is404 = relPath.includes("404");

  console.log(`Checking: ${relPath}`);

  // Title check
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : null;
  assert(title && title.length > 5, `Has non-empty <title>: "${title}"`);

  if (!is404) {
    if (titlesSeen.has(title)) {
      console.error(`  [FAIL] Duplicate title found: "${title}" also in ${titlesSeen.get(title)}`);
      errors++;
    } else {
      titlesSeen.set(title, relPath);
    }
  }

  // Description check
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  const description = descMatch ? descMatch[1] : null;
  assert(description && description.length > 20, `Has descriptive meta description (${description?.length || 0} chars)`);

  if (!is404 && description) {
    if (descriptionsSeen.has(description)) {
      console.error(`  [FAIL] Duplicate description found: "${description}" also in ${descriptionsSeen.get(description)}`);
      errors++;
    } else {
      descriptionsSeen.set(description, relPath);
    }
  }

  // Canonical check
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;
  assert(canonical && canonical.startsWith("https://chemtechspecialty.com"), `Has canonical URL: ${canonical}`);

  if (!is404 && canonical) {
    if (canonicalsSeen.has(canonical)) {
      console.error(`  [FAIL] Duplicate canonical found: ${canonical} also in ${canonicalsSeen.get(canonical)}`);
      errors++;
    } else {
      canonicalsSeen.set(canonical, relPath);
    }
  }

  // H1 check
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  assert(h1Match, `Contains an <h1> heading: "${h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "NONE"}"`);

  // Robots check
  const robotsMatch = content.match(/<meta\s+name="robots"\s+content="(.*?)"/i);
  if (is404) {
    assert(robotsMatch && robotsMatch[1].includes("noindex"), "404 page has noindex directive");
  } else {
    assert(
      !robotsMatch || !robotsMatch[1].includes("noindex"),
      "Public page is NOT blocked by noindex"
    );
  }

  // JSON-LD schema check
  const jsonLdMatches = [...content.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert(jsonLdMatches.length > 0, `Contains ${jsonLdMatches.length} JSON-LD structured data script(s)`);

  jsonLdMatches.forEach((match, idx) => {
    try {
      const parsed = JSON.parse(match[1]);
      assert(
        parsed["@context"] === "https://schema.org",
        `JSON-LD block #${idx + 1} has valid Schema.org context`
      );
    } catch (e) {
      console.error(`  [FAIL] JSON-LD block #${idx + 1} is INVALID JSON: ${e.message}`);
      errors++;
    }
  });

  console.log("");
});

console.log("==========================================");
console.log(`AUDIT COMPLETE: ${passed} passed, ${warnings} warnings, ${errors} errors`);
console.log("==========================================");

if (errors > 0) {
  process.exit(1);
}
