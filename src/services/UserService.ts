import { NoodleUser } from '@/classes/NoodleUser';
import axios from '../plugins/axios';

class UserService {
  static getAllUsers(): Array<NoodleUser> {
    const userList: Array<NoodleUser> = [];

    axios
      .get('api/user/getAll')
      .then((res) => res.data)
      .then((data) => data.forEach((element: NoodleUser) => userList.push(element)))
      .catch((error) => alert(error));

    return userList;
  }

  static deleteUser(username: string): void {
    axios
      .post('api/user/delete', { username })
      .then(() => console.log('User erfolgreich gelöscht'))
      .catch((error) => alert(error));
  }
}

export default UserService;
