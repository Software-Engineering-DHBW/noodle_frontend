import Vue from 'vue';
import AuthService from '@/services/AuthService';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
axios.defaults.baseURL = '/';
axios.defaults.headers.common.Authorization = `Bearer ${AuthService.getToken()}`;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
