import axios from 'axios';

const API_URL = 'http://localhost:5432/';

class AuthService {
  static login(username: string, password: string) {
    return axios
      .post(`${API_URL}user/login`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  static logout(): void {
    localStorage.removeItem('user');
  }
}
export default AuthService;
