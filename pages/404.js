import Head from "next/head";
import Link from "next/link";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Page Not Found | Mango Store</title>
                <meta name="description" content="The page you are looking for does not exist." />
                <meta name="robots" content="noindex" />
            </Head>
            <main className={styles.page} id="main-content">
                <h1 className={styles.code}>404</h1>
                <p className={styles.message}>The page you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/" className={styles.link}>Back to Products</Link>
            </main>
        </>
    );
}
