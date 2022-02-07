<template>
  <v-calendar
    ref="calendar"
    v-model="value"
    :weekdays="weekday"
    :type="type"
    :events="events"
    :event-overlap-mode="mode"
    :event-overlap-threshold="30"
    style="width: 100%; height: 100%;"
    @change="getEvents"
  >
    />
  </v-calendar>
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

  private type = 'month'

  private types = ['month', 'week', 'day', '4day']

  private mode = 'stack'

  private modes = ['stack', 'column']

  private weekday = [0, 1, 2, 3, 4, 5, 6]

  private weekdays = [
    { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
    { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
    { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
    { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
  ]

  private value = ''

  private events = []

  private names = ['Meeting', 'Vorlesung', 'Hausarbeit', 'Lernen', 'Sport']

  private colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']

  getEvents({ start, end }): any {
    const events = [];

    const min = new Date(`${start.date}T00:00:00`);
    const max = new Date(`${end.date}T23:59:59`);
    const days = (max.getTime() - min.getTime()) / 86400000;
    const eventCount = Calendar.rnd(days, days + 20);

    for (let i = 0; i < eventCount; i += 1) {
      const allDay = Calendar.rnd(0, 3) === 0;
      const firstTimestamp = Calendar.rnd(min.getTime(), max.getTime());
      const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      const secondTimestamp = Calendar.rnd(2, allDay ? 288 : 8) * 900000;
      const second = new Date(first.getTime() + secondTimestamp);

      const eventNumber = Calendar.rnd(0, this.names.length - 1);

      events.push({
        name: this.names[eventNumber],
        start: first,
        end: second,
        color: this.colors[eventNumber],
        timed: !allDay,
      });
    }

    console.log(events[0]);
    this.events = events;
  }

  static rnd(a: any, b: any): any {
    return Math.floor((b - a + 1) * Math.random()) + a;
  }
}
</script>
