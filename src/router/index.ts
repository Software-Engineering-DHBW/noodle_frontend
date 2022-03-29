import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import CurrentUser from '@/classes/CurrentUser';
import routes from '@/router/Routes';

Vue.use(VueRouter);

const currentUser: () => CurrentUser = () => store.getters['Auth/currentUser'];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { authorize } = to.meta;

  if (authorize) {
    if (!currentUser()) {
      return next('/login');
    }

    // redirect to homepage if role is not authorised
    if (authorize.length && !authorize.includes(currentUser().role)) {
      return next('/');
    }
  }
  return next();
});

export default router;
