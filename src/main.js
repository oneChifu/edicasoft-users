import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import "./midleware/veevalidate";

// import store from "./store";
// import router from "./router";
// import i18n from "./plugins/i18n";
// import vuetify from "./plugins/vuetify";

// import "./midleware/axios";
// import "./midleware/veevalidate";

new Vue({
  router,
  store,
  vuetify,

  // router,
  // store,
  // i18n,
  // vuetify,
  render: h => h(App)
}).$mount("#app");
