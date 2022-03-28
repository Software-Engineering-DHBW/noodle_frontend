<template>
  <div>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="visible=true"
      v-text="'Neuen Nutzer erstellen'"
    />

    <v-btn
      v-if="$vuetify.breakpoint.xs"
      fab
      small
      color="primary"
      elevation="2"
      @click="visible=true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog
      v-model="visible"
      width="500"
    >
      <v-card>
        <v-card-title class="primary">
          Neuer Nutzer
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newUser.username"
            hide-details
            label="Nutzername"
          />
          <v-text-field
            v-model="newUser.password"
            hide-details
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Passwort"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="newUser.matriculationNumber"
            hide-details
            type="number"
            hide-spin-buttons
            label="Matrikelnummer"
          />
          <v-select
            v-model="newUser.role"
            label="Rolle"
            :items="roles"
          />
          <v-text-field
            v-model="newUser.fullname"
            hide-details
            label="Vollständiger Name"
          />
          <v-text-field
            v-model="newUser.address"
            hide-details
            label="Adresse"
          />
          <v-text-field
            v-model="newUser.mail"
            hide-details
            type="email"
            label="E-Mail"
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
            @click="createUser"
            v-text="'Erstellen'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewNoodleUser from '@/classes/NewNoodleUser';
import Role from '@/classes/Role';
import { namespace } from 'vuex-class';

const UserStore = namespace('Users');

@Component
export default class NewUserPopup extends Vue {
  visible = false;

  newUser = new NewNoodleUser();

  roles = [Role.STUDENT, Role.TEACHER];

  showPassword = false;

  loading = false;

  @UserStore.Action
  registerUser!: (user: NewNoodleUser) => Promise<void>;

  createUser(): void {
    // TODO: form validation to check at least if every field is filled
    this.loading = true;
    this.registerUser(this.newUser)
      .then(() => {
        this.newUser = new NewNoodleUser();
        this.visible = false;
      })
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
