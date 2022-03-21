<template>
  <v-container
    fluid
    style="max-width: 300px"
  >
    <v-img
      src="/noodle_black.png"
      style="margin-top: 20px; margin-bottom: 20px"
    />
    <v-form
      ref="loginForm"
      class="text-center"
    >
      <v-text-field
        v-model="user.username"
        label="Username"
        outlined
        :rules="textFieldRules"
        @keydown.enter="handleLogin"
      />
      <v-text-field
        v-model="user.password"
        label="Password"
        type="password"
        autocomplete="on"
        outlined
        :rules="textFieldRules"
        @keydown.enter="handleLogin"
      />
      <v-btn
        class="primary"
        :disabled="!valid"
        :loading="isLoading"
        @click="handleLogin()"
      >
        Login
      </v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { LoginData } from '@/classes/LoginData';

const Auth = namespace('Auth');

@Component
export default class Login extends Vue {
  @Auth.State
  isLoading!: boolean

  user: any = {
    username: '',
    password: '',
  };

  get valid(): boolean {
    return this.user.username && this.user.password;
  }

  textFieldRules = [(value: any) => !!value || 'Feld darf nicht leer sein'];

  @Auth.Getter
  isLoggedIn!: boolean;

  @Auth.Action
  login!: (loginData: LoginData) => void;

  created(): void {
    if (this.isLoggedIn) {
      this.$router.push('/');
    }
  }

  handleLogin(): void {
    // validation of name and passwort field
    const form: any = this.$refs.loginForm;
    form.validate();

    if (this.user.username && this.user.password) {
      this.login(this.user);
    }
  }
}
</script>
