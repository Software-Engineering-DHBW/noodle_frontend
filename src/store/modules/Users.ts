import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { NoodleUser } from '@/classes/NoodleUser';
import UserService from '@/services/UserService';
import NewUser from '@/classes/NewUser';

@Module({ namespaced: true })
export default class Users extends VuexModule {
  users: Array<NoodleUser> = [];

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
  registerUser(user: NewUser): Promise<void> {
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
}
