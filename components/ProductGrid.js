import { memo } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductGrid.module.css";

const ProductGrid = memo(function ProductGrid({ products }) {
    return (
        <section className={styles.grid} aria-label="Product listing">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
});

export default ProductGrid;
