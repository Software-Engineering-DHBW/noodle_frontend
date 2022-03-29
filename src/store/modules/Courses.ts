import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import CourseService from '@/services/CourseService';
import { Course } from '@/classes/Course';
import GradesService from '@/services/GradesService';

@Module({ namespaced: true })
export default class Courses extends VuexModule {
  courses: Array<Course> = [];

  studentsInCourse!: Array<{ id: number, username: string }>;

  @Mutation
  updateCourses(courses: Array<Course>): void {
    this.courses = courses;
  }

  @Mutation
  updateStudentsInCourse(students: Array<{ id: number, username: string }>): void {
    this.studentsInCourse = students;
  }

  @Action
  loadAllCourses(): Promise<void> {
    return CourseService.getAllCourses()
      .then((courseList) => this.context.commit('updateCourses', courseList))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  loadStudentsInCourse(id: number): Promise<void> {
    return CourseService.getStudentsForCourse(id)
      .then((students) => {
        this.context.commit('updateStudentsInCourse', students);
      })
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  registerCourse(course: { name: string, students: Array<number> }): Promise<void> {
    return CourseService.registerCourse(course)
      .then(() => this.context.dispatch('loadAllCourses'))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  deleteCourse(courseId: number): Promise<void> {
    return CourseService.deleteCourse(courseId)
      .then(() => this.context.dispatch('loadAllCourses'))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  valuateStudents(data: {
    students: Array<any>,
    grades: Array<any>,
    moduleId: number,
  }): void {
    data.students.forEach((student, index) => {
      GradesService.addGrade(data.grades[index], student.id, data.moduleId)
        .then(() => this.context.dispatch('AlertStore/showSuccess', 'Student bewertet', { root: true }))
        .catch((error) => this.context.dispatch('AlertStore/showError', error.response.data, { root: true }));
    });
  }
}
