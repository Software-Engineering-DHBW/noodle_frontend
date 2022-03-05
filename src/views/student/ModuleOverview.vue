<template>
  <v-container>
    <v-tabs
      v-if="$vuetify.breakpoint.xl"
      v-model="activeSemesterTab"
    >
      <v-tab
        v-for="semesterName in semesterNames"
        :key="semesterName"
      >
        Semester {{ semesterName }}
      </v-tab>
    </v-tabs>

    <v-select
      v-if="$vuetify.breakpoint.xs"
      v-model="activeSemesterTab"
      :items="modules"
      item-text="semester"
      label="Semester"
      outlined
    />

    <v-container
      v-for="module in semesterModules"
      :key="module.name"
      class="module-container text-left"
    >
      <h3>{{ module.name }}</h3>
      <v-divider /><br>
      {{ module.description }}
    </v-container>
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
      name: 'Elektronik 3',
      semester: 3,
      description: 'Halbleiterbauelemente, wo den elektrischen Strom leiten',
    },
  ]

  private activeSemesterTab: any = 1;

  get semesterNames(): Array<number> {
    return [...new Set(this.modules.map((module) => module.semester))];
  }

  get semesterModules(): Array<any> {
    return this.modules.filter((module) => module.semester === this.activeSemesterTab);
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
