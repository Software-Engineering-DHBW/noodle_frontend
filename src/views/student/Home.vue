<template>
  <div class="home">
    <v-container fluid>
      <h1 style="margin: 100px">
        Hello {{ currentUser ? currentUser.fullName : '' }}
      </h1>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import CurrentUser from '../../classes/CurrentUser';

const Auth = namespace('Auth');

@Component
export default class Home extends Vue {
  @Auth.Getter
  currentUser!: CurrentUser;
}
</script>
