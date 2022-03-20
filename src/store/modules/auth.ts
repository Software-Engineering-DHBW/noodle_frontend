import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import AuthService from '@/services/AuthService';
import jwtDecode from 'jwt-decode';
import CurrentUser from '../../classes/CurrentUser';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public token = AuthService.getToken();

  get currentUser(): CurrentUser | null {
    return this.token ? new CurrentUser(jwtDecode(this.token)) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  @Mutation
  public updateToken(): void {
    this.token = AuthService.getToken();
  }

  @Mutation
  public resetToken(): void {
    this.token = null;
  }

  @Action({ rawError: true })
  login(data: any): Promise<any> {
    return AuthService.login(data.username, data.password)
      .then(
        (token: any) => {
          this.context.commit('updateToken');
          return Promise.resolve(token);
        },
        (error: any) => {
          this.context.commit('logoutt');
          const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString();
          return Promise.reject(message);
        },
      );
  }

  @Action
  logout(): void {
    AuthService.logout();
    this.context.commit('resetToken');
  }
}

export default Auth;
