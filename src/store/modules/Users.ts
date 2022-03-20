import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import NoodleUser from '@/classes/NoodleUser';
import UserService from '@/services/UserService';

@Module({ namespaced: true })
export default class Users extends VuexModule {
  users: Array<NoodleUser> = [];

  @Mutation
  // eslint-disable-next-line class-methods-use-this
  updateUsers(users: Array<NoodleUser>): void {
    this.users = users;
  }

  @Action
  loadAllUsers(): void {
    const users = UserService.getAllUsers();
    console.log(users);
    this.context.commit('updateUsers', users);
  }
}
