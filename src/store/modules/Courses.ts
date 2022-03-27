import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import CourseService from '@/services/CourseService';
import { Course } from '@/classes/Course';

@Module({ namespaced: true })
export default class Courses extends VuexModule {
  courses: Array<Course> = [];

  @Mutation
  updateUsers(users: Array<Course>): void {
    this.courses = users;
  }

  @Action
  loadAllCourses(): Promise<void> {
    return CourseService.getAllCourses()
      .then((courseList) => this.context.commit('updateUsers', courseList))
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
  deleteCourse(id: number): Promise<void> {
    return CourseService.deleteCourse(id)
      .then(() => this.context.dispatch('loadAllCourses'))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  removeStudentFromCourse(id: number, course: Course): Promise<void> {
    return CourseService.removeStudentFromCourse(id, course);
  }
}
