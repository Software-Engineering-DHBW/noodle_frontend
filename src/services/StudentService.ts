import axios from 'axios';

class StudentService {
  static getGrades(id: any) {
    return axios.get(`api/grades/${id}`);
  }
}

export default StudentService;
