import NoodleUser from '@/classes/NoodleUser';
import axios from '../plugins/axios';

class UserService {
  static getAllUsers(): Array<NoodleUser> {
    const userList: Array<NoodleUser> = [];
    axios
      .get('api/user/getAll')
      // eslint-disable-next-line no-return-assign
      .then((res) => res.data.forEach((element: NoodleUser) => {
        userList.push(element);
      }))
      .catch((error) => alert(error));

    return userList;
  }
}

export default UserService;
