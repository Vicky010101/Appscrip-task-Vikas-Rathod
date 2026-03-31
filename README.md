# Appscrip Task – Vikas Rathod

This project is a fully functional and responsive Product Listing Page (PLP) built using Next.js. It focuses on clean UI, smooth user experience, and real-world e-commerce features like filtering, cart, and wishlist.

---

## Live Demo

https://appscrip-task-vikasrathod.netlify.app

---

## Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Framework  | Next.js (Pages Router)                       |
| Language   | JavaScript                                   |
| Styling    | CSS Modules                                  |
| Rendering  | Server-Side Rendering (`getServerSideProps`) |
| Images     | next/image (optimized, lazy loaded)          |
| State      | React Context + useReducer                   |
| Data       | DummyJSON API                                |
| Deployment | Netlify                                      |

---

## Features

* Product listing with 190+ products, images, prices (in INR), ratings, and discount badges
* Navbar category filtering (New In, Clothing, Shoes, Accessories, Sale)
* Sidebar filters for category and price range
* Sorting options (price low to high, high to low, newest, etc.)
* Search functionality across product title and description
* Cart with add, remove, and quantity update (stored in localStorage)
* Wishlist with like/unlike feature (persistent using localStorage)
* Product detail page with images and related products
* About and Contact pages with working form validation
* Server-side rendering for better performance and SEO
* Fully responsive design (mobile, tablet, desktop)
* SEO setup with meta tags and structured data
* Accessibility basics (semantic HTML, keyboard navigation)

---

## Project Structure

```
components/
  Header.js
  Footer.js
  Sidebar.js
  ProductCard.js
  ProductGrid.js
  SkeletonGrid.js
  SortDropdown.js
  CartDrawer.js
  WishlistDrawer.js

context/
  ShopContext.js

pages/
  index.js
  about.js
  contact.js
  product/[id].js
  _app.js
  _document.js
  404.js

services/
  api.js

styles/
  (CSS Modules)

next.config.mjs
```

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Vicky010101/Appscrip-task-Vikas-Rathod.git
cd Appscrip-task-Vikas-Rathod
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open in browser:
http://localhost:3000

Build for production:

```bash
npm run build
npm start
```

---

## Deployment

This project is deployed on Netlify.

Steps to deploy:

1. Push your code to GitHub
2. Connect the repository in Netlify
3. Click Deploy (build settings are auto-configured)

You can also deploy using Vercel by importing the repository.

---

## API

Product data is fetched from:
https://dummyjson.com/products

If the API is unavailable, it falls back to:
https://fakestoreapi.com

All prices are displayed in Indian Rupees (₹) using a fixed conversion rate (1 USD = ₹83).

---

## Note

This project was built as part of the Appscrip frontend assessment, focusing on performance, responsiveness, and clean code structure.
