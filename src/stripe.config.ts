// ============================================================
// stripe.config.ts — ELLARI VENTURES PRODUCT REGISTRY
// Single source of truth for ALL products across all verticals.
// buyUrl: replace PLACEHOLDER strings with real buy.stripe.com URLs.
// ISO: 2026-05-06
//
// Stripe dashboard rename sequence (matches displayName):
//   Logic Rigor Pro          → Catch The Pattern™ Pro
//   Logic Rigor Scholar      → Pattern Glow™ Scholar
//   Mirror Bloom Logic™...   → Pattern Glow™ — 30-Day Challenge
//   Director's Defense — Starter      → Citation Calm™ — Director Starter
//   Director's Defense — Full Access  → Citation Calm™ — Full Defense
//   Director's Defense — Facility     → Citation Calm™ — Facility
//   Inspection Defense — Individual   → Inspection Defense™ — Operator
//   Inspection Defense — Facility     → Inspection Defense™ — Facility
// ============================================================

export type BillingCycle = "monthly" | "annual" | "one_time";
export type ProductType  = "subscription" | "purchase";
export type Vertical     = "game" | "caretide" | "shopellari" | "a11y";

export interface StripeProduct {
  key:               string;
  displayName:       string;        // V naming layer — shown in app UI
  stripeProductName: string;        // What Stripe product should be renamed to
  price:             string;        // Display string: "$12/mo", "$97/yr", "$47"
  priceAmount:       number;        // Numeric for sorting / comparison
  billing:           BillingCycle;
  type:              ProductType;
  buyUrl:            string;        // buy.stripe.com/... — REPLACE PLACEHOLDERS
  description:       string;        // Shown on CheckoutRedirect loading screen
  vertical:          Vertical;
  trial?:            number;        // Free trial days (subscriptions only)
  featured?:         boolean;
}

// ── GAME VERTICAL ─────────────────────────────────────────────────────────────
const GAME_PRODUCTS: StripeProduct[] = [
  {
    key:               "catch_the_pattern_pro",
    displayName:       "Catch The Pattern™ Pro",
    stripeProductName: "Catch The Pattern™ Pro",
    price:             "$12/mo",
    priceAmount:       12,
    billing:           "monthly",
    type:              "subscription",
    buyUrl:            "PLACEHOLDER_CATCH_THE_PATTERN_PRO",
    description:       "Five analysis modes. Six difficulty levels. Persistent vocabulary ledger.",
    vertical:          "game",
    trial:             7,
  },
  {
    key:               "pattern_glow_scholar",
    displayName:       "Pattern Glow™ Scholar",
    stripeProductName: "Pattern Glow™ Scholar",
    price:             "$29/mo",
    priceAmount:       29,
    billing:           "monthly",
    type:              "subscription",
    buyUrl:            "PLACEHOLDER_PATTERN_GLOW_SCHOLAR",
    description:       "All Pro features plus the 30-day guided Pattern Glow path, day tracking, and your Pattern Glow Report at day 30.",
    vertical:          "game",
    featured:          true,
    trial:             7,
  },
  {
    key:               "pattern_glow_challenge",
    displayName:       "Pattern Glow™ — 30-Day Challenge",
    stripeProductName: "Pattern Glow™ — 30-Day Challenge",
    price:             "$47",
    priceAmount:       47,
    billing:           "one_time",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_PATTERN_GLOW_CHALLENGE",
    description:       "One sentence per day for 30 days. Pattern Glow Report generated at day 30.",
    vertical:          "game",
  },
];

// ── CARETIDE VERTICAL ─────────────────────────────────────────────────────────
const CARETIDE_PRODUCTS: StripeProduct[] = [
  {
    key:               "citation_calm_starter",
    displayName:       "Citation Calm™ — Director Starter",
    stripeProductName: "Citation Calm™ — Director Starter",
    price:             "$97/yr",
    priceAmount:       97,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_CITATION_CALM_STARTER",
    description:       "Plain-language inspection breakdown for new directors. 20 analyses per month.",
    vertical:          "caretide",
  },
  {
    key:               "citation_calm_full",
    displayName:       "Citation Calm™ — Full Defense",
    stripeProductName: "Citation Calm™ — Full Defense",
    price:             "$197/yr",
    priceAmount:       197,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_CITATION_CALM_FULL",
    description:       "Unlimited citation analyses plus Admin Review document generation.",
    vertical:          "caretide",
    featured:          true,
  },
  {
    key:               "citation_calm_facility",
    displayName:       "Citation Calm™ — Facility",
    stripeProductName: "Citation Calm™ — Facility",
    price:             "$497/yr",
    priceAmount:       497,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_CITATION_CALM_FACILITY",
    description:       "Up to 5 staff seats. Full Defense for your entire facility team.",
    vertical:          "caretide",
  },
  {
    key:               "inspection_defense_individual",
    displayName:       "Inspection Defense™ — Operator",
    stripeProductName: "Inspection Defense™ — Operator",
    price:             "$197/yr",
    priceAmount:       197,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_INSPECTION_DEFENSE_INDIVIDUAL",
    description:       "Unlimited inspection language analysis and Admin Review generation.",
    vertical:          "caretide",
    featured:          true,
  },
  {
    key:               "inspection_defense_facility",
    displayName:       "Inspection Defense™ — Facility",
    stripeProductName: "Inspection Defense™ — Facility",
    price:             "$497/yr",
    priceAmount:       497,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_INSPECTION_DEFENSE_FACILITY",
    description:       "Up to 5 staff seats. Everything in Operator for your entire facility team.",
    vertical:          "caretide",
  },
];

