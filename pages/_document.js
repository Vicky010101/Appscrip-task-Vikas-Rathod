import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
