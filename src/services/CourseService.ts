import axios from 'axios';
import { Course } from '@/classes/Course';

class CourseService {
  static getAllCourses(): Promise<Array<Course>> {
    return axios
      .get('api/course/getAll')
      .then((res) => res.data);
  }

  static registerCourse(data: { name: string, students: Array<number> }): Promise<void> {
    return axios
      .post('api/course/register', data);
  }

  static deleteCourse(id: number): Promise<void> {
    return axios
      .post(`api/course/${id}/delete`);
  }

  static removeStudentsFromCourse(studentsIds: Array<number>, courseId: number) {
    return axios
      .post(`api/course/${courseId}/deleteStudent`);
  }
}

export default CourseService;
