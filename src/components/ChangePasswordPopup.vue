<template>
  <div>
    <v-btn
      icon
      @click="visible=true"
    >
      <v-icon>mdi-lock-reset</v-icon>
    </v-btn>

    <v-dialog
      v-model="visible"
      width="500"
    >
      <v-card>
        <v-card-title class="primary">
          Passwort ändern
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="data.password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hide-details
            label="Neues Passwort"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="visible = false"
            v-text="'Abbrechen'"
          />
          <v-btn
            text
            color="primary"
            :loading="loading"
            @click="changePassword"
            v-text="'Ändern'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const UserStore = namespace('Users');
const Auth = namespace('Auth');

@Component
export default class ChangePasswordPopup extends Vue {
  @Prop({ required: true }) username!: string;

  visible = false;

  loading = false;

  showPassword = false;

  data = {
    username: this.username,
    password: '',
  };

  @Auth.Getter
  isAdmin!: boolean;

  @Auth.Action
  logout!: () => void;

  @UserStore.Action
  changeUserPassword!: (data: { username: string, password: string }) => Promise<void>;

  changePassword(): void {
    this.loading = true;
    this.changeUserPassword(this.data)
      .then(() => {
        if (!this.isAdmin) {
          this.logout();
          this.$router.push('/login');
        }
      })
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
        this.visible = false;
      });
  }
}
</script>
