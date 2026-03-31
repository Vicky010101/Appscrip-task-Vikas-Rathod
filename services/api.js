/**
 * API service — primary source: DummyJSON (194 products, real CDN images)
 * Fallback: FakeStore API
 * DummyJSON docs: https://dummyjson.com/docs/products
 */

const DUMMY_URL = "https://dummyjson.com";
const FAKESTORE_URL = "https://fakestoreapi.com";

// ─── Normalise DummyJSON product → our internal shape ───────────────────────
function normaliseDummy(p) {
    return {
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,           // slug e.g. "womens-bags"
        categoryName: p.categoryName || p.category,
        image: p.thumbnail,             // high-quality CDN image
        images: p.images || [p.thumbnail],
        rating: { rate: p.rating, count: p.stock ?? 0 },
        brand: p.brand || "",
        discountPercentage: p.discountPercentage || 0,
        stock: p.stock ?? 99,
        source: "dummyjson",
    };
}

// ─── Normalise FakeStore product → our internal shape ───────────────────────
function normaliseFakeStore(p) {
    return {
        id: `fs-${p.id}`,              // prefix to avoid id collision
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        categoryName: p.category,
        image: p.image,
        images: [p.image],
        rating: p.rating,
        brand: "",
        discountPercentage: 0,
        stock: 99,
        source: "fakestore",
    };
}

// ─── Fetch all products (DummyJSON, all 194) ────────────────────────────────
export async function fetchProducts() {
    try {
        const res = await fetch(`${DUMMY_URL}/products?limit=194&select=id,title,price,description,category,thumbnail,images,rating,stock,brand,discountPercentage`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`DummyJSON ${res.status}`);
        const data = await res.json();
        return data.products.map(normaliseDummy);
    } catch (err) {
        // fallback to FakeStore silently
        const res = await fetch(`${FAKESTORE_URL}/products`);
        if (!res.ok) throw new Error("Both APIs failed");
        const data = await res.json();
        return data.map(normaliseFakeStore);
    }
}

// ─── Fetch categories ────────────────────────────────────────────────────────
export async function fetchCategories() {
    try {
        const res = await fetch(`${DUMMY_URL}/products/categories`);
        if (!res.ok) throw new Error(`DummyJSON categories ${res.status}`);
        const data = await res.json();
        // Return array of { slug, name } objects
        return data.map((c) => ({ slug: c.slug, name: c.name }));
    } catch (err) {
        // fallback to FakeStore categories silently
        const res = await fetch(`${FAKESTORE_URL}/products/categories`);
        if (!res.ok) throw new Error("Both category APIs failed");
        const cats = await res.json();
        return cats.map((c) => ({ slug: c, name: c }));
    }
}

// ─── Fetch single product by id ──────────────────────────────────────────────
export async function fetchProductById(id) {
    // FakeStore prefixed ids
    if (String(id).startsWith("fs-")) {
        const fsId = String(id).replace("fs-", "");
        const res = await fetch(`${FAKESTORE_URL}/products/${fsId}`);
        if (!res.ok) throw new Error("FakeStore product not found");
        return normaliseFakeStore(await res.json());
    }
    // DummyJSON
    const res = await fetch(`${DUMMY_URL}/products/${id}`);
    if (!res.ok) throw new Error(`DummyJSON product ${res.status}`);
    return normaliseDummy(await res.json());
}

// ─── Fetch products by category slug ─────────────────────────────────────────
export async function fetchProductsByCategory(slug) {
    const res = await fetch(`${DUMMY_URL}/products/category/${encodeURIComponent(slug)}?limit=100`);
    if (!res.ok) throw new Error(`Category fetch failed ${res.status}`);
    const data = await res.json();
    return data.products.map(normaliseDummy);
}
