import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { apolloProvider } from "./plugins/vue-apollo";
import i18n from "./i18n/i18n";
import { loadLanguageAsync } from "@/i18n/utils/load-language-async";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

var app = new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  i18n,
  render: (h) => h(App),
  created: async () => {
    await loadLanguageAsync(navigator.language.split("-")[0]);
  }
}).$mount("#app");
