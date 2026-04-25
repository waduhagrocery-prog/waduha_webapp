# Waduha — Everything Store Web App

The neighborhood store of Al Karama, Dubai — reimagined. Built with **Vite + React + Tailwind CSS**.

> Operated by **Waduha Grocery Store L.L.C S.O.C** (الضحى). Currently selling 500+ grocery essentials. Expanding into personal care, baby, beauty, electronics & more.

## Features

- 🛒 500+ products across 10 grocery categories (expanding to all departments)
- 🎯 Lulu-inspired layout: deals of the day, bento grid for trending items, "coming soon" categories
- 🔍 Search + multi-sort + category filter + pagination
- 🛍️ Cart with localStorage persistence
- 💬 WhatsApp checkout — pre-filled order with customer info, items, total
- 📞 Click-to-call phones (056 378 6754 / 052 728 3484)
- 🛵 Free delivery banner, 24-hour open badge, live activity card
- 📱 Fully mobile responsive
- ⚡ Fast — small JS bundle, edge-served on Vercel

## Brand

- **Name:** Waduha (الضحى — "morning light")
- **Primary:** Coral `#FF6B35`
- **Secondary:** Leaf green `#00A651`
- **Background:** Cream `#FDFBF7`
- **Dark accent:** Ink `#0F0F10`
- **Typography:** Plus Jakarta Sans (display) + Inter (body)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

## Deploy

This repo is wired for **Vercel**. Push to `main` → auto-deploys.

```bash
git push origin main   # auto-deploy via Vercel GitHub integration
```

The included `vercel.json` rewrites all routes to `/` so client-side routing works.

## Updating content

- **Store info / phones / address:** edit `src/config.js`
- **Active categories / future categories:** edit `CATEGORIES` and `COMING_SOON_CATEGORIES` in `src/config.js`
- **Product catalog:** edit `src/products.json` (currently synced from Base44)
- **Brand colors / fonts:** edit `tailwind.config.js`

## Stack

- React 19 + react-router-dom
- Tailwind CSS 3
- Vite 8
- lucide-react (icons)
