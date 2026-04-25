# Karama Pantry — Waduha Grocery Web App

24-hour grocery delivery site for **Waduha Grocery Store L.L.C** (Karama, Dubai).

Built with **Vite + React + Tailwind CSS**. Static site, no backend required — orders are placed via WhatsApp.

## Features

- 🛒 500+ products across 10 categories (fruits & veg, dairy, meat, rice & grains, spices, beverages, snacks, household, frozen, bakery)
- 🔍 Search + category filter + pagination
- 🛍️ Cart with localStorage persistence
- 💬 WhatsApp checkout — pre-filled order message with customer info, items, total
- 📞 Click-to-call phone numbers (056 378 6754 / 052 728 3484)
- 🛵 Free delivery banner, 24-hour open badge
- 📱 Fully mobile responsive
- ⚡ Fast — 90 KB gzipped

## Brand colors

- Primary green `#00A651`
- Dark green `#006837`
- Accent red `#E30613`
- Highlight yellow `#FFD200`

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

## Deploy

This repo is ready for **Vercel** (zero-config). Either:

1. Import the repo at https://vercel.com/new — Vercel auto-detects Vite.
2. Or run `npx vercel` from this directory.

The included `vercel.json` rewrites all routes to `/` so client-side routing works.

## Updating content

- **Store info / phones / address:** edit `src/config.js`
- **Product catalog:** edit `src/products.json` (synced from Base44)
- **Colors / styling:** edit `tailwind.config.js`

## Stack

- React 19 + react-router-dom
- Tailwind CSS 3
- Vite 8
