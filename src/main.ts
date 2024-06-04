import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { plugin, defaultConfig } from '@formkit/vue'
import config from './formkit.config.ts'
import Aura from 'primevue/themes/aura'
import './assets/base.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark'
    }
  }
})
app.use(router)
app.use(plugin, defaultConfig(config))

app.mount('#app')
