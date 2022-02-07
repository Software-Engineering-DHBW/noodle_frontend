import axios from 'axios';

class AuthService {
  static login(username: string, password: string) {
    return axios
      .post('api/user/login', {
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
