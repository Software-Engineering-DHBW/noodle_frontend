<template>
  <v-container>
    <v-tabs
      v-model="activeSemesterTab"
      center-active
      show-arrows
    >
      <v-tab
        v-for="semesterNumber in semesterNumbers"
        :key="semesterNumber"
      >
        Semester {{ semesterNumber }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeSemesterTab">
      <v-tab-item
        v-for="semesterNumber in semesterNumbers"
        :key="semesterNumber"
      >
        <v-container
          v-for="module in semesterModules(semesterNumber)"
          :key="module.name"
          class="module-container text-left"
          @click="moduleClicked(module.name)"
        >
          <h3>{{ module.name }}</h3>
          <v-divider />
          <br>
          {{ module.description }}
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
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

  moduleClicked(module: string): void {
    this.$router.push(`/module/${module}`);
  }
}
</script>

<style scoped>
.module-container {
  border-style: solid;
  border-radius: 10px;
  border-color: var(--v-primary-base);
  margin-top: 10px;
}
</style>
