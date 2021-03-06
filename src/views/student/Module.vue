<template>
  <v-container>
    <LoadingOverlay :loading="loading" />
    <h2>
      {{ module.name }}
    </h2>
    <v-textarea v-text="module.description" />

    <br>
    <v-divider />

    <v-card-title v-text="'Materialien'" />
    <LectureMaterialTree :lecture-material="lectureMaterial" />

    <br>
    <v-divider />

    <v-card-title v-text="'Abgaben'" />
    <v-list class="ml-5">
      <v-list-item
        v-for="assignment in assignments"
        :key="assignment.name"
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
          @change="uploadAssignment"
        />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LectureMaterialTree from '@/components/LectureMaterialTree.vue';
import { namespace } from 'vuex-class';
import { NoodleModule } from '@/classes/NoodleModule';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const ModuleStore = namespace('Modules');

@Component({
  components: { LoadingOverlay, LectureMaterialTree },
})
export default class Module extends Vue {
  moduleId!: number;

  @ModuleStore.State
  module!: NoodleModule;

  @ModuleStore.Action
  loadModule!: (id: number) => Promise<void>;

  description = 'Dieses Modul ist besonders geil. Es ist supergeil!';

  loading = false;

  private lectureMaterial = [
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

  // eslint-disable-next-line class-methods-use-this
  uploadAssignment(event: any) {
    alert(`"${event.name}" wird hochgeladen`);
  }

  mounted(): void {
    this.moduleId = +this.$route.params.moduleId;

    this.loading = true;
    this.loadModule(this.moduleId)
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
