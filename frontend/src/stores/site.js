import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/api'

export const useSiteStore = defineStore('site', () => {
  const settings = ref({})
  const categories = ref([])
  const loaded = ref(false)
  let loadingPromise = null

  async function ensureLoaded() {
    if (loaded.value) return
    if (loadingPromise) return loadingPromise
    loadingPromise = (async () => {
      try {
        const [s, c] = await Promise.all([
          api.get('/api/settings'),
          api.get('/api/categories/with-products'),
        ])
        settings.value = s.data || {}
        categories.value = (c.data || []).filter(x => x.is_active !== false)
        loaded.value = true
      } catch (_) { /* tolerate */ }
      finally { loadingPromise = null }
    })()
    return loadingPromise
  }

  return { settings, categories, loaded, ensureLoaded }
})
