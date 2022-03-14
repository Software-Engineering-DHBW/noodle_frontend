import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/student/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    component: () => import('../views/student/ModuleOverview.vue'),
  },
  {
    path: '/module/:semester/:modulName',
    name: 'Module',
    component: () => import('../views/student/Module.vue'),
  },
  {
    path: '/grades',
    name: 'Grades',
    component: () => import('../views/student/Grades.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/student/Calendar.vue'),
  },
  {
    path: '/calendar-teacher',
    name: 'Calendar-Teacher',
    component: () => import('../views/teacher/Calendar.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
