import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSiteStore } from '@/stores/site'

const MainLayout = () => import('@/layouts/MainLayout.vue')
const AccountLayout = () => import('@/layouts/AccountLayout.vue')
const AdminLayout = () => import('@/layouts/AdminLayout.vue')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: () => import('@/views/Home.vue') },
      { path: 'category/:id', name: 'category', component: () => import('@/views/Category.vue') },
      { path: 'product/:id', name: 'product', component: () => import('@/views/Product.vue') },
      { path: 'shops', name: 'shops', component: () => import('@/views/Shops.vue') },
      { path: 'shop/:id', name: 'shop', component: () => import('@/views/Shop.vue') },
      { path: 'shop-apply', name: 'shop-apply', component: () => import('@/views/ShopApply.vue') },
      { path: 'cart', name: 'cart', component: () => import('@/views/Cart.vue') },
      { path: 'wishlist', name: 'wishlist', component: () => import('@/views/Wishlist.vue') },
      { path: 'contact', name: 'contact', component: () => import('@/views/Contact.vue') },
      { path: 'order/:orderNo', name: 'order-detail', component: () => import('@/views/OrderDetail.vue'), meta: { requiresAuth: true } },
      { path: 'checkout', name: 'checkout', component: () => import('@/views/Checkout.vue'), meta: { requiresAuth: true } },
      { path: 'login', name: 'login', component: () => import('@/views/Login.vue') },
    ],
  },
  {
    path: '/account',
    component: AccountLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'account', redirect: { name: 'account-orders' } },
      { path: 'orders', name: 'account-orders', component: () => import('@/views/account/Orders.vue') },
      { path: 'balance', name: 'account-balance', component: () => import('@/views/account/Balance.vue') },
      { path: 'shop', name: 'account-shop', component: () => import('@/views/account/MyShop.vue') },
      { path: 'withdrawals', name: 'account-withdrawals', component: () => import('@/views/account/Withdrawals.vue') },
      { path: 'profile', name: 'account-profile', component: () => import('@/views/account/Profile.vue') },
      { path: 'dashboard', name: 'account-dashboard', redirect: { name: 'account-orders' } },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin', redirect: { name: 'admin-dashboard' } },
      { path: 'dashboard', name: 'admin-dashboard', component: () => import('@/views/admin/Dashboard.vue') },
      { path: 'categories', name: 'admin-categories', component: () => import('@/views/admin/Categories.vue') },
      { path: 'products', name: 'admin-products', component: () => import('@/views/admin/Products.vue') },
      { path: 'cards', name: 'admin-cards', component: () => import('@/views/admin/Cards.vue') },
      { path: 'orders', name: 'admin-orders', component: () => import('@/views/admin/Orders.vue') },
      { path: 'users', name: 'admin-users', component: () => import('@/views/admin/Users.vue') },
      { path: 'shops', name: 'admin-shops', component: () => import('@/views/admin/Shops.vue') },
      { path: 'withdrawals', name: 'admin-withdrawals', component: () => import('@/views/admin/Withdrawals.vue') },
      { path: 'settings', name: 'admin-settings', component: () => import('@/views/admin/Settings.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

router.beforeEach(async (to) => {
  const site = useSiteStore()
  const auth = useAuthStore()
  // Ensure site data is loaded before any page renders
  site.ensureLoaded().catch(() => {})
  if (!auth.user && (to.meta.requiresAuth || to.meta.requiresAdmin)) {
    try { await auth.fetchUser() } catch (_) {}
  }
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    window.location.href = '/auth/login?redirect=' + encodeURIComponent(to.fullPath)
    return false
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'home' }
  }
  return true
})

export default router
