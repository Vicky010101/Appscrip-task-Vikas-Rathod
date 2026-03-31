import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer} role="contentinfo">
            <div className={styles.grid}>
                <div className={styles.brand}>
                    <h2>MANGO</h2>
                    <p>
                        Discover the latest trends in fashion. Quality clothing, shoes and
                        accessories for every occasion.
                    </p>
                </div>

                <div className={styles.col}>
                    <h3>Shop</h3>
                    <ul>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Women</a></li>
                        <li><a href="#">Men</a></li>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Sale</a></li>
                    </ul>
                </div>

                <div className={styles.col}>
                    <h3>Help</h3>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Shipping &amp; Returns</a></li>
                        <li><a href="#">Size Guide</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Track Order</a></li>
                    </ul>
                </div>

                <div className={styles.col}>
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Sustainability</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>© {new Date().getFullYear()} MANGO. All rights reserved. | Appscrip Task — Vikas Rathod</p>
            </div>
        </footer>
    );
}
