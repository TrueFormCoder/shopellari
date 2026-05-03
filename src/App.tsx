/**
 * App.tsx — shopellari.com store
 * Multi-brand product catalog with filtering, search, and featured row.
 */
import { useState, useMemo } from "react";
import { PRODUCTS, FEATURED_PRODUCTS, filterProducts } from "./data/products";
import { BRANDS } from "./data/brands";
import { ProductCard } from "./components/ProductCard";

const CATEGORY_LABELS: Record<string, string> = {
  all:                   "All products",
  cognitive_training:    "Cognitive training",
  regulatory_defense:    "Regulatory defense",
  directors:             "For directors",
  naming_ip:             "IP & Naming",
  personal_development:  "Personal development",
  hebrew_roots:          "Hebrew roots",
  b2b_training:          "B2B training",
  books:                 "Books",
  truth_verification:    "Truth verification",
  accessibility:         "Accessibility",
  behavioral_assessment: "Behavioral assessment",
  creative:              "Creative",
  enterprise:            "Enterprise",
};

const STATUS_FILTERS = [
  { value: "all",  label: "All" },
  { value: "live", label: "Live now" },
  { value: "waitlist", label: "Waitlist" },
  { value: "coming_soon", label: "Coming soon" },
];

const C = {
  bg: "#fdfaf6", white: "#fff", ink: "#1c1814", muted: "#6a6058",
  amber: "#8a5a00", amberLt: "#f5ead8", amberBd: "#d4b070",
  border: "#e4ddd6", borderLt: "#ede9e4", soft: "#f8f4ef",
};

