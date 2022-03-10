<template>
  <v-container>
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
            class="pa-4"
          >
            <v-card
              v-for="module in semesterModules(semesterNumber)"
              :key="module.name"
              hover
              :to="`module/${semesterNumber}/${module.name}`"
              class="mb-4"
            >
              <v-card-title v-text="module.name" />
              <v-card-text
                class="text-left"
                v-text="module.description"
              />
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SemesterTabs from '@/components/SemesterTabs.vue';

@Component({
  components: { SemesterTabs },
})
export default class ModuleOverview extends Vue {
  private modules = [
    {
      name: 'Software-Engineering',
      semester: 1,
      description: 'Dieses Modul ist sehr sehr geil. Es ist supergeil!',
    },
    {
      name: 'Mathematik',
      semester: 1,
      description: '9 von 7 Menschen sind mit Mathe überfordert',
    },
    {
      name: 'Elektronik',
      semester: 1,
      description: 'Halbleiterbauelemente, wo den elektrischen Strom leiten',
    },
    {
      name: 'Software-Engineering 2',
      semester: 2,
      description: 'Dieses Modul ist sehr sehr geil. Es ist supergeil!',
    },
    {
      name: 'Mathematik 3',
      semester: 3,
      description: '9 von 7 Menschen sind mit Mathe überfordert',
    },
    {
      name: 'Elektronik 5',
      semester: 5,
      description: 'Halbleiterbauelemente, wo den elektrischen Strom leiten',
    },
    {
      name: 'Mathematik 5',
      semester: 5,
      description: '9 von 7 Menschen sind mit Mathe überfordert',
    },
  ];

  private activeSemesterTab: any = null;

  get semesterNumbers(): Array<number> {
    return [...new Set(this.modules.map((module) => module.semester))];
  }

  semesterModules(semester: number): Array<any> {
    return this.modules.filter((module) => module.semester === semester);
  }
}
</script>
