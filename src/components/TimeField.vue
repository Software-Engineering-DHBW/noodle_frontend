<template>
  <v-menu
    v-model="timePickerVisible"
    :close-on-content-click="false"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-time-picker
      v-if="timePickerVisible"
      v-model="time"
      format="24hr"
      :allowed-minutes="m => m % 5 === 0"
      @click:minute="timePickerVisible=false"
    />
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TimeField extends Vue {
  @Prop({ required: false }) label: any;

  @Prop({ required: true }) value: any;

  private timePickerVisible = false;

  get time(): any {
    return this.value;
  }

  set time(newValue) {
    this.$emit('input', newValue);
  }
}
</script>
