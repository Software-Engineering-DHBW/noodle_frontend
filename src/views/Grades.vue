<template>
  <v-container>
    <template>
      <v-tabs v-model="semesterTab">
        <v-tab
          v-for="semesterName in semesterNames"
          :key="semesterName"
        >
          Semester {{ semesterName }}
        </v-tab>
      </v-tabs>
    </template>
    <v-simple-table>
      <template v-slot:default>
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
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="evalutation in semesterEvaluations"
            :key="evalutation.name"
          >
            <td class="text-left">
              {{ evalutation.moduleName }}
            </td>
            <td>{{ 5.0 }}</td>
            <td>{{ evalutation.grade }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const Auth = namespace('Auth');

const evaluations = [
  {
    moduleName: 'Software-Engineering',
    semester: 1,
    grade: 1.4,
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
  },
  {
    moduleName: 'Software-Engineering',
    semester: 3,
    grade: 1.0,
  },
  {
    moduleName: 'Elektrotechnik',
    semester: 3,
    grade: 1.8,
  },
];

@Component
export default class Grades extends Vue {
  @Auth.State('user')
  private currentUser!: any;

  private evaluations: Array<any> = evaluations;

  private semesterTab: any = null

  get semesterNames(): Array<number> {
    return [...new Set(this.evaluations.map((evaluation) => evaluation.semester))];
  }

  get semesterEvaluations(): Array<any> {
    return this.evaluations.filter((evaluation) => evaluation.semester === this.semesterTab + 1);
  }

  mounted(): void {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>
