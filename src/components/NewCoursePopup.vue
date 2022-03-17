<template>
  <div>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="visible=true"
      v-text="'Neuen Kurs erstellen'"
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
          Neuer Kurs
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newCourse.name"
            label="Name"
          />
          <v-autocomplete
            v-model="newCourse.students"
            :items="students"
            label="Studenten"
            small-chips
            multiple
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

  private newCourse = {
    name: null,
    students: null,
  };

  private students = ['Max', 'Moritz', 'Rainer', 'Gert', 'Hans', 'Lieselotte', 'Sven', 'Günther', 'Kevin', 'Yannic']

  createUser(): any {
    alert(`Kurs ${this.newCourse.name} mit den Studenten ${this.newCourse.students} wird erstellt`);

    this.newCourse.name = null;
    this.newCourse.students = null;

    this.visible = false;
  }
}
</script>
