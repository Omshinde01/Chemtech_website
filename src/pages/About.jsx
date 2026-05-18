import React, { useEffect, useRef, useState } from "react";
import aboutImg from "../assets/hero.png";

/* ── Minimal intersection-observer hook for fade-in-up animations ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Animated counter ── */
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useFadeIn();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Fade-in section wrapper ── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const stats = [
  { value: 15, suffix: "+", label: "Years in Industry" },
  { value: 200, suffix: "+", label: "Industrial Clients" },
  { value: 5, suffix: "", label: "Product Categories" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

const values = [
  {
    number: "01",
    title: "Quality Focus",
    body: "Every product is developed with strict attention to consistency, reliability, and industrial performance standards. We never compromise on the formulation integrity that our clients depend on.",
    accent: "#3B82F6",
  },
  {
    number: "02",
    title: "Technical Expertise",
    body: "Our deep understanding of industrial applications — casting, bonding, release, and coating — enables us to create practical and effective material solutions for real manufacturing challenges.",
    accent: "#22D3EE",
  },
  {
    number: "03",
    title: "Long-Term Partnerships",
    body: "We believe in building relationships that last — through reliable products, responsive technical support, and a commitment to growing alongside our clients' evolving needs.",
    accent: "#10B981",
  },
];

const industries = [
  "Automotive",
  "Aerospace",
  "Precision Engineering",
  "Industrial Manufacturing",
  "Heavy Engineering",
  "Rubber & Composites",
];

const process = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "We begin by understanding your specific application, process environment, and performance targets — no generic assumptions.",
  },
  {
    step: "02",
    title: "Material Formulation",
    desc: "Our technical team develops or selects formulations matched to your exact operating conditions and material compatibility requirements.",
  },
  {
    step: "03",
    title: "Testing & Validation",
    desc: "Products are rigorously tested for consistency, performance, and reliability before reaching your production line.",
  },
  {
    step: "04",
    title: "Ongoing Support",
    desc: "We stay engaged after delivery — monitoring performance, resolving process issues, and refining solutions as your needs evolve.",
  },
];

