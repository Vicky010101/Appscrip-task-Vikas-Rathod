# Appscrip Task — Vikas Rathod

A production-ready, SEO-optimized **Product Listing Page (PLP)** built with Next.js and the Fake Store API.

## Live Demo

> [https://appscrip-task-vikas-rathod.vercel.app](https://appscrip-task-vikas-rathod.vercel.app)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (Pages Router) |
| Language | JavaScript |
| Styling | CSS Modules + plain CSS |
| Rendering | Server-Side Rendering (SSR) via `getServerSideProps` |
| Images | `next/image` with remote pattern config |
| API | [Fake Store API](https://fakestoreapi.com) |
| Deployment | Vercel |

---

## Features

- **SSR** — products and categories fetched server-side for SEO
- **Sidebar filters** — filter by category and price range
- **Sorting** — Featured, Price Low→High, Price High→Low, Top Rated, A–Z
- **Pagination** — 12 products per page
- **Wishlist toggle** — per-card heart button
- **Loading skeletons** — shimmer placeholders while data loads
- **Responsive** — mobile (≤768px), tablet (≤1024px), desktop
- **SEO** — meta tags, Open Graph, JSON-LD structured data, canonical URL
- **Accessibility** — skip link, ARIA labels, semantic HTML

---

## Project Structure

```
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Sidebar.js
│   ├── ProductCard.js
│   ├── ProductGrid.js
│   └── SkeletonGrid.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js        ← PLP with getServerSideProps
│   └── 404.js
├── services/
│   └── api.js          ← Fake Store API calls
├── styles/
│   ├── globals.css
│   ├── Header.module.css
│   ├── Footer.module.css
│   ├── Sidebar.module.css
│   ├── ProductCard.module.css
│   ├── ProductGrid.module.css
│   ├── Skeleton.module.css
│   └── Plp.module.css
└── next.config.mjs
```

---

## Setup

```bash
# Clone
git clone https://github.com/VikasRathod/Appscrip-task-Vikas-Rathod.git
cd Appscrip-task-Vikas-Rathod

# Install
npm install

# Dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy** — no env vars needed

---

## API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `GET /products` | All products (SSR) |
| `GET /products/categories` | Category list (SSR) |
