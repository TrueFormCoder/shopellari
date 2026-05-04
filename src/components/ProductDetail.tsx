/**
 * ProductDetail.tsx — /product/[slug] detail page
 * Full-page product view. KinderGurus gets curriculum overview.
 * All waitlist products get email capture.
 * Reads from the same products.ts registry.
 */
import { useParams, Link } from "react-router-dom";
import { PRODUCT_MAP, PRODUCTS } from "../data/products";
import { BRAND_MAP } from "../data/brands";
import { WaitlistCapture } from "./WaitlistCapture";

const C = {
  bg: "#fdfaf6", white: "#fff", ink: "#1c1814", muted: "#6a6058",
  border: "#e4ddd6", borderLt: "#ede9e4", soft: "#f8f4ef",
};

// Extended content for products that need detail pages
const DETAIL_CONTENT: Record<string, {
  headline: string;
  body: string[];
  sections?: { title: string; content: string }[];
  faqs?: { q: string; a: string }[];
}> = {
  "kindergurus-cohort": {
    headline: "Regulatory language curriculum — built by a licensed operator with four active Texas facilities.",
    body: [
      "KinderGurus is not compliance training. Compliance training tells your staff what the rules are. KinderGurus trains your staff to read what inspection language is doing — the presuppositions it carries, the logical structure of a finding, and how to respond to the argument rather than the emotion.",
      "Built on the EMET engine (the same system behind Inspection Defense™ and Director's Defense™), KinderGurus delivers the full Logic Rigor methodology in a structured cohort format — group facilitation, real inspection examples, and completion certificates your staff can reference during active regulatory situations.",
    ],
    sections: [
      {
        title: "What the curriculum covers",
        content: "Module 1: How inspection language works (structure, not sentiment). Module 2: Reading findings — presuppositions and failure modes. Module 3: Response construction — what defensible language looks like. Module 4: Pattern recognition — the 12 most common citation types and how to address each. Module 5: Admin Review preparation — when to file, what to include, how to structure a point-by-point response.",
      },
      {
        title: "Cohort format",
        content: "10+ staff members per cohort. 5 modules, typically delivered over 3–4 weeks at your pace. Live facilitation by the Ellari Ventures team. Each participant receives a completion certificate. The cohort ends with a practical session using real (anonymized) inspection examples.",
      },
      {
        title: "Who it's for",
        content: "Licensed childcare operators with 10+ staff. Regional childcare chains managing compliance across multiple facilities. State-level childcare associations running operator training programs. Directors who need structured professional development that goes beyond what state licensing offers.",
      },
      {
        title: "Pricing and scheduling",
        content: "$997 per cohort. Includes all 5 modules, facilitation, and completion certificates. Scheduling is by direct arrangement — contact hello@ellari.dev with your facility name, license number, staff count, and preferred start window.",
      },
    ],
    faqs: [
      { q: "Is this legal advice?", a: "No. KinderGurus is regulatory language training — cognitive and structural. It does not constitute legal advice and does not create an attorney-client relationship. For active litigation or administrative hearings, consult a licensed attorney." },
      { q: "Can we run multiple cohorts?", a: "Yes. Multi-cohort packages are available for regional chains. Contact us directly." },
      { q: "What if we have fewer than 10 staff?", a: "Director's Defense™ Full Access ($197/year) is the right product for smaller teams. It includes Admin Review generation and unlimited analysis for a single license." },
      { q: "Are the case examples from real inspections?", a: "Yes — anonymized. The examples are structurally identical to real Texas HHSC findings, with all identifying information removed." },
    ],
  },
  "name-before-you-file": {
    headline: "Test what a name carries before it becomes expensive.",
    body: [
      "Most naming decisions fail before the trademark search. They fail at the semantic layer — the name carries the wrong meaning in the root system, maps to an existing semantic family, or has no structural anchor in the language. By the time you file with the USPTO, you've already invested in something that may not hold.",
      "Name Before You File™ runs the analysis before you invest. Every name you test gets a full root analysis: what the name carries in Hebrew (the oldest systematic semantic architecture), which semantic family it belongs to, what USPTO risk factors it presents, and what naming candidates come from the same root that might serve you better.",
    ],
    sections: [
      {
        title: "What you get per analysis",
        content: "Trilateral root decomposition. Binyan operator mapping (what grammatical role the name implies). Semantic family — the 4–6 related words this name is structurally adjacent to. USPTO viability rating (high / medium / low / blocked) based on root overlap with registered marks. Domain availability check. 2–4 naming candidates from the same root that may score better on trademark and emotional resonance.",
      },
      {
        title: "Who it's for",
        content: "Founders in the naming phase of a new company or product. Trademark attorneys researching semantic and linguistic viability before filing. Brand consultants building naming systems for clients. IP portfolio managers auditing existing names for structural risk.",
      },
      {
        title: "Pricing",
        content: "$197/month subscription. Unlimited root analyses per month. JSON export for every analysis — full naming stack, USPTO rating, semantic family, domain recommendations.",
      },
    ],
    faqs: [
      { q: "Does this replace a trademark search?", a: "No. The USPTO viability rating is a structural signal, not a legal opinion. Always conduct a full clearance search with a licensed trademark attorney before filing." },
      { q: "What if my name isn't from a Hebrew root?", a: "The root analysis maps to underlying semantic architecture that predates most modern naming systems. Almost all English brand names have traceable roots — Germanic, Latin, Greek, or Semitic. The system identifies where your name sits in that architecture regardless of origin language." },
    ],
  },
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? PRODUCT_MAP[slug] : null;

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'EB Garamond',Georgia,serif" }}>
        <p style={{ fontSize: 18, color: C.muted, marginBottom: 16 }}>Product not found.</p>
        <Link to="/" style={{ fontFamily: "'DM Mono','Courier New',monospace", fontSize: 12, color: C.muted }}>← Back to store</Link>
      </div>
    );
  }

  const brand = BRAND_MAP[product.brand];
  const detail = DETAIL_CONTENT[product.id];
  const isWaitlist = product.status === "waitlist" || product.status === "coming_soon";
  const isContact = product.status === "contact";

  // Related products (same brand, not this one)
  const related = PRODUCTS
    .filter(p => p.brand === product.brand && p.id !== product.id && p.status !== "archived")
    .slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: "'EB Garamond',Georgia,serif" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        .mono { font-family:'DM Mono','Courier New',monospace; }
        a { color:inherit; }
        .btn { display:inline-block; padding:11px 24px; font-family:'DM Mono','Courier New',monospace; font-size:12px; letter-spacing:.06em; cursor:pointer; border:none; text-decoration:none; transition:all .18s; }
      `}</style>

      {/* Nav */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 48px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 16 }}>Shop Ellari</span>
          <span className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em" }}>← ALL PRODUCTS</span>
        </Link>
        <span style={{ fontFamily: "'DM Mono','Courier New',monospace", fontSize: 9, color: brand.color, letterSpacing: ".1em" }}>
          {brand.name.toUpperCase()}
        </span>
      </nav>

      {/* Brand accent bar */}
      <div style={{ height: 3, background: brand.color }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 48px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p className="mono" style={{ fontSize: 9, color: brand.color, letterSpacing: ".14em", marginBottom: 12 }}>
            {brand.name.toUpperCase()} · {product.category.replace(/_/g, " ").toUpperCase()}
          </p>
          <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, lineHeight: 1.18, marginBottom: 16 }}>
            {product.name}
          </h1>
          <p style={{ fontSize: 18, fontStyle: "italic", color: C.muted, lineHeight: 1.65, maxWidth: 620 }}>
            {detail?.headline || product.tagline}
          </p>
        </div>

        {/* Price + CTA */}
        <div style={{ padding: "24px 28px", background: C.white, border: `1px solid ${C.border}`, marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 400 }}>{product.priceDisplay}</span>
              {product.period && (
                <span className="mono" style={{ fontSize: 12, color: C.muted }}>{product.period}</span>
              )}
            </div>
            <p className="mono" style={{ fontSize: 10, color: C.muted, letterSpacing: ".08em" }}>
              {product.type === "subscription_monthly" ? "Monthly subscription — cancel anytime" :
               product.type === "subscription_yearly" ? "Annual subscription" :
               product.type === "one_time" ? "One-time purchase" :
               product.type === "cohort" ? "Cohort pricing — contact for scheduling" :
               product.type === "physical" ? "Physical + digital — ships from Amazon" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1, justifyContent: "flex-end" }}>
            {isWaitlist ? (
              <WaitlistCapture productId={product.id} productName={product.name} accent={brand.color} />
            ) : isContact ? (
              <a href={product.ctaUrl} className="btn"
                style={{ background: brand.color, color: "#fdfaf6" }}
                target="_blank" rel="noopener noreferrer">
                {product.ctaText}
              </a>
            ) : (
              <a href={product.ctaUrl} className="btn"
                style={{ background: brand.color, color: "#fdfaf6" }}
                target={product.ctaUrl.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer">
                {product.ctaText}
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        {(detail?.body || [product.description]).map((para, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: "#3a3228", marginBottom: 16 }}>{para}</p>
        ))}

        {/* Features */}
        <div style={{ margin: "32px 0", border: `1px solid ${C.border}` }}>
          <div style={{ padding: "12px 20px", background: C.soft, borderBottom: `1px solid ${C.border}` }}>
            <span className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em" }}>WHAT'S INCLUDED</span>
          </div>
          {product.features.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 20px", borderBottom: i < product.features.length - 1 ? `1px solid ${C.borderLt}` : "none", fontSize: 15 }}>
              <span style={{ color: brand.color, flexShrink: 0 }}>—</span>{f}
            </div>
          ))}
        </div>

        {/* Detail sections */}
        {detail?.sections?.map(s => (
          <div key={s.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 400, marginBottom: 12 }}>{s.title}</h2>
            <div style={{ height: 1, background: C.border, marginBottom: 16 }} />
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#3a3228" }}>{s.content}</p>
          </div>
        ))}

        {/* FAQs */}
        {detail?.faqs && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 400, marginBottom: 20 }}>Questions</h2>
            {detail.faqs.map(faq => (
              <div key={faq.q} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${C.borderLt}` }}>
                <p style={{ fontSize: 16, marginBottom: 8, color: C.ink }}>{faq.q}</p>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: C.muted }}>{faq.a}</p>
              </div>
            ))}
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
            <p className="mono" style={{ fontSize: 9, color: C.muted, letterSpacing: ".12em", marginBottom: 20 }}>
              MORE FROM {brand.name.toUpperCase()}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 1, background: C.border }}>
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`}
                  style={{ background: C.white, padding: "18px 20px", textDecoration: "none", display: "block", transition: "background .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.soft)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.white)}>
                  <div style={{ fontSize: 15, color: brand.color, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, lineHeight: 1.4 }}>{p.tagline}</div>
                  <div className="mono" style={{ fontSize: 11, color: C.ink }}>{p.priceDisplay}{p.period}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: 48 }}>
          <Link to="/" className="mono" style={{ fontSize: 11, color: C.muted, textDecoration: "none", letterSpacing: ".06em" }}>
            ← Back to all products
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "24px 48px", borderTop: `1px solid ${C.border}`, background: C.white, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span className="mono" style={{ fontSize: 10, color: C.muted }}>SHOP ELLARI — AN ELLARI VENTURES LLC SYSTEM — 2026</span>
        <a href="mailto:hello@ellari.dev" className="mono" style={{ fontSize: 10, color: C.muted, textDecoration: "none" }}>hello@ellari.dev</a>
      </footer>
    </div>
  );
}
