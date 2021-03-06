<template>
  <div>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="openPopup"
      v-text="'Neues Modul erstellen'"
    />

    <v-btn
      v-if="$vuetify.breakpoint.xs"
      fab
      small
      color="primary"
      elevation="2"
      @click="openPopup"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog
      v-model="visible"
      width="500"
    >
      <v-card>
        <v-card-title class="primary">
          Neues Modul
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="module.name"
            label="Titel"
          />
          <v-text-field
            v-model="module.description"
            label="Beschreibung"
          />
          <v-select
            v-model="module.assignedCourse"
            label="Kurs"
            :loading="loadingCourses"
            :items="courses"
            item-text="name"
            item-value="id"
          />
          <v-select
            v-model="module.assignedTeacher"
            label="Lehrender"
            :loading="loadingTeachers"
            :items="teacher"
            item-text="fullname"
            item-value="userId.id"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="visible = false"
            v-text="'Abbrechen'"
          />
          <v-btn
            text
            color="primary"
            :loading="loadingWhileRegisteringModule"
            @click="createModule"
            v-text="'Erstellen'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Course } from '@/classes/Course';
import { namespace } from 'vuex-class';
import { NoodleUser } from '@/classes/NoodleUser';
import { NewModule } from '@/classes/NewModule';

const CourseStore = namespace('Courses');
const UserStore = namespace('Users');
const ModuleStore = namespace('Modules');

@Component
export default class NewModulePopup extends Vue {
  visible = false;

  loadingWhileRegisteringModule = false

  loadingTeachers = false

  loadingCourses = false

  @UserStore.Getter
  teacher!: Array<NoodleUser>;

  @CourseStore.State
  courses!: Array<Course>;

  @UserStore.Action
  loadAllUsers!: () => Promise<void>;

  @CourseStore.Action
  loadAllCourses!: () => Promise<void>;

  @ModuleStore.Action
  registerModule!: (module: NewModule) => Promise<void>;

  module = {
    name: '',
    description: '',
    assignedTeacher: 0,
    assignedCourse: 0,
    submodule: [],
  };

  createModule(): void {
    this.loadingWhileRegisteringModule = true;

    this.registerModule({
      name: this.module.name,
      description: this.module.description,
      assignedTeacher: [this.module.assignedTeacher],
      assignedCourse: this.module.assignedCourse,
      submodule: this.module.submodule,
    })
      .then(() => {
        this.module.name = '';
        this.module.description = '';
        this.module.assignedTeacher = 0;
        this.module.assignedCourse = 0;
        this.module.submodule = [];

        this.visible = false;
      })
      .catch(() => undefined)
      .finally(() => {
        this.loadingWhileRegisteringModule = false;
      });
  }

  openPopup() : void {
    this.visible = true;

    this.loadingTeachers = true;
    this.loadAllUsers()
      .catch(() => undefined)
      .finally(() => {
        this.loadingTeachers = false;
      });

    this.loadingCourses = true;
    this.loadAllCourses()
      .catch(() => undefined)
      .finally(() => {
        this.loadingCourses = false;
      });
  }
}
</script>
