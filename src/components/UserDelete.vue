<template>
<v-dialog v-model="dialog" persistent max-width="360">
  <v-card>
    <v-card-title>
      <div class="display-1">Deleting User</div>
    </v-card-title>

    <v-card-text>
      Are you sure that you want to delete this User?
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn 
        text
        color="primary" 
        @click="$emit('close')"
      >
        Cancel
      </v-btn>

      <v-btn 
        color="error" 
        :loading="loading" 
        @click="deleteUser()"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      required: true,
      type: Boolean
    },
    user: {
      required: true,
      type: Object
    }
  },

  data: () => ({
    loading: false,
  }),

  methods: {
    async deleteUser() {
      this.loading = true

      await this.$store.dispatch('users/deleteUser', this.user)
        .then(() => {
          this.$emit('close')
        }).catch(e => {
          console.log(e);
        }).finally(() => {
          this.loading = false
        })
    },
  }
}
</script>
