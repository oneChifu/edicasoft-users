// import Vue from "vue";
// import axios from "axios";
// import VueAxios from "vue-axios";

// axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE_URL;

// axios.interceptors.request.use(
//   config => {
//       let jwt = localStorage.getItem('jwt')
//       if ( jwt ) {
//         config.headers.common["Authorization"] = `Bearer ${jwt}`
//       }
//       config.headers['Content-Type'] = 'application/json';
//       return config;
//   },
//   error => {
//       Promise.reject(error)
//   }
// );

// Vue.use(VueAxios, axios)

