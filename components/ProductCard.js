import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop, toINR } from "../context/ShopContext";
import styles from "../styles/ProductCard.module.css";

const StarRating = memo(function StarRating({ rating }) {
    const full = Math.round(rating);
    return (
        <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < full ? "\u2605" : "\u2606"}</span>
            ))}
        </span>
    );
});

const ProductCard = memo(function ProductCard({ product }) {
    const { addToCart, toggleWishlist, isWished, isInCart } = useShop();

    const { id, title, price, category, categoryName, image, rating, brand, discountPercentage } = product;
    const displayCategory = (categoryName || category).replace(/-/g, " ");
    const originalPrice = discountPercentage > 0 ? price / (1 - discountPercentage / 100) : null;

    const wished = isWished(id);
    const inCart = isInCart(id);

    const handleAddToCart = useCallback((e) => {
        e.preventDefault();
        addToCart(product);
    }, [addToCart, product]);

    const handleWishlist = useCallback((e) => {
        e.preventDefault();
        toggleWishlist(product);
    }, [toggleWishlist, product]);

    return (
        <article className={styles.card} itemScope itemType="https://schema.org/Product">
            <Link href={`/product/${id}`} className={styles.cardLink} aria-label={`View ${title}`}>
                <div className={styles.imageWrap}>
                    <Image
                        src={image}
                        alt={`${title} — ${displayCategory}`}
                        fill
                        sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        style={{ objectFit: "cover" }}
                        loading="lazy"
                        itemProp="image"
                    />

                    {discountPercentage > 0 && (
                        <span className={styles.badge} aria-label={`${Math.round(discountPercentage)}% off`}>
                            -{Math.round(discountPercentage)}%
                        </span>
                    )}

                    <button
                        className={`${styles.wishlist} ${wished ? styles.wished : ""}`}
                        onClick={handleWishlist}
                        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                        aria-pressed={wished}
                    >
                        <svg viewBox="0 0 24 24" fill={wished ? "#e53935" : "none"} stroke={wished ? "#e53935" : "#666"} strokeWidth="2" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>

                    <div className={styles.overlay}>
                        <button
                            className={`${styles.addBtn} ${inCart ? styles.addedBtn : ""}`}
                            onClick={handleAddToCart}
                        >
                            {inCart ? "\u2713 In Cart" : "Add to Cart"}
                        </button>
                    </div>
                </div>

                <div className={styles.info}>
                    <span className={styles.category} itemProp="category">{displayCategory}</span>
                    {brand && <span className={styles.brand}>{brand}</span>}
                    <h2 className={styles.title} itemProp="name">{title}</h2>

                    <div className={styles.priceRow} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="INR" />
                        <span className={styles.price} itemProp="price">{toINR(price)}</span>
                        {originalPrice && <span className={styles.originalPrice}>{toINR(originalPrice)}</span>}
                        {rating && <div className={styles.rating}><StarRating rating={rating.rate} /></div>}
                    </div>
                </div>
            </Link>
        </article>
    );
});

export default ProductCard;
