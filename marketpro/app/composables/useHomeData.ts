export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  orig_price: number;
  image: string;
  stock_count: number;
  sales_count: number;
  category?: { id: number; name: string };
  shop?: { id: number; name: string };
}

export interface ApiCategory {
  id: number;
  name: string;
  icon: string;
  image: string;
  product_count: number;
  products?: ApiProduct[];
}

export interface ApiShop {
  id: number;
  name: string;
  logo: string;
}

// Adapter: map ApiProduct → HotDealProduct shape
export function toHotDeal(p: ApiProduct) {
  const total = (p.sales_count || 0) + (p.stock_count || 20);
  return {
    id: p.id,
    title: p.name,
    slug: `product-${p.id}`,
    image: p.image || "/images/thumbs/product-img26.png",
    price: p.price,
    oldPrice: p.orig_price > p.price ? p.orig_price : +(p.price * 1.25).toFixed(2),
    rating: 4.8,
    reviews: String(p.sales_count || 0),
    sold: { current: p.sales_count || 0, total: total || 20 },
  };
}

// Adapter: map ApiProduct → BestSellProduct shape
export function toBestSell(p: ApiProduct) {
  return {
    id: p.id,
    title: p.name,
    image: p.image || "/images/thumbs/product-img26.png",
    price: p.price,
    oldPrice: p.orig_price > p.price ? p.orig_price : +(p.price * 1.25).toFixed(2),
    rating: 4.8,
    reviews: String(p.sales_count || 0),
    sold: { current: p.sales_count || 0, total: (p.sales_count || 0) + (p.stock_count || 20) },
    countdownTarget: "2027-12-31T23:59:59",
  };
}

// Adapter: map ApiProduct → FlashSaleProduct shape
export function toFlashSale(p: ApiProduct) {
  const oldPrice = p.orig_price > p.price ? p.orig_price : +(p.price * 1.25).toFixed(2);
  const total = (p.sales_count || 0) + (p.stock_count || 20);
  return {
    id: String(p.id),
    image: p.image || "/images/thumbs/product-img26.png",
    price: `¥${p.price.toFixed(2)}`,
    oldPrice: `¥${oldPrice.toFixed(2)}`,
    rating: "4.8",
    reviews: `${p.sales_count || 0}`,
    name: p.name,
    sold: p.sales_count || 0,
    total: total || 20,
    soldPercent: total > 0 ? Math.round(((p.sales_count || 0) / total) * 100) : 0,
  };
}

// Adapter: map ApiProduct → RecommendedTwo Product shape
export function toRecommended(p: ApiProduct) {
  return {
    id: p.id,
    title: p.name,
    link: `/product/${p.id}`,
    imageSrc: p.image || "/images/thumbs/product-img26.png",
    price: p.price,
    oldPrice: p.orig_price > p.price ? p.orig_price : undefined,
    rating: 4.8,
    reviewsCount: String(p.sales_count || 0),
  };
}

const _cache = {
  products: null as ApiProduct[] | null,
  topProducts: null as ApiProduct[] | null,
  categories: null as ApiCategory[] | null,
  shops: null as ApiShop[] | null,
};

export function useHomeData() {
  const products = useState<ApiProduct[]>("home:products", () => []);
  const topProducts = useState<ApiProduct[]>("home:topProducts", () => []);
  const categories = useState<ApiCategory[]>("home:categories", () => []);
  const shops = useState<ApiShop[]>("home:shops", () => []);
  const loaded = useState<boolean>("home:loaded", () => false);

  async function fetchAll() {
    if (loaded.value) return;
    try {
      const [newRes, topRes, catRes, shopRes] = await Promise.all([
        $fetch<{ products: ApiProduct[] }>("/api/products?sort=newest&page_size=12"),
        $fetch<{ products: ApiProduct[] }>("/api/products?sort=sales&page_size=12"),
        $fetch<ApiCategory[]>("/api/categories/with-products"),
        $fetch<{ data: ApiShop[] }>("/api/shops?page_size=12"),
      ]);
      products.value = newRes.products ?? [];
      topProducts.value = topRes.products ?? [];
      categories.value = Array.isArray(catRes) ? catRes : [];
      shops.value = shopRes.data ?? [];
      loaded.value = true;
    } catch (e) {
      console.error("useHomeData fetch error", e);
    }
  }

  return { products, topProducts, categories, shops, fetchAll };
}
