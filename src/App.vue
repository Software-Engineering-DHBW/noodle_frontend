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
          v-for="link in pageLinksForRole"
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
          v-for="link in pageLinksForRole"
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
import CurrentUser from '@/classes/CurrentUser';
import routes from '@/router/Routes';
import { RouteConfig } from 'vue-router';

const Auth = namespace('Auth');

@Component
export default class App extends Vue {
  @Auth.Getter
  currentUser!: CurrentUser;

  @Auth.Getter
  isLoggedIn!: boolean;

  @Auth.Action
  logout!: () => void;

  drawer = false;

  get pageLinksForRole(): Array<RouteConfig> {
    return routes
      .filter((route) => route.meta?.visibleInNavbar && this.authorizedToVisitRoute(route));
  }

  authorizedToVisitRoute(route: RouteConfig): boolean {
    if (!route.meta?.authorize || route.meta?.authorize.length === 0) return true;
    return route.meta?.authorize.includes(this.currentUser.role);
  }

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
