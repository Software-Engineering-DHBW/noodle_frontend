import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store/index';
import Role from '@/classes/Role';
import jwtDecode from 'jwt-decode';
import AuthService from '@/services/AuthService';
import CurrentUser from '@/classes/CurrentUser';

Vue.use(VueRouter);

const currentUser: () => CurrentUser = () => store.getters['Auth/currentUser'];

const isStudent = () => store.getters['Auth/isStudent'];
const isTeacher = () => store.getters['Auth/isTeacher'];
const isAdmin = () => store.getters['Auth/isAdmin'];

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: { authorize: [] },
    component: () => import('../views/student/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/modules',
    name: 'Modules',
    meta: { authorize: [] },
    component: () => {
      if (isStudent()) {
        return import('../views/student/ModuleOverview.vue');
      }
      if (isTeacher()) {
        return import('../views/teacher/ModuleOverview.vue');
      }
      return import('../views/admin/ModuleOverview.vue');
    },
  },
  {
    path: '/module/:semester/:moduleName',
    name: 'Module',
    meta: { authorize: [] },
    component: () => {
      if (isStudent()) {
        return import('../views/student/Module.vue');
      }
      return import('../views/teacher/Module.vue');
    },
  },
  {
    path: '/grades',
    name: 'Grades',
    meta: { authorize: [Role.STUDENT] },
    component: () => import('../views/student/Grades.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    meta: { authorize: [Role.STUDENT, Role.TEACHER] },
    component: () => {
      if (isStudent()) {
        return import('../views/student/Calendar.vue');
      }
      return import('../views/teacher/Calendar.vue');
    },
  },
  {
    path: '/users',
    name: 'UserList-Admin',
    meta: { authorize: [Role.ADMIN] },
    component: () => import('../views/admin/Users.vue'),
  },
  {
    path: '/courses',
    name: 'CourseList-Admin',
    meta: { authorize: [Role.ADMIN] },
    component: () => import('../views/admin/Courses.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/PageNotFound.vue'),
  },
];

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
