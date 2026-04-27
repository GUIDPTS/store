import { defineStore } from "pinia";

interface Category {
  id: number;
  name: string;
  is_active: boolean;
  products?: unknown[];
}

interface Settings {
  site_name?: string;
  site_description?: string;
  banner_title?: string;
  banner_subtitle?: string;
  banner_btn_text?: string;
  [key: string]: unknown;
}

export const useSiteStore = defineStore("site", () => {
  const settings = ref<Settings>({});
  const categories = ref<Category[]>([]);
  const loaded = ref(false);
  let loadingPromise: Promise<void> | null = null;

  async function ensureLoaded() {
    if (loaded.value) return;
    if (loadingPromise) return loadingPromise;
    loadingPromise = (async () => {
      try {
        const [s, c] = await Promise.all([
          $fetch<Settings>("/api/settings", { credentials: "include" }).catch(() => ({})),
          $fetch<Category[]>("/api/categories/with-products", { credentials: "include" }).catch(
            () => []
          ),
        ]);
        settings.value = s || {};
        categories.value = (Array.isArray(c) ? c : []).filter(x => x.is_active !== false);
        loaded.value = true;
      } catch {
        /* tolerate */
      } finally {
        loadingPromise = null;
      }
    })();
    return loadingPromise;
  }

  return { settings, categories, loaded, ensureLoaded };
});