export default function App() {
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() =>
    filterProducts(PRODUCTS, {
      brand: brandFilter,
      category: categoryFilter,
      status: statusFilter,
      search,
    }),
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
        button:focus { outline:2px solid ${C.amber}; outline-offset:1px; }
        @media(max-width:700px){
          .desktop-only { display:none!important; }
          .grid { grid-template-columns:1fr!important; }
          nav,.hero,.stats,.filterbar,.products { padding-left:20px!important; padding-right:20px!important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{
        background: C.white, borderBottom: `1px solid ${C.border}`,
        padding: "0 48px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 18 }}>Shop Ellari</span>
          <span className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em" }}>
            ELLARI VENTURES
          </span>
        </div>
        <div className="desktop-only" style={{ display: "flex", gap: 24 }}>
          {[
            ["Logic Rigor", "https://logic.naci.tech"],
            ["KinderGurus", "https://kindergurus.com"],
            ["Ellari Ventures", "https://ellari.dev"],
            ["Contact", "mailto:hello@ellari.dev"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="mono"
              style={{ fontSize: 11, color: C.muted, textDecoration: "none", letterSpacing: ".04em" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.amber)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div className="hero" style={{ padding: "64px 48px 48px", maxWidth: 1100, margin: "0 auto", borderBottom: `1px solid ${C.border}` }}>
        <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".16em", marginBottom: 16 }}>
          ALL PRODUCTS — ALL BRANDS
        </p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 14 }}>
          Every tool in the ecosystem.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 560 }}>
          Cognitive precision training, regulatory defense, naming research,
          behavioral assessment, books, and B2B training — all from Ellari Ventures.
          Start where your pain is.
        </p>
      </div>

      {/* Stats */}
      <div className="stats" style={{
        display: "flex", gap: 36, padding: "18px 48px",
        background: C.soft, borderBottom: `1px solid ${C.border}`, flexWrap: "wrap",
      }}>
        {[
          [liveCount.toString(), "LIVE PRODUCTS"],
          [brandCount.toString(), "BRANDS"],
          ["$12", "STARTS FROM"],
          ["4", "TEXAS FACILITIES"],
          ["30+", "PUBLISHED BOOKS"],
        ].map(([v, l]) => (
          <div key={l}>
            <div className="mono" style={{ fontSize: 20, color: C.amber }}>{v}</div>
            <div className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".1em" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Featured */}
      {!search && brandFilter === "all" && categoryFilter === "all" && statusFilter === "all" && (
        <div style={{ padding: "40px 48px 0", maxWidth: 1100, margin: "0 auto" }}>
          <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".14em", marginBottom: 16 }}>
            ★ FEATURED PRODUCTS
          </p>
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 1, background: C.border, marginBottom: 40 }}>
            {FEATURED_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ height: 1, background: C.border, marginBottom: 32 }} />
        </div>
      )}

      {/* Filters */}
      <div className="filterbar" style={{ padding: "0 48px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Search */}
        <div style={{ padding: "24px 0 16px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products, features, use cases..."
            style={{
              flex: 1, minWidth: 240, padding: "10px 16px",
              fontFamily: "'EB Garamond',Georgia,serif", fontSize: 15,
              border: `1px solid ${C.border}`, background: C.white, color: C.ink,
            }}
          />
          <button
            onClick={() => setShowFilters(f => !f)}
            className="mono"
            style={{
              padding: "10px 18px", border: `1px solid ${C.border}`,
              background: showFilters ? C.amberLt : "transparent",
              borderColor: showFilters ? C.amberBd : C.border,
              color: showFilters ? C.amber : C.muted, cursor: "pointer", fontSize: 11, letterSpacing: ".06em",
            }}
          >
            Filters {activeFilters > 0 ? `(${activeFilters})` : ""}
          </button>
          {activeFilters > 0 && (
            <button
              onClick={() => { setBrandFilter("all"); setCategoryFilter("all"); setStatusFilter("all"); setSearch(""); }}
              className="mono"
              style={{ padding: "10px 14px", border: "none", background: "none", color: C.muted, cursor: "pointer", fontSize: 11 }}
            >
              Clear all ×
            </button>
          )}
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div style={{ paddingBottom: 24, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Brand filter */}
            <div>
              <p className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em", marginBottom: 8 }}>BRAND</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <FilterChip label="All brands" value="all" current={brandFilter} accent={C.amber} onClick={setBrandFilter} />
                {BRANDS.filter(b => b.status !== "proposed").map(b => (
                  <FilterChip key={b.id} label={b.name} value={b.id} current={brandFilter} accent={b.color} onClick={setBrandFilter} />
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div>
              <p className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em", marginBottom: 8 }}>CATEGORY</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                  <FilterChip key={v} label={l} value={v} current={categoryFilter} accent={C.amber} onClick={setCategoryFilter} />
                ))}
              </div>
            </div>

            {/* Status filter */}
            <div>
              <p className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em", marginBottom: 8 }}>STATUS</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {STATUS_FILTERS.map(({ value, label }) => (
                  <FilterChip key={value} label={label} value={value} current={statusFilter} accent={C.amber} onClick={setStatusFilter} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product grid */}
      <div className="products" style={{ padding: "8px 48px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".1em" }}>
            {filtered.length} PRODUCT{filtered.length !== 1 ? "S" : ""}{activeFilters > 0 ? " (FILTERED)" : ""}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: C.muted }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>No products match those filters.</div>
            <button onClick={() => { setBrandFilter("all"); setCategoryFilter("all"); setStatusFilter("all"); setSearch(""); }}
              className="mono" style={{ fontSize: 11, color: C.amber, background: "none", border: "none", cursor: "pointer", letterSpacing: ".06em" }}>
              Clear filters →
            </button>
          </div>
        ) : (
          <div className="grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))",
            gap: 1, background: C.border,
          }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      {/* Brand directory */}
      <div style={{ padding: "40px 48px", background: C.soft, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".14em", marginBottom: 20 }}>
            BRAND DIRECTORY
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 1, background: C.border }}>
            {BRANDS.map(b => (
              <a key={b.id} href={`https://${b.domain}`} target="_blank" rel="noopener noreferrer"
                style={{ background: C.white, padding: "16px 20px", textDecoration: "none", display: "block", transition: "background .15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.soft)}
                onMouseLeave={e => (e.currentTarget.style.background = C.white)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <span style={{ fontSize: 15, color: b.color }}>{b.name}</span>
                  <span className="mono" style={{
                    fontSize: 8, padding: "2px 6px",
                    background: b.status === "active" ? "#e8f4ec" : b.status === "building" ? "#f5ead8" : "#ede9e4",
                    color: b.status === "active" ? "#1a5030" : b.status === "building" ? "#8a5a00" : "#6a6058",
                    letterSpacing: ".08em",
                  }}>
                    {b.status.toUpperCase()}
                  </span>
                </div>
                <div className="mono" style={{ fontSize: 9, color: C.muted, marginBottom: 4 }}>{b.domain}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{b.tagline}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: "24px 48px", background: C.white, borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <span className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".07em" }}>
          SHOP ELLARI — AN ELLARI VENTURES LLC SYSTEM — 2026
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            ["logic.naci.tech", "https://logic.naci.tech"],
            ["Press", "https://logic.naci.tech/press"],
            ["ellari.dev", "https://ellari.dev"],
            ["hello@ellari.dev", "mailto:hello@ellari.dev"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="mono"
              style={{ fontSize: 10, color: C.muted, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.amber)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

function FilterChip({
  label, value, current, accent, onClick,
}: {
  label: string; value: string; current: string; accent: string; onClick: (v: string) => void;
}) {
  const active = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className="mono"
      style={{
        padding: "6px 14px", fontSize: 10, letterSpacing: ".06em",
        border: `1px solid ${active ? accent : "#e4ddd6"}`,
        background: active ? "transparent" : "transparent",
        color: active ? accent : "#6a6058",
        cursor: "pointer", transition: "all .12s",
        outline: "none",
      }}
      onMouseEnter={e => !active && ((e.currentTarget.style.borderColor = accent), (e.currentTarget.style.color = accent))}
      onMouseLeave={e => !active && ((e.currentTarget.style.borderColor = "#e4ddd6"), (e.currentTarget.style.color = "#6a6058"))}
    >
      {label}
    </button>
  );
}
