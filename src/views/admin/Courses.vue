<template>
  <v-container>
    <LoadingOverlay :loading="loading" />
    <v-row>
      <v-col>
        <SearchField v-model="filterString" />
      </v-col>
      <v-col class="text-right">
        <NewCoursePopup />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-simple-table
          fixed-header
          height="70vh"
        >
          <thead>
            <tr>
              <th>
                Kurs
              </th>
              <th class="text-right" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(course, index) in filteredCourses"
              :key="index"
            >
              <td class="text-break">
                {{ course.name }}
              </td>
              <td class="text-right">
                <v-btn
                  icon
                  @click="deleteCourseFromList(course.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchField from '@/components/SearchField.vue';
import NewCoursePopup from '@/components/NewCoursePopup.vue';
import { namespace } from 'vuex-class';
import { Course } from '@/classes/Course';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const CourseStore = namespace('Courses');

@Component({
  components: {
    LoadingOverlay,
    NewCoursePopup,
    SearchField,
  },
})
export default class Courses extends Vue {
  filterString = '';

  loading = false;

  @CourseStore.State
  courses!: Array<Course>;

  @CourseStore.Action
  loadAllCourses!: () => Promise<void>;

  @CourseStore.Action
  deleteCourse!: (id: number) => Promise<void>;

  get filteredCourses(): Array<Course> {
    return this.courses.filter((course) => course.name.toLowerCase()
      .includes(this.filterString.toLowerCase()));
  }

  deleteCourseFromList(courseId: number): void {
    this.loading = true;
    this.deleteCourse(courseId)
      .catch()
      .finally(() => {
        this.loading = false;
      });
  }

  mounted(): void {
    this.loading = true;
    this.loadAllCourses()
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
