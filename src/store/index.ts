import Vue from 'vue';
import Vuex from 'vuex';
import { VuexPersistence } from 'vuex-persist';

import Users from '@/store/modules/Users';
import Auth from '@/store/modules/Auth';
import AlertStore from '@/store/modules/AlertStore';
import Courses from '@/store/modules/Courses';
import Modules from '@/store/modules/Modules';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Users,
    AlertStore,
    Courses,
    Modules,
  },
  plugins: [vuexLocal.plugin],
});
