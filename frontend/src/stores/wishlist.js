import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

function loadWishlist() {
  try { return JSON.parse(localStorage.getItem('wishlist_v1') || '[]') } catch { return [] }
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(loadWishlist())

  function save() {
    try { localStorage.setItem('wishlist_v1', JSON.stringify(items.value)) } catch {}
  }

  function add(product) {
    if (!has(product.id)) {
      items.value.push({ id: product.id, name: product.name, price: product.price, image: product.image || '', stock: product.stock_count || 0 })
      save()
    }
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
    save()
  }

  function has(id) {
    return items.value.some(i => i.id === id)
  }

  function toggle(product) {
    if (has(product.id)) { remove(product.id); return false }
    else { add(product); return true }
  }

  const count = computed(() => items.value.length)

  return { items, add, remove, has, toggle, count }
})
