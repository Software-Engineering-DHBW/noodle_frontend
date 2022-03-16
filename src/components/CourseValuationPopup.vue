<template>
  <v-container>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="visible=true"
      v-text="'Teilnehmer bewerten'"
    />

    <v-btn
      v-if="$vuetify.breakpoint.xs"
      fab
      small
      color="primary"
      elevation="2"
      @click="visible=true"
    >
      <v-icon>mdi-account-check</v-icon>
    </v-btn>

    <v-dialog v-model="visible">
      <v-card>
        <v-card-title class="primary">
          {{ `Kurs ${course} bewerten` }}
        </v-card-title>

        <v-simple-table
          fixed-header
          height="500"
        >
          <thead>
            <tr>
              <th>
                Teilnehmer
              </th>
              <th
                v-for="(weight, index) in gradeWeights"
                :key="index"
                class="text-center"
              >
                <v-text-field
                  v-model="gradeWeights[index]"
                  :label="`Note ${index + 1}`"
                  hide-details
                  hide-spin-buttons
                  type="number"
                  append-icon="mdi-percent"
                />
              </th>
              <th>
                <v-row justify="center">
                  <v-btn
                    icon
                    x-small
                    @click="gradeWeights.push(100)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-row>
                <v-row justify="center">
                  <v-btn
                    icon
                    x-small
                    @click="gradeWeights.pop()"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-row>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(student, studentIndex) in students"
              :key="studentIndex"
            >
              <td>
                {{ student.id }}
              </td>
              <td
                v-for="(weight, weightIndex) in gradeWeights"
                :key="weightIndex"
                class="text-center"
              >
                <v-text-field
                  v-model="students[studentIndex].grades[weightIndex]"
                  hide-details
                  hide-spin-buttons
                  placeholder="Note"
                  type="number"
                />
              </td>
              <td />
            </tr>
          </tbody>
        </v-simple-table>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="visible = false"
            v-text="'Abbrechen'"
          />

          <v-btn
            color="primary"
            text
            @click="saveValuations"
            v-text="'Speichern'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CourseValuationPopup extends Vue {
  @Prop({ required: true }) readonly course: any;

  private students = [
    {
      id: 1,
      grades: [],
    },
    {
      id: 2,
      grades: [],
    },
    {
      id: 3,
      grades: [],
    },
    {
      id: 4,
      grades: [],
    },
    {
      id: 5,
      grades: [],
    },
    {
      id: 6,
      grades: [],
    },
    {
      id: 7,
      grades: [],
    },
    {
      id: 8,
      grades: [],
    },
    {
      id: 9,
      grades: [],
    },
    {
      id: 10,
      grades: [],
    },
    {
      id: 11,
      grades: [],
    },
    {
      id: 12,
      grades: [],
    },
    {
      id: 13,
      grades: [],
    },
    {
      id: 14,
      grades: [],
    },
    {
      id: 15,
      grades: [],
    },
    {
      id: 16,
      grades: [],
    },
    {
      id: 17,
      grades: [],
    },
    {
      id: 18,
      grades: [],
    },
    {
      id: 19,
      grades: [],
    },
    {
      id: 20,
      grades: [],
    },
    {
      id: 21,
      grades: [],
    },
    {
      id: 22,
      grades: [],
    },
    {
      id: 23,
      grades: [],
    },
    {
      id: 24,
      grades: [],
    },
    {
      id: 25,
      grades: [],
    },
    {
      id: 26,
      grades: [],
    },
  ];

  gradeWeights = [100, 100];

  private visible = false;

  saveValuations(): void {
    alert('Kursbewertung abgegeben');
    this.visible = false;
  }
}
</script>
