import { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });
const SortDropdown = dynamic(() => import("../components/SortDropdown"), { ssr: false });
import ProductGrid from "../components/ProductGrid";
import { fetchProducts, fetchCategories } from "../services/api";
import { NAV_CATEGORIES } from "../context/ShopContext";
import styles from "../styles/Plp.module.css";


const PAGE_SIZE = 12;



// Nav label map for hero heading
const NAV_LABELS = {
  "new-in":      "New In",
  clothing:      "Clothing",
  shoes:         "Shoes",
  accessories:   "Accessories",
  sale:          "Sale",
};

function ProductListSchema({ products }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Product Listing",
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.title,
        image: p.image,
        description: p.description,
        offers: { "@type": "Offer", price: p.price, priceCurrency: "INR", availability: "https://schema.org/InStock" },
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function ProductListingPage({ products, categories, error }) {
  const [activeNav, setActiveNav]         = useState("new-in");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange]       = useState(null);
  const [sort, setSort]                   = useState("default");
  const [page, setPage]                   = useState(1);
  const [search, setSearch]               = useState("");

  // Apply navbar filter first
  const navFiltered = useMemo(() => {
    let list = [...products];

    if (activeNav === "new-in") {
      // Sort by id descending (newest first)
      list.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (activeNav === "sale") {
      list = list.filter((p) => p.discountPercentage > 0);
      list.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else {
      const slugs = NAV_CATEGORIES[activeNav];
      if (slugs) list = list.filter((p) => slugs.includes(p.category));
    }

    return list;
  }, [products, activeNav]);

  // Then apply sidebar + search filters
  const filtered = useMemo(() => {
    let list = [...navFiltered];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (priceRange) {
      list = list.filter((p) => p.price >= priceRange.min && p.price < priceRange.max);
    }

    // Only apply sort if not already sorted by nav
    if (activeNav !== "new-in" && activeNav !== "sale") {
      switch (sort) {
        case "newest":     list.sort((a, b) => Number(b.id) - Number(a.id)); break;
        case "popular":    list.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0)); break;
        case "price-asc":  list.sort((a, b) => a.price - b.price); break;
        case "price-desc": list.sort((a, b) => b.price - a.price); break;
        case "rating":     list.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)); break;
        case "name-asc":   list.sort((a, b) => a.title.localeCompare(b.title)); break;
        default: break;
      }
    } else if (sort !== "default") {
      switch (sort) {
        case "newest":     list.sort((a, b) => Number(b.id) - Number(a.id)); break;
        case "popular":    list.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0)); break;
        case "price-asc":  list.sort((a, b) => a.price - b.price); break;
        case "price-desc": list.sort((a, b) => b.price - a.price); break;
        case "rating":     list.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)); break;
        case "name-asc":   list.sort((a, b) => a.title.localeCompare(b.title)); break;
        default: break;
      }
    }

    return list;
  }, [navFiltered, selectedCategory, priceRange, sort, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleNavChange = useCallback((key) => {
    setActiveNav(key);
    setSelectedCategory("all");
    setPriceRange(null);
    setSearch("");
    setSort("default");
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((cat) => { setSelectedCategory(cat); setPage(1); }, []);
  const handlePriceChange = useCallback((range) => { setPriceRange(range); setPage(1); }, []);
  const handleSort = useCallback((e) => { setSort(e.target.value); setPage(1); }, []);
  const handleSearch = useCallback((val) => { setSearch(val); setPage(1); }, []);

  const activeFilters = [
    search && ('"' + search + '"'),
    selectedCategory !== "all" && selectedCategory,
    priceRange && priceRange.label,
  ].filter(Boolean);

  const resetAll = useCallback(() => {
    setSearch(""); setSelectedCategory("all"); setPriceRange(null); setPage(1);
  }, []);

  // Sidebar categories — only show categories relevant to current nav
  const sidebarCategories = useMemo(() => {
    const slugs = NAV_CATEGORIES[activeNav];
    if (!slugs) return categories;
    return categories.filter((c) => {
      const slug = typeof c === "string" ? c : c.slug;
      return slugs.includes(slug);
    });
  }, [categories, activeNav]);

  const heroTitle = NAV_LABELS[activeNav] || "Discover Our Products";

  return (
    <>
      <Head>
        <title>{heroTitle} | Appscrip Task</title>
        <meta name="description" content="Browse products with filtering and responsive UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={heroTitle + " | Appscrip Task"} />
        <meta property="og:description" content="Browse products with filtering and responsive UI" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://appscrip-task-vikas-rathod.vercel.app/" />
        <ProductListSchema products={products} />
      </Head>

      <Header
        onSearch={handleSearch}
        searchValue={search}
        activeNav={activeNav}
        onNavChange={handleNavChange}
      />

      <main id="main-content">
        <div className={styles.hero}>
          <h1>{heroTitle}</h1>
          <p>
            {activeNav === "sale"
              ? "Exclusive deals — save big on selected items"
              : activeNav === "new-in"
              ? "The latest arrivals, just in"
              : "Browse our curated collection"}
            {" "}&mdash; {navFiltered.length} items
          </p>
        </div>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">&rsaquo;</span>
          <span aria-current="page">{heroTitle}</span>
          {selectedCategory !== "all" && (
            <><span aria-hidden="true">&rsaquo;</span><span>{selectedCategory.replace(/-/g, " ")}</span></>
          )}
        </nav>

        {error && (
          <div className={styles.errorBanner} role="alert">
            Could not load products. Please refresh the page.
          </div>
        )}

        {activeFilters.length > 0 && (
          <div className={styles.chips} aria-label="Active filters">
            {activeFilters.map((f) => <span key={f} className={styles.chip}>{f}</span>)}
            <button className={styles.chipClear} onClick={resetAll}>Clear all</button>
          </div>
        )}

        <div className={styles.toolbar}>
          <p className={styles.count}>
            <strong>{filtered.length}</strong> {filtered.length === 1 ? "item" : "items"}
            {search && <span className={styles.searchHint}> for &ldquo;{search}&rdquo;</span>}
          </p>
          <div className={styles.toolbarRight}>
            <SortDropdown value={sort} onChange={(val) => { setSort(val); setPage(1); }} />
          </div>
        </div>

        <div className={styles.layout}>
          <Sidebar
            categories={sidebarCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
          />
          <div className={styles.main}>
            {paginated.length > 0 ? (
              <>
                <ProductGrid products={paginated} />
                {totalPages > 1 && (
                  <nav className={styles.pagination} aria-label="Pagination">
                    <button className={styles.pageBtn} onClick={() => setPage((p) => p - 1)} disabled={page === 1} aria-label="Previous page">&lsaquo;</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        className={styles.pageBtn + (p === page ? " " + styles.activePage : "")}
                        onClick={() => setPage(p)}
                        aria-label={"Page " + p}
                        aria-current={p === page ? "page" : undefined}
                      >{p}</button>
                    ))}
                    <button className={styles.pageBtn} onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} aria-label="Next page">&rsaquo;</button>
                  </nav>
                )}
              </>
            ) : (
              <div className={styles.noResults}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p>No products match your filters.</p>
                <button className={styles.resetBtn} onClick={resetAll}>Reset filters</button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
    return { props: { products, categories, error: null } };
  } catch (err) {
        return { props: { products: [], categories: [], error: "Failed to load" } };
  }
}