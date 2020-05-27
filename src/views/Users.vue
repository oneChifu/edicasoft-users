<template>
  <v-container>
    <div class="display-3">Users</div>

    <div v-if="filteredUsers.length" class="px-10 py-5">
      <User v-for="(user, index) in filteredUsers" :key="index" class="" :index="index" :user="user" />
    </div>

    <div v-else>
      <div class="headline">No users</div>
    </div>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
// import {ValidationObserver, ValidationProvider} from 'vee-validate'
// import commonMixin from '@/mixins/common.mixin'
import User from '@/components/User'

export default {
  components: {
    User
  },

  data: () => ({
  }),

  computed: {
    ...mapGetters({
      users: "users/data",
    }),

    filteredUsers() {
      return this.sortUsers(this.users.filter(user => {
        user.avatar = `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`
  
        // if ( this.searchUsersText ) {
        //   return this.searchUser(user);
        // }
        
        return user
      }))
    },
  },

  methods: {
    sortUsers(users) {
      let $this = this
      
      function compare(a, b) {
        let aKey = a.id, 
            bKey = b.id

        if ( aKey > bKey ) {
          return $this.sortUsersAsc ? 1 : -1;
        }

        if ( aKey < bKey ) {
          return $this.sortUsersAsc ? -1 : 1;
        }
        
        return 0;
      }

      return users.sort(compare);
    },

    searchUser(user) {
      if ( !isNaN(this.searchUsersText.charAt(0)) ) {
        return user.PBXUser.Extension.toString().indexOf(this.searchUsersText.replace(/[^0-9.]/g, '')) > -1
      } else {
        return user.Data.Firstname.toLowerCase().startsWith(this.searchUsersText.toLowerCase().replace(/[0-9]/g, ''), 0)
            || user.Data.Lastname.toLowerCase().startsWith(this.searchUsersText.toLowerCase().replace(/[0-9]/g, ''), 0)
      }
    },
  }
}
</script>
