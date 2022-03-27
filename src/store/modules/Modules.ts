import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { NewModule } from '@/classes/NewModule';
import ModuleService from '@/services/ModuleService';
import { NoodleModule } from '@/classes/NoodleModule';

@Module({ namespaced: true })
export default class Modules extends VuexModule {
  allModules: Array<NoodleModule> = [];

  @Mutation
  updateAllModules(modules: Array<NoodleModule>): void {
    this.allModules = modules;
  }

  @Action
  loadAllModules(): Promise<void> {
    return ModuleService.getAllModules()
      .then((moduleList) => this.context.commit('updateAllModules', moduleList))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  registerModule(module: NewModule): Promise<void> {
    return ModuleService.registerModule(module)
      .then(() => console.log('Modul registriert'))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }
}
