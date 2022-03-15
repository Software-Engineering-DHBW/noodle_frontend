<template>
  <v-select
    v-model="selectedSemester"
    hide-details
    solo
    background-color="primary"
    label="Semester"
    :items="semester"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SemesterDropdown extends Vue {
  @Prop({ required: true }) semester: any;

  @Prop({ required: true }) value: any;

  get selectedSemester(): any {
    return this.value;
  }

  set selectedSemester(newValue) {
    this.$emit('input', newValue);
  }
}
</script>
