import { defineStore } from "pinia";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
}

function loadCart(): CartItem[] {
  if (!import.meta.client) return [];
  try {
    return JSON.parse(localStorage.getItem("cart_v1") || "[]");
  } catch {
    return [];
  }
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>(loadCart());

  function save() {
    if (!import.meta.client) return;
    try {
      localStorage.setItem("cart_v1", JSON.stringify(items.value));
    } catch (_e) {
      /* ignore */
    }
  }

  function add(
    product: { id: number; name: string; price: number; image?: string; stock_count?: number },
    qty = 1
  ) {
    const maxQty = product.stock_count || 99;
    const idx = items.value.findIndex(i => i.id === product.id);
    if (idx >= 0) {
      items.value[idx].qty = Math.min(items.value[idx].qty + qty, maxQty);
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "",
        qty: Math.min(qty, maxQty),
        stock: maxQty,
      });
    }
    save();
  }

  function remove(id: number) {
    items.value = items.value.filter(i => i.id !== id);
    save();
  }

  function updateQty(id: number, qty: number) {
    const item = items.value.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, Math.min(qty, item.stock || 99));
      save();
    }
  }

  function clear() {
    items.value = [];
    save();
  }

  const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0));
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0));

  return { items, add, remove, updateQty, clear, count, total };
});
