/**
 * products.ts — the shopellari.com product registry
 *
 * ADDING A NEW PRODUCT: add one object to the PRODUCTS array.
 * Nothing else changes. The store, filters, and search update automatically.
 *
 * Convention:
 *   id: kebab-case slug, unique across all products
 *   stripeKey: must match key in logic-rigor-game/src/stripe.config.ts
 *   ctaUrl: Stripe payment link, Amazon URL, mailto, or "#waitlist"
 */
import type { Product } from "./types";

export const PRODUCTS: Product[] = [

  // ── LOGIC RIGOR — PERSONAL TRAINING ────────────────────────────────

  {
    id: "catch-the-pattern-pro",
    brand: "logic_rigor",
    stripeKey: "pro",
    name: "Catch The Pattern™ Pro",
    tagline: "See what any sentence is really doing.",
    description: "AI-powered logic training for people who work with language under pressure. Seven-step analysis, named fallacies, five training modes. The vocabulary ledger grows with every session.",
    features: [
      "Unlimited sentence analyses",
      "Solo, Challenge, Sparring, Import, Roots ℵ",
      "Vocabulary ledger — grows per session",
      "Root bank + naming stack export",
    ],
    type: "subscription_monthly",
    category: "cognitive_training",
    status: "live",
    price: 12,
    priceDisplay: "$12",
    period: "/month",
    ctaText: "Start Catching Patterns →",
    ctaUrl: "https://buy.stripe.com/6oUaEZgmqa1xf0c8LV7kc0b",
    featured: true,
    route: "/app",
    tags: ["logic", "training", "sentences", "analysis", "fallacies", "writing"],
  },

  {
    id: "pattern-glow-scholar",
    brand: "logic_rigor",
    stripeKey: "scholar",
    name: "Pattern Glow™ Scholar",
    tagline: "Everything in Pro + the full 30-day Mirror Bloom path.",
    description: "The complete Logic Rigor experience. Includes the Mirror Bloom 30-day guided path, day tracking, Mirror Bloom Report at day 30, API access, and CSV/JSON export.",
    features: [
      "Everything in Catch The Pattern™ Pro",
      "Mirror Bloom 30-day guided path",
      "Mirror Bloom Report at day 30",
      "API access + CSV/JSON export",
    ],
    type: "subscription_monthly",
    category: "cognitive_training",
    status: "live",
    price: 29,
    priceDisplay: "$29",
    period: "/month",
    ctaText: "Begin Pattern Glow →",
    ctaUrl: "https://buy.stripe.com/7sY14p4DI3D96tG2nx7kc0a",
    route: "/app",
    tags: ["scholar", "mirror bloom", "30-day", "api", "export"],
  
  buyer_state: "curious",
  complexity_level: "high",
  not_for_you_if: ["You are a beginner — start with the 30-Day Challenge first", "You need formal regulatory analysis — this is personal cognitive training"],
  works_with: ["catch-the-pattern", "pattern-glow-challenge"],
},

  {
    id: "pattern-glow-challenge",
    brand: "logic_rigor",
    stripeKey: "challenge",
    name: "Pattern Glow™ 30-Day Challenge",
    tagline: "One sentence a day. A vocabulary that compounds.",
    description: "A 30-day cognitive precision training path. Learn to name what you already sense — presuppositions, patterns, formal structure. Includes day tracking and a personal Mirror Bloom Report at day 30.",
    features: [
      "30-day guided training path",
      "Day tracking + progress view",
      "All 5 training modes unlocked",
      "Mirror Bloom Report at day 30",
    ],
    type: "one_time",
    category: "personal_development",
    status: "live",
    price: 47,
    priceDisplay: "$47",
    period: " one-time",
    ctaText: "Start the 30-Day Path →",
    ctaUrl: "https://buy.stripe.com/fZu00l4DI1v13hue6f7kc0f",
    badge: "Most Popular",
    featured: true,
    route: "/mirror-bloom",
    tags: ["mirror bloom", "30-day", "challenge", "personal development", "presuppositions"],
  
  buyer_state: "overwhelmed",
  complexity_level: "low",
  not_for_you_if: ["You already have an analysis framework and want advanced modes", "You need a formal regulatory defense tool"],
  works_with: ["catch-the-pattern", "pattern-glow-scholar"],
},

  // ── LOGIC RIGOR — REGULATORY ────────────────────────────────────────

  {
    id: "inspection-defense-individual",
    brand: "logic_rigor",
    stripeKey: "operator",
    name: "Inspection Defense™ Individual",
    tagline: "Read inspection language as structure, not fear.",
    description: "Unlimited regulatory language analysis for licensed operators. Break any inspection finding into failure modes, presuppositions, and exportable response packets. Built by a licensed Texas childcare operator.",
    features: [
      "Unlimited regulatory language analyses",
      "Import mode for full documents",
      "Export response packets",
      "Named fallacy identification + pattern tracking",
    ],
    type: "subscription_yearly",
    category: "regulatory_defense",
    status: "live",
    price: 197,
    priceDisplay: "$197",
    period: "/year",
    ctaText: "Start Defending →",
    ctaUrl: "https://buy.stripe.com/14A3cx5HM8Xt6tG4vF7kc09",
    featured: true,
    route: "/inspection-defense",
    tags: ["inspection", "citation", "regulatory", "HHSC", "admin review", "childcare", "operator"],
  
  buyer_state: "protecting",
  complexity_level: "medium",
  not_for_you_if: ["You are not in a regulated licensed environment", "You want a personal pattern training tool — see Catch The Pattern instead"],
  works_with: ["citation-calm-starter", "directors-defense-full", "catch-the-pattern"],
},

  {
    id: "citation-shield-facility",
    brand: "logic_rigor",
    stripeKey: "facility",
    name: "Citation Shield™ Facility Bundle",
    tagline: "One license protects your entire facility.",
    description: "Up to 5 staff seats. Everything in the Individual License, plus shared admin view and team analysis history. The facility-level regulatory defense system.",
    features: [
      "Up to 5 staff seats",
      "Everything in Inspection Defense™ Individual",
      "Shared admin view + team analysis history",
      "Priority support",
    ],
    type: "subscription_yearly",
    category: "regulatory_defense",
    status: "live",
    price: 497,
    priceDisplay: "$497",
    period: "/year",
    ctaText: "Protect The Facility →",
    ctaUrl: "https://buy.stripe.com/28E00l2vAgpVaJW0fp7kc08",
    badge: "Best Value",
    route: "/inspection-defense",
    tags: ["facility", "team", "childcare", "regulatory", "multi-seat", "operator"],
  },

  // ── LOGIC RIGOR — DIRECTORS ─────────────────────────────────────────

  {
    id: "citation-calm-starter",
    brand: "logic_rigor",
    stripeKey: "director_starter",
    name: "Citation Calm™ Starter",
    tagline: "Slow the citation down before you respond.",
    description: "Inspection language analysis for new daycare directors. Break down any citation or finding into plain language — what it claims, what it assumes, and how to respond. No jargon.",
    features: [
      "20 analyses per month",
      "Plain-language breakdowns — no jargon",
      "Export response receipts",
      "Inspection language decoded table",
    ],
    type: "subscription_yearly",
    category: "directors",
    status: "live",
    price: 97,
    priceDisplay: "$97",
    period: "/year",
    ctaText: "Calm A Citation →",
    ctaUrl: "https://buy.stripe.com/8x23cx1rwa1xcS4gen7kc0e",
    badge: "New",
    featured: true,
    route: "/for-directors",
    tags: ["directors", "daycare", "citation", "new director", "plain language", "HHSC"],
  
  buyer_state: "overwhelmed",
  complexity_level: "low",
  not_for_you_if: ["You need the Admin Review generator — upgrade to Full Access", "You are not a licensed childcare operator"],
  works_with: ["directors-defense-full", "inspection-defense-individual"],
},

  {
    id: "directors-defense-full",
    brand: "logic_rigor",
    stripeKey: "director_full",
    name: "Director's Defense™ Full Access",
    tagline: "From analysis to Admin Review document — in one session.",
    description: "Unlimited analysis plus Admin Review document generation. For directors managing active citations or preparing formal appeals. Converts analysis receipts into complete AR documents ready to file.",
    features: [
      "Unlimited analyses",
      "Admin Review document generator",
      "Full document import mode",
      "Pattern tracking + session history",
    ],
    type: "subscription_yearly",
    category: "directors",
    status: "live",
    price: 197,
    priceDisplay: "$197",
    period: "/year",
    ctaText: "Start Defending →",
    ctaUrl: "https://buy.stripe.com/14A5kFgmqddJcS4gen7kc0d",
    route: "/for-directors",
    tags: ["directors", "admin review", "appeal", "daycare", "HHSC", "unlimited"],
  
  buyer_state: "protecting",
  complexity_level: "medium",
  not_for_you_if: ["You are not a licensed childcare director or program administrator", "You want pattern training only — see Catch The Pattern"],
  works_with: ["citation-calm-starter", "inspection-defense-individual", "catch-the-pattern"],
},

  {
    id: "directors-defense-facility",
    brand: "logic_rigor",
    stripeKey: "director_facility",
    name: "Director's Defense™ Facility Bundle",
    tagline: "Protect your whole team — one license.",
    description: "Up to 5 staff members. Full access for your entire facility team — directors, assistant directors, and compliance staff. Full Admin Review generation included.",
    features: [
      "Up to 5 seats",
      "Everything in Director's Defense Full Access",
      "Shared team analysis history",
      "Team compliance training",
    ],
    type: "subscription_yearly",
    category: "directors",
    status: "live",
    price: 497,
    priceDisplay: "$497",
    period: "/year",
    ctaText: "License Your Facility →",
    ctaUrl: "https://buy.stripe.com/3cIfZjfimgpV6tGaU37kc0c",
    route: "/for-directors",
    tags: ["directors", "facility", "team", "multi-seat", "childcare", "admin review"],
  
  buyer_state: "protecting",
  complexity_level: "medium",
  not_for_you_if: ["You only need one seat — see Full Access", "You do not manage a team of directors or compliance staff"],
  works_with: ["directors-defense-full", "inspection-defense-facility"],
},

  // ── LOGIC RIGOR — NAMING/IP ─────────────────────────────────────────

  {
    id: "name-before-you-file",
    brand: "logic_rigor",
    stripeKey: "naming",
    name: "Name Before You File™",
    tagline: "Test what a name carries before it becomes expensive.",
    description: "Hebrew root analysis with USPTO viability ratings, domain recommendations, and naming stack export. Research-grade IP naming from the oldest systematic semantic architecture on record.",
    features: [
      "Unlimited root analyses",
      "USPTO viability ratings",
      "Domain availability recommendations",
      "Naming stack JSON export",
    ],
    type: "subscription_monthly",
    category: "naming_ip",
    status: "waitlist",
    price: 197,
    priceDisplay: "$197",
    period: "/month",
    ctaText: "Join Waitlist →",
    ctaUrl: "mailto:hello@ellari.dev?subject=Name Before You File — Waitlist",
    tags: ["naming", "trademark", "USPTO", "IP", "Hebrew roots", "brand", "founders"],
  },

  // ── KINDERGURUS — B2B ────────────────────────────────────────────────

  {
    id: "kindergurus-cohort",
    brand: "kindergurus",
    stripeKey: "kindergurus",
    name: "KinderGurus™ Cohort Training",
    tagline: "Regulatory language curriculum for your whole team.",
    description: "Structured EMET-powered curriculum for childcare teams. Group facilitation, completion certificates, and compliance training built by a licensed operator with four active Texas facilities.",
    features: [
      "10+ staff members per cohort",
      "Structured regulatory curriculum",
      "Completion certificates",
      "Group facilitation included",
    ],
    type: "cohort",
    category: "b2b_training",
    status: "contact",
    price: 997,
    priceDisplay: "$997",
    period: "/cohort",
    ctaText: "Request A Cohort →",
    ctaUrl: "mailto:hello@ellari.dev?subject=KinderGurus Cohort Inquiry",
    featured: true,
    tags: ["B2B", "cohort", "childcare", "team training", "compliance", "certificates"],
  
  buyer_state: "scaling",
  complexity_level: "high",
  not_for_you_if: ["You are not operating or opening a childcare facility", "You want a self-guided tool — cohort requires facilitated participation"],
  works_with: ["inspection-defense-individual", "citation-calm-starter", "directors-defense-full"],
},

  // ── ASH & RECORD PRESS — BOOKS ───────────────────────────────────────

  {
    id: "naci-sigler-books",
    brand: "ash_record_press",
    name: "Books by Naci Sigler",
    tagline: "30+ titles — fiction, nonfiction, poetry, spoken word.",
    description: "Published author Naci Sigler (also operating as Ellari Sigler) has 30+ books across fiction, nonfiction, poetry, and spoken word. Available on Amazon, Etsy, and Walmart.",
    features: [
      "30+ published titles",
      "Fiction, nonfiction, poetry, spoken word",
      "Available on Amazon, Etsy, Walmart",
      "Print and digital formats",
    ],
    type: "physical",
    category: "books",
    status: "live",
    price: 0,
    priceDisplay: "From $9.99",
    ctaText: "Browse Books →",
    ctaUrl: "https://www.amazon.com/s?k=naci+sigler&utm_source=shopellari&utm_medium=store&utm_campaign=books&utm_content=naci-sigler-books",
    tags: ["books", "author", "fiction", "poetry", "spoken word", "Naci Sigler"],
  },

  // ── THE SEAL PROTOCOL — COMING SOON ─────────────────────────────────

  {
    id: "sealforge",
    brand: "seal_protocol",
    name: "SealForge™",
    tagline: "Create verifiable truth. Seal it. Share it.",
    description: "The entry point to the Seal Protocol stack. Create sealed truth artifacts — documents, claims, decisions — with cryptographic verification and audit trail. Consumer-facing truth creation.",
    features: [
      "Sealed truth artifacts",
      "Cryptographic verification",
      "Audit trail + receipts",
      "AxisCourt verification integration",
    ],
    type: "subscription_monthly",
    category: "truth_verification",
    status: "waitlist",
    price: 0,
    priceDisplay: "TBA",
    ctaText: "Join Waitlist →",
    ctaUrl: "mailto:hello@ellari.dev?subject=SealForge Waitlist",
    tags: ["truth", "verification", "seal", "documents", "audit", "proof"],
  },

  // ── MIRROR PROTOCOL — COMING SOON ───────────────────────────────────

  {
    id: "mirrormatch",
    brand: "mirror_protocol",
    name: "MirrorMatch™",
    tagline: "Behavioral assessment from the VANTA framework.",
    description: "VANTA Decision Scoring System applied to behavioral and relational assessment. Five-axis scoring: Truth Response, Accountability, Consistency, Reciprocity, Compounding Return.",
    features: [
      "VANTA 25-point behavioral scoring",
      "Relational health assessment",
      "Decision quality analysis",
      "Identity integrity layer",
    ],
    type: "subscription_monthly",
    category: "behavioral_assessment",
    status: "waitlist",
    price: 0,
    priceDisplay: "TBA",
    ctaText: "Join Waitlist →",
    ctaUrl: "mailto:hello@ellari.dev?subject=MirrorMatch Waitlist",
    tags: ["behavioral", "VANTA", "assessment", "relationships", "decisions", "scoring"],
  },

];

// ── Helpers ──────────────────────────────────────────────────────────────

export const LIVE_PRODUCTS = PRODUCTS.filter(p => p.status === "live");
export const FEATURED_PRODUCTS = PRODUCTS.filter(p => p.featured);
export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

export const ALL_CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];
export const ALL_BRANDS = [...new Set(PRODUCTS.map(p => p.brand))];

export function filterProducts(
  products: Product[],
  {
    brand,
    category,
    status,
    search,
  }: {
    brand?: string;
    category?: string;
    status?: string;
    search?: string;
  }
): Product[] {
  return products.filter(p => {
    if (brand && brand !== "all" && p.brand !== brand) return false;
    if (category && category !== "all" && p.category !== category) return false;
    if (status && status !== "all" && p.status !== status) return false;
    if (search) {
      const q = search.toLowerCase();
      const searchable = [
        p.name, p.tagline, p.description,
        ...(p.tags ?? []), p.category, p.brand,
      ].join(" ").toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });
}
