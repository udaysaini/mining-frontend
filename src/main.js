import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import './style.css'
import App from './App.vue'

// Import PrimeVue components
import Button from "primevue/button"
import SelectButton from 'primevue/selectbutton'
import Listbox from 'primevue/listbox';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

const app = createApp(App)

// Install Pinia and Router and then mount the app
app.use(createPinia())
app.use(router)

// Plug in PrimeVue and set the theme
app.use(PrimeVue, {
    ripple: true,
    // inputVariant: 'filled',
    theme: {
        preset: Aura,
        options: {
            // Add any theme options here
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue'
            }
        }
    }
})

// Register PrimeVue components globally
app.component("Button", Button)
app.component("SelectButton", SelectButton)
app.component("Listbox", Listbox)
app.component("InputGroup", InputGroup)
app.component("InputGroupAddon", InputGroupAddon)
app.component("InputText", InputText)
app.component("InputNumber", InputNumber)
// Mount the app
app.mount('#app')
