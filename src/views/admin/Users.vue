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
                {{ user.fullname }}
              </td>
              <td class="text-center">
                {{ 'Olaf' }}
              </td>
              <td class="text-right">
                <v-btn
                  icon
                  @click="deleteUser(user)"
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
import NoodleUser from '@/classes/NoodleUser';

const UserStore = namespace('Users');

@Component({
  components: {
    NewUserPopup,
    SearchField,
  },
})
export default class Users extends Vue {
  private filterString = '';

  @UserStore.State
  private users!: Array<NoodleUser>;

  @UserStore.Action
  private loadAllUsers!: () => void;

  get filteredUsers(): Array<NoodleUser> {
    return this.users.filter((user) => user.fullname.toLowerCase()
      .includes(this.filterString.toLowerCase()));
  }

  // eslint-disable-next-line class-methods-use-this
  deleteUser(user: NoodleUser): void {
    console.log(user);
    alert(`User ${user.fullname} wird gelöscht`);
  }

  mounted(): void {
    this.loadAllUsers();
  }
}
</script>
