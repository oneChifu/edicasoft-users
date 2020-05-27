<template>
  <v-row class="users__user d-flex align-center">
    <v-col cols="3" class="d-flex align-center">
      <v-checkbox class="ma-0 mr-5" hide-details></v-checkbox>

      <v-avatar color="primary" size="40">
        <span class="white--text font-weight-bold">{{ user.avatar }}</span>
      </v-avatar>

      <div class="ml-5">{{ `${user.firstname} ${user.lastname}` }}</div>
    </v-col>

    <v-col cols="3">{{ user.email }}</v-col>

    <v-col cols="5">{{ user.address.country }} {{ user.address.city }} {{ user.address.street }}</v-col>

    <v-col cols="1" class="text-right">
      <v-btn icon color="secondary">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    index: {
      required: true,
      type: Number
    },

    user: {
      required: true,
      type: Object
    }
  },

  data: () => ({
  }),

  computed: {
    
  }
}
</script>
