import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoaderCircle, CircleCheck, CircleAlert, MapPin, Send } from "lucide-react";
import SEO from "../components/SEO";
import { categories, customCategory } from "../data/productData";
import { BUSINESS, businessSchema } from "../lib/site";

// Same-origin by default. Set VITE_API_URL when the API is hosted on another domain.
const API = import.meta.env.VITE_API_URL || "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: "", email: "", company: "", category: "", sample: false, message: "", website: "" };
const CRUMBS = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
const allCategories = [...categories, customCategory];
const MAP_QUERY = encodeURIComponent(`Vadner Dumala, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}`);

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", required: true, maxLength: 100 },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true, maxLength: 254 },
  { name: "company", label: "Company (optional)", type: "text", autoComplete: "organization", maxLength: 150 },
];

const inputClass = (error) =>
  `w-full rounded-lg border bg-[#0B1C2C] px-4 py-3 text-base text-white transition ${error ? "border-red-400/60" : "border-white/15 focus:border-blue-500"}`;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Please describe your requirement (at least 10 characters).";
  return e;
}

// If sending fails, the visitor can still email exactly what they typed.
const mailto = (v) =>
  `mailto:${BUSINESS.email}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(`${v.message}\n\n${v.name}\n${v.company}`.trim())}`;

function FieldError({ name, error }) {
  return error ? <p id={`${name}-err`} className="mt-1.5 text-sm text-red-400">{error}</p> : null;
}

