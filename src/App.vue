<template>
  <v-app>
    <div class="alert-overlay">
      <v-alert
        v-for="(alert, index) in alerts"
        :key="index"
        :type="alert.type"
      >
        {{ alert.message }}
      </v-alert>
    </div>

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
            v-text="link.meta.navbarName"
          />&nbsp;
        </span>
      </div>
      <v-spacer />
      <v-tooltip bottom>
        Passwort ändern
        <template v-slot:activator="{ on }">
          <div
            class="d-inline-flex"
            v-on="on"
          >
            <ChangePasswordPopup :username="currentUser.username" />
          </div>
        </template>
      </v-tooltip>
      <v-btn
        text
        color="primary"
        @click="handleLogout()"
        v-text="'Logout'"
      />
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-if="isLoggedIn && $vuetify.breakpoint.xs"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav>
        <v-list-item
          v-for="link in pageLinksForRole"
          :key="link.name"
          :to="link.path"
          v-text="link.meta.navbarName"
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
import { Alert } from '@/classes/Alert';
import ChangePasswordPopup from '@/components/ChangePasswordPopup.vue';

const Auth = namespace('Auth');
const AlertStore = namespace('AlertStore');
@Component({
  components: { ChangePasswordPopup },
})
export default class App extends Vue {
  @AlertStore.State
  alerts!: Array<Alert>;

  alertsLength = true;

  @AlertStore.Action
  resetAlerts!: () => void;

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

  mounted(): void {
    this.resetAlerts();
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

/* overlay that shows all alerts */
.alert-overlay {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
