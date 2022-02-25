import Vue from 'vue';
import Vuex from 'vuex';
import { VuexPersistence } from 'vuex-persist';

import Auth from './modules/auth';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
  },
  plugins: [vuexLocal.plugin],
});
