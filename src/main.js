import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import router from '../router/router'
import './../src/style.css'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import axiosConfig from '../services/axios.ts'
import ptBr from './locales/primevue-pt-br.ts'

const app = createApp(App);

app.provide('axios', axiosConfig)

app
  .use(router)
  app.use(PrimeVue, {
    locale: ptBr['pt-br'],
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'none',
            cssLayer: false
        },
    }
 })
  app.component('Toast', Toast)
  .use(ToastService)
  .mount('#app')
