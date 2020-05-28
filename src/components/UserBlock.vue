<template>
  <v-hover v-slot:default="{ hover }">
    <v-row class="users__user d-flex align-center transition-fast-in-fast-out mt-2 mb-6 py-4 elevation-4" :class="{'on-hover': hover}">
      <v-col cols="12" sm="4" class="d-flex align-center">
        <v-avatar color="primary" size="40">
          <span class="white--text font-weight-bold">{{ user.avatar }}</span>
        </v-avatar>

        <div class="ml-5">{{ `${user.firstname} ${user.lastname}` }}</div>
      </v-col>

      <v-col cols="12" sm="3" class="d-flex align-center py-0"><span class="d-block d-sm-none caption" style="width: 80px;">Email </span>{{ user.email }}</v-col>

      <v-col cols="12" sm="4" class="d-flex align-center py-0"><span class="d-block d-sm-none caption" style="width: 80px;">Address </span>{{ user.addressFull }}</v-col>

      <v-col cols="1" class="text-right">
        <v-menu bottom left offset-x close-on-click>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon color="secondary">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="$emit('edit', user)">
              <v-list-item-icon>
                <v-icon>mdi-pencil-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>

            <v-list-item @click="$emit('delete', user)">
              <v-list-item-icon>
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-hover>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object
    }
  },

  data: () => ({
    userDialogDelete: false,
    loading: false
  }),

  computed: {
  },

  methods: {
    editUser() {
      this.$emit('open', this.user)
    },
  }
}
</script>
