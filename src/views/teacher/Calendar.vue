<template>
  <v-container>
    <LoadingOverlay :loading="loading" />
    <v-row>
      <v-col>
        <v-select
          v-model="selectedCalendarView"
          hide-details
          :items="calendarViews"
          @change="setCalendarView"
        />
      </v-col>
      <v-col class="text-right">
        <NewMeetingPopup />
      </v-col>
    </v-row>
    <v-row>
      <calendar
        :events="events"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Calendar from '@/components/Calendar.vue';
import NewMeetingPopup from '@/components/NewMeetingPopup.vue';
import { CalendarEntry } from '@/classes/CalendarEntry';
import { Event } from '@/classes/Event';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const CalendarStore = namespace('Calendar');

@Component({
  components: {
    NewMeetingPopup,
    Calendar,
    LoadingOverlay,
  },
})
export default class CalendarView extends Vue {
  loading = false;

  @CalendarStore.State
  allEntries!: Array<CalendarEntry>;

  @CalendarStore.Action
  loadAllEntries!: () => Promise<void>;

  calendarViews = ['Meine Termine', 'Meine Termine + Kurs IT1', 'Meine Termine + Kurs IT2'];

  selectedCalendarView = this.calendarViews[0];

  modules: Array<string> = []

  colors = ['red', 'indigo', 'teal', 'orange', 'purple', 'light-blue', 'light-green', 'brown', 'blue-grey', 'yellow']

  // eslint-disable-next-line class-methods-use-this
  setCalendarView(selectedCalendarView: any) {
    console.log(`Wechseln zu "${selectedCalendarView}"`);
  }

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
