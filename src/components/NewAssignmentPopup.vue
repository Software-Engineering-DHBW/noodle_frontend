<template>
  <v-container>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="visible=true"
      v-text="'Neue Abgabe erstellen'"
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
          Neue Abgabe
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="title"
            label="Titel"
          />
          <DateField v-model="date" />
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
            @click="createAssignment"
            v-text="'Erstellen'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DateField from '@/components/DateField.vue';

@Component({
  components: { DateField },
})
export default class NewAssignmentPopup extends Vue {
  private visible = false;

  private date = null;

  private title = '';

  createAssignment(): any {
    alert(`Abgabe ${this.title} mit Abgabedatum ${this.date} wird erstellt`);

    this.title = '';
    this.date = null;
    this.visible = false;
  }
}
</script>

<style scoped>

</style>
