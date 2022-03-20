import axios from 'axios';

class AuthService {
  static TOKEN_NAME = 'JWT_NOODLE';

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  static login(username: string, password: string): any {
    return axios
      .post('api/user/login', {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem(this.TOKEN_NAME, response.data);
        }
        return response.data;
      });
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}

export default AuthService;
