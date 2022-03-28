<template>
  <v-container>
    <v-row>
      <v-col>
        <SearchField v-model="filterString" />
      </v-col>
      <v-col class="text-right">
        <NewUserPopup />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <LoadingOverlay :loading="loading" />
        <v-simple-table
          fixed-header
          height="70vh"
        >
          <thead>
            <tr>
              <th>
                Nutzername
              </th>
              <th>
                Rolle
              </th>
              <th>
                Kurs
              </th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in filteredUsers"
              :key="index"
            >
              <td class="text-break">
                {{ user.userId.username }}
              </td>
              <td>
                {{
                  user.userId.isAdministrator ? 'Administrator'
                  : user.userId.isTeacher ? 'Teacher'
                    : 'Student'
                }}
              </td>
              <td>
                {{ user.userId.course ? user.userId.course.name : '-' }}
              </td>
              <td class="text-right">
                <ChangePasswordPopup :username="user.userId.username" />
              </td>
              <td class="text-right">
                <v-btn
                  icon
                  @click="deleteSelectedUser(user.userId.username)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchField from '@/components/SearchField.vue';
import NewUserPopup from '@/components/NewUserPopup.vue';
import { namespace } from 'vuex-class';
import { NoodleUser } from '@/classes/NoodleUser';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import ChangePasswordPopup from '@/components/ChangePasswordPopup.vue';

const UserStore = namespace('Users');

@Component({
  components: {
    LoadingOverlay,
    NewUserPopup,
    SearchField,
    ChangePasswordPopup,
  },
})
export default class Users extends Vue {
  filterString = '';

  @UserStore.State
  users!: Array<NoodleUser>;

  loading = false;

  @UserStore.Action
  loadAllUsers!: () => Promise<void>;

  @UserStore.Action
  deleteUser!: (username: string) => Promise<void>;

  loadTableData(): void {
    this.loading = true;
    this.loadAllUsers()
      .catch()
      .finally(() => {
        this.loading = false;
      });
  }

  deleteSelectedUser(username:string): void {
    this.loading = true;
    this.deleteUser(username)
      .catch()
      .finally(() => {
        this.loading = false;
      });
  }

  get filteredUsers(): Array<NoodleUser> {
    return this.users.filter((user) => user.fullname.toLowerCase()
      .includes(this.filterString.toLowerCase()));
  }

  mounted(): void {
    this.loadTableData();
  }
}
</script>
