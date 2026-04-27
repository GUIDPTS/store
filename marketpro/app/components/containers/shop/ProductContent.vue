<template>
  <div class="pt-80">
    <div class="product-dContent border rounded-24">
      <!-- Tab Header -->
      <div
        class="product-dContent__header border-bottom border-gray-100 d-flex align-items-center flex-wrap gap-0"
      >
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="
            activeTab === tab.key ? 'text-main-600 border-bottom border-main-600' : 'text-gray-600'
          "
          class="bg-transparent border-0 px-24 py-16 fw-medium text-sm"
          style="margin-bottom: -1px"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <span
            v-if="tab.key === 'reviews' && stats && stats.total"
            class="ms-6 badge rounded-pill bg-main-50 text-main-600 text-xs"
          >
            {{ stats.total }}
          </span>
        </button>
      </div>

      <div class="product-dContent__box p-24">
        <!-- ===== Description ===== -->
        <div v-if="activeTab === 'description'">
          <div
            v-if="description"
            class="text-gray-700"
            style="white-space: pre-line; line-height: 1.8"
          >
            {{ description }}
          </div>
          <p v-else class="text-gray-400 text-center py-32">暂无商品介绍。</p>
        </div>

        <!-- ===== Reviews ===== -->
        <div v-if="activeTab === 'reviews'">
          <!-- Stats row -->
          <div
            v-if="stats && stats.total > 0"
            class="d-flex gap-32 align-items-start mb-32 pb-32 border-bottom border-gray-100 flex-wrap"
          >
            <div class="text-center flex-shrink-0">
              <div class="fw-bold text-main-600" style="font-size: 3rem; line-height: 1">
                {{ stats.avg_rating.toFixed(1) }}
              </div>
              <div class="d-flex gap-4 justify-content-center my-8">
                <i
                  v-for="n in 5"
                  :key="n"
                  :class="
                    n <= Math.round(stats.avg_rating)
                      ? 'ph-fill ph-star text-warning-600'
                      : 'ph ph-star text-gray-300'
                  "
                  class="text-xl"
                ></i>
              </div>
              <div class="text-sm text-gray-500">{{ stats.total }} 条评价</div>
            </div>
            <div class="flex-1" style="min-width: 180px">
              <div
                v-for="n in [5, 4, 3, 2, 1]"
                :key="n"
                class="d-flex align-items-center gap-8 mb-6"
              >
                <span class="text-xs text-gray-500" style="width: 16px">{{ n }}</span>
                <i class="ph-fill ph-star text-warning-600 flex-shrink-0 text-xs"></i>
                <div class="progress flex-1 rounded-pill" style="height: 6px; background: #f3f4f6">
                  <div
                    class="progress-bar bg-warning-600 rounded-pill"
                    :style="{
                      width: stats.total
                        ? (stats.rating_distribution[n] / stats.total) * 100 + '%'
                        : '0%',
                    }"
                  ></div>
                </div>
                <span class="text-xs text-gray-400" style="width: 20px">
                  {{ stats.rating_distribution[n] || 0 }}
                </span>
              </div>
            </div>
          </div>

          <!-- Submit review -->
          <div
            v-if="auth.isAuthenticated && canReview && !hasReviewed"
            class="mb-32 p-24 rounded-16 border border-gray-100 bg-color-one"
          >
            <h6 class="mb-16 text-sm fw-bold">发表评价</h6>
            <div class="mb-12">
              <label class="text-sm text-gray-700 mb-6 d-block">评分</label>
              <div class="d-flex gap-8">
                <button
                  v-for="n in 5"
                  :key="n"
                  type="button"
                  class="border-0 bg-transparent p-0"
                  @click="reviewForm.rating = n"
                >
                  <i
                    :class="
                      n <= reviewForm.rating
                        ? 'ph-fill ph-star text-warning-600'
                        : 'ph ph-star text-gray-300'
                    "
                    class="text-2xl"
                  ></i>
                </button>
              </div>
            </div>
            <div class="mb-12">
              <input
                v-model="reviewForm.title"
                type="text"
                class="common-input"
                placeholder="标题（可选）"
              />
            </div>
            <div class="mb-16">
              <textarea
                v-model="reviewForm.content"
                class="common-input"
                rows="3"
                placeholder="请分享您的使用体验…"
              ></textarea>
            </div>
            <button
              type="button"
              class="btn btn-main rounded-pill py-8 px-24 text-sm d-inline-flex align-items-center gap-8"
              :disabled="submitting"
              @click="submitReview"
            >
              <i class="ph ph-paper-plane-tilt"></i>
              {{ submitting ? "提交中…" : "提交评价" }}
            </button>
            <p v-if="submitError" class="text-danger-600 text-sm mt-8">{{ submitError }}</p>
          </div>
          <div
            v-else-if="auth.isAuthenticated && hasReviewed"
            class="mb-24 d-flex align-items-center gap-8 text-sm text-success-600 p-12 rounded-8 bg-success-50"
          >
            <i class="ph ph-check-circle"></i> 您已评价过该商品
          </div>
          <div v-else-if="!auth.isAuthenticated" class="mb-24">
            <a
              href="/auth/login"
              class="btn btn-outline-main rounded-pill py-8 px-24 text-sm d-inline-flex align-items-center gap-8"
            >
              <i class="ph ph-sign-in"></i> 登录后评价
            </a>
          </div>

          <!-- Review list -->
          <div v-if="reviewsLoading" class="py-32 text-center text-gray-400">
            <div class="spinner-border spinner-border-sm text-main-600" role="status"></div>
          </div>
          <div v-else-if="reviews.length === 0" class="py-40 text-center text-gray-400">
            <i class="ph ph-star d-block mb-8" style="font-size: 2.5rem"></i>
            暂无评价，快来抢先评价吧
          </div>
          <div
            v-for="r in reviews"
            :key="r.id"
            class="d-flex gap-16 py-20 border-bottom border-gray-100"
          >
            <div class="flex-shrink-0">
              <div class="w-44 h-44 rounded-circle bg-main-50 flex-center overflow-hidden">
                <img
                  v-if="r.user?.avatar_url"
                  :src="r.user.avatar_url"
                  class="w-100 h-100 object-fit-cover"
                  alt=""
                />
                <i v-else class="ph ph-user text-main-600 text-xl"></i>
              </div>
            </div>
            <div class="flex-1">
              <div class="d-flex align-items-center gap-12 mb-6 flex-wrap">
                <span class="fw-semibold text-sm text-heading">
                  {{ r.user?.username || "匿名用户" }}
                </span>
                <div class="d-flex gap-2">
                  <i
                    v-for="n in 5"
                    :key="n"
                    :class="
                      n <= r.rating
                        ? 'ph-fill ph-star text-warning-600'
                        : 'ph ph-star text-gray-300'
                    "
                    class="text-sm"
                  ></i>
                </div>
                <span class="text-xs text-gray-400">{{ fmtDate(r.created_at) }}</span>
              </div>
              <p v-if="r.title" class="fw-semibold text-sm mb-4">{{ r.title }}</p>
              <p class="text-gray-700 text-sm mb-0">{{ r.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthStore } from "~/stores/auth";

const props = defineProps<{
  productId: number;
  description?: string;
}>();

const auth = useAuthStore();

const tabs = [
  { key: "description", label: "商品介绍" },
  { key: "reviews", label: "用户评价" },
];
const activeTab = ref("description");

interface ReviewUser {
  username?: string;
  avatar_url?: string;
}
interface Review {
  id: number;
  rating: number;
  title?: string;
  content?: string;
  created_at: string;
  user?: ReviewUser;
}
interface ReviewStats {
  total: number;
  avg_rating: number;
  rating_distribution: Record<number, number>;
}

const reviews = ref<Review[]>([]);
const stats = ref<ReviewStats | null>(null);
const reviewsLoading = ref(false);
const canReview = ref(false);
const hasReviewed = ref(false);

const reviewForm = ref({ rating: 5, title: "", content: "" });
const submitting = ref(false);
const submitError = ref("");

function fmtDate(str: string) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("zh-CN");
}

