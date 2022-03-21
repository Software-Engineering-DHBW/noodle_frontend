import { NoodleUser } from '@/classes/NoodleUser';
import AuthService from '@/services/AuthService';
import axios from 'axios';
import NewUser from '@/classes/NewUser';

axios.defaults.headers.common.Authorization = `Bearer ${AuthService.getToken()}`;

class UserService {
  static getAllUsers(): Promise<Array<NoodleUser>> {
    const userList: Array<NoodleUser> = [];

    return axios
      .get('api/user/getAll')
      .then((res) => res.data)
      .then((data) => data.forEach((element: NoodleUser) => userList.push(element)))
      .then(() => userList);
  }

  static deleteUser(username: string): Promise<void> {
    return axios
      .post('api/user/delete', { username });
  }

  static registerUser(data: NewUser): Promise<void> {
    return axios
      .post('api/user/register', data);
  }
}

export default UserService;
