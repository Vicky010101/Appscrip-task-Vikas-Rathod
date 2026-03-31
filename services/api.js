const DUMMY_URL = "https://dummyjson.com";
const FAKESTORE_URL = "https://fakestoreapi.com";

function normaliseDummy(p) {
    return {
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        categoryName: p.categoryName || p.category,
        image: p.thumbnail,
        images: p.images || [p.thumbnail],
        rating: { rate: p.rating, count: p.stock ?? 0 },
        brand: p.brand || "",
        discountPercentage: p.discountPercentage || 0,
        stock: p.stock ?? 99,
    };
}

function normaliseFakeStore(p) {
    return {
        id: `fs-${p.id}`,
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
    };
}

export async function fetchProducts() {
    try {
        const res = await fetch(
            `${DUMMY_URL}/products?limit=194&select=id,title,price,description,category,thumbnail,images,rating,stock,brand,discountPercentage`
        );
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        return data.products.map(normaliseDummy);
    } catch {
        const res = await fetch(`${FAKESTORE_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        return data.map(normaliseFakeStore);
    }
}

export async function fetchCategories() {
    try {
        const res = await fetch(`${DUMMY_URL}/products/categories`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        return data.map((c) => ({ slug: c.slug, name: c.name }));
    } catch {
        const res = await fetch(`${FAKESTORE_URL}/products/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const cats = await res.json();
        return cats.map((c) => ({ slug: c, name: c }));
    }
}

export async function fetchProductById(id) {
    if (String(id).startsWith("fs-")) {
        const fsId = String(id).replace("fs-", "");
        const res = await fetch(`${FAKESTORE_URL}/products/${fsId}`);
        if (!res.ok) throw new Error("Product not found");
        return normaliseFakeStore(await res.json());
    }
    const res = await fetch(`${DUMMY_URL}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return normaliseDummy(await res.json());
}

export async function fetchProductsByCategory(slug) {
    const res = await fetch(
        `${DUMMY_URL}/products/category/${encodeURIComponent(slug)}?limit=100`
    );
    if (!res.ok) throw new Error("Failed to fetch category products");
    const data = await res.json();
    return data.products.map(normaliseDummy);
}
