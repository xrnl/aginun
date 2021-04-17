import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { apolloProvider } from "./plugins/vue-apollo";
import i18n from "./i18n/i18n";
import { loadLanguageAsync } from "@/i18n/utils/load-language-async";
import { loginCookieKey } from "./store/modules/user";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;

Vue.use(VueCookies);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  i18n,
  render: (h) => h(App),
  created: async () => {
    if (Vue.$cookies.isKey(loginCookieKey)) {
      store.dispatch("user/initializeFromCookie");
    }
    await loadLanguageAsync(navigator.language.split("-")[0]);
  }
}).$mount("#app");
