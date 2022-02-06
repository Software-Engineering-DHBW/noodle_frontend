import {
  VuexModule, Module, Mutation, Action,
} from 'vuex-module-decorators';
import AuthService from '@/services/AuthService';

const storedUser = localStorage.getItem('user');

@Module({ namespaced: true })
class User extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false };

  public user = storedUser ? JSON.parse(storedUser) : null;

  @Mutation
  public loginSuccess(user: any): void {
    this.status.loggedIn = true;
    this.user = user;
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Action({ rawError: true })
  login(data: any): Promise<any> {
    return AuthService.login(data.username, data.password).then(
      (user) => {
        this.context.commit('loginSuccess', user);
        return Promise.resolve(user);
      },
      (error) => {
        this.context.commit('loginFailure');
        const message = (error.response && error.response.data && error.response.data.message)
          || error.message
          || error.toString();
        return Promise.reject(message);
      },
    );
  }

  @Action
  signOut(): void {
    AuthService.logout();
    this.context.commit('logout');
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn;
  }
}
export default User;
