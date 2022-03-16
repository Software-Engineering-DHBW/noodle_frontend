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
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        hide-details
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      @input="datePickerVisible = false"
    />
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DateField extends Vue {
  @Prop({ required: false }) label = 'Datum';

  @Prop({ required: true }) value: any;

  private datePickerVisible = false;

  get date(): any {
    return this.value;
  }

  set date(newValue) {
    this.$emit('input', newValue);
  }
}
</script>
