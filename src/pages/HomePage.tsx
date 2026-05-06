// ============================================================
// ShopEllari™ HomePage.tsx v1.0
// V's Brand Book §LIX–LX — routes, not dumps
// Route: / (replaces the current flat grid)
// Section order: Hero → Start Here Paths → Featured Stacks → 
//                Product Lines → Proof → Professional → CTA
// ============================================================
import { Link } from "react-router-dom";
import { STACKS } from "../data/stacks";
import { PRODUCTS } from "../data/products";
import { BRANDS } from "../data/brands";
import { StackCard } from "./StackPage";

// ── Entry paths — maps buyer state to route ──────────────────
const ENTRY_PATHS = [
  {
    id: "overwhelmed",
    label: "I feel overwhelmed",
    subtext: "You need one place to start, not fifteen options.",
    route: "/stacks/start-clear-stack",
    icon: "◎",
  },
  {
    id: "protecting",
    label: "I need to protect something",
    subtext: "Inspections, citations, records, evidence.",
    route: "/stacks/record-it-stack",
    icon: "◈",
  },
  {
    id: "building",
    label: "I'm building something",
    subtext: "Systems, products, IP. You need serious tools.",
    route: "/stacks/operator-stack",
    icon: "◆",
  },
  {
    id: "curious",
    label: "I want to think more clearly",
    subtext: "Pattern recognition. Formal analysis. Cognitive precision.",
    route: "/products/catch-the-pattern",
    icon: "◉",
  },
  {
    id: "caring",
    label: "I'm caring for people",
    subtext: "Home, family, childcare. You need structure, not advice.",
    route: "/stacks/home-rhythm-stack",
    icon: "○",
  },
  {
    id: "launching",
    label: "I'm launching or releasing",
    subtext: "Brand, product, IP. Protect before you ship.",
    route: "/stacks/protected-launch-stack",
    icon: "◇",
  },
];

// ── Product lines (not all products — lines overview) ────────
const PRODUCT_LINES = [
  { id: "logic-rigor", name: "Logic Rigor™ / EMET", tagline: "Pattern recognition and formal analysis training", count: 3, route: "/products?brand=logic-rigor", accentVar: "--accent-logic" },
  { id: "inspection-defense", name: "Inspection Defense™", tagline: "Regulatory language analysis for licensed operators", count: 3, route: "/products?brand=ellari", accentVar: "--accent-professional" },
  { id: "pattern-training", name: "Pattern Training™", tagline: "Structured attention environments in printable form", count: 1, route: "/products/signal-trace-vol1", accentVar: "--accent-studio" },
  { id: "ellari-studio", name: "Ellari Studio™", tagline: "Expressive systems — glyphs, operators, visual language", count: 1, route: "/products/motion-glyph-system", accentVar: "--accent-eleos" },
  { id: "kindergurus", name: "KinderGurus™", tagline: "Childcare director training and licensing support", count: 1, route: "/products/kindergurus-cohort", accentVar: "--accent-kindergurus" },
];

// ── Trust marks ──────────────────────────────────────────────
const TRUST_MARKS = [
  { label: "ELLARI Verified", desc: "Built within the ELEOS ecosystem" },
  { label: "Seal Attached", desc: "Cryptographically timestamped artifacts" },
  { label: "System-Linked", desc: "Every product maps to a documented system" },
  { label: "Evidence-Ready", desc: "Designed for real decision environments" },
  { label: "Versioned Artifact", desc: "Maintained and updated with version stamps" },
];

