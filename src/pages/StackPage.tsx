// ============================================================
// ShopEllari™ StackPage.tsx v1.0
// V's Brand Book §XXXII, §LXVI–LXVII
// Renders at: /stacks and /stacks/:id
// ============================================================
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { STACKS, Stack, formatStackSavings } from "../data/stacks";
import { PRODUCTS } from "../data/products";

// ── Stack index page (/stacks) ───────────────────────────────
export function StacksIndex() {
  return (
    <div style={{ fontFamily: "var(--font-sans, Inter, sans-serif)", background: "var(--se-cream, #f9f6f1)", minHeight: "100vh", padding: "0 0 80px" }}>
      <header style={{ background: "var(--se-black, #1a1a1a)", color: "var(--se-cream, #f9f6f1)", padding: "48px 32px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--se-gold, #d6b168)", textTransform: "uppercase", marginBottom: "12px" }}>
          SHOPELLARI™ — SYSTEM STACKS
        </p>
        <h1 style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, margin: "0 0 16px" }}>
          Engineered Tool Combinations
        </h1>
        <p style={{ color: "var(--se-mid-gray, #b8b3ac)", maxWidth: "520px", margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.6 }}>
          Stacks are not bundles. Each one is a curated sequence of tools that work together to move you from one state to another.
        </p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {STACKS.map(stack => (
            <StackCard key={stack.id} stack={stack} />
          ))}
        </div>
      </main>
    </div>
  );
}

