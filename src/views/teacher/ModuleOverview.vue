<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedSemester"
          hide-details
          label="Semester"
          outlined
          :items="semester"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ModuleList :modules="semesterModules(selectedSemester)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SemesterTabs from '@/components/SemesterTabs.vue';
import ModuleList from '@/components/ModuleList.vue';

@Component({
  components: {
    ModuleList,
    SemesterTabs,
  },
})
export default class ModuleOverview extends Vue {
  private modules = [
    {
      name: 'Software-Engineering I',
      semester: 'Wi2020',
      course: 'IT1',
      description: 'Dieses Modul ist sehr sehr geil. Es ist supergeil!',
    },
    {
      name: 'Software-Engineering II',
      semester: 'Wi2020',
      course: 'IT2',
      description: 'Dieses Modul ist sehr sehr geil. Es ist supergeil!',
    },
    {
      name: 'Mathematik',
      semester: 'Wi2020',
      course: 'IT2',
      description: '9 von 7 Menschen sind mit Mathe überfordert',
    },
    {
      name: 'Mathematik',
      semester: 'So2021',
      course: 'IT1',
      description: '9 von 7 Menschen sind mit Mathe überfordert',
    },
    {
      name: 'Mathematik',
      semester: 'So2021',
      course: 'IT2',
      description: '9 von 7 Menschen sind mit Mathe überfordert',
    },
    {
      name: 'Mathematik',
      semester: 'So2021',
      course: 'IT2',
      description: '9 von 7 Menschen sind mit Mathe überfordert',
    },
    {
      name: 'Software-Engineering I',
      semester: 'Wi2021',
      course: 'CS1',
      description: 'Dieses Modul ist sehr sehr geil. Es ist supergeil!',
    },
    {
      name: 'Software-Engineering I',
      semester: 'Wi2021',
      course: 'CS2',
      description: 'Dieses Modul ist sehr sehr geil. Es ist supergeil!',
    },
  ];

  private selectedSemester = this.semester[0];

  get semester(): Array<any> {
    return [...new Set(this.modules.map((module) => module.semester))];
  }

  semesterModules(semester: string): Array<any> {
    return this.modules
      .filter((module) => module.semester === semester)
      .map((module) => ({
        name: `${module.name} in Kurs ${module.course}`,
        description: module.description,
      }));
  }
}
</script>
