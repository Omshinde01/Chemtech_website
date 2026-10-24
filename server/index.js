import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { handleQuote } from "./mailer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1); // correct client IP behind Render/Railway/Nginx for rate limiting
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

// Optional: only needed if the React site is hosted on a different domain than this server.
if (process.env.CORS_ORIGIN) {
  const allowed = process.env.CORS_ORIGIN.split(",").map((s) => s.trim());
  app.use("/api", (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowed.includes(origin)) {
      res.set({ "Access-Control-Allow-Origin": origin, Vary: "Origin", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS" });
    }
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });
}

const quoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5, // 5 submissions per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests. Please try again in a few minutes." },
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/quote", quoteLimiter, async (req, res) => {
  const { status, body } = await handleQuote(req.body, { ip: req.ip });
  res.status(status).json(body);
});

// In production, serve the built React app from the same server.
const dist = path.join(__dirname, "..", "dist");
if (fs.existsSync(dist)) {
  // 301 redirect legacy query URLs to clean canonical URLs
  app.get("/products", (req, res, next) => {
    const cat = req.query.category;
    if (cat === "waxes") return res.redirect(301, "/investment-casting-wax");
    if (cat === "release") return res.redirect(301, "/release-agents");
    if (cat === "adhesive") return res.redirect(301, "/adhesives");
    if (cat === "coating") return res.redirect(301, "/coatings");
    next();
  });

  app.use(express.static(dist));

  // Serve route-specific prerendered HTML or return HTTP 404 with 404.html
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();

    const cleanPath = req.path.replace(/^\//, "").replace(/\/$/, "");
    const candidatePath = path.join(dist, cleanPath, "index.html");

    if (cleanPath && fs.existsSync(candidatePath)) {
      return res.sendFile(candidatePath);
    }

    // If requested path is not found, serve 404.html with genuine HTTP 404
    const notFoundPage = path.join(dist, "404.html");
    if (fs.existsSync(notFoundPage)) {
      return res.status(404).sendFile(notFoundPage);
    }

    res.status(404).sendFile(path.join(dist, "index.html"));
  });
}

// Malformed JSON etc.
// eslint-disable-next-line no-unused-vars -- Express needs the 4-argument signature to treat this as an error handler
app.use((err, _req, res, _next) => res.status(400).json({ ok: false, error: "Invalid request." }));

app.listen(PORT, () => console.log(`Chemtech server listening on http://localhost:${PORT}`));
