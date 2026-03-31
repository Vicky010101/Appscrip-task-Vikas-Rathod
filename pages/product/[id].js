import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchProductById, fetchProducts } from "../../services/api";
import { useShop, toINR } from "../../context/ShopContext";
import styles from "../../styles/ProductDetail.module.css";

function StarRating({ rating, count }) {
  const full = Math.round(rating);
  return (
    <div className={styles.ratingRow}>
      <span className={styles.stars} aria-label={rating + " out of 5 stars"}>
        {Array.from({ length: 5 }, (_, i) => <span key={i}>{i < full ? "\u2605" : "\u2606"}</span>)}
      </span>
      <span className={styles.ratingCount}>{rating} ({count} reviews)</span>
    </div>
  );
}

export default function ProductDetail({ product, relatedProducts, error }) {
  const { addToCart, toggleWishlist, isWished, isInCart } = useShop();
  const [qty, setQty]           = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (error || !product) {
    return (
      <>
        <Header />
        <main className={styles.errorPage}>
          <h1>Product not found</h1>
          <p>This product does not exist or could not be loaded.</p>
          <Link href="/" className={styles.backLink}>Back to Products</Link>
        </main>
        <Footer />
      </>
    );
  }

  const { id, title, price, category, categoryName, image, images, description, rating, brand, discountPercentage, stock } = product;
  const displayCategory = (categoryName || category).replace(/-/g, " ");
  const allImages = (images && images.length > 0) ? images : [image];
  const originalPrice = discountPercentage > 0 ? (price / (1 - discountPercentage / 100)) : null;
  const savings = originalPrice ? (originalPrice - price) : null;

  const wished = isWished(id);
  const inCart = isInCart(id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    image: allImages[0],
    description: description,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    offers: { "@type": "Offer", price: price, priceCurrency: "INR", availability: "https://schema.org/InStock" },
    aggregateRating: rating ? { "@type": "AggregateRating", ratingValue: rating.rate, reviewCount: rating.count } : undefined,
  };

  return (
    <>
      <Head>
        <title>{title} | Appscrip Task</title>
        <meta name="description" content={description ? description.slice(0, 155) : title} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={allImages[0]} />
        <meta property="og:type" content="product" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      </Head>

      <Header />

      <main id="main-content">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{displayCategory}</span>
          <span aria-hidden="true">&rsaquo;</span>
          <span aria-current="page">{title.slice(0, 50)}{title.length > 50 ? "..." : ""}</span>
        </nav>

        <div className={styles.container} itemScope itemType="https://schema.org/Product">
          <div className={styles.imageSection}>
            <div className={styles.imageWrap}>
              <Image
                src={allImages[activeImg] || image}
                alt={title + " product image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
                itemProp="image"
              />
              {discountPercentage > 0 && (
                <span className={styles.discountBadge}>-{Math.round(discountPercentage)}% OFF</span>
              )}
            </div>
            {allImages.length > 1 && (
              <div className={styles.thumbs} role="list" aria-label="Product images">
                {allImages.slice(0, 6).map((img, i) => (
                  <button
                    key={i}
                    className={styles.thumb + (i === activeImg ? " " + styles.thumbActive : "")}
                    onClick={() => setActiveImg(i)}
                    aria-label={"View image " + (i + 1)}
                    role="listitem"
                  >
                    <Image src={img} alt={"Product view " + (i + 1)} fill style={{ objectFit: "cover" }} sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            <span className={styles.category} itemProp="category">{displayCategory}</span>
            {brand && <span className={styles.brandTag}>{brand}</span>}
            <h1 className={styles.title} itemProp="name">{title}</h1>
            {rating && <StarRating rating={rating.rate} count={rating.count} />}

            <div className={styles.priceRow} itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="priceCurrency" content="INR" />
              <span className={styles.price} itemProp="price">{toINR(price)}</span>
              {originalPrice && <span className={styles.originalPrice}>{toINR(originalPrice)}</span>}
              {savings && <span className={styles.savings}>Save {toINR(savings)}</span>}
              <span className={styles.inStock}>{stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </div>

            <p className={styles.description} itemProp="description">{description}</p>

            <div className={styles.qtyRow}>
              <label htmlFor="qty" className={styles.qtyLabel}>Quantity</label>
              <div className={styles.qtyControl}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">-</button>
                <input id="qty" type="number" min="1" max="99" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} aria-label="Quantity" />
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.addToCart + (inCart ? " " + styles.addedToCart : "")}
                onClick={handleAddToCart}
              >
                {inCart ? "\u2713 In Cart" : "Add to Cart"}
              </button>
              <button
                className={styles.wishlistBtn + (wished ? " " + styles.wished : "")}
                onClick={() => toggleWishlist(product)}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wished}
              >
                <svg viewBox="0 0 24 24" fill={wished ? "#e53935" : "none"} stroke={wished ? "#e53935" : "currentColor"} strokeWidth="2" width="20" height="20" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <Link href="/" className={styles.backLink}>&larr; Back to Products</Link>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className={styles.related} aria-label="Related products">
            <h2 className={styles.relatedTitle}>More in {displayCategory}</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <Link key={p.id} href={"/product/" + p.id} className={styles.relatedCard}>
                  <div className={styles.relatedImg}>
                    <Image src={p.image} alt={p.title} fill sizes="200px" style={{ objectFit: "cover" }} loading="lazy" />
                  </div>
                  <p className={styles.relatedName}>{p.title.slice(0, 40)}{p.title.length > 40 ? "..." : ""}</p>
                  <p className={styles.relatedPrice}>{toINR(p.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const [product, allProducts] = await Promise.all([fetchProductById(params.id), fetchProducts()]);
    const relatedProducts = allProducts
      .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
      .slice(0, 4);
    return { props: { product, relatedProducts, error: null } };
  } catch (err) {
    console.error("Product SSR error:", err.message);
    return { props: { product: null, relatedProducts: [], error: "Not found" } };
  }
}