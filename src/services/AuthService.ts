import axios from 'axios';
import { LoginData } from '@/classes/LoginData';

class AuthService {
  static TOKEN_NAME = 'JWT_NOODLE';

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  static login(data: LoginData): Promise<void> {
    return axios
      .post('api/user/login', data)
      .then((res) => res.data)
      .then((token) => localStorage.setItem(this.TOKEN_NAME, token));
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}

export default AuthService;
