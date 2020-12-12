import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { apolloProvider } from "./plugins/vue-apollo";
import i18n from "./i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
