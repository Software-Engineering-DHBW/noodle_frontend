import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { NewModule } from '@/classes/NewModule';
import ModuleService from '@/services/ModuleService';
import { NoodleModule } from '@/classes/NoodleModule';

@Module({ namespaced: true })
export default class Modules extends VuexModule {
  allModules: Array<NoodleModule> = [];

  module!: NoodleModule

  @Mutation
  updateAllModules(modules: Array<NoodleModule>): void {
    this.allModules = modules;
  }

  @Mutation
  updateModule(module: NoodleModule): void {
    this.module = module;
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
  loadPersonalModules(): Promise<void> {
    return ModuleService.getPersonalModules()
      .then((moduleList) => this.context.commit('updateAllModules', moduleList))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  registerModule(module: NewModule): Promise<void> {
    return ModuleService.registerModule(module)
      .then(() => this.context.dispatch('loadAllModules'))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  loadModule(id: number): Promise<void> {
    return ModuleService.loadModule(id)
      .then((module) => this.context.commit('updateModule', module))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }

  @Action
  deleteModule(id: number): Promise<void> {
    return ModuleService.deleteModule(id)
      .then(() => this.context.dispatch('loadAllModules'))
      .catch((error) => {
        this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
        throw error;
      });
  }
}
