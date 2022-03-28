import { CalendarEntry } from '@/classes/CalendarEntry';
import CalendarService from '@/services/CalendarService';
import {
  Action, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Calendar extends VuexModule {
    allEntries: Array<CalendarEntry> = [];

    entry!: CalendarEntry

    @Mutation
    updateAllEntries(entries: Array<CalendarEntry>): void {
      this.allEntries = entries;
    }

    @Mutation
    updateEntry(entry: CalendarEntry): void {
      this.entry = entry;
    }

    @Action
    loadAllEntries(): Promise<void> {
      return CalendarService.getPersonalCalendar()
        .then((entryList) => this.context.commit('updateAllEntries', entryList))
        .catch((error) => {
          this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
          throw error;
        });
    }

    @Action
    registerEntry(entry: CalendarEntry): Promise<void> {
      return CalendarService.registerEntry(entry)
        .then(() => this.context.dispatch('loadAllEntries'))
        .catch((error) => {
          this.context.dispatch('AlertStore/showError', error.response.data, { root: true });
          throw error;
        });
    }
}
