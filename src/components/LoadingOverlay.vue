<template>
  <v-overlay :value="loading">
    <v-progress-circular
      indeterminate
      size="100"
    />
  </v-overlay>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoadingOverlay extends Vue {
  @Prop({ required: true }) loading!: boolean;
}
</script>
