// Shared quote-form logic: validation, email formatting and sending.
// Uses plain fetch to the Resend API, so it has no dependencies.

const LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  message: 5000,
};

const CATEGORIES = {
  waxes: "Investment Casting Waxes",
  release: "Release Agents",
  adhesive: "Industrial Adhesives",
  coating: "Protective Coatings",
  custom: "Custom formulation",
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

function validateQuote(input) {
  const body = input && typeof input === "object" ? input : {};
  const data = {
    name: clean(body.name, LIMITS.name).replace(/[\r\n]+/g, " "),
    email: clean(body.email, LIMITS.email).replace(/[\r\n]+/g, ""),
    company: clean(body.company, LIMITS.company).replace(/[\r\n]+/g, " "),
    message: clean(body.message, LIMITS.message),
    category: Object.hasOwn(CATEGORIES, body.category) ? CATEGORIES[body.category] : "Not specified",
    sample: body.sample === true ? "Yes" : "No",
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

function buildEmail(data, meta = {}) {
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
    `Category: ${data.category}`,
    `Sample:   ${data.sample}`,
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

          ${row("Category", escapeHtml(data.category))}

          ${row("Sample requested", data.sample)}

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

async function sendQuoteEmail(data, meta) {
  const { RESEND_API_KEY, MAIL_TO = "", MAIL_FROM } = process.env;
  const to = MAIL_TO.split(",").map((v) => v.trim()).filter(Boolean);
  if (!RESEND_API_KEY) throw new Error("Email is not configured: set RESEND_API_KEY.");
  if (!to.length) throw new Error("Email is not configured: set MAIL_TO.");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: MAIL_FROM || "Chemtech Specialty <onboarding@resend.dev>",
      to,
      reply_to: data.email,
      ...buildEmail(data, meta),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
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