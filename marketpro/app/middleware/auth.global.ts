export default defineNuxtRouteMiddleware(async to => {
  const auth = useAuthStore();

  if (!auth.initialized) {
    await auth.fetchUser();
  }

  if (to.path.startsWith("/account")) {
    if (!auth.isAuthenticated) {
      if (import.meta.client) {
        window.location.href = "/auth/login?redirect=" + encodeURIComponent(to.fullPath);
      }
      return abortNavigation();
    }
  }

  if (to.path.startsWith("/admin")) {
    if (!auth.isAuthenticated) {
      if (import.meta.client) {
        window.location.href = "/auth/login?redirect=" + encodeURIComponent(to.fullPath);
      }
      return abortNavigation();
    }
    if (!auth.isAdmin) {
      return navigateTo("/");
    }
  }
});
