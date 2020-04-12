export const state = {
  navbarHeight: "64px",
};

export const getters = {
  themeColor() {
    return function _(color) {
      return this.$vuetify.theme.dark
        ? this.$vuetify.theme.themes.dark[color]
        : this.$vuetify.theme.themes.light[color];
    };
  },
};