// ── Stack card (used in index + homepage featured section) ───
export function StackCard({ stack }: { stack: Stack }) {
  const isActive = stack.status === 'active';
  return (
    <Link to={`/stacks/${stack.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div style={{
        background: "#fff",
        border: "1px solid var(--se-soft-gray, #e6e2dc)",
        borderRadius: "4px",
        padding: "28px",
        transition: "border-color 0.2s ease-out, transform 0.2s ease-out",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--se-gold, #d6b168)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--se-soft-gray, #e6e2dc)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
      >
        {/* Gold top divider */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--se-gold, #d6b168)" }} />

        {/* System ID + status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-mid-gray, #b8b3ac)", letterSpacing: "0.1em" }}>
            {stack.system_id}
          </span>
          <span style={{
            fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", letterSpacing: "0.08em",
            padding: "3px 8px", borderRadius: "2px",
            background: isActive ? "var(--se-black, #1a1a1a)" : "var(--se-soft-gray, #e6e2dc)",
            color: isActive ? "var(--se-cream, #f9f6f1)" : "var(--se-mid-gray, #b8b3ac)",
          }}>
            {isActive ? "ACTIVE" : "COMING SOON"}
          </span>
        </div>

        <h3 style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)", fontSize: "1.4rem", fontWeight: 400, margin: "0 0 8px", color: "var(--se-black, #1a1a1a)" }}>
          {stack.name}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--se-mid-gray, #b8b3ac)", margin: "0 0 20px", lineHeight: 1.5 }}>
          {stack.tagline}
        </p>

        {/* Buyer state badge */}
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-gold, #d6b168)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            For when you are: {stack.buyer_state}
          </span>
        </div>

        {/* Product count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--se-soft-gray, #e6e2dc)", paddingTop: "16px" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--se-mid-gray, #b8b3ac)" }}>
            {stack.products.length} tools included
          </span>
          <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.75rem", color: "var(--se-black, #1a1a1a)", fontWeight: 500 }}>
            {formatStackSavings(stack.savings_pct)}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Stack detail page (/stacks/:id) ─────────────────────────
export function StackDetail() {
  const { id } = useParams<{ id: string }>();
  const stack = STACKS.find(s => s.id === id);

  if (!stack) return (
    <div style={{ padding: "80px 32px", textAlign: "center", fontFamily: "var(--font-sans, sans-serif)" }}>
      <p>Stack not found. <Link to="/stacks">View all stacks →</Link></p>
    </div>
  );

  const stackProducts = stack.products
    .sort((a, b) => a.order - b.order)
    .map(sp => ({ ...sp, product: PRODUCTS.find(p => p.id === sp.id) }))
    .filter(sp => sp.product);

  const isActive = stack.status === 'active';

  return (
    <div style={{ fontFamily: "var(--font-sans, Inter, sans-serif)", background: "var(--se-cream, #f9f6f1)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "var(--se-black, #1a1a1a)", color: "var(--se-cream, #f9f6f1)", padding: "48px 32px 44px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link to="/stacks" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", color: "var(--se-gold, #d6b168)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-block", marginBottom: "24px" }}>
            ← ALL STACKS
          </Link>
          <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-mid-gray, #b8b3ac)", letterSpacing: "0.12em", marginBottom: "12px" }}>
            {stack.system_id}
          </p>
          <h1 style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, margin: "0 0 16px" }}>
            {stack.name}
          </h1>
          <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "560px" }}>
            {stack.what_it_solves}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "56px 24px" }}>
        {/* What this stack solves */}
        <section style={{ marginBottom: "48px" }}>
          <GoldDividerLabel label="DESIGNED FOR" />
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
            <InfoBadge label={`Buyer state: ${stack.buyer_state}`} />
          </div>
          <p style={{ marginTop: "16px", lineHeight: 1.7, color: "var(--se-black, #1a1a1a)", fontSize: "0.95rem" }}>
            {stack.what_it_solves}
          </p>
        </section>

        {/* Included tools */}
        <section style={{ marginBottom: "48px" }}>
          <GoldDividerLabel label={`${stack.products.length} TOOLS INCLUDED`} />
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {stackProducts.map((sp, i) => (
              <div key={sp.id} style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "4px", padding: "20px 24px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", color: "var(--se-gold, #d6b168)", fontWeight: 600, minWidth: "24px" }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.05rem", marginBottom: "4px", color: "var(--se-black, #1a1a1a)" }}>
                    {sp.product?.name || sp.id}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--se-mid-gray, #b8b3ac)", lineHeight: 1.5 }}>
                    {sp.role}
                  </div>
                  {sp.product?.price && (
                    <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem", color: "var(--se-black, #1a1a1a)", marginTop: "8px" }}>
                      {sp.product.price}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use order */}
        <section style={{ marginBottom: "48px" }}>
          <GoldDividerLabel label="HOW TO USE THIS STACK" />
          <p style={{ marginTop: "16px", lineHeight: 1.7, color: "var(--se-black, #1a1a1a)", fontSize: "0.95rem" }}>{stack.use_order}</p>
        </section>

        {/* Best for / Not for */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "48px" }}>
          <div style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "4px", padding: "20px" }}>
            <GoldDividerLabel label="BEST FOR" small />
            <p style={{ marginTop: "12px", fontSize: "0.875rem", lineHeight: 1.6, color: "var(--se-black, #1a1a1a)" }}>{stack.best_for}</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "4px", padding: "20px" }}>
            <GoldDividerLabel label="NOT FOR" small warn />
            <p style={{ marginTop: "12px", fontSize: "0.875rem", lineHeight: 1.6, color: "var(--se-black, #1a1a1a)" }}>{stack.not_for}</p>
          </div>
        </div>

        {/* CTA */}
        <section style={{ background: "var(--se-black, #1a1a1a)", borderRadius: "4px", padding: "36px 32px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-gold, #d6b168)", letterSpacing: "0.12em", marginBottom: "12px" }}>
            {formatStackSavings(stack.savings_pct)} WHEN PURCHASED AS A STACK
          </p>
          <h3 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.6rem", fontWeight: 400, color: "var(--se-cream, #f9f6f1)", margin: "0 0 24px" }}>
            Ready to build this stack?
          </h3>
          {isActive ? (
            <button style={{ background: "var(--se-gold, #d6b168)", color: "var(--se-black, #1a1a1a)", border: "none", padding: "14px 36px", fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.9rem", fontWeight: 600, borderRadius: "2px", cursor: "pointer", letterSpacing: "0.04em" }}>
              Build This Stack
            </button>
          ) : (
            <div>
              <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "0.875rem", marginBottom: "16px" }}>This stack is coming soon. Enter your email to be notified.</p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                <input type="email" placeholder="your@email.com" style={{ padding: "12px 16px", border: "1px solid var(--se-mid-gray, #b8b3ac)", borderRadius: "2px", background: "transparent", color: "var(--se-cream, #f9f6f1)", fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.875rem", width: "260px" }} />
                <button style={{ background: "var(--se-gold, #d6b168)", color: "var(--se-black, #1a1a1a)", border: "none", padding: "12px 24px", fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.875rem", fontWeight: 600, borderRadius: "2px", cursor: "pointer" }}>
                  Notify Me
                </button>
              </div>
            </div>
          )}
        </section>

        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <Link to="/stacks" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem", color: "var(--se-mid-gray, #b8b3ac)", textDecoration: "none", letterSpacing: "0.1em" }}>
            ← VIEW ALL STACKS
          </Link>
        </div>
      </main>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
function GoldDividerLabel({ label, small, warn }: { label: string; small?: boolean; warn?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ height: "1px", width: "24px", background: warn ? "var(--se-mid-gray, #b8b3ac)" : "var(--se-gold, #d6b168)" }} />
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: small ? "0.6rem" : "0.65rem", letterSpacing: "0.12em", color: warn ? "var(--se-mid-gray, #b8b3ac)" : "var(--se-gold, #d6b168)", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function InfoBadge({ label }: { label: string }) {
  return (
    <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", padding: "4px 10px", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "2px", color: "var(--se-mid-gray, #b8b3ac)", letterSpacing: "0.06em" }}>
      {label}
    </span>
  );
}
