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

      <v-col class="py-0 d-flex justify-end">
        <v-tooltip bottom>
          Kalender exportieren
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-btn
                color="primary"
                icon
                v-on="on"
                @click="exportCalendar"
              >
                <v-icon>
                  mdi-download
                </v-icon>
              </v-btn>
            </div>
          </template>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pb-0 d-flex justify-center">
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
          class="text-capitalize text-h6"
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
      <v-col v-show="$vuetify.breakpoint.xl">
        <v-calendar
          ref="calendar"
          v-model="focus"
          first-interval="6"
          interval-count="14"
          :type="type"
          :events="events"
          :weekdays="weekdayOrder"
          @change="emitChange"
        />
      </v-col>

      <v-col v-if="$vuetify.breakpoint.xs">
        <v-card
          v-for="weekday in mobileEvents"
          :key="weekday.name"
          class="mb-4"
        >
          <v-card-title
            class="primary"
            v-text="weekday.name"
          />
          <v-list-item
            v-for="(event, index) in weekday.events"
            :key="event.start.getMilliseconds()"
            :to="`module/${1}/${event.name}`"
          >
            <v-list-item-content class="pt-0">
              <v-list-item-title>
                <v-divider v-if="index !== 0" />
              </v-list-item-title>
              <v-list-item-title
                class="pt-2"
                v-text="event.name"
              />
              <v-list-item-subtitle
                v-text="`${event.start.toLocaleTimeString().slice(0,-3)}
                 - ${event.end.toLocaleTimeString().slice(0,-3)}`"
              />
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Calendar extends Vue {
  // Weekdays ordered by Mon-Sun
  weekdayOrder = [1, 2, 3, 4, 5, 6, 0];

  monthView = true;

  get type(): string {
    if (this.$vuetify.breakpoint.xs) {
      return 'week';
    }
    return this.monthView ? 'month' : 'week';
  }

  focus = '';

  @Prop({ required: true }) private events: any;

  emitChange(startAndEnd: any): void {
    this.$emit('change', startAndEnd);
  }

  get mobileEvents(): any {
    const weekdayEvents: any = {
      0: {
        name: 'Montag',
        events: [],
      },
      1: {
        name: 'Dienstag',
        events: [],
      },
      2: {
        name: 'Mittwoch',
        events: [],
      },
      3: {
        name: 'Donnerstag',
        events: [],
      },
      4: {
        name: 'Freitag',
        events: [],
      },
      5: {
        name: 'Samstag',
        events: [],
      },
      6: {
        name: 'Sonntag',
        events: [],
      },
    };

    let start: any;
    let date: any;
    if (this.$refs.calendar) {
      start = this.$refs.calendar.lastStart;
    }
    if (start) {
      date = new Date(start.date);
      const weekdayKeys = Object.keys(weekdayEvents);
      weekdayKeys.forEach((key, index) => {
        weekdayEvents[key].name += `, ${this.padTo2Digits(date.getDate())}.${this.padTo2Digits(date.getMonth() + 1)}.`;
        date.setDate(date.getDate() + 1);
      });
    }

    this.events
      .sort((a: any, b: any) => a.start - b.start)
      .forEach((event: any) => {
        const day = event.start.getDay() > 0 ? event.start.getDay() - 1 : 6;
        weekdayEvents[day].events.push(event);
      });
    return weekdayEvents;
  }

  // eslint-disable-next-line class-methods-use-this
  padTo2Digits(num: { toString: () => string; }): string {
    return num.toString()
      .padStart(2, '0');
  }

  static rnd(a: number, b: number): number {
    return Math.floor((b - a + 1) * Math.random()) + a;
  }

  // eslint-disable-next-line class-methods-use-this
  exportCalendar(): void {
    alert('Kalender wird exportiert');
  }
}
</script>

<style>
/* removes calendars scroll bar in weekly view that has no use */
.v-calendar-daily__scroll-area {
  overflow: auto !important;
}
</style>
