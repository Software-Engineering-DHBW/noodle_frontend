import { RouteConfig } from 'vue-router';
import Role from '@/classes/Role';

const routesForAdmin: Array<RouteConfig> = [
  {
    path: '/admin/modules',
    name: 'Module Admin',
    meta: {
      authorize: [Role.ADMIN],
      visibleInNavbar: true,
      navbarName: 'Module',
    },
    component: () => import('../views/admin/ModuleOverview.vue'),
  },
  {
    path: '/admin/module/:moduleId',
    name: 'Modul Admin',
    meta: { authorize: [Role.ADMIN] },
    component: () => import('../views/teacher/Module.vue'),
  },
  {
    path: '/admin/users',
    name: 'Nuzter Admin',
    meta: {
      authorize: [Role.ADMIN],
      visibleInNavbar: true,
      navbarName: 'Nutzer',
    },
    component: () => import('../views/admin/Users.vue'),
  },
  {
    path: '/admin/courses',
    name: 'Kurse Admin',
    meta: {
      authorize: [Role.ADMIN],
      visibleInNavbar: true,
      navbarName: 'Kurse',
    },
    component: () => import('../views/admin/Courses.vue'),
  },
];

const routesForTeacher: Array<RouteConfig> = [
  {
    path: '/teacher/modules',
    name: 'Module Teacher',
    meta: {
      authorize: [Role.TEACHER],
      visibleInNavbar: true,
      navbarName: 'Module',
    },
    component: () => import('../views/teacher/ModuleOverview.vue'),
  },
  {
    path: '/teacher/module/:moduleId',
    name: 'Modul Teacher',
    meta: { authorize: [Role.TEACHER] },
    component: () => import('../views/teacher/Module.vue'),
  },
  {
    path: '/teacher/calendar',
    name: 'Kalender Teacher',
    meta: {
      authorize: [Role.TEACHER],
      visibleInNavbar: true,
      navbarName: 'Kalender',
    },
    component: () => import('../views/teacher/Calendar.vue'),
  },
];

const routesForStudent: Array<RouteConfig> = [
  {
    path: '/student/modules',
    name: 'Module Student',
    meta: {
      authorize: [Role.STUDENT],
      visibleInNavbar: true,
      navbarName: 'Module',
    },
    component: () => import('../views/student/ModuleOverview.vue'),
  },
  {
    path: '/student/module/:moduleId',
    name: 'Modul Student',
    meta: { authorize: [Role.STUDENT] },
    component: () => import('../views/student/Module.vue'),
  },
  {
    path: '/student/calendar',
    name: 'Kalender Student',
    meta: {
      authorize: [Role.STUDENT],
      visibleInNavbar: true,
      navbarName: 'Kalender',
    },
    component: () => import('../views/student/Calendar.vue'),
  },
  {
    path: '/student/grades',
    name: 'Noten Student',
    meta: {
      authorize: [Role.STUDENT],
      visibleInNavbar: true,
      navbarName: 'Noten',
    },
    component: () => import('../views/student/Grades.vue'),
  },
];

const routesForEeachRole: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      authorize: [],
      visibleInNavbar: true,
      navbarName: 'Home',
    },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/PageNotFound.vue'),
  },
];

const routes: Array<RouteConfig> = [
  ...routesForEeachRole,
  ...routesForAdmin,
  ...routesForTeacher,
  ...routesForStudent,
];

export default routes;
