import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import AuthService from '@/services/AuthService';
import jwtDecode from 'jwt-decode';
import { LoginData } from '@/classes/LoginData';
import router from '@/router';
import CurrentUser from '../../classes/CurrentUser';

@Module({ namespaced: true })
class Auth extends VuexModule {
  token = AuthService.getToken();

  isLoading = false;

  get currentUser(): CurrentUser | null {
    return this.token ? new CurrentUser(jwtDecode(this.token)) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  @Mutation
  updateToken(): void {
    this.token = AuthService.getToken();
  }

  @Mutation
  resetToken(): void {
    this.token = null;
  }

  @Mutation
  setIsLoading(value: boolean): void {
    this.isLoading = value;
  }

  @Action
  login(data: LoginData): void {
    this.context.commit('setIsLoading', true);
    AuthService.login(data)
      .then(() => this.context.commit('updateToken'))
      .then(() => router.push('/'))
      .catch((error) => alert(error))
      .finally(() => this.context.commit('setIsLoading', false));
  }

  @Action
  logout(): void {
    AuthService.logout();
    this.context.commit('resetToken');
  }
}

export default Auth;
