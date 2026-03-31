import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Page Not Found | Appscrip Task</title>
            </Head>
            <main style={{ textAlign: "center", padding: "6rem 2rem" }}>
                <h1 style={{ fontSize: "4rem", fontWeight: 700 }}>404</h1>
                <p style={{ color: "#555", margin: "1rem 0 2rem" }}>
                    The page you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/"
                    style={{
                        background: "#1a1a1a",
                        color: "#fff",
                        padding: "0.75rem 2rem",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                    }}
                >
                    Back to Products
                </Link>
            </main>
        </>
    );
}