function Map() {
  const [open, setOpen] = useState(false);
  // Google Maps is heavy, so it only loads on request.
  return open ? (
    <iframe title={`Map of ${BUSINESS.city}`} src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`} className="h-80 w-full rounded-2xl border border-white/10 grayscale" />
  ) : (
    <button type="button" onClick={() => setOpen(true)} className="flex h-44 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10">
      <MapPin className="text-blue-400" aria-hidden="true" /> Show map of {BUSINESS.city}, {BUSINESS.region}
    </button>
  );
}

export default function Contact() {
  const [params] = useSearchParams();
  const product = params.get("product");
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");
  const form = useRef(null);

  // Wake the API (it sleeps when idle) so it's ready by the time the form is filled in.
  useEffect(() => {
    fetch(`${API}/api/health`, { mode: "no-cors" }).catch(() => {});
  }, []);

  // Prefill from ?product= after hydration, so the first render matches the static HTML.
  useEffect(() => {
    if (!product) return;
    const cat = allCategories.find((c) => c.label === product || c.products.some((p) => p.title === product));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs from the URL, which isn't known at prerender time
    setValues((v) => (v.message ? v : { ...v, category: cat?.key || "", message: `Inquiry about: ${product}\n\n` }));
  }, [product]);

  const onChange = ({ target: { name, type, checked, value } }) => {
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const showErrors = (found) => {
    setErrors(found);
    form.current?.elements[Object.keys(found)[0]]?.focus();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    if (Object.keys(found).length) return showErrors(found);

    setErrors({});
    setServerError("");
    setStatus("sending");
    try {
      const res = await fetch(`${API}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }
      if (data.errors) showErrors(data.errors);
      setServerError(data.error || "Something went wrong. Please check the form and try again.");
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
    }
    setStatus("error");
  };

  const aria = (name) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `${name}-err` : undefined });
  const label = "mb-1.5 block text-sm text-gray-300";

  return (
    <div className="min-h-screen bg-[#0B1C2C] text-white">
      <SEO
        title="Contact & Request a Quote | Chemtech Specialty, Nashik"
        description="Request a quote, sample or technical data sheet for casting waxes, release agents, adhesives and coatings. Call or email Chemtech Specialty, Nashik, India."
        path="/contact"
        breadcrumbs={CRUMBS}
        schema={[businessSchema, { "@type": "ContactPage", name: "Contact Chemtech Specialty" }]}
      />

      <header className="mx-auto max-w-6xl px-6 pt-28">
        <p className="text-sm uppercase tracking-wider text-blue-400">Contact Us</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">Let’s Build Reliable Industrial Solutions Together</h1>
        <p className="mt-6 max-w-4xl leading-relaxed text-gray-300">
          Whether you are looking for investment casting waxes, releasing agents, adhesives, or custom coating solutions, our team is ready to assist you with reliable industrial materials tailored to your manufacturing requirements. We believe in building long-term relationships through quality products, technical support, and consistent service.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <section aria-labelledby="inquiry-title" className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <h2 id="inquiry-title" className="text-2xl font-semibold">Send an Inquiry</h2>
          <p className="mt-3 text-sm text-gray-300">Fill out the form and our team will get back to you shortly.</p>

          {status === "success" ? (
            <div role="status" className="mt-8 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6">
              <CircleCheck className="text-emerald-400" size={28} aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold">Inquiry received</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">Thank you. Our team has your requirements and will reply to the email address you provided.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-sm text-blue-400 underline underline-offset-4 hover:text-blue-300">Send another inquiry</button>
            </div>
          ) : (
            <form ref={form} className="relative mt-8 space-y-5" onSubmit={onSubmit} noValidate>
              {/* Honeypot: hidden from people, bots tend to fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} /></label>
              </div>

              {FIELDS.map(({ name, label: text, ...input }) => (
                <div key={name}>
                  <label htmlFor={name} className={label}>{text}</label>
                  <input id={name} name={name} {...input} {...aria(name)} value={values[name]} onChange={onChange} className={inputClass(errors[name])} />
                  <FieldError name={name} error={errors[name]} />
                </div>
              ))}

              <div>
                <label htmlFor="category" className={label}>Product category (optional)</label>
                <select id="category" name="category" value={values.category} onChange={onChange} className={inputClass()}>
                  <option value="">Select a category</option>
                  {allCategories.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={label}>Your requirements</label>
                <textarea id="message" name="message" rows="5" required maxLength={5000} {...aria("message")} value={values.message} onChange={onChange} placeholder="Application, quantity, operating conditions…" className={`${inputClass(errors.message)} resize-y`} />
                <FieldError name="message" error={errors.message} />
              </div>

              <label className="flex items-center gap-3 py-1 text-sm text-gray-300">
                <input type="checkbox" name="sample" checked={values.sample} onChange={onChange} className="h-5 w-5 accent-blue-500" />
                Request Free Material Evaluation Sample for Plant Testing
              </label>

              {status === "error" && serverError && (
                <div role="alert" className="flex gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
                  <CircleAlert size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
                  <p>{serverError} You can also <a className="underline" href={mailto(values)}>email us your inquiry</a> or call <a className="underline" href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>.</p>
                </div>
              )}

              <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                {status === "sending" ? <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending…</> : <><Send size={16} aria-hidden="true" /> Send inquiry</>}
              </button>
            </form>
          )}
        </section>

        <div className="space-y-6">
          <section aria-labelledby="info-title" className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 id="info-title" className="text-xl font-semibold text-blue-400">Contact Information</h2>
            <address className="mt-6 space-y-5 not-italic text-gray-200">
              <p><span className="block text-sm uppercase text-gray-400">Email</span><a href={`mailto:${BUSINESS.email}`} className="inline-block py-1 hover:text-blue-400">{BUSINESS.email}</a></p>
              <p><span className="block text-sm uppercase text-gray-400">Phone</span><a href={BUSINESS.phoneHref} className="inline-block py-1 hover:text-blue-400">{BUSINESS.phone}</a></p>
              <p><span className="block text-sm uppercase text-gray-400">Address</span>{BUSINESS.street}, {BUSINESS.city} - {BUSINESS.postalCode}, {BUSINESS.region}, India</p>
            </address>
          </section>
          <Map />
        </div>
      </div>
    </div>
  );
}
