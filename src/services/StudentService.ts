import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  static getGrades(id: any) {
    return axios.get(`api/grades/${id}`, { headers: authHeader() });
  }
}
export default UserService;
