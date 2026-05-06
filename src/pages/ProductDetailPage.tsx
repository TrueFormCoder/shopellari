// ============================================================
// ShopEllari™ ProductDetailPage.tsx v1.0
// V's Brand Book §XXX — 10-section product detail template
// Route: /product/:id
// Sections: Name → Verdict → Who → What → Get → How →
//           System Context → Not For You If → Proof → CTA
// ============================================================
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { STACKS } from "../data/stacks";

// ── Extended detail content (per-product) ───────────────────
// Add a DETAIL entry for any product that needs rich content.
// Products without an entry get a clean auto-generated page.
const DETAIL_CONTENT: Record<string, {
  verdict: string;
  who: string;
  what: string[];
  get: string[];
  how: string;
  system_context: string;
  proof: string;
  version?: string;
  system_id?: string;
  faqs?: { q: string; a: string }[];
}> = {
  "catch-the-pattern": {
    verdict: "A formal logic training environment. Five modes, six levels, persistent vocabulary ledger.",
    who: "Knowledge workers, operators, and anyone who reads documents that shape decisions — inspection reports, contracts, institutional communications.",
    what: [
      "Formal analysis of any sentence across 8 structured steps",
      "Solo, Challenge, Sparring, Import, and Roots (Hebrew morphology) modes",
      "Six difficulty levels from basic subject-predicate through stacked modal operators",
      "Vocabulary ledger that grows with every session",
      "Failure mode detection — named fallacies with formal receipts",
      "Presupposition extraction — what the sentence assumes without saying",
    ],
    get: [
      "Unlimited AI-powered analysis across all 5 modes",
      "Persistent vocabulary ledger",
      "Hebrew root bank and naming stack export",
      "Import mode for full document analysis",
      "Session history",
    ],
    how: "Open the game at logic.naci.tech. Type any sentence — yours, from a document, from an email. Hit Analyze. The system runs all 8 steps and returns the full structural breakdown. Start with Solo mode to learn the vocabulary, then move to Sparring to hunt for hidden failure modes.",
    system_context: "This belongs to: Logic Rigor / EMET system. This connects to: Pattern Glow Scholar, Inspection Defense, Signal Trace. This is used when: you need to read language precisely before you respond, decide, or file.",
    proof: "Deployed at logic.naci.tech. AI-powered via Claude Sonnet. Vocabulary ledger persists across sessions.",
    version: "v2.1 — Active",
    system_id: "EMET-LRG-001",
    faqs: [
      { q: "Is this a game or a professional tool?", a: "Both. The game mechanics (XP, streaks, sparring rounds) make it easy to build the habit. The output is formal logic analysis you can use in real documents and decisions." },
      { q: "Do I need to know formal logic?", a: "No. The system teaches the vocabulary as you use it. You start with plain-English breakdowns and the formal names appear alongside them." },
      { q: "How is this different from a grammar checker?", a: "Grammar checkers check correctness. This checks structure — what the sentence claims, what it assumes, what logical operators are load-bearing, and where the argument fails." },
    ],
  },

  "inspection-defense-individual": {
    verdict: "Unlimited regulatory language analysis with Admin Review document generation. Built for licensed operators.",
    who: "Licensed childcare operators, directors, and regulated facility managers dealing with active citations, deficiency notices, or inspection findings.",
    what: [
      "Break any inspection finding into its logical structure",
      "Named failure mode identification — equivocation, scope shift, hidden presupposition",
      "Presuppositions panel — what the inspector assumed without arguing",
      "Admin Review generator — produces a complete Texas HHSC AR document structure",
      "Export response packets as timestamped receipts",
      "Full document import — paste the entire inspection narrative",
    ],
    get: [
      "Unlimited analyses",
      "Admin Review generator",
      "Full document import",
      "Export response receipts",
      "Pattern tracking across sessions",
      "Session history",
    ],
    how: "Go to logic.naci.tech/inspection-defense. Paste any citation, finding, or deficiency notice. The system breaks it into its logical structure and names every failure mode. Use the Admin Review generator to produce a point-by-point response document formatted for HHSC filing.",
    system_context: "This belongs to: Inspection Defense™ system. This connects to: Citation Calm, Director's Defense Full Access. This is used when: you have received a citation, deficiency notice, or inspector finding and need to respond formally.",
    proof: "Built by a licensed Texas childcare operator with four active facilities. Used on live HHSC deficiency responses. Deployed at logic.naci.tech/inspection-defense.",
    version: "v1.3 — Active",
    system_id: "INSP-DEF-001",
    faqs: [
      { q: "Does this generate the actual Admin Review document?", a: "Yes. The Admin Review generator takes the analyzed findings and produces a complete point-by-point response structure formatted for Texas HHSC filing. You review and submit." },
      { q: "Is this legal advice?", a: "No. This is a structural analysis tool. It identifies logical failure modes in inspection language and helps you build a documented response. Consult your licensing attorney for legal strategy." },
      { q: "Does it work for states other than Texas?", a: "The Admin Review format is Texas HHSC specific. The inspection language analysis works for any regulatory document." },
    ],
  },

  "citation-calm-starter": {
    verdict: "Plain-language inspection breakdown for new directors. 20 analyses per month.",
    who: "New daycare directors and assistant directors who have received a citation and need to understand what it actually says before responding.",
    what: [
      "Plain-language breakdown of any citation or finding",
      "What it claims, what it assumes, how to respond",
      "Export response receipts",
      "Inspection language decoder",
      "20 analyses per month",
    ],
    get: [
      "20 analyses per month",
      "Plain-language breakdowns",
      "Export response receipts",
      "Session history",
    ],
    how: "Go to logic.naci.tech/for-directors. Paste the citation text. The system returns a plain-language breakdown — no formal logic vocabulary, no jargon. Just: what it claims, what it assumes, and what your response options are.",
    system_context: "This belongs to: Director's Defense system. This connects to: Director's Defense Full Access (upgrade for Admin Review generator), Inspection Defense Individual. This is used when: you just received your first citation and need to understand it before panic sets in.",
    proof: "Built for new directors by an operator with 4 licensed Texas facilities. Logic.naci.tech/for-directors.",
    version: "v1.0 — Active",
    system_id: "DIR-DEF-001",
    faqs: [
      { q: "How is this different from Inspection Defense?", a: "Citation Calm uses plain language — no formal logic terms. It is designed for directors who are new to regulatory environments. Inspection Defense is for operators who need the full formal analysis and Admin Review generation." },
      { q: "Can I upgrade to Full Access later?", a: "Yes. Full Access adds the Admin Review generator and unlimited analyses. Your history carries over." },
    ],
  },

  "signal-trace-vol1": {
    verdict: "12 printable pattern exercises across 3 levels. No app. No account. No updates required.",
    who: "Adults who think better when the noise stops. Founders before strategy sessions, parents building a quiet practice, anyone who wants structured attention without a screen.",
    what: [
      "12 pattern exercises across P1 Trace, P2 Follow, P3 Branch levels",
      "Single-rule grids through three-rule systems with precedence",
      "Answer key, session guide, and print-optimized version included",
      "Classroom-ready at 6 pages, 2 exercises per page",
      "Group license terms included",
    ],
    get: [
      "SignalTrace_v1.zip — 8 files",
      "README-FIRST.pdf — setup and intent",
      "QUICKSTART.pdf — immediate use guide",
      "12-game main packet",
      "Answer key",
      "Session guide",
      "Print version (classroom layout)",
      "LICENSE.txt — personal and group terms",
    ],
    how: "Download the zip. Open README-FIRST. Print the exercises you want on standard paper. Use a pencil. No setup. Start with P1 Trace if you are new to pattern work. Move to P3 Branch when P2 feels easy.",
    system_context: "This belongs to: Pattern Training™ system. This connects to: Catch The Pattern Pro (digital equivalent), Pattern Glow 30-Day Challenge (structured path). This is used when: you want a completely offline, no-account cognitive practice tool.",
    proof: "Derived from the ELEOS operator taxonomy. EMIT, RECEIVE, COMPILE, GUIDE are the generating primitives. Versioned artifact — each exercise is traceable to a specific operator.",
    version: "v1.0 — Active",
    system_id: "PT-STv1-001",
    faqs: [
      { q: "Is this a PDF download?", a: "Yes. You receive a zip file with 8 PDFs. Print what you need, when you need it. No account, no app, no expiration." },
      { q: "Can I use this in a classroom?", a: "The included LICENSE.txt covers group use. A group license for up to 30 participants is available — contact licensing@ellari.dev." },
      { q: "How is this different from a puzzle book?", a: "Each exercise derives from a specific logical operator. The difficulty progression follows operator complexity, not arbitrary puzzle design. It is structured attention practice, not entertainment." },
    ],
  },

  "pattern-glow-challenge": {
    verdict: "30-day guided cognitive training path. One sentence a day. A vocabulary that grows.",
    who: "People who already sense that something in a conversation felt off — and want the vocabulary to name it precisely.",
    what: [
      "30-day structured training path with day tracking",
      "All 5 analysis modes unlocked",
      "Presuppositions panel — see what is unsaid",
      "Vocabulary ledger grows with every session",
      "Mirror Bloom Report at day 30 — personal cognitive precision document",
    ],
    get: [
      "30-day path access",
      "Day tracking and progress view",
      "All 5 training modes",
      "Mirror Bloom Report at day 30",
      "Vocabulary ledger",
    ],
    how: "Open logic.naci.tech/mirror-bloom. Start day 1. One sentence per day minimum — yours, from something that happened, from a document on your desk. The ledger builds automatically. At day 30 the Mirror Bloom Report generates from your full session history.",
    system_context: "This belongs to: Mirror Bloom / Pattern Glow system. This connects to: Pattern Glow Scholar (full subscription), Catch The Pattern Pro. This is used when: you want a defined starting point with an endpoint that produces a personal cognitive receipt.",
    proof: "Deployed at logic.naci.tech/mirror-bloom. AI-powered. Vocabulary ledger persists.",
    version: "v1.0 — Active",
    system_id: "PG-30D-001",
    faqs: [
      { q: "What is the Mirror Bloom Report?", a: "At day 30 the system generates a personal document from your session history — vocabulary acquired, failure modes you identified most frequently, and your strongest analysis patterns. It is a cognitive precision receipt." },
      { q: "Do I have to do it every day?", a: "No. The path is self-paced. Day tracking shows your progress but does not expire." },
    ],
  },
};

