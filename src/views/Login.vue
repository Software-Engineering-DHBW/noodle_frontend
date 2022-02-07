<template>
  <v-container
    fluid
    style="max-width: 300px"
  >
    <v-img
      src="/noodle_black.png"
      style="margin-top: 20px; margin-bottom: 20px"
    />
    <v-form>
      <v-text-field
        v-model="user.username"
        label="Username"
        outlined
      />
      <v-text-field
        v-model="user.password"
        outlined
        label="Password"
        type="password"
      />
      <v-btn @click="handleLogin()">
        Login
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const Auth = namespace('Auth');

@Component
export default class Login extends Vue {
  private user: any = { username: '', password: '' };

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  created(): void {
    if (this.isLoggedIn) {
      this.$router.push('/');
    }
  }

  handleLogin(): void {
    if (this.user.username && this.user.password) {
      this.login(this.user).then(
        () => {
          this.$router.push('/');
        },
        (error) => {
          alert(error);
        },
      );
    }
  }
}
</script>
