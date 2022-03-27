<template>
  <div>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="openPopup"
      v-text="'Neuen Kurs erstellen'"
    />

    <v-btn
      v-if="$vuetify.breakpoint.xs"
      fab
      small
      color="primary"
      elevation="2"
      @click="visible=true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog
      v-model="visible"
      width="500"
    >
      <v-card>
        <v-card-title class="primary">
          Neuer Kurs
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newCourse.name"
            label="Name"
          />
          <v-autocomplete
            v-model="newCourse.students"
            :items="studentsNotAssignedToCourse"
            item-text="fullname"
            item-value="userId.id"
            label="Studenten"
            :loading="loadingStudents"
            small-chips
            multiple
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
            :loading="loadingWhileRegisteringCourse"
            @click="createCourse"
            v-text="'Erstellen'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { NoodleUser } from '@/classes/NoodleUser';

const UserStore = namespace('Users');
const CourseStore = namespace('Courses');

@Component
export default class NewUserPopup extends Vue {
  visible = false;

  loadingWhileRegisteringCourse = false;

  loadingStudents = false;

  newCourse = {
    name: '',
    students: [],
  };

  @UserStore.Getter
  students!: Array<NoodleUser>;

  @UserStore.Action
  loadAllUsers!: () => Promise<void>;

  @CourseStore.Action
  registerCourse!: (course: { name: string, students: Array<number> }) => Promise<void>;

  get studentsNotAssignedToCourse(): Array<NoodleUser> {
    return this.students.filter((student) => !student.userId.course);
  }

  createCourse(): any {
    this.loadingWhileRegisteringCourse = true;
    this.registerCourse(this.newCourse)
      .then(() => {
        this.newCourse.name = '';
        this.newCourse.students = [];
      })
      .finally(() => {
        this.loadingWhileRegisteringCourse = false;
        this.visible = false;
      });
  }

  openPopup() : void {
    this.visible = true;
    this.loadingStudents = true;
    this.loadAllUsers()
      .finally(() => {
        this.loadingStudents = false;
      });
  }
}
</script>
