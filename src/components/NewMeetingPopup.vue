<template>
  <div>
    <LoadingOverlay :loading="loading" />
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="visible=true"
      v-text="'Neuen Termin erstellen'"
    />

    <v-btn
      v-if="$vuetify.breakpoint.xs"
      fab
      small
      elevation="2"
      color="primary"
      @click="visible=true"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="visible"
      width="500"
    >
      <v-card>
        <v-card-title class="primary">
          Neuer Termin
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-card-title class="pa-0">
                  Modul
                </v-card-title>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="entry.assignedModule"
                  hide-details
                  dense
                  placeholder="Modul"
                  :items="allModules"
                  item-text="name"
                  item-value="id"
                />
              </v-col>
            </v-row>

            <v-text-field
              v-model="entry.description"
              label="Beschreibung"
            />

            <v-text-field
              v-model="entry.room"
              label="Raum"
            />

            <v-row>
              <v-col>
                <DateField v-model="date" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <TimeField
                  v-model="start"
                  label="Beginn"
                />
              </v-col>
              <v-col>
                <TimeField
                  v-model="end"
                  label="Ende"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="visible = false"
            v-text="'Abbrechen'"
          />
          <v-btn
            text
            color="primary"
            @click="saveMeeting"
            v-text="'Speichern'"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DateField from '@/components/DateField.vue';
import TimeField from '@/components/TimeField.vue';
import { namespace } from 'vuex-class';
import { NoodleModule } from '@/classes/NoodleModule';
import { NewCalendarEntry } from '@/classes/NewCalendarEntry';
import LoadingOverlay from './LoadingOverlay.vue';

const ModuleStore = namespace('Modules');
const CalendarStore = namespace('Calendar');

@Component({
  components: {
    TimeField,
    DateField,
    LoadingOverlay,
  },
})
export default class MeetingPopup extends Vue {
  loading = false;

  visible = false;

  entry = {
    startTime: '',
    endTime: '',
    description: '',
    room: '',
    assignedModule: 0,
  }

  date = '';

  start = '';

  end = '';

  @ModuleStore.State
  allModules!: Array<NoodleModule>;

  @ModuleStore.Action
  loadPersonalModules!: () => Promise<void>;

  @CalendarStore.Action
  registerEntry!: (entry: NewCalendarEntry) => Promise<void>

  saveMeeting(): void {
    this.loading = true;
    this.entry.startTime = `${this.date}T${this.start}:00.000Z`;
    this.entry.endTime = `${this.date}T${this.end}:00.000Z`;

    this.registerEntry(this.entry)
      .then(() => {
        this.entry.startTime = '';
        this.entry.endTime = '';
        this.entry.description = '';
        this.entry.room = '';
        this.entry.assignedModule = 0;

        this.date = '';
        this.start = '';
        this.end = '';

        this.visible = false;
      })
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
      });

    this.visible = false;
  }

  mounted(): void {
    this.loading = true;
    this.loadPersonalModules()
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
