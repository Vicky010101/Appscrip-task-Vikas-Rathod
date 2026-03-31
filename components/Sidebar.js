import { memo, useState, useCallback, useMemo } from "react";
import styles from "../styles/Sidebar.module.css";
import { USD_TO_INR } from "../context/ShopContext";

const r = USD_TO_INR;
const PRICE_RANGES = [
    { label: `Under ₹${(25 * r).toLocaleString("en-IN")}`, min: 0, max: 25 },
    { label: `₹${(25 * r).toLocaleString("en-IN")} – ₹${(50 * r).toLocaleString("en-IN")}`, min: 25, max: 50 },
    { label: `₹${(50 * r).toLocaleString("en-IN")} – ₹${(100 * r).toLocaleString("en-IN")}`, min: 50, max: 100 },
    { label: `₹${(100 * r).toLocaleString("en-IN")} – ₹${(500 * r).toLocaleString("en-IN")}`, min: 100, max: 500 },
    { label: `Over ₹${(500 * r).toLocaleString("en-IN")}`, min: 500, max: Infinity },
];

const Sidebar = memo(function Sidebar({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange }) {
    const [catOpen, setCatOpen] = useState(true);
    const [priceOpen, setPriceOpen] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClear = useCallback(() => {
        onCategoryChange("all");
        onPriceChange(null);
    }, [onCategoryChange, onPriceChange]);

    const hasFilters = selectedCategory !== "all" || priceRange !== null;

    const normCats = useMemo(() =>
        categories.map((c) => typeof c === "string" ? { slug: c, name: c } : c),
        [categories]
    );

    return (
        <aside className={styles.sidebar} aria-label="Product filters">
            {/* Mobile toggle */}
            <button
                className={styles.mobileToggle}
                onClick={() => setDrawerOpen((v) => !v)}
                aria-expanded={drawerOpen}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="14" y2="12" />
                    <line x1="4" y1="18" x2="18" y2="18" />
                </svg>
                {drawerOpen ? "Hide Filters" : "Show Filters"}
                {hasFilters && <span className={styles.filterBadge} aria-label="Filters active">!</span>}
            </button>

            <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
                {/* Category */}
                <div className={styles.section}>
                    <button
                        className={`${styles.sectionTitle} ${!catOpen ? styles.collapsed : ""}`}
                        onClick={() => setCatOpen((v) => !v)}
                        aria-expanded={catOpen}
                    >
                        Category
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    {catOpen && (
                        <ul className={styles.options} role="list">
                            <li>
                                <label className={`${styles.option} ${selectedCategory === "all" ? styles.active : ""}`}>
                                    <input type="checkbox" checked={selectedCategory === "all"} onChange={() => onCategoryChange("all")} aria-label="All categories" />
                                    All
                                </label>
                            </li>
                            {normCats.map((cat) => (
                                <li key={cat.slug}>
                                    <label className={`${styles.option} ${selectedCategory === cat.slug ? styles.active : ""}`}>
                                        <input type="checkbox" checked={selectedCategory === cat.slug} onChange={() => onCategoryChange(cat.slug)} aria-label={cat.name} />
                                        {cat.name.charAt(0).toUpperCase() + cat.name.slice(1).replace(/-/g, " ")}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Price */}
                <div className={styles.section}>
                    <button
                        className={`${styles.sectionTitle} ${!priceOpen ? styles.collapsed : ""}`}
                        onClick={() => setPriceOpen((v) => !v)}
                        aria-expanded={priceOpen}
                    >
                        Price
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    {priceOpen && (
                        <ul className={styles.options} role="list">
                            {PRICE_RANGES.map((range) => {
                                const isActive = priceRange && priceRange.min === range.min && priceRange.max === range.max;
                                return (
                                    <li key={range.label}>
                                        <label className={`${styles.option} ${isActive ? styles.active : ""}`}>
                                            <input type="checkbox" checked={!!isActive} onChange={() => onPriceChange(isActive ? null : range)} aria-label={range.label} />
                                            {range.label}
                                        </label>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {hasFilters && (
                    <button className={styles.clearBtn} onClick={handleClear}>Clear All Filters</button>
                )}
            </div>
        </aside>
    );
});

export default Sidebar;
