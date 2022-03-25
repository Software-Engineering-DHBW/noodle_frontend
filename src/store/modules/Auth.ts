import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import AuthService from '@/services/AuthService';
import jwtDecode from 'jwt-decode';
import { LoginData } from '@/classes/LoginData';
import Role from '@/classes/Role';
import CurrentUser from '../../classes/CurrentUser';

@Module({ namespaced: true })
class Auth extends VuexModule {
  token = AuthService.getToken();

  get currentUser(): CurrentUser | null {
    return this.token ? new CurrentUser(jwtDecode(this.token)) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isStudent(): boolean {
    return this.currentUser?.role === Role.STUDENT;
  }

  get isTeacher(): boolean {
    return this.currentUser?.role === Role.TEACHER;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === Role.ADMIN;
  }

  @Mutation
  updateToken(): void {
    this.token = AuthService.getToken();
  }

  @Mutation
  resetToken(): void {
    this.token = null;
  }

  @Action
  login(data: LoginData): Promise<void> {
    return AuthService.login(data)
      .then(() => this.context.commit('updateToken'))
      .then(() => this.context.dispatch('AlertStore/showSuccess', 'Erfolgreich eingeloggt', { root: true }))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  logout(): void {
    AuthService.logout();
    this.context.commit('resetToken');
  }
}

export default Auth;
