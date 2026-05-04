/**
 * App.tsx update — add Routes for /product/[slug] and update ProductCard
 * to show "View details" link + WaitlistCapture for waitlist products
 * 
 * INSTRUCTIONS: Replace your existing App.tsx with this file.
 * The routes block at the bottom is the key addition.
 */
import { useState, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PRODUCTS, FEATURED_PRODUCTS, filterProducts } from "./data/products";
import { BRANDS } from "./data/brands";
import { ProductCard } from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All products",
  cognitive_training: "Cognitive training",
  regulatory_defense: "Regulatory defense",
  directors: "For directors",
  naming_ip: "IP & Naming",
  personal_development: "Personal development",
  hebrew_roots: "Hebrew roots",
  b2b_training: "B2B training",
  books: "Books",
  truth_verification: "Truth verification",
  accessibility: "Accessibility",
  behavioral_assessment: "Behavioral assessment",
  creative: "Creative",
  enterprise: "Enterprise",
};

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "live", label: "Live now" },
  { value: "waitlist", label: "Waitlist" },
  { value: "coming_soon", label: "Coming soon" },
];

const C = {
  bg: "#fdfaf6", white: "#fff", ink: "#1c1814", muted: "#6a6058",
  amber: "#8a5a00", amberLt: "#f5ead8", amberBd: "#d4b070",
  border: "#e4ddd6", borderLt: "#ede9e4", soft: "#f8f4ef",
};

