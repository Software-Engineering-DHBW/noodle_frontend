<template>
  <v-app>
    <v-app-bar
      v-if="isLoggedIn"
      app
      dark
    >
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
      <v-img
        src="/noodle_white.png"
        style="max-width: 100px;"
      />
    </v-app-bar>
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
  color: #f6da63;
}

html {
  overflow-y: auto !important;
}
</style>
