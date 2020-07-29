export default {
  state: {
    navbarHeight: "64px",
  },
  getters: {
    getThemeColor() {
      return function _(color) {
        return this.$vuetify.theme.dark
          ? this.$vuetify.theme.themes.dark[color]
          : this.$vuetify.theme.themes.light[color];
      };
    },
  },
};
