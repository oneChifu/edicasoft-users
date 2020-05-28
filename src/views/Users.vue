<template>
  <v-container>
    <v-row class="d-flex align-center">
      <v-col cols="4">
        <div class="display-2">Edicasoft Users</div>
      </v-col>

      <v-col class="text-right">
        <v-text-field
          class="d-inline-flex ma-0 pa-0"
          style="max-width: 300px"
          hide-details 
          v-model="searchUsersValue"
          maxlength="40"
          prepend-icon="mdi-magnify"
          clearable
          placeholder="Search user by Name"
          :disabled="!users.length"
        ></v-text-field>
      </v-col>

      <v-col cols="2" class="text-right">
        <v-btn color="primary" @click="dialog = true, dialogType = 'add'">
          <v-icon left>mdi-plus</v-icon> Add user
        </v-btn>
      </v-col>
    </v-row>

    <v-container v-if="filteredUsers" class="users py-5">
      <div>
        <v-row class="users__head d-flex align-center">
          <v-col cols="4" class="d-flex align-center">
            <v-checkbox class="pa-0 ma-0 mr-5" hide-details></v-checkbox>
            <b>Name</b>
          </v-col>
          <v-col cols="3"><b>Email</b></v-col>
          <v-col cols="4"><b>Address</b></v-col>
        </v-row>

        <UserBlock v-for="(user, index) in filteredUsers" :key="index" @open="openDialog" :index="index" :user="user" />
      </div>

      <v-pagination
        v-model="page" 
        :length="pageCount" 
        prev-icon="mdi-menu-left" 
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-container>

    <div v-else class="mt-5">
      <div class="headline">No users</div>
    </div>

    <UserForm @close="closeDialog" :dialog="dialog" :dialog-type="dialogType" :user="user" />
  </v-container>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from "vuex";
import UserBlock from '@/components/UserBlock'
import UserForm from '@/components/UserForm'

export default {
  components: {
    UserBlock,
    UserForm,
  },

  data: () => ({
    searchUsersValue: '',

    dialog: false,
    dialogType: '',
    user: {},

    page: 1,
    perPage: 3,
    pageCount: 0
  }),

  computed: {
    ...mapGetters({
      users: "users/data",
    }),

    filteredUsers() {
      let result = this.sortUsers(this.users.filter(user => {
        user.avatar = `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`
        user.addressFull = Object.values(user.address).join(', ')
  
        if ( this.searchUsersValue ) {
          return this.searchUser(user);
        }
        
        return user
      }))

      this.pageCount = Math.ceil(result.length / this.perPage);

      return _.chunk(result, this.perPage)[this.page - 1]
    },
  },

  created() {
  },

  methods: {
    openDialog(user) {
      this.dialogType = 'edit'
      this.user = user
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },

    sortUsers(users) {
      let $this = this
      
      function compare(a, b) {
        let aKey = a.timestamp, 
            bKey = b.timestamp

        if ( aKey < bKey ) {
          return 1;
        }

        if ( aKey > bKey ) {
          return -1;
        }
        
        return 0;
      }

      return users.sort(compare);
    },

    searchUser(user) {
      return user.firstname.toLowerCase().startsWith(this.searchUsersValue.trim().toLowerCase(), 0) || user.lastname.toLowerCase().startsWith(this.searchUsersValue.trim().toLowerCase(), 0)
    },
  }
}
</script>