// ── Component ────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return (
    <div style={{ padding: "80px 32px", textAlign: "center", fontFamily: "var(--font-sans, sans-serif)" }}>
      <p style={{ color: "var(--se-mid-gray, #b8b3ac)" }}>Product not found.</p>
      <Link to="/" style={{ color: "var(--se-gold, #d6b168)" }}>← Return to store</Link>
    </div>
  );

  const detail = DETAIL_CONTENT[product.id];
  const relatedStacks = STACKS.filter(s => s.products.some(sp => sp.id === product.id));
  const worksWithProducts = (product.works_with || [])
    .map(wid => PRODUCTS.find(p => p.id === wid))
    .filter(Boolean);
  const ctaUrl = product.ctaUrl;

  return (
    <div style={{ fontFamily: "var(--font-sans, Inter, sans-serif)", background: "var(--se-cream, #f9f6f1)", minHeight: "100vh" }}>

      {/* ── S1: Name + Verdict ─────────────────────────────── */}
      <header style={{ background: "var(--se-black, #1a1a1a)", color: "var(--se-cream, #f9f6f1)", padding: "48px 32px 44px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link to="/" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-gold, #d6b168)", textDecoration: "none", letterSpacing: "0.12em", display: "inline-block", marginBottom: "24px" }}>
            ← SHOPELLARI™
          </Link>
          {detail?.system_id && (
            <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.62rem", color: "var(--se-mid-gray, #b8b3ac)", letterSpacing: "0.12em", marginBottom: "10px" }}>
              {detail.system_id} {detail.version && `— ${detail.version}`}
            </p>
          )}
          <h1 style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, margin: "0 0 16px" }}>
            {product.name}
          </h1>
          <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "1rem", lineHeight: 1.6, maxWidth: "560px", marginBottom: "24px" }}>
            {detail?.verdict || product.tagline}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "1.1rem", color: "var(--se-cream, #f9f6f1)", fontWeight: 500 }}>
              {product.price}
            </span>
            {product.badge && (
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.6rem", padding: "3px 10px", border: "1px solid var(--se-gold, #d6b168)", color: "var(--se-gold, #d6b168)", letterSpacing: "0.1em" }}>
                {product.badge}
              </span>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "56px 24px" }}>

        {/* ── S2: Who ──────────────────────────────────────── */}
        {detail?.who && (
          <Section label="WHO THIS IS BUILT FOR">
            <p style={{ lineHeight: 1.7, color: "var(--se-black, #1a1a1a)", fontSize: "0.95rem" }}>{detail.who}</p>
          </Section>
        )}

        {/* ── S3: What it does ─────────────────────────────── */}
        {detail?.what && (
          <Section label="WHAT IT DOES">
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {detail.what.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--se-black, #1a1a1a)" }}>
                  <span style={{ color: "var(--se-gold, #d6b168)", fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", marginTop: "4px", flexShrink: 0 }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── S4: What you get ─────────────────────────────── */}
        {detail?.get && (
          <Section label="WHAT YOU GET">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {detail.get.map((item, i) => (
                <span key={i} style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "2px", padding: "6px 12px", fontSize: "0.8rem", color: "var(--se-black, #1a1a1a)", fontFamily: "var(--font-sans, sans-serif)" }}>
                  {item}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* ── S5: How to use ───────────────────────────────── */}
        {detail?.how && (
          <Section label="HOW TO USE IT">
            <p style={{ lineHeight: 1.7, color: "var(--se-black, #1a1a1a)", fontSize: "0.95rem" }}>{detail.how}</p>
          </Section>
        )}

        {/* ── S6: System context ───────────────────────────── */}
        {detail?.system_context && (
          <Section label="SYSTEM CONTEXT">
            <div style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderLeft: "3px solid var(--se-gold, #d6b168)", borderRadius: "2px", padding: "20px 24px" }}>
              <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--se-black, #1a1a1a)", margin: 0 }}>
                {detail.system_context}
              </p>
            </div>
          </Section>
        )}

        {/* ── S7: Not For You If ───────────────────────────── */}
        {product.not_for_you_if && product.not_for_you_if.length > 0 && (
          <Section label="NOT FOR YOU IF">
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {product.not_for_you_if.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", fontSize: "0.875rem", lineHeight: 1.6, color: "var(--se-mid-gray, #b8b3ac)" }}>
                  <span style={{ color: "var(--se-mid-gray, #b8b3ac)", flexShrink: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── S8: Proof / Seal / Version ───────────────────── */}
        {detail?.proof && (
          <Section label="PROOF / VERSION">
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--se-black, #1a1a1a)" }}>{detail.proof}</p>
            {detail.version && (
              <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-gold, #d6b168)", marginTop: "12px", letterSpacing: "0.08em" }}>
                {detail.version}
              </p>
            )}
          </Section>
        )}

        {/* ── S9: FAQ ──────────────────────────────────────── */}
        {detail?.faqs && detail.faqs.length > 0 && (
          <Section label="QUESTIONS">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {detail.faqs.map((faq, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "4px", padding: "20px 24px" }}>
                  <p style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1rem", fontWeight: 500, margin: "0 0 8px", color: "var(--se-black, #1a1a1a)" }}>{faq.q}</p>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--se-mid-gray, #b8b3ac)", margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── S10: CTA ─────────────────────────────────────── */}
        <section style={{ background: "var(--se-black, #1a1a1a)", borderRadius: "4px", padding: "40px 32px", textAlign: "center", marginTop: "48px" }}>
          <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.62rem", color: "var(--se-gold, #d6b168)", letterSpacing: "0.15em", marginBottom: "12px" }}>
            {product.price} — {product.type || "TOOL"}
          </p>
          <h3 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.6rem", fontWeight: 400, color: "var(--se-cream, #f9f6f1)", margin: "0 0 24px" }}>
            {product.name}
          </h3>
          {ctaUrl && ctaUrl !== "#pricing" ? (
            <a href={ctaUrl} style={{ display: "inline-block", background: "var(--se-gold, #d6b168)", color: "var(--se-black, #1a1a1a)", padding: "14px 40px", fontFamily: "var(--font-sans, sans-serif)", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none", borderRadius: "2px", letterSpacing: "0.05em" }}>
              {product.ctaText || "Add To Your System"}
            </a>
          ) : (
            <div>
              <p style={{ color: "var(--se-mid-gray, #b8b3ac)", fontSize: "0.875rem", marginBottom: "16px" }}>Coming soon — enter your email to be notified.</p>
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                <input type="email" placeholder="your@email.com" style={{ padding: "12px 16px", border: "1px solid var(--se-mid-gray, #b8b3ac)", borderRadius: "2px", background: "transparent", color: "var(--se-cream, #f9f6f1)", fontFamily: "var(--font-sans, sans-serif)", fontSize: "0.875rem", width: "240px" }} />
                <button style={{ background: "var(--se-gold, #d6b168)", color: "var(--se-black, #1a1a1a)", border: "none", padding: "12px 24px", borderRadius: "2px", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}>Notify Me</button>
              </div>
            </div>
          )}
        </section>

        {/* ── Works with ───────────────────────────────────── */}
        {worksWithProducts.length > 0 && (
          <section style={{ marginTop: "48px" }}>
            <GoldLabel label="WORKS WITH THIS" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px", marginTop: "16px" }}>
              {worksWithProducts.map((p: any) => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1px solid var(--se-soft-gray, #e6e2dc)", borderRadius: "4px", padding: "16px 20px", transition: "border-color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--se-gold, #d6b168)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--se-soft-gray, #e6e2dc)"}>
                    <div style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "0.95rem", color: "var(--se-black, #1a1a1a)", marginBottom: "4px" }}>{p.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--se-mid-gray, #b8b3ac)" }}>{p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── In these stacks ──────────────────────────────── */}
        {relatedStacks.length > 0 && (
          <section style={{ marginTop: "40px" }}>
            <GoldLabel label="INCLUDED IN" />
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
              {relatedStacks.map(s => (
                <Link key={s.id} to={`/stacks/${s.id}`} style={{ textDecoration: "none", fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", padding: "6px 14px", border: "1px solid var(--se-gold, #d6b168)", color: "var(--se-gold, #d6b168)", borderRadius: "2px", letterSpacing: "0.08em" }}>
                  {s.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <Link to="/" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.65rem", color: "var(--se-mid-gray, #b8b3ac)", textDecoration: "none", letterSpacing: "0.1em" }}>
            ← RETURN TO SHOPELLARI™
          </Link>
        </div>
      </main>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "44px" }}>
      <GoldLabel label={label} />
      <div style={{ marginTop: "16px" }}>{children}</div>
    </section>
  );
}

function GoldLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ height: "1px", width: "24px", background: "var(--se-gold, #d6b168)" }} />
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.62rem", letterSpacing: "0.15em", color: "var(--se-gold, #d6b168)", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}
