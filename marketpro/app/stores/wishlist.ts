import { defineStore } from "pinia";

interface WishItem {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

function loadWishlist(): WishItem[] {
  if (!import.meta.client) return [];
  try {
    return JSON.parse(localStorage.getItem("wishlist_v1") || "[]");
  } catch {
    return [];
  }
}

export const useWishlistStore = defineStore("wishlist", () => {
  const items = ref<WishItem[]>(loadWishlist());

  function save() {
    if (!import.meta.client) return;
    try {
      localStorage.setItem("wishlist_v1", JSON.stringify(items.value));
    } catch (_e) {
      /* ignore */
    }
  }

  function toggle(product: {
    id: number;
    name: string;
    price: number;
    image?: string;
    stock_count?: number;
  }) {
    const idx = items.value.findIndex(i => i.id === product.id);
    if (idx >= 0) {
      items.value.splice(idx, 1);
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "",
        stock: product.stock_count || 0,
      });
    }
    save();
  }

  function remove(id: number) {
    items.value = items.value.filter(i => i.id !== id);
    save();
  }

  function has(id: number) {
    return items.value.some(i => i.id === id);
  }

  const ids = computed(() => items.value.map(i => i.id));
  const count = computed(() => items.value.length);

  return { items, ids, toggle, remove, has, count };
});
