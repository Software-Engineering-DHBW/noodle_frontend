<template>
  <v-app>
    <!-- Desktop Bar -->
    <v-app-bar
      v-if="isLoggedIn && $mq==='desktop'"
      app
      dark
    >
      <v-img
        src="/noodle_white.png"
        style="max-width: 100px;"
      />
      <div
        id="nav"
      >
        <router-link to="/">
          Home
        </router-link> |
        <router-link to="/grades">
          Grades
        </router-link> |
        <router-link to="/calendar">
          Calendar
        </router-link>
      </div>
      <v-spacer />
      <v-btn
        text
        color="#f6da63"
        @click="handleLogout()"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Mobile Bar -->
    <v-app-bar
      v-if="isLoggedIn && $mq==='mobile'"
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-img
        src="/noodle_white.png"
        style="max-width: 100px;"
      />
      <v-spacer />
      <v-btn
        text
        color="#f6da63"
        @click="handleLogout()"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <router-link to="/">
              Home
            </router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/grades">
              Grades
            </router-link>
          </v-list-item>

          <v-list-item>
            <router-link to="/calendar">
              Calendar
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
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

  @Auth.Mutation
  logout!: any;

  drawer = false;

  handleLogout(): void {
    this.logout();
    this.$router.push('/login');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: var(--v-primary-base);
}

html {
  overflow-y: auto !important;
}
</style>
