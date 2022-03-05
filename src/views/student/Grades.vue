<template>
  <v-container>
    <p class="text-h6 d-flex justify-space-between">
      Gesamtnote: {{ 2.3 }}
      <v-spacer />
      Erreichte Credits: {{ 69 }}
    </p>

    <v-container class="grades-table">
      <v-tabs v-model="activeSemesterTab">
        <v-tab
          v-for="semesterName in semesterNames"
          :key="semesterName"
        >
          Semester {{ semesterName }}
        </v-tab>
      </v-tabs>

      <v-simple-table>
        <thead>
          <tr>
            <th>
              Modul
            </th>
            <th class="text-center">
              Credits
            </th>
            <th class="text-center">
              Note
            </th>
            <th class="text-center">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="grade in semesterGrades"
            :key="grade.name"
          >
            <td class="text-left">
              {{ grade.moduleName }}
            </td>
            <td>{{ 5.0 }}</td>
            <td>{{ grade.grade }}</td>
            <td>
              <GradeDetailsPopup
                v-if="grade.details"
                :grade="grade"
              />
              <v-icon v-else>
                mdi-minus
              </v-icon>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import NoodleUser from '@/classes/NoodleUser';
import GradeDetailsPopup from '@/views/student/GradeDetailsPopup.vue';

const Auth = namespace('Auth');

const grades = [
  {
    moduleName: 'Software-Engineering',
    semester: 1,
    grade: 1.4,
    details: [
      {
        name: 'Klausur',
        weight: 0.4,
        grade: 2,
      },
      {
        name: 'Projekt',
        weight: 0.6,
        grade: 1,
      }],
  },
  {
    moduleName: 'Mathematik',
    semester: 1,
    grade: 1.0,
  },
  {
    moduleName: 'Physik',
    semester: 1,
    grade: 2.1,
  },
  {
    moduleName: 'Elektronik',
    semester: 2,
    grade: 2.4,
  },
  {
    moduleName: 'Software-Engineering',
    semester: 2,
    grade: 1.0,
  },
  {
    moduleName: 'Programmieren',
    semester: 2,
    grade: 1.5,
    details: {},
  },
  {
    moduleName: 'Software-Engineering',
    semester: 3,
    grade: 1.0,
  },
  {
    moduleName: 'Elektrotechnik',
    semester: 4,
    grade: 1.8,
    details: {},
  }, {
    moduleName: 'Software-Engineering',
    semester: 4,
    grade: 1.0,
  },
  {
    moduleName: 'Elektrotechnik',
    semester: 4,
    grade: 1.8,
    details: {},
  }, {
    moduleName: 'Software-Engineering',
    semester: 4,
    grade: 1.0,
  },
  {
    moduleName: 'Mathematik',
    semester: 5,
    grade: 1.8,
    details: {},
  },
];

@Component({
  components: { GradeDetailsPopup },
})
export default class Grades extends Vue {
  @Auth.State('user')
  private currentUser!: NoodleUser;

  private grades: Array<any> = grades;

  private activeSemesterTab: any = null;

  get semesterNames(): Array<number> {
    return [...new Set(this.grades.map((grade) => grade.semester))];
  }

  get semesterGrades(): Array<any> {
    return this.grades.filter((grade) => grade.semester === this.activeSemesterTab + 1);
  }

  // eslint-disable-next-line class-methods-use-this
  gradeDetails(grade: any): void {
    console.log(grade);
  }

  mounted(): void {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.grades-table {
  border-style: solid;
  border-radius: 10px;
  border-color: var(--v-primary-base);
}
</style>
