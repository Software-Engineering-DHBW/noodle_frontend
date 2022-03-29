<template>
  <div>
    <div
      v-for="module in modules"
      :key="module.id"
      class="d-flex align-center"
    >
      <v-card
        hover
        :to="`module/${module.id}`"
        class="my-2 flex-grow-1"
      >
        <v-card-title v-text="module.name" />
        <v-card-text v-text="module.description" />
      </v-card>
      <v-tooltip
        v-if="isAdmin"
        bottom
      >
        Modul löschen
        <template v-slot:activator="{ on }">
          <div
            class="d-inline-flex"
            v-on="on"
          >
            <v-btn
              icon
              class="ml-2"
              @click="deleteSelectedModule(module.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { NoodleModule } from '@/classes/NoodleModule';
import { namespace } from 'vuex-class';

const Auth = namespace('Auth');
const ModuleStore = namespace('Modules');

@Component
export default class ModuleList extends Vue {
  @Prop({ required: true }) modules!: Array<NoodleModule>;

  loading = false;

  @Auth.Getter
  isAdmin!: boolean;

  @ModuleStore.Action
  deleteModule!: (id: number) => Promise<void>;

  deleteSelectedModule(id: number): void {
    this.loading = true;
    this.deleteModule(id)
      .catch(() => undefined)
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
