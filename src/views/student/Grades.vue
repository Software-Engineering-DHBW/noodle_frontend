<template>
  <v-container>
    <v-row class="text-center text-h6">
      <v-col v-text="`Gesamtnote: ${ 2.3 }`" />
      <v-spacer />
      <v-col v-text="`Erreichte Credits: ${ 69 }`" />
    </v-row>

    <v-row>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <SemesterTabs
          v-model="activeSemesterTab"
          :semester-numbers="semesterNumbers"
        />

        <v-tabs-items v-model="activeSemesterTab">
          <v-tab-item
            v-for="semesterNumber in semesterNumbers"
            :key="semesterNumber"
          >
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
                  v-for="grade in gradesForSemester(semesterNumber)"
                  :key="grade.name"
                >
                  <td class="text-break">
                    <router-link
                      :to="`module/${semesterNumber}/${grade.moduleName}`"
                      v-text="grade.moduleName"
                    />
                  </td>
                  <td
                    class="text-center"
                    v-text="'5'"
                  />
                  <td
                    class="text-center"
                    v-text="grade.grade"
                  />
                  <td class="text-center">
                    <GradeDetailsPopup
                      v-if="grade.details"
                      :grade="grade"
                      class="pa-0"
                    />
                    <v-icon v-else>
                      mdi-minus
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CurrentUser from '@/classes/CurrentUser';
import GradeDetailsPopup from '@/components/GradeDetailsPopup.vue';
import SemesterTabs from '@/components/SemesterTabs.vue';

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
  components: {
    SemesterTabs,
    GradeDetailsPopup,
  },
})
export default class Grades extends Vue {
  @Auth.State
  private currentUser!: CurrentUser;

  private grades: Array<any> = grades;

  private activeSemesterTab = 0;

  get semesterNumbers(): Array<number> {
    return [...new Set(this.grades.map((grade) => grade.semester))];
  }

  gradesForSemester(semesterNumber: number): Array<any> {
    return this.grades.filter((grade) => grade.semester === semesterNumber);
  }

  mounted(): void {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* remove paddings in table to improve responsiveness */
td:not(:first-child) {
  padding-left: 4px !important;
  padding-right: 4px !important;
}

th:not(:first-child) {
  padding-left: 4px !important;
  padding-right: 4px !important;
}

/* remove formatting of router link */
a {
  text-decoration: inherit;
  color: inherit;
}
</style>
