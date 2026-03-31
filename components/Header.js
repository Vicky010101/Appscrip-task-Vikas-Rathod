import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useShop } from "../context/ShopContext";
import dynamic from "next/dynamic";
import styles from "../styles/Header.module.css";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });
const WishlistDrawer = dynamic(() => import("./WishlistDrawer"), { ssr: false });

const NAV_ITEMS = [
    { key: "new-in", label: "New In" },
    { key: "clothing", label: "Clothing" },
    { key: "shoes", label: "Shoes" },
    { key: "accessories", label: "Accessories" },
    { key: "sale", label: "Sale" },
];

const ROUTE_ITEMS = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Header({ onSearch, searchValue = "", activeNav, onNavChange }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [wishOpen, setWishOpen] = useState(false);
    const [query, setQuery] = useState(searchValue);
    const searchRef = useRef(null);
    const router = useRouter();
    const { cartCount, wishlist } = useShop();

    useEffect(() => { setQuery(searchValue); }, [searchValue]);

    useEffect(() => {
        if (searchOpen && searchRef.current) searchRef.current.focus();
    }, [searchOpen]);

    const handleSearch = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (onSearch) onSearch(val);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    const clearSearch = () => {
        setQuery("");
        if (onSearch) onSearch("");
        setSearchOpen(false);
    };

    const handleNav = (key) => {
        if (onNavChange) onNavChange(key);
        setMenuOpen(false);
    };

    const isOnHomepage = router.pathname === "/";

    return (
        <>
            <header className={styles.header} role="banner">
                <div className={styles.topBar}>
                    <Link href="/" className={styles.logo} aria-label="MANGO Home" onClick={() => handleNav("new-in")}>
                        MANGO
                    </Link>

                    <nav className={styles.nav} aria-label="Main navigation">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.key}
                                className={`${styles.navLink} ${isOnHomepage && activeNav === item.key ? styles.navActive : ""}`}
                                onClick={() => { if (!isOnHomepage) router.push("/"); handleNav(item.key); }}
                                aria-current={isOnHomepage && activeNav === item.key ? "page" : undefined}
                            >
                                {item.label}
                                {item.key === "sale" && <span className={styles.saleTag}>%</span>}
                            </button>
                        ))}

                        <span className={styles.navDivider} aria-hidden="true" />

                        {ROUTE_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navLink} ${router.pathname === item.href ? styles.navActive : ""}`}
                                aria-current={router.pathname === item.href ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className={styles.actions}>
                        <form
                            className={`${styles.searchForm} ${searchOpen ? styles.searchOpen : ""}`}
                            onSubmit={handleSearchSubmit}
                            role="search"
                        >
                            <input
                                ref={searchRef}
                                type="search"
                                className={styles.searchInput}
                                placeholder="Search products…"
                                value={query}
                                onChange={handleSearch}
                                aria-label="Search products"
                            />
                            {query && (
                                <button type="button" className={styles.searchClear} onClick={clearSearch} aria-label="Clear search">✕</button>
                            )}
                        </form>

                        <button
                            className={styles.iconBtn}
                            aria-label={searchOpen ? "Close search" : "Open search"}
                            onClick={() => { setSearchOpen((v) => !v); if (searchOpen) clearSearch(); }}
                        >
                            {searchOpen ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            )}
                        </button>

                        <button className={styles.iconBtn} aria-label={`Wishlist (${wishlist.length} items)`} onClick={() => setWishOpen(true)}>
                            <span className={styles.iconWrap}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                {wishlist.length > 0 && <span className={styles.badge} aria-hidden="true">{wishlist.length}</span>}
                            </span>
                        </button>

                        <button className={styles.iconBtn} aria-label={`Shopping cart (${cartCount} items)`} onClick={() => setCartOpen(true)}>
                            <span className={styles.iconWrap}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                {cartCount > 0 && <span className={styles.badge} aria-hidden="true">{cartCount}</span>}
                            </span>
                        </button>

                        <button
                            className={styles.menuBtn}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>

                <form className={styles.mobileSearch} onSubmit={handleSearchSubmit} role="search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="search"
                        className={styles.mobileSearchInput}
                        placeholder="Search products…"
                        value={query}
                        onChange={handleSearch}
                        aria-label="Search products"
                    />
                    {query && <button type="button" onClick={clearSearch} className={styles.mobileClear} aria-label="Clear">✕</button>}
                </form>

                <nav className={`${styles.mobileNav} ${menuOpen ? styles.open : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.key}
                            className={`${styles.mobileNavLink} ${isOnHomepage && activeNav === item.key ? styles.mobileNavActive : ""}`}
                            onClick={() => { if (!isOnHomepage) router.push("/"); handleNav(item.key); }}
                        >
                            {item.label}
                            {item.key === "sale" && <span className={styles.saleTag}>%</span>}
                        </button>
                    ))}
                    {ROUTE_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.mobileNavLink} ${router.pathname === item.href ? styles.mobileNavActive : ""}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} />
        </>
    );
}
