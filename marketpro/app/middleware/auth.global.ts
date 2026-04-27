// Route guard: protect /account/* routes
// Note: /admin is served as a static HTML file and handles its own auth via the API
export default defineNuxtRouteMiddleware(to => {
  const auth = useAuthStore();

  if (to.path.startsWith("/account")) {
    if (!auth.isAuthenticated) {
      if (import.meta.client) {
        window.location.href = "/auth/login?redirect=" + encodeURIComponent(to.fullPath);
      }
      return abortNavigation();
    }
  }
});
