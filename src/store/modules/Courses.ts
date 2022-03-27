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
  deleteCourse(courseId: number): Promise<void> {
    const courseToDelete = this.courses.find((course) => course.id === courseId);
    const studentsToRemove = courseToDelete ? courseToDelete.students : [];
    this.context.dispatch('removeStudentsFromCourse', {
      students: studentsToRemove,
      courseId,
    });

    this.context.dispatch('removeStudentFromCourse');
    return CourseService.deleteCourse(courseId)
      .then(() => this.context.dispatch('loadAllCourses'))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  // eslint-disable-next-line class-methods-use-this
  removeStudentsFromCourse(data: { students: Array<number>, courseId: number }): Promise<void> {
    return CourseService.removeStudentsFromCourse(data.students, data.courseId).then();
  }
}
