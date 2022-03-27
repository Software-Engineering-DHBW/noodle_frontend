import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { NoodleUser } from '@/classes/NoodleUser';
import UserService from '@/services/UserService';
import NewNoodleUser from '@/classes/NewNoodleUser';

@Module({ namespaced: true })
export default class Users extends VuexModule {
  users: Array<NoodleUser> = [];

  get students(): Array<NoodleUser> {
    return this.users.filter((user) => !user.userId.isAdministrator && !user.userId.isTeacher);
  }

  @Mutation
  updateUsers(users: Array<NoodleUser>): void {
    this.users = users;
  }

  @Action
  loadAllUsers(): Promise<void> {
    return UserService.getAllUsers()
      .then((userList) => this.context.commit('updateUsers', userList))
      .catch((error) => {
        alert(error);
        throw error;
      });
  }

  @Action
  registerUser(user: NewNoodleUser): Promise<void> {
    return UserService.registerUser(user)
      .then(() => this.context.dispatch('loadAllUsers'))
      .catch((error) => {
        alert(error);
        throw error;
      });
  }

  @Action
  deleteUser(username: string): Promise<void> {
    return UserService.deleteUser(username)
      .then(() => this.context.dispatch('loadAllUsers'))
      .catch((error) => {
        alert(error);
        throw error;
      });
  }

  @Action
  changeUserPassword(data: {username: string, password: string}): Promise<void> {
    return UserService.changeUserPassword(data)
      .then(() => this.context.dispatch('loadAllUsers'))
      .catch((error) => {
        alert(error);
        throw error;
      });
  }
}
