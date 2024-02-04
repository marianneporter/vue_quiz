import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

library.add(faBackward, faForward);

import { createApp } from 'vue'

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

const pinia = createPinia()

pinia.use(piniaPluginPersistedState)

app.use(pinia)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
