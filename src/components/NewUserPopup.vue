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
            label="Passwort"
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
            v-model="newUser.address.fullName"
            hide-details
            label="Vollständiger Name"
          />
          <v-text-field
            v-model="newUser.address.street"
            hide-details
            label="Straße, Hausnummer"
          />
          <v-text-field
            v-model="newUser.address.postalCode"
            hide-details
            type="number"
            hide-spin-buttons
            label="Postleitzahl"
          />
          <v-text-field
            v-model="newUser.email"
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
import EmptyUser from '@/classes/EmptyUser';

@Component
export default class NewUserPopup extends Vue {
  private visible = false;

  private newUser = new EmptyUser();

  private roles = ['Student', 'Teacher'];

  createUser(): any {
    alert(`User ${this.newUser.username} mit der Rolle "${this.newUser.role} wird erstellt`);

    this.newUser = new EmptyUser();
    this.visible = false;
  }
}
</script>
