import axios from 'axios';
import { Course } from '@/classes/Course';

class GradesService {
  static getGrades(id: number): Promise<void> {
    return axios.get(`api/grades/${id}`);
  }

  static addGrade(grade: number, studentId: number, moduleId: number): Promise<Array<Course>> {
    return axios
      .post('api/grades/insert', {
        moduleId,
        studentId,
        grade,
        weight: 100,
      });
  }
}

export default GradesService;
