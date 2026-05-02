import { defineStore } from "pinia";

interface User {
  id: number;
  username: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  avatar?: string;       // 兼容旧字段
  is_admin: boolean;
  balance?: number;
  nodeloc_id?: number;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const initialized = ref(false);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.is_admin === true);

  let _fetchPromise: Promise<void> | null = null;

  async function fetchUser() {
    if (initialized.value) return;
    if (_fetchPromise) return _fetchPromise;
    loading.value = true;
    _fetchPromise = (async () => {
      try {
        const res = await $fetch<{ user: User }>("/api/user/info", { credentials: "include" });
        user.value = res.user;
      } catch {
        user.value = null;
      } finally {
        loading.value = false;
        initialized.value = true;
      }
    })();
    return _fetchPromise;
  }

  function logout() {
    user.value = null;
    if (import.meta.client) {
      window.location.href = "/auth/logout";
    }
  }

  return { user, loading, initialized, isAuthenticated, isAdmin, fetchUser, logout };
});
