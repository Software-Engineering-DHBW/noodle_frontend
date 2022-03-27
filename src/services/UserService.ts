import { NoodleUser } from '@/classes/NoodleUser';
import axios from 'axios';
import NewNoodleUser from '@/classes/NewNoodleUser';

class UserService {
  static getAllUsers(): Promise<Array<NoodleUser>> {
    return axios
      .get('api/user/getAll')
      .then((res) => res.data);
  }

  static deleteUser(username: string): Promise<void> {
    return axios
      .post('api/user/delete', { username });
  }

  static registerUser(data: NewNoodleUser): Promise<void> {
    return axios
      .post('api/user/register', data);
  }
}

export default UserService;
