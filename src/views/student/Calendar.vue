<template>
  <v-container>
    <LoadingOverlay :loading="loading" />
    <calendar
      :events="events"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Calendar from '@/components/Calendar.vue';
import { CalendarEntry } from '@/classes/CalendarEntry';
import { Event } from '@/classes/Event';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const CalendarStore = namespace('Calendar');

@Component({
  components: { Calendar, LoadingOverlay },
})
export default class CalendarView extends Vue {
  loading = false;

  @CalendarStore.State
  allEntries!: Array<CalendarEntry>;

  @CalendarStore.Action
  loadAllEntries!: () => Promise<void>;

  modules: Array<string> = []

  colors = ['red', 'indigo', 'teal', 'orange', 'purple', 'light-blue', 'light-green', 'brown', 'blue-grey', 'yellow']

  get events(): Array<Event> {
    const events: Array<Event> = [];

    this.allEntries.forEach((entry) => {
      const moduleName: string = entry.assignedModule.name;

      if (!this.modules.includes(moduleName)) {
        this.modules.push(moduleName);
      }

      let colorIndex: number = this.modules.indexOf(moduleName);
      if (colorIndex >= 10) {
        colorIndex %= 10;
      }

      events.push({
        name: moduleName,
        start: new Date(entry.startTime),
        end: new Date(entry.endTime),
        color: this.colors[colorIndex],
        timed: true,
      });
    });

    return events;
  }

  mounted(): void {
    this.loading = true;
    this.loadAllEntries()
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
