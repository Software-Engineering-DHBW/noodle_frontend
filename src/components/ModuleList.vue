<template>
  <div>
    <v-card
      v-for="module in modules"
      :key="module.id"
      hover
      :to="`module/${module.id}`"
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
import { NoodleModule } from '@/classes/NoodleModule';

@Component
export default class ModuleList extends Vue {
  @Prop({ required: true }) modules!: Array<NoodleModule>;
}
</script>
