// Vercel serverless function — same logic as server/index.js, for hosting on Vercel.
// (Not used when you run the Express server.)
import { handleQuote } from "../server/mailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || undefined;
  const { status, body } = await handleQuote(req.body, { ip });
  return res.status(status).json(body);
}