// ── SHOPELLARI STACK VERTICAL ─────────────────────────────────────────────────
const STACK_PRODUCTS: StripeProduct[] = [
  {
    key:               "start_clear_stack",
    displayName:       "The Start Clear Stack™",
    stripeProductName: "The Start Clear Stack™ — ShopEllari",
    price:             "$35",
    priceAmount:       35,
    billing:           "one_time",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_START_CLEAR_STACK",
    description:       "The foundation stack for new licensed operators. Documentation, intake, and compliance starter kit.",
    vertical:          "shopellari",
  },
  {
    key:               "record_it_stack",
    displayName:       "The Record It Stack™",
    stripeProductName: "The Record It Stack™ — ShopEllari",
    price:             "$250/yr",
    priceAmount:       250,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_RECORD_IT_STACK",
    description:       "Systematic documentation for licensed operators. Everything you need to record before, during, and after an inspection.",
    vertical:          "shopellari",
  },
  {
    key:               "protected_launch_stack",
    displayName:       "The Protected Launch Stack™",
    stripeProductName: "The Protected Launch Stack™ — ShopEllari",
    price:             "$200/yr",
    priceAmount:       200,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_PROTECTED_LAUNCH_STACK",
    description:       "For operators launching a new facility. The full compliance, documentation, and naming protection framework.",
    vertical:          "shopellari",
  },
  {
    key:               "operator_stack",
    displayName:       "The Operator Stack™",
    stripeProductName: "The Operator Stack™ — ShopEllari",
    price:             "$285/yr",
    priceAmount:       285,
    billing:           "annual",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_OPERATOR_STACK",
    description:       "The complete operational system for licensed childcare operators. Inspection defense, documentation, and ongoing compliance.",
    vertical:          "shopellari",
    featured:          true,
  },
];

// ── A11Y GATE VERTICAL ────────────────────────────────────────────────────────
const A11Y_PRODUCTS: StripeProduct[] = [
  {
    key:               "a11y_starter_kit",
    displayName:       "A11y Gate™ — Starter Kit",
    stripeProductName: "A11y Gate — Starter Kit",
    price:             "See plans",
    priceAmount:       0,
    billing:           "one_time",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_A11Y_STARTER_KIT",
    description:       "Accessibility audit foundation. Structured review for WCAG 2.2 compliance.",
    vertical:          "a11y",
  },
  {
    key:               "a11y_design_bundle",
    displayName:       "A11y Gate™ — Design Bundle",
    stripeProductName: "A11y Gate — Design Bundle",
    price:             "$29",
    priceAmount:       29,
    billing:           "one_time",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_A11Y_DESIGN_BUNDLE",
    description:       "Accessibility audit toolkit for design teams. Component-level WCAG review.",
    vertical:          "a11y",
  },
  {
    key:               "a11y_professional_toolkit",
    displayName:       "A11y Gate™ — Professional Toolkit",
    stripeProductName: "A11y Gate — Professional Toolkit",
    price:             "$49",
    priceAmount:       49,
    billing:           "one_time",
    type:              "purchase",
    buyUrl:            "PLACEHOLDER_A11Y_PROFESSIONAL_TOOLKIT",
    description:       "Full accessibility audit system for professional developers and QA teams.",
    vertical:          "a11y",
  },
  {
    key:               "a11y_studio_license",
    displayName:       "A11y Gate™ — Studio License",
    stripeProductName: "A11y Gate — Studio License",
    price:             "See plans",
    priceAmount:       0,
    billing:           "monthly",
    type:              "subscription",
    buyUrl:            "PLACEHOLDER_A11Y_STUDIO_LICENSE",
    description:       "Studio-level accessibility compliance for agencies and multi-project teams.",
    vertical:          "a11y",
    featured:          true,
  },
];

// ── MASTER REGISTRY ───────────────────────────────────────────────────────────
export const PRODUCTS: StripeProduct[] = [
  ...GAME_PRODUCTS,
  ...CARETIDE_PRODUCTS,
  ...STACK_PRODUCTS,
  ...A11Y_PRODUCTS,
];

// ── LOOKUP HELPERS ────────────────────────────────────────────────────────────
export const getProduct = (key: string): StripeProduct | undefined =>
  PRODUCTS.find(p => p.key === key);

export const getProductsByVertical = (vertical: Vertical): StripeProduct[] =>
  PRODUCTS.filter(p => p.vertical === vertical);

export const isSubscription = (key: string): boolean =>
  getProduct(key)?.type === "subscription";

// ── URL VALIDATION (dev only) ─────────────────────────────────────────────────
