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
  .use(PrimeVue, {
    theme: {
      preset: definePreset(
        Aura, {
          semantic: {
              primary: {
                  50: '{violet.50}',
                  100: '{violet.100}',
                  200: '{violet.200}',
                  300: '{violet.300}',
                  400: '{violet.400}',
                  500: '{violet.500}',
                  600: '{violet.600}',
                  700: '{violet.700}',
                  800: '{violet.800}',
                  900: '{violet.900}',
                  950: '{violet.950}'
              },
              focusRing: {
                width: '2px',
                style: 'dashed',
                color: '{primary.color}',
                offset: '1px'
            }
          },
          pt: {
            InputText: {
              root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2',
            }
          }
        },
      )
    }
  })
  .component('Toast', Toast)
  .use(ToastService)
  .mount('#app')
