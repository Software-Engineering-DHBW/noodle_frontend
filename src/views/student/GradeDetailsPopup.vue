<template>
  <div class="text-center">
    <v-dialog
      v-model="visible"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <a
          v-bind="attrs"
          v-on="on"
        >
          Einzelnoten
        </a>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Notendetails
        </v-card-title>

        <v-card-text>
          {{ "Hier werden die Noten von " + grade.moduleName + " stehen" }}
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="visible = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private visible = false;

  @Prop({ required: true }) readonly grade: any;
}
</script>

<style scoped>

</style>
