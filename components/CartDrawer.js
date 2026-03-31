import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop, toINR } from "../context/ShopContext";
import styles from "../styles/Drawer.module.css";

export default function CartDrawer({ open, onClose }) {
    const { cart, cartTotal, removeFromCart, incQty, decQty, clearCart } = useShop();

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        if (open) document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
                aria-label="Shopping cart"
                role="dialog"
                aria-modal="true"
            >
                <div className={styles.drawerHead}>
                    <h2 className={styles.drawerTitle}>
                        Shopping Cart
                        {cart.length > 0 && <span className={styles.drawerCount}>{cart.reduce((s, i) => s + i.qty, 0)}</span>}
                    </h2>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className={styles.empty}>
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" aria-hidden="true">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <p>Your cart is empty</p>
                        <button className={styles.shopBtn} onClick={onClose}>Continue Shopping</button>
                    </div>
                ) : (
                    <>
                        <ul className={styles.itemList}>
                            {cart.map((item) => (
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
                                        <span className={styles.itemCat}>{(item.categoryName || item.category).replace(/-/g, " ")}</span>
                                        <div className={styles.itemBottom}>
                                            <div className={styles.qtyCtrl}>
                                                <button onClick={() => decQty(item.id)} aria-label="Decrease">−</button>
                                                <span>{item.qty}</span>
                                                <button onClick={() => incQty(item.id)} aria-label="Increase">+</button>
                                            </div>
                                            <span className={styles.itemPrice}>{toINR(item.price * item.qty)}</span>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Remove ${item.title}`}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.drawerFoot}>
                            <div className={styles.total}>
                                <span>Total</span>
                                <span className={styles.totalAmt}>{toINR(cartTotal)}</span>
                            </div>
                            <button className={styles.checkoutBtn}>Proceed to Checkout</button>
                            <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}
