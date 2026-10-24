// Shared quote-form logic: validation, email formatting and sending.
// Used by both the Express server (server/index.js) and other API handlers.

import { Resend } from "resend";

const LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Strip control characters (including CR/LF, which can enable header injection)
// and trim.
const clean = (v, max) =>
  String(v ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

const escapeHtml = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]
  );

export function validateQuote(body = {}) {
  const data = {
    name: clean(body.name, LIMITS.name).replace(/[\r\n]+/g, " "),
    email: clean(body.email, LIMITS.email).replace(/[\r\n]+/g, ""),
    company: clean(body.company, LIMITS.company).replace(/[\r\n]+/g, " "),
    message: clean(body.message, LIMITS.message),
  };

  const errors = {};

  if (data.name.length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!EMAIL_RE.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.message.length < 10) {
    errors.message =
      "Please describe your requirement (at least 10 characters).";
  }

  return {
    ok: Object.keys(errors).length === 0,
    data,
    errors,
  };
}

export function buildEmail(data, meta = {}) {
  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const company = data.company || "Not provided";

  const subject = `New quote request from ${data.name}${
    data.company ? ` (${data.company})` : ""
  }`;

  const text = [
    "New quote request from the Chemtech Specialty website",
    "",
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Company:  ${company}`,
    `Received: ${when} IST`,
    meta.ip ? `IP:       ${meta.ip}` : null,
    "",
    "Requirements:",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const row = (label, value) =>
    `<tr>
      <td style="padding:8px 16px 8px 0;color:#64748b;white-space:nowrap;vertical-align:top">
        ${label}
      </td>
      <td style="padding:8px 0;color:#0f172a">
        ${value}
      </td>
    </tr>`;

  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a">

      <div style="background:#0B1C2C;color:#fff;padding:18px 24px;border-radius:10px 10px 0 0">
        <div style="font-size:12px;color:#60a5fa">
          Chemtech Specialty website
        </div>

        <div style="font-size:20px;font-weight:600;margin-top:4px">
          New quote request
        </div>
      </div>

      <div style="border:1px solid #e2e8f0;border-top:0;padding:20px 24px;border-radius:0 0 10px 10px">

        <table style="border-collapse:collapse;font-size:14px">
          ${row("Name", escapeHtml(data.name))}

          ${row(
            "Email",
            `<a href="mailto:${escapeHtml(data.email)}">
              ${escapeHtml(data.email)}
            </a>`
          )}

          ${row("Company", escapeHtml(company))}

          ${row("Received", `${escapeHtml(when)} IST`)}
        </table>

        <div style="margin-top:16px;font-size:12px;color:#64748b">
          Requirements
        </div>

        <div style="margin-top:6px;padding:14px 16px;background:#f1f5f9;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">
          ${escapeHtml(data.message)}
        </div>

        <p style="margin-top:18px;font-size:12px;color:#64748b">
          Hit Reply to respond directly to ${escapeHtml(data.name)}.
        </p>

      </div>
    </div>
  `;

  return {
    subject,
    text,
    html,
  };
}

// ----------------------------------------------------
// RESEND EMAIL
// ----------------------------------------------------

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendQuoteEmail(data, meta = {}) {
  const to = process.env.MAIL_TO;

  if (!process.env.RESEND_API_KEY) {
    throw new Error("Email is not configured: set RESEND_API_KEY.");
  }

  if (!to) {
    throw new Error("Email is not configured: set MAIL_TO.");
  }

  const { subject, text, html } = buildEmail(data, meta);

  // For initial Resend testing, use onboarding@resend.dev.
  // After verifying your domain in Resend, change this to:
  // "Chemtech Specialty <info@chemtechspecialty.com>"
  const from =
    process.env.MAIL_FROM || "Chemtech Specialty <onboarding@resend.dev>";

  const { data: result, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("[quote] Resend error:", error);

    throw new Error(`Resend error: ${error.message}`);
  }

  console.log("[quote] email sent successfully:", result?.id);
}

// ----------------------------------------------------
// QUOTE REQUEST HANDLER
// ----------------------------------------------------

export async function handleQuote(body, meta = {}) {
  // Honeypot:
  // Real users never see or fill this field.
  // Pretend success so bots move on.
  if (
    body &&
    typeof body.website === "string" &&
    body.website.trim() !== ""
  ) {
    return {
      status: 200,
      body: { ok: true },
    };
  }

  const { ok, data, errors } = validateQuote(body);

  if (!ok) {
    return {
      status: 400,
      body: {
        ok: false,
        errors,
      },
    };
  }

  try {
    await sendQuoteEmail(data, meta);

    return {
      status: 200,
      body: {
        ok: true,
      },
    };
  } catch (err) {
    console.error("[quote] send failed:", err.message);

    return {
      status: 502,
      body: {
        ok: false,
        error:
          "We couldn't send your inquiry right now. Please try again or email us directly.",
      },
    };
  }
}