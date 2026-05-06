/**
 * types.ts — shopellari.com product registry types
 * Single source of truth for all products across all Ellari Ventures brands.
 */

export type ProductStatus = "live" | "coming_soon" | "waitlist" | "contact" | "archived";
export type ProductType = "subscription_monthly" | "subscription_yearly" | "one_time" | "cohort" | "physical" | "free";
export type ProductCategory =
  | "cognitive_training"
  | "regulatory_defense"
  | "directors"
  | "naming_ip"
  | "personal_development"
  | "hebrew_roots"
  | "b2b_training"
  | "books"
  | "truth_verification"
  | "accessibility"
  | "behavioral_assessment"
  | "creative"
  | "enterprise";

export type BrandId =
  | "logic_rigor"
  | "kindergurus"
  | "seal_protocol"
  | "mirror_protocol"
  | "ash_record_press"
  | "a11y_gate"
  | "eleos"
  | "ellari_ventures";

export interface Brand {
  id: BrandId;
  name: string;
  tagline: string;
  domain: string;
  entity: string;
  color: string;          // accent color hex
  bgColor: string;        // card bg hex
  textColor: string;      // on-brand text hex
  status: "active" | "building" | "proposed";
  description: string;
}

export interface Product {
  id: string;             // slug — e.g. "catch-the-pattern-pro"
  brand: BrandId;
  stripeKey?: string;     // matches stripe.config.ts key on logic-rigor-game
  name: string;           // buyer-facing name (V naming layer)
  tagline: string;        // one line — the sell
  description: string;    // 2-3 sentences for the card
  features: string[];     // 3-5 bullet points
  type: ProductType;
  category: ProductCategory;
  status: ProductStatus;
  price: number;          // in dollars, 0 for free
  priceDisplay: string;   // "$12" or "Free" or "From $97"
  period?: string;        // "/month" "/year" " one-time" "/cohort"
  ctaText: string;        // button label
  ctaUrl: string;         // Stripe payment link, Amazon URL, mailto, or "#waitlist"
  badge?: string;         // "New" "Most Popular" "Best Value" "Coming Soon"
  featured?: boolean;     // show in featured row
  route?: string;         // logic.naci.tech/ROUTE for "See it live" link
  tags?: string[];        // for search
  buyer_state?: string;
  complexity_level?: string;
  not_for_you_if?: string[];
  works_with?: string[];
}

// === ShopEllari Brand Book v1.0 — V's Schema Additions ===

export type BuyerState =
  | 'overwhelmed'
  | 'curious'
  | 'building'
  | 'fixing'
  | 'scaling'
  | 'recovering'
  | 'protecting';

export type ComplexityLevel = 'low' | 'medium' | 'high';

export type UseType = 'self-guided' | 'supported' | 'professional-review-recommended';

export type ProductLifecycle = 'draft' | 'active' | 'upgraded' | 'legacy' | 'deprecated';

export type TrustMark =
  | 'ellari-verified'
  | 'seal-attached'
  | 'system-linked'
  | 'professional-use-ready'
  | 'caregiver-safe'
  | 'evidence-ready'
  | 'versioned-artifact';

// Product Creation Gate — all fields required before a product ships
// If a product can't answer these 4 questions clearly, it is blocked.
export interface ProductCreationGate {
  problem_solved: string;          // What problem does this solve?
  target_state: BuyerState;        // What buyer state does it target?
  system_context: string;          // Where does it fit in the system?
  replaces_or_improves: string;    // What does it replace or improve?
}

// Full product metadata — all fields from V's §XXXV schema
export interface ShopEllariProductMeta {
  product_name: string;
  product_line: string;
  domain: 'identity' | 'systems' | 'emotional' | 'operational' | 'infrastructure';
  function: 'diagnose' | 'build' | 'protect' | 'optimize' | 'translate';
  format: 'tool' | 'kit' | 'guide' | 'system' | 'artifact';
  buyer_state: BuyerState;
  complexity_level: ComplexityLevel;
  system_context: string;          // "This belongs to: [System]. This connects to: [X]. Used when: [Y]."
  proof_type: string;
  version: string;
  recommended_stack: string;
  not_for_you_if: string[];        // Exclusion copy — money filter
  works_with: string[];            // Cross-product flow
  professional_use_ready: boolean;
  use_type: UseType;
  lifecycle: ProductLifecycle;
  trust_marks: TrustMark[];
  used_when: string;               // "Used When" field — mandatory
  next_step?: string;              // System Progression link
  system_id?: string;              // e.g. ELLARI-MIRROR-042
  last_updated?: string;           // ISO date
}
