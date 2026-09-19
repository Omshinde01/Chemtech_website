import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LoaderCircle, CircleCheck, CircleAlert, Send } from "lucide-react";
import SEO from "../components/SEO";

// Same-origin by default. Set VITE_API_URL only if the API is hosted on another domain.
const API_URL = `${import.meta.env.VITE_API_URL || ""}/api/quote`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "w-full bg-transparent border rounded-lg px-4 py-3 outline-none focus:bg-white/5 transition duration-300";

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Please describe your requirement (at least 10 characters).";
  return e;
}

function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
}

const Contact = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get("product") || "";

  const [values, setValues] = useState({ name: "", email: "", company: "", message: prefilledProduct ? `Inquiry about: ${prefilledProduct}\n\n` : "", website: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ name: "", email: "", company: "", message: "", website: "" });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error || "Something went wrong. Please check the form and try again.");
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
    }
    setStatus("error");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  return (
    <>
      <SEO
        title="Contact Chemtech Specialty | Request a Quote | Nashik, India"
        description="Contact Chemtech Specialty for investment casting waxes, release agents, adhesives, and protective coatings. Our engineers are available for technical consultation, sample requests, and quotes."
        canonicalPath="/contact"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Contact & Request a Quote", item: "/contact" },
        ]}
      />
    <div className="bg-[#0B1C2C] text-white min-h-screen">

      {/* TOP INTRO */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 pt-24"
      >

        <p className="text-blue-400 text-sm uppercase tracking-wider">
          Contact Us
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
          Let’s Build Reliable Industrial Solutions Together
        </h1>

        <p className="mt-6 text-gray-400 max-w-4xl leading-relaxed">
          Whether you are looking for investment casting waxes,
          releasing agents, adhesives, or custom coating solutions,
          our team is ready to assist you with reliable industrial
          materials tailored to your manufacturing requirements.
          We believe in building long-term relationships through
          quality products, technical support, and consistent service.
        </p>

      </motion.section>

      {/* MAIN SECTION */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12"
      >

        {/* LEFT — FORM */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
          className="border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-md"
        >

          <h2 className="text-2xl font-semibold">
            Send an Inquiry
          </h2>

          <p className="text-gray-400 mt-3 text-sm">
            Fill out the form and our team will get back to you shortly.
          </p>

          {status === "success" ? (
            <div role="status" className="mt-8 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-6">
              <CircleCheck className="text-emerald-400" size={28} />
              <h3 className="mt-3 text-lg font-semibold">Inquiry received</h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                Thank you. Our team has your requirements and will reply to the email address you provided.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-5 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
          <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>

            {/* Honeypot: hidden from people, bots tend to fill it */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
              </label>
            </div>

            {[
              { name: "name", type: "text", placeholder: "Your Name", autoComplete: "name" },
              { name: "email", type: "email", placeholder: "Your Email", autoComplete: "email" },
              { name: "company", type: "text", placeholder: "Company Name (optional)", autoComplete: "organization" },
            ].map((f) => (
              <div key={f.name}>
                <input
                  {...f}
                  aria-label={f.placeholder}
                  aria-invalid={!!errors[f.name]}
                  aria-describedby={errors[f.name] ? `${f.name}-err` : undefined}
                  value={values[f.name]}
                  onChange={onChange}
                  maxLength={f.name === "email" ? 254 : 150}
                  className={`${inputClass} ${errors[f.name] ? "border-red-400/60" : "border-white/10 focus:border-blue-500"}`}
                />
                {errors[f.name] && <p id={`${f.name}-err`} className="mt-1.5 text-sm text-red-400">{errors[f.name]}</p>}
              </div>
            ))}

            <div>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us about your requirements..."
                aria-label="Your requirements"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-err" : undefined}
                value={values.message}
                onChange={onChange}
                maxLength={5000}
                className={`${inputClass} resize-none ${errors.message ? "border-red-400/60" : "border-white/10 focus:border-blue-500"}`}
              ></textarea>
              {errors.message && <p id="message-err" className="mt-1.5 text-sm text-red-400">{errors.message}</p>}
            </div>

            {status === "error" && serverError && (
              <div role="alert" className="flex gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
                <CircleAlert size={18} className="mt-0.5 shrink-0 text-red-400" />
                <p>
                  {serverError} You can also email us at{" "}
                  <a className="underline" href="mailto:info@chemtechspecialty.com">info@chemtechspecialty.com</a>.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <><LoaderCircle size={18} className="animate-spin" /> Sending…</>
              ) : (
                <><Send size={16} /> Send inquiry</>
              )}
            </button>

          </form>
          )}

        </motion.div>

        {/* RIGHT — MAP + INFO */}
        <div className="space-y-6">

          {/* MAP */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 rounded-2xl overflow-hidden bg-white/5"
          >

            <iframe
              title="map"
              src="https://www.google.com/maps?q=Nashik,Maharashtra&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              className="grayscale"
            ></iframe>

          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-md"
          >

            <h3 className="text-xl font-semibold text-blue-400">
              Contact Information
            </h3>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-gray-500 text-sm uppercase">
                  Email
                </p>

                <p className="mt-1 text-gray-300">
                  info@chemtechspecialty.com
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm uppercase">
                  Phone
                </p>

                <p className="mt-1 text-gray-300">
                  +91 86687 58151
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm uppercase">
                  Address
                </p>

                <p className="mt-1 text-gray-300 leading-relaxed">
                  Nashik, Maharashtra, India
                </p>
              </div>

            </div>

          </motion.div>

        </div>

      </motion.section>

    </div>
    </>
  );
};

export default Contact;