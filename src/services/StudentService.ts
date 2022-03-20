import axios from '../plugins/axios';

class StudentService {
  static getGrades(id: any) {
    return axios.get(`api/grades/${id}`);
  }
}

export default StudentService;
