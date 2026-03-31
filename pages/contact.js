import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Contact.module.css";

const SUBJECTS = [
    "Order Enquiry",
    "Return / Refund",
    "Product Question",
    "Shipping Issue",
    "Partnership",
    "Other",
];

function validate(fields) {
    const errors = {};
    if (!fields.name.trim()) errors.name = "Name is required.";
    else if (fields.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

    if (!fields.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address.";

    if (!fields.subject) errors.subject = "Please select a subject.";

    if (!fields.message.trim()) errors.message = "Message is required.";
    else if (fields.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";

    return errors;
}

export default function ContactPage() {
    const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((f) => ({ ...f, [name]: value }));
        // Clear error on change
        if (errors[name]) setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate(fields);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setSubmitting(true);
        // Simulate async submission
        setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1200);
    };

    const handleReset = () => {
        setFields({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        setSubmitted(false);
    };

    return (
        <>
            <Head>
                <title>Contact Us | Mango Store</title>
                <meta name="description" content="Get in touch with Mango Store. We're here to help with orders, returns, and any questions you have." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Contact Us | Mango Store" />
                <meta property="og:description" content="Reach out to our support team — we respond within 24 hours." />
                <meta property="og:type" content="website" />
            </Head>

            <Header />

            <main id="main-content">
                {/* Hero */}
                <section className={styles.hero}>
                    <h1>Contact Us</h1>
                    <p>We&apos;d love to hear from you. Our team responds within 24 hours.</p>
                </section>

                <div className={styles.container}>
                    {/* Contact info */}
                    <aside aria-label="Contact information">
                        <h2>Get in Touch</h2>
                        <ul className={styles.infoList}>
                            <li className={styles.infoItem}>
                                <div className={styles.infoIcon} aria-hidden="true">✉</div>
                                <div className={styles.infoText}>
                                    <strong>Email</strong>
                                    <a href="mailto:vrathod07913@gmail.com">vrathod07913@gmail.com</a>
                                </div>
                            </li>
                            <li className={styles.infoItem}>
                                <div className={styles.infoIcon} aria-hidden="true">📞</div>
                                <div className={styles.infoText}>
                                    <strong>Phone</strong>
                                    <a href="tel:+919741794663">+91-9741794663</a>
                                </div>
                            </li>
                            <li className={styles.infoItem}>
                                <div className={styles.infoIcon} aria-hidden="true">📍</div>
                                <div className={styles.infoText}>
                                    <strong>Address</strong>
                                    <span>Bangalore, Karnataka, India</span>
                                </div>
                            </li>
                            <li className={styles.infoItem}>
                                <div className={styles.infoIcon} aria-hidden="true">🕐</div>
                                <div className={styles.infoText}>
                                    <strong>Support Hours</strong>
                                    <span>Mon – Sat, 9 AM – 7 PM IST</span>
                                </div>
                            </li>
                        </ul>

                        <div className={styles.socialRow} aria-label="Social media links">
                            <a href="#" className={styles.socialBtn} aria-label="Instagram">📸</a>
                            <a href="#" className={styles.socialBtn} aria-label="Twitter">🐦</a>
                            <a href="#" className={styles.socialBtn} aria-label="Facebook">👍</a>
                            <a href="#" className={styles.socialBtn} aria-label="LinkedIn">💼</a>
                        </div>
                    </aside>

                    {/* Form */}
                    <section aria-label="Contact form">
                        <h2>Send a Message</h2>

                        {submitted ? (
                            <div className={styles.success} role="alert">
                                <div className={styles.successIcon} aria-hidden="true">✓</div>
                                <h3>Message Sent!</h3>
                                <p>Thanks for reaching out, <strong>{fields.name}</strong>. We&apos;ll get back to you at <strong>{fields.email}</strong> within 24 hours.</p>
                                <button className={styles.resetBtn} onClick={handleReset}>Send Another Message</button>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                                <div className={styles.row}>
                                    <div className={`${styles.field} ${errors.name ? styles.fieldError : ""}`}>
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Vikas Rathod"
                                            value={fields.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                            aria-invalid={!!errors.name}
                                        />
                                        {errors.name && <span id="name-error" className={styles.errorMsg} role="alert">{errors.name}</span>}
                                    </div>

                                    <div className={`${styles.field} ${errors.email ? styles.fieldError : ""}`}>
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={fields.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                            aria-invalid={!!errors.email}
                                        />
                                        {errors.email && <span id="email-error" className={styles.errorMsg} role="alert">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className={`${styles.field} ${errors.subject ? styles.fieldError : ""}`}>
                                    <label htmlFor="subject">Subject *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={fields.subject}
                                        onChange={handleChange}
                                        aria-describedby={errors.subject ? "subject-error" : undefined}
                                        aria-invalid={!!errors.subject}
                                    >
                                        <option value="">Select a subject…</option>
                                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errors.subject && <span id="subject-error" className={styles.errorMsg} role="alert">{errors.subject}</span>}
                                </div>

                                <div className={`${styles.field} ${errors.message ? styles.fieldError : ""}`}>
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us how we can help you…"
                                        value={fields.message}
                                        onChange={handleChange}
                                        aria-describedby={errors.message ? "message-error" : undefined}
                                        aria-invalid={!!errors.message}
                                    />
                                    {errors.message && <span id="message-error" className={styles.errorMsg} role="alert">{errors.message}</span>}
                                </div>

                                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                    {submitting ? "Sending…" : "Send Message"}
                                </button>
                            </form>
                        )}
                    </section>
                </div>

                {/* Map */}
                <div className={styles.mapSection}>
                    <h2>Find Us</h2>
                    <div className={styles.mapFrame}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.99!2d77.35073!3d12.97194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000"
                            title="Mango Store location — Bangalore, India"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            aria-label="Google Maps showing Bangalore, India"
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
