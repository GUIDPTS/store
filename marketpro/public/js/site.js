// Global Alpine.js store and helpers
document.addEventListener("alpine:init", () => {
  // ── Cart store (localStorage-backed) ──────────────────────────────────────
  Alpine.store("cart", {
    items: (() => {
      try {
        return JSON.parse(localStorage.getItem("cart_v1") || "[]");
      } catch (e) {
        return [];
      }
    })(),

    add(product, qty = 1) {
      const maxQty = product.stock_count || 99;
      const idx = this.items.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        this.items[idx].qty = Math.min(this.items[idx].qty + qty, maxQty);
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || "",
          qty: Math.min(qty, maxQty),
          stock: maxQty,
        });
      }
      this.save();
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save();
    },

    updateQty(id, qty) {
      const item = this.items.find(i => i.id === id);
      if (item) {
        item.qty = Math.max(1, Math.min(parseInt(qty) || 1, item.stock || 99));
        this.save();
      }
    },

    clear() {
      this.items = [];
      this.save();
    },

    save() {
      try {
        localStorage.setItem("cart_v1", JSON.stringify(this.items));
      } catch (e) {}
    },

    count() {
      return this.items.reduce((s, i) => s + i.qty, 0);
    },
    total() {
      return this.items.reduce((s, i) => s + i.price * i.qty, 0);
    },
  });

  // ── Wishlist store (localStorage-backed) ──────────────────────────────────
  Alpine.store("wishlist", {
    items: (() => {
      try {
        return JSON.parse(localStorage.getItem("wishlist_v1") || "[]");
      } catch (e) {
        return [];
      }
    })(),

    add(product) {
      if (!this.has(product.id)) {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || "",
          stock: product.stock_count || 0,
        });
        this.save();
      }
    },
    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save();
    },
    toggle(product) {
      if (this.has(product.id)) {
        this.remove(product.id);
        return false;
      } else {
        this.add(product);
        return true;
      }
    },
    has(id) {
      return this.items.some(i => i.id === id);
    },
    count() {
      return this.items.length;
    },
    save() {
      try {
        localStorage.setItem("wishlist_v1", JSON.stringify(this.items));
      } catch (e) {}
    },
  });

  // ── App store ──────────────────────────────────────────────────────────────
  Alpine.store("app", {
    user: null,
    settings: {},
    categories: [],
    toast: null,
    toastType: "success",
    initialized: false,
    mobileOpen: false,

    async init() {
      const [s, c, u] = await Promise.allSettled([
        fetch("/api/settings")
          .then(r => r.json())
          .catch(() => ({})),
        fetch("/api/categories/with-products")
          .then(r => (r.ok ? r.json() : fetch("/api/categories").then(r2 => r2.json())))
          .catch(() => []),
        fetch("/api/user/info")
          .then(r => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);
      this.settings = s.status === "fulfilled" ? s.value || {} : {};
      this.categories = c.status === "fulfilled" && Array.isArray(c.value) ? c.value : [];
      if (u.status === "fulfilled" && u.value) this.user = u.value.user || null;
      this.initialized = true;
    },

    showToast(msg, type = "success") {
      this.toast = msg;
      this.toastType = type;
      setTimeout(() => {
        this.toast = null;
      }, 3000);
    },

    async logout() {
      await fetch("/api/logout", { method: "POST" }).catch(() => {});
      this.user = null;
      window.location.href = "/";
    },

    siteName() {
      return this.settings.site_name || "发卡平台";
    },

    siteLogoUrl() {
      return this.settings.site_logo || "";
    },
  });
});

// Utility helpers
function qs(key) {
  return new URLSearchParams(location.search).get(key);
}

function fmtDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleString("zh-CN", { hour12: false });
}

function fmtPrice(n) {
  return "¥" + Number(n || 0).toFixed(2);
}

const ORDER_STATUS = {
  0: { text: "待支付", cls: "text-warning-600" },
  1: { text: "已支付", cls: "text-main-600" },
  2: { text: "已完成", cls: "text-main-600" },
  3: { text: "已取消", cls: "text-gray-400" },
  4: { text: "已退款", cls: "text-danger-600" },
};
