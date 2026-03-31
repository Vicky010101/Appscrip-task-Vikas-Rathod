import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/About.module.css";

const FEATURES = [
    { icon: "✦", title: "Premium Quality", desc: "Every product is carefully curated to meet the highest standards of quality and craftsmanship." },
    { icon: "⚡", title: "Fast Delivery", desc: "We deliver across India within 3–5 business days with real-time order tracking." },
    { icon: "♻", title: "Sustainable Fashion", desc: "We are committed to eco-friendly practices and responsible sourcing across our supply chain." },
    { icon: "↩", title: "Easy Returns", desc: "Not satisfied? Return any item within 30 days — no questions asked, full refund guaranteed." },
    { icon: "◎", title: "Customer First", desc: "Our support team is available 7 days a week to help you with any queries or concerns." },
    { icon: "❋", title: "Exclusive Styles", desc: "Discover limited-edition collections and exclusive collaborations you won't find anywhere else." },
];

const STATS = [
    { value: "10M+", label: "Happy Customers" },
    { value: "500+", label: "Brand Partners" },
    { value: "50+", label: "Countries Served" },
    { value: "99%", label: "Satisfaction Rate" },
];

const TEAM = [
    { name: "Vikas Rathod", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Priya Sharma", role: "Head of Design", emoji: "👩‍🎨" },
    { name: "Arjun Mehta", role: "Tech Lead", emoji: "👨‍💻" },
];

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Us | Mango Store</title>
                <meta name="description" content="Learn about Mango Store — our story, mission, values, and the team behind India's favourite fashion destination." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="About Us | Mango Store" />
                <meta property="og:description" content="Our story, mission and values." />
                <meta property="og:type" content="website" />
            </Head>

            <Header />

            <main id="main-content">
                {/* Hero */}
                <section className={styles.hero}>
                    <h1>About Us</h1>
                    <p>We believe fashion is more than clothing — it&apos;s a form of self-expression. Discover who we are and what drives us.</p>
                </section>

                {/* Story */}
                <section className={styles.story} aria-label="Our story">
                    <div className={styles.storyText}>
                        <h2>Our Story</h2>
                        <p>
                            Founded in 2015, Mango Store started as a small boutique in Mumbai with a simple idea: make premium fashion accessible to everyone in India. What began as a single storefront has grown into one of the country&apos;s most loved online fashion destinations.
                        </p>
                        <p>
                            We partner with over 500 brands worldwide to bring you the latest trends — from everyday essentials to statement pieces — all at prices that make sense. Our team of designers and buyers travel the globe to handpick collections that reflect modern Indian sensibilities.
                        </p>
                        <p>
                            Today, we serve over 10 million customers across 50+ countries, and we&apos;re just getting started.
                        </p>
                    </div>
                    <div className={styles.storyImg} aria-hidden="true">🛍️</div>
                </section>

                {/* Stats */}
                <section className={styles.stats} aria-label="Company statistics">
                    <div className={styles.statsGrid}>
                        {STATS.map((s) => (
                            <div key={s.label} className={styles.stat}>
                                <h3>{s.value}</h3>
                                <p>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className={styles.features} aria-label="Why choose us">
                    <h2>Why Choose Mango</h2>
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

                {/* Mission */}
                <section className={styles.mission} aria-label="Our mission">
                    <h2>Our Mission</h2>
                    <p>
                        To democratise fashion by making world-class style accessible, affordable, and sustainable for every Indian — regardless of where they live or what they earn. We are building a future where great fashion doesn&apos;t cost the earth.
                    </p>
                </section>

                {/* Team */}
                <section className={styles.team} aria-label="Our team">
                    <h2>Meet the Team</h2>
                    <div className={styles.teamGrid}>
                        {TEAM.map((m) => (
                            <div key={m.name} className={styles.teamCard}>
                                <div className={styles.avatar} aria-hidden="true">{m.emoji}</div>
                                <h3>{m.name}</h3>
                                <p>{m.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
