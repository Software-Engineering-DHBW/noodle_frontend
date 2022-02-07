<template>
  <div class="home">
    <v-container fluid>
      <h1 style="margin: 100px">
        Hello User
      </h1>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const Auth = namespace('Auth');

@Component
export default class Home extends Vue {
  @Auth.State('user')
  private currentUser!: any;

  mounted(): void {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>
