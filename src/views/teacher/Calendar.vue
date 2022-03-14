<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedCalendarView"
          solo
          hide-details
          :items="calendarViews"
          @change="setCalendarView"
        />
      </v-col>
      <v-col class="text-right">
        <MeetingPopup :meeting="currentMeeting" />
      </v-col>
    </v-row>
    <v-row>
      <calendar
        :events="events"
        @change="getEvents"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Calendar from '@/components/Calendar.vue';
import MeetingPopup from '@/views/teacher/MeetingPopup.vue';

const Auth = namespace('Auth');
@Component({
  components: {
    MeetingPopup,
    Calendar,
  },
})
export default class CalendarView extends Vue {
  @Auth.State('user')
  private currentUser!: any;

  mounted(): void {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }

  private calendarViews = ['Meine Termine', 'Meine Termine + Kurs IT1', 'Meine Termine + Kurs IT2'];

  private currentMeeting = null;

  private selectedCalendarView = this.calendarViews[0];

  // eslint-disable-next-line class-methods-use-this
  setCalendarView(selectedCalendarView: any) {
    console.log(`Wechseln zu "${selectedCalendarView}"`);
  }

  private courses = ['Mathematik', 'Software-Engineering', 'Elektronik', 'Programmieren', 'IT-Security'];

  private colors = ['red', 'green', 'blue', 'indigo', 'brown'];

  private events: any = [];

  getEvents(startAndEnd: any): void {
    const {
      start,
      end,
    } = startAndEnd;
    const events = [];

    const min = new Date(`${start.date}T00:00:00`);
    const max = new Date(`${end.date}T23:59:59`);
    const days = (max.getTime() - min.getTime()) / 86400000;
    const eventCount = Calendar.rnd(days, days + 20);

    for (let i = 0; i < eventCount; i += 1) {
      const allDay = false;
      const firstTimestamp = Calendar.rnd(min.getTime(), max.getTime());
      const first = new Date(firstTimestamp - (firstTimestamp % 900000) + Math.random() * 1000);
      const secondTimestamp = Calendar.rnd(2, allDay ? 288 : 8) * 900000;
      const second = new Date(first.getTime() + secondTimestamp);

      const eventNumber = Calendar.rnd(0, this.courses.length - 1);

      events.push({
        name: this.courses[eventNumber],
        start: first,
        end: second,
        color: this.colors[eventNumber],
        timed: !allDay,
      });
    }

    this.events = events;
  }
}
</script>
