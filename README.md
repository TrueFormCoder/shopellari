# shopellari

Multi-brand product store for the Ellari Ventures ecosystem.
Deployed at shopellari.com via Cloudflare Pages.

## Adding a product
Edit `src/data/products.ts` — add one object to the PRODUCTS array.
The store, filters, and search update automatically.

## Adding a brand
Edit `src/data/brands.ts` — add one object to the BRANDS array.

## Tech stack
React + TypeScript + Vite · Cloudflare Pages · Stripe Payment Links

## Dev
npm install && npm run dev

## Deploy
npm run build && git push origin main
