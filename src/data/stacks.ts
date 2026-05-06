// ============================================================
// ShopEllari™ Stack System v1.0
// V's Brand Book §XXXII, §LXVI–LXVII, §LV
// ISO: 2026-05-06
//
// Stacks are named, engineered product combinations.
// Savings: 10–18% max — never 40% (deep discounting cheapens the system).
// CTA: "Build This Stack" — not "Buy Bundle"
// ============================================================

export interface StackProduct {
  id: string;              // matches products.ts id
  role: string;            // what this product does within the stack
  order: number;           // recommended use order
}

export interface Stack {
  id: string;
  name: string;            // e.g. "The Start Clear Stack™"
  tagline: string;         // one-line stack function
  buyer_state: string;     // entry buyer state this solves
  what_it_solves: string;
  products: StackProduct[];
  use_order: string;       // plain-language order description
  best_for: string;
  not_for: string;
  savings_pct: number;     // 10–18 only
  stripe_bundle_key?: string;
  stripe_url?: string;
  status: 'active' | 'coming-soon' | 'archived';
  system_id: string;       // e.g. SE-STACK-001
}

export const STACKS: Stack[] = [

  {
    id: 'start-clear-stack',
stripe_url: 'https://buy.stripe.com/cNi5kFb261v1dW8d2b7kc0h',
    name: 'The Start Clear Stack™',
    tagline: 'First tools for people who need to begin.',
    buyer_state: 'overwhelmed',
    what_it_solves: 'Decision overload at the entry point. You need one place to start, not fifteen options.',
    products: [
      { id: 'signal-trace-vol1',   role: 'Entry diagnostic — trains pattern recognition before anything else', order: 1 },
      { id: 'catch-the-pattern',   role: 'Core training environment — 5 modes, 6 levels', order: 2 },
    ],
    use_order: 'Signal Trace first (offline, no setup). Then Catch The Pattern to build your analysis vocabulary.',
    best_for: 'First-time buyers, people who feel overwhelmed by complexity, anyone building a new system from scratch.',
    not_for: 'People who already have an analysis framework and want advanced operators.',
    savings_pct: 15,
    stripe_bundle_key: 'stack_start_clear',
    status: 'coming-soon',
    system_id: 'SE-STACK-001',
  },

  {
    id: 'record-it-stack',
stripe_url: 'https://buy.stripe.com/14A28t8TYb5Bg4g4vF7kc0g',
    name: 'The Record It Stack™',
    tagline: 'For people who need evidence, memory, and decision traceability.',
    buyer_state: 'protecting',
    what_it_solves: 'You have things that need to be documented before they disappear. Inspections, decisions, receipts, findings.',
    products: [
      { id: 'inspection-defense',  role: 'Analyze and document inspection language formally', order: 1 },
      { id: 'citation-calm',       role: 'Plain-language breakdown for active citation response', order: 2 },
    ],
    use_order: 'Inspection Defense for structural analysis. Citation Calm for immediate operational response. Use together for evidence production.',
    best_for: 'Licensed operators, directors, caregivers, anyone in a regulated environment.',
    not_for: 'People who are not dealing with documented regulatory, legal, or institutional records.',
    savings_pct: 12,
    stripe_bundle_key: 'stack_record_it',
    status: 'coming-soon',
    system_id: 'SE-STACK-002',
  },

  {
    id: 'home-rhythm-stack',
    name: 'The Home Rhythm Stack™',
    tagline: 'Operational structure for the people running homes, not companies.',
    buyer_state: 'overwhelmed',
    what_it_solves: 'Home operations have no infrastructure. Caregivers, parents, and home managers are running complex systems with zero tools designed for them.',
    products: [
      { id: 'pattern-glow-challenge', role: '30-day pattern recognition training — builds the foundation', order: 1 },
    ],
    use_order: 'Pattern Glow 30-day challenge sets the cognitive base. Add operational tools as they become available in Phase 2.',
    best_for: 'Parents, caregivers, home managers, anyone running household operations without formal frameworks.',
    not_for: 'Professional operators who need institutional-grade tools — see the Operator Stack instead.',
    savings_pct: 10,
    stripe_bundle_key: 'stack_home_rhythm',
    status: 'coming-soon',
    system_id: 'SE-STACK-003',
  },

  {
    id: 'operator-stack',
stripe_url: 'https://buy.stripe.com/28E6oJ0ns1v14ly5zJ7kc0i',
    name: 'The Operator Stack™',
    tagline: 'Advanced tools for founders, admins, and system builders.',
    buyer_state: 'building',
    what_it_solves: 'You are building something that needs to work at scale. You need frameworks, governance templates, and analysis tools that are serious enough to hold.',
    products: [
      { id: 'catch-the-pattern',   role: 'Core formal analysis environment', order: 1 },
      { id: 'inspection-defense',  role: 'Regulatory language analysis + AR generation', order: 2 },
      { id: 'naming-roots-lab',    role: 'IP naming research — Semitic root derivation + USPTO viability', order: 3 },
    ],
    use_order: 'Catch The Pattern for analytical foundation. Inspection Defense for regulatory work. Name Before You File for IP pipeline.',
    best_for: 'Founders, operators, consultants, system builders who are in active build or compliance mode.',
    not_for: 'Casual users who want simple tools. The Operator Stack is a system commitment.',
    savings_pct: 18,
    stripe_bundle_key: 'stack_operator',
    status: 'coming-soon',
    system_id: 'SE-STACK-004',
  },

  {
    id: 'protected-launch-stack',
stripe_url: 'https://buy.stripe.com/14AfZj4DIc9FdW8faj7kc0j',
    name: 'The Protected Launch Stack™',
    tagline: 'For product and brand builders preparing a release.',
    buyer_state: 'scaling',
    what_it_solves: 'Most launches fail before they start because the IP is unprotected and the language is imprecise. This stack closes both gaps.',
    products: [
      { id: 'naming-roots-lab',    role: 'Name derivation + USPTO viability before you file', order: 1 },
      { id: 'catch-the-pattern',   role: 'Formal language analysis for brand voice precision', order: 2 },
    ],
    use_order: 'Name Before You File first — lock IP before announcing. Catch The Pattern to audit brand language for logical precision.',
    best_for: 'Founders, brand builders, product creators in pre-launch or launch mode.',
    not_for: 'People who have already filed or are not in an IP-sensitive stage.',
    savings_pct: 15,
    stripe_bundle_key: 'stack_protected_launch',
    status: 'coming-soon',
    system_id: 'SE-STACK-005',
  },

];

// Stack helper
export function getStackById(id: string): Stack | undefined {
  return STACKS.find(s => s.id === id);
}

export function getActiveStacks(): Stack[] {
  return STACKS.filter(s => s.status === 'active');
}

// Savings display helper — never show > 18%
export function formatStackSavings(pct: number): string {
  const capped = Math.min(pct, 18);
  return `Save ${capped}%`;
}