function Store() {
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() =>
    filterProducts(PRODUCTS, { brand: brandFilter, category: categoryFilter, status: statusFilter, search }),
    [brandFilter, categoryFilter, statusFilter, search]
  );

  const liveCount = PRODUCTS.filter(p => p.status === "live").length;
  const brandCount = [...new Set(PRODUCTS.map(p => p.brand))].length;
  const activeFilters = [brandFilter, categoryFilter, statusFilter].filter(v => v !== "all").length + (search ? 1 : 0);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: "'EB Garamond',Georgia,serif" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .mono { font-family:'DM Mono','Courier New',monospace; }
        a { color:inherit; }
        input:focus { outline:2px solid ${C.amber}; outline-offset:1px; }
        @media(max-width:700px){
          .desktop-only { display:none!important; }
          .grid { grid-template-columns:1fr!important; }
          nav,.hero,.stats,.filterbar,.products { padding-left:20px!important; padding-right:20px!important; }
        }
      `}</style>

      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 48px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 18 }}>Shop Ellari</span>
          <span className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em" }}>AN ELLARI VENTURES STORE</span>
        </div>
        <div className="desktop-only" style={{ display: "flex", gap: 24 }}>
          {[["Logic Rigor", "https://logic.naci.tech"], ["KinderGurus", "https://kindergurus.com"], ["Ellari Ventures", "https://ellari.dev"], ["Contact", "mailto:hello@ellari.dev"]].map(([l, h]) => (
            <a key={l} href={h} className="mono" style={{ fontSize: 11, color: C.muted, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.amber)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>{l}</a>
          ))}
        </div>
      </nav>

      <div className="hero" style={{ padding: "64px 48px 48px", maxWidth: 1100, margin: "0 auto", borderBottom: `1px solid ${C.border}` }}>
        <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".16em", marginBottom: 16 }}>ALL PRODUCTS — ALL BRANDS</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 14 }}>Every tool in the ecosystem.</h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 560 }}>Cognitive precision training, regulatory defense, naming research, behavioral assessment, books, and B2B training — all from Ellari Ventures. Start where your pain is.</p>
      </div>

      <div className="stats" style={{ display: "flex", gap: 36, padding: "18px 48px", background: C.soft, borderBottom: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        {[[liveCount.toString(), "LIVE PRODUCTS"], [brandCount.toString(), "BRANDS"], ["$12", "STARTS FROM"], ["4", "TEXAS FACILITIES"], ["30+", "PUBLISHED BOOKS"]].map(([v, l]) => (
          <div key={l}><div className="mono" style={{ fontSize: 20, color: C.amber }}>{v}</div><div className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".1em" }}>{l}</div></div>
        ))}
      </div>

      {!search && brandFilter === "all" && categoryFilter === "all" && statusFilter === "all" && (
        <div style={{ padding: "40px 48px 0", maxWidth: 1100, margin: "0 auto" }}>
          <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".14em", marginBottom: 16 }}>★ FEATURED PRODUCTS</p>
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 1, background: C.border, marginBottom: 40 }}>
            {FEATURED_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ height: 1, background: C.border, marginBottom: 32 }} />
        </div>
      )}

      <div className="filterbar" style={{ padding: "0 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ padding: "24px 0 16px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, features, use cases..."
            style={{ flex: 1, minWidth: 240, padding: "10px 16px", fontFamily: "'EB Garamond',Georgia,serif", fontSize: 15, border: `1px solid ${C.border}`, background: C.white, color: C.ink }} />
          <button onClick={() => setShowFilters(f => !f)} className="mono"
            style={{ padding: "10px 18px", border: `1px solid ${showFilters ? C.amberBd : C.border}`, background: showFilters ? C.amberLt : "transparent", color: showFilters ? C.amber : C.muted, cursor: "pointer", fontSize: 11, letterSpacing: ".06em" }}>
            Filters {activeFilters > 0 ? `(${activeFilters})` : ""}
          </button>
          {activeFilters > 0 && (
            <button onClick={() => { setBrandFilter("all"); setCategoryFilter("all"); setStatusFilter("all"); setSearch(""); }} className="mono"
              style={{ padding: "10px 14px", border: "none", background: "none", color: C.muted, cursor: "pointer", fontSize: 11 }}>Clear all ×</button>
          )}
        </div>
        {showFilters && (
          <div style={{ paddingBottom: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "BRAND", chips: [{ value: "all", label: "All brands", accent: C.amber }, ...BRANDS.filter(b => b.status !== "proposed").map(b => ({ value: b.id, label: b.name, accent: b.color }))], current: brandFilter, set: setBrandFilter },
              { label: "CATEGORY", chips: Object.entries(CATEGORY_LABELS).map(([v, l]) => ({ value: v, label: l, accent: C.amber })), current: categoryFilter, set: setCategoryFilter },
              { label: "STATUS", chips: STATUS_FILTERS.map(f => ({ ...f, accent: C.amber })), current: statusFilter, set: setStatusFilter },
            ].map(({ label, chips, current, set }) => (
              <div key={label}>
                <p className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em", marginBottom: 8 }}>{label}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {chips.map(({ value, label: chipLabel, accent }) => (
                    <button key={value} onClick={() => set(value)} className="mono"
                      style={{ padding: "6px 14px", fontSize: 10, letterSpacing: ".06em", border: `1px solid ${current === value ? accent : "#e4ddd6"}`, background: "transparent", color: current === value ? accent : "#6a6058", cursor: "pointer" }}>
                      {chipLabel}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="products" style={{ padding: "8px 48px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".1em", marginBottom: 16 }}>
          {filtered.length} PRODUCT{filtered.length !== 1 ? "S" : ""}{activeFilters > 0 ? " (FILTERED)" : ""}
        </p>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: C.muted }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>No products match those filters.</div>
            <button onClick={() => { setBrandFilter("all"); setCategoryFilter("all"); setStatusFilter("all"); setSearch(""); }} className="mono" style={{ fontSize: 11, color: C.amber, background: "none", border: "none", cursor: "pointer" }}>Clear filters →</button>
          </div>
        ) : (
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 1, background: C.border }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      {/* Brand directory */}
      <div style={{ padding: "40px 48px", background: C.soft, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".14em", marginBottom: 20 }}>BRAND DIRECTORY</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 1, background: C.border }}>
            {BRANDS.map(b => (
              <a key={b.id} href={`https://${b.domain}`} target="_blank" rel="noopener noreferrer"
                style={{ background: C.white, padding: "16px 20px", textDecoration: "none", display: "block", transition: "background .15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.soft)}
                onMouseLeave={e => (e.currentTarget.style.background = C.white)}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 15, color: b.color }}>{b.name}</span>
                  <span className="mono" style={{ fontSize: 8, padding: "2px 6px", background: b.status === "active" ? "#e8f4ec" : "#f5ead8", color: b.status === "active" ? "#1a5030" : "#8a5a00" }}>{b.status.toUpperCase()}</span>
                </div>
                <div className="mono" style={{ fontSize: 9, color: C.muted, marginBottom: 4 }}>{b.domain}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{b.tagline}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ padding: "24px 48px", background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <span className="mono" style={{ fontSize: 10, color: C.muted }}>SHOP ELLARI — AN ELLARI VENTURES LLC SYSTEM — 2026</span>
        <div style={{ display: "flex", gap: 20 }}>
          {[["logic.naci.tech", "https://logic.naci.tech"], ["Press", "https://logic.naci.tech/press"], ["ellari.dev", "https://ellari.dev"], ["hello@ellari.dev", "mailto:hello@ellari.dev"]].map(([l, h]) => (
            <a key={l} href={h} className="mono" style={{ fontSize: 10, color: C.muted, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.amber)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ── Router shell ────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="*" element={<Store />} />
    </Routes>
  );
}
