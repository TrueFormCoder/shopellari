/**
 * WaitlistCapture.tsx — inline email capture for waitlist products
 * Replaces the mailto: CTA on waitlist/coming_soon products.
 * Submits to a Cloudflare Worker endpoint (or falls back to mailto).
 */
import { useState } from "react";

interface WaitlistCaptureProps {
  productId: string;
  productName: string;
  accent: string;
}

// Change this to your Worker endpoint when you build the waitlist API
const WAITLIST_ENDPOINT = "/api/waitlist";
const FALLBACK_EMAIL = "hello@ellari.dev";

export function WaitlistCapture({ productId, productName, accent }: WaitlistCaptureProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async () => {
    if (!email.trim() || !email.includes("@")) return;
    setState("loading");

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId, productName, ts: new Date().toISOString() }),
      });
      if (res.ok) {
        setState("success");
      } else {
        throw new Error("endpoint failed");
      }
    } catch {
      // Fallback: open mailto with email pre-filled in body
      const subject = encodeURIComponent(`Waitlist: ${productName}`);
      const body = encodeURIComponent(`Email: ${email}\nProduct: ${productName}\nProduct ID: ${productId}`);
      window.open(`mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`, "_blank");
      setState("success");
    }
  };

  if (state === "success") {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'DM Mono','Courier New',monospace",
        fontSize: 11, color: accent, letterSpacing: ".06em",
        padding: "9px 0",
      }}>
        ✓ You're on the waitlist
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 4, flex: 1 }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
        placeholder="your@email.com"
        disabled={state === "loading"}
        style={{
          flex: 1,
          padding: "8px 10px",
          fontFamily: "'DM Mono','Courier New',monospace",
          fontSize: 11,
          border: `1px solid ${accent}44`,
          background: "transparent",
          color: "#1c1814",
          outline: "none",
          minWidth: 0,
        }}
        onFocus={e => (e.target.style.borderColor = accent)}
        onBlur={e => (e.target.style.borderColor = `${accent}44`)}
      />
      <button
        onClick={submit}
        disabled={state === "loading" || !email.trim()}
        style={{
          fontFamily: "'DM Mono','Courier New',monospace",
          fontSize: 11,
          padding: "8px 14px",
          background: state === "loading" ? "#ede9e4" : accent,
          color: "#fdfaf6",
          border: "none",
          cursor: state === "loading" ? "not-allowed" : "pointer",
          letterSpacing: ".04em",
          opacity: !email.trim() ? .5 : 1,
          transition: "all .15s",
          whiteSpace: "nowrap",
        }}
      >
        {state === "loading" ? "..." : "Notify me"}
      </button>
    </div>
  );
}
