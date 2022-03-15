<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 v-text="`${modulName} im ${semester}. Semester`" />
        <v-textarea v-text="description" />
      </v-col>
    </v-row>

    <br>
    <v-divider />

    <v-row>
      <v-col>
        <v-card-title v-text="'Materialien'" />
        <LectureMaterialTree :lecture-material="lectureMaterial" />
      </v-col>
    </v-row>

    <br>
    <v-divider />

    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-card-title v-text="'Abgaben'" />
          </v-col>
          <v-col class="text-right">
            <NewAssignmentPopup />
          </v-col>
        </v-row>
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
                v-if="assignment.over"
                color="success"
              >
                mdi-check-circle-outline
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
              :prepend-icon="'mdi-file-plus'"
              hide-input
              dense
              @change="uploadAssignment"
            />
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LectureMaterialTree from '@/components/LectureMaterialTree.vue';
import NewAssignmentPopup from '@/components/NewAssignmentPopup.vue';

@Component({
  components: {
    NewAssignmentPopup,
    LectureMaterialTree,
  },
})
export default class Module extends Vue {
  private modulName = '';

  private description = 'Dieses Modul ist besonders geil. Es ist supergeil!';

  private semester = 0;

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
  uploadAssignment(event: any): any {
    alert(`"${event.name}" wird hochgeladen`);
  }

  mounted(): void {
    this.modulName = this.$route.params.modulName;
    this.semester = +this.$route.params.semester;
  }
}
</script>
