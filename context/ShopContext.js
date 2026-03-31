import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";

export const USD_TO_INR = 83;

// Memoised formatter — created once, reused
const inrFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
});

export function toINR(usd) {
    return inrFormatter.format(Math.round(usd * USD_TO_INR));
}

export const NAV_CATEGORIES = {
    "new-in": null,
    clothing: ["mens-shirts", "womens-dresses", "tops"],
    shoes: ["mens-shoes", "womens-shoes"],
    accessories: ["womens-bags", "womens-jewellery", "sunglasses", "mens-watches", "womens-watches", "mobile-accessories"],
    sale: null,
};

// ─── Reducers ────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
    switch (action.type) {
        case "ADD": {
            const idx = state.findIndex((i) => i.id === action.product.id);
            if (idx !== -1) {
                const next = [...state];
                next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
                return next;
            }
            return [...state, { ...action.product, qty: 1 }];
        }
        case "REMOVE": return state.filter((i) => i.id !== action.id);
        case "INC": return state.map((i) => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
        case "DEC": return state.map((i) => i.id === action.id ? { ...i, qty: i.qty - 1 } : i).filter((i) => i.qty > 0);
        case "CLEAR": return [];
        case "INIT": return action.payload;
        default: return state;
    }
}

function wishlistReducer(state, action) {
    switch (action.type) {
        case "TOGGLE": {
            const exists = state.some((i) => i.id === action.product.id);
            return exists ? state.filter((i) => i.id !== action.product.id) : [...state, action.product];
        }
        case "INIT": return action.payload;
        default: return state;
    }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ShopContext = createContext(null);

export function ShopProvider({ children }) {
    const [cart, cartDispatch] = useReducer(cartReducer, []);
    const [wishlist, wishlistDispatch] = useReducer(wishlistReducer, []);

    // Hydrate from localStorage once on mount
    useEffect(() => {
        try {
            const c = localStorage.getItem("cart");
            if (c) cartDispatch({ type: "INIT", payload: JSON.parse(c) });
            const w = localStorage.getItem("wishlist");
            if (w) wishlistDispatch({ type: "INIT", payload: JSON.parse(w) });
        } catch (_) { }
    }, []);

    // Persist — debounced via useEffect dependency
    useEffect(() => {
        try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (_) { }
    }, [cart]);

    useEffect(() => {
        try { localStorage.setItem("wishlist", JSON.stringify(wishlist)); } catch (_) { }
    }, [wishlist]);

    // Stable callbacks — never recreated
    const addToCart = useCallback((product) => cartDispatch({ type: "ADD", product }), []);
    const removeFromCart = useCallback((id) => cartDispatch({ type: "REMOVE", id }), []);
    const incQty = useCallback((id) => cartDispatch({ type: "INC", id }), []);
    const decQty = useCallback((id) => cartDispatch({ type: "DEC", id }), []);
    const clearCart = useCallback(() => cartDispatch({ type: "CLEAR" }), []);
    const toggleWishlist = useCallback((product) => wishlistDispatch({ type: "TOGGLE", product }), []);

    // Derived — only recomputed when cart/wishlist changes
    const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
    const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
    const cartIds = useMemo(() => new Set(cart.map((i) => i.id)), [cart]);
    const wishIds = useMemo(() => new Set(wishlist.map((i) => i.id)), [wishlist]);

    const isInCart = useCallback((id) => cartIds.has(id), [cartIds]);
    const isWished = useCallback((id) => wishIds.has(id), [wishIds]);

    const value = useMemo(() => ({
        cart, cartCount, cartTotal,
        addToCart, removeFromCart, incQty, decQty, clearCart, isInCart,
        wishlist, toggleWishlist, isWished,
    }), [cart, cartCount, cartTotal, addToCart, removeFromCart, incQty, decQty, clearCart, isInCart, wishlist, toggleWishlist, isWished]);

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
    const ctx = useContext(ShopContext);
    if (!ctx) throw new Error("useShop must be used inside ShopProvider");
    return ctx;
}
