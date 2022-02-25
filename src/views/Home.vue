<template>
  <div class="home">
    <v-container fluid>
      <h1 style="margin: 100px">
        Hello {{ currentUser ? currentUser.username : '' }}
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
  @Auth.Getter('currentUser')
  private currentUser!: any;

  mounted(): void {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    console.log(this.currentUser);
  }
}
</script>
