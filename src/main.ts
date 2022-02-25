import Vue from 'vue';
import VueMq from 'vue-mq';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: 700,
    desktop: Infinity,
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
