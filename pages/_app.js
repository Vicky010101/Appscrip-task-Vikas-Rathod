import "../styles/globals.css";
import { ShopProvider } from "../context/ShopContext";

export default function App({ Component, pageProps }) {
  return (
    <ShopProvider>
      <Component {...pageProps} />
    </ShopProvider>
  );
}
