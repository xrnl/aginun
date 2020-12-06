import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
// ^ this used to be slow because we used vuetify/lib. Using vuetify/lib/framework is faster (https://github.com/vuetifyjs/vuetify/issues/9612)

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false, // dark as default theme
    options: {
      customProperties: true // access vuetify variables from css in .vue
    },
    themes: {
      light: {
        primary: "#3A62A8",
        secondary: "#79D0EF",
        success: "#22A83E",
        relief: "#3A62A8",
        shade: "#000000"
      },
      dark: {
        primary: "#C61281",
        secondary: "#EB9CC4",
        success: "#22A83E",
        relief: "#1e1e1e",
        shade: "#ffffff"
      }
    }
  },
  icons: {
    iconfont: "mdi"
  }
});
