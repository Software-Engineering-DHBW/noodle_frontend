<template>
  <div>
    <v-card
      v-for="module in modules"
      :key="module.name"
      hover
      :to="`module/${1}/${module.name}`"
      class="mb-4"
    >
      <v-card-title v-text="module.name" />
      <v-card-text
        class="text-left"
        v-text="module.description"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ModuleList extends Vue {
  @Prop({ required: true }) modules: any;
}
</script>
