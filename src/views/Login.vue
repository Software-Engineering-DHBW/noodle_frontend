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
      v-model="valid"
      lazy-validation
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

const Auth = namespace('Auth');

@Component
export default class Login extends Vue {
  private user: any = {
    username: '',
    password: '',
  };

  private valid = true

  private textFieldRules = [(v: any) => !!v || 'Field is required']

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
    // validation of name and passwort field
    const form: any = this.$refs.loginForm;
    form.validate();

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
