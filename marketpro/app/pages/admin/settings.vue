<template>
  <div>
    <div class="page-title">系统设置</div>

    <el-card shadow="never" v-loading="loading">
      <el-tabs>
        <el-tab-pane label="站点信息" name="site">
          <el-form :model="form" label-width="100px" style="max-width:580px;margin-top:12px">
            <el-form-item label="站点名称">
              <el-input v-model="form.site_name" />
            </el-form-item>
            <el-form-item label="站点描述">
              <el-input v-model="form.site_description" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="页脚文字">
              <el-input v-model="form.footer_text" />
            </el-form-item>
            <el-form-item label="公告">
              <el-input v-model="form.announcement" type="textarea" :rows="3" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="NodeLoc OAuth" name="oauth">
          <el-form :model="form" label-width="130px" style="max-width:580px;margin-top:12px">
            <el-form-item label="Client ID">
              <el-input v-model="form.nodeloc_client_id" />
            </el-form-item>
            <el-form-item label="Client Secret">
              <el-input v-model="form.nodeloc_client_secret" show-password />
            </el-form-item>
            <el-form-item label="Redirect URI">
              <el-input v-model="form.nodeloc_redirect_uri" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="支付配置" name="payment">
          <el-form :model="form" label-width="110px" style="max-width:580px;margin-top:12px">
            <el-form-item label="启用支付">
              <el-switch v-model="form.payment_enabled" active-text="启用" inactive-text="禁用" />
            </el-form-item>
            <el-form-item label="支付商户ID">
              <el-input v-model="form.payment_id" />
            </el-form-item>
            <el-form-item label="支付密钥">
              <el-input v-model="form.payment_secret" show-password />
            </el-form-item>
            <el-form-item label="回调地址">
              <el-input v-model="form.payment_callback_uri" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="首页图片" name="banners">
          <el-form :model="form" label-width="140px" style="max-width:700px;margin-top:12px">
            <el-form-item label="主 Banner (JSON)">
              <el-input v-model="form.home_banners" type="textarea" :rows="4" placeholder='[{"image":"...","link":"...","title":"..."}]' />
            </el-form-item>
            <el-form-item label="促销 Banner (JSON)">
              <el-input v-model="form.home_promo_banners" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="Flash Banner (JSON)">
              <el-input v-model="form.home_flash_banners" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="Offer Cards (JSON)">
              <el-input v-model="form.home_offer_cards" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="Newsletter 图片">
              <el-input v-model="form.home_newsletter_img" placeholder="https://..." />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <el-divider />
      <el-button type="primary" :loading="saving" @click="saveSettings">保存设置</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, put } = useApi();
const loading = ref(true);
const saving = ref(false);

const form = ref({
  site_name: "", site_description: "", footer_text: "", announcement: "",
  nodeloc_client_id: "", nodeloc_client_secret: "", nodeloc_redirect_uri: "",
  payment_enabled: false, payment_id: "", payment_secret: "", payment_callback_uri: "",
  home_banners: "", home_promo_banners: "", home_flash_banners: "",
  home_offer_cards: "", home_bestsell_cta: "", home_newsletter_img: "",
});

onMounted(async () => {
  try {
    const res = await get<{ settings: typeof form.value }>("/api/admin/settings");
    Object.assign(form.value, res.settings);
  } finally { loading.value = false; }
});

async function saveSettings() {
  saving.value = true;
  try { await put("/api/admin/settings", form.value); ElMessage.success("设置保存成功"); }
  catch { ElMessage.error("保存失败"); } finally { saving.value = false; }
}
</script>

<style scoped>
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; margin-bottom: 16px; }
</style>
