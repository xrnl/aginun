export default {
  state: {
    navbarHeight: "64px",
    workingCircleColours: {
      "Action & Logistics": "khaki-light",
      "Arts in Action": "red-light",
      "Finance": "navy-light",
      "Inclusion & Power": "yellow-light",
      "Integration": "yellow-light",
      "Legal": "navy-light",
      "Media & Communications": "red-light",
      "Outreach & Training": "purple-light",
      "Political Strategy & Change": "green-light",
      "Regenerative Culture": "orange-light",
      "Tech": "blue-light",
      "Rebellion Support Circle": "pink-light",
      "Coordination Circle": "purple-light",
      "Future of Democracy": "green-light"
    }
  },
  getters: {
    themeColor() {
      return function _(color) {
        return this.$vuetify.theme.dark
          ? this.$vuetify.theme.themes.dark[color]
          : this.$vuetify.theme.themes.light[color];
      };
    },

  },
};