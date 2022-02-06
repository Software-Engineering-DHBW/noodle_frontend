<template>
  <div class="home">
    <v-container fluid>
      <h1>Hello User</h1>
      <v-btn @click="getGrades()">
        Get Grades
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import StudentService from '../services/StudentService';

const Auth = namespace('Auth');

@Component
export default class Home extends Vue {
  @Auth.State('user')
  private currentUser!: any;

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }

  getGrades() {
    alert(StudentService.getGrades(this.currentUser.id));
  }
}
</script>
