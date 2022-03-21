<template>
  <v-app>
    <!-- Desktop Bar -->
    <v-app-bar
      v-if="isLoggedIn"
      app
      dark
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xs"
        @click.stop="drawer = !drawer"
      />
      <v-img
        src="/noodle_white.png"
        style="max-width: 100px;"
      />
      <div
        v-if="$vuetify.breakpoint.xl"
        id="nav"
      >
        <span
          v-for="link in pageLinks"
          :key="link.name"
        >
          <router-link
            :to="link.path"
            v-text="link.name"
          />&nbsp;
        </span>
      </div>
      <v-spacer />
      <v-btn
        text
        color="primary"
        @click="handleLogout()"
        v-text="'Logout'"
      />
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.xs"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav>
        <v-list-item
          v-for="link in pageLinks"
          :key="link.name"
          :to="link.path"
          v-text="link.name"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const Auth = namespace('Auth');

@Component
export default class App extends Vue {
  @Auth.Getter
  isLoggedIn!: boolean;

  @Auth.Action
  logout!: () => void;

  drawer = false;

  pageLinks = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Module',
      path: '/modules',
    },
    {
      name: '(Modul)',
      path: '/module/3/Mathematik',
    },
    {
      name: 'Noten',
      path: '/grades',
    },
    {
      name: 'Kalender',
      path: '/calendar',
    },
    {
      name: '(Kalender-Lehrer)',
      path: '/calendar-teacher',
    },
    {
      name: '(Module-Lehrer)',
      path: '/modules-teacher',
    },
    {
      name: '(Modul-Lehrer)',
      path: '/module-teacher/1/Mathematik',
    },
    {
      name: '(Module-Admin)',
      path: '/modules-admin',
    },
    {
      name: '(Modul-Admin)',
      path: '/module-admin/1/Mathematik',
    },
    {
      name: '(User-Liste-Admin)',
      path: '/users',
    },
    {
      name: '(Kurs-Liste-Admin)',
      path: '/courses',
    },
  ];

  handleLogout(): void {
    this.logout();
    this.$router.push('/login');
  }
}
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  text-decoration: underline;
  color: var(--v-primary-base);
}

html {
  overflow-y: auto !important;
}

/* vertically center content in all columns */
.col {
  align-self: center;
}
</style>
