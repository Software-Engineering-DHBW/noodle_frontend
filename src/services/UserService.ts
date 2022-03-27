import { NoodleUser } from '@/classes/NoodleUser';
import axios from 'axios';
import NewNoodleUser from '@/classes/NewNoodleUser';

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

  static registerUser(data: NewNoodleUser): Promise<void> {
    return axios
      .post('api/user/register', data);
  }

  static changeUserPassword(data: {username: string, password: string}): Promise<void> {
    return axios
      .post('api/user/changePassword', data);
  }
}

export default UserService;
