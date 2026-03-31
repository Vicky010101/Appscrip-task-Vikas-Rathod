import { memo } from "react";
import styles from "../styles/Skeleton.module.css";
import gridStyles from "../styles/ProductGrid.module.css";

const SkeletonCard = memo(function SkeletonCard() {
    return (
        <div className={styles.card} aria-hidden="true">
            <div className={`${styles.shimmer} ${styles.image}`} />
            <div className={styles.body}>
                <div className={`${styles.shimmer} ${styles.lineShort}`} />
                <div className={`${styles.shimmer} ${styles.lineFull}`} />
                <div className={`${styles.shimmer} ${styles.lineMid}`} />
                <div className={`${styles.shimmer} ${styles.linePrice}`} />
            </div>
        </div>
    );
});

const SkeletonGrid = memo(function SkeletonGrid({ count = 12 }) {
    return (
        <div className={gridStyles.grid} aria-busy="true" aria-label="Loading products">
            {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
        </div>
    );
});

export default SkeletonGrid;
