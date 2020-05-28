<template>
<ValidationObserver ref="dialogUserFormRef" v-slot="{ invalid }">
  <v-dialog v-model="dialog" persistent scrollable max-width="560px">
    <v-card>
      <v-card-title>
        <div class="display-1">{{ dialogAdd ? 'Add User' : 'Edit User' }}</div>
      </v-card-title>

      <v-card-text>
        <v-container v-if="Object.keys(userData).length">
          <v-row>
            <v-col cols="12" sm="6" class="py-0">
              <ValidationProvider name="First Name" :rules="{required: true, min: 2, max: 20}" v-slot="{ errors }">
                <v-text-field outlined v-model="userData.firstname" :error-messages="errors" placeholder="User First Name">
                  <template v-slot:label>
                    First Name <b class="text--error">*</b>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" class="py-0">
              <ValidationProvider name="Last Name" :rules="{required: true, min: 2, max: 20}" v-slot="{ errors }">
                <v-text-field outlined v-model="userData.lastname" :error-messages="errors" placeholder="User Last Name">
                  <template v-slot:label>
                    Last Name <b class="text--error">*</b>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" class="py-0">
              <ValidationProvider name="Email" :rules="{required: true, email: true, email_uniq: userData}" v-slot="{ errors }">
                <v-text-field outlined type="email" v-model="userData.email" :error-messages="errors" placeholder="User Email">
                  <template v-slot:label>
                    Email <b class="text--error">*</b>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" class="pt-0 py-3">
              <v-combobox
                v-model="userData.address.country"
                outlined
                :items="countries"
                label="Country"
                placeholder="User Country" 
                hide-details
              ></v-combobox>
            </v-col>

            <v-col cols="12" class="py-5">
              <v-text-field outlined v-model="userData.address.city" label="City" placeholder="User City" hide-details></v-text-field>
            </v-col>

            <v-col cols="12" class="py-3">
              <v-text-field outlined v-model="userData.address.street" label="Street" placeholder="User Street" hide-details></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn 
          text
          color="primary" 
          @click="closeDialog()"
        >
          Cancel
        </v-btn>

        <v-btn 
          color="primary" 
          :readonly="loading"
          :disabled="!flagChanged || invalid"
          :loading="loading"
          @click="dialogAdd ? addUser() : editUser()"
        >
          {{ dialogAdd ? 'Add User' : 'Save Changes' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</ValidationObserver>
</template>

<script>
import Vue from 'vue'
import {mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import countryList from 'country-list';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  props: {
    dialog: {
      required: true,
      type: Boolean
    },
    user: {
      type: Object
    }
  },

  data: () => ({
    userData: {},
    countries: countryList.getNames(),
    loading: false,
    flagChanged: false,
  }),

  computed: {
    ...mapGetters({
      system: "system/data",
      users: "users/data",
    }),

    dialogAdd() {
      return Object.keys(this.user).length ? false : true
    }
  },

  watch: {
    user: {
      handler(value) {
        this.setDefaultUserData()
      },
      deep: true
    },

    userData: {
      handler() {
        this.flagChanged = true
      },
      deep: true
    },
  },

  created() {
    this.setDefaultUserData()
  },

  methods: {
    setDefaultUserData() {
      if ( Object.keys(this.user).length ) {
        this.userData = JSON.parse(JSON.stringify(this.user))

        setTimeout(() => {
          this.$refs.dialogUserFormRef.validate()
        }, 100)
      } else {
        this.userData = {
          firstname: '',
          lastname: '',
          email: '',
          address: {
            country: '',
            city: '',
            street: ''
          }
        }

        setTimeout(() => {
          this.$refs.dialogUserFormRef.reset()
        }, 100)
      }
    },
    
    async addUser() {
      this.loading = true
      this.userData.id = Math.max(...this.users.map(item => item.id)) + 1

      await this.$store.dispatch('users/addUser', this.userData)
        .then(() => {
          this.closeDialog()
        }).catch(e => {
          console.log(e);
        }).finally(() => {
          this.loading = false
        })
    },
    
    async editUser() {
      this.loading = true

      await this.$store.dispatch('users/editUser', this.userData)
        .then(() => {
          this.closeDialog()
        }).catch(e => {
          console.log(e);
        }).finally(() => {
          this.loading = false
        })
    },

    closeDialog() {
      this.setDefaultUserData()
      this.$refs.dialogUserFormRef.reset()
      this.$emit('close')
    },
  }
}
</script>
