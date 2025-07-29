import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import router from '../router/router'
import './../src/style.css'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import axiosConfig from '../services/axios.ts'

const app = createApp(App);

app.provide('axios', axiosConfig)

app
  .use(router)
  app.use(PrimeVue, {
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
