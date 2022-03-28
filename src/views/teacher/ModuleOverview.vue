<template>
  <v-container>
    <LoadingOverlay :loading="loading" />
    <v-row>
      <v-col>
        <SearchField v-model="filterString" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <ModuleList :modules="filteredModules" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModuleList from '@/components/ModuleList.vue';
import SearchField from '@/components/SearchField.vue';
import { namespace } from 'vuex-class';
import { NoodleModule } from '@/classes/NoodleModule';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

const ModuleStore = namespace('Modules');

@Component({
  components: { ModuleList, SearchField, LoadingOverlay },
})
export default class ModuleOverview extends Vue {
  filterString = '';

  loading = false;

  @ModuleStore.State
  allModules!: Array<NoodleModule>;

  @ModuleStore.Action
  loadPersonalModules!: () => Promise<void>;

  get filteredModules(): Array<NoodleModule> {
    return this.allModules
      .filter((module) => module.name.toLowerCase()
        .includes(this.filterString.toLowerCase()));
  }

  mounted(): void {
    this.loading = true;
    this.loadPersonalModules()
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
