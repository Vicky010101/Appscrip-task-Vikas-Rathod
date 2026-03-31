# Appscrip Task — Vikas Rathod

A fully functional, responsive **Product Listing Page (PLP)** built with Next.js. The project demonstrates server-side rendering, dynamic filtering, cart and wishlist management, and a clean component-based architecture.

## Live Demo

[https://appscrip-task-vikas-rathod.netlify.app]([https://appscrip-task-vikas-rathod.netlify.app](https://appscrip-task-vikasrathod.netlify.app/))

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (Pages Router) |
| Language | JavaScript (ES2022) |
| Styling | CSS Modules |
| Rendering | Server-Side Rendering via `getServerSideProps` |
| Images | `next/image` (optimized, lazy loaded) |
| State | React Context + `useReducer` |
| Data | DummyJSON API (194 products) |
| Deployment | Netlify |

---

## Features

- **Product listing** — 194 real products with images, prices in INR, ratings, and discount badges
- **Navbar category filtering** — New In, Clothing, Shoes, Accessories, Sale
- **Sidebar filters** — filter by category and price range (INR)
- **Sort dropdown** — Recommended, Newest, Popular, Price High→Low, Price Low→High
- **Search** — live search by title, category, or description
- **Cart** — add, remove, adjust quantity, persistent via localStorage
- **Wishlist** — toggle heart on any product, persistent via localStorage
- **Product detail page** — image gallery, related products, add to cart
- **About & Contact pages** — with working contact form validation
- **SSR** — initial data fetched server-side for fast load and SEO
- **Responsive** — mobile, tablet, and desktop layouts
- **SEO** — meta tags, Open Graph, JSON-LD structured data per page
- **Accessibility** — semantic HTML, ARIA labels, skip link, keyboard navigation

---

## Project Structure

```
├── components/
│   ├── Header.js          # Sticky nav with search, cart, wishlist icons
│   ├── Footer.js
│   ├── Sidebar.js         # Category + price filters
│   ├── ProductCard.js     # Memoised card with wishlist + add to cart
│   ├── ProductGrid.js
│   ├── SkeletonGrid.js    # Loading skeleton
│   ├── SortDropdown.js    # Custom sort menu
│   ├── CartDrawer.js      # Slide-in cart panel
│   └── WishlistDrawer.js  # Slide-in wishlist panel
├── context/
│   └── ShopContext.js     # Global cart + wishlist state
├── pages/
│   ├── index.js           # PLP — SSR via getServerSideProps
│   ├── about.js
│   ├── contact.js
│   ├── product/[id].js    # Product detail — SSR
│   ├── 404.js
│   ├── _app.js
│   └── _document.js
├── services/
│   └── api.js             # API calls (DummyJSON + FakeStore fallback)
├── styles/                # CSS Modules per component
└── next.config.mjs
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Vicky010101/Appscrip-task-Vikas-Rathod.git
cd Appscrip-task-Vikas-Rathod

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000

# Production build
npm run build
npm start
```

---

## Deployment

The project is configured for Netlify via `netlify.toml`.

To deploy manually:
1. Push to GitHub
2. Connect the repo at [app.netlify.com](https://app.netlify.com)
3. Netlify auto-detects the config — click **Deploy**

For Vercel:
1. Import at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. Click **Deploy**

---

## API

Products are fetched from [DummyJSON](https://dummyjson.com/docs/products) (194 products across 24 categories). If unavailable, the app falls back to [FakeStore API](https://fakestoreapi.com).

All prices are displayed in **INR** (1 USD = ₹83).
