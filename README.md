# shopellari

Multi-brand product store for the Ellari Ventures ecosystem.
Deployed at shopellari.com via Cloudflare Pages.

## Adding a product

Edit `src/data/products.ts` — add one object to the PRODUCTS array.
The store, filters, and search update automatically. No UI changes needed.

## Adding a brand

Edit `src/data/brands.ts` — add one object to the BRANDS array.

## Tech stack
- React + TypeScript + Vite
- Deployed: Cloudflare Pages
- DNS: Cloudflare (shopellari.com zone already active)
- Fonts: EB Garamond + DM Mono (Google Fonts)
- Payments: Stripe Payment Links (no backend needed)

## Dev
```bash
npm install
npm run dev
```

## Deploy
```bash
npm run build
git add . && git commit -m "..." && git push origin main
# Cloudflare Pages auto-deploys on push to main
```

## Repo ownership
Entity: Ellari Ventures LLC
GitHub: TrueFormCoder/shopellari
Cloudflare Pages project: shopellari
