import Vue from 'vue';
import Vuex from 'vuex';
import { VuexPersistence } from 'vuex-persist';

import Users from '@/store/modules/Users';
import Auth from '@/store/modules/Auth';
import AlertStore from '@/store/modules/AlertStore';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth, Users, AlertStore,
  },
  plugins: [vuexLocal.plugin],
});
