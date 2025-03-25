import { createApp } from 'vue'
import App from './App.vue'

// bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

// fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";

// router
import router from '../router';

// pinia
import { createPinia } from 'pinia';
const pinia = createPinia();

// pinia to localStorage
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
pinia.use(piniaPluginPersistedstate);

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');

