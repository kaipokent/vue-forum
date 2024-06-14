import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { plugin, defaultConfig } from '@formkit/vue'
import config from './formkit.config.ts'
import Aura from 'primevue/themes/aura'
import AppDate from '@/components/AppDate.vue'
import './assets/base.css'
import 'primeicons/primeicons.css'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import router from './router'
import { firebaseApp } from '@/firebaseConfig.ts'

const app = createApp(App)

app.component('AppDate', AppDate)

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
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.mount('#app')
