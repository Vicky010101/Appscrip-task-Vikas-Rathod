import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/About.module.css";

const FEATURES = [
    { icon: "⚡", title: "Dynamic Filtering & Sorting", desc: "Real-time product filtering and sorting so users find exactly what they need without a page reload." },
    { icon: "📱", title: "Fully Responsive", desc: "Optimized layout for mobile, tablet, and desktop — clean and consistent across every screen size." },
    { icon: "🚀", title: "SSR Performance", desc: "Server-side rendering for fast initial loads and improved SEO out of the box." },
    { icon: "🛒", title: "Cart & Wishlist", desc: "Interactive cart and wishlist with localStorage persistence — state survives page refreshes." },
    { icon: "✦", title: "Clean UI", desc: "Minimal, modern design inspired by leading e-commerce platforms with smooth transitions." },
    { icon: "♿", title: "Accessible", desc: "Semantic HTML, ARIA labels, keyboard navigation, and focus management throughout." },
];

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Us | Mango Store</title>
                <meta name="description" content="Learn about this project — a modern, responsive product listing page built with Next.js, SSR, and clean UI design." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="About Us | Mango Store" />
                <meta property="og:description" content="A seamless shopping experience built with Next.js." />
                <meta property="og:type" content="website" />
            </Head>

            <Header />

            <main id="main-content">
                {/* Hero */}
                <section className={styles.hero}>
                    <h1>About Us</h1>
                    <p>
                        We believe great design should be simple, accessible, and enjoyable. This platform is
                        built to deliver a seamless shopping experience where users can explore products with
                        ease and clarity.
                    </p>
                </section>

                {/* Mission */}
                <section className={styles.missionSection}>
                    <div className={styles.missionInner}>
                        <h2>Our Mission</h2>
                        <p>
                            Our goal is to create a modern and responsive product browsing experience that feels
                            fast, intuitive, and user-friendly across all devices. We focus on clean design,
                            smooth interactions, and meaningful functionality.
                        </p>
                    </div>
                </section>

                {/* What this project offers */}
                <section className={styles.features} aria-label="What this project offers">
                    <h2>What This Project Offers</h2>
                    <div className={styles.featuresGrid}>
                        {FEATURES.map((f) => (
                            <div key={f.title} className={styles.featureCard}>
                                <div className={styles.featureIcon} aria-hidden="true">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
