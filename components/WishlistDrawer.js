import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop, toINR } from "../context/ShopContext";
import styles from "../styles/Drawer.module.css";

export default function WishlistDrawer({ open, onClose }) {
    const { wishlist, toggleWishlist, addToCart } = useShop();

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        if (open) document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            <div
                className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
                aria-label="Wishlist"
                role="dialog"
                aria-modal="true"
            >
                <div className={styles.drawerHead}>
                    <h2 className={styles.drawerTitle}>
                        Wishlist
                        {wishlist.length > 0 && (
                            <span className={styles.drawerCount}>{wishlist.length}</span>
                        )}
                    </h2>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close wishlist">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {wishlist.length === 0 ? (
                    <div className={styles.empty}>
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <p>Your wishlist is empty</p>
                        <button className={styles.shopBtn} onClick={onClose}>Browse Products</button>
                    </div>
                ) : (
                    <ul className={styles.itemList}>
                        {wishlist.map((item) => (
                            <li key={item.id} className={styles.item}>
                                <div className={styles.itemImg}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="72px"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div className={styles.itemInfo}>
                                    <Link href={`/product/${item.id}`} className={styles.itemTitle} onClick={onClose}>
                                        {item.title.slice(0, 45)}{item.title.length > 45 ? "…" : ""}
                                    </Link>
                                    <span className={styles.itemCat}>
                                        {(item.categoryName || item.category).replace(/-/g, " ")}
                                    </span>
                                    <div className={styles.itemBottom}>
                                        <span className={styles.itemPrice}>{toINR(item.price)}</span>
                                        <button
                                            className={styles.moveToCart}
                                            onClick={() => { addToCart(item); onClose(); }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className={styles.heartBtn}
                                    onClick={() => toggleWishlist(item)}
                                    aria-label={`Remove ${item.title} from wishlist`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#e53935" stroke="#e53935" strokeWidth="2" aria-hidden="true">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </aside>
        </>
    );
}