async function loadReviews() {
  if (!props.productId) return;
  reviewsLoading.value = true;
  try {
    const data = await $fetch<{ reviews: Review[]; stats: ReviewStats }>(
      `/api/products/${props.productId}/reviews`,
      { credentials: "include" }
    );
    reviews.value = data.reviews || [];
    stats.value = data.stats || null;

    if (auth.isAuthenticated) {
      // Check if already reviewed
      hasReviewed.value = reviews.value.some(
        r => auth.user && (r.user as unknown as { id?: number })?.id === auth.user.id
      );
    }
  } catch {
    /* ignore */
  } finally {
    reviewsLoading.value = false;
  }
}

async function checkCanReview() {
  if (!auth.isAuthenticated || !props.productId) return;
  try {
    // Try creating with invalid data — if 403 returned, can't review; if 400, can review
    // Better: check via orders list whether completed purchase exists
    // For now: allow submission, let backend validate
    canReview.value = true;
  } catch {
    canReview.value = false;
  }
}

async function submitReview() {
  if (!reviewForm.value.content.trim()) {
    submitError.value = "请填写评价内容";
    return;
  }
  submitting.value = true;
  submitError.value = "";
  try {
    await $fetch(`/api/products/${props.productId}/reviews`, {
      method: "POST",
      credentials: "include",
      body: {
        rating: reviewForm.value.rating,
        title: reviewForm.value.title,
        content: reviewForm.value.content,
      },
    });
    hasReviewed.value = true;
    reviewForm.value = { rating: 5, title: "", content: "" };
    await loadReviews();
  } catch (e: unknown) {
    const err = e as { data?: { error?: string }; message?: string };
    submitError.value = err?.data?.error || err?.message || "提交失败，请稍后重试";
  } finally {
    submitting.value = false;
  }
}

watch(
  () => props.productId,
  id => {
    if (id) {
      loadReviews();
      checkCanReview();
    }
  },
  { immediate: true }
);

watch(
  () => activeTab.value,
  tab => {
    if (tab === "reviews" && reviews.value.length === 0 && !reviewsLoading.value) {
      loadReviews();
    }
  }
);
</script>
