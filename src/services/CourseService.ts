import axios from 'axios';
import { Course } from '@/classes/Course';

class CourseService {
  static getAllCourses(): Promise<Array<Course>> {
    return axios
      .get('api/course/getAll')
      .then((res) => res.data);
  }

  static getStudentsForCourse(id: number): Promise<{ id: number, name: string }> {
    return axios
      .get(`api/course/${id}`)
      .then((res) => res.data[0]
        .map((student: { id: number, username: string }) => ({
          id: student.id,
          name: student.username,
        })));
  }

  static registerCourse(data: { name: string, students: Array<number> }): Promise<void> {
    return axios
      .post('api/course/register', data);
  }

  static deleteCourse(id: number): Promise<void> {
    return axios
      .post(`api/course/${id}/delete`);
  }
}

export default CourseService;
