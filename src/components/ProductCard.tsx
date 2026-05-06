import { Link } from 'react-router-dom';
/**
 * ProductCard.tsx — renders a single product from the registry
 * Brand colors and styles are driven entirely by the product's brand config.
 */
import type { Product } from "../data/types";
import { BRAND_MAP } from "../data/brands";

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  live:        { label: "LIVE",         color: "#1a5030", bg: "#e8f4ec" },
  coming_soon: { label: "COMING SOON",  color: "#8a5a00", bg: "#f5ead8" },
  waitlist:    { label: "WAITLIST",     color: "#534AB7", bg: "#eeeaf9" },
  contact:     { label: "B2B — CONTACT",color: "#4a4238", bg: "#ede9e4" },
  archived:    { label: "ARCHIVED",     color: "#6a6058", bg: "#ede9e4" },
};

const TYPE_LABEL: Record<string, string> = {
  subscription_monthly: "Monthly subscription",
  subscription_yearly:  "Annual subscription",
  one_time:             "One-time purchase",
  cohort:               "Cohort pricing",
  physical:             "Physical + digital",
  free:                 "Free",
};

export function ProductCard({ product }: { product: Product }) {
  const brand = BRAND_MAP[product.brand];
  const statusBadge = STATUS_BADGE[product.status] ?? STATUS_BADGE.live;
  const isDisabled = product.status === "archived";

  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #e4ddd6",
      display: "flex",
      flexDirection: "column",
      transition: "box-shadow .15s",
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,.06)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Brand accent bar */}
      <div style={{ height: 3, background: brand.color }} />

      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Top row: brand + status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <span style={{
            fontFamily: "'DM Mono','Courier New',monospace",
            fontSize: 9,
            color: brand.color,
            letterSpacing: ".1em",
            textTransform: "uppercase",
          }}>
            {brand.name}
          </span>
          <span style={{
            fontFamily: "'DM Mono','Courier New',monospace",
            fontSize: 8,
            color: statusBadge.color,
            background: statusBadge.bg,
            padding: "2px 7px",
            letterSpacing: ".08em",
          }}>
            {statusBadge.label}
          </span>
        </div>

        {/* Badge (Most Popular / New / Best Value) */}
        {product.badge && (
          <div style={{
            fontFamily: "'DM Mono','Courier New',monospace",
            fontSize: 8,
            color: brand.color,
            letterSpacing: ".1em",
            marginBottom: 8,
          }}>
            ★ {product.badge.toUpperCase()}
          </div>
        )}

        {/* Name */}
        <h3 style={{
          fontFamily: "'EB Garamond',Georgia,serif",
          fontSize: 20,
          fontWeight: 400,
          lineHeight: 1.2,
          color: "#1c1814",
          marginBottom: 6,
        }}>
          {product.name}
        </h3>
            <Link to={`/product/${product.id}`} style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.62rem", color: "var(--se-gold, #d6b168)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-block", marginTop: "4px" }}>VIEW DETAILS →</Link>

        {/* Tagline */}
        <p style={{
          fontFamily: "'EB Garamond',Georgia,serif",
          fontSize: 13,
          fontStyle: "italic",
          color: "#6a6058",
          marginBottom: 12,
          lineHeight: 1.55,
        }}>
          {product.tagline}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 13,
          lineHeight: 1.7,
          color: "#6a6058",
          marginBottom: 14,
          flex: 1,
        }}>
          {product.description}
        </p>

        {/* Features */}
        <div style={{ marginBottom: 18 }}>
          {product.features.map((f, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 8,
              padding: "4px 0",
              fontSize: 12,
              color: "#6a6058",
              borderBottom: "1px solid #ede9e4",
              lineHeight: 1.4,
            }}>
              <span style={{ color: brand.color, flexShrink: 0 }}>—</span>
              {f}
            </div>
          ))}
        </div>

        {/* Type label */}
        <div style={{
          fontFamily: "'DM Mono','Courier New',monospace",
          fontSize: 9,
          color: "#8a8070",
          letterSpacing: ".06em",
          marginBottom: 14,
        }}>
          {TYPE_LABEL[product.type] ?? product.type}
        </div>

        {/* Footer: price + CTA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 14,
          borderTop: "1px solid #e4ddd6",
          marginTop: "auto",
          gap: 10,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span style={{ fontSize: 24, fontWeight: 400, color: "#1c1814" }}>
              {product.priceDisplay}
            </span>
            {product.period && (
              <span style={{ fontFamily: "'DM Mono','Courier New',monospace", fontSize: 11, color: "#8a8070" }}>
                {product.period}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {product.route && (
              <a
                href={`https://logic.naci.tech${product.route}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono','Courier New',monospace",
                  fontSize: 10,
                  padding: "7px 12px",
                  background: "transparent",
                  border: "1px solid #e4ddd6",
                  color: "#6a6058",
                  textDecoration: "none",
                  letterSpacing: ".04em",
                  transition: "all .15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = brand.color; (e.currentTarget as HTMLElement).style.color = brand.color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e4ddd6"; (e.currentTarget as HTMLElement).style.color = "#6a6058"; }}
              >
                Try it →
              </a>
            )}
            <a
              href={isDisabled ? "#" : product.ctaUrl}
              target={product.ctaUrl.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Mono','Courier New',monospace",
                fontSize: 11,
                padding: "8px 16px",
                background: isDisabled ? "#ede9e4" : brand.color,
                color: "#fdfaf6",
                textDecoration: "none",
                letterSpacing: ".04em",
                pointerEvents: isDisabled ? "none" : "auto",
                opacity: isDisabled ? .5 : 1,
                transition: "background .15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => !isDisabled && ((e.currentTarget as HTMLElement).style.opacity = ".85")}
              onMouseLeave={e => !isDisabled && ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {product.ctaText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
