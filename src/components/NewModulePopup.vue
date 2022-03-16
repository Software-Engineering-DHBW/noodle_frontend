<template>
  <div>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="visible=true"
      v-text="'Neues Modul erstellen'"
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
          Neues Modul
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="module.title"
            label="Titel"
          />
          <v-text-field
            v-model="module.description"
            label="Beschreibung"
          />
          <v-select
            v-model="module.course"
            label="Kurs"
            :items="courses"
          />
          <v-select
            v-model="module.teacher"
            label="Lehrender"
            :items="teacher"
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
            @click="createModule"
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
export default class NewModulePopup extends Vue {
  private visible = false;

  private courses = ['IT1', 'IT2', 'CS1'];

  private teacher = ['Herr Rainer Sauerstoff', 'Herr Ernst Haft', 'Herr Sergej Färhlich', 'Frau Anna Nass', 'Frau Ute Russ'];

  private module = {
    title: null,
    description: null,
    course: null,
    teacher: null,
  };

  createModule(): any {
    alert(`Modul ${this.module.title} mit Lehrer ${this.module.teacher} für Kurs ${this.module.course} wird erstellt`);

    this.module.title = null;
    this.module.description = null;
    this.module.course = null;
    this.module.teacher = null;

    this.visible = false;
  }
}
</script>
