<template>
  <v-container>
    <v-row>
      <v-col class="py-0">
        <v-switch
          v-if="$vuetify.breakpoint.xl"
          v-model="monthView"
          dense
          :label="monthView ? 'Monatsansicht' : 'Wochenansicht'"
        />
      </v-col>

      <v-col
        align-self="center"
        class="py-0 d-flex justify-end"
      >
        <v-btn
          color="primary"
          @click="exportCalendar"
          v-text="'Export'"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="py-0 d-flex justify-center"
        align-self="center"
      >
        <v-btn
          icon
          @click="$refs.calendar.prev()"
        >
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
          v-if="$refs.calendar"
          text
          plain
          class="align-self-center text-capitalize text-h6"
          @click="focus=''"
        >
          {{ $refs.calendar.title }}
        </v-btn>
        <v-btn
          icon
          @click="$refs.calendar.next()"
        >
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-calendar
          ref="calendar"
          v-model="focus"
          first-interval="6"
          interval-count="14"
          :type="type"
          :events="events"
          :weekdays="weekdayOrder"
          @change="getEvents"
          @click:event="onEventClick"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const Auth = namespace('Auth');

@Component
export default class Calendar extends Vue {
  @Auth.State('user')
  private currentUser!: any;

  mounted(): void {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }

  // Weekdays ordered by Mon-Sun
  private weekdayOrder = [1, 2, 3, 4, 5, 6, 0];

  private monthView = true;

  get type(): string {
    if (this.$vuetify.breakpoint.xs) {
      return 'week';
    }
    return this.monthView ? 'month' : 'week';
  }

  private focus = '';

  private events: any = [];

  private courses = ['Mathematik', 'Software-Engineering', 'Elektronik', 'Programmieren', 'IT-Security'];

  private colors = ['red', 'green', 'blue', 'indigo', 'brown'];

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
      const first = new Date(firstTimestamp - (firstTimestamp % 900000));
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

  static rnd(a: number, b: number): number {
    return Math.floor((b - a + 1) * Math.random()) + a;
  }

  // eslint-disable-next-line class-methods-use-this
  exportCalendar(): void {
    alert('Kalender wird exportiert');
  }

  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/explicit-module-boundary-types
  onEventClick({ event }: any): void {
    const route = `/module/1/${event.name}`;
    this.$router.push(route);
  }
}
</script>

<style>
/* removes calendars scroll bar that has no use */
.v-calendar-daily__scroll-area {
  overflow: auto !important;
}
</style>