export default function About() {
  return (
    <div
      style={{
        background: "#071523",
        color: "#E8EFF8",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Background grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1140,
            margin: "0 auto",
            padding: "100px 32px 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left: Text */}
          <div>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  borderRadius: 4,
                  padding: "5px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#60A5FA",
                  marginBottom: 28,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA" }} />
                About Chemtech Specialty
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                  lineHeight: 1.12,
                  margin: "0 0 24px",
                  color: "#F0F6FF",
                  letterSpacing: "-0.02em",
                }}
              >
                Precision Materials for
                <span
                  style={{
                    display: "block",
                    color: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    backgroundImage: "linear-gradient(90deg, #3B82F6, #22D3EE)",
                  }}
                >
                  Modern Industry
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                style={{
                  fontSize: 16,
                  color: "#6A8FA8",
                  lineHeight: 1.8,
                  margin: "0 0 36px",
                  maxWidth: 460,
                }}
              >
                Chemtech Specialty delivers high-performance industrial materials
                engineered for precision manufacturing — from investment casting
                waxes and release agents to adhesives and protective coatings.
              </p>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={0.3}>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {stats.map((s, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: "#3B82F6",
                        lineHeight: 1,
                      }}
                    >
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: 12, color: "#4A6A86", marginTop: 4, fontWeight: 500 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: Image */}
          <Reveal delay={0.15}>
            <div style={{ position: "relative" }}>
              {/* Decorative frame offset */}
              <div
                style={{
                  position: "absolute",
                  inset: -12,
                  border: "1px solid rgba(59,130,246,0.15)",
                  borderRadius: 20,
                  pointerEvents: "none",
                }}
              />
              <img
                src={aboutImg}
                alt="Chemtech Specialty"
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "block",
                  position: "relative",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHO WE ARE ────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            padding: "80px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <Reveal>
            <div style={{ position: "sticky", top: 80 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#3B82F6",
                  marginBottom: 16,
                }}
              >
                Who We Are
              </div>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#F0F6FF",
                  lineHeight: 1.2,
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Built on Technical Trust
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Reveal delay={0.1}>
              <p style={{ fontSize: 16, color: "#7A9BB8", lineHeight: 1.85, margin: 0 }}>
                We are a manufacturer and supplier of industrial specialty materials,
                committed to supporting businesses with reliable and high-quality solutions.
                Our products are developed to meet the demanding requirements of modern
                industrial environments where consistency and performance are critical.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: 16, color: "#7A9BB8", lineHeight: 1.85, margin: 0 }}>
                Over time, we have built a deep understanding of manufacturing processes
                and the challenges that arise within them. This knowledge allows us to
                provide practical material solutions that improve production efficiency,
                minimize process issues, and maintain high quality across every run.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              {/* Industries tag cloud */}
              <div
                style={{
                  marginTop: 8,
                  padding: "24px 28px",
                  background: "rgba(59,130,246,0.06)",
                  border: "1px solid rgba(59,130,246,0.15)",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#3B82F6",
                    marginBottom: 16,
                    opacity: 0.8,
                  }}
                >
                  Industries We Serve
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {industries.map((ind, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#A8C0D6",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 6,
                        padding: "6px 14px",
                      }}
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ───────────────────────────────────────────── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "96px 32px" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#22D3EE",
                marginBottom: 14,
              }}
            >
              Our Process
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 42px)",
                fontWeight: 700,
                color: "#F0F6FF",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              How We Work
            </h2>
          </div>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, #3B82F6, #22D3EE, transparent)",
              opacity: 0.25,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {process.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr",
                    gap: 32,
                    padding: "28px 0",
                    borderBottom:
                      i < process.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  {/* Step circle */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#60A5FA",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                      }}
                    >
                      {item.step}
                    </div>
                  </div>

                  <div style={{ paddingTop: 12 }}>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#E8EFF8",
                        margin: "0 0 10px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 15, color: "#6A8FA8", lineHeight: 1.75, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.015)",
          padding: "96px 0",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#10B981",
                  marginBottom: 14,
                }}
              >
                Our Values
              </div>
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 42px)",
                  fontWeight: 700,
                  color: "#F0F6FF",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                What Drives Us
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {values.map((val, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16,
                    padding: "32px 28px",
                    height: "100%",
                    boxSizing: "border-box",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${val.accent}44`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Top accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: val.accent,
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 42,
                      fontWeight: 700,
                      color: val.accent,
                      opacity: 0.15,
                      lineHeight: 1,
                      marginBottom: 20,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {val.number}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#E8EFF8",
                      margin: "0 0 14px",
                    }}
                  >
                    {val.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#5A7A96",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {val.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKING AHEAD (CTA) ───────────────────────────────────── */}
      <section style={{ maxWidth: 1140, margin: "0 auto", padding: "96px 32px" }}>
        <Reveal>
          <div
            style={{
              position: "relative",
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.18)",
              borderRadius: 20,
              padding: "64px 56px",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {/* Background circles */}
            <div
              style={{
                position: "absolute",
                right: -60,
                bottom: -60,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -40,
                top: -40,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#60A5FA",
                marginBottom: 20,
              }}
            >
              Looking Ahead
            </div>

            <h2
              style={{
                position: "relative",
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 700,
                color: "#F0F6FF",
                margin: "0 auto 20px",
                maxWidth: 580,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Driving Innovation Through Industrial Materials
            </h2>

            <p
              style={{
                position: "relative",
                fontSize: 15,
                color: "#6A8FA8",
                lineHeight: 1.8,
                margin: "0 auto 36px",
                maxWidth: 560,
              }}
            >
              As industries evolve, we remain committed to innovation, process
              improvement, and delivering advanced material solutions that support
              modern manufacturing. Technical advancement and long-term customer
              success are our driving goals.
            </p>

            <a
              href="/contact"
              style={{
                position: "relative",
                display: "inline-block",
                background: "#3B82F6",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                padding: "13px 32px",
                borderRadius: 8,
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2563EB";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#3B82F6";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get in Touch →
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer spacer */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 32px",
          textAlign: "center",
          fontSize: 12,
          color: "#2A4A66",
        }}
      >
        Chemtech Specialty — Engineered materials for industrial performance
      </div>
    </div>
  );
}