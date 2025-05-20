import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import './style.css'
import App from './App.vue'

const app = createApp(App)

// Install Pinia and Router and then mount the app
app.use(createPinia())
app.use(router)
app.mount('#app')