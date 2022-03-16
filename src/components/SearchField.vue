<template>
  <v-text-field
    v-model="searchString"
    append-icon="mdi-magnify"
    label="Filter"
    hide-details
    class="pt-0"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DateField extends Vue {
  @Prop({ required: true }) value: any;

  private datePickerVisible = false;

  get searchString(): any {
    return this.value;
  }

  set searchString(newValue) {
    this.$emit('input', newValue);
  }
}
</script>
