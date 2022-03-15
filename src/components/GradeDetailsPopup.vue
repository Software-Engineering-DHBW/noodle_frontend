<template>
  <v-container>
    <a @click="visible=true">
      <v-icon color="primary">mdi-magnify</v-icon>
    </a>

    <v-dialog
      v-model="visible"
      width="500"
    >
      <v-card>
        <v-card-title class="primary">
          Notendetails
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th>
                  Bezeichnung
                </th>
                <th class="text-center">
                  Wichtung
                </th>
                <th class="text-center">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="detail in grade.details"
                :key="detail.name"
              >
                <td>
                  {{ detail.name }}
                </td>
                <td class="text-center">
                  {{ detail.weight }}
                </td>
                <td class="text-center">
                  {{ detail.grade }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="visible = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GradeDetailsPopup extends Vue {
  @Prop({ required: true }) readonly grade: any;

  private visible = false;
}
</script>

<style scoped>

</style>
