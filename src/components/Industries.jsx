import React from "react";
import {
  Factory,
  Car,
  Settings,
  Wind,
  Wrench,
  Layers,
} from "lucide-react";

const industries = [
  { name: "Investment Casting", icon: Factory, accent: "#3B82F6" },
  { name: "Automotive", icon: Car, accent: "#22D3EE" },
  { name: "Rubber & Molding", icon: Layers, accent: "#10B981" },
  { name: "Metal Processing", icon: Settings, accent: "#F59E0B" },
  { name: "Renewable Energy", icon: Wind, accent: "#8B5CF6" },
  { name: "Heavy Manufacturing", icon: Wrench, accent: "#EF4444" },
];

const items = [...industries, ...industries, ...industries];

export default function Industries() {
  return (
    <section
      id="industries"
      style={{ background: "#071523", padding: "80px 0" }}
      aria-label="Industries We Serve"
    >
      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .marquee-track-1 {
          display: flex;
          width: max-content;
          animation: scrollLeft 30s linear infinite;
        }
        .marquee-track-2 {
          display: flex;
          width: max-content;
          animation: scrollRight 24s linear infinite;
        }
        .marquee-track-1:hover,
        .marquee-track-2:hover {
          animation-play-state: paused;
        }
        .ind-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 36px;
          cursor: default;
          transition: opacity 0.2s;
        }
        .ind-item:hover { opacity: 1 !important; }
        .ind-item:hover .ind-icon-wrap {
          transform: scale(1.15);
        }
        .ind-icon-wrap {
          transition: transform 0.25s ease;
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 52, padding: "0 24px" }}>
        
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800,
            color: "#F0F6FF", margin: "0 0 14px",
            letterSpacing: "-0.03em",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          Industries We Serve
        </h2>
        <p style={{ fontSize: 15, color: "#4A6A86", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
          Supporting diverse sectors with precision-engineered material solutions
          built for demanding industrial environments.
        </p>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div style={{ position: "relative", overflow: "hidden", marginBottom: 16 }}>
        <Fade />
        <div className="marquee-track-1">
          {items.map((item, i) => <Item key={i} item={item} dim={i % 2 !== 0} />)}
        </div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Fade />
        <div className="marquee-track-2">
          {[...items].reverse().map((item, i) => <Item key={i} item={item} dim={i % 2 === 0} />)}
        </div>
      </div>
    </section>
  );
}

function Item({ item, dim }) {
  const Icon = item.icon;
  return (
    <div className="ind-item" style={{ opacity: dim ? 0.4 : 1 }}>
      <div
        className="ind-icon-wrap"
        style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: `${item.accent}18`,
          border: `1px solid ${item.accent}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <Icon size={18} color={item.accent} strokeWidth={1.8} />
      </div>
      <span
        style={{
          fontSize: 14, fontWeight: 600, color: "#C8D8E8",
          whiteSpace: "nowrap", letterSpacing: "0.01em",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        {item.name}
      </span>
      <span style={{ color: item.accent, opacity: 0.35, fontSize: 8, marginLeft: 8 }}>◆</span>
    </div>
  );
}

function Fade() {
  return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to right, #071523, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to left, #071523, transparent)", zIndex: 2, pointerEvents: "none" }} />
    </>
  );
}