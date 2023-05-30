import './assets/css/line-awesome.min.css'
import './assets/css/main.css'
import './assets/css/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.directive('ripple', Ripple)

app.mount('#app')
