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
            v-model="newUser.name"
            label="Name"
          />
          <v-text-field
            v-model="newUser.password"
            label="Passwort"
          />
          <v-select
            v-model="newUser.role"
            label="Rolle"
            :items="roles"
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

@Component
export default class NewUserPopup extends Vue {
  private visible = false;

  private newUser = {
    name: null,
    password: null,
    role: null,
  };

  private roles = ['Student', 'Teacher'];

  createUser(): any {
    alert(`User ${this.newUser.name} mit der Rolle "${this.newUser.role} wird erstellt`);

    this.newUser.name = null;
    this.newUser.password = null;
    this.newUser.role = null;

    this.visible = false;
  }
}
</script>
