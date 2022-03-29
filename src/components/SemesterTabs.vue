<template>
  <v-tabs
    v-model="activeSemesterTab"
    center-active
    show-arrows
  >
    <v-tab
      v-for="semesterNumber in semesterNumbers"
      :key="semesterNumber"
      v-text="`Semester ${semesterNumber}`"
    />
  </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SemesterTabs extends Vue {
  @Prop({ required: true }) semesterNumbers: any;

  @Prop({ required: true }) value: any;

  get activeSemesterTab(): any {
    return this.value;
  }

  set activeSemesterTab(newValue) {
    this.$emit('input', newValue);
  }
}
</script>
