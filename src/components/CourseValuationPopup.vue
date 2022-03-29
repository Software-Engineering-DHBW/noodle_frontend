<template>
  <v-container>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="openPopup"
      v-text="'Teilnehmer bewerten'"
    />

    <v-btn
      v-if="$vuetify.breakpoint.xs"
      fab
      small
      color="primary"
      elevation="2"
      @click="openPopup"
    >
      <v-icon>mdi-account-check</v-icon>
    </v-btn>

    <v-dialog
      v-model="visible"
      width="500"
    >
      <LoadingOverlay :loading="loadingStudents" />

      <v-card>
        <v-card-title class="primary">
          {{ `Kurs ${module.assignedCourse.name} bewerten` }}
        </v-card-title>

        <v-simple-table
          fixed-header
          height="400"
        >
          <thead>
            <tr>
              <th>
                Teilnehmer
              </th>
              <th class="text-center">
                Note
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(student, studentIndex) in studentsInCourse"
              :key="studentIndex"
            >
              <td>
                {{ `${student.id} - ${student.name}` }}
              </td>
              <td class="text-center">
                <v-text-field
                  v-model="grades[studentIndex]"
                  hide-details
                  hide-spin-buttons
                  placeholder="Note"
                  type="number"
                />
              </td>
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
import { namespace } from 'vuex-class';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import { NoodleModule } from '@/classes/NoodleModule';

const CourseStore = namespace('Courses');

@Component({
  components: { LoadingOverlay },
})
export default class CourseValuationPopup extends Vue {
  @Prop({ required: true }) readonly module!: NoodleModule;

  visible = false;

  loadingStudents = false;

  @CourseStore.State
  studentsInCourse!: Array<{ id: number, name: string }>;

  @CourseStore.Action
  loadStudentsInCourse!: (courseId: number) => Promise<void>;

  @CourseStore.Action
  valuateStudents!: (data: {
    students: any,
    grades: any,
    moduleId: number,
  }) => Promise<void>;

  grades = [];

  saveValuations(): void {
    this.valuateStudents({
      students: this.studentsInCourse,
      grades: this.grades,
      moduleId: this.module.id,
    });

    this.visible = false;
  }

  openPopup(): void {
    this.visible = true;

    this.loadingStudents = true;
    this.loadStudentsInCourse(this.module.assignedCourse ? this.module.assignedCourse.id : 0)
      .catch(() => undefined)
      .finally(() => {
        this.loadingStudents = false;
      });
  }
}
</script>
