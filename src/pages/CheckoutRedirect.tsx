// ============================================================
// CheckoutRedirect.tsx
// Route: /checkout/:key
// Maps product keys → Stripe payment URLs.
// Shows a branded loading state while analytics fires.
// Handles subscriptions vs one-time purchases differently.
// Falls back to Landing on unknown key.
// ISO: 2026-05-06
// ============================================================

import { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { getProduct, isSubscription } from "../stripe.config";

// ── Analytics hook ────────────────────────────────────────────────────────────
// Fires before redirect. Extend with gtag, Posthog, or any provider.
function fireCheckoutEvent(key: string, productName: string, price: string) {
  try {
    // gtag (Google Analytics 4)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "begin_checkout", {
        event_category: "ecommerce",
        event_label:    productName,
        value:          price,
        item_id:        key,
      });
    }
    // Posthog
    if (typeof window !== "undefined" && (window as any).posthog) {
      (window as any).posthog.capture("checkout_initiated", {
        product_key:  key,
        product_name: productName,
        price,
      });
    }
  } catch (_) {
    // Never block checkout on analytics failure
  }
}

// ── SE token shim ─────────────────────────────────────────────────────────────
const SE = {
  cream: "var(--se-cream, #f9f6f1)",
  black: "var(--se-black, #1a1a1a)",
  gold:  "var(--se-gold, #d6b168)",
  mid:   "var(--se-mid-gray, #b8b3ac)",
  deep:  "var(--se-deep-charcoal, #2a2a2a)",
  serif: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
  sans:  "var(--font-sans, 'Inter', system-ui, sans-serif)",
  mono:  "var(--font-mono, 'IBM Plex Mono', monospace)",
};

// ── Vertical → back route ─────────────────────────────────────────────────────
const VERTICAL_BACK: Record<string, string> = {
  game:       "/",
  caretide:   "/for-directors",
  shopellari: "https://shopellari.com",
  a11y:       "/",
};

// ── Component ────────────────────────────────────────────────────────────────
export default function CheckoutRedirect() {
  const { key = "" } = useParams<{ key: string }>();
  const product = getProduct(key);

  const [countdown, setCountdown]   = useState(3);
  const [redirecting, setRedirecting] = useState(false);

  // Unknown key — bounce to Landing immediately
  if (!product) return <Navigate to="/" replace />;

  // URL not yet configured — show a holding state instead of broken redirect
  const urlReady = !product.buyUrl.startsWith("PLACEHOLDER");

  useEffect(() => {
    if (!urlReady) return;

    // Fire analytics immediately
    fireCheckoutEvent(key, product.displayName, product.price);

    // 1.5s branded delay — gives analytics time to flush, reinforces product name
    const delay = setTimeout(() => {
      setRedirecting(true);
      window.location.href = product.buyUrl;
    }, 1500);

    return () => clearTimeout(delay);
  }, [key, urlReady]);

  const backRoute = VERTICAL_BACK[product.vertical] ?? "/";
  const isExternal = backRoute.startsWith("http");

  return (
    <div style={{
      minHeight: "100vh", background: SE.black, color: SE.cream,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: SE.sans, textAlign: "center",
      padding: "48px 24px",
    }}>

      {/* EMET mark */}
      <div style={{
        fontFamily: SE.mono, fontSize: "0.58rem", letterSpacing: "0.2em",
        color: SE.gold, textTransform: "uppercase", marginBottom: "32px",
      }}>
        AN EMET / ELLARI VENTURES SYSTEM
      </div>

      {/* Product name */}
      <h1 style={{
        fontFamily: SE.serif, fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
        fontWeight: 300, maxWidth: "560px", lineHeight: 1.2,
        marginBottom: "12px",
      }}>
        {product.displayName}
      </h1>

      {/* Price */}
      <div style={{
        fontFamily: SE.mono, fontSize: "1rem",
        color: SE.gold, marginBottom: "32px",
      }}>
        {product.price}
        {isSubscription(key) && product.trial && (
          <span style={{ color: SE.mid, fontSize: "0.75rem", marginLeft: "8px" }}>
            · {product.trial}-day free trial
          </span>
        )}
      </div>

      {/* Description */}
      <p style={{
        color: SE.mid, fontSize: "0.88rem", maxWidth: "440px",
        lineHeight: 1.7, marginBottom: "40px",
      }}>
        {product.description}
      </p>

      {/* Status */}
      {urlReady ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              display: "inline-block", width: "8px", height: "8px",
              background: SE.gold, borderRadius: "50%",
              animation: "pulse 1s ease-in-out infinite",
            }} />
            <span style={{ fontFamily: SE.mono, fontSize: "0.68rem", letterSpacing: "0.1em", color: SE.mid }}>
              {redirecting ? "REDIRECTING TO SECURE CHECKOUT…" : "PREPARING CHECKOUT…"}
            </span>
          </div>

          {/* Subscription notice */}
          {isSubscription(key) && (
            <div style={{
              padding: "10px 16px",
              border: `1px solid ${SE.deep}`,
              borderRadius: "4px",
              fontSize: "0.75rem", color: SE.mid,
              maxWidth: "380px", lineHeight: 1.55,
            }}>
              Recurring {product.billing} subscription — cancel anytime from your Stripe customer portal.
            </div>
          )}
        </div>
      ) : (
        // Holding state — URL not yet configured
        <div style={{
          padding: "20px 24px",
          border: `1px solid ${SE.deep}`,
          borderRadius: "4px",
          maxWidth: "400px",
        }}>
          <div style={{ fontFamily: SE.mono, fontSize: "0.6rem", letterSpacing: "0.12em", color: SE.gold, marginBottom: "8px" }}>
            COMING SOON
          </div>
          <p style={{ fontSize: "0.82rem", color: SE.mid, lineHeight: 1.6, margin: 0 }}>
            {product.displayName} is not yet available for purchase.
            Check back shortly or contact us directly.
          </p>
        </div>
      )}

      {/* Back link */}
      <div style={{ marginTop: "48px" }}>
        {isExternal ? (
          <a href={backRoute} style={{
            fontFamily: SE.sans, fontSize: "0.75rem",
            color: SE.mid, textDecoration: "none",
          }}>
            ← Back
          </a>
        ) : (
          <Link to={backRoute} style={{
            fontFamily: SE.sans, fontSize: "0.75rem",
            color: SE.mid, textDecoration: "none",
          }}>
            ← Back
          </Link>
        )}
      </div>

      {/* Footer mark */}
      <div style={{
        position: "fixed", bottom: "20px",
        fontFamily: SE.mono, fontSize: "0.55rem",
        color: SE.deep, letterSpacing: "0.1em",
      }}>
        SECURE CHECKOUT VIA STRIPE · ELLARI VENTURES LLC
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
