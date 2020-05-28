<template>
  <v-container class="px-4 px-md-12">
    <v-row class="d-flex align-center">
      <v-col cols="12" sm="12" md="6" lg="4">
        <div class="display-2">Edicasoft Users</div>
      </v-col>

      <v-col cols="6" sm="6" md="4" lg="6" class="text-sm-left text-md-right">
        <v-text-field
          class="d-inline-flex ma-0 pa-0"
          style="max-width: 300px"
          hide-details 
          v-model="searchUsersValue"
          maxlength="40"
          prepend-icon="mdi-magnify"
          clearable
          placeholder="Search user by Name"
          :disabled="!users.length || loading"
        ></v-text-field>
      </v-col>

      <v-col cols="6" sm="6" md="2" class="text-right">
        <v-btn 
          :disabled="loading"
          color="primary" 
          @click="openDialogUserForm()"
        >
          <v-icon left>mdi-plus</v-icon> Add user
        </v-btn>
      </v-col>
    </v-row>

    <v-container v-if="filteredUsers && !loading" class="users py-5">
      <div>
        <v-row class="users__head d-none d-sm-flex align-center">
          <v-col cols="12" sm="4" class="d-flex align-center">
            <b>Name</b>
          </v-col>
          <v-col cols="12" sm="3"><b>Email</b></v-col>
          <v-col cols="12" sm="4"><b>Address</b></v-col>
        </v-row>

        <UserBlock v-for="(user, index) in filteredUsers" :key="index" @edit="openDialogUserForm" @delete="openDialogUserDelete" :user="user" />
      </div>

      <v-pagination
        v-model="page" 
        :length="pageCount" 
        prev-icon="mdi-menu-left" 
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-container>

    <div v-else-if="!filteredUsers && !loading" class="mt-5">
      <div class="headline">No users</div>
    </div>

    <div v-if="loading" class="mt-10 text-center">
      <v-progress-circular
        :size="42"
        :width="5"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <UserDelete @close="closeDialogUserDelete" :dialog="dialogUserDelete" :user="user" />
    <UserForm @close="closeDialogUserForm" :dialog="dialogUserForm" :user="user" />
  </v-container>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from "vuex";
import UserBlock from '@/components/UserBlock'
import UserForm from '@/components/UserForm'
import UserDelete from '@/components/UserDelete'

export default {
  components: {
    UserBlock,
    UserForm,
    UserDelete,
  },

  data: () => ({
    loading: true,
    searchUsersValue: '',

    dialogUserDelete: false,
    dialogUserForm: false,
    dialogUserFormType: '',

    user: {},

    page: 1,
    perPage: 4,
    pageCount: 0
  }),

  computed: {
    ...mapGetters({
      users: "users/data",
    }),

    filteredUsers() {
      let result = this.sortUsers(this.users.filter(user => {
        user.avatar = `${user.firstname.charAt(0).toUpperCase()}${user.lastname.charAt(0).toUpperCase()}`
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

  beforeCreate() {
    this.$store.dispatch('users/getUsers')
      .finally(() => {
        this.loading = false
      })
  },

  created() {
  },

  methods: {
    openDialogUserDelete(user) {
      this.user = user || {}
      this.dialogUserDelete = true
    },
    
    closeDialogUserDelete(user) {
      this.user = {}
      this.dialogUserDelete = false
    },
    
    openDialogUserForm(user) {
      this.user = user || {}
      this.dialogUserForm = true
      this.dialogUserFormType = 'edit'
    },

    closeDialogUserForm() {
      this.user = {}
      this.dialogUserForm = false
      this.dialogUserFormType = ''
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
