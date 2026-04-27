import { defineStore } from "pinia";

interface User {
  id: number;
  username: string;
  avatar?: string;
  is_admin: boolean;
  balance?: number;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const initialized = ref(false);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.is_admin === true);

  async function fetchUser() {
    loading.value = true;
    try {
      const res = await $fetch<{ user: User }>("/api/user/info", { credentials: "include" });
      user.value = res.user;
    } catch {
      user.value = null;
    } finally {
      loading.value = false;
      initialized.value = true;
    }
  }

  function logout() {
    user.value = null;
    if (import.meta.client) {
      window.location.href = "/auth/logout";
    }
  }

  return { user, loading, initialized, isAuthenticated, isAdmin, fetchUser, logout };
});
