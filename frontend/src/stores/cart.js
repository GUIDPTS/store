import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

function loadCart() {
  try { return JSON.parse(localStorage.getItem('cart_v1') || '[]') } catch { return [] }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref(loadCart())

  function save() {
    try { localStorage.setItem('cart_v1', JSON.stringify(items.value)) } catch {}
  }

  function add(product, qty = 1) {
    const maxQty = product.stock_count || 99
    const idx = items.value.findIndex(i => i.id === product.id)
    if (idx >= 0) {
      items.value[idx].qty = Math.min(items.value[idx].qty + qty, maxQty)
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '',
        qty: Math.min(qty, maxQty),
        stock: maxQty,
      })
    }
    save()
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
    save()
  }

  function updateQty(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.qty = Math.max(1, Math.min(parseInt(qty) || 1, item.stock || 99))
      save()
    }
  }

  function clear() { items.value = []; save() }

  const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

  return { items, add, remove, updateQty, clear, count, total }
})
