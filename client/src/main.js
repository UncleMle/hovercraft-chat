import { createApp } from 'vue';
import App from './App.vue';

import store from './store/store';
import router from './router/router';

import './assets/css/globalstyles.css';

createApp(App).use(store).use(router).mount('#app');

global.storeSys = store;
global.gui = {notify: null};