export default function HomePage() {
  const featuredStacks = STACKS.slice(0, 3);
  const featuredProducts = PRODUCTS.filter(p => p.status === "live" || p.featured).slice(0, 6);

  return (
    <div style={{ fontFamily: "var(--font-sans, Inter, sans-serif)", background: "var(--se-cream, #f9f6f1)" }}>

      {/* ── SECTION 1: Hero ─────────────────────────────────── */}
      <section style={{ background: "var(--se-black, #1a1a1a)", color: "var(--se-cream, #f9f6f1)", padding: "80px 32px 72px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--se-gold, #d6b168)", textTransform: "uppercase", marginBottom: "20px" }}>
          SHOPELLARI™ — AN ELLARI VENTURES SYSTEM
        </p>
        <h1 style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300, maxWidth: "720px", margin: "0 auto 20px", lineHeight: 1.2 }}>
          Build The System<br />You Needed Earlier.
        </h1>
        <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "1.05rem", maxWidth: "540px", margin: "0 auto 36px", lineHeight: 1.7 }}>
          Tools, kits, and systems for clarity, care, memory, protection, and operational life.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="#start-here" style={{ background: "var(--se-gold, #d6b168)", color: "var(--se-black, #1a1a1a)", padding: "14px 32px", fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none", borderRadius: "2px", letterSpacing: "0.04em" }}>
            Find Your Starting Point
          </Link>
          <Link to="/stacks" style={{ border: "1px solid var(--se-mid-gray, #b8b3ac)", color: "var(--se-cream, #f9f6f1)", padding: "14px 32px", fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.875rem", textDecoration: "none", borderRadius: "2px", letterSpacing: "0.04em" }}>
            View The Vault →
          </Link>
        </div>
      </section>

      {/* ── SECTION 2: Start Here Paths ─────────────────────── */}
      <section id="start-here" style={{ padding: "72px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel label="START HERE" />
        <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, margin: "16px 0 8px" }}>
          Where are you right now?
        </h2>
        <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "0.9rem", marginBottom: "36px" }}>
          Select your state. We'll route you to the right tools.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {ENTRY_PATHS.map(path => (
            <Link key={path.id} to={path.route} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "4px", padding: "24px", transition: "border-color 0.2s, transform 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--se-gold, #d6b168)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--se-soft-gray, #e6e2dc)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "1.1rem", color: "var(--se-gold, #d6b168)", marginBottom: "12px" }}>{path.icon}</div>
                <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.05rem", marginBottom: "6px", color: "var(--se-black, #1a1a1a)" }}>{path.label}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--se-mid-gray, #b8b3ac)", lineHeight: 1.5 }}>{path.subtext}</div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link to="/start" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem", color: "var(--se-mid-gray, #b8b3ac)", textDecoration: "none", letterSpacing: "0.1em" }}>
            NOT SURE? TAKE THE INTAKE QUIZ →
          </Link>
        </div>
      </section>

      <GoldDivider />

      {/* ── SECTION 3: Featured Stacks ──────────────────────── */}
      <section style={{ padding: "72px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel label="FEATURED STACKS" />
        <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, margin: "16px 0 8px" }}>
          Engineered combinations. Not bundles.
        </h2>
        <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "0.9rem", marginBottom: "36px" }}>
          Each stack moves you from one state to another. Use order matters.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {featuredStacks.map(stack => <StackCard key={stack.id} stack={stack} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link to="/stacks" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem", color: "var(--se-mid-gray, #b8b3ac)", textDecoration: "none", letterSpacing: "0.1em" }}>
            VIEW ALL STACKS →
          </Link>
        </div>
      </section>

      <GoldDivider />

      {/* ── SECTION 4: Product Lines ─────────────────────────── */}
      <section style={{ padding: "72px 32px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionLabel label="PRODUCT LINES" />
          <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, margin: "16px 0 8px" }}>
            Organized by system.
          </h2>
          <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "0.9rem", marginBottom: "36px" }}>
            Every product belongs to a documented system with a purpose and a place.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {PRODUCT_LINES.map((line, i) => (
              <Link key={line.id} to={line.route} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", alignItems: "center", padding: "20px 0", borderBottom: "1px solid var(--se-soft-gray, #e6e2dc)", gap: "20px", transition: "background 0.15s", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--se-soft-gray, #e6e2dc)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                  <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-gold, #d6b168)", width: "24px", textAlign: "center" }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.05rem", marginBottom: "2px" }}>{line.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--se-mid-gray, #b8b3ac)" }}>{line.tagline}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-mid-gray, #b8b3ac)" }}>
                    {line.count} {line.count === 1 ? "product" : "products"}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--se-mid-gray, #b8b3ac)" }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── SECTION 5: Proof / Trust Layer ──────────────────── */}
      <section style={{ padding: "72px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel label="PROOF LAYER" />
        <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, margin: "16px 0 8px" }}>
          Most stores fake trust. We prove it.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginTop: "32px" }}>
          {TRUST_MARKS.map(mark => (
            <div key={mark.label} style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "4px", padding: "20px" }}>
              <div style={{ width: "8px", height: "8px", background: "var(--se-gold, #d6b168)", borderRadius: "50%", marginBottom: "12px" }} />
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.1em", marginBottom: "8px", color: "var(--se-black, #1a1a1a)" }}>
                {mark.label}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--se-mid-gray, #b8b3ac)", lineHeight: 1.5 }}>{mark.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: Professional Use ─────────────────────── */}
      <section style={{ background: "var(--se-black, #1a1a1a)", color: "var(--se-cream, #f9f6f1)", padding: "60px 32px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel label="PROFESSIONAL USE" dark />
          <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, margin: "16px 0 12px" }}>
            Operator, Institutional, and Multi-Seat Licensing
          </h2>
          <p style={{ color: "var(--se-mid-gray, #b8b3ac)", lineHeight: 1.6, marginBottom: "28px", fontSize: "0.9rem" }}>
            Several products are available under professional use licenses for HR, compliance, education, and regulated operator environments. Group and facility pricing available.
          </p>
          <Link to="/products?filter=professional" style={{ border: "1px solid var(--se-gold, #d6b168)", color: "var(--se-gold, #d6b168)", padding: "12px 28px", fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.875rem", textDecoration: "none", borderRadius: "2px", letterSpacing: "0.04em" }}>
            View Professional Licensing →
          </Link>
        </div>
      </section>

      {/* ── SECTION 7: Final CTA ─────────────────────────────── */}
      <section style={{ padding: "80px 32px", textAlign: "center", background: "var(--se-cream, #f9f6f1)" }}>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--se-gold, #d6b168)", marginBottom: "16px" }}>
          READY TO BEGIN
        </p>
        <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, maxWidth: "560px", margin: "0 auto 24px" }}>
          A vault of tools for people who are done living without structure.
        </h2>
        <Link to="/stacks" style={{ background: "var(--se-black, #1a1a1a)", color: "var(--se-cream, #f9f6f1)", padding: "16px 40px", fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none", borderRadius: "2px", letterSpacing: "0.05em" }}>
          Enter The Vault →
        </Link>
      </section>

    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
function SectionLabel({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ height: "1px", width: "24px", background: "var(--se-gold, #d6b168)" }} />
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.62rem", letterSpacing: "0.18em", color: dark ? "var(--se-gold, #d6b168)" : "var(--se-gold, #d6b168)", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function GoldDivider() {
  return <div style={{ height: "1px", background: "var(--se-gold, #d6b168)", opacity: 0.3, margin: "0 32px" }} />;
}
