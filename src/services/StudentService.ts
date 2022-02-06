import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5432/';

class UserService {
  static getGrades(id: any) {
    return axios.get(`${API_URL}grades/${id}`, { headers: authHeader() });
  }
}
export default UserService;
