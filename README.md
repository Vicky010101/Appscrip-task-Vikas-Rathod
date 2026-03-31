# Appscrip Task â€” Vikas Rathod

A fully functional, responsive **Product Listing Page (PLP)** built with Next.js. The project demonstrates server-side rendering, dynamic filtering, cart and wishlist management, and a clean component-based architecture.

## Live Demo

[https://appscrip-task-vikasrathod.netlify.app](https://appscrip-task-vikasrathod.netlify.app)

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

- **Product listing** â€” 194 real products with images, prices in INR, ratings, and discount badges
- **Navbar category filtering** â€” New In, Clothing, Shoes, Accessories, Sale
- **Sidebar filters** â€” filter by category and price range (INR)
- **Sort dropdown** â€” Recommended, Newest, Popular, Price Highâ†’Low, Price Lowâ†’High
- **Search** â€” live search by title, category, or description
- **Cart** â€” add, remove, adjust quantity, persistent via localStorage
- **Wishlist** â€” toggle heart on any product, persistent via localStorage
- **Product detail page** â€” image gallery, related products, add to cart
- **About & Contact pages** â€” with working contact form validation
- **SSR** â€” initial data fetched server-side for fast load and SEO
- **Responsive** â€” mobile, tablet, and desktop layouts
- **SEO** â€” meta tags, Open Graph, JSON-LD structured data per page
- **Accessibility** â€” semantic HTML, ARIA labels, skip link, keyboard navigation

---

## Project Structure

```
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ Header.js          # Sticky nav with search, cart, wishlist icons
â”‚   â”œâ”€â”€ Footer.js
â”‚   â”œâ”€â”€ Sidebar.js         # Category + price filters
â”‚   â”œâ”€â”€ ProductCard.js     # Memoised card with wishlist + add to cart
â”‚   â”œâ”€â”€ ProductGrid.js
â”‚   â”œâ”€â”€ SkeletonGrid.js    # Loading skeleton
â”‚   â”œâ”€â”€ SortDropdown.js    # Custom sort menu
â”‚   â”œâ”€â”€ CartDrawer.js      # Slide-in cart panel
â”‚   â””â”€â”€ WishlistDrawer.js  # Slide-in wishlist panel
â”œâ”€â”€ context/
â”‚   â””â”€â”€ ShopContext.js     # Global cart + wishlist state
â”œâ”€â”€ pages/
â”‚   â”œâ”€â”€ index.js           # PLP â€” SSR via getServerSideProps
â”‚   â”œâ”€â”€ about.js
â”‚   â”œâ”€â”€ contact.js
â”‚   â”œâ”€â”€ product/[id].js    # Product detail â€” SSR
â”‚   â”œâ”€â”€ 404.js
â”‚   â”œâ”€â”€ _app.js
â”‚   â””â”€â”€ _document.js
â”œâ”€â”€ services/
â”‚   â””â”€â”€ api.js             # API calls (DummyJSON + FakeStore fallback)
â”œâ”€â”€ styles/                # CSS Modules per component
â””â”€â”€ next.config.mjs
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
3. Netlify auto-detects the config â€” click **Deploy**

For Vercel:
1. Import at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. Click **Deploy**

---

## API

Products are fetched from [DummyJSON](https://dummyjson.com/docs/products) (194 products across 24 categories). If unavailable, the app falls back to [FakeStore API](https://fakestoreapi.com).

All prices are displayed in **INR** (1 USD = â‚¹83).
