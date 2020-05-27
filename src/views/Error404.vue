<template>
  <v-container>
    <div class="display-3">Error 404</div>

    <v-btn color="primary" @click="$router.go(-1)">Back</v-btn>
  </v-container>
</template>

<script>
export default {
  components: {
  },

  created() {
    // console.log('document.referrer', window.history.href)
    // console.log('history', this.$router)
  },

  // beforeRouteEnter(to, from, next) {
  //   console.log('from', from)
  //   next()
    
  //   // next((vm) => {
  //   //   vm.from = from;
  //   // });
  // }
}
</script>
