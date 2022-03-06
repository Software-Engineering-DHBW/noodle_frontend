<template>
  <v-container class="text-left">
    <h2 v-text="`${modulName} im ${semester}. Semester`" />
    <v-textarea v-text="description" />

    <br>
    <v-divider />

    <v-card-title v-text="'Materialien'" />
    <v-treeview
      :items="material"
      item-key="name"
      expand-icon=""
      open-on-click
      hoverable
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon
          v-if="!item.format"
          color="primary"
        >
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon
          v-else
          color="primary"
        >
          {{ formats[item.format] }}
        </v-icon>
      </template>
    </v-treeview>

    <br>
    <v-divider />

    <v-card-title v-text="'Abgaben'" />
    <v-list class="ml-6">
      <v-list-item-group>
        <v-list-item
          v-for="assignment in assignments"
          :key="assignment.name"
          class="assignment-item"
          :ripple="false"
          inactive
          two-line
        >
          <div>
            <v-icon
              v-if="assignment.submitted"
              color="success"
            >
              mdi-check-circle-outline
            </v-icon>
            <v-icon
              v-else-if="assignment.over"
              color="error"
            >
              mdi-circle-off-outline
            </v-icon>
            <v-icon
              v-else
              color="primary"
            >
              mdi-checkbox-blank-circle-outline
            </v-icon>
          </div>
          <v-container>
            <v-list-item-title v-text="assignment.name" />
            <v-list-item-subtitle v-text="assignment.deadline" />
          </v-container>
          <v-file-input
            :prepend-icon="assignment.submitted ? 'mdi-file' : 'mdi-file-plus'"
            :disabled="assignment.over"
            hide-input
            dense
          />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Module extends Vue {
  private modulName = '';

  private description = 'Dieses Modul ist besonders geil. Es ist supergeil!';

  private semester = 0;

  private formats = {
    file: 'mdi-file-outline',
    pdf: 'mdi-file-pdf-box',
    link: 'mdi-link',
  };

  private material = [
    {
      name: 'Vorlesungsmaterial',
      children: [
        {
          name: 'Vorlesungsfolien 1',
          format: 'pdf',
        },
        {
          name: 'Vorlesungsfolien 2',
          format: 'pdf',
        },
      ],
    },
    {
      name: 'Übungen',
      children: [
        {
          name: 'Übung 1',
          format: 'file',
        },
        {
          name: 'Übung 2',
          format: 'file',
        },
        {
          name: 'Übung 3',
          format: 'file',
        },
        {
          name: 'Übung 4',
          format: 'file',
        },
      ],
    },
    {
      name: 'Sonstiges',
      children: [
        {
          name: 'Download IDE',
          format: 'link',
        },
      ],
    },
  ];

  private assignments = [
    {
      name: 'Abgabe MS1',
      deadline: '22.01.2022',
      submitted: false,
      over: true,
    },
    {
      name: 'Abgabe MS2',
      deadline: '22.02.2022',
      submitted: true,
      over: true,
    },
    {
      name: 'Abgabe MS3',
      deadline: '04.04.2022',
      submitted: true,
      over: false,
    },
    {
      name: 'Abgabe MS4',
      deadline: '19.04.2022',
      submitted: false,
      over: false,
    },
  ];

  mounted(): void {
    this.modulName = this.$route.params.modulName;
    this.semester = +this.$route.params.semester;
  }
}
</script>

<style scoped>
.assignment-item:hover {
  background-color: #f6f6f6;
}
</style>
