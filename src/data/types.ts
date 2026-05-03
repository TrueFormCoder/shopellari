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
}
