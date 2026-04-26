import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
// Load MarketPro CSS LAST so its rules win the cascade against Tailwind's preflight.
import './assets/marketpro/app.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
