<template>
  <v-menu
    v-model="datePickerVisible"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Datum"
        prepend-icon="mdi-calendar"
        readonly
        hide-details
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      :first-day-of-week="1"
      @input="datePickerVisible = false"
    />
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DateField extends Vue {
  @Prop({ required: true }) value: any;

  datePickerVisible = false;

  get date(): any {
    return this.value;
  }

  set date(newValue) {
    this.$emit('input', newValue);
  }
}
</script>
