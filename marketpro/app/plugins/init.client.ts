// Initialize auth + site data on client mount
export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  const _site = useSiteStore();

  // Load auth and site data in parallel without blocking render
  if (import.meta.client) {
    Promise.all([auth.fetchUser(), _site.ensureLoaded()]).catch(() => {});
  }
});
