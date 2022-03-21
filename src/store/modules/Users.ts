import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { NoodleUser } from '@/classes/NoodleUser';
import UserService from '@/services/UserService';

@Module({ namespaced: true })
export default class Users extends VuexModule {
  users: Array<NoodleUser> = [];

  isLoadingUsers = false;

  isDeletingUser = false

  @Mutation
  updateUsers(users: Array<NoodleUser>): void {
    this.users = users;
  }

  @Mutation
  setIsLoadingUsers(value: boolean): void {
    this.isLoadingUsers = value;
  }

  @Mutation
  setIsDeletingUser(value: boolean): void {
    this.isDeletingUser = value;
  }

  @Action
  loadAllUsers(): void {
    this.context.commit('setIsLoadingUsers', true);

    UserService.getAllUsers()
      .then((userList) => this.context.commit('updateUsers', userList))
      .catch((error) => alert(error))
      .finally(() => this.context.commit('setIsLoadingUsers', false));
  }

  @Action
  deleteUser(username: string): void {
    this.context.commit('setIsDeletingUser', true);

    UserService.deleteUser(username)
      .then(() => this.context.dispatch('loadAllUsers'))
      .finally(() => this.context.commit('setIsDeletingUser', false));
  }
}
