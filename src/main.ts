import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { plugin, defaultConfig } from '@formkit/vue'
import Aura from '@/presets/aura'
import './assets/base.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  unstyled: true,
  pt: Aura
})
app.use(router)
app.use(plugin, defaultConfig)

app.mount('#app')
