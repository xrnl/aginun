import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { apolloProvider } from "./plugins/vue-apollo";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App),
}).$mount("#app");
