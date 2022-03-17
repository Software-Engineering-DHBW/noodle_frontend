<template>
  <div>
    <v-btn
      v-if="$vuetify.breakpoint.xl"
      color="primary"
      @click="visible=true"
      v-text="'+ Termin'"
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
          Termin
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-card-title class="pa-0">
                  Kurs
                </v-card-title>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="selectedCourse"
                  hide-details
                  dense
                  placeholder="Kurs"
                  :items="courses"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-card-title class="pa-0">
                  Modul
                </v-card-title>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="selectedModule"
                  hide-details
                  dense
                  placeholder="Modul"
                  :items="modules"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <DateField v-model="date" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <TimeField
                  v-model="startTime"
                  label="Beginn"
                />
              </v-col>
              <v-col>
                <TimeField
                  v-model="endTime"
                  label="Ende"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-slider
                  v-model="duration"
                  label="Dauer"
                  max="720"
                  thumb-label
                  step="5"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn
            text
            color="primary"
            @click="deleteMeeting"
            v-text="'Löschen'"
          />
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import DateField from '@/components/DateField.vue';
import TimeField from '@/components/TimeField.vue';

@Component({
  components: {
    TimeField,
    DateField,
  },
})
export default class MeetingPopup extends Vue {
  @Prop({ required: true }) readonly meeting: any;

  private visible = false;

  private date = null;

  private startTime: any = null;

  private endTime: any = null;

  private courses = ['IT1', 'IT2'];

  private selectedCourse = null;

  private modules = ['Mathematik', 'Softwareengineering', 'IT-Security'];

  private selectedModule = null;

  get duration(): any {
    const startDate = new Date(`01/01/1970 ${this.startTime}`);
    const endDate = new Date(`01/01/1970 ${this.endTime}`);
    const minuteDiff = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
    return minuteDiff;
  }

  set duration(duration) {
    if (!this.startTime) return;
    const startDate = new Date(`01/01/1970 ${this.startTime}`);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);
    this.endTime = `${endDate.getHours()
      .toString()
      .padStart(2, '0')}:${endDate.getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  saveMeeting(): void {
    console.log(this.meeting);
    this.visible = false;
  }

  deleteMeeting(): void {
    console.log(this.meeting);
    this.visible = false;
  }
}
</script>
