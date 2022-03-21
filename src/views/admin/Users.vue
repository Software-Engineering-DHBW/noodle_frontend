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
        <v-overlay :value="isLoadingUsers || isDeletingUser">
          <v-progress-circular
            indeterminate
            size="100"
          />
        </v-overlay>

        <v-simple-table
          fixed-header
          height="70vh"
        >
          <thead>
            <tr>
              <th>
                Nutzername
              </th>
              <th class="text-center">
                Rolle
              </th>
              <th class="text-right">
                Aktion
              </th>
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
              <td class="text-center">
                {{
                  user.userId.isAdministrator ? 'Administrator'
                  : user.userId.isTeacher ? 'Teacher'
                    : 'Student'
                }}
              </td>
              <td class="text-right">
                <v-btn
                  icon
                  @click="deleteUser(user.userId.username)"
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

const UserStore = namespace('Users');

@Component({
  components: {
    NewUserPopup,
    SearchField,
  },
})
export default class Users extends Vue {
  filterString = '';

  @UserStore.State
  users!: Array<NoodleUser>;

  @UserStore.State
  isLoadingUsers!: boolean;

  @UserStore.State
  isDeletingUser!: boolean;

  @UserStore.Action
  loadAllUsers!: () => void;

  @UserStore.Action
  deleteUser!: (username: string) => void;

  get filteredUsers(): Array<NoodleUser> {
    return this.users.filter((user) => user.fullname.toLowerCase()
      .includes(this.filterString.toLowerCase()));
  }

  mounted(): void {
    this.loadAllUsers();
  }
}
</script>
