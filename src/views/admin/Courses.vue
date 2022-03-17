<template>
  <v-container>
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
              <th class="text-right">
                Aktion
              </th>
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
                  @click="deleteCourse(course)"
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

@Component({
  components: {
    NewCoursePopup,
    SearchField,
  },
})
export default class Courses extends Vue {
  private filterString = '';

  private courses = [
    {
      name: 'TINF19IT1',
      students: ['Max', 'Moritz'],
    },
    {
      name: 'TINF19IT2',
      students: ['Max', 'Moritz'],
    },
    {
      name: 'TINF19CS1',
      students: ['Max', 'Moritz'],
    },
    {
      name: 'TINF20IT1',
      students: ['Max', 'Moritz'],
    },
    {
      name: 'TINF20IT2',
      students: ['Max', 'Moritz'],
    },
  ]

  get filteredCourses(): Array<any> {
    return this.courses.filter((course) => course.name.toLowerCase()
      .includes(this.filterString.toLowerCase()));
  }

  // eslint-disable-next-line class-methods-use-this
  deleteCourse(course: any): void {
    alert(`Kurs ${course.name} wird gelöscht`);
  }
}
</script>
