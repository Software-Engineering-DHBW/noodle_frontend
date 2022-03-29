<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card-title class="text-h1 justify-center">
          404
        </v-card-title>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card-title class="text-h2 justify-center text-break">
          Es hat sich ausgenoodelt
        </v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageNotFound extends Vue {
}
</script>
